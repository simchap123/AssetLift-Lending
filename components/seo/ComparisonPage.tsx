'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { Comparison } from '@/lib/data/comparisons';

interface ComparisonPageProps {
  comparison: Comparison;
}

function getComparisonLabels(heroTitle: string) {
  const parts = heroTitle.split(' vs ');
  if (parts.length === 2) {
    return {
      left: parts[0].trim(),
      right: parts[1].trim(),
    };
  }

  return {
    left: 'Option A',
    right: 'Option B',
  };
}

export default function ComparisonPage({ comparison }: ComparisonPageProps) {
  const labels = getComparisonLabels(comparison.heroTitle);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container px-4 md:px-6">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-4">
              Comparison Guide
            </p>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
              {comparison.heroTitle}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {comparison.introText}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-12 bg-secondary/20">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-4 bg-card border border-border font-semibold">Feature</th>
                  <th className="text-left p-4 bg-primary/10 border border-border font-semibold text-primary">
                    {comparison.comparisonTable.length > 0 ? labels.left : ''}
                  </th>
                  <th className="text-left p-4 bg-card border border-border font-semibold">
                    {comparison.comparisonTable.length > 0 ? labels.right : ''}
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.comparisonTable.map((row, i) => (
                  <tr key={i}>
                    <td className="p-4 border border-border font-medium bg-card">{row.feature}</td>
                    <td className="p-4 border border-border bg-primary/5 text-sm">{row.optionA}</td>
                    <td className="p-4 border border-border bg-card text-sm text-muted-foreground">{row.optionB}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            {comparison.sections.map((section, i) => (
              <motion.div
                key={i}
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-4">{section.heading}</h2>
                <div className="text-muted-foreground leading-relaxed space-y-4">
                  {section.content.split('\n\n').map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto bg-card border border-border rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-3">Related Financing Pages</h2>
            <p className="text-muted-foreground mb-5">
              Move from the comparison into the lending product that best matches the deal,
              property condition, and exit plan.
            </p>
            <div className="grid md:grid-cols-3 gap-3">
              {[
                { label: 'Fix & Flip Loans', href: '/loans/fix-and-flip' },
                { label: 'Bridge Loans', href: '/loans/bridge' },
                { label: 'DSCR Rental Loans', href: '/loans/dscr-rental' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg border border-border px-4 py-4 hover:border-primary/50 hover:bg-secondary/30 transition-colors"
                >
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Verdict */}
      <section className="py-12 bg-primary/5">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">The Verdict</h2>
            <p className="text-muted-foreground text-lg">{comparison.verdict}</p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="space-y-4">
            {comparison.faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-card border border-border rounded-lg px-6 data-[state=open]:border-primary/50 transition-colors"
              >
                <AccordionTrigger className="text-left hover:text-primary hover:no-underline py-5 text-base font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Need Help Choosing?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Our loan specialists can help you find the right financing for your investment strategy.
          </p>
          <Button asChild size="lg" className="glow-primary">
            <Link href="/apply">
              Get a Free Quote <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
