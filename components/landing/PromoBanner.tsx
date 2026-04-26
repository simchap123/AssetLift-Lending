'use client';

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const PromoBanner = () => {
  return (
    <div className="fixed top-16 md:top-20 left-0 right-0 z-40 border-b border-primary/15 bg-foreground/96 backdrop-blur-lg">
      <div className="container flex flex-wrap items-center justify-center gap-3 px-4 py-2.5 md:gap-4 md:py-3">
        <div className="hidden md:flex items-center gap-2 rounded-full border border-primary/20 bg-background/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-background/75">
          Investor Terms
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-background/90">
          <span className="rounded-full border border-primary/20 bg-background/5 px-3 py-1 font-medium">
            DSCR from <span className="font-bold text-primary">5.85%</span>
          </span>
          <span className="rounded-full border border-primary/20 bg-background/5 px-3 py-1 font-medium">
            Fix &amp; Flip from <span className="font-bold text-primary">8.5%</span>
          </span>
          <span className="hidden sm:inline rounded-full border border-primary/20 bg-background/5 px-3 py-1 font-medium">
            Many files close in as fast as <span className="font-bold text-primary">5 business days</span>
          </span>
        </div>
        <Link
          href="/apply"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition-all duration-200 hover:bg-primary/90 hover:shadow-[0_0_20px_hsl(45,93%,47%,0.35)]"
        >
          Review My Deal
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default PromoBanner;
