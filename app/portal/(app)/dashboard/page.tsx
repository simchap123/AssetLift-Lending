'use client';

import Link from 'next/link';
import { ArrowRight, TrendingUp, Clock, FileCheck, DollarSign, Plus } from 'lucide-react';
import { usePortalDeals } from '@/lib/portal-store';
import { STATUS_CONFIG, LOAN_TYPE_LABELS, DealStatus } from '@/lib/portal-types';

function fmt(n: number) { return '$' + n.toLocaleString('en-US'); }

function StatusBadge({ status }: { status: DealStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${cfg.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

export default function DashboardPage() {
  const { deals, ready } = usePortalDeals();

  if (!ready) return (
    <div className="p-8 flex items-center justify-center h-64">
      <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const active = deals.filter(d => !['funded', 'declined'].includes(d.status));
  const termSheets = deals.filter(d => d.termSheetIssuedAt);
  const funded = deals.filter(d => d.status === 'funded');
  const totalVolume = funded.reduce((sum, d) => sum + (d.loanAmount || d.purchasePrice), 0);

  const stats = [
    { label: 'Total Deals', value: deals.length.toString(), icon: TrendingUp, sub: 'All time' },
    { label: 'Active', value: active.length.toString(), icon: Clock, sub: 'In pipeline' },
    { label: 'Term Sheets Out', value: termSheets.length.toString(), icon: FileCheck, sub: 'Issued' },
    { label: 'Funded Volume', value: fmt(totalVolume), icon: DollarSign, sub: 'Closed deals' },
  ];

  const sorted = [...deals].sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Deal Pipeline</h1>
          <p className="text-sm text-zinc-400 mt-1">All active and recent deals</p>
        </div>
        <Link
          href="/portal/deals/new"
          className="inline-flex items-center gap-2 bg-primary text-zinc-900 font-bold text-sm px-4 py-2.5 rounded-xl hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Deal
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, sub }) => (
          <div key={label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-zinc-400 font-medium uppercase tracking-wider">{label}</p>
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon className="w-4 h-4 text-primary" />
              </div>
            </div>
            <p className="text-2xl font-bold text-white">{value}</p>
            <p className="text-xs text-zinc-500 mt-1">{sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
          <h2 className="font-semibold text-white">All Deals</h2>
          <span className="text-xs text-zinc-500">{deals.length} deals</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800">
                {['Borrower', 'Property', 'Loan Type', 'Purchase Price', 'Status', 'Submitted', ''].map(h => (
                  <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {sorted.map(deal => (
                <tr key={deal.id} className="hover:bg-zinc-800/40 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-white">{deal.borrowerName}</p>
                    <p className="text-xs text-zinc-500">{deal.borrowerEmail}</p>
                  </td>
                  <td className="px-6 py-4 text-zinc-300 max-w-[200px] truncate">{deal.propertyAddress}</td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium text-zinc-300 bg-zinc-800 px-2 py-1 rounded-lg">
                      {LOAN_TYPE_LABELS[deal.loanType]}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-zinc-300 font-medium">{fmt(deal.purchasePrice)}</td>
                  <td className="px-6 py-4"><StatusBadge status={deal.status} /></td>
                  <td className="px-6 py-4 text-zinc-500 text-xs whitespace-nowrap">
                    {new Date(deal.submittedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4">
                    <Link href={`/portal/deals/${deal.id}`} className="flex items-center gap-1 text-primary text-xs font-semibold hover:text-primary/80 transition-colors whitespace-nowrap">
                      View <ArrowRight className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
