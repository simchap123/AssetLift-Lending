import type { Metadata } from 'next';
import { createMetadata } from '@/lib/metadata';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FAQ_CATEGORIES, ALL_FAQS } from '@/lib/data/faq-expanded';
import FAQAccordion from './FAQAccordion';

export const metadata: Metadata = createMetadata({
  title: 'FAQ | Hard Money Loan Questions Answered',
  description:
    'Get answers to common questions about hard money loans, fix & flip financing, DSCR loans, loan requirements, application process, rates, and more.',
  path: '/faq',
});

export default function FAQPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: ALL_FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <div className="pt-32 pb-20 md:pt-40">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto mb-12">
            <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'FAQ' }]} />
          </div>

          {/* Hero */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about hard money lending, our programs, and the application process.
            </p>
          </div>

          {/* FAQ Sections */}
          <div className="max-w-3xl mx-auto mb-16">
            <FAQAccordion categories={FAQ_CATEGORIES} />
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Our loan specialists are happy to answer any questions. Call, email, or submit a deal for a personalized response.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="glow-primary">
                <Link href="/apply">
                  Apply for Funding <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="tel:+19296392284">Call (929) 639-2284</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
