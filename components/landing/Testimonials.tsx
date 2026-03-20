'use client';

import { Star } from 'lucide-react';

const reviews = [
  {
    name: 'Michael T.',
    type: 'Fix & Flip',
    text: 'Closed on a distressed duplex in under two weeks. The draw process during rehab was straightforward and my project manager was easy to reach. Already lining up my next deal with them.',
  },
  {
    name: 'Sarah K.',
    type: 'DSCR Rental',
    text: 'I was able to qualify based on the rental income alone, which made a huge difference for my portfolio. The rate was competitive and the team walked me through every step of the DSCR calculation.',
  },
  {
    name: 'David R.',
    type: 'Bridge Loan',
    text: 'Needed short-term financing to close before my 1031 deadline. AssetLift got the bridge loan done in nine business days. No surprises at the closing table, which is all I can ask for.',
  },
  {
    name: 'Jennifer M.',
    type: 'Construction',
    text: 'Ground-up construction lending is hard to find, especially for smaller projects. They funded my 3-unit build and the draw schedule was reasonable. Communication throughout the project was solid.',
  },
  {
    name: 'Robert L.',
    type: 'Speed of Closing',
    text: 'I almost lost a deal because my previous lender dragged their feet. AssetLift picked it up mid-stream and closed in ten days flat. That speed saved me about forty thousand in potential losses.',
  },
  {
    name: 'Amanda C.',
    type: 'Repeat Borrower',
    text: 'On my fourth loan with AssetLift now. Each time the process gets smoother because they already know my track record. The repeat borrower pricing has been worth sticking around for.',
  },
];

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
  const allReviews = [...reviews, ...reviews];

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
