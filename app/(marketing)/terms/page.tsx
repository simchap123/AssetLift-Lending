import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import { createMetadata } from '@/lib/metadata';

export const metadata: Metadata = createMetadata({
  title: 'Terms of Service',
  description:
    'Terms of service for AssetLift Lending. Review our website terms, loan disclaimers, and conditions of use.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <div className="pt-32 pb-20 md:pt-40">
      <div className="container px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Terms of Service' }]} />
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Terms of Service</h1>
          <p className="text-muted-foreground text-lg mb-10">
            Last updated: March 2026
          </p>

          <div className="space-y-10 text-muted-foreground leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Agreement to Terms</h2>
              <p>
                By accessing or using the AssetLift Lending website, you agree to be bound by these
                Terms of Service and all applicable laws and regulations. If you do not agree with
                any of these terms, you should not use this website. These terms apply to all
                visitors, users, and others who access or use the site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Use of Website</h2>
              <p>
                This website is provided for informational purposes only. The content on this site,
                including loan program descriptions, rate ranges, leverage parameters, calculators,
                and other materials, is intended to give prospective borrowers a general overview of
                the products and services offered by AssetLift Lending. Nothing on this website
                constitutes a loan offer, loan commitment, or binding agreement of any kind.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Loan Disclaimers</h2>
              <p className="mb-4">
                No content on this website constitutes a loan offer, commitment to lend, or
                guarantee of terms. All information presented regarding loan programs, rates, fees,
                and leverage is subject to the following conditions:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  All loans are subject to underwriting approval, property valuation, and title
                  review.
                </li>
                <li>
                  Rates, terms, fees, and leverage are subject to change without notice.
                </li>
                <li>
                  Past performance of funded loans does not guarantee future results.
                </li>
              </ul>
              <p className="mt-4">
                AssetLift Lending reserves the right to modify, suspend, or discontinue any loan
                program at any time without prior notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Intellectual Property</h2>
              <p>
                All content on this website, including but not limited to text, graphics, logos,
                images, page layouts, calculators, tools, and software, is the property of AssetLift
                Lending and is protected by applicable intellectual property laws. You may not
                reproduce, distribute, modify, or create derivative works from any content on this
                site without prior written consent from AssetLift Lending.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Third-Party Links</h2>
              <p>
                This website may contain links to third-party websites or services that are not
                owned or controlled by AssetLift Lending. We have no control over, and assume no
                responsibility for, the content, privacy policies, or practices of any third-party
                websites or services. You acknowledge and agree that AssetLift Lending shall not be
                liable for any damage or loss caused by or in connection with the use of any
                third-party content, goods, or services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by applicable law, AssetLift Lending and its
                officers, directors, employees, agents, and affiliates shall not be liable for any
                indirect, incidental, special, consequential, or punitive damages, including but not
                limited to loss of profits, data, business opportunities, or goodwill, arising out
                of or related to your use of or inability to use this website or any content,
                products, or services obtained through this website, whether based on warranty,
                contract, tort, or any other legal theory.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Governing Law</h2>
              <p>
                These Terms of Service shall be governed by and construed in accordance with the
                laws of the State of New York, without regard to its conflict of law provisions. Any
                disputes arising from or relating to these terms or your use of this website shall
                be subject to the exclusive jurisdiction of the courts located in the State of New
                York.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Changes to Terms</h2>
              <p>
                AssetLift Lending reserves the right to update or modify these Terms of Service at
                any time without prior notice. Changes will be effective immediately upon posting to
                this website. Your continued use of the site following any changes constitutes your
                acceptance of the revised terms. We encourage you to review this page periodically.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Contact</h2>
              <p>
                If you have questions about these Terms of Service, contact AssetLift Lending at
                `info@assetliftlending.com` or `+1 (929) 639-2284`.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
