import { NextRequest, NextResponse } from 'next/server';
import { createHash, timingSafeEqual } from 'crypto';
import {
  PORTAL_SESSION_COOKIE,
  PORTAL_SESSION_MAX_AGE,
  createSessionToken,
} from '@/lib/portal-auth';

function passwordsMatch(submitted: string, correct: string): boolean {
  // Hash both sides so the comparison is constant-time regardless of length.
  const a = createHash('sha256').update(submitted).digest();
  const b = createHash('sha256').update(correct).digest();
  return timingSafeEqual(a, b);
}

export async function POST(request: NextRequest) {
  const { password } = await request.json();

  const correct = process.env.PORTAL_PASSWORD;
  const secret = process.env.PORTAL_SESSION_SECRET;
  if (!correct || !secret) {
    console.error('[portal] PORTAL_PASSWORD or PORTAL_SESSION_SECRET not set');
    return NextResponse.json({ error: 'Portal is not configured' }, { status: 500 });
  }

  if (typeof password !== 'string' || !passwordsMatch(password, correct)) {
    return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(PORTAL_SESSION_COOKIE, await createSessionToken(secret), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: PORTAL_SESSION_MAX_AGE,
    path: '/',
  });
  return response;
}
