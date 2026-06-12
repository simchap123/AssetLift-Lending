import { google } from 'googleapis';
import { NextResponse } from 'next/server';

const SITE_URL = process.env.GOOGLE_SEARCH_CONSOLE_SITE_URL || 'https://assetliftlending.com/';
const DAYS = 28;

function getDateRange() {
  const end = new Date();
  end.setDate(end.getDate() - 3); // GSC has ~3 day lag
  const start = new Date(end);
  start.setDate(start.getDate() - DAYS);
  return {
    startDate: start.toISOString().slice(0, 10),
    endDate: end.toISOString().slice(0, 10),
  };
}

function getAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n');
  if (!email || !key) throw new Error('Google service account credentials not configured.');
  return new google.auth.JWT(email, undefined, key, [
    'https://www.googleapis.com/auth/webmasters.readonly',
  ]);
}

export async function GET() {
  try {
    const auth = getAuth();
    const sc = google.searchconsole({ version: 'v1', auth });
    const { startDate, endDate } = getDateRange();

    const [queriesRes, pagesRes, summaryRes] = await Promise.all([
      sc.searchanalytics.query({
        siteUrl: SITE_URL,
        requestBody: {
          startDate,
          endDate,
          dimensions: ['query'],
          rowLimit: 10,
          orderBy: [{ fieldName: 'clicks', sortOrder: 'DESCENDING' }],
        },
      }),
      sc.searchanalytics.query({
        siteUrl: SITE_URL,
        requestBody: {
          startDate,
          endDate,
          dimensions: ['page'],
          rowLimit: 10,
          orderBy: [{ fieldName: 'clicks', sortOrder: 'DESCENDING' }],
        },
      }),
      sc.searchanalytics.query({
        siteUrl: SITE_URL,
        requestBody: { startDate, endDate, dimensions: [] },
      }),
    ]);

    const summary = summaryRes.data.rows?.[0] ?? {};

    return NextResponse.json({
      summary: {
        clicks: summary.clicks ?? 0,
        impressions: summary.impressions ?? 0,
        ctr: summary.ctr ?? 0,
        position: summary.position ?? 0,
      },
      queries: (queriesRes.data.rows ?? []).map(r => ({
        query: r.keys?.[0] ?? '',
        clicks: r.clicks ?? 0,
        impressions: r.impressions ?? 0,
        ctr: r.ctr ?? 0,
        position: r.position ?? 0,
      })),
      pages: (pagesRes.data.rows ?? []).map(r => ({
        page: (r.keys?.[0] ?? '').replace(SITE_URL, '/'),
        clicks: r.clicks ?? 0,
        impressions: r.impressions ?? 0,
        ctr: r.ctr ?? 0,
        position: r.position ?? 0,
      })),
      dateRange: { startDate, endDate },
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
