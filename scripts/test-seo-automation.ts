/**
 * Deterministic test suite for the SEO automation logic.
 * Exercises every pure function the daily jobs depend on, with synthetic inputs
 * so it needs no network or secrets. Run: npx tsx scripts/test-seo-automation.ts
 */
import { categorize, buildCategoryBreakdown } from '../lib/seo/categories';
import { buildStateDemand, orderCitiesByDemand } from '../lib/seo/demand';
import { buildActionPlan } from '../lib/seo/action-plan';
import { evaluateCandidate } from '../lib/seo/guardrails';
import {
  buildProgrammaticCandidate,
  buildStrategyCandidate,
  buildIdeasCandidate,
} from '../lib/seo/content';
import { buildAuditReport } from '../lib/seo/audit';
import { CITIES } from '../lib/data/cities';
import type { SeoCandidate, SeoOpportunitiesReport } from '../lib/seo/types';

let pass = 0;
let fail = 0;
const failures: string[] = [];

function check(desc: string, cond: boolean, detail = '') {
  if (cond) {
    pass++;
    console.log(`  [PASS] ${desc}`);
  } else {
    fail++;
    failures.push(`${desc}${detail ? ' — ' + detail : ''}`);
    console.log(`  [FAIL] ${desc}${detail ? ' — ' + detail : ''}`);
  }
}

const DATE = new Date('2026-06-16T08:00:00Z');

function makeCandidate(overrides: Partial<SeoCandidate> = {}): SeoCandidate {
  return {
    slug: 'test-post-unique',
    title: 'Test Post Title',
    description:
      'A valid meta description that comfortably sits inside the preferred one hundred twenty to one hundred eighty character window for SEO.',
    publishedAt: DATE.toISOString(),
    author: 'AssetLift Team',
    authorRole: 'Lending Specialists',
    readTime: '7 min read',
    category: 'Education',
    tags: ['dscr'],
    heroImage: '/blog/x.jpg',
    sections: [
      { heading: 'A', content: 'Link <a href="/loans/dscr-rental">DSCR</a> here.' },
      { heading: 'B', content: 'Link <a href="/apply">apply</a> here.' },
      { heading: 'C', content: 'More content.' },
      { heading: 'D', content: 'Even more content.' },
    ],
    faqs: [
      { question: 'Q1?', answer: 'A1.' },
      { question: 'Q2?', answer: 'A2.' },
      { question: 'Q3?', answer: 'A3.' },
    ],
    sourceJob: 'strategy',
    focusKeyword: 'test',
    publishReason: 'test',
    ...overrides,
  };
}

console.log('\n=== SEO AUTOMATION TEST SUITE ===\n');

console.log('-- categories.categorize --');
check('1. DSCR query categorized', categorize('dscr loan florida') === 'DSCR / Rental');
check('2. Fix & Flip query categorized', categorize('fix and flip nevada') === 'Fix & Flip');
check('3. Construction query categorized', categorize('ground up construction loan') === 'Construction');
check('4. Hard money query categorized', categorize('hard money lender texas') === 'Hard Money');
check('5. Commercial/apartment categorized', categorize('austin apartment loans') === 'Commercial / Multifamily');
check('6. First-match-wins ordering', categorize('dscr fix and flip loan') === 'Fix & Flip', categorize('dscr fix and flip loan'));
check('7. Unmatched falls back to General', categorize('best mortgage broker reviews') === 'General');

console.log('-- categories.buildCategoryBreakdown --');
const bd = buildCategoryBreakdown([
  { query: 'dscr loan md', impressions: 100, clicks: 1, position: 10 },
  { query: 'dscr calculator', impressions: 50, clicks: 0, position: 40 },
  { query: 'bridge loan co', impressions: 30, clicks: 0, position: 20 },
  { query: 'best broker', impressions: 999, clicks: 0, position: 5 }, // General -> excluded
]);
const dscrCat = bd.find((c) => c.name === 'DSCR / Rental');
check('8. Breakdown sums impressions per category', dscrCat?.impressions === 150, JSON.stringify(dscrCat?.impressions));
check('9. Weighted avg position correct', dscrCat?.position === 20, String(dscrCat?.position)); // (100*10+50*40)/150 = 20
check('10. Non-loan queries excluded from breakdown', !bd.some((c) => c.name === 'General'));
check('11. Categories sorted by impressions desc', bd[0].impressions >= bd[bd.length - 1].impressions);

console.log('-- demand.buildStateDemand / orderCitiesByDemand --');
const sd = buildStateDemand([
  { query: 'dscr loan maryland', impressions: 80, clicks: 0, position: 60 },
  { query: 'dscr loans maryland', impressions: 40, clicks: 0, position: 55 },
  { query: 'bridge loan idaho', impressions: 30, clicks: 0, position: 50 },
  { query: 'real estate investor guide west virginia', impressions: 20, clicks: 0, position: 80 },
]);
const md = sd.find((s) => s.name === 'Maryland');
check('12. State demand aggregates impressions', md?.impressions === 120, String(md?.impressions));
check('13. State demand sorted by impressions desc', sd[0].name === 'Maryland');
const wv = sd.find((s) => s.name === 'West Virginia');
const va = sd.find((s) => s.name === 'Virginia');
check('14. "west virginia" attributed to WV, not Virginia', !!wv && !va, `wv=${!!wv} va=${!!va}`);
const ordered = orderCitiesByDemand([]);
check('15. orderCitiesByDemand([]) returns full city list', ordered.length === CITIES.length);

console.log('-- action-plan.buildActionPlan --');
const emptyOpp: SeoOpportunitiesReport = {
  generatedAt: DATE.toISOString(), connected: false, dateRange: null, summary: null,
  strikingDistanceQueries: [], weakCtrPages: [], topQueries: [], categories: [], recent: null,
  dailyMetrics: [], message: '',
};
check('16. Not-connected opportunities -> empty action queue', buildActionPlan(emptyOpp).items.length === 0 && buildActionPlan(emptyOpp).connected === false);
const richOpp: SeoOpportunitiesReport = {
  generatedAt: DATE.toISOString(), connected: true, dateRange: { startDate: '2026-05-19', endDate: '2026-06-13' },
  summary: { clicks: 10, impressions: 5000, ctr: 0.002, position: 65 },
  strikingDistanceQueries: [
    { query: 'dscr loan hawaii', impressions: 12, clicks: 0, ctr: 0, position: 14, recommendation: 'expand' },
  ],
  weakCtrPages: [
    { page: '/loans/ground-up-construction', impressions: 80, clicks: 0, ctr: 0, position: 18, recommendation: 'meta' },
  ],
  topQueries: [
    { query: 'dscr loan maryland', impressions: 120, clicks: 0, position: 60 },
    { query: 'bridge loan colorado', impressions: 60, clicks: 0, position: 70 },
  ],
  categories: [], recent: null, dailyMetrics: [], message: '',
};
const plan = buildActionPlan(richOpp);
check('17. Connected opportunities produce ranked actions', plan.items.length > 0 && plan.connected);
check('18. Action queue sorted by priority desc', plan.items.every((it, i, a) => i === 0 || a[i - 1].priority >= it.priority));
check('19. Action queue capped at 25', plan.items.length <= 25);
check('20. Includes improve-meta + build-demand-page action types',
  plan.items.some((i) => i.type === 'improve-meta') && plan.items.some((i) => i.type === 'build-demand-page'));

console.log('-- guardrails.evaluateCandidate --');
const restricted = evaluateCandidate(makeCandidate({ slug: 'r1', title: 'Guaranteed Approval Loans' }), new Set());
check('21. Restricted phrase blocks auto-publish', restricted.autoPublish === false && restricted.errors.some((e) => /Restricted/.test(e)));
const thin = evaluateCandidate(
  makeCandidate({ slug: 'r2', sections: [{ heading: 'A', content: 'no links' }], faqs: [] }),
  new Set(),
);
check('22. Thin candidate (few sections/faqs/links) blocked', thin.autoPublish === false && thin.errors.length >= 3);
const dup = evaluateCandidate(makeCandidate({ slug: 'exists' }), new Set(['exists']));
check('23. Duplicate slug blocked', dup.autoPublish === false && dup.errors.some((e) => /already exists/.test(e)));
const good = evaluateCandidate(makeCandidate({ slug: 'fresh-unique-slug' }), new Set());
check('24. Valid candidate passes guardrails', good.autoPublish === true, JSON.stringify(good.errors));

console.log('-- content candidate builders --');
const prog = buildProgrammaticCandidate(new Set(), DATE);
check('25. Programmatic candidate has investor-outlook slug', !!prog && /^investor-outlook-/.test(prog.slug), prog?.slug);
const order = [...CITIES].reverse();
const progOrdered = buildProgrammaticCandidate(new Set(), DATE, order);
check('26. Programmatic respects demand city order', !!progOrdered && progOrdered.slug.includes(order[0].citySlug), progOrdered?.slug);
check('27. Programmatic candidate passes its own guardrails', !!prog && evaluateCandidate(prog, new Set()).autoPublish === true);
const strat = buildStrategyCandidate(new Set(), DATE);
const ideas = buildIdeasCandidate(new Set(), DATE);
check('28. Strategy + Ideas candidates non-null & valid',
  !!strat && !!ideas && evaluateCandidate(strat, new Set()).autoPublish && evaluateCandidate(ideas, new Set()).autoPublish);

console.log('-- audit.buildAuditReport --');
const audit = buildAuditReport(DATE);
check('29. Audit score within bounds', audit.score >= 55 && audit.score <= 100, String(audit.score));
check('30. Audit totals populated', audit.totals.blogPosts > 0 && audit.totals.states > 0 && audit.totals.cities > 0);

console.log(`\n=== ${pass} passed, ${fail} failed of ${pass + fail} ===`);
if (fail > 0) {
  console.log('\nFailures:');
  failures.forEach((f) => console.log(`  - ${f}`));
  process.exit(1);
}
console.log('All automation logic tests passed.\n');
