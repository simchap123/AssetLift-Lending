import type { Metadata } from "next";
import { Suspense } from "react";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Script from "next/script";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import AnalyticsPageTracker from "@/components/AnalyticsPageTracker";
import ChatBot from "@/components/ChatBot";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.assetliftlending.com"),
  title: {
    default: "Hard Money Loans | Fix & Flip, DSCR & Bridge | AssetLift",
    template: "%s | AssetLift Lending",
  },
  description:
    "Private capital solutions for fix and flip, DSCR rental, bridge, and construction loans. Hear back within 24 hours, usually within a few hours, and close in as fast as 7-14 days.",
  keywords: [
    "hard money loans",
    "fix and flip loans",
    "bridge loans",
    "DSCR loans",
    "real estate investor financing",
    "ground-up construction loans",
    "private money lender",
    "asset-based lending",
  ],
  authors: [{ name: "AssetLift Lending" }],
  alternates: {
    canonical: "https://www.assetliftlending.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.assetliftlending.com",
    siteName: "AssetLift Lending",
    title: "Hard Money Loans | Fix & Flip, DSCR & Bridge | AssetLift",
    description:
      "Private capital solutions for fix and flip, DSCR rental, bridge, and construction loans. Hear back within 24 hours, usually within a few hours, and close in as fast as 7-14 days.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AssetLift Lending",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hard Money Loans | Fix & Flip, DSCR & Bridge | AssetLift",
    description:
      "Private capital solutions for fix and flip, DSCR rental, bridge, and construction loans. Hear back within 24 hours, usually within a few hours, and close in as fast as 7-14 days.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={spaceGrotesk.variable} suppressHydrationWarning>
      <head>
        {/* Anti-FOUC: set theme before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('asset-lift-theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        {/* GEO: llms.txt for AI crawlers */}
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLMs.txt - AI-readable site description" />
        <link rel="alternate" type="text/plain" href="/llms-full.txt" title="LLMs-full.txt - Comprehensive AI-readable content" />
        {/* Speakable schema for voice assistants */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              name: 'AssetLift Lending - Hard Money Loans for Real Estate Investors',
              url: 'https://www.assetliftlending.com',
              speakable: {
                '@type': 'SpeakableSpecification',
                cssSelector: ['h1', 'h2', '[data-speakable]', '.hero-description'],
              },
              mainEntity: {
                '@type': 'FinancialService',
                name: 'AssetLift Lending',
                description: 'Private capital solutions for real estate investors. Fix & flip, DSCR rental, bridge, and construction loans in 46 states with responses within 24 hours and closings as fast as 7-14 days.',
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-background antialiased">
        <Providers>
          <Suspense fallback={null}>
            <AnalyticsPageTracker />
          </Suspense>
          {/* 3D Grid Background */}
          <div className="perspective-container" aria-hidden="true">
            <div className="grid-plane" />
            <div className="horizon-fade" />
          </div>
          {children}
          <ChatBot />
        </Providers>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
