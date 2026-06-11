import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { PORTAL_SESSION_COOKIE, verifySessionToken } from '@/lib/portal-auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow login page and login API through unauthenticated
  if (pathname === '/portal' || pathname.startsWith('/portal/api/')) {
    return NextResponse.next();
  }

  // Protect all other /portal/* routes. Fails closed if the session
  // secret is not configured.
  if (pathname.startsWith('/portal/')) {
    const token = request.cookies.get(PORTAL_SESSION_COOKIE)?.value;
    const valid = await verifySessionToken(token, process.env.PORTAL_SESSION_SECRET);
    if (!valid) {
      return NextResponse.redirect(new URL('/portal', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/portal/:path*',
};
