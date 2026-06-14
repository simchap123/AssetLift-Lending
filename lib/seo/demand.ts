import { CITIES, type CityData } from '@/lib/data/cities';
import { STATES } from '@/lib/data/states';
import type { SeoTopQuery } from './types';

export interface StateDemand {
  slug: string;
  name: string;
  abbreviation: string;
  impressions: number;
  queries: number;
}

// States sorted longest-name-first so "West Virginia" is matched before
// "Virginia" and a query is only ever attributed to one state.
const STATES_BY_NAME_LENGTH = [...STATES].sort((a, b) => b.name.length - a.name.length);

function matchState(query: string) {
  const q = query.toLowerCase();
  return STATES_BY_NAME_LENGTH.find((state) => q.includes(state.name.toLowerCase())) ?? null;
}

/**
 * Aggregate Search Console impressions per state by reading the state name out
 * of each query (e.g. "dscr loan maryland" -> Maryland). This is the real
 * demand signal that tells the automation which markets to prioritize.
 */
export function buildStateDemand(topQueries: SeoTopQuery[]): StateDemand[] {
  const byState = new Map<string, StateDemand>(
    STATES.map((state) => [
      state.slug,
      { slug: state.slug, name: state.name, abbreviation: state.abbreviation, impressions: 0, queries: 0 },
    ]),
  );

  for (const row of topQueries) {
    const state = matchState(row.query);
    if (!state) continue;
    const entry = byState.get(state.slug);
    if (!entry) continue;
    entry.impressions += row.impressions;
    entry.queries += 1;
  }

  return [...byState.values()]
    .filter((entry) => entry.impressions > 0)
    .sort((a, b) => b.impressions - a.impressions);
}

/**
 * Order every city so that cities in high-demand states (and cities named
 * directly in queries) come first. The programmatic job publishes from the
 * front of this list, so new pages target proven demand instead of going
 * alphabetically. Falls back to the natural city order when there is no data.
 */
export function orderCitiesByDemand(topQueries: SeoTopQuery[]): CityData[] {
  if (topQueries.length === 0) {
    return [...CITIES];
  }

  const stateImpr = new Map(buildStateDemand(topQueries).map((d) => [d.slug, d.impressions]));
  const cityImpr = new Map<string, number>();

  for (const row of topQueries) {
    const q = row.query.toLowerCase();
    for (const city of CITIES) {
      if (q.includes(city.cityName.toLowerCase())) {
        cityImpr.set(city.citySlug, (cityImpr.get(city.citySlug) ?? 0) + row.impressions);
      }
    }
  }

  const score = (city: CityData) =>
    (cityImpr.get(city.citySlug) ?? 0) * 5 + (stateImpr.get(city.stateSlug) ?? 0);

  return [...CITIES].sort((a, b) => score(b) - score(a));
}
