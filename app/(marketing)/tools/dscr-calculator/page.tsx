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
  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'DSCR Calculator',
    description:
      'Calculate your debt service coverage ratio (DSCR) to determine eligibility for rental property loans.',
    url: 'https://www.assetliftlending.com/tools/dscr-calculator',
    applicationCategory: 'FinanceApplication',
    provider: { '@type': 'FinancialService', name: 'AssetLift Lending' },
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to use the AssetLift DSCR calculator',
    description:
      'Estimate debt service coverage ratio by entering monthly rent, mortgage payment, taxes, insurance, HOA dues, and a vacancy factor.',
    url: 'https://www.assetliftlending.com/tools/dscr-calculator',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Enter rent',
        text: "Add the property's expected monthly gross rent.",
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Add monthly debt costs',
        text: 'Input principal and interest, taxes, insurance, HOA dues, and a vacancy factor.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Review your ratio',
        text: 'Use the DSCR output to understand whether the property likely fits standard, qualifying, or no-ratio rental loan scenarios.',
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is a good DSCR for a rental property?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "A DSCR of 1.25x or higher is usually considered strong because the property's income materially exceeds the monthly debt load. Some programs can still work below that threshold depending on leverage, reserves, and the lender's guidelines.",
        },
      },
      {
        '@type': 'Question',
        name: 'Does DSCR use gross rent or net rent?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Lenders usually start with market rent and compare it against PITIA, though the exact method depends on the program and whether the file is treated as standard DSCR or no-ratio.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can a property qualify with a DSCR below 1.0x?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sometimes. Some lenders offer no-ratio or reduced-ratio programs, but pricing, leverage, and reserve requirements are usually tighter when the rent does not fully cover the debt service.',
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={appSchema} />
      <JsonLd data={howToSchema} />
      <JsonLd data={faqSchema} />
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
