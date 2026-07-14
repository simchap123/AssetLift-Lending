import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createMetadata } from '@/lib/metadata';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';
import { BLOG_POSTS } from '@/lib/data/blog-posts';
import { NOINDEX_BLOG_SLUGS } from '@/lib/seo/noindex';
import BlogPostLayout from '@/components/seo/BlogPostLayout';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  return createMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    keywords: post.tags,
    category: post.category,
    type: 'article',
    publishedTime: post.publishedAt,
    modifiedTime: post.publishedAt,
    noIndex: NOINDEX_BLOG_SLUGS.has(post.slug),
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== slug)
    .sort((a, b) => {
      const aScore =
        Number(a.category === post.category) +
        a.tags.filter((tag) => post.tags.includes(tag)).length;
      const bScore =
        Number(b.category === post.category) +
        b.tags.filter((tag) => post.tags.includes(tag)).length;
      return bScore - aScore;
    })
    .slice(0, 3);

  const articleBody = post.sections
    .map((section) => `${section.heading} ${section.content.replace(/<[^>]+>/g, ' ')}`)
    .join(' ');
  const wordCount = articleBody.split(/\s+/).filter(Boolean).length;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    articleSection: post.category,
    keywords: post.tags.join(', '),
    wordCount,
    mainEntityOfPage: `https://www.assetliftlending.com/blog/${post.slug}`,
    author: {
      '@type': 'Person',
      name: post.author,
      jobTitle: post.authorRole,
      worksFor: {
        '@type': 'Organization',
        name: 'AssetLift Lending',
      },
    },
    publisher: {
      '@type': 'Organization',
      name: 'AssetLift Lending',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.assetliftlending.com/logo.png',
      },
    },
    about: post.tags,
    isPartOf: {
      '@type': 'Blog',
      name: 'AssetLift Lending Blog',
      url: 'https://www.assetliftlending.com/blog',
    },
    url: `https://www.assetliftlending.com/blog/${post.slug}`,
  };

  const faqSchema =
    post.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: post.faqs.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: { '@type': 'Answer', text: f.answer },
          })),
        }
      : null;

  return (
    <>
      <JsonLd data={schema} />
      {faqSchema && <JsonLd data={faqSchema} />}
      <div className="container px-4 md:px-6 pt-32">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Blog', href: '/blog' },
            { label: post.title },
          ]}
        />
      </div>
      <BlogPostLayout post={post} relatedPosts={relatedPosts} />
    </>
  );
}
