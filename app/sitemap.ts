import type { MetadataRoute } from 'next';
import { STATES } from '@/lib/data/states';
import { CITIES } from '@/lib/data/cities';
import { BLOG_POSTS } from '@/lib/data/blog-posts';
import { COMPARISONS } from '@/lib/data/comparisons';
import { TRI_STATE_PROGRAM_PAGES } from '@/lib/data/tri-state-program-pages';
import { NOINDEX_BLOG_SLUGS } from '@/lib/seo/noindex';
import {
  BASE_URL,
  INDEXABLE_ANSWER_SLUGS,
  INDEXABLE_BLOG_SLUGS,
  INDEXABLE_COMPARISON_SLUGS,
  INDEXABLE_STATIC_PATHS,
  shouldIndexCity,
  shouldIndexState,
} from '@/lib/seo/routing-policy';
import geoAnswers from '@/lib/data/geo-answers.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Core pages
  const staticPages: MetadataRoute.Sitemap = Array.from(INDEXABLE_STATIC_PATHS).map((path) => ({
    url: path === '/' ? BASE_URL : `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === '/' || path === '/markets' || path === '/loans' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1.0 : path.startsWith('/loans') || path === '/apply' ? 0.9 : 0.7,
  }));

  // State/location pages
  const statePages: MetadataRoute.Sitemap = STATES.filter((state) => shouldIndexState(state.slug)).map((state) => ({
    url: `${BASE_URL}/lending/${state.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // City pages
  const cityPages: MetadataRoute.Sitemap = CITIES.filter((city) => shouldIndexCity(city.stateSlug, city.citySlug)).map((city) => ({
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
    (post) => !NOINDEX_BLOG_SLUGS.has(post.slug) && INDEXABLE_BLOG_SLUGS.has(post.slug),
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
  const comparisonPages: MetadataRoute.Sitemap = COMPARISONS.filter((comp) =>
    INDEXABLE_COMPARISON_SLUGS.has(comp.slug),
  ).map((comp) => ({
    url: `${BASE_URL}/compare/${comp.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // GEO answer pages
  const geoPages: MetadataRoute.Sitemap = (geoAnswers as Array<{ slug: string; publishedAt: string }>)
    .filter(a => INDEXABLE_ANSWER_SLUGS.has(a.slug))
    .map(a => ({
    url: `${BASE_URL}/answers/${a.slug}`,
    lastModified: new Date(a.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Answers index
  const answersIndex: MetadataRoute.Sitemap = [];

  const entries = [
    ...staticPages,
    ...statePages,
    ...cityPages,
    ...triStateProgramPages,
    ...blogPages,
    ...comparisonPages,
    ...answersIndex,
    ...geoPages,
  ];

  return Array.from(new Map(entries.map((entry) => [entry.url, entry])).values());
}
