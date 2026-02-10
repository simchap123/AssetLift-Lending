import Hero from "@/components/landing/Hero";
import LoanPrograms from "@/components/landing/LoanPrograms";
import HowItWorks from "@/components/landing/HowItWorks";
import FAQ from "@/components/landing/FAQ";
import CTA from "@/components/landing/CTA";
import PromoBanner from "@/components/landing/PromoBanner";
import JsonLd from "@/components/JsonLd";

export default function HomePage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: 'AssetLift Lending',
    description:
      'AssetLift Lending provides fast hard money loans for real estate investors. Fix & flip, bridge, DSCR rental, and ground-up construction financing nationwide.',
    url: 'https://assetliftlending.com',
    telephone: '+1-929-639-2284',
    areaServed: { '@type': 'Country', name: 'United States' },
    serviceType: [
      'Hard Money Loans',
      'Fix and Flip Loans',
      'Bridge Loans',
      'DSCR Rental Loans',
      'Construction Loans',
    ],
  };

  return (
    <>
      <JsonLd data={schema} />
      <PromoBanner />
      <main className="pt-14">
        <Hero />
        <LoanPrograms />
        <HowItWorks />
        <FAQ />
        <CTA />
      </main>
    </>
  );
}
