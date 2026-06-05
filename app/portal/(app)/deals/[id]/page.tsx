import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Phone, Mail, MapPin, FileText, CheckCircle, Circle } from 'lucide-react';
import { MOCK_DEALS } from '@/lib/portal-mock-data';
import { STATUS_CONFIG, STATUS_PIPELINE, LOAN_TYPE_LABELS, DealStatus } from '@/lib/portal-types';

function fmt(n: number) {
  return '$' + n.toLocaleString('en-US');
}

function StatusBadge({ status }: { status: DealStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold border ${cfg.color}`}>
      <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

export default async function DealDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const deal = MOCK_DEALS.find(d => d.id === id);
  if (!deal) notFound();

  const pipelineIndex = STATUS_PIPELINE.indexOf(deal.status);

  return (
    <div className="p-8 max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/portal/deals"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors mb-5"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Deals
        </Link>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold text-white">{deal.borrowerName}</h1>
            <p className="text-zinc-400 mt-1 flex items-center gap-2">
              <MapPin className="w-4 h-4 shrink-0" />
              {deal.propertyAddress}
            </p>
          </div>
          <StatusBadge status={deal.status} />
        </div>
      </div>

      {/* Status pipeline */}
      {deal.status !== 'declined' && (
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
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 border-2 transition-all ${
                      done ? 'bg-primary border-primary' :
                      current ? 'border-primary bg-primary/10' :
                      'border-zinc-700 bg-zinc-800'
                    }`}>
                      {done
                        ? <CheckCircle className="w-4 h-4 text-zinc-900" />
                        : <Circle className={`w-4 h-4 ${current ? 'text-primary' : 'text-zinc-600'}`} />
                      }
                    </div>
                    <p className={`text-[10px] font-medium text-center leading-tight px-1 ${
                      done || current ? 'text-zinc-200' : 'text-zinc-600'
                    }`}>
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
        {/* Borrower info */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-4">Borrower</h2>
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
        </div>

        {/* Deal info */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-4">Deal Details</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-zinc-500 text-xs mb-1">Loan Type</p>
              <p className="text-zinc-200 font-medium">{LOAN_TYPE_LABELS[deal.loanType]}</p>
            </div>
            <div>
              <p className="text-zinc-500 text-xs mb-1">Purchase Price</p>
              <p className="text-zinc-200 font-medium">{fmt(deal.purchasePrice)}</p>
            </div>
            {deal.loanAmount && (
              <div>
                <p className="text-zinc-500 text-xs mb-1">Loan Amount</p>
                <p className="text-zinc-200 font-medium">{fmt(deal.loanAmount)}</p>
              </div>
            )}
            {deal.arv && (
              <div>
                <p className="text-zinc-500 text-xs mb-1">ARV</p>
                <p className="text-zinc-200 font-medium">{fmt(deal.arv)}</p>
              </div>
            )}
            {deal.rehabAmount && (
              <div>
                <p className="text-zinc-500 text-xs mb-1">Rehab Budget</p>
                <p className="text-zinc-200 font-medium">{fmt(deal.rehabAmount)}</p>
              </div>
            )}
            {deal.loanAmount && (
              <div>
                <p className="text-zinc-500 text-xs mb-1">LTC / LTV</p>
                <p className="text-zinc-200 font-medium">
                  {Math.round((deal.loanAmount / deal.purchasePrice) * 100)}%
                </p>
              </div>
            )}
            <div>
              <p className="text-zinc-500 text-xs mb-1">Submitted</p>
              <p className="text-zinc-200 font-medium">
                {new Date(deal.submittedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
            <div>
              <p className="text-zinc-500 text-xs mb-1">Last Updated</p>
              <p className="text-zinc-200 font-medium">
                {new Date(deal.updatedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>
        </div>

        {/* Term Sheet */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-4">Term Sheet</h2>
          {deal.termSheetUrl ? (
            <div>
              <p className="text-xs text-zinc-500 mb-3">
                Issued {new Date(deal.termSheetIssuedAt!).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
              <a
                href={deal.termSheetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-zinc-900 font-bold text-sm px-4 py-2.5 rounded-xl hover:bg-primary/90 transition-colors"
              >
                <FileText className="w-4 h-4" /> Download Term Sheet
              </a>
            </div>
          ) : deal.termSheetIssuedAt ? (
            <div>
              <p className="text-xs text-zinc-500 mb-1">
                Issued {new Date(deal.termSheetIssuedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
              <p className="text-sm text-zinc-400">Term sheet issued — upload file to make it available.</p>
            </div>
          ) : (
            <div className="border-2 border-dashed border-zinc-700 rounded-xl p-6 text-center">
              <FileText className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
              <p className="text-sm text-zinc-400">No term sheet yet</p>
              <p className="text-xs text-zinc-600 mt-1">Upload coming soon</p>
            </div>
          )}
        </div>

        {/* Notes */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-4">Internal Notes</h2>
          {deal.notes ? (
            <p className="text-sm text-zinc-300 leading-relaxed">{deal.notes}</p>
          ) : (
            <p className="text-sm text-zinc-500">No notes yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
