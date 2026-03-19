'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, MapPin, Users, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { CityData } from '@/lib/data/cities';

interface CityPageProps {
  city: CityData;
}

export default function CityPage({ city }: CityPageProps) {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container px-4 md:px-6 relative">
          <motion.div
            className="max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-primary" />
              <p className="text-primary font-semibold text-sm uppercase tracking-wider">
                {city.cityName}, {city.stateAbbreviation}
              </p>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Hard Money Loans in {city.cityName}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mb-8">
              Fast, flexible real estate investment financing for {city.cityName} investors. Fix & flip, bridge, DSCR rental, and construction loans. Close in 7-10 days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="text-lg px-8 py-6 glow-primary">
                <Link href="/apply">
                  Apply Now <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                <a href="tel:+19296392284">Call (929) 639-2284</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-secondary/30">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-primary">92.5%</div>
              <div className="text-sm text-muted-foreground">Max LTC</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-primary">7-10</div>
              <div className="text-sm text-muted-foreground">Days to Close</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-primary">{city.medianHomePrice}</div>
              <div className="text-sm text-muted-foreground">Median Home Price</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-primary">{city.population}</div>
              <div className="text-sm text-muted-foreground">Population</div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Overview */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Real Estate Investing in {city.cityName}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              {city.overview}
            </p>
            <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 mt-8">
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <Home className="w-5 h-5 text-primary" />
                Investment Highlight
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {city.investmentHighlight}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Neighborhoods */}
      <section className="py-16 md:py-24 bg-secondary/20">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Popular Investment Neighborhoods in {city.cityName}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {city.topNeighborhoods.map((neighborhood, i) => (
              <motion.div
                key={neighborhood}
                className="flex items-center gap-2 bg-card border border-border rounded-lg p-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="font-medium text-sm">{neighborhood}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 max-w-5xl mx-auto">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                What Usually Gets a {city.cityName} Deal Moving Faster
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                The cleanest files in {city.cityName} usually have a realistic budget, market
                support for the value or rent story, and a borrower who already knows whether the
                exit is a sale, a refinance, or a longer hold. Speed matters, but clarity matters
                more. A fast lender still needs a file that makes sense.
              </p>
              <div className="space-y-4">
                {[
                  `A deal strategy that fits ${city.cityName}'s pricing and neighborhood comps`,
                  'A title, insurance, and entity setup that will not create last-minute closing friction',
                  'Numbers that still work if the sale timeline or refinance timing stretches',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <p className="text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-4">Useful Resources</h3>
              <div className="space-y-3">
                {[
                  { label: 'Fix & Flip Loans', href: '/loans/fix-and-flip' },
                  { label: 'DSCR Rental Loans', href: '/loans/dscr-rental' },
                  { label: 'How to Finance Your First Fix and Flip', href: '/blog/how-to-finance-first-fix-and-flip' },
                  { label: 'Hard Money vs. Bank Loans', href: '/blog/hard-money-vs-bank-loans' },
                ].map((resource) => (
                  <Link
                    key={resource.href}
                    href={resource.href}
                    className="flex items-center justify-between gap-3 rounded-xl border border-border px-4 py-3 hover:border-primary/50 hover:bg-secondary/30 transition-colors"
                  >
                    <span className="font-medium">{resource.label}</span>
                    <ArrowRight className="w-4 h-4 text-primary" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Available */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Loan Programs Available in {city.cityName}
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { title: 'Fix & Flip Loans', desc: 'Up to 92.5% LTC with 100% rehab funding. 13-19 month terms.', href: '/loans/fix-and-flip' },
              { title: 'Ground-Up Construction', desc: 'Up to 90% LTC with 100% construction funding. 19-24 month terms.', href: '/loans/ground-up-construction' },
              { title: 'DSCR Rental Loans', desc: 'Up to 80% LTV. 30-year fixed rate. No income verification.', href: '/loans/dscr-rental' },
              { title: 'Bridge Loans', desc: 'Up to 80% LTV. Close in 7-10 days. Flexible exit strategies.', href: '/loans/bridge' },
            ].map((program, i) => (
              <Link
                key={i}
                href={program.href}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors group"
              >
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{program.title}</h3>
                <p className="text-muted-foreground text-sm mb-3">{program.desc}</p>
                <span className="text-primary text-sm font-medium flex items-center gap-1">
                  Learn more <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 md:py-24 bg-secondary/20">
        <div className="container px-4 md:px-6 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            {city.cityName} Hard Money Lending FAQ
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            {city.faqs.map((faq, i) => (
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
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Invest in {city.cityName}?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Get funded for your next {city.cityName} deal. Soft-quote within 24 hours.
          </p>
          <Button asChild size="lg" className="text-lg px-10 py-7 glow-primary">
            <Link href="/apply">
              Apply for Funding <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
