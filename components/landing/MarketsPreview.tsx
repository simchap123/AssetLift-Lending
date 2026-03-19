import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

const PRIORITY_STATES = [
  { name: "Florida", href: "/lending/florida" },
  { name: "Texas", href: "/lending/texas" },
  { name: "California", href: "/lending/california" },
  { name: "Georgia", href: "/lending/georgia" },
  { name: "North Carolina", href: "/lending/north-carolina" },
  { name: "Arizona", href: "/lending/arizona" },
];

const PRIORITY_CITIES = [
  { name: "Miami", href: "/lending/florida/miami" },
  { name: "Tampa", href: "/lending/florida/tampa" },
  { name: "Austin", href: "/lending/texas/austin" },
  { name: "Dallas", href: "/lending/texas/dallas" },
  { name: "Atlanta", href: "/lending/georgia/atlanta" },
  { name: "Charlotte", href: "/lending/north-carolina/charlotte" },
];

export default function MarketsPreview() {
  return (
    <section className="py-20 md:py-28 bg-secondary/20">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-4">
            Investor Markets
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Hard Money Lending in Priority Markets
          </h2>
          <p className="text-lg text-muted-foreground">
            Explore the states and metros where we are actively building deeper market-specific
            lending pages for real estate investors.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
            <h3 className="text-2xl font-bold mb-5">Top States</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {PRIORITY_STATES.map((market) => (
                <Link
                  key={market.href}
                  href={market.href}
                  className="flex items-center justify-between gap-3 rounded-xl border border-border px-4 py-3 hover:border-primary/50 hover:bg-secondary/30 transition-colors"
                >
                  <span className="flex items-center gap-2 font-medium">
                    <MapPin className="w-4 h-4 text-primary" />
                    {market.name}
                  </span>
                  <ArrowRight className="w-4 h-4 text-primary" />
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
            <h3 className="text-2xl font-bold mb-5">Top Cities</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {PRIORITY_CITIES.map((market) => (
                <Link
                  key={market.href}
                  href={market.href}
                  className="flex items-center justify-between gap-3 rounded-xl border border-border px-4 py-3 hover:border-primary/50 hover:bg-secondary/30 transition-colors"
                >
                  <span className="flex items-center gap-2 font-medium">
                    <MapPin className="w-4 h-4 text-primary" />
                    {market.name}
                  </span>
                  <ArrowRight className="w-4 h-4 text-primary" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Link
            href="/markets"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            View all core lending markets <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
