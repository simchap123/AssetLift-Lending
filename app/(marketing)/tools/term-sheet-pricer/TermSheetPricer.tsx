'use client';

import Link from 'next/link';
import type { WheelEvent } from 'react';
import { useState } from 'react';
import {
  ArrowRight,
  BadgeDollarSign,
  Calculator,
  Download,
  FileSpreadsheet,
  Home,
  Percent,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type FormState = {
  termSheetDate: string;
  borrowerName: string;
  propertyAddress: string;
  loanProgram: string;
  loanPurpose: string;
  closingDate: string;
  purchasePrice: string;
  arv: string;
  rehabBudget: string;
  interestRate: string;
  originationFee: string;
  loanTerm: string;
  underwritingFee: string;
  creditReportFee: string;
  otherClosingCosts: string;
  maxLtv: string;
  maxLtc: string;
  purchaseLeverage: string;
  rehabLeverage: string;
  notes: string;
};

const defaultState: FormState = {
  termSheetDate: new Date().toISOString().slice(0, 10),
  borrowerName: '',
  propertyAddress: '',
  loanProgram: 'Fix & Flip',
  loanPurpose: 'Purchase',
  closingDate: '',
  purchasePrice: '',
  arv: '',
  rehabBudget: '',
  interestRate: '11.5',
  originationFee: '2',
  loanTerm: '12',
  underwritingFee: '1495',
  creditReportFee: '95',
  otherClosingCosts: '0',
  maxLtv: '70',
  maxLtc: '85',
  purchaseLeverage: '90',
  rehabLeverage: '100',
  notes: '',
};

const loanPrograms = ['Fix & Flip', 'DSCR / Rental', 'Bridge', 'New Construction', 'Refinance'];
const loanPurposes = ['Purchase', 'Refinance', 'Cash-Out', 'Construction'];

function num(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function currency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

function percent(value: number) {
  return `${value.toFixed(value % 1 === 0 ? 0 : 1)}%`;
}

function readableDate(value: string) {
  if (!value) return 'Not set';
  const parsed = new Date(`${value}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return 'Not set';
  return parsed.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function numberInputProps(value: string) {
  return {
    value,
    inputMode: 'decimal' as const,
    onWheel: (event: WheelEvent<HTMLInputElement>) => event.currentTarget.blur(),
  };
}

export default function TermSheetPricer() {
  const [form, setForm] = useState<FormState>(defaultState);

  const updateField = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const purchasePrice = num(form.purchasePrice);
  const arv = num(form.arv);
  const rehabBudget = num(form.rehabBudget);
  const interestRate = num(form.interestRate);
  const originationFee = num(form.originationFee);
  const loanTerm = Math.max(1, num(form.loanTerm));
  const underwritingFee = num(form.underwritingFee);
  const creditReportFee = num(form.creditReportFee);
  const otherClosingCosts = num(form.otherClosingCosts);
  const maxLtv = num(form.maxLtv);
  const maxLtc = num(form.maxLtc);
  const purchaseLeverage = num(form.purchaseLeverage);
  const rehabLeverage = num(form.rehabLeverage);

  const totalProjectCost = purchasePrice + rehabBudget;
  const purchaseLoanRaw = purchasePrice * (purchaseLeverage / 100);
  const rehabLoanRaw = rehabBudget * (rehabLeverage / 100);
  const leverageLoan = purchaseLoanRaw + rehabLoanRaw;
  const ltvCap = arv * (maxLtv / 100);
  const ltcCap = totalProjectCost * (maxLtc / 100);

  let loanAmount = leverageLoan;
  let limitingFactor = 'Leverage';

  if (arv > 0 && ltvCap < loanAmount) {
    loanAmount = ltvCap;
    limitingFactor = 'LTV Cap';
  }

  if (totalProjectCost > 0 && ltcCap < loanAmount) {
    loanAmount = ltcCap;
    limitingFactor = 'LTC Cap';
  }

  loanAmount = Math.max(0, loanAmount);

  const purchaseLoan = Math.min(purchaseLoanRaw, loanAmount);
  const rehabLoan = Math.max(0, loanAmount - purchaseLoan);
  const monthlyInterestOnlyPayment = loanAmount * (interestRate / 100 / 12);
  const originationFeeAmount = loanAmount * (originationFee / 100);
  const totalFees = originationFeeAmount + underwritingFee + creditReportFee + otherClosingCosts;
  const downPayment = Math.max(0, purchasePrice - purchaseLoan);
  const cashToClose = downPayment + totalFees;
  const estimatedProfit = arv - purchasePrice - rehabBudget - totalFees;

  const metrics = {
    purchasePrice,
    arv,
    rehabBudget,
    interestRate,
    originationFee,
    loanTerm,
    underwritingFee,
    creditReportFee,
    otherClosingCosts,
    maxLtv,
    maxLtc,
    purchaseLeverage,
    rehabLeverage,
    totalProjectCost,
    leverageLoan,
    ltvCap,
    ltcCap,
    loanAmount,
    purchaseLoan,
    rehabLoan,
    monthlyInterestOnlyPayment,
    originationFeeAmount,
    totalFees,
    downPayment,
    cashToClose,
    limitingFactor,
    estimatedProfit,
  };

  return (
    <div className="min-h-screen pb-20">
      <section className="py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-7xl space-y-10">
            <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="rounded-[28px] border border-border bg-card p-6 shadow-sm md:p-8">
                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Calculator className="h-7 w-7" />
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                      Term Sheet Pricer
                    </h1>
                    <p className="mt-3 max-w-2xl text-base text-muted-foreground md:text-lg">
                      Structure proceeds, pressure-test leverage caps, and generate a lender-ready
                      pricing view that fits a Vercel deployment cleanly.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" asChild>
                      <a href="/tools/term-sheet-pricer-source.html" target="_blank" rel="noreferrer">
                        <FileSpreadsheet className="mr-2 h-4 w-4" />
                        Open Original HTML
                      </a>
                    </Button>
                    <Button onClick={() => window.print()}>
                      <Download className="mr-2 h-4 w-4" />
                      Print / Save PDF
                    </Button>
                  </div>
                </div>

                <div className="grid gap-8 xl:grid-cols-2">
                  <section className="space-y-6">
                    <div className="rounded-2xl border border-border bg-background p-5">
                      <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        <Home className="h-4 w-4" />
                        Borrower and Property
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="md:col-span-2">
                          <Label htmlFor="borrowerName">Borrower name</Label>
                          <Input
                            id="borrowerName"
                            value={form.borrowerName}
                            onChange={(event) => updateField('borrowerName', event.target.value)}
                            placeholder="Full legal name"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="propertyAddress">Property address</Label>
                          <Input
                            id="propertyAddress"
                            value={form.propertyAddress}
                            onChange={(event) => updateField('propertyAddress', event.target.value)}
                            placeholder="123 Main St, City, ST"
                          />
                        </div>
                        <div>
                          <Label htmlFor="loanProgram">Loan program</Label>
                          <select
                            id="loanProgram"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            value={form.loanProgram}
                            onChange={(event) => updateField('loanProgram', event.target.value)}
                          >
                            {loanPrograms.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <Label htmlFor="loanPurpose">Loan purpose</Label>
                          <select
                            id="loanPurpose"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            value={form.loanPurpose}
                            onChange={(event) => updateField('loanPurpose', event.target.value)}
                          >
                            {loanPurposes.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <Label htmlFor="termSheetDate">Term sheet date</Label>
                          <Input
                            id="termSheetDate"
                            type="date"
                            value={form.termSheetDate}
                            onChange={(event) => updateField('termSheetDate', event.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="closingDate">Estimated closing date</Label>
                          <Input
                            id="closingDate"
                            type="date"
                            value={form.closingDate}
                            onChange={(event) => updateField('closingDate', event.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-border bg-background p-5">
                      <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        <BadgeDollarSign className="h-4 w-4" />
                        Property Numbers
                      </div>
                      <div className="grid gap-4 md:grid-cols-3">
                        <div>
                          <Label htmlFor="purchasePrice">Purchase price</Label>
                          <Input
                            id="purchasePrice"
                            type="number"
                            placeholder="0"
                            {...numberInputProps(form.purchasePrice)}
                            onChange={(event) => updateField('purchasePrice', event.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="arv">ARV</Label>
                          <Input
                            id="arv"
                            type="number"
                            placeholder="0"
                            {...numberInputProps(form.arv)}
                            onChange={(event) => updateField('arv', event.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="rehabBudget">Rehab budget</Label>
                          <Input
                            id="rehabBudget"
                            type="number"
                            placeholder="0"
                            {...numberInputProps(form.rehabBudget)}
                            onChange={(event) => updateField('rehabBudget', event.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-border bg-background p-5">
                      <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        <Percent className="h-4 w-4" />
                        Terms and Fees
                      </div>
                      <div className="grid gap-4 md:grid-cols-3">
                        <div>
                          <Label htmlFor="interestRate">Interest rate (%)</Label>
                          <Input
                            id="interestRate"
                            type="number"
                            step="0.1"
                            {...numberInputProps(form.interestRate)}
                            onChange={(event) => updateField('interestRate', event.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="originationFee">Origination fee (%)</Label>
                          <Input
                            id="originationFee"
                            type="number"
                            step="0.1"
                            {...numberInputProps(form.originationFee)}
                            onChange={(event) =>
                              updateField('originationFee', event.target.value)
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="loanTerm">Loan term (months)</Label>
                          <Input
                            id="loanTerm"
                            type="number"
                            {...numberInputProps(form.loanTerm)}
                            onChange={(event) => updateField('loanTerm', event.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="underwritingFee">Underwriting fee</Label>
                          <Input
                            id="underwritingFee"
                            type="number"
                            {...numberInputProps(form.underwritingFee)}
                            onChange={(event) =>
                              updateField('underwritingFee', event.target.value)
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="creditReportFee">Credit report fee</Label>
                          <Input
                            id="creditReportFee"
                            type="number"
                            {...numberInputProps(form.creditReportFee)}
                            onChange={(event) =>
                              updateField('creditReportFee', event.target.value)
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="otherClosingCosts">Other closing costs</Label>
                          <Input
                            id="otherClosingCosts"
                            type="number"
                            {...numberInputProps(form.otherClosingCosts)}
                            onChange={(event) =>
                              updateField('otherClosingCosts', event.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className="space-y-6">
                    <div className="rounded-2xl border border-border bg-background p-5">
                      <div className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        Leverage Controls
                      </div>
                      <div className="space-y-5">
                        {[
                          ['maxLtv', 'Max LTV (% of ARV)', form.maxLtv],
                          ['maxLtc', 'Max LTC (% of total cost)', form.maxLtc],
                          ['purchaseLeverage', 'Purchase leverage (%)', form.purchaseLeverage],
                          ['rehabLeverage', 'Rehab leverage (%)', form.rehabLeverage],
                        ].map(([field, label, value]) => (
                          <div key={field}>
                            <div className="mb-2 flex items-center justify-between gap-3">
                              <Label htmlFor={field} className="text-sm">
                                {label}
                              </Label>
                              <span className="text-sm font-semibold text-primary">
                                {value || '0'}%
                              </span>
                            </div>
                            <Input
                              id={field}
                              type="range"
                              min="0"
                              max="100"
                              step="0.5"
                              value={value}
                              onChange={(event) =>
                                updateField(field as keyof FormState, event.target.value)
                              }
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <MetricCard label="Loan Amount" value={currency(metrics.loanAmount)} />
                        <MetricCard
                          label="Monthly Payment"
                          value={currency(metrics.monthlyInterestOnlyPayment)}
                        />
                        <MetricCard label="Total Fees" value={currency(metrics.totalFees)} />
                        <MetricCard label="Cash to Close" value={currency(metrics.cashToClose)} />
                      </div>
                    </div>

                    <div className="rounded-2xl border border-border bg-background p-5">
                      <div className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        Notes
                      </div>
                      <Textarea
                        value={form.notes}
                        onChange={(event) => updateField('notes', event.target.value)}
                        placeholder="Add pricing notes, reserve conditions, exceptions, or lender commentary."
                        rows={6}
                      />
                    </div>
                  </section>
                </div>
              </div>

              <aside className="space-y-6">
                <div className="rounded-[28px] border border-border bg-card p-6 shadow-sm md:p-8">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        Summary
                      </p>
                      <h2 className="mt-2 text-2xl font-bold">Pricing Snapshot</h2>
                    </div>
                    <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                      {metrics.limitingFactor}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <SummaryRow label="Borrower" value={form.borrowerName || 'Not provided'} />
                    <SummaryRow label="Program" value={form.loanProgram} />
                    <SummaryRow label="Purpose" value={form.loanPurpose} />
                    <SummaryRow
                      label="Term sheet date"
                      value={readableDate(form.termSheetDate)}
                    />
                    <SummaryRow label="Closing date" value={readableDate(form.closingDate)} />
                    <SummaryRow
                      label="Purchase / ARV"
                      value={`${currency(metrics.purchasePrice)} / ${currency(metrics.arv)}`}
                    />
                    <SummaryRow
                      label="Rehab / Total cost"
                      value={`${currency(metrics.rehabBudget)} / ${currency(
                        metrics.totalProjectCost
                      )}`}
                    />
                    <SummaryRow
                      label="Rate / Fee"
                      value={`${percent(metrics.interestRate)} / ${percent(
                        metrics.originationFee
                      )}`}
                    />
                    <SummaryRow label="Loan term" value={`${metrics.loanTerm} months`} />
                  </div>
                </div>

                <div className="rounded-[28px] border border-border bg-card p-6 shadow-sm md:p-8">
                  <h2 className="text-2xl font-bold">Cash to Close</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    This assumes purchase-side funds needed plus fees due at closing.
                  </p>

                  <div className="mt-6 rounded-2xl bg-primary px-5 py-6 text-primary-foreground">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/70">
                      Estimated Cash Due
                    </p>
                    <p className="mt-2 text-4xl font-bold">{currency(metrics.cashToClose)}</p>
                  </div>

                  <div className="mt-5 space-y-3">
                    <SummaryRow label="Down payment" value={currency(metrics.downPayment)} />
                    <SummaryRow
                      label="Origination fee"
                      value={currency(metrics.originationFeeAmount)}
                    />
                    <SummaryRow
                      label="Underwriting fee"
                      value={currency(metrics.underwritingFee)}
                    />
                    <SummaryRow
                      label="Credit report fee"
                      value={currency(metrics.creditReportFee)}
                    />
                    <SummaryRow
                      label="Other closing costs"
                      value={currency(metrics.otherClosingCosts)}
                    />
                  </div>
                </div>

                <div className="rounded-[28px] border border-border bg-card p-6 shadow-sm md:p-8">
                  <h2 className="text-2xl font-bold">Constraint View</h2>
                  <div className="mt-5 space-y-3">
                    <SummaryRow label="Leverage request" value={currency(metrics.leverageLoan)} />
                    <SummaryRow label="LTV cap" value={currency(metrics.ltvCap)} />
                    <SummaryRow label="LTC cap" value={currency(metrics.ltcCap)} />
                    <SummaryRow
                      label="Purchase proceeds"
                      value={currency(metrics.purchaseLoan)}
                    />
                    <SummaryRow label="Rehab proceeds" value={currency(metrics.rehabLoan)} />
                    <SummaryRow
                      label="Projected gross spread"
                      value={currency(metrics.estimatedProfit)}
                    />
                  </div>
                </div>

                <div className="rounded-[28px] border border-primary/20 bg-primary/5 p-6 shadow-sm md:p-8">
                  <h2 className="text-2xl font-bold">Next Step</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Use this pricing screen for fast scenario work, then move the borrower into the
                    application flow when the structure looks viable.
                  </p>
                  <Button asChild className="mt-5 w-full">
                    <Link href="/apply">
                      Start an Application <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </aside>
            </div>

            <section className="grid gap-6 lg:grid-cols-3 print:hidden">
              <InfoCard
                title="Why this version fits Vercel better"
                body="The original attached file was a standalone HTML document. This version is converted into a client component under the Next.js app router, so it deploys cleanly on Vercel and inherits the site's layout, metadata, and styling pipeline."
              />
              <InfoCard
                title="What stayed from your source"
                body="The pricing logic still uses leverage-first underwriting with LTV and LTC caps, plus fees, monthly interest-only payment, and cash-to-close math."
              />
              <InfoCard
                title="Original file preserved"
                body="Your uploaded HTML is also copied into the repo as a raw reference file in case you want the old single-file version available for export or comparison."
              />
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card px-4 py-5">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border pb-3 text-sm last:border-b-0 last:pb-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="max-w-[60%] text-right font-medium">{value}</span>
    </div>
  );
}

function InfoCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-[24px] border border-border bg-card p-6 shadow-sm">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{body}</p>
    </div>
  );
}
