import type { Metadata } from 'next';
import { createMetadata } from '@/lib/metadata';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';
import FlipCalculator from './FlipCalculator';

export const metadata: Metadata = createMetadata({
  title: 'Fix & Flip Calculator | House Flip Profit Estimator',
  description:
    'Use our free fix and flip calculator to estimate rehab costs, holding costs, projected resale value, and profit on your next house flip.',
  path: '/tools/fix-and-flip-calculator',
});

export default function FixAndFlipCalculatorPage() {
  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Fix & Flip Calculator',
    description:
      'Estimate your fix and flip project profitability including acquisition, renovation, holding costs, and projected return.',
    url: 'https://www.assetliftlending.com/tools/fix-and-flip-calculator',
    applicationCategory: 'FinanceApplication',
    provider: { '@type': 'FinancialService', name: 'AssetLift Lending' },
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to use the AssetLift fix and flip calculator',
    description:
      'Model a fix and flip deal by entering purchase price, rehab budget, after-repair value, hold period, and project cost assumptions.',
    url: 'https://www.assetliftlending.com/tools/fix-and-flip-calculator',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Enter acquisition numbers',
        text: 'Add the purchase price, renovation budget, and after-repair value for the property you are analyzing.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Set your cost assumptions',
        text: 'Adjust the hold period, interest rate, closing costs, and selling costs to match the real project.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Review projected profit',
        text: 'Use the estimated profit, all-in cost, and cash-on-cash ROI output to decide whether the spread is strong enough.',
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What profit margin should a house flip target?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most investors want enough projected spread to absorb rehab overruns, carry extensions, and sales friction. The right target depends on market speed, renovation risk, and experience level, but thin projected margins usually become thinner in real execution.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should I use gross profit or cash-on-cash return to evaluate a flip?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use both. Gross profit shows the raw dollar spread, while cash-on-cash ROI helps you compare how efficiently your own capital is being used.',
        },
      },
      {
        '@type': 'Question',
        name: 'What costs do new flippers usually miss?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'New investors often underwrite insurance, holding time, utilities, draw delays, price reductions, and selling costs too aggressively. A useful calculator should force those assumptions into the deal before you submit an offer.',
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
            { label: 'Fix & Flip Calculator' },
          ]}
        />
      </div>
      <FlipCalculator />
    </>
  );
}
