# SEO Automation

This repo now includes a twice-daily SEO and AI-visibility automation pipeline with guarded auto-publishing.

The goal is to compound toward first-page Google rankings and stronger visibility in AI answer engines such as ChatGPT, Perplexity, Claude, Gemini, and Copilot. No scheduler can guarantee a #1 ranking or force inclusion in an AI model index, but this cadence keeps the site publishing, crawlable, internally linked, and easier for search and AI retrieval systems to understand.

## What Runs

The scheduler hits these jobs:

- `audit`: refreshes SEO health and prioritization artifacts
- `programmatic`: morning publish for market, location, and high-intent SEO content
- `strategy`: evening publish for educational, comparison, and answer-engine content tied to target keywords
- `authority`: runs after each publish window to refresh the backlink/action queue, AI-readable citation targets, and Google Search Console sitemap submission when credentials are configured

## Cron Schedule

Configured in `vercel.json`:

- `04:05 UTC` audit
- `10:05 UTC` programmatic content publish
- `10:35 UTC` authority, indexing, and AI visibility refresh
- `22:05 UTC` strategy content publish
- `22:35 UTC` authority, indexing, and AI visibility refresh

These line up to roughly `00:05`, `06:05`, `06:35`, `18:05`, and `18:35` Eastern Time during daylight saving time. Vercel cron uses UTC, so review these times when DST changes.

The two daily publishing windows are the operating schedule:

- Morning: push market/local-intent content, then refresh indexing and AI citation signals.
- Evening: push educational/comparison/answer-engine content, then refresh indexing and AI citation signals.

## AI Visibility Layer

The authority job now treats AI discoverability as part of the twice-daily schedule. It rotates and refreshes:

- `llms.txt` and `llms-full.txt` as AI-readable entity and citation references
- Product, market, and tool pages that AI systems can cite through web retrieval
- Backlink and profile targets that strengthen entity authority
- Search Console sitemap submission status for faster search discovery

AI platforms generally do not provide a public "submit this page to the model" endpoint. The practical path is to make AssetLift highly crawlable, consistently cited, structurally clear, and present on trusted third-party sources that retrieval systems can see.

## Required Environment Variables

- `SEO_AUTOMATION_SECRET`
  Used for manual authenticated runs.
- `SEO_GITHUB_TOKEN`
  GitHub token with permission to update repo contents.
- `SEO_GITHUB_REPO`
  Repo in `owner/name` format.
- `SEO_GITHUB_BRANCH`
  Optional. Defaults to `main`.
- `INDEXNOW_KEY`
  Optional but recommended. Used to submit changed URLs after publish.
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
  Google service account email for Search Console API access.
- `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`
  Private key for the Google service account.
- `GOOGLE_SEARCH_CONSOLE_SITE_URL`
  Verified Search Console property URL such as `sc-domain:assetliftlending.com` or `https://www.assetliftlending.com/`.
- `GOOGLE_SEARCH_CONSOLE_SITEMAP_URL`
  Optional. Defaults to `https://www.assetliftlending.com/sitemap.xml`.

The scheduler will still run without the GitHub vars, but it will stay in dry-run mode and will not publish new content.
The authority job will still run without the Google vars, but it will only report that Search Console automation is not connected.

## Publish Targets

Generated artifacts and content are written to:

- `lib/data/seo-scheduled-posts.json`
- `public/seo/health.json`
- `public/seo/content-backlog.json`
- `public/seo/conversion-ideas.json`
- `public/seo/backlink-queue.json`
- `public/seo/backlink-outreach.json`
- `public/seo/search-console-status.json`
- `public/seo/last-run.json`

## Internal Status Page

- `/seo-status`

This page reads the JSON artifacts above and gives a quick operational view of the SEO jobs, authority queue, outreach rotation, and Search Console connectivity.

## What This Does Not Solve by Itself

This automation improves freshness, content cadence, internal SEO assets, AI-readable references, and indexing speed. It does not by itself guarantee top rankings for competitive lending terms or guaranteed placement inside AI answers.

To compete for position 1, the business still needs:

- More authoritative backlinks from relevant finance and real estate domains
- Search Console, Bing Webmaster, and AI-answer monitoring
- Ongoing expansion of comparison, location, and educational content
- Stronger E-E-A-T signals: authorship, trust pages, market proof, and reviews
- Better conversion infrastructure so rising traffic turns into qualified leads

## Important Limits

- This repo can automate a backlink action queue, but it cannot create real backlinks on third-party sites by itself.
- This repo can submit the sitemap to Google Search Console if the property is verified and the service account has access.
- This repo can maintain AI-readable references and authority targets, but ChatGPT, Perplexity, Claude, Gemini, and Copilot decide what to crawl, retrieve, cite, and surface.
- Google's Indexing API is not a general-purpose indexing endpoint for normal marketing pages. For normal webpages, the practical automation path is sitemap submission plus strong crawlability and internal linking.
