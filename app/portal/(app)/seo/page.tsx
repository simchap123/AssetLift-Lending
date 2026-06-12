'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, MousePointerClick, Eye, Target, Search, FileText, RefreshCw, AlertCircle } from 'lucide-react';

interface SummaryData {
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

interface QueryRow {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

interface PageRow {
  page: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

interface GSCData {
  summary: SummaryData;
  queries: QueryRow[];
  pages: PageRow[];
  dateRange: { startDate: string; endDate: string };
  error?: string;
}

function pct(n: number) { return (n * 100).toFixed(1) + '%'; }
function pos(n: number) { return n.toFixed(1); }

function StatCard({ label, value, sub, icon: Icon }: { label: string; value: string; sub: string; icon: React.ElementType }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-zinc-400 font-medium uppercase tracking-wider">{label}</p>
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-4 h-4 text-primary" />
        </div>
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-xs text-zinc-500 mt-1">{sub}</p>
    </div>
  );
}

function TableHeader({ cols }: { cols: string[] }) {
  return (
    <thead>
      <tr className="border-b border-zinc-800">
        {cols.map(c => (
          <th key={c} className="px-5 py-3 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider whitespace-nowrap">{c}</th>
        ))}
      </tr>
    </thead>
  );
}

export default function SEOPage() {
  const [data, setData] = useState<GSCData | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch('/api/search-console');
      setData(await res.json());
    } catch {
      setData({ error: 'Failed to fetch data', summary: { clicks: 0, impressions: 0, ctr: 0, position: 0 }, queries: [], pages: [], dateRange: { startDate: '', endDate: '' } });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  if (loading) return (
    <div className="p-8 flex items-center justify-center h-64">
      <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (data?.error) return (
    <div className="p-8">
      <div className="bg-zinc-900 border border-red-800/50 rounded-xl p-6 flex items-start gap-4">
        <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-white mb-1">Search Console not connected</p>
          <p className="text-sm text-zinc-400">{data.error}</p>
          <p className="text-sm text-zinc-500 mt-2">Add <code className="text-primary">GOOGLE_SERVICE_ACCOUNT_EMAIL</code> and <code className="text-primary">GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY</code> to your Vercel environment variables.</p>
        </div>
      </div>
    </div>
  );

  const { summary, queries, pages, dateRange } = data!;

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">SEO Performance</h1>
          <p className="text-sm text-zinc-400 mt-1">
            {dateRange.startDate} — {dateRange.endDate} &nbsp;·&nbsp; Last 28 days
          </p>
        </div>
        <button
          onClick={load}
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 px-3 py-2 rounded-lg transition-colors"
        >
          <RefreshCw className="w-4 h-4" /> Refresh
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Clicks" value={summary.clicks.toLocaleString()} sub="28-day total" icon={MousePointerClick} />
        <StatCard label="Impressions" value={summary.impressions.toLocaleString()} sub="28-day total" icon={Eye} />
        <StatCard label="Avg CTR" value={pct(summary.ctr)} sub="Click-through rate" icon={Target} />
        <StatCard label="Avg Position" value={pos(summary.position)} sub="Lower is better" icon={TrendingUp} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-zinc-800 flex items-center gap-2">
            <Search className="w-4 h-4 text-primary" />
            <h2 className="font-semibold text-white">Top Keywords</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <TableHeader cols={['Keyword', 'Clicks', 'Impr.', 'Pos.']} />
              <tbody className="divide-y divide-zinc-800/60">
                {queries.map(r => (
                  <tr key={r.query} className="hover:bg-zinc-800/40 transition-colors">
                    <td className="px-5 py-3 text-zinc-300 max-w-[200px] truncate" title={r.query}>{r.query}</td>
                    <td className="px-5 py-3 text-white font-medium">{r.clicks}</td>
                    <td className="px-5 py-3 text-zinc-400">{r.impressions}</td>
                    <td className="px-5 py-3">
                      <span className={`font-semibold ${r.position <= 3 ? 'text-emerald-400' : r.position <= 10 ? 'text-yellow-400' : 'text-zinc-400'}`}>
                        {pos(r.position)}
                      </span>
                    </td>
                  </tr>
                ))}
                {queries.length === 0 && (
                  <tr><td colSpan={4} className="px-5 py-8 text-center text-zinc-500">No data yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-zinc-800 flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            <h2 className="font-semibold text-white">Top Pages</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <TableHeader cols={['Page', 'Clicks', 'Impr.', 'Pos.']} />
              <tbody className="divide-y divide-zinc-800/60">
                {pages.map(r => (
                  <tr key={r.page} className="hover:bg-zinc-800/40 transition-colors">
                    <td className="px-5 py-3 text-zinc-300 max-w-[200px] truncate font-mono text-xs" title={r.page}>{r.page}</td>
                    <td className="px-5 py-3 text-white font-medium">{r.clicks}</td>
                    <td className="px-5 py-3 text-zinc-400">{r.impressions}</td>
                    <td className="px-5 py-3">
                      <span className={`font-semibold ${r.position <= 3 ? 'text-emerald-400' : r.position <= 10 ? 'text-yellow-400' : 'text-zinc-400'}`}>
                        {pos(r.position)}
                      </span>
                    </td>
                  </tr>
                ))}
                {pages.length === 0 && (
                  <tr><td colSpan={4} className="px-5 py-8 text-center text-zinc-500">No data yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
