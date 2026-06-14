/**
 * Ad-hoc Google Search Console query report.
 * Pulls real Search Analytics data via the API and buckets queries by loan
 * category so we can see what people actually search for and where we rank.
 *
 * Usage:
 *   GSC_KEY_FILE=path/to/service-account.json npx tsx scripts/gsc-report.ts
 *
 * Reads credentials from a service-account JSON file (path in GSC_KEY_FILE) so
 * no secret is hard-coded. Site URL defaults to the production property.
 */
import { readFileSync } from 'node:fs';
import { google } from 'googleapis';
import { buildCategoryBreakdown } from '../lib/seo/categories';

const SITE_URL = process.env.GOOGLE_SEARCH_CONSOLE_SITE_URL || 'https://www.assetliftlending.com/';
const KEY_FILE = process.env.GSC_KEY_FILE;
const DAYS = Number(process.env.GSC_DAYS) || 90;

interface Row {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

function pad(value: string | number, width: number, right = false): string {
  const s = String(value);
  return right ? s.padStart(width) : s.padEnd(width);
}

async function main() {
  if (!KEY_FILE) throw new Error('Set GSC_KEY_FILE to the service-account JSON path.');
  const creds = JSON.parse(readFileSync(KEY_FILE, 'utf8')) as {
    client_email: string;
    private_key: string;
  };

  const auth = new google.auth.JWT({
    email: creds.client_email,
    key: creds.private_key,
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });
  const sc = google.searchconsole({ version: 'v1', auth });

  const end = new Date();
  end.setDate(end.getDate() - 3); // GSC ~3-day data lag
  const start = new Date(end);
  start.setDate(start.getDate() - DAYS);
  const startDate = start.toISOString().slice(0, 10);
  const endDate = end.toISOString().slice(0, 10);

  const res = await sc.searchanalytics.query({
    siteUrl: SITE_URL,
    requestBody: { startDate, endDate, dimensions: ['query'], rowLimit: 1000 },
  });

  const rows: Row[] = (res.data.rows ?? []).map((r) => ({
    query: r.keys?.[0] ?? '',
    clicks: r.clicks ?? 0,
    impressions: r.impressions ?? 0,
    ctr: r.ctr ?? 0,
    position: r.position ?? 0,
  }));

  console.log(`\n=== GSC report for ${SITE_URL} (${startDate} → ${endDate}, ${DAYS} days) ===`);
  console.log(`Total distinct queries pulled: ${rows.length}`);
  console.log(`Total impressions: ${rows.reduce((s, r) => s + r.impressions, 0)}`);
  console.log(`Total clicks: ${rows.reduce((s, r) => s + r.clicks, 0)}`);

  console.log(`\n--- TOP 30 QUERIES BY IMPRESSIONS (what people actually search) ---`);
  console.log(`${pad('Query', 48)}${pad('Impr', 7, true)}${pad('Clicks', 8, true)}${pad('AvgPos', 8, true)}`);
  [...rows]
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 30)
    .forEach((r) => {
      console.log(
        `${pad(r.query.slice(0, 47), 48)}${pad(r.impressions, 7, true)}${pad(r.clicks, 8, true)}${pad(r.position.toFixed(1), 8, true)}`,
      );
    });

  const breakdown = buildCategoryBreakdown(rows);

  console.log(`\n--- BY LOAN CATEGORY (impressions, clicks, weighted avg position) ---`);
  console.log(`${pad('Category', 26)}${pad('Queries', 9, true)}${pad('Impr', 8, true)}${pad('Clicks', 8, true)}${pad('AvgPos', 8, true)}`);
  for (const c of breakdown) {
    console.log(`${pad(c.name, 26)}${pad(c.queries, 9, true)}${pad(c.impressions, 8, true)}${pad(c.clicks, 8, true)}${pad(c.position.toFixed(1), 8, true)}`);
  }

  console.log(`\n--- BEST OPPORTUNITY QUERIES PER CATEGORY (highest impressions) ---`);
  for (const c of breakdown) {
    console.log(`\n  ${c.name}:`);
    c.topQueries.forEach((q) => {
      console.log(
        `    ${pad(q.query.slice(0, 44), 45)} impr ${pad(q.impressions, 4, true)}  pos ${q.position.toFixed(1)}`,
      );
    });
  }

  console.log('');
}

main().catch((err) => {
  console.error('GSC report failed:', err instanceof Error ? err.message : err);
  process.exit(1);
});
