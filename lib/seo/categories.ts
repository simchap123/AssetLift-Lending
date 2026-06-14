import type { SeoCategoryBreakdown } from './types';

export interface CategorizableQuery {
  query: string;
  impressions: number;
  clicks: number;
  position: number;
}

// Order matters: the first matching test wins, so a query like
// "dscr fix and flip" is attributed to Fix & Flip. Keep this list as the single
// source of truth for loan-category detection across the automation.
export const SEO_CATEGORY_TESTS: Array<{ name: string; test: RegExp }> = [
  { name: 'Fix & Flip', test: /fix.?and.?flip|fix.?n.?flip|\bflip\b|rehab/i },
  { name: 'DSCR / Rental', test: /dscr|rental|brrrr|no.?income|cash.?flow/i },
  { name: 'Bridge', test: /\bbridge\b/i },
  { name: 'Construction', test: /construction|ground.?up|new.?build/i },
  { name: 'Commercial / Multifamily', test: /commercial|multifamily|multi.?family|apartment/i },
  { name: 'Hard Money', test: /hard.?money/i },
];

export function categorize(text: string, fallback = 'General'): string {
  return SEO_CATEGORY_TESTS.find((entry) => entry.test.test(text))?.name ?? fallback;
}

/**
 * Aggregate queries into loan categories with impressions-weighted average
 * position and the top queries per category. Queries that match no loan
 * category are excluded so the breakdown stays product-focused.
 */
export function buildCategoryBreakdown(rows: CategorizableQuery[]): SeoCategoryBreakdown[] {
  const buckets = new Map<string, CategorizableQuery[]>();

  for (const row of rows) {
    const name = SEO_CATEGORY_TESTS.find((entry) => entry.test.test(row.query))?.name;
    if (!name) continue;
    if (!buckets.has(name)) buckets.set(name, []);
    buckets.get(name)!.push(row);
  }

  return [...buckets.entries()]
    .map(([name, rs]) => {
      const impressions = rs.reduce((sum, r) => sum + r.impressions, 0);
      const clicks = rs.reduce((sum, r) => sum + r.clicks, 0);
      const position =
        impressions > 0
          ? Number((rs.reduce((sum, r) => sum + r.position * r.impressions, 0) / impressions).toFixed(1))
          : 0;
      const topQueries = [...rs]
        .sort((a, b) => b.impressions - a.impressions)
        .slice(0, 5)
        .map((r) => ({ query: r.query, impressions: r.impressions, position: Number(r.position.toFixed(1)) }));
      return { name, queries: rs.length, impressions, clicks, position, topQueries };
    })
    .sort((a, b) => b.impressions - a.impressions);
}
