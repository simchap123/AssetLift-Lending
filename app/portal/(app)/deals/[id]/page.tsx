'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Phone, Mail, MapPin, FileText, CheckCircle, Circle, Pencil, X, Save, Trash2, Upload } from 'lucide-react';
import { usePortalDeals } from '@/lib/portal-store';
import { STATUS_CONFIG, STATUS_PIPELINE, LOAN_TYPE_LABELS, DealStatus, LoanType } from '@/lib/portal-types';

function fmt(n: number) { return '$' + n.toLocaleString('en-US'); }

const inputCls = 'w-full h-9 rounded-lg bg-zinc-800 border border-zinc-700 px-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-primary transition-colors';
const selectCls = 'w-full h-9 rounded-lg bg-zinc-800 border border-zinc-700 px-3 text-sm text-white focus:outline-none focus:border-primary transition-colors';

const STATUSES: DealStatus[] = ['submitted', 'under_review', 'term_sheet_issued', 'docs_required', 'closing', 'funded', 'declined'];
const LOAN_TYPES: LoanType[] = ['fix-flip', 'dscr-rental', 'bridge', 'ground-up', 'commercial'];
const CREDIT_SCORES = ['760+', '720-759', '680-719', '640-679', '600-640', 'Below 600'];

function StatusBadge({ status }: { status: DealStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold border ${cfg.color}`}>
      <span className={`w-2 h-2 rounded-full ${cfg.dot}`} /> {cfg.label}
    </span>
  );
}

export default function DealDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { deals, ready, updateDeal, deleteDeal } = usePortalDeals();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [uploadError, setUploadError] = useState('');

  if (!ready) return (
    <div className="p-8 flex items-center justify-center h-64">
      <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const deal = deals.find(d => d.id === params.id);
  if (!deal) return (
    <div className="p-8">
      <p className="text-zinc-400">Deal not found.</p>
      <Link href="/portal/deals" className="text-primary text-sm mt-2 inline-block">← Back to Deals</Link>
    </div>
  );

  const pipelineIndex = STATUS_PIPELINE.indexOf(deal.status);

  const startEdit = () => {
    setDraft({
      brokerName: deal.brokerName || '',
      brokerCompany: deal.brokerCompany || '',
      brokerEmail: deal.brokerEmail || '',
      brokerPhone: deal.brokerPhone || '',
      borrowerName: deal.borrowerName,
      borrowerEmail: deal.borrowerEmail,
      borrowerPhone: deal.borrowerPhone,
      status: deal.status,
      loanType: deal.loanType,
      propertyAddress: deal.propertyAddress,
      creditScore: deal.creditScore,
      flipsCompleted: deal.flipsCompleted || '',
      notes: deal.notes || '',
    });
    setEditing(true);
  };

  const saveEdit = () => {
    updateDeal(deal.id, {
      brokerName: draft.brokerName || undefined,
      brokerCompany: draft.brokerCompany || undefined,
      brokerEmail: draft.brokerEmail || undefined,
      brokerPhone: draft.brokerPhone || undefined,
      borrowerName: draft.borrowerName,
      borrowerEmail: draft.borrowerEmail,
      borrowerPhone: draft.borrowerPhone,
      status: draft.status as DealStatus,
      loanType: draft.loanType as LoanType,
      propertyAddress: draft.propertyAddress,
      creditScore: draft.creditScore,
      flipsCompleted: draft.flipsCompleted || undefined,
      notes: draft.notes || undefined,
    });
    setEditing(false);
  };

  const handleDelete = () => {
    if (!confirm('Delete this deal? This cannot be undone.')) return;
    deleteDeal(deal.id);
    router.push('/portal/deals');
  };

  const handleTermSheetUpload = (file: File | undefined) => {
    setUploadError('');
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) {
      setUploadError('Upload a file under 8 MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      updateDeal(deal.id, {
        termSheetUrl: String(reader.result),
        termSheetName: file.name,
        termSheetSize: file.size,
        termSheetIssuedAt: new Date().toISOString(),
        status: 'term_sheet_issued',
      });
    };
    reader.onerror = () => setUploadError('Could not read that file. Try another PDF or document.');
    reader.readAsDataURL(file);
  };

  const set = (k: string, v: string) => setDraft(p => ({ ...p, [k]: v }));

  return (
    <div className="p-8 max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <Link href="/portal/deals" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors mb-5">
          <ArrowLeft className="w-4 h-4" /> Back to Deals
        </Link>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold text-white">{deal.borrowerName}</h1>
            <p className="text-zinc-400 mt-1 flex items-center gap-2">
              <MapPin className="w-4 h-4 shrink-0" /> {deal.propertyAddress}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={deal.status} />
            {!editing ? (
              <button onClick={startEdit} className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 border border-zinc-700 px-3 py-2 rounded-lg hover:border-primary hover:text-primary transition-colors">
                <Pencil className="w-3.5 h-3.5" /> Edit
              </button>
            ) : (
              <>
                <button onClick={saveEdit} className="flex items-center gap-1.5 text-xs font-bold bg-primary text-zinc-900 px-3 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                  <Save className="w-3.5 h-3.5" /> Save
                </button>
                <button onClick={() => setEditing(false)} className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 border border-zinc-700 px-3 py-2 rounded-lg hover:border-zinc-500 transition-colors">
                  <X className="w-3.5 h-3.5" /> Cancel
                </button>
              </>
            )}
            <button onClick={handleDelete} className="flex items-center gap-1.5 text-xs font-semibold text-red-400 border border-red-900/50 px-3 py-2 rounded-lg hover:border-red-500 transition-colors">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Status pipeline */}
      {deal.status !== 'declined' && !editing && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-6">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-5">Deal Progress</h2>
          <div className="flex items-center gap-0">
            {STATUS_PIPELINE.map((step, i) => {
              const done = pipelineIndex > i;
              const current = pipelineIndex === i;
              const cfg = STATUS_CONFIG[step];
              return (
                <div key={step} className="flex items-center flex-1 min-w-0">
                  <div className="flex flex-col items-center flex-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 border-2 ${done ? 'bg-primary border-primary' : current ? 'border-primary bg-primary/10' : 'border-zinc-700 bg-zinc-800'}`}>
                      {done ? <CheckCircle className="w-4 h-4 text-zinc-900" /> : <Circle className={`w-4 h-4 ${current ? 'text-primary' : 'text-zinc-600'}`} />}
                    </div>
                    <p className={`text-[10px] font-medium text-center leading-tight px-1 ${done || current ? 'text-zinc-200' : 'text-zinc-600'}`}>
                      {cfg.label}
                    </p>
                  </div>
                  {i < STATUS_PIPELINE.length - 1 && (
                    <div className={`h-0.5 flex-1 -mt-5 mx-1 ${done ? 'bg-primary' : 'bg-zinc-700'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Broker */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-4">Broker</h2>
          {editing ? (
            <div className="space-y-3">
              <input className={inputCls} placeholder="Broker name" value={draft.brokerName} onChange={e => set('brokerName', e.target.value)} />
              <input className={inputCls} placeholder="Broker company" value={draft.brokerCompany} onChange={e => set('brokerCompany', e.target.value)} />
              <input className={inputCls} type="email" placeholder="Broker email" value={draft.brokerEmail} onChange={e => set('brokerEmail', e.target.value)} />
              <input className={inputCls} placeholder="Broker phone" value={draft.brokerPhone} onChange={e => set('brokerPhone', e.target.value)} />
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-white font-semibold text-lg">{deal.brokerCompany || deal.brokerName || 'Direct borrower'}</p>
              {deal.brokerName && deal.brokerCompany && <p className="text-sm text-zinc-400">{deal.brokerName}</p>}
              {deal.brokerEmail && (
                <a href={`mailto:${deal.brokerEmail}`} className="flex items-center gap-2 text-sm text-zinc-300 hover:text-primary transition-colors">
                  <Mail className="w-4 h-4 text-zinc-500" /> {deal.brokerEmail}
                </a>
              )}
              {deal.brokerPhone && (
                <a href={`tel:${deal.brokerPhone}`} className="flex items-center gap-2 text-sm text-zinc-300 hover:text-primary transition-colors">
                  <Phone className="w-4 h-4 text-zinc-500" /> {deal.brokerPhone}
                </a>
              )}
              {!deal.brokerEmail && !deal.brokerPhone && (
                <p className="text-sm text-zinc-500">No broker contact details saved.</p>
              )}
            </div>
          )}
        </div>

        {/* Borrower */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-4">Borrower</h2>
          {editing ? (
            <div className="space-y-3">
              <input className={inputCls} placeholder="Full name" value={draft.borrowerName} onChange={e => set('borrowerName', e.target.value)} />
              <input className={inputCls} type="email" placeholder="Email" value={draft.borrowerEmail} onChange={e => set('borrowerEmail', e.target.value)} />
              <input className={inputCls} placeholder="Phone" value={draft.borrowerPhone} onChange={e => set('borrowerPhone', e.target.value)} />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-zinc-500 mb-1 block">Credit Score</label>
                  <select className={selectCls} value={draft.creditScore} onChange={e => set('creditScore', e.target.value)}>
                    {CREDIT_SCORES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-zinc-500 mb-1 block">Completed Flips</label>
                  <input className={inputCls} placeholder="e.g. 1-3" value={draft.flipsCompleted} onChange={e => set('flipsCompleted', e.target.value)} />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-white font-semibold text-lg">{deal.borrowerName}</p>
              <a href={`mailto:${deal.borrowerEmail}`} className="flex items-center gap-2 text-sm text-zinc-300 hover:text-primary transition-colors">
                <Mail className="w-4 h-4 text-zinc-500" /> {deal.borrowerEmail}
              </a>
              <a href={`tel:${deal.borrowerPhone}`} className="flex items-center gap-2 text-sm text-zinc-300 hover:text-primary transition-colors">
                <Phone className="w-4 h-4 text-zinc-500" /> {deal.borrowerPhone}
              </a>
              <div className="pt-3 border-t border-zinc-800 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-zinc-500 text-xs mb-1">Credit Score</p>
                  <p className="text-zinc-200 font-medium">{deal.creditScore}</p>
                </div>
                {deal.flipsCompleted && (
                  <div>
                    <p className="text-zinc-500 text-xs mb-1">Completed Flips</p>
                    <p className="text-zinc-200 font-medium">{deal.flipsCompleted}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Deal Details */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-4">Deal Details</h2>
          {editing ? (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-zinc-500 mb-1 block">Loan Type</label>
                  <select className={selectCls} value={draft.loanType} onChange={e => set('loanType', e.target.value)}>
                    {LOAN_TYPES.map(t => <option key={t} value={t}>{LOAN_TYPE_LABELS[t]}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-zinc-500 mb-1 block">Status</label>
                  <select className={selectCls} value={draft.status} onChange={e => set('status', e.target.value)}>
                    {STATUSES.map(s => <option key={s} value={s}>{STATUS_CONFIG[s].label}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs text-zinc-500 mb-1 block">Property Address</label>
                <input className={inputCls} value={draft.propertyAddress} onChange={e => set('propertyAddress', e.target.value)} />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><p className="text-zinc-500 text-xs mb-1">Loan Type</p><p className="text-zinc-200 font-medium">{LOAN_TYPE_LABELS[deal.loanType]}</p></div>
              <div><p className="text-zinc-500 text-xs mb-1">Purchase Price</p><p className="text-zinc-200 font-medium">{fmt(deal.purchasePrice)}</p></div>
              {deal.loanAmount && <div><p className="text-zinc-500 text-xs mb-1">Loan Amount</p><p className="text-zinc-200 font-medium">{fmt(deal.loanAmount)}</p></div>}
              {deal.arv && <div><p className="text-zinc-500 text-xs mb-1">ARV</p><p className="text-zinc-200 font-medium">{fmt(deal.arv)}</p></div>}
              {deal.rehabAmount && <div><p className="text-zinc-500 text-xs mb-1">Rehab Budget</p><p className="text-zinc-200 font-medium">{fmt(deal.rehabAmount)}</p></div>}
              {deal.loanAmount && <div><p className="text-zinc-500 text-xs mb-1">LTC / LTV</p><p className="text-zinc-200 font-medium">{Math.round((deal.loanAmount / deal.purchasePrice) * 100)}%</p></div>}
              <div><p className="text-zinc-500 text-xs mb-1">Submitted</p><p className="text-zinc-200 font-medium">{new Date(deal.submittedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p></div>
              <div><p className="text-zinc-500 text-xs mb-1">Last Updated</p><p className="text-zinc-200 font-medium">{new Date(deal.updatedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p></div>
            </div>
          )}
        </div>

        {/* Term Sheet */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Term Sheet</h2>
            <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-zinc-700 px-3 py-2 text-xs font-semibold text-zinc-300 transition-colors hover:border-primary hover:text-primary">
              <Upload className="w-3.5 h-3.5" />
              Upload
              <input
                type="file"
                className="sr-only"
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                onChange={e => handleTermSheetUpload(e.target.files?.[0])}
              />
            </label>
          </div>
          {deal.termSheetUrl ? (
            <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
              <div className="mb-4 flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">{deal.termSheetName || 'Term sheet uploaded'}</p>
                  <p className="text-xs text-zinc-500">
                    {deal.termSheetIssuedAt ? `Uploaded ${new Date(deal.termSheetIssuedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}` : 'Uploaded'}
                    {deal.termSheetSize ? ` | ${(deal.termSheetSize / 1024 / 1024).toFixed(2)} MB` : ''}
                  </p>
                </div>
              </div>
              <a href={deal.termSheetUrl} download={deal.termSheetName || 'term-sheet'} className="inline-flex items-center gap-2 bg-primary text-zinc-900 font-bold text-sm px-4 py-2.5 rounded-xl hover:bg-primary/90 transition-colors">
                <FileText className="w-4 h-4" /> Download Term Sheet
              </a>
            </div>
          ) : (
            <div className="border-2 border-dashed border-zinc-700 rounded-xl p-6 text-center">
              <FileText className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
              <p className="text-sm text-zinc-400">No term sheet yet</p>
              <p className="text-xs text-zinc-600 mt-1">Upload a PDF or document for this deal.</p>
            </div>
          )}
          {uploadError && <p className="mt-3 text-sm text-red-400">{uploadError}</p>}
        </div>

        {/* Notes */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-4">Internal Notes</h2>
          {editing ? (
            <textarea
              className="w-full rounded-xl bg-zinc-800 border border-zinc-700 px-3 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-primary transition-colors resize-none"
              rows={5}
              value={draft.notes}
              onChange={e => set('notes', e.target.value)}
              placeholder="Add internal notes..."
            />
          ) : (
            <p className="text-sm text-zinc-300 leading-relaxed">{deal.notes || <span className="text-zinc-500">No notes yet.</span>}</p>
          )}
        </div>
      </div>
    </div>
  );
}
