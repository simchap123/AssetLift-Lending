import type { Metadata } from 'next';
import Link from 'next/link';
import { createMetadata } from '@/lib/metadata';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';
import { BLOG_POSTS } from '@/lib/data/blog-posts';
import { Clock, ArrowRight } from 'lucide-react';

export const metadata: Metadata = createMetadata({
  title: 'Hard Money Lending Blog | Fix & Flip, DSCR & Bridge',
  description:
    'Read expert guides on hard money loans, fix and flip financing, DSCR rentals, bridge loans, construction lending, and real estate investing strategy.',
  path: '/blog',
});

export default function BlogListingPage() {
  const categoryCounts = BLOG_POSTS.reduce<Record<string, number>>((acc, post) => {
    acc[post.category] = (acc[post.category] ?? 0) + 1;
    return acc;
  }, {});
  const topCategories = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'AssetLift Lending Blog',
    description:
      'Real estate investing and hard money lending insights from AssetLift Lending.',
    url: 'https://www.assetliftlending.com/blog',
    about: [
      'Hard money loans',
      'Fix and flip financing',
      'DSCR loans',
      'Bridge loans',
      'Ground-up construction loans',
    ],
    isPartOf: {
      '@type': 'WebSite',
      name: 'AssetLift Lending',
      url: 'https://www.assetliftlending.com',
    },
    publisher: { '@type': 'Organization', name: 'AssetLift Lending' },
    mainEntity: {
      '@type': 'ItemList',
      itemListOrder: 'https://schema.org/ItemListOrderDescending',
      numberOfItems: BLOG_POSTS.length,
      itemListElement: BLOG_POSTS.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://www.assetliftlending.com/blog/${post.slug}`,
        name: post.title,
        description: post.description,
      })),
    },
  };

  return (
    <>
      <JsonLd data={schema} />
      <div className="container px-4 md:px-6 pt-32">
        <Breadcrumbs
          items={[{ label: 'Home', href: '/' }, { label: 'Blog' }]}
        />
      </div>

      <section className="py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              Hard Money Lending Blog
            </h1>
            <p className="text-lg text-muted-foreground mb-12">
              Expert insights on hard money lending, fix & flip investing, rental
              strategies, and building wealth through real estate.
            </p>

            <div className="grid gap-4 md:grid-cols-3 mb-8">
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="text-sm text-muted-foreground mb-1">Published guides</p>
                <p className="text-3xl font-bold">{BLOG_POSTS.length}</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="text-sm text-muted-foreground mb-1">Core categories</p>
                <p className="text-3xl font-bold">{Object.keys(categoryCounts).length}</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="text-sm text-muted-foreground mb-1">Newest focus</p>
                <p className="text-3xl font-bold">Local SEO</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-12">
              {topCategories.map(([category, count]) => (
                <span
                  key={category}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm"
                >
                  <span className="font-medium">{category}</span>
                  <span className="text-muted-foreground">{count}</span>
                </span>
              ))}
            </div>

            <div className="space-y-8">
              {BLOG_POSTS.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block bg-card border border-border rounded-xl p-6 md:p-8 hover:border-primary/50 transition-colors group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 rounded-full">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {post.description}
                  </p>
                  <span className="text-primary text-sm font-medium inline-flex items-center gap-1">
                    Read article <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
