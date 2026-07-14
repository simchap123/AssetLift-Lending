import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import Hero from "@/components/landing/Hero";
import WhyAssetLift from "@/components/landing/WhyAssetLift";
import LoanPrograms from "@/components/landing/LoanPrograms";
import HowItWorks from "@/components/landing/HowItWorks";
import FAQ from "@/components/landing/FAQ";
import CTA from "@/components/landing/CTA";
import Testimonials from "@/components/landing/Testimonials";
import PromoBanner from "@/components/landing/PromoBanner";
import MarketsPreview from "@/components/landing/MarketsPreview";
import AnimatedStats from "@/components/landing/AnimatedStats";
import StickyMobileCTA from "@/components/landing/StickyMobileCTA";
import DiscoveryHub from "@/components/landing/DiscoveryHub";
import JsonLd from "@/components/JsonLd";
import { AGGREGATE_REVIEW_RATING, BORROWER_REVIEWS } from "@/lib/data/reviews";

export const metadata: Metadata = createMetadata({
  title: "Hard Money Lender for NY & NJ Real Estate Investors",
  description:
    "Hard money, fix & flip, bridge, DSCR, and construction loans for experienced real estate investors in NY, NJ, CT, and 46 states.",
  path: "/",
  keywords: [
    "hard money loans",
    "hard money lender",
    "New York hard money lender",
    "New Jersey hard money lender",
    "NY fix and flip loans",
    "NJ fix and flip loans",
    "NY DSCR loans",
    "NJ DSCR loans",
    "private lending",
    "fix and flip loans",
    "DSCR loans",
    "bridge loans",
    "construction loans",
    "commercial lending",
    "real estate investor financing",
  ],
});

export default function HomePage() {
  const homeFaqs = [
    {
      question: "What types of properties do you lend on?",
      answer:
        "We finance non-owner occupied residential investment properties including single-family homes, 2-4 unit properties, condos, and townhomes.",
    },
    {
      question: "How quickly can you close?",
      answer:
        "Many deals can close in as fast as 5 business days, subject to underwriting, valuation, title, and file complexity.",
    },
    {
      question: "What are your minimum loan requirements?",
      answer:
        "Our minimum loan amount is $100,000 and maximum is $5,000,000. We require a minimum credit score of 660 and focus on experienced real estate investors with a clear property, budget, reserves, and exit strategy.",
    },
    {
      question: "What states do you lend in?",
      answer:
        "We provide financing in 46 states for qualifying real estate investment deals.",
    },
  ];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: 'AssetLift Lending',
    description:
      'AssetLift Lending provides private lending for experienced real estate investors, with some deals brokered with capital partners. Fix and flip, bridge, DSCR rental, ground-up construction, and commercial lending scenarios in New York, New Jersey, Connecticut, and 46 states.',
    url: 'https://www.assetliftlending.com',
    telephone: '+1-929-639-2284',
    email: 'info@assetliftlending.com',
    priceRange: '$100,000 - $5,000,000',
    currenciesAccepted: 'USD',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Queens',
      addressRegion: 'NY',
      addressCountry: 'US',
    },
    areaServed: [
      { '@type': 'State', name: 'New York' },
      { '@type': 'State', name: 'New Jersey' },
      { '@type': 'State', name: 'Connecticut' },
      { '@type': 'Country', name: 'United States' },
    ],
    founder: [
      { '@type': 'Person', name: 'Yaakov Pentelnik' },
      { '@type': 'Person', name: 'Yisroel Pentelnik' },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      telephone: '+1-929-639-2284',
      email: 'info@assetliftlending.com',
      areaServed: 'US',
      availableLanguage: 'English',
    },
    knowsAbout: [
      'Hard money loans',
      'New York hard money loans',
      'New Jersey hard money loans',
      'Private lending',
      'Fix and flip loans',
      'DSCR rental loans',
      'Bridge loans',
      'Ground-up construction financing',
      'Real estate investor financing',
    ],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    serviceType: [
      'Hard Money Loans',
      'Fix and Flip Loans',
      'Bridge Loans',
      'DSCR Rental Loans',
      'Construction Loans',
      'Commercial Lending',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Loan Programs',
      itemListElement: [
          {
            '@type': 'Offer',
            name: 'Fix & Flip Loans for Experienced Investors',
            description: 'Short-term financing for purchasing and renovating non-owner-occupied investment properties. Up to 95% LTC on the purchase, 100% of rehab funded, and closings in as fast as 5 business days subject to underwriting, valuation, title, and file complexity.',
            url: 'https://www.assetliftlending.com/loans/fix-and-flip',
          },
        {
          '@type': 'Offer',
          name: 'DSCR Rental Loans for Portfolio Investors',
          description: 'Long-term financing for non-owner-occupied rental properties. Qualify on rental income, not personal income, with up to 85% LTV for qualifying scenarios.',
          url: 'https://www.assetliftlending.com/loans/dscr-rental',
        },
        {
          '@type': 'Offer',
          name: 'Bridge Loans',
          description: 'Short-term capital for fast closings and transitional situations. Up to 80% LTV with many files closing in as fast as 5 business days, subject to underwriting, valuation, title, and file complexity.',
          url: 'https://www.assetliftlending.com/loans/bridge',
        },
        {
          '@type': 'Offer',
          name: 'Ground-Up Construction Loans',
          description: 'Finance new residential builds from land acquisition through completion. Up to 90% LTC with milestone-based draws and private lending execution.',
          url: 'https://www.assetliftlending.com/loans/ground-up-construction',
        },
        {
          '@type': 'Offer',
          name: 'Commercial Lending',
          description: 'Commercial and mixed-use lending scenarios for acquisitions, refinances, bridge needs, and business-purpose investment properties.',
          url: 'https://www.assetliftlending.com/loans/commercial-lending',
        },
      ],
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: homeFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: 'AssetLift Lending',
    url: 'https://www.assetliftlending.com',
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
      <JsonLd data={faqSchema} />
      <JsonLd data={reviewSchema} />
      <PromoBanner />
      <main className="pt-14">
        <Hero />
        <AnimatedStats />
        <LoanPrograms />
        <WhyAssetLift />
        <HowItWorks />
        <MarketsPreview />
        <DiscoveryHub />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <StickyMobileCTA />
    </>
  );
}

