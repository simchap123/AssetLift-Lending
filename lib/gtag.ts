declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const CONVERSION_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;

/**
 * Fire a Google Ads conversion event.
 * Requires NEXT_PUBLIC_GOOGLE_ADS_ID and NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL
 * to be set in environment variables.
 */
export function gtagReportConversion(url?: string) {
  if (!GOOGLE_ADS_ID || !CONVERSION_LABEL || typeof window === 'undefined' || !window.gtag) {
    return false;
  }

  window.gtag('event', 'conversion', {
    send_to: `${GOOGLE_ADS_ID}/${CONVERSION_LABEL}`,
    ...(url && { event_callback: () => { window.location.href = url; } }),
  });

  return true;
}

/**
 * Fire a custom gtag event (for GA4 or Google Ads).
 */
export function gtagEvent(action: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', action, params);
}
