import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createMetadata } from '@/lib/metadata';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';
import { CITIES } from '@/lib/data/cities';
import CityPage from '@/components/seo/CityPage';

interface Props {
  params: Promise<{ state: string; city: string }>;
}

export async function generateStaticParams() {
  return CITIES.map((c) => ({
    state: c.stateSlug,
    city: c.citySlug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: stateSlug, city: citySlug } = await params;
  const city = CITIES.find((c) => c.stateSlug === stateSlug && c.citySlug === citySlug);
  if (!city) return {};

  return createMetadata({
    title: `Hard Money Loans in ${city.cityName}, ${city.stateAbbreviation}`,
    description: `Fast hard money loans in ${city.cityName}, ${city.stateName}. Fix & flip, bridge, DSCR rental financing for ${city.cityName} real estate investors. Hear back within 24 hours, and many files close in as fast as 5 business days, subject to underwriting, valuation, title, and file complexity.`,
    path: `/lending/${city.stateSlug}/${city.citySlug}`,
  });
}

export default async function CityLendingPage({ params }: Props) {
  const { state: stateSlug, city: citySlug } = await params;
  const city = CITIES.find((c) => c.stateSlug === stateSlug && c.citySlug === citySlug);
  if (!city) notFound();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `AssetLift Lending - ${city.cityName}, ${city.stateAbbreviation}`,
    description: `Hard money loans and private lending in ${city.cityName}, ${city.stateName}`,
    url: `https://www.assetliftlending.com/lending/${city.stateSlug}/${city.citySlug}`,
    areaServed: {
      '@type': 'City',
      name: city.cityName,
      containedInPlace: {
        '@type': 'State',
        name: city.stateName,
      },
    },
    provider: { '@type': 'FinancialService', name: 'AssetLift Lending' },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: city.faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  return (
    <>
      <JsonLd data={schema} />
      <JsonLd data={faqSchema} />
      <div className="container px-4 md:px-6 pt-32">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Lending', href: '/#programs' },
            { label: city.stateName, href: `/lending/${city.stateSlug}` },
            { label: city.cityName },
          ]}
        />
      </div>
      <CityPage city={city} />
    </>
  );
}
