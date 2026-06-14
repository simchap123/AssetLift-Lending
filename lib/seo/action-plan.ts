import { CITIES } from '@/lib/data/cities';
import { buildStateDemand } from './demand';
import type { SeoActionItem, SeoActionQueue, SeoOpportunitiesReport } from './types';

const CATEGORY_TESTS: Array<{ name: string; test: RegExp }> = [
  { name: 'Fix & Flip', test: /fix.?and.?flip|fix.?n.?flip|\bflip\b|rehab/i },
  { name: 'DSCR / Rental', test: /dscr|rental|brrrr|no.?income|cash.?flow/i },
  { name: 'Bridge', test: /\bbridge\b/i },
  { name: 'Construction', test: /construction|ground.?up|new.?build/i },
  { name: 'Commercial / Multifamily', test: /commercial|multifamily|multi.?family|apartment/i },
  { name: 'Hard Money', test: /hard.?money/i },
];

function categorize(text: string): string {
  return CATEGORY_TESTS.find((c) => c.test.test(text))?.name ?? 'General';
}

/**
 * Turn raw Search Console opportunities into a ranked, concrete work list.
 * Priority is impressions-weighted so the automation always surfaces the
 * highest-traffic fixes first. This is a plan the team (or a reviewed step)
 * executes — it deliberately does not auto-edit live YMYL content.
 */
export function buildActionPlan(opportunities: SeoOpportunitiesReport): SeoActionQueue {
  const generatedAt = opportunities.generatedAt;

  if (!opportunities.connected || opportunities.topQueries.length === 0) {
    return {
      generatedAt,
      connected: opportunities.connected,
      summary: opportunities.connected
        ? 'No Search Console query data available yet; action queue will populate once impressions accumulate.'
        : 'Search Console not connected; cannot build a data-driven action queue.',
      items: [],
    };
  }

  const items: SeoActionItem[] = [];

  // High impressions, weak click-through: a sharper title/meta wins clicks we
  // already earn. Highest-leverage, lowest-risk change.
  for (const page of opportunities.weakCtrPages) {
    items.push({
      type: 'improve-meta',
      target: page.page,
      category: categorize(page.page),
      priority: Math.round(page.impressions * 2),
      impressions: page.impressions,
      position: page.position,
      rationale: `${page.impressions} impressions at position ${page.position} but only ${page.clicks} clicks.`,
      action: 'Rewrite the title tag and meta description to be specific and compelling for the queries this page already ranks for.',
    });
  }

  // On page 2-3 with real impressions: a focused content/link push can reach
  // page 1.
  for (const query of opportunities.strikingDistanceQueries) {
    items.push({
      type: query.position <= 10 ? 'add-internal-links' : 'expand-content',
      target: query.query,
      category: categorize(query.query),
      priority: Math.round(query.impressions * 1.5),
      impressions: query.impressions,
      position: query.position,
      rationale: `Ranking at position ${query.position} with ${query.impressions} impressions — within striking distance of page 1.`,
      action: query.recommendation,
    });
  }

  // Highest-demand states overall: make sure the matching state/city pages are
  // genuinely strong, since these are the markets driving the most impressions.
  const stateDemand = buildStateDemand(opportunities.topQueries).slice(0, 6);
  for (const state of stateDemand) {
    const hasCity = CITIES.some((city) => city.stateSlug === state.slug);
    items.push({
      type: 'build-demand-page',
      target: state.name,
      category: 'Geo',
      priority: Math.round(state.impressions),
      impressions: state.impressions,
      position: 0,
      rationale: `${state.impressions} impressions across ${state.queries} queries mention ${state.name}.`,
      action: hasCity
        ? `Strengthen the ${state.name} state page and its city pages with local rates, market specifics, and links to DSCR/bridge/hard-money products.`
        : `Add genuine ${state.name} market coverage (state page plus top-metro city pages) to capture this demand.`,
    });
  }

  items.sort((a, b) => b.priority - a.priority);
  const ranked = items.slice(0, 25);

  return {
    generatedAt,
    connected: true,
    summary: `${ranked.length} prioritized actions from real Search Console demand (top priority: ${ranked[0]?.target ?? 'n/a'}).`,
    items: ranked,
  };
}
