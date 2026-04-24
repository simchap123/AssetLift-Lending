'use client';

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
    <div className="bg-card border border-border rounded-xl p-6 min-w-[320px] max-w-[400px] flex-shrink-0 select-none">
      <StarRating />
      <p className="text-foreground text-sm leading-relaxed mb-4">&ldquo;{text}&rdquo;</p>
      <div>
        <p className="text-foreground font-semibold text-sm">{name}</p>
        <p className="text-muted-foreground text-xs">{type}</p>
      </div>
    </div>
  );
}

const marqueeKeyframes = `
@keyframes marquee-scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
`;

const Testimonials = () => {
  const allReviews = [...BORROWER_REVIEWS, ...BORROWER_REVIEWS];

  return (
    <section className="py-20 overflow-hidden">
      <style>{marqueeKeyframes}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
          What Our Borrowers Say
        </h2>
        <p className="text-muted-foreground text-lg">
          Real reviews from real investors
        </p>
      </div>

      <div
        className="flex gap-6 hover:[animation-play-state:paused]"
        style={{
          animation: 'marquee-scroll 30s linear infinite',
          width: 'max-content',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.animationPlayState = 'paused';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.animationPlayState = 'running';
        }}
      >
        {allReviews.map((review, i) => (
          <ReviewCard key={i} {...review} />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
