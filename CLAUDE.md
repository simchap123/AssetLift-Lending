# AssetLift Lending - Project Instructions

## Project Overview
AssetLift Lending is a mortgage broker / white-label private lender for real estate investors.
Built with Next.js 15, Tailwind CSS, deployed on Vercel.

## Architecture
- Blog content: TypeScript data files in `lib/data/blog-posts.ts` and `lib/data/generated-blog-posts.ts`
- Loan products: `lib/data/loan-products.ts`
- Geo pages: `lib/data/states.ts` and `lib/data/cities.ts`
- Marketing context: `.agents/product-marketing-context.md`
- SEO audit: `SEO-Audit-AssetLiftLending.md`

## Key Rules
- Do NOT change UI/visual design unless explicitly asked
- This is a YMYL (Your Money Your Life) finance site -- content must be accurate and substantive
- Blog posts should be 1,500+ words for competitive finance keywords
- Meta descriptions must be under 155 characters
- The site operates as a broker with white-label capital partners

## Daily Content Expansion Task
When starting a session, if asked to expand content or if running /expand-content:

1. Read `lib/data/blog-posts.ts` and identify blog posts with thin content (sections with short content blocks)
2. Pick the highest-priority post to expand (Fix & Flip and DSCR categories first)
3. Expand each section to be comprehensive, authoritative, YMYL-quality content
4. Target 1,500+ words per post
5. Add real examples, data points, and actionable advice
6. Maintain the existing voice: professional, direct, investor-to-investor
7. After expanding, update the `readTime` field to reflect new length
8. Commit with message: "Expand blog post: [post title]"

### Content Priority Queue (work through in order):
1. Fix & Flip category posts (highest traffic potential)
2. DSCR Rental category posts
3. Bridge loan category posts
4. Construction category posts
5. City/state pages in `lib/data/generated-blog-posts.ts` (add unique local content)
