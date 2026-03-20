import { LoanProgram, FAQItem, ProcessStep } from './types';

export const LOAN_PROGRAMS: LoanProgram[] = [
  {
    id: 'fix-flip',
    title: 'Fix & Flip',
    subtitle: 'INVESTMENTS',
    maxLTC: '92.5%',
    highlights: [
      'Up to 92.5% LTC & 75% LTV',
      'Up to 100% rehab funded',
      'Loans up to $5MM',
      '13, 19-month term options',
      '1-4 unit residential properties',
      'Pay no interest on undrawn renovation funds'
    ],
    otherOptions: '*Bridge only options available',
    color: 'bg-primary',
    icon: '🏠'
  },
  {
    id: 'ground-up',
    title: 'Ground-Up',
    subtitle: 'CONSTRUCTION',
    maxLTC: '90%',
    highlights: [
      'Up to 90% LTC & 70% LTARV',
      'Up to 100% of construction',
      'Loans up to $5MM',
      '19, 24-month term options',
      'Spec builds, infills, neighborhood developments',
      'Pay no interest on undrawn construction funds'
    ],
    otherOptions: 'BUILD2RENT\u00AE: Flexible DSCR options',
    color: 'bg-charcoal',
    icon: '🏗️'
  },
  {
    id: 'rental',
    title: 'Rental',
    subtitle: 'PROPERTIES',
    maxLTV: '80%',
    highlights: [
      'Up to 80% LTV on purchase & refi',
      'Up to 75% LTV on cash out',
      'Loans up to $3MM',
      '30-year fixed rate, 10|1 ARM & 5 year interest-only',
      '1-4 unit residential properties'
    ],
    color: 'bg-charcoal-lighter',
    icon: '🏘️'
  }
];

export const LENDING_PROCESS: ProcessStep[] = [
  {
    title: 'Submission',
    description: 'Provide basic deal info (PP, Rehab, ARV) via our secure portal.'
  },
  {
    title: 'Review',
    description: 'Our specialists provide a soft-quote within 24 hours of submission.'
  },
  {
    title: 'Due Diligence',
    description: 'Valuations and title work are ordered to verify asset potential.'
  },
  {
    title: 'Funding',
    description: 'Final approval and closing, often within 7-10 business days.'
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What states does AssetLift Lending operate in?",
    answer: "We lend nationwide across the US, with some exclusions in AK, ND, SD, and VT. We are heavily focused on high-growth urban and suburban markets."
  },
  {
    question: "How long does it take to get a loan approved?",
    answer: "We provide soft-quotes and pre-approvals within 24 hours. Full funding typically occurs within 7 to 10 business days."
  },
  {
    question: "Do you offer financing for first-time investors?",
    answer: "Yes, though leverage may be slightly reduced for first-time investors. We specialize in scaling portfolios for both new and seasoned professional investors."
  },
  {
    question: "What is the maximum loan amount?",
    answer: "Our standard programs go up to $5 Million per asset. For larger portfolio deals, we can facilitate institutional-grade funding above $10 Million."
  }
];

export const BROKER_INFO = {
  name: 'AssetLift Lending',
  title: 'LOAN SPECIALIST TEAM',
  email: 'info@assetliftlending.com',
  phone: '+1 929-639-2284'
};
