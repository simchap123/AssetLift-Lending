'use client';

import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

const StickyMobileCTA = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-primary/20 bg-background/95 backdrop-blur-md px-4 py-3 flex gap-3">
      <a
        href="tel:+19296392284"
        className="flex flex-1 items-center justify-center gap-2 rounded-full border border-primary/50 py-3 text-sm font-semibold text-primary"
      >
        <Phone className="w-4 h-4" />
        Call Now
      </a>
      <Link
        href="/apply"
        className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-bold text-primary-foreground"
      >
        Review My Deal
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
};

export default StickyMobileCTA;
