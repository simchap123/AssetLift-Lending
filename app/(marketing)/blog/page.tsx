import type { Metadata } from 'next';
import Link from 'next/link';
import { createMetadata } from '@/lib/metadata';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';
import { BLOG_POSTS } from '@/lib/data/blog-posts';
import { Clock, ArrowRight } from 'lucide-react';

export const metadata: Metadata = createMetadata({
  title: 'Blog - Real Estate Investing & Hard Money Lending Insights',
  description:
    'Expert guides on fix & flip financing, DSCR loans, bridge lending, and real estate investing strategies from AssetLift Lending.',
  path: '/blog',
});

export default function BlogListingPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'AssetLift Lending Blog',
    description:
      'Real estate investing and hard money lending insights from AssetLift Lending.',
    url: 'https://assetliftlending.com/blog',
    publisher: { '@type': 'Organization', name: 'AssetLift Lending' },
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
              Blog
            </h1>
            <p className="text-lg text-muted-foreground mb-12">
              Expert insights on hard money lending, fix & flip investing, rental
              strategies, and building wealth through real estate.
            </p>

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
