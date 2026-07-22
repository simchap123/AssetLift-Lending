'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Calculator, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { gtagEvent } from '@/lib/gtag';

export default function FlipCalculator() {
  const [purchasePrice, setPurchasePrice] = useState('');
  const [rehabCost, setRehabCost] = useState('');
  const [arv, setArv] = useState('');
  const [holdingMonths, setHoldingMonths] = useState('6');
  const [interestRate, setInterestRate] = useState('10');
  const [closingCostPercent, setClosingCostPercent] = useState('3');
  const [sellingCostPercent, setSellingCostPercent] = useState('6');
  const trackedUse = useRef(false);

  const purchase = parseFloat(purchasePrice) || 0;
  const rehab = parseFloat(rehabCost) || 0;
  const afterRepair = parseFloat(arv) || 0;
  const months = parseFloat(holdingMonths) || 6;
  const rate = parseFloat(interestRate) || 10;
  const closingPct = parseFloat(closingCostPercent) || 3;
  const sellingPct = parseFloat(sellingCostPercent) || 6;

  const totalInvestment = purchase + rehab;
  const loanAmount = purchase * 0.95;
  const closingCosts = purchase * (closingPct / 100);
  const holdingCosts = loanAmount * (rate / 100 / 12) * months;
  const sellingCosts = afterRepair * (sellingPct / 100);
  const totalCosts = totalInvestment + closingCosts + holdingCosts + sellingCosts;
  const grossProfit = afterRepair - totalCosts;
  const roi = totalInvestment > 0 ? (grossProfit / (purchase * 0.05 + rehab + closingCosts)) * 100 : 0;

  const hasValues = purchase > 0 && afterRepair > 0;

  useEffect(() => {
    if (hasValues && !trackedUse.current) {
      trackedUse.current = true;
      gtagEvent('calculator_used', { calculator: 'fix_and_flip' });
    }
  }, [hasValues]);

  return (
    <div className="min-h-screen">
      <section className="py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Calculator className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                Fix & Flip Calculator
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Estimate your profit, ROI, and total costs before you make an offer. Adjust the
                numbers to model different scenarios.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Inputs */}
              <div className="bg-card border border-border rounded-xl p-6 md:p-8 space-y-6">
                <h2 className="font-semibold text-lg flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  Deal Numbers
                </h2>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="purchase">Purchase Price ($)</Label>
                    <Input
                      id="purchase"
                      type="number"
                      placeholder="250000"
                      value={purchasePrice}
                      onChange={(e) => setPurchasePrice(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="rehab">Renovation Budget ($)</Label>
                    <Input
                      id="rehab"
                      type="number"
                      placeholder="50000"
                      value={rehabCost}
                      onChange={(e) => setRehabCost(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="arv">After-Repair Value ($)</Label>
                    <Input
                      id="arv"
                      type="number"
                      placeholder="400000"
                      value={arv}
                      onChange={(e) => setArv(e.target.value)}
                    />
                  </div>
                </div>

                <h2 className="font-semibold text-lg pt-2">Assumptions</h2>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="months">Hold Period (months)</Label>
                    <Input
                      id="months"
                      type="number"
                      value={holdingMonths}
                      onChange={(e) => setHoldingMonths(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="rate">Interest Rate (%)</Label>
                    <Input
                      id="rate"
                      type="number"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="closing">Closing Costs (%)</Label>
                    <Input
                      id="closing"
                      type="number"
                      step="0.1"
                      value={closingCostPercent}
                      onChange={(e) => setClosingCostPercent(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="selling">Selling Costs (%)</Label>
                    <Input
                      id="selling"
                      type="number"
                      step="0.1"
                      value={sellingCostPercent}
                      onChange={(e) => setSellingCostPercent(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="space-y-6">
                <div className="bg-card border border-border rounded-xl p-6 md:p-8">
                  <h2 className="font-semibold text-lg flex items-center gap-2 mb-6">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Projected Results
                  </h2>

                  {hasValues ? (
                    <div className="space-y-4">
                      <div className="flex justify-between py-3 border-b border-border">
                        <span className="text-muted-foreground">Total Investment</span>
                        <span className="font-semibold">${totalInvestment.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-border">
                        <span className="text-muted-foreground">Closing Costs</span>
                        <span className="font-semibold">${closingCosts.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-border">
                        <span className="text-muted-foreground">Holding Costs ({months}mo)</span>
                        <span className="font-semibold">${Math.round(holdingCosts).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-border">
                        <span className="text-muted-foreground">Selling Costs</span>
                        <span className="font-semibold">${Math.round(sellingCosts).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-border">
                        <span className="text-muted-foreground">Total All-In Cost</span>
                        <span className="font-semibold">${Math.round(totalCosts).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between py-4 bg-primary/5 rounded-lg px-4 -mx-4">
                        <span className="font-bold text-lg">Estimated Profit</span>
                        <span
                          className={`font-bold text-lg ${
                            grossProfit >= 0 ? 'text-green-500' : 'text-red-500'
                          }`}
                        >
                          ${Math.round(grossProfit).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between py-3">
                        <span className="text-muted-foreground">Cash-on-Cash ROI</span>
                        <span
                          className={`font-bold ${
                            roi >= 0 ? 'text-green-500' : 'text-red-500'
                          }`}
                        >
                          {roi.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <AlertCircle className="w-5 h-5" />
                      <p>Enter your purchase price and ARV to see projected results.</p>
                    </div>
                  )}
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
                  <p className="font-semibold mb-2">Like these numbers?</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get your numbers reviewed against actual borrower, property, and exit details.
                  </p>
                  <Button asChild size="lg" className="glow-primary">
                    <Link href="/apply">
                      Apply for Flip Financing <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mt-16 space-y-8">
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                How to Underwrite a Flip More Realistically
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  A fix and flip calculator is most useful when it helps you pressure-test the deal
                  instead of confirming the number you want to see. The cleanest projects usually
                  have enough spread to survive one or two things going wrong without wiping out the
                  margin.
                </p>
                <p>
                  Start with the purchase, rehab budget, and after-repair value. Then be harder on
                  the assumptions that investors most often understate: carry time, financing cost,
                  and selling friction. If the deal only works under optimistic timelines, it
                  probably does not have enough room.
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Watch the ARV',
                  text: 'Use closed comparable sales from the exact neighborhood and avoid stretching into the highest comp unless the finish level truly supports it.',
                },
                {
                  title: 'Model the hold honestly',
                  text: 'Permits, contractor delays, inspection lag, and resale timing all extend carrying cost. A six-month hold can become eight quickly.',
                },
                {
                  title: 'Protect cash reserves',
                  text: 'Gross profit can look strong while the actual cash required is still too high. Compare projected margin against the cash you need to control the project.',
                },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-border bg-secondary/20 p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Fix and Flip Calculator FAQ</h2>
              <div className="space-y-6">
                {[
                  {
                    question: 'What profit margin should a house flip target?',
                    answer:
                      'There is no universal threshold, but strong flips usually have enough projected spread to absorb rehab changes, financing drag, and a softer resale than expected. If the margin disappears with minor pressure, the deal is likely too thin.',
                  },
                  {
                    question: 'Should I judge a flip by gross profit or ROI?',
                    answer:
                      'You should use both. Gross profit tells you whether the project is worth the effort in absolute dollars, while ROI shows whether your own capital is being used efficiently compared with other opportunities.',
                  },
                  {
                    question: 'What numbers do investors most often miss?',
                    answer:
                      'The most common misses are interest carry, utilities, insurance, price reductions, and extra time between rehab completion and the final sale. Those items usually matter more than shaving a few points off the rehab line.',
                  },
                ].map((faq) => (
                  <div key={faq.question}>
                    <h3 className="font-semibold mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
