import type { MetadataRoute } from 'next';
import { STATES } from '@/lib/data/states';
import { CITIES } from '@/lib/data/cities';
import { BLOG_POSTS } from '@/lib/data/blog-posts';
import { COMPARISONS } from '@/lib/data/comparisons';
import { TRI_STATE_PROGRAM_PAGES } from '@/lib/data/tri-state-program-pages';
import { NOINDEX_BLOG_SLUGS } from '@/lib/seo/noindex';
import geoAnswers from '@/lib/data/geo-answers.json';

const BASE_URL = 'https://www.assetliftlending.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Core pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/apply`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/how-it-works`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/brokers`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/how-funding-works`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/state-disclosures`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/licensing`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/team`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/markets`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Loan programs hub
    {
      url: `${BASE_URL}/loans`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // Loan product pages
    {
      url: `${BASE_URL}/loans/fix-and-flip`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/loans/ground-up-construction`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/loans/dscr-rental`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/loans/bridge`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/loans/commercial-lending`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    // Tools hub
    {
      url: `${BASE_URL}/tools`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    // Tool pages
    {
      url: `${BASE_URL}/tools/fix-and-flip-calculator`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/tools/dscr-calculator`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // Blog listing
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/compare`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/resources/fix-and-flip-deal-checklist`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/resources/fix-and-flip-borrower-package`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/ai-context`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // State/location pages
  const statePages: MetadataRoute.Sitemap = STATES.map((state) => ({
    url: `${BASE_URL}/lending/${state.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // City pages
  const cityPages: MetadataRoute.Sitemap = CITIES.map((city) => ({
    url: `${BASE_URL}/lending/${city.stateSlug}/${city.citySlug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const triStateProgramPages: MetadataRoute.Sitemap = TRI_STATE_PROGRAM_PAGES.map((page) => ({
    url: `${BASE_URL}/lending/${page.stateSlug}/${page.programSlug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));

  // Blog posts - higher priority for recent posts
  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.filter(
    (post) => !NOINDEX_BLOG_SLUGS.has(post.slug),
  ).map((post) => {
    const ageInDays = (Date.now() - new Date(post.publishedAt).getTime()) / (1000 * 60 * 60 * 24);
    const priority = ageInDays < 30 ? 0.8 : ageInDays < 180 ? 0.7 : 0.6;
    return {
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: (ageInDays < 90 ? 'monthly' : 'yearly') as 'monthly' | 'yearly',
      priority,
    };
  });

  // Comparison pages
  const comparisonPages: MetadataRoute.Sitemap = COMPARISONS.map((comp) => ({
    url: `${BASE_URL}/compare/${comp.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // GEO answer pages
  const geoPages: MetadataRoute.Sitemap = (geoAnswers as Array<{ slug: string; publishedAt: string }>).map(a => ({
    url: `${BASE_URL}/answers/${a.slug}`,
    lastModified: new Date(a.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Answers index
  const answersIndex: MetadataRoute.Sitemap = geoAnswers.length > 0 ? [{
    url: `${BASE_URL}/answers`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }] : [];

  return [
    ...staticPages,
    ...statePages,
    ...cityPages,
    ...triStateProgramPages,
    ...blogPages,
    ...comparisonPages,
    ...answersIndex,
    ...geoPages,
  ];
}
