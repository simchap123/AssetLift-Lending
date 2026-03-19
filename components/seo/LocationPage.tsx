'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, MapPin, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { CITIES } from '@/lib/data/cities';
import type { StateData } from '@/lib/data/states';

interface LocationPageProps {
  state: StateData;
}

export default function LocationPage({ state }: LocationPageProps) {
  const stateCities = CITIES.filter((city) => city.stateSlug === state.slug);

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
                {state.name} ({state.abbreviation})
              </p>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Hard Money Loans in {state.name}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mb-8">
              Fast, flexible real estate investment financing for {state.name} investors. Fix & flip, construction, DSCR rental, and bridge loans available statewide.
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
              <div className="text-2xl md:text-3xl font-bold text-primary">{state.medianHomePrice}</div>
              <div className="text-sm text-muted-foreground">Median Home Price</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-primary">$5MM</div>
              <div className="text-sm text-muted-foreground">Max Loan Amount</div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Overview */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Real Estate Investing in {state.name}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              {state.overview}
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {state.marketHighlight}
            </p>
          </div>
        </div>
      </section>

      {/* Top Cities */}
      <section className="py-16 md:py-24 bg-secondary/20">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Top Markets in {state.name}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {state.topCities.map((cityName, i) => {
              const cityPage = stateCities.find((city) => city.cityName === cityName);
              const content = (
                <>
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="font-medium">{cityName}</span>
                </>
              );

              if (cityPage) {
                return (
                  <motion.div
                    key={cityName}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={`/lending/${cityPage.stateSlug}/${cityPage.citySlug}`}
                      className="flex items-center gap-2 bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-colors"
                    >
                      {content}
                    </Link>
                  </motion.div>
                );
              }

              return (
                <motion.div
                key={cityName}
                className="flex items-center gap-2 bg-card border border-border rounded-lg p-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                {content}
              </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 max-w-5xl mx-auto">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                What Borrowers Need to Have Ready in {state.name}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                In most {state.name} files, the biggest delays are not interest-rate related. They
                come from weak supporting documents, insurance uncertainty, or unrealistic exit
                assumptions. Borrowers who move quickly usually have the property story, budget,
                and title/closing path organized before they ask for speed.
              </p>
              <div className="space-y-4">
                {[
                  'A clear purchase or refinance story with a believable payoff plan',
                  'Supporting numbers for value, rent, rehab budget, or completed price',
                  'Entity docs, insurance details, and a title company ready to move',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <p className="text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-4">Useful Resources</h3>
              <div className="space-y-3">
                {[
                  { label: 'Fix & Flip Calculator', href: '/tools/fix-and-flip-calculator' },
                  { label: 'DSCR Calculator', href: '/tools/dscr-calculator' },
                  { label: 'Hard Money vs. Bank Loans', href: '/blog/hard-money-vs-bank-loans' },
                  { label: 'How It Works', href: '/how-it-works' },
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
            Loan Programs Available in {state.name}
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
            {state.name} Hard Money Lending FAQ
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            {state.faqs.map((faq, i) => (
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
            Ready to Invest in {state.name}?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Get funded for your next {state.name} deal. Soft-quote within 24 hours.
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
