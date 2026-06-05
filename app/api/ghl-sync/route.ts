import { NextRequest, NextResponse } from 'next/server';
import { syncDealToGHL, GHLDealPayload } from '@/lib/ghl-sync';

export async function POST(req: NextRequest) {
  try {
    const deal = (await req.json()) as GHLDealPayload;
    await syncDealToGHL(deal);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[GHL] Sync route error:', err);
    return NextResponse.json({ success: false });
  }
}
