import Link from "next/link";
import { ArrowRight } from "lucide-react";
import LendingCoverageMap from "@/components/seo/LendingCoverageMap";

export default function MarketsPreview() {
  return (
    <section className="py-20 md:py-28 bg-secondary/20">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-4">
            Investor Markets
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Hard Money Lending Across Our Coverage Areas
          </h2>
          <p className="text-lg text-muted-foreground">
            Explore the states and cities where AssetLift Lending offers financing for fix and
            flip, bridge, DSCR rental, and ground-up construction projects.
          </p>
        </div>

        <LendingCoverageMap />

        <div className="mt-8">
          <Link
            href="/markets"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            View all lending markets <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
