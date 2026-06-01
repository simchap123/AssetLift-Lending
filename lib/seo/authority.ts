import { SEO_ARTIFACT_PATHS } from './config';
import { fetchRepoFile, writeRepoFile } from './github';
import { submitSitemapToSearchConsole } from './search-console';

interface BacklinkQueueItem {
  tier: string;
  platform: string;
  targetUrl: string;
  anchorTheme: string;
  status: 'pending';
  notes: string;
}

interface BacklinkOutreachItem {
  platform: string;
  targetUrl: string;
  anchorTheme: string;
  action: string;
  notes: string;
}

interface AuthorityRunResult {
  generatedAt: string;
  published: boolean;
  backlinkQueueCount: number;
  outreachCount: number;
  anchorRotationIndex: number;
  pageRotationIndex: number;
  searchConsole: Awaited<ReturnType<typeof submitSitemapToSearchConsole>>;
  notes: string[];
}

const BACKLINK_ITEMS: BacklinkQueueItem[] = [
  {
    tier: 'Tier 1',
    platform: 'Google Business Profile',
    targetUrl: 'https://www.assetliftlending.com/',
    anchorTheme: 'AssetLift Lending',
    status: 'pending',
    notes: 'Highest priority entity listing. Must be fully verified and kept active.',
  },
  {
    tier: 'Tier 1',
    platform: 'LLMs.txt / AI crawler reference',
    targetUrl: 'https://www.assetliftlending.com/llms.txt',
    anchorTheme: 'AssetLift Lending entity facts',
    status: 'pending',
    notes: 'Keep AI-readable entity, product, contact, and citation facts current for AI crawlers that inspect llms.txt-style files.',
  },
  {
    tier: 'Tier 1',
    platform: 'LLMs-full.txt / AI citation source',
    targetUrl: 'https://www.assetliftlending.com/llms-full.txt',
    anchorTheme: 'AssetLift Lending source summary',
    status: 'pending',
    notes: 'Maintain a comprehensive AI-readable site summary for systems that use web retrieval or citation-oriented crawling.',
  },
  {
    tier: 'Tier 1',
    platform: 'LinkedIn Company Page',
    targetUrl: 'https://www.assetliftlending.com/apply',
    anchorTheme: 'AssetLift Lending',
    status: 'pending',
    notes: 'Use company overview plus application link.',
  },
  {
    tier: 'Tier 2',
    platform: 'BBB Profile',
    targetUrl: 'https://www.assetliftlending.com/licensing',
    anchorTheme: 'private lending for real estate investors',
    status: 'pending',
    notes: 'Strong trust signal for financial services.',
  },
  {
    tier: 'Tier 3',
    platform: 'BiggerPockets Profile or Mention',
    targetUrl: 'https://www.assetliftlending.com/loans/fix-and-flip',
    anchorTheme: 'fix and flip loans',
    status: 'pending',
    notes: 'Investor-relevant platform. Requires real account activity and value-first participation.',
  },
  {
    tier: 'Tier 4',
    platform: 'Guest Post Outreach',
    targetUrl: 'https://www.assetliftlending.com/loans/dscr-rental',
    anchorTheme: 'DSCR rental loans',
    status: 'pending',
    notes: 'Needs manual outreach to real estate or lending publishers.',
  },
];

const ANCHOR_ROTATION = [
  'AssetLift Lending',
  'AssetLift Lending entity facts',
  'hard money lender for real estate investors',
  'fix and flip loans',
  'DSCR rental loans',
  'bridge loans for investors',
  'commercial lending for investors',
];

const TARGET_PAGE_ROTATION = [
  'https://www.assetliftlending.com/llms.txt',
  'https://www.assetliftlending.com/llms-full.txt',
  'https://www.assetliftlending.com/apply',
  'https://www.assetliftlending.com/loans/fix-and-flip',
  'https://www.assetliftlending.com/loans/dscr-rental',
  'https://www.assetliftlending.com/loans/bridge',
  'https://www.assetliftlending.com/loans/commercial-lending',
  'https://www.assetliftlending.com/tools/fix-and-flip-calculator',
  'https://www.assetliftlending.com/tools/dscr-calculator',
  'https://www.assetliftlending.com/markets',
];

function getRotationSeed(date: string) {
  const digits = date.replace(/\D/g, '');
  return Number(digits.slice(-6)) || 0;
}

function buildOutreachBatch(generatedAt: string) {
  const seed = getRotationSeed(generatedAt);
  const anchorRotationIndex = seed % ANCHOR_ROTATION.length;
  const pageRotationIndex = seed % TARGET_PAGE_ROTATION.length;

  const items: BacklinkOutreachItem[] = BACKLINK_ITEMS.slice(0, 4).map((item, index) => ({
    platform: item.platform,
    targetUrl: TARGET_PAGE_ROTATION[(pageRotationIndex + index) % TARGET_PAGE_ROTATION.length],
    anchorTheme: ANCHOR_ROTATION[(anchorRotationIndex + index) % ANCHOR_ROTATION.length],
    action:
      item.platform === 'Guest Post Outreach'
        ? 'Pitch one publisher and offer a topic tied to the selected landing page.'
        : 'Publish or update the profile/listing using the selected target page and anchor theme.',
    notes: item.notes,
  }));

  return {
    anchorRotationIndex,
    pageRotationIndex,
    items,
  };
}

function stringifyWithTrailingNewline(value: unknown) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

export async function runAuthorityJob(options?: { dryRun?: boolean }): Promise<AuthorityRunResult> {
  const generatedAt = new Date().toISOString();
  const searchConsole = await submitSitemapToSearchConsole();
  const outreach = buildOutreachBatch(generatedAt);

  const backlinkQueuePayload = {
    generatedAt,
    items: BACKLINK_ITEMS,
  };

  const backlinkOutreachPayload = {
    generatedAt,
    anchorRotationIndex: outreach.anchorRotationIndex,
    pageRotationIndex: outreach.pageRotationIndex,
    items: outreach.items,
  };

  const searchConsolePayload = {
    generatedAt,
    connected: searchConsole.connected,
    submitted: searchConsole.submitted,
    property: searchConsole.property,
    sitemap: searchConsole.sitemap,
    message: searchConsole.message,
    ...(typeof searchConsole.status === 'number' ? { status: searchConsole.status } : {}),
  };

  const notes = [
    'Backlink queue refreshed from existing authority plan.',
    searchConsole.message,
    'AI visibility targets refreshed: llms.txt, llms-full.txt, entity facts, product pages, and high-authority citation targets.',
    'AI platforms such as ChatGPT, Perplexity, Claude, Gemini, and Copilot generally discover brands through crawlable pages, citations, backlinks, structured data, and trusted third-party mentions; this job improves those inputs but cannot force inclusion in a model index.',
    'This job cannot create third-party backlinks by itself; it can only keep the queue current and update submission status.',
    'Google Search Console sitemap submission is supported here. Google indexing for ordinary webpages is not directly force-triggered via the public Indexing API.',
  ];

  const published = Boolean(
    !options?.dryRun && process.env.SEO_GITHUB_TOKEN && process.env.SEO_GITHUB_REPO,
  );

  if (published) {
    const backlinkCurrent = await fetchRepoFile('public/seo/backlink-queue.json');
    await writeRepoFile(
      'public/seo/backlink-queue.json',
      stringifyWithTrailingNewline(backlinkQueuePayload),
      'chore(seo): refresh backlink queue',
      backlinkCurrent.sha,
    );

    const consoleCurrent = await fetchRepoFile('public/seo/search-console-status.json');
    await writeRepoFile(
      'public/seo/search-console-status.json',
      stringifyWithTrailingNewline(searchConsolePayload),
      'chore(seo): refresh search console status',
      consoleCurrent.sha,
    );

    const outreachCurrent = await fetchRepoFile('public/seo/backlink-outreach.json');
    await writeRepoFile(
      'public/seo/backlink-outreach.json',
      stringifyWithTrailingNewline(backlinkOutreachPayload),
      'chore(seo): refresh backlink outreach batch',
      outreachCurrent.sha,
    );

    const lastRunCurrent = await fetchRepoFile(SEO_ARTIFACT_PATHS.lastRun);
    await writeRepoFile(
      SEO_ARTIFACT_PATHS.lastRun,
      stringifyWithTrailingNewline({
        generatedAt,
        job: 'authority',
        published: true,
        changedUrls: searchConsole.submitted && searchConsole.sitemap ? [searchConsole.sitemap] : [],
        notes: [
          ...notes,
          `Anchor rotation index: ${outreach.anchorRotationIndex}`,
          `Page rotation index: ${outreach.pageRotationIndex}`,
        ],
      }),
      'chore(seo): record authority run',
      lastRunCurrent.sha,
    );
  }

  return {
    generatedAt,
    published,
    backlinkQueueCount: BACKLINK_ITEMS.length,
    outreachCount: outreach.items.length,
    anchorRotationIndex: outreach.anchorRotationIndex,
    pageRotationIndex: outreach.pageRotationIndex,
    searchConsole,
    notes,
  };
}
