'use client';

import Link from 'next/link';
import { ArrowRight, Phone, Mail } from 'lucide-react';
import { usePortalDeals } from '@/lib/portal-store';
import { STATUS_CONFIG, LOAN_TYPE_LABELS, DealStatus } from '@/lib/portal-types';

function StatusBadge({ status }: { status: DealStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${cfg.color}`}>
      {cfg.label}
    </span>
  );
}

export default function ClientsPage() {
  const { deals, ready } = usePortalDeals();

  if (!ready) return (
    <div className="p-8 flex items-center justify-center h-64">
      <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const clientMap = new Map<string, typeof deals>();
  for (const deal of deals) {
    const existing = clientMap.get(deal.borrowerEmail) || [];
    clientMap.set(deal.borrowerEmail, [...existing, deal]);
  }
  const clients = Array.from(clientMap.values()).sort(
    (a, b) => new Date(b[0].submittedAt).getTime() - new Date(a[0].submittedAt).getTime()
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Clients</h1>
        <p className="text-sm text-zinc-400 mt-1">{clients.length} borrowers in the system</p>
      </div>

      <div className="grid gap-4">
        {clients.map(clientDeals => {
          const primary = clientDeals[0];
          const clientId = encodeURIComponent(primary.borrowerEmail);
          return (
            <div key={primary.borrowerEmail} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <Link href={`/portal/clients/${clientId}`} className="font-semibold text-white text-lg hover:text-primary transition-colors">
                    {primary.borrowerName}
                  </Link>
                  <div className="flex items-center gap-4 mt-1.5 flex-wrap">
                    <a href={`mailto:${primary.borrowerEmail}`} className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-primary transition-colors">
                      <Mail className="w-3.5 h-3.5" /> {primary.borrowerEmail}
                    </a>
                    <a href={`tel:${primary.borrowerPhone}`} className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-primary transition-colors">
                      <Phone className="w-3.5 h-3.5" /> {primary.borrowerPhone}
                    </a>
                  </div>
                </div>
                <Link href={`/portal/clients/${clientId}`} className="shrink-0 text-xs font-medium text-primary border border-primary/30 px-3 py-1.5 rounded-lg hover:bg-primary/10 transition-colors">
                  View Dashboard
                </Link>
              </div>

              <div className="space-y-2">
                {clientDeals.map(deal => (
                  <Link key={deal.id} href={`/portal/deals/${deal.id}`} className="flex items-center justify-between gap-3 bg-zinc-800/50 border border-zinc-700/50 rounded-lg px-4 py-3 hover:border-primary/40 transition-colors">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <span className="text-xs font-medium text-zinc-400 bg-zinc-700 px-2 py-0.5 rounded shrink-0">
                        {LOAN_TYPE_LABELS[deal.loanType]}
                      </span>
                      <p className="text-sm text-zinc-300 truncate">{deal.propertyAddress}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <StatusBadge status={deal.status} />
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
