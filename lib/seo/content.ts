import { CITIES } from '@/lib/data/cities';
import { STATES } from '@/lib/data/states';
import type { SeoBacklogItem, SeoCandidate, SeoIdeaItem, SeoJobName } from './types';
import { SEO_CONTENT_BACKLOG, SEO_MARKETING_IDEAS } from './config';

function formatDate(date: Date) {
  return date.toISOString();
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function buildPost(input: {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  focusKeyword: string;
  publishReason: string;
  sections: Array<{ heading: string; content: string }>;
  faqs: Array<{ question: string; answer: string }>;
  sourceJob: SeoJobName;
  publishedAt: string;
}): SeoCandidate {
  return {
    slug: input.slug,
    title: input.title,
    description: input.description,
    publishedAt: input.publishedAt,
    author: 'AssetLift Team',
    authorRole: 'Lending Specialists',
    readTime: '7 min read',
    category: input.category,
    tags: input.tags,
    heroImage: '/blog/market-guide.jpg',
    sections: input.sections,
    faqs: input.faqs,
    sourceJob: input.sourceJob,
    focusKeyword: input.focusKeyword,
    publishReason: input.publishReason,
  };
}

export function buildProgrammaticCandidate(existingSlugs: Set<string>, date: Date): SeoCandidate | null {
  const city = CITIES.find((entry) => !existingSlugs.has(`investor-outlook-${entry.citySlug}-${entry.stateAbbreviation.toLowerCase()}`));
  if (!city) {
    return null;
  }

  const slug = `investor-outlook-${city.citySlug}-${city.stateAbbreviation.toLowerCase()}`;
  return buildPost({
    slug,
    title: `${city.cityName} Investor Outlook: Hard Money, Bridge, and DSCR Financing`,
    description: `A market-specific outlook for ${city.cityName} investors comparing hard money, bridge, and DSCR financing options with practical next steps.`,
    category: 'Local Markets',
    tags: [
      `${city.cityName.toLowerCase()} hard money lender`,
      `${city.cityName.toLowerCase()} bridge loans`,
      `${city.cityName.toLowerCase()} DSCR loans`,
      `${city.cityName.toLowerCase()} real estate investing`,
    ],
    focusKeyword: `hard money lender in ${city.cityName.toLowerCase()}`,
    publishReason: 'Expand city-level programmatic coverage with unique market context and stronger internal links.',
    sourceJob: 'programmatic',
    publishedAt: formatDate(date),
    sections: [
      {
        heading: `Why ${city.cityName} Keeps Producing Search Intent`,
        content: `${city.overview} Borrowers usually search with a local modifier because financing execution changes with pricing, resale pace, and neighborhood-level risk. Start with the <a href="/lending/${city.stateSlug}/${city.citySlug}">${city.cityName} lending page</a> when you need market context tied to actual borrowing decisions.`,
      },
      {
        heading: `What Usually Gets a ${city.cityName} File Through Underwriting`,
        content: `${city.investmentHighlight} The files that move cleanly usually have a realistic purchase basis, a documented scope, and a clear exit. If the plan is a short renovation, compare it against <a href="/loans/fix-and-flip">fix and flip financing</a>. If the deal is timing-driven or transitional, borrowers usually fit better on <a href="/loans/bridge">bridge debt</a>.`,
      },
      {
        heading: `Neighborhood Risk and Deal Fit`,
        content: `Investors often focus on neighborhoods like ${city.topNeighborhoods.slice(0, 4).join(', ')}. Those submarkets do not underwrite the same way, which is why local comps and scope discipline matter. Rental exits should be modeled against stable debt, which is why many borrowers pair short-term acquisition capital with <a href="/loans/dscr-rental">DSCR rental loans</a> once the property is stabilized.`,
      },
      {
        heading: `Best Next Step for ${city.cityName} Borrowers`,
        content: `The cleanest sequence is simple: review the market page, match the property to the right loan product, and move into the <a href="/apply">application</a> when the numbers are ready. The goal is not to chase a theoretical maximum leverage point. It is to structure a file that survives valuation, title review, and a realistic exit timeline.`,
      },
    ],
    faqs: [
      {
        question: `Are hard money loans common in ${city.cityName}?`,
        answer: `Yes. Investors in ${city.cityName} regularly use hard money and bridge debt for acquisitions, renovations, and transitional holds where speed matters more than bank-style underwriting.`,
      },
      {
        question: `Should I use bridge debt or a fix and flip loan in ${city.cityName}?`,
        answer: `Use fix and flip financing when the project includes acquisition plus rehab. Use bridge debt when timing, stabilization, or a short transition is the main reason for borrowing.`,
      },
      {
        question: `What makes a local investor file stronger in ${city.cityName}?`,
        answer: `A strong file usually includes realistic comps, a documented scope of work when rehab is involved, and an exit plan that still works if the timeline slips.`,
      },
    ],
  });
}

const STRATEGY_BRIEFS = [
  {
    slug: 'how-to-underwrite-fix-and-flip-margin',
    title: 'How to Underwrite a Fix and Flip Margin Before You Borrow',
    description: 'A practical framework for checking purchase basis, rehab scope, timeline risk, and financing fit before applying for a fix and flip loan.',
    keyword: 'fix and flip loan requirements',
    category: 'Education',
  },
  {
    slug: 'dscr-refinance-readiness-checklist',
    title: 'DSCR Refinance Readiness Checklist for BRRRR Investors',
    description: 'Use this DSCR refinance checklist to pressure-test rent, reserves, seasoning, and debt coverage before moving out of short-term debt.',
    keyword: 'how to qualify for DSCR loan',
    category: 'DSCR Rental',
  },
];

export function buildStrategyCandidate(existingSlugs: Set<string>, date: Date): SeoCandidate | null {
  const brief = STRATEGY_BRIEFS.find((entry) => !existingSlugs.has(entry.slug));
  if (!brief) {
    return null;
  }

  return buildPost({
    slug: brief.slug,
    title: brief.title,
    description: brief.description,
    category: brief.category,
    tags: [brief.keyword, 'real estate underwriting', 'investment property financing', 'hard money loans'],
    focusKeyword: brief.keyword,
    publishReason: 'Fill a mid-funnel educational gap that supports stronger, higher-intent loan applications.',
    sourceJob: 'strategy',
    publishedAt: formatDate(date),
    sections: [
      {
        heading: 'Start With Margin, Not Loan Size',
        content: `The first underwriting question is not how much leverage you can get. It is whether the project margin survives realistic costs. Borrowers should model purchase basis, rehab spend, carry costs, and sale friction before looking at structure. If the deal only works with perfect execution, the financing is not the problem. The margin is.`,
      },
      {
        heading: 'Scope Discipline Changes the Outcome',
        content: `Good files separate must-do work from optional upgrades. Lenders are far more comfortable with a line-item scope and a believable timeline than a vague renovation number. Borrowers comparing debt options should pressure-test the project against <a href="/loans/fix-and-flip">fix and flip financing</a> and decide early whether the exit is a sale or a refinance.`,
      },
      {
        heading: 'Match the Exit to the Debt',
        content: `If the plan is to hold the property, underwrite the refinance path on day one. That usually means understanding whether the finished property can move into <a href="/loans/dscr-rental">DSCR financing</a> or whether a different exit is cleaner. Short-term debt works well when the next capital stage is already mapped.`,
      },
      {
        heading: 'Use the Application When the Story Is Coherent',
        content: `Once the numbers are defensible, move the file into the <a href="/apply">application</a> with the scope, reserves, and exit logic ready. Organized borrowers usually get better execution because underwriting can focus on the deal instead of pulling basic information together.`,
      },
    ],
    faqs: [
      {
        question: 'What should I underwrite before applying for a fix and flip loan?',
        answer: 'Start with purchase basis, repair budget, hold time, carry costs, resale assumptions, and whether the exit still works if the project runs longer than expected.',
      },
      {
        question: 'Does a stronger scope of work matter to lenders?',
        answer: 'Yes. A specific scope makes underwriting cleaner because it shows where the rehab budget goes and whether the timeline is realistic.',
      },
      {
        question: 'Should I plan the refinance before I close the acquisition loan?',
        answer: 'Yes. Borrowers who understand the long-term debt path early usually make better acquisition and renovation decisions.',
      },
    ],
  });
}

const IDEA_BRIEFS = [
  {
    title: 'Fix and Flip Draw Schedule Checklist',
    keyword: 'fix and flip checklist',
    category: 'Resources',
    slug: 'fix-and-flip-draw-schedule-checklist',
  },
  {
    title: 'Bridge Loan Exit Planning Guide',
    keyword: 'bridge loan exit strategy',
    category: 'Bridge Loans',
    slug: 'bridge-loan-exit-planning-guide',
  },
];

export function buildIdeasCandidate(existingSlugs: Set<string>, date: Date): SeoCandidate | null {
  const brief = IDEA_BRIEFS.find((entry) => !existingSlugs.has(entry.slug));
  if (!brief) {
    return null;
  }

  return buildPost({
    slug: brief.slug,
    title: brief.title,
    description: `A practical ${brief.keyword} resource for investors who want cleaner deal execution and a stronger borrowing process.`,
    category: brief.category,
    tags: [brief.keyword, 'lead magnet', 'real estate investors', 'borrowing process'],
    focusKeyword: brief.keyword,
    publishReason: 'Create softer-conversion content that can rank, earn clicks, and feed loan applications.',
    sourceJob: 'ideas',
    publishedAt: formatDate(date),
    sections: [
      {
        heading: 'Why Checklists Convert Better Than Generic Promises',
        content: `Investors usually respond to assets they can use immediately. A checklist reduces ambiguity and gives borrowers a practical reason to stay engaged before they are ready for a full application.`,
      },
      {
        heading: 'Use the Checklist to Pressure-Test the File',
        content: `A clean borrowing file usually includes the purchase basis, scope, reserves, insurance path, and exit logic. Investors can compare those needs against <a href="/loans/fix-and-flip">fix and flip financing</a>, <a href="/loans/bridge">bridge loans</a>, or <a href="/loans/dscr-rental">DSCR rental loans</a> depending on the strategy.`,
      },
      {
        heading: 'Turn the Resource Into a Better Application',
        content: `The value of a checklist is not the document itself. It is the quality of the file it produces. Borrowers who arrive with the core items in place usually move through underwriting with less friction and fewer avoidable delays.`,
      },
      {
        heading: 'Where to Go Next',
        content: `Once the checklist items are in place, the next step is the <a href="/apply">application</a>. If the deal is still early, compare the relevant product page first so the financing structure matches the property plan instead of getting forced after the fact.`,
      },
    ],
    faqs: [
      {
        question: 'Why publish checklist-style SEO content?',
        answer: 'Checklist content attracts practical search intent and gives visitors a useful step before they are ready to apply for financing.',
      },
      {
        question: 'Can a resource page still generate qualified leads?',
        answer: 'Yes. Resource pages often convert better for early-stage visitors because they offer immediate value without forcing a hard commitment.',
      },
      {
        question: 'Should resource content link directly to the application?',
        answer: 'Yes. Resource pages work best when they bridge naturally into the main application or the correct loan product page.',
      },
    ],
  });
}

export function buildBacklog(): SeoBacklogItem[] {
  return SEO_CONTENT_BACKLOG;
}

export function buildIdeas(): SeoIdeaItem[] {
  return SEO_MARKETING_IDEAS;
}

export function buildSlugSetFromTitles(titles: string[]) {
  return new Set(titles.map((title) => slugify(title)));
}

export function getStateCoverageCount() {
  return STATES.length;
}
