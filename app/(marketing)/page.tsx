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
import SectionDivider from "@/components/landing/SectionDivider";
import JsonLd from "@/components/JsonLd";

export default function HomePage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: 'AssetLift Lending',
    description:
      'AssetLift Lending provides fast hard money loans for real estate investors. Fix & flip, bridge, DSCR rental, and ground-up construction financing nationwide.',
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
    areaServed: { '@type': 'Country', name: 'United States' },
    founder: [
      { '@type': 'Person', name: 'Yaakov Pentelnik' },
      { '@type': 'Person', name: 'Israel Pentelnik' },
    ],
    sameAs: [],
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
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Loan Programs',
      itemListElement: [
        {
          '@type': 'Offer',
          name: 'Fix & Flip Loans',
          description: 'Short-term loans for purchasing and renovating investment properties. Up to 90% of purchase price, 100% of rehab costs. Close in 5-10 business days.',
          url: 'https://www.assetliftlending.com/loans/fix-and-flip',
        },
        {
          '@type': 'Offer',
          name: 'DSCR Rental Loans',
          description: 'Long-term 30-year financing for rental properties. Qualify on rental income, not personal income. Up to 80% LTV, no tax returns required.',
          url: 'https://www.assetliftlending.com/loans/dscr-rental',
        },
        {
          '@type': 'Offer',
          name: 'Bridge Loans',
          description: 'Short-term capital for fast closings and transitional situations. Up to 80% LTV, 6-18 month terms, no prepayment penalty.',
          url: 'https://www.assetliftlending.com/loans/bridge',
        },
        {
          '@type': 'Offer',
          name: 'Ground-Up Construction Loans',
          description: 'Finance new residential builds from land acquisition through completion. Up to 85% LTC, milestone-based draw schedule.',
          url: 'https://www.assetliftlending.com/loans/ground-up-construction',
        },
      ],
    },
  };

  return (
    <>
      <JsonLd data={schema} />
      <PromoBanner />
      <main className="pt-14">
        <Hero />
        <WhyAssetLift />
        <LoanPrograms />
        <MarketsPreview />
        <SectionDivider className="text-foreground" />
        <AnimatedStats />
        <SectionDivider className="text-foreground" flip />
        <HowItWorks />
        <FAQ />
        <Testimonials />
        <CTA />
      </main>
    </>
  );
}
