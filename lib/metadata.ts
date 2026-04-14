import type { Metadata } from 'next';

const BASE_URL = 'https://www.assetliftlending.com';

interface CreateMetadataOptions {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noIndex?: boolean;
  keywords?: string[];
  category?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
}

function withBrand(title: string) {
  return title.includes('AssetLift Lending') ? title : `${title} | AssetLift Lending`;
}

export function createMetadata({
  title,
  description,
  path,
  ogImage = '/og-image.jpg',
  noIndex = false,
  keywords,
  category,
  type = 'website',
  publishedTime,
  modifiedTime,
}: CreateMetadataOptions): Metadata {
  const url = `${BASE_URL}${path}`;

  return {
    title,
    description,
    ...(keywords && { keywords }),
    ...(category && { category }),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: withBrand(title),
      description,
      url,
      siteName: 'AssetLift Lending',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title: withBrand(title),
      description,
      images: [ogImage],
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
