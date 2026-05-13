import type { Metadata } from 'next';
import { createMetadata } from '@/lib/metadata';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';
import { LOAN_PRODUCTS } from '@/lib/data/loan-products';
import LoanProductPage from '@/components/seo/LoanProductPage';
import { AGGREGATE_REVIEW_RATING, BORROWER_REVIEWS } from '@/lib/data/reviews';

const product = LOAN_PRODUCTS.find((p) => p.slug === 'ground-up-construction')!;

export const metadata: Metadata = createMetadata({
  title: 'Ground-Up Construction Loans | Up to 85% LTC',
  description:
    'Finance land, vertical construction, and draw-based project costs with ground-up construction loans for builders and real estate investors.',
  path: '/loans/ground-up-construction',
});

export default function GroundUpConstructionPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LoanOrCredit',
    name: product.title,
    description: product.description,
    category: 'Ground-Up Construction Loan',
    provider: { '@type': 'FinancialService', name: 'AssetLift Lending' },
    url: 'https://www.assetliftlending.com/loans/ground-up-construction',
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Ground-Up Construction Financing',
    serviceType: 'Ground-up construction loan',
    provider: { '@type': 'FinancialService', name: 'AssetLift Lending' },
    areaServed: 'US',
    url: 'https://www.assetliftlending.com/loans/ground-up-construction',
    description: product.description,
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: product.faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  const speakableSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Ground-Up Construction Loans | AssetLift Lending',
    url: 'https://www.assetliftlending.com/loans/ground-up-construction',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'h2', '[data-speakable]', '.hero-description'],
    },
  };

  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: 'AssetLift Lending',
    url: 'https://www.assetliftlending.com/loans/ground-up-construction',
    aggregateRating: {
      '@type': 'AggregateRating',
      ...AGGREGATE_REVIEW_RATING,
    },
    review: BORROWER_REVIEWS.map((review) => ({
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
        bestRating: 5,
        worstRating: 1,
      },
      author: {
        '@type': 'Person',
        name: review.name,
      },
      name: `${review.type} borrower review`,
      reviewBody: review.text,
    })),
  };

  return (
    <>
      <JsonLd data={schema} />
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={speakableSchema} />
      <JsonLd data={reviewSchema} />
      <div className="container px-4 md:px-6 pt-32">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Loans', href: '/loans' }, { label: 'Ground-Up Construction' }]} />
      </div>
      <LoanProductPage product={product} />
    </>
  );
}
