import type { Metadata } from 'next';
import { createMetadata } from '@/lib/metadata';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from 'next/link';
import { ArrowRight, Shield, Zap, Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = createMetadata({
  title: 'About AssetLift Lending | Direct Private Money Lender',
  description:
    'AssetLift Lending is a direct private money lender providing fast, flexible real estate investment loans. NMLS #1324403. Nationwide lending in 46 states.',
  path: '/about',
});

export default function AboutPage() {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: 'AssetLift Lending',
    description: 'Direct private money lender for real estate investors',
    url: 'https://assetliftlending.com',
    telephone: '+1-929-639-2284',
    email: 'info@assetliftlending.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '300 East McBee Ave., STE 200',
      addressLocality: 'Greenville',
      addressRegion: 'SC',
      postalCode: '29601',
      addressCountry: 'US',
    },
    areaServed: 'US',
    priceRange: '$100,000 - $5,000,000',
  };

  return (
    <>
      <JsonLd data={orgSchema} />
      <div className="pt-32 pb-20 md:pt-40">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto mb-12">
            <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />
          </div>

          {/* Hero */}
          <div className="max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              About <span className="gradient-text">AssetLift Lending</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              AssetLift Lending is a direct private money lender built for real estate investors who need speed, certainty, and competitive terms. We are not a bank. We are not a broker. We fund loans directly from our own capital, which means faster approvals, simpler processes, and reliable closings.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Our team combines decades of real estate investing experience with institutional-grade underwriting to deliver financing that actually works for investors in the field. Whether you are flipping your first house or scaling a portfolio of rental properties, we have a program designed for your strategy.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We lend nationwide across 46 states, with a focus on high-growth urban and suburban markets. Our loan programs cover the full spectrum of investment real estate: fix and flip, ground-up construction, DSCR rental, and bridge financing.
            </p>
          </div>

          {/* Values */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-20">
            {[
              { icon: Zap, title: 'Speed', desc: 'Close in as fast as 7-10 business days. We move at your pace.' },
              { icon: Shield, title: 'Reliability', desc: 'Direct lender means direct control. No surprises at the closing table.' },
              { icon: Users, title: 'Partnership', desc: 'We succeed when you succeed. Our team is invested in your growth.' },
              { icon: Award, title: 'Expertise', desc: 'Decades of combined real estate and lending experience.' },
            ].map((value, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.desc}</p>
              </div>
            ))}
          </div>

          {/* Company Details */}
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6">Company Details</h2>
            <div className="bg-card border border-border rounded-xl p-6 space-y-3">
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Company</span>
                <span className="font-medium">AssetLift Lending</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">NMLS #</span>
                <span className="font-medium">1324403</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Type</span>
                <span className="font-medium">Direct Private Lender</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Coverage</span>
                <span className="font-medium">46 U.S. States</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Loan Range</span>
                <span className="font-medium">$100K - $5MM+</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Headquarters</span>
                <span className="font-medium">Greenville, SC</span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Work With Us</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Whether you are an investor, broker, or capital partner, we would love to hear from you.
            </p>
            <Button asChild size="lg" className="text-lg px-10 py-7 glow-primary">
              <Link href="/apply">
                Get Started <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
