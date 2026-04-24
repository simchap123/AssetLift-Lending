declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim();

export function metaTrackLead(params?: Record<string, unknown>) {
  if (!META_PIXEL_ID || typeof window === 'undefined' || !window.fbq) return;
  window.fbq('track', 'Lead', params);
}

export function metaTrackPageView() {
  if (!META_PIXEL_ID || typeof window === 'undefined' || !window.fbq) return;
  window.fbq('track', 'PageView');
}

export function metaTrackCustom(event: string, params?: Record<string, unknown>) {
  if (!META_PIXEL_ID || typeof window === 'undefined' || !window.fbq) return;
  window.fbq('trackCustom', event, params);
}
