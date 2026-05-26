# SEO Automation

This repo now includes a 4x-daily SEO automation pipeline with guarded auto-publishing.

## What Runs

The scheduler hits these jobs:

- `audit`: refreshes SEO health and prioritization artifacts
- `programmatic`: publishes low-risk market-intent blog content
- `strategy`: publishes low-risk educational content tied to target keywords
- `ideas`: publishes low-risk conversion-supporting SEO content
- `authority`: refreshes the backlink action queue and submits the sitemap to Google Search Console when credentials are configured

## Cron Schedule

Configured in `vercel.json`:

- `04:05 UTC` audit
- `10:05 UTC` programmatic
- `16:05 UTC` strategy
- `22:05 UTC` ideas
- `13:15 UTC` authority

These line up to `00:05`, `06:05`, `12:05`, `18:05` Eastern Time during daylight saving time. Vercel cron uses UTC, so review these times when DST changes.

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

This automation improves freshness, content cadence, internal SEO assets, and indexing speed. It does not by itself guarantee top rankings for competitive lending terms.

To compete for position 1, the business still needs:

- More authoritative backlinks from relevant finance and real estate domains
- Search Console and Bing Webmaster monitoring
- Ongoing expansion of comparison, location, and educational content
- Stronger E-E-A-T signals: authorship, trust pages, market proof, and reviews
- Better conversion infrastructure so rising traffic turns into qualified leads

## Important Limits

- This repo can automate a backlink action queue, but it cannot create real backlinks on third-party sites by itself.
- This repo can submit the sitemap to Google Search Console if the property is verified and the service account has access.
- Google's Indexing API is not a general-purpose indexing endpoint for normal marketing pages. For normal webpages, the practical automation path is sitemap submission plus strong crawlability and internal linking.
