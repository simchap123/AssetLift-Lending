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

const SITE_URL = process.env.GOOGLE_SEARCH_CONSOLE_SITE_URL || 'https://www.assetliftlending.com/';
const KEY_FILE = process.env.GSC_KEY_FILE;
const DAYS = 90;

const CATEGORIES: Array<{ name: string; test: RegExp }> = [
  { name: 'Fix & Flip', test: /fix.?and.?flip|fix.?n.?flip|\bflip\b|rehab/i },
  { name: 'DSCR / Rental', test: /dscr|rental|brrrr|no.?income|cash.?flow/i },
  { name: 'Bridge', test: /\bbridge\b/i },
  { name: 'Construction', test: /construction|ground.?up|new.?build/i },
  { name: 'Commercial / Multifamily', test: /commercial|multifamily|multi.?family|apartment/i },
  { name: 'Hard Money', test: /hard.?money/i },
];

interface Row {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

function categorize(query: string): string {
  for (const cat of CATEGORIES) {
    if (cat.test.test(query)) return cat.name;
  }
  return 'Other / Brand / Local';
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

  const buckets = new Map<string, Row[]>();
  for (const r of rows) {
    const cat = categorize(r.query);
    if (!buckets.has(cat)) buckets.set(cat, []);
    buckets.get(cat)!.push(r);
  }

  console.log(`\n--- BY LOAN CATEGORY (impressions, clicks, weighted avg position) ---`);
  const summary = [...buckets.entries()]
    .map(([name, rs]) => {
      const impr = rs.reduce((s, r) => s + r.impressions, 0);
      const clicks = rs.reduce((s, r) => s + r.clicks, 0);
      const wpos = impr > 0 ? rs.reduce((s, r) => s + r.position * r.impressions, 0) / impr : 0;
      return { name, count: rs.length, impr, clicks, wpos };
    })
    .sort((a, b) => b.impr - a.impr);

  console.log(`${pad('Category', 26)}${pad('Queries', 9, true)}${pad('Impr', 8, true)}${pad('Clicks', 8, true)}${pad('AvgPos', 8, true)}`);
  for (const s of summary) {
    console.log(`${pad(s.name, 26)}${pad(s.count, 9, true)}${pad(s.impr, 8, true)}${pad(s.clicks, 8, true)}${pad(s.wpos.toFixed(1), 8, true)}`);
  }

  console.log(`\n--- BEST OPPORTUNITY QUERIES PER CATEGORY (highest impressions) ---`);
  for (const cat of CATEGORIES) {
    const rs = (buckets.get(cat.name) ?? [])
      .filter((r) => r.impressions >= 2)
      .sort((a, b) => b.impressions - a.impressions)
      .slice(0, 5);
    if (rs.length === 0) continue;
    console.log(`\n  ${cat.name}:`);
    rs.forEach((r) => {
      console.log(
        `    ${pad(r.query.slice(0, 44), 45)} impr ${pad(r.impressions, 4, true)}  pos ${r.position.toFixed(1)}`,
      );
    });
  }

  console.log('');
}

main().catch((err) => {
  console.error('GSC report failed:', err instanceof Error ? err.message : err);
  process.exit(1);
});
