import type { Metadata } from 'next';
import { createMetadata } from '@/lib/metadata';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';
import { LOAN_PRODUCTS } from '@/lib/data/loan-products';
import LoanProductPage from '@/components/seo/LoanProductPage';
import { AGGREGATE_REVIEW_RATING, BORROWER_REVIEWS } from '@/lib/data/reviews';

const product = LOAN_PRODUCTS.find((p) => p.slug === 'dscr-rental')!;

export const metadata: Metadata = createMetadata({
  title: 'DSCR Rental Loans | 30-Year Investor Financing',
  description:
    'Qualify for DSCR rental loans based on property cash flow, not personal income. Get fast quotes for purchase and refinance investor loans.',
  path: '/loans/dscr-rental',
});

export default function DSCRRentalPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LoanOrCredit',
    name: product.title,
    description: product.description,
    category: 'DSCR Rental Loan',
    provider: { '@type': 'FinancialService', name: 'AssetLift Lending' },
    url: 'https://www.assetliftlending.com/loans/dscr-rental',
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'DSCR Rental Financing',
    serviceType: 'DSCR rental loan',
    provider: { '@type': 'FinancialService', name: 'AssetLift Lending' },
    areaServed: 'US',
    url: 'https://www.assetliftlending.com/loans/dscr-rental',
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
    name: 'DSCR Rental Loans | AssetLift Lending',
    url: 'https://www.assetliftlending.com/loans/dscr-rental',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'h2', '[data-speakable]', '.hero-description'],
    },
  };

  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: 'AssetLift Lending',
    url: 'https://www.assetliftlending.com/loans/dscr-rental',
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
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Loans', href: '/loans' }, { label: 'DSCR Rental' }]} />
      </div>
      <LoanProductPage product={product} />
    </>
  );
}
