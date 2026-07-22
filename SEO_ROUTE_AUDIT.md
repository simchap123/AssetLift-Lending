# SEO Route Audit

Date: July 22, 2026

## Summary

The production build renders 545 app routes. Before this cleanup, the sitemap exposed roughly 532 URLs across core pages, 46 state pages, 86 city pages, 6 tri-state program pages, 319 indexable blog posts, 22 comparison pages, and 23 answer pages.

The new sitemap policy exposes 49 unique URLs:

- 22 core/static URLs
- 3 state hubs: New York, New Jersey, Connecticut
- 4 priority New York city pages currently present in `CITIES`
- 6 NY/NJ/CT program pages
- 10 selected blog guides
- 4 selected comparison pages
- 3 selected answer pages

Non-priority generated pages remain buildable and accessible, but are removed from the sitemap and receive `noindex,follow` where implemented.

## Route Classification

| URL / Pattern | Page type | Title / metadata source | Canonical | Indexability | Word count | Internal links | Sitemap | Duplicate risk | Recommendation |
|---|---|---|---|---|---:|---|---|---|---|
| `/` | Homepage | `app/(marketing)/page.tsx` | Self | Index | Substantial | Core programs, markets, apply | Yes | Low after cleanup | Improve |
| `/apply` | Application | `app/apply/page.tsx` | Self | Index | Medium | Main CTA target | Yes | Low | Keep |
| `/contact` | Contact | `app/(marketing)/contact/page.tsx` | Self | Index | Medium | Contact/apply/legal | Yes | Low | Keep |
| `/about` | Trust/about | `app/(marketing)/about/page.tsx` | Self | Index | Medium | Legal/contact/apply | Yes | Medium until verified bio/headshot | Improve |
| `/how-it-works` | Process | `app/(marketing)/how-it-works/page.tsx` | Self | Index | Substantial | Apply/programs | Yes | Low | Keep |
| `/how-funding-works` | Funding disclosure | `app/(marketing)/how-funding-works/page.tsx` | Self | Index | Substantial | Licensing/disclosures | Yes | Low | Keep |
| `/licensing` | Compliance | `app/(marketing)/licensing/page.tsx` | Self | Index | Substantial | Disclosures/terms | Yes | Low | Keep |
| `/state-disclosures` | Compliance | `app/(marketing)/state-disclosures/page.tsx` | Self | Index | Substantial | Licensing/terms | Yes | Low | Keep |
| `/privacy` | Utility/legal | `app/(marketing)/privacy/page.tsx` | Self | Index | Medium | Footer | Yes | Low | Keep |
| `/terms` | Utility/legal | `app/(marketing)/terms/page.tsx` | Self | Index | Medium | Footer | Yes | Low | Keep |
| `/faq` | FAQ | `app/(marketing)/faq/page.tsx` | Self | Index | Substantial | Program/supporting links | Yes | Low | Keep |
| `/markets` | Market hub | `app/(marketing)/markets/page.tsx` | Self | Index | Medium | Priority states/cities | Yes | Low | Improve |
| `/loans` | Program hub | `app/(marketing)/loans/page.tsx` | Self | Index | Medium | Core loan pages | Yes | Low | Keep |
| `/loans/fix-and-flip` | Loan program | `LOAN_PRODUCTS` | Self | Index | Substantial | Calculator/apply/related | Yes | Low | Improve |
| `/loans/dscr-rental` | Loan program | `LOAN_PRODUCTS` | Self | Index | Substantial | Calculator/apply/related | Yes | Low | Improve |
| `/loans/ground-up-construction` | Loan program | `LOAN_PRODUCTS` | Self | Index | Substantial | Apply/related | Yes | Low | Improve |
| `/loans/bridge` | Loan program | `LOAN_PRODUCTS` | Self | Index | Substantial | Apply/related | Yes | Low | Improve |
| `/loans/commercial-lending` | Secondary loan page | `LOAN_PRODUCTS` | Self | Noindex | Substantial | Loan hub/apply | No | Medium, outside stated priority | Noindex |
| `/tools` | Tools hub | `app/(marketing)/tools/page.tsx` | Self | Index | Medium | Calculators | Yes | Low | Keep |
| `/tools/fix-and-flip-calculator` | Calculator | Route metadata | Self | Index | Substantial | Apply/program | Yes | Low | Keep |
| `/tools/dscr-calculator` | Calculator | Route metadata | Self | Index | Substantial | Apply/program | Yes | Low | Keep |
| `/tools/term-sheet-pricer` | Internal/advanced utility | Route metadata | Self | Noindex | Medium | Tools | No | Medium | Noindex |
| `/resources/fix-and-flip-deal-checklist` | Resource | Route metadata | Self | Index | Substantial | Apply/program | Yes | Low | Keep |
| `/resources/fix-and-flip-borrower-package` | Resource/form | Route metadata | Self | Index | Medium | Apply/program | Yes | Low | Keep |
| `/blog` | Blog index | Route metadata | Self | Noindex | Medium | Blog posts/categories | No | Medium | Noindex |
| `/blog/{selected-slug}` | Blog guide | `BLOG_POSTS` | Self | Index for 10 selected slugs | Substantial | Related posts/programs | Yes selected | Mixed | Consolidate/improve |
| `/blog/{non-selected-slug}` | Blog/generated guide | `BLOG_POSTS` | Self | Noindex | Mixed | Related posts/programs | No | High across programmatic set | Noindex |
| `/answers` | Answer index | `geo-answers.json` | Self | Noindex | Medium | Answer pages | No | Medium | Noindex |
| `/answers/{selected-slug}` | Answer page | `geo-answers.json` | Self | Index for 3 selected slugs | Medium | Answers/apply | Yes selected | Medium | Improve |
| `/answers/{non-selected-slug}` | Answer page | `geo-answers.json` | Self | Noindex | Medium | Answers/apply | No | High | Noindex |
| `/compare` | Comparison hub | Route metadata | Self | Noindex | Medium | Comparisons | No | Medium | Noindex |
| `/compare/{selected-slug}` | Comparison | `COMPARISONS` | Self | Index for 4 selected slugs | Substantial | Compare/apply | Yes selected | Medium | Improve |
| `/compare/{non-selected-slug}` | Comparison | `COMPARISONS` | Self | Noindex | Substantial | Compare/apply | No | Medium | Noindex |
| `/lending/new-york` | State hub | `STATES` | Self | Index | Substantial | Cities/programs | Yes | Medium | Improve |
| `/lending/new-jersey` | State hub | `STATES` | Self | Index | Substantial | Cities/programs | Yes | Medium | Improve |
| `/lending/connecticut` | State hub | `STATES` | Self | Index | Substantial | Cities/programs | Yes | Medium | Improve |
| `/lending/{non-priority-state}` | State page | `STATES` | Self | Noindex | Substantial | Cities/programs | No | High across 43 pages | Noindex |
| `/lending/{ny-nj-ct}/{priority-city}` | Priority local page | `CITIES` | Self | Index | Substantial | State/program/apply | Yes | Medium | Improve |
| `/lending/{state}/{non-priority-city}` | City page | `CITIES` | Self | Noindex | Substantial | State/program/apply | No | High across 73 pages | Noindex |
| `/lending/{ny-nj-ct}/fix-and-flip-loans` | Priority local program | `TRI_STATE_PROGRAM_PAGES` | Self | Index | Medium | State/apply/program | Yes | Low | Improve |
| `/lending/{ny-nj-ct}/dscr-loans` | Priority local program | `TRI_STATE_PROGRAM_PAGES` | Self | Index | Medium | State/apply/program | Yes | Low | Improve |
| `/brokers` | Partner page | Static metadata | Self | Noindex | Medium | Portal/apply | No | Outside primary lead goal | Noindex |
| `/team` | Team page | Route metadata | Self | Noindex | Medium | About/apply | No | Contains unverified bio/headshot risk | Noindex until verified |
| `/ai-context` | AI reference utility | Static metadata | Missing explicit canonical before | Noindex | Medium | None/core | No | SEO-first utility | Noindex |
| `/seo-status` | Internal status | Route metadata | Self/root inherited | Noindex by omission only | Medium | Internal | No | Utility | Keep out of sitemap |
| `/portal/**` | Portal app | App routes/middleware | N/A | Robots disallowed | N/A | Auth nav | No | Not marketing content | Keep blocked |
| `/api/**` | API routes | N/A | N/A | Robots disallowed | N/A | N/A | No | N/A | Keep blocked |
| `/_not-found` and unknown URLs | 404 | `app/not-found.tsx` | N/A | Not indexable | N/A | N/A | No | N/A | Keep |

## Selected Indexable Dynamic Slugs

Blog slugs in sitemap: `dscr-loan-llc-vs-personal-name`, `brrrr-method-complete-guide-2026`, `hard-money-lender-prepayment-penalty`, `fix-and-flip-loan-rehab-draw-process`, `dscr-loan-rental-income-calculation`, `bridge-loan-vs-hard-money-loan`, `ground-up-construction-loan-requirements`, `fix-and-flip-loan-requirements`, `hard-money-loan-rates-2026`, `how-to-calculate-after-repair-value`.

Comparison slugs in sitemap: `hard-money-loans-vs-conventional-mortgages`, `fix-and-flip-vs-brrrr-strategy`, `dscr-loans-vs-conventional-rental-loans`, `bridge-loans-vs-hard-money-loans`.

Answer slugs in sitemap: `best-hard-money-lender-fix-and-flip`, `best-dscr-lender-no-income-verification`, `fix-and-flip-loans-100-percent-rehab-funding`.

Priority city paths in sitemap: `/lending/new-york/brooklyn`, `/lending/new-york/buffalo`, `/lending/new-york/rochester`, `/lending/new-york/syracuse`.
