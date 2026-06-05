import { GHLDealPayload } from '@/lib/ghl-sync';

/** Fire-and-forget — never blocks or throws. */
export function pushToGHL(deal: GHLDealPayload): void {
  fetch('/api/ghl-sync', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(deal),
  }).catch(() => {});
}
