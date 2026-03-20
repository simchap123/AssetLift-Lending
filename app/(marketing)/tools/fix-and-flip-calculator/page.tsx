import type { Metadata } from 'next';
import { createMetadata } from '@/lib/metadata';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';
import FlipCalculator from './FlipCalculator';

export const metadata: Metadata = createMetadata({
  title: 'Fix & Flip Calculator - Estimate Your Flip Profit',
  description:
    'Free fix and flip calculator. Estimate purchase costs, renovation budget, holding costs, and projected profit on your next house flip.',
  path: '/tools/fix-and-flip-calculator',
});

export default function FixAndFlipCalculatorPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Fix & Flip Calculator',
    description:
      'Estimate your fix and flip project profitability including acquisition, renovation, holding costs, and projected return.',
    url: 'https://www.assetliftlending.com/tools/fix-and-flip-calculator',
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
            { label: 'Fix & Flip Calculator' },
          ]}
        />
      </div>
      <FlipCalculator />
    </>
  );
}
