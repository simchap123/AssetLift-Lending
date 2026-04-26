import type { Metadata } from 'next';
import { createMetadata } from '@/lib/metadata';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';
import { LOAN_PRODUCTS } from '@/lib/data/loan-products';
import LoanProductPage from '@/components/seo/LoanProductPage';

const product = LOAN_PRODUCTS.find((p) => p.slug === 'fix-and-flip')!;

export const metadata: Metadata = createMetadata({
  title: 'Fix & Flip Loans | Up to 90% Purchase Financing',
  description:
    'Get fix and flip loans with up to 90% purchase financing, rehab funding, and closings in as fast as 5 business days subject to underwriting, valuation, title, and file complexity.',
  path: '/loans/fix-and-flip',
});

export default function FixAndFlipPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LoanOrCredit',
    name: product.title,
    description: product.description,
    category: 'Fix and Flip Loan',
    provider: { '@type': 'FinancialService', name: 'AssetLift Lending' },
    url: 'https://www.assetliftlending.com/loans/fix-and-flip',
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Fix and Flip Financing',
    serviceType: 'Fix and flip loan',
    provider: { '@type': 'FinancialService', name: 'AssetLift Lending' },
    areaServed: 'US',
    url: 'https://www.assetliftlending.com/loans/fix-and-flip',
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

  return (
    <>
      <JsonLd data={schema} />
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />
      <div className="container px-4 md:px-6 pt-32">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Loans', href: '/#programs' }, { label: 'Fix & Flip' }]} />
      </div>
      <LoanProductPage product={product} />
    </>
  );
}
