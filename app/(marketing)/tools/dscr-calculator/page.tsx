import type { Metadata } from 'next';
import { createMetadata } from '@/lib/metadata';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';
import DSCRCalculator from './DSCRCalculator';

export const metadata: Metadata = createMetadata({
  title: 'DSCR Calculator | Rental Property Loan Eligibility',
  description:
    'Use our free DSCR calculator to measure rental income coverage and estimate eligibility for DSCR rental property loans and refinance deals.',
  path: '/tools/dscr-calculator',
});

export default function DSCRCalculatorPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'DSCR Calculator',
    description:
      'Calculate your debt service coverage ratio (DSCR) to determine eligibility for rental property loans.',
    url: 'https://www.assetliftlending.com/tools/dscr-calculator',
    applicationCategory: 'FinanceApplication',
    provider: { '@type': 'FinancialService', name: 'AssetLift Lending' },
  };

  return (
    <>
      <JsonLd data={schema} />
      <div className="container px-4 md:px-6 pt-32">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Tools' },
            { label: 'DSCR Calculator' },
          ]}
        />
      </div>
      <DSCRCalculator />
    </>
  );
}
