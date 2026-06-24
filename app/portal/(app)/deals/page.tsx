'use client';

import Link from 'next/link';
import { ArrowRight, Plus } from 'lucide-react';
import { usePortalDeals } from '@/lib/portal-store';
import { STATUS_CONFIG, LOAN_TYPE_LABELS, DealStatus } from '@/lib/portal-types';

function StatusBadge({ status }: { status: DealStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${cfg.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} /> {cfg.label}
    </span>
  );
}

export default function DealsPage() {
  const { deals, ready } = usePortalDeals();

  if (!ready) return (
    <div className="p-8 flex items-center justify-center h-64">
      <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const sorted = [...deals].sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">All Deals</h1>
          <p className="text-sm text-zinc-400 mt-1">{deals.length} deals total</p>
        </div>
        <Link href="/portal/deals/new" className="inline-flex items-center gap-2 bg-primary text-zinc-900 font-bold text-sm px-4 py-2.5 rounded-xl hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" /> Add Deal
        </Link>
      </div>

      <div className="grid gap-4">
        {sorted.map(deal => (
          <Link key={deal.id} href={`/portal/deals/${deal.id}`} className="block bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-primary/40 transition-colors">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <p className="font-semibold text-white">{deal.borrowerName}</p>
                  <StatusBadge status={deal.status} />
                  <span className="text-xs font-medium text-zinc-400 bg-zinc-800 px-2 py-1 rounded-lg">
                    {LOAN_TYPE_LABELS[deal.loanType]}
                  </span>
                </div>
                <p className="text-sm text-zinc-400 truncate">{deal.propertyAddress}</p>
                <div className="flex items-center gap-6 mt-3 text-xs text-zinc-500 flex-wrap">
                  <span>Broker: <span className="text-zinc-300 font-medium">{deal.brokerCompany || deal.brokerName || 'Direct'}</span></span>
                  <span>Purchase: <span className="text-zinc-300 font-medium">${deal.purchasePrice.toLocaleString()}</span></span>
                  {deal.arv && <span>ARV: <span className="text-zinc-300 font-medium">${deal.arv.toLocaleString()}</span></span>}
                  <span>Credit: <span className="text-zinc-300 font-medium">{deal.creditScore}</span></span>
                  <span>{new Date(deal.submittedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-500 shrink-0 mt-1" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
