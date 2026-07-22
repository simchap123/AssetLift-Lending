# Redirect And Noindex Map

Date: July 22, 2026

## Redirects

| Old URL | New URL | Status | Reason |
|---|---|---:|---|
| `http://assetliftlending.com/:path*` | `https://www.assetliftlending.com/:path*` | 301 | Canonical host and HTTPS consolidation in `vercel.json`. |
| `http://www.assetliftlending.com/:path*` | `https://www.assetliftlending.com/:path*` | 301 | HTTPS consolidation in `vercel.json`. |
| `/blog/hard-money-loans-{citySlug}-{stateAbbreviation}` | `/lending/{stateSlug}/{citySlug}` | 308/301 permanent by Next config | Existing consolidation of duplicated city blog templates into canonical city lending pages. Verified locally with `/blog/hard-money-loans-los-angeles-ca` redirecting to `/lending/california/los-angeles`. |

No new unrelated homepage redirects were added.

## Noindex Decisions

| URL / Pattern | Status | Reason |
|---|---:|---|
| `/lending/{state}` outside New York, New Jersey, Connecticut | 200 + noindex,follow | Generated state set is broad and outside the current business priority. Keep accessible while reducing crawl bloat. |
| `/lending/{state}/{city}` except the 4 priority New York city paths currently present in `CITIES` | 200 + noindex,follow | Programmatic city pages are likely near-duplicate relative to current authority. Keep accessible while removing from sitemap. |
| `/blog/{slug}` except 10 selected guides | 200 + noindex,follow | Large generated/content library should not compete until each page is reviewed and materially improved. |
| `/answers/{slug}` except 3 selected answer pages | 200 + noindex,follow | Answer-engine pages are useful but SEO-first and duplicative at scale. |
| `/compare/{slug}` except 4 selected comparisons | 200 + noindex,follow | Keep strongest comparison pages indexable; de-emphasize the rest pending review. |
| `/blog`, `/answers`, `/compare` | 200 + noindex,follow | Hubs are useful for users but omitted from sitemap to focus crawling on stronger canonical pages. |
| `/brokers` | 200 + noindex,follow | Partner workflow page is not part of the primary borrower lead-generation SEO goal. |
| `/team` | 200 + noindex,follow | Team content should remain noindex until biography/headshot/credentials are owner-approved. |
| `/ai-context` | 200 + noindex,follow | Utility page for AI-readable context, not a public search landing page. |
| `/loans/commercial-lending` | 200 + noindex,follow | Secondary capability outside the stated core priority set. |
| `/tools/term-sheet-pricer` | 200 + noindex,follow | Advanced/internal-style pricing utility; keep out of search until positioning is approved. |
