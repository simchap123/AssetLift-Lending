'use client';

import Link from 'next/link';
import { Star } from 'lucide-react';
import { BORROWER_REVIEWS } from '@/lib/data/reviews';

function StarRating() {
  return (
    <div className="flex gap-0.5 mb-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
      ))}
    </div>
  );
}

function ReviewCard({ name, type, text }: { name: string; type: string; text: string }) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 min-w-[280px] sm:min-w-[320px] max-w-[400px] flex-shrink-0 select-none snap-start">
      <StarRating />
      <p className="text-foreground text-sm leading-relaxed mb-4">&ldquo;{text}&rdquo;</p>
      <div>
        <p className="text-foreground font-semibold text-sm">{name}</p>
        <p className="text-muted-foreground text-xs">{type}</p>
      </div>
    </div>
  );
}

const Testimonials = () => {
  return (
    <section className="py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
          What Borrowers Are Saying
        </h2>
        <p className="text-muted-foreground text-lg">
          Speed, communication, and repeatability matter more than lender branding. That is what borrowers keep pointing to.
        </p>
      </div>

      <div className="md:hidden px-4 sm:px-6 lg:px-8">
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {BORROWER_REVIEWS.map((review, i) => (
            <ReviewCard key={i} {...review} />
          ))}
        </div>
      </div>

      <div className="hidden md:grid max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid-cols-3 gap-6">
        {BORROWER_REVIEWS.slice(0, 3).map((review, i) => (
          <ReviewCard key={i} {...review} />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 flex flex-wrap items-center justify-center gap-5 text-sm">
        <Link href="/about" className="font-medium text-primary hover:text-primary/80 transition-colors">
          Learn how AssetLift works
        </Link>
        <Link href="/compare" className="font-medium text-primary hover:text-primary/80 transition-colors">
          Compare loan options
        </Link>
        <Link href="/apply" className="font-medium text-primary hover:text-primary/80 transition-colors">
          Get your deal reviewed
        </Link>
      </div>
    </section>
  );
};

export default Testimonials;
