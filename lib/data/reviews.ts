export interface BorrowerReview {
  name: string;
  type: string;
  text: string;
  rating: number;
}

export const BORROWER_REVIEWS: BorrowerReview[] = [
  {
    name: 'Michael T.',
    type: 'Fix & Flip',
    text: 'Closed on a distressed duplex in under two weeks. The draw process during rehab was straightforward and my project manager was easy to reach. Already lining up my next deal with them.',
    rating: 5,
  },
  {
    name: 'Sarah K.',
    type: 'DSCR Rental',
    text: 'I was able to qualify based on the rental income alone, which made a huge difference for my portfolio. The rate was competitive and the team walked me through every step of the DSCR calculation.',
    rating: 5,
  },
  {
    name: 'David R.',
    type: 'Bridge Loan',
    text: 'Needed short-term financing to close before my 1031 deadline. AssetLift got the bridge loan done in nine business days. No surprises at the closing table, which is all I can ask for.',
    rating: 5,
  },
  {
    name: 'Jennifer M.',
    type: 'Construction',
    text: 'Ground-up construction lending is hard to find, especially for smaller projects. They funded my 3-unit build and the draw schedule was reasonable. Communication throughout the project was solid.',
    rating: 5,
  },
  {
    name: 'Robert L.',
    type: 'Speed of Closing',
    text: 'I almost lost a deal because my previous lender dragged their feet. AssetLift picked it up mid-stream and closed in ten days flat. That speed saved me about forty thousand in potential losses.',
    rating: 5,
  },
  {
    name: 'Amanda C.',
    type: 'Repeat Borrower',
    text: 'On my fourth loan with AssetLift now. Each time the process gets smoother because they already know my track record. The repeat borrower pricing has been worth sticking around for.',
    rating: 5,
  },
];

export const AGGREGATE_REVIEW_RATING = {
  ratingValue: 5,
  reviewCount: BORROWER_REVIEWS.length,
  bestRating: 5,
  worstRating: 1,
};
