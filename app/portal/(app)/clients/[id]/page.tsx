'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Mail, Phone, Pencil, Save, X, ArrowRight } from 'lucide-react';
import { usePortalDeals } from '@/lib/portal-store';
import { STATUS_CONFIG, LOAN_TYPE_LABELS, DealStatus } from '@/lib/portal-types';

function fmt(n: number) { return '$' + n.toLocaleString('en-US'); }

const inputCls = 'w-full h-9 rounded-lg bg-zinc-800 border border-zinc-700 px-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-primary transition-colors';

function StatusBadge({ status }: { status: DealStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${cfg.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} /> {cfg.label}
    </span>
  );
}

export default function ClientDetailPage() {
  const params = useParams();
  const { deals, ready, updateDeal } = usePortalDeals();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({ name: '', email: '', phone: '' });

  if (!ready) return (
    <div className="p-8 flex items-center justify-center h-64">
      <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const email = decodeURIComponent(params.id as string);
  const clientDeals = deals.filter(d => d.borrowerEmail === email);

  if (clientDeals.length === 0) return (
    <div className="p-8">
      <p className="text-zinc-400">Client not found.</p>
      <Link href="/portal/clients" className="text-primary text-sm mt-2 inline-block">← Back to Clients</Link>
    </div>
  );

  const client = clientDeals[0];
  const totalInvested = clientDeals.reduce((s, d) => s + d.purchasePrice, 0);
  const funded = clientDeals.filter(d => d.status === 'funded').length;
  const active = clientDeals.filter(d => !['funded', 'declined'].includes(d.status)).length;

  const startEdit = () => {
    setDraft({ name: client.borrowerName, email: client.borrowerEmail, phone: client.borrowerPhone });
    setEditing(true);
  };

  const saveEdit = () => {
    clientDeals.forEach(d => {
      updateDeal(d.id, {
        borrowerName: draft.name,
        borrowerEmail: draft.email,
        borrowerPhone: draft.phone,
      });
    });
    setEditing(false);
  };

  const set = (k: string, v: string) => setDraft(p => ({ ...p, [k]: v }));

  return (
    <div className="p-8 max-w-4xl">
      <Link href="/portal/clients" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Clients
      </Link>

      {/* Header */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-6">
        <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
          <h1 className="text-2xl font-bold text-white">{client.borrowerName}</h1>
          <div className="flex items-center gap-2">
            {!editing ? (
              <button onClick={startEdit} className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 border border-zinc-700 px-3 py-2 rounded-lg hover:border-primary hover:text-primary transition-colors">
                <Pencil className="w-3.5 h-3.5" /> Edit Info
              </button>
            ) : (
              <>
                <button onClick={saveEdit} className="flex items-center gap-1.5 text-xs font-bold bg-primary text-zinc-900 px-3 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                  <Save className="w-3.5 h-3.5" /> Save
                </button>
                <button onClick={() => setEditing(false)} className="flex items-center gap-1.5 text-xs text-zinc-400 border border-zinc-700 px-3 py-2 rounded-lg hover:border-zinc-500 transition-colors">
                  <X className="w-3.5 h-3.5" /> Cancel
                </button>
              </>
            )}
          </div>
        </div>

        {editing ? (
          <div className="grid md:grid-cols-3 gap-3">
            <input className={inputCls} placeholder="Full name" value={draft.name} onChange={e => set('name', e.target.value)} />
            <input className={inputCls} type="email" placeholder="Email" value={draft.email} onChange={e => set('email', e.target.value)} />
            <input className={inputCls} placeholder="Phone" value={draft.phone} onChange={e => set('phone', e.target.value)} />
          </div>
        ) : (
          <div className="flex items-center gap-6 flex-wrap">
            <a href={`mailto:${client.borrowerEmail}`} className="flex items-center gap-2 text-sm text-zinc-300 hover:text-primary transition-colors">
              <Mail className="w-4 h-4 text-zinc-500" /> {client.borrowerEmail}
            </a>
            <a href={`tel:${client.borrowerPhone}`} className="flex items-center gap-2 text-sm text-zinc-300 hover:text-primary transition-colors">
              <Phone className="w-4 h-4 text-zinc-500" /> {client.borrowerPhone}
            </a>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total Deals', value: clientDeals.length },
          { label: 'Active', value: active },
          { label: 'Funded', value: funded },
        ].map(({ label, value }) => (
          <div key={label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-white">{value}</p>
            <p className="text-xs text-zinc-400 mt-1">{label}</p>
          </div>
        ))}
      </div>
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center mb-6">
        <p className="text-xs text-zinc-400 mb-1">Total Deal Volume</p>
        <p className="text-xl font-bold text-primary">{fmt(totalInvested)}</p>
      </div>

      {/* Deals */}
      <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-3">Deals</h2>
      <div className="space-y-3">
        {[...clientDeals].sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()).map(deal => (
          <Link key={deal.id} href={`/portal/deals/${deal.id}`} className="flex items-center justify-between gap-3 bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4 hover:border-primary/40 transition-colors">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                <span className="text-xs font-medium text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded">
                  {LOAN_TYPE_LABELS[deal.loanType]}
                </span>
                <StatusBadge status={deal.status} />
              </div>
              <p className="text-sm text-zinc-300 truncate">{deal.propertyAddress}</p>
              <div className="flex items-center gap-4 mt-1 text-xs text-zinc-500">
                <span>Purchase: <span className="text-zinc-300">{fmt(deal.purchasePrice)}</span></span>
                <span>{new Date(deal.submittedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-zinc-500 shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
}
