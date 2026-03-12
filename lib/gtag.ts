declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID?.trim();
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim();
const CONVERSION_LABELS = [
  process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL?.trim(),       // Request quote
  process.env.NEXT_PUBLIC_GOOGLE_ADS_SUBMIT_LEAD_FORM_LABEL?.trim(), // Submit lead form
].filter(Boolean) as string[];

/**
 * Fire Google Ads conversion events for all configured labels.
 * Requires NEXT_PUBLIC_GOOGLE_ADS_ID and at least one conversion label.
 */
export function gtagReportConversion(url?: string) {
  if (!GOOGLE_ADS_ID || CONVERSION_LABELS.length === 0 || typeof window === 'undefined' || !window.gtag) {
    return false;
  }

  CONVERSION_LABELS.forEach((label) => {
    window.gtag!('event', 'conversion', {
      send_to: `${GOOGLE_ADS_ID}/${label}`,
      ...(url && { event_callback: () => { window.location.href = url; } }),
    });
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

/**
 * Track a page view explicitly for Next.js App Router navigations.
 */
export function trackPageView(path: string) {
  if (!GA_ID || typeof window === 'undefined' || !window.gtag) {
    return false;
  }

  const pageLocation = new URL(path, window.location.origin).toString();

  window.gtag('event', 'page_view', {
    page_title: document.title,
    page_path: path,
    page_location: pageLocation,
    send_to: GA_ID,
  });

  return true;
}
