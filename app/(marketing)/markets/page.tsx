import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { createMetadata } from "@/lib/metadata";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { STATES } from "@/lib/data/states";
import { CITIES } from "@/lib/data/cities";

export const metadata: Metadata = createMetadata({
  title: "Hard Money Loan Markets",
  description:
    "Browse AssetLift Lending's core hard money loan markets by state and city for fix and flip, bridge, DSCR rental, and construction financing.",
  path: "/markets",
});

const PRIORITY_STATE_SLUGS = [
  "florida",
  "texas",
  "california",
  "georgia",
  "north-carolina",
  "arizona",
];

const PRIORITY_CITY_SLUGS = [
  "miami",
  "tampa",
  "austin",
  "dallas",
  "atlanta",
  "charlotte",
];

export default function MarketsPage() {
  const priorityStates = STATES.filter((state) => PRIORITY_STATE_SLUGS.includes(state.slug));
  const priorityCities = CITIES.filter((city) => PRIORITY_CITY_SLUGS.includes(city.citySlug));

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "AssetLift Lending Markets",
    description:
      "Core hard money loan markets served by AssetLift Lending for real estate investors.",
    url: "https://www.assetliftlending.com/markets",
  };

  return (
    <>
      <JsonLd data={schema} />
      <div className="container px-4 md:px-6 pt-32">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Markets" }]} />
      </div>

      <section className="py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-4">
              Lending Coverage
            </p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Hard Money Loan Markets for Real Estate Investors
            </h1>
            <p className="text-lg text-muted-foreground">
              Start with the markets where we are concentrating the strongest local lending
              coverage, then move into the product page that matches your deal strategy.
            </p>
          </div>

          <div className="grid xl:grid-cols-[1.2fr_0.8fr] gap-8 mb-12">
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Priority States</h2>
              <p className="text-muted-foreground mb-6">
                These are the state markets where we should concentrate content depth, internal
                links, and lead generation first.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {priorityStates.map((state) => (
                  <Link
                    key={state.slug}
                    href={`/lending/${state.slug}`}
                    className="rounded-xl border border-border p-5 hover:border-primary/50 hover:bg-secondary/30 transition-colors"
                  >
                    <div className="flex items-center gap-2 text-primary font-semibold mb-2">
                      <MapPin className="w-4 h-4" />
                      {state.name}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{state.marketHighlight}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                      View {state.name} market <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Priority Cities</h2>
              <p className="text-muted-foreground mb-6">
                City pages should earn rankings only where we can support them with market-specific
                lending information and intent.
              </p>
              <div className="space-y-3">
                {priorityCities.map((city) => (
                  <Link
                    key={`${city.stateSlug}-${city.citySlug}`}
                    href={`/lending/${city.stateSlug}/${city.citySlug}`}
                    className="flex items-center justify-between gap-3 rounded-xl border border-border px-4 py-4 hover:border-primary/50 hover:bg-secondary/30 transition-colors"
                  >
                    <div>
                      <p className="font-semibold">
                        {city.cityName}, {city.stateAbbreviation}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Median home price {city.medianHomePrice}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-primary" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-secondary/20 border border-border rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Match Market Intent to Product</h2>
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
              {[
                { label: "Fix & Flip Loans", href: "/loans/fix-and-flip" },
                { label: "Ground-Up Construction", href: "/loans/ground-up-construction" },
                { label: "DSCR Rental Loans", href: "/loans/dscr-rental" },
                { label: "Bridge Loans", href: "/loans/bridge" },
              ].map((product) => (
                <Link
                  key={product.href}
                  href={product.href}
                  className="rounded-xl border border-border bg-card px-4 py-5 hover:border-primary/50 transition-colors"
                >
                  <p className="font-semibold mb-2">{product.label}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                    View product page <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
