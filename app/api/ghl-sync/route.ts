import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { syncDealToGHL } from '@/lib/ghl-sync';

// This endpoint is intentionally public: it receives lead submissions from
// the hero form, apply form, and portal. Abuse is limited by strict payload
// validation, a same-origin check, and per-IP rate limiting.

const money = z.string().trim().max(20);

const dealSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().min(7).max(30),
  loanType: z.string().trim().min(1).max(60),
  propertyAddress: z.string().trim().min(1).max(250),
  purchasePrice: money,
  loanAmount: money.optional(),
  arv: money.optional(),
  rehabAmount: money.optional(),
  creditScore: z.string().trim().max(20).optional(),
  flipsCompleted: z.string().trim().max(20).optional(),
  notes: z.string().trim().max(2000).optional(),
  source: z.enum(['apply-form', 'hero-form', 'portal']).optional(),
});

const RATE_LIMIT = 5; // submissions per window per IP
const WINDOW_MS = 60_000;
const hits = new Map<string, { count: number; windowStart: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now - entry.windowStart > WINDOW_MS) {
    hits.set(ip, { count: 1, windowStart: now });
    if (hits.size > 10_000) hits.clear(); // bound memory
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

export async function POST(req: NextRequest) {
  // Browser requests must come from our own origin.
  const origin = req.headers.get('origin');
  if (origin) {
    const host = req.headers.get('host');
    let originHost: string | null = null;
    try {
      originHost = new URL(origin).host;
    } catch {
      originHost = null;
    }
    if (!host || originHost !== host) {
      return NextResponse.json({ success: false }, { status: 403 });
    }
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (rateLimited(ip)) {
    return NextResponse.json({ success: false }, { status: 429 });
  }

  try {
    const parsed = dealSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ success: false }, { status: 400 });
    }
    await syncDealToGHL(parsed.data);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[GHL] Sync route error:', err);
    return NextResponse.json({ success: false });
  }
}
