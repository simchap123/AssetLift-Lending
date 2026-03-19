import type { Metadata } from 'next';
import { createMetadata } from '@/lib/metadata';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';
import { LOAN_PRODUCTS } from '@/lib/data/loan-products';
import LoanProductPage from '@/components/seo/LoanProductPage';

const product = LOAN_PRODUCTS.find((p) => p.slug === 'dscr-rental')!;

export const metadata: Metadata = createMetadata({
  title: product.title,
  description: product.description,
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
    url: 'https://assetliftlending.com/loans/dscr-rental',
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

  return (
    <>
      <JsonLd data={schema} />
      <JsonLd data={faqSchema} />
      <div className="container px-4 md:px-6 pt-32">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Loans', href: '/#programs' }, { label: 'DSCR Rental' }]} />
      </div>
      <LoanProductPage product={product} />
    </>
  );
}
