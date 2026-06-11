import Link from "next/link";
import { ArrowRight } from "lucide-react";

const HUB_LINKS = [
  {
    label: "Markets Hub",
    href: "/markets",
    blurb: "State and city lending pages for local hard money, bridge, and DSCR search intent.",
  },
  {
    label: "Comparison Hub",
    href: "/compare",
    blurb: "High-intent lender and loan-structure comparisons for borrowers evaluating options.",
  },
  {
    label: "Blog",
    href: "/blog",
    blurb: "Investor education content that supports product, market, and refinance queries.",
  },
  {
    label: "How Funding Works",
    href: "/how-funding-works",
    blurb: "Borrower-facing process content that strengthens trust and clarifies execution.",
  },
];

const PRIORITY_PAGES = [
  { label: "Fix & Flip Loans", href: "/loans/fix-and-flip" },
  { label: "DSCR Rental Loans", href: "/loans/dscr-rental" },
  { label: "Bridge Loans", href: "/loans/bridge" },
  { label: "Ground-Up Construction", href: "/loans/ground-up-construction" },
  { label: "Fix & Flip Calculator", href: "/tools/fix-and-flip-calculator" },
  { label: "DSCR Calculator", href: "/tools/dscr-calculator" },
  { label: "Hard Money Loans in Florida", href: "/lending/florida" },
  { label: "Hard Money Loans in Texas", href: "/lending/texas" },
];

export default function DiscoveryHub() {
  return (
    <section className="py-20 md:py-28">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-4">
            Site Guide
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Start With the Right Page for Your Deal
          </h2>
          <p className="text-lg text-muted-foreground">
            These hubs make the site easier for borrowers to navigate and easier for Google to
            crawl. Start with the path that matches the property, market, or financing question you
            are working through right now.
          </p>
        </div>

        <div className="grid xl:grid-cols-[1.1fr_0.9fr] gap-8">
          <div className="rounded-3xl border border-border bg-card p-6 md:p-8">
            <h3 className="text-2xl font-bold mb-4">Primary Crawl Hubs</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {HUB_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl border border-border bg-background p-5 hover:border-primary/50 hover:bg-secondary/30 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold mb-2">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.blurb}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-secondary/20 p-6 md:p-8">
            <h3 className="text-2xl font-bold mb-4">Priority Pages</h3>
            <p className="text-sm text-muted-foreground mb-5">
              These are the pages most likely to support early indexing, product understanding, and
              high-intent borrower discovery.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {PRIORITY_PAGES.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl border border-border bg-card px-4 py-4 text-sm font-medium hover:border-primary/50 hover:bg-background transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
