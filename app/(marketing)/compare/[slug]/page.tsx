import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createMetadata } from '@/lib/metadata';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';
import { COMPARISONS } from '@/lib/data/comparisons';
import ComparisonPage from '@/components/seo/ComparisonPage';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return COMPARISONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const comparison = COMPARISONS.find((c) => c.slug === slug);
  if (!comparison) return {};
  return createMetadata({
    title: comparison.title,
    description: comparison.description,
    path: `/compare/${comparison.slug}`,
    category: 'Comparison',
    type: 'article',
    publishedTime: comparison.publishedAt,
    modifiedTime: comparison.publishedAt,
  });
}

export default async function CompareSlugPage({ params }: Props) {
  const { slug } = await params;
  const comparison = COMPARISONS.find((c) => c.slug === slug);
  if (!comparison) notFound();

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: comparison.title,
    description: comparison.description,
    datePublished: comparison.publishedAt,
    dateModified: comparison.publishedAt,
    articleSection: 'Comparison',
    mainEntityOfPage: `https://www.assetliftlending.com/compare/${comparison.slug}`,
    publisher: {
      '@type': 'Organization',
      name: 'AssetLift Lending',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.assetliftlending.com/logo.png',
      },
    },
    author: {
      '@type': 'Organization',
      name: 'AssetLift Lending',
    },
    about: comparison.heroTitle,
    url: `https://www.assetliftlending.com/compare/${comparison.slug}`,
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: comparison.faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={faqSchema} />
      <div className="container px-4 md:px-6 pt-32">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Compare', href: '/#programs' },
            { label: comparison.heroTitle },
          ]}
        />
      </div>
      <ComparisonPage comparison={comparison} />
    </>
  );
}
