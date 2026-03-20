import type { Metadata } from 'next';
import { createMetadata } from '@/lib/metadata';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from 'next/link';
import { ArrowRight, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = createMetadata({
  title: 'Contact Us | AssetLift Lending',
  description:
    'Contact AssetLift Lending for fast hard money loan quotes. Call (929) 639-2284, email info@assetliftlending.com, or apply online. Response within 60 minutes.',
  path: '/contact',
});

export default function ContactPage() {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: 'AssetLift Lending',
    telephone: '+1-929-639-2284',
    email: 'info@assetliftlending.com',
    url: 'https://assetliftlending.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Queens',
      addressRegion: 'NY',
      addressCountry: 'US',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
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
      <JsonLd data={localBusinessSchema} />
      <div className="pt-32 pb-20 md:pt-40">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto mb-12">
            <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />
          </div>

          {/* Hero */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Have a deal to discuss? Need a quote? Our loan specialists typically respond within 60 minutes during business hours.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
            <a
              href="tel:+19296392284"
              className="bg-card border border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">Call Us</h3>
              <p className="text-muted-foreground text-sm">+1 (929) 639-2284</p>
            </a>
            <a
              href="mailto:info@assetliftlending.com"
              className="bg-card border border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">Email Us</h3>
              <p className="text-muted-foreground text-sm">info@assetliftlending.com</p>
            </a>
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">Office</h3>
              <p className="text-muted-foreground text-sm">
                Queens, NY
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">Hours</h3>
              <p className="text-muted-foreground text-sm">
                Mon - Fri: 9AM - 6PM EST<br />Weekend: By appointment
              </p>
            </div>
          </div>

          {/* Apply CTA */}
          <div className="max-w-3xl mx-auto text-center bg-card border border-border rounded-xl p-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Fastest Way to Get a Quote
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Submit your deal details through our online application. You will receive a detailed soft-quote including rate, leverage, and terms within 24 hours.
            </p>
            <Button asChild size="lg" className="text-lg px-10 py-7 glow-primary">
              <Link href="/apply">
                Apply Online <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <div className="grid md:grid-cols-3 gap-3 mt-8 text-left">
              {[
                { label: 'Fix & Flip Loans', href: '/loans/fix-and-flip' },
                { label: 'DSCR Rental Loans', href: '/loans/dscr-rental' },
                { label: 'How It Works', href: '/how-it-works' },
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
      </div>
    </>
  );
}
