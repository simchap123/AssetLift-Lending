import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createMetadata } from '@/lib/metadata';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';
import { CITIES } from '@/lib/data/cities';
import CityPage from '@/components/seo/CityPage';
import {
  findTriStateProgramPage,
  TRI_STATE_PROGRAM_PAGES,
} from '@/lib/data/tri-state-program-pages';
import TriStateProgramPage from '@/components/seo/TriStateProgramPage';

interface Props {
  params: Promise<{ state: string; city: string }>;
}

export async function generateStaticParams() {
  return [
    ...CITIES.map((c) => ({
      state: c.stateSlug,
      city: c.citySlug,
    })),
    ...TRI_STATE_PROGRAM_PAGES.map((page) => ({
      state: page.stateSlug,
      city: page.programSlug,
    })),
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: stateSlug, city: citySlug } = await params;
  const city = CITIES.find((c) => c.stateSlug === stateSlug && c.citySlug === citySlug);
  const programPage = findTriStateProgramPage(stateSlug, citySlug);

  if (programPage) {
    return createMetadata({
      title: programPage.title,
      description: programPage.description,
      path: `/lending/${programPage.stateSlug}/${programPage.programSlug}`,
      keywords: [
        `${programPage.stateName} hard money lender`,
        `${programPage.stateAbbreviation} hard money lender`,
        `${programPage.stateName} ${programPage.programName}`,
        `${programPage.stateAbbreviation} ${programPage.programName}`,
        `${programPage.stateName} private money lender`,
        `${programPage.stateAbbreviation} private money loans`,
        `${programPage.programName} for experienced investors`,
        'private money lender',
        'real estate investor loans',
      ],
    });
  }

  if (!city) return {};

  return createMetadata({
    title: `Hard Money Lender in ${city.cityName}, ${city.stateAbbreviation}`,
    description: `Hard money lender in ${city.cityName}, ${city.stateAbbreviation}. Fix & flip, bridge, and DSCR rental financing for experienced ${city.cityName} investors.`,
    path: `/lending/${city.stateSlug}/${city.citySlug}`,
    keywords: [
      `hard money lender ${city.cityName}`,
      `hard money loans ${city.cityName}`,
      `${city.cityName} private money lender`,
      `${city.cityName} fix and flip loans`,
      `${city.cityName} DSCR loans`,
      `${city.stateName} hard money lender`,
    ],
  });
}

export default async function CityLendingPage({ params }: Props) {
  const { state: stateSlug, city: citySlug } = await params;
  const city = CITIES.find((c) => c.stateSlug === stateSlug && c.citySlug === citySlug);
  const programPage = findTriStateProgramPage(stateSlug, citySlug);

  if (programPage) {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'FinancialService',
      name: `AssetLift Lending - ${programPage.stateName} ${programPage.programName}`,
      description: programPage.description,
      url: `https://www.assetliftlending.com/lending/${programPage.stateSlug}/${programPage.programSlug}`,
      areaServed: {
        '@type': 'State',
        name: programPage.stateName,
      },
      serviceType: programPage.programName,
      priceRange: '$100,000 - $5,000,000',
      telephone: '+1-929-639-2284',
      email: 'info@assetliftlending.com',
      provider: { '@type': 'FinancialService', name: 'AssetLift Lending' },
      makesOffer: {
        '@type': 'Offer',
        name: `${programPage.stateName} ${programPage.programName}`,
        description: programPage.description,
        url: `https://www.assetliftlending.com/lending/${programPage.stateSlug}/${programPage.programSlug}`,
        eligibleRegion: {
          '@type': 'State',
          name: programPage.stateName,
        },
      },
    };

    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: programPage.faqs.map((f) => ({
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
              { label: 'Markets', href: '/markets' },
              { label: programPage.stateName, href: `/lending/${programPage.stateSlug}` },
              { label: programPage.programName },
            ]}
          />
        </div>
        <TriStateProgramPage page={programPage} />
      </>
    );
  }

  if (!city) notFound();

  const isCountyPage = city.cityName.endsWith('County');
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `AssetLift Lending - ${city.cityName}, ${city.stateAbbreviation}`,
    description: `Hard money loans and private lending in ${city.cityName}, ${city.stateName}`,
    url: `https://www.assetliftlending.com/lending/${city.stateSlug}/${city.citySlug}`,
    telephone: '+1-929-639-2284',
    email: 'info@assetliftlending.com',
    priceRange: '$100,000 - $5,000,000',
    areaServed: {
      '@type': isCountyPage ? 'AdministrativeArea' : 'City',
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
            { label: 'Markets', href: '/markets' },
            { label: city.stateName, href: `/lending/${city.stateSlug}` },
            { label: city.cityName },
          ]}
        />
      </div>
      <CityPage city={city} />
    </>
  );
}
