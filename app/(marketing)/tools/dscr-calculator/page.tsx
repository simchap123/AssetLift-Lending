import type { Metadata } from 'next';
import { createMetadata } from '@/lib/metadata';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';
import DSCRCalculator from './DSCRCalculator';

export const metadata: Metadata = createMetadata({
  title: 'DSCR Calculator - Debt Service Coverage Ratio',
  description:
    'Free DSCR calculator for rental property investors. Calculate your debt service coverage ratio to determine loan eligibility.',
  path: '/tools/dscr-calculator',
});

export default function DSCRCalculatorPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'DSCR Calculator',
    description:
      'Calculate your debt service coverage ratio (DSCR) to determine eligibility for rental property loans.',
    url: 'https://assetliftlending.com/tools/dscr-calculator',
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
