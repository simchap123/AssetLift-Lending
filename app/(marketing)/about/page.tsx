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
    'AssetLift Lending is a direct private money lender providing fast, flexible real estate investment loans. Nationwide lending in 46 states.',
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
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      telephone: '+1-929-639-2284',
      email: 'info@assetliftlending.com',
      areaServed: 'US',
    },
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

          <div className="max-w-3xl mx-auto bg-card border border-border rounded-xl p-6 md:p-8 mb-16">
            <h2 className="text-2xl font-bold mb-4">Licensing and Operating Details</h2>
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <p className="font-semibold mb-1">Company</p>
                <p className="text-muted-foreground">AssetLift Lending</p>
              </div>
              <div>
                <p className="font-semibold mb-1">NMLS</p>
                <p className="text-muted-foreground">NMLS #1324403</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Primary Contact</p>
                <p className="text-muted-foreground">info@assetliftlending.com | +1 (929) 639-2284</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Office</p>
                <p className="text-muted-foreground">300 East McBee Ave., STE 200, Greenville, SC 29601</p>
              </div>
            </div>
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

          <div className="max-w-5xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-8 mb-20">
            <div>
              <h2 className="text-3xl font-bold mb-5">What Borrowers Actually Need From a Lender</h2>
              <p className="text-muted-foreground leading-relaxed mb-5">
                Sophisticated investors rarely choose a lender on headline rate alone. They want a
                lender that can underwrite quickly, explain friction early, and still close when
                the file has moving parts. That is the gap AssetLift is trying to fill.
              </p>
              <div className="space-y-4">
                {[
                  'Direct communication when a deal has valuation, title, or insurance issues',
                  'Product fit across short-term flips, bridge situations, construction, and rental holds',
                  'Execution that helps investors protect margin, not just get a term sheet',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <p className="text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Explore Loan Programs</h3>
              <div className="space-y-3">
                {[
                  { label: 'Fix & Flip Loans', href: '/loans/fix-and-flip' },
                  { label: 'Ground-Up Construction', href: '/loans/ground-up-construction' },
                  { label: 'DSCR Rental Loans', href: '/loans/dscr-rental' },
                  { label: 'Bridge Loans', href: '/loans/bridge' },
                ].map((resource) => (
                  <Link
                    key={resource.href}
                    href={resource.href}
                    className="flex items-center justify-between gap-3 rounded-lg border border-border px-4 py-3 hover:border-primary/50 hover:bg-secondary/30 transition-colors"
                  >
                    <span className="font-medium">{resource.label}</span>
                    <ArrowRight className="w-4 h-4 text-primary" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="max-w-5xl mx-auto mb-20">
            <div className="bg-secondary/20 border border-border rounded-2xl p-6 md:p-8">
              <h2 className="text-3xl font-bold mb-4">Common Deal Profiles We See</h2>
              <p className="text-muted-foreground leading-relaxed mb-6 max-w-3xl">
                These are not testimonials or promised outcomes. They are the types of investor
                situations our team regularly underwrites, which is often more useful than generic
                marketing copy when you are trying to decide if a lender fits the business plan.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  {
                    title: 'Fix & Flip Execution',
                    desc: 'Borrowers buying outdated single-family homes with a defined rehab scope, realistic ARV support, and a short resale timeline.',
                  },
                  {
                    title: 'Bridge to Stabilization',
                    desc: 'Investors using short-term capital to close quickly, solve timing issues, or carry a property through lease-up before refinancing.',
                  },
                  {
                    title: 'BRRRR and Rental Holds',
                    desc: 'Operators improving a property, seasoning the rent story, and moving into DSCR financing once the asset is stable enough for long-term debt.',
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl border border-border bg-card p-5">
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
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
