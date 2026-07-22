# SEO Changes

Date: July 22, 2026

## What Changed

- Reduced sitemap exposure from roughly 532 URLs to 49 focused URLs.
- Added `lib/seo/routing-policy.ts` to centralize priority states, priority city pages, selected blog/comparison/answer slugs, and indexable static paths.
- Added noindex handling for non-priority state, city, blog, answer, comparison, broker, team, AI-context, commercial-lending, and term-sheet-pricer pages.
- Removed visible homepage SEO-first language, including the crawl hub section and large keyword/location link collection.
- Removed unverified animated homepage counters and fabricated/self-hosted review schema from the homepage and core loan pages.
- Rebuilt the homepage hero around the requested H1, supporting copy, CTAs, qualification note, trust points, and shorter lead form.
- Preserved the existing lead submission path through `/api/notify` and the existing GHL push helper.
- Added mobile sticky actions for Call, Text, and Get Terms.
- Added event instrumentation through the existing analytics helper for primary CTA clicks, form starts, form submissions, phone clicks, text clicks, and calculator use.
- Added `lib/data/program-terms.ts` and wired the homepage program cards to shared term language.
- Softened high-risk calculator copy so outputs are framed as review aids, not approval promises.

## Why

Search Console showed weak non-brand rankings, very low CTR overall, and a large number of crawled-but-not-indexed URLs. The site had become too broad relative to authority. This cleanup concentrates crawl signals on the pages most likely to support qualified fix-and-flip, DSCR, bridge, and construction leads in NY, NJ, and CT.

## Verification

- `cmd /c npm run build` passed.
- Baseline build before edits also passed and generated 545 static pages.
- Post-change build still generates 545 app paths, but sitemap policy now exposes only 49 unique URLs.
- Local robots check rendered `Disallow: /api/`, `Disallow: /portal/`, and the canonical sitemap reference.
- Local legacy redirect check returned `308` from `/blog/hard-money-loans-los-angeles-ca` to `/lending/california/los-angeles`.

## Remaining Limits

- No production deployment, commit, or push was performed.
- The repository has many pre-existing modified files unrelated to this change; those were preserved.
- Full browser screenshot QA at 375px, 768px, and desktop was attempted but not completed. The dev server reset connections during parallel checks, and `agent-browser` failed to launch Chrome with `CDP response channel closed`.
- The project has no separate `lint`, `typecheck`, or `test` npm scripts beyond `next build`; build performs Next lint/type validation.
