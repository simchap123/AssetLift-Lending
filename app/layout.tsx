import type { Metadata } from "next";
import { Suspense } from "react";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
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
    default: "Hard Money Loans for Real Estate Investors | AssetLift",
    template: "%s | AssetLift Lending",
  },
  description:
    "Fast hard money loans for fix & flip, construction, DSCR rental, and bridge financing. Up to 92.5% LTC. Close in 7-10 days.",
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
    title: "Hard Money Loans for Real Estate Investors | AssetLift",
    description:
      "Fast hard money loans for fix & flip, construction, DSCR rental, and bridge financing. Up to 92.5% LTC. Close in 7-10 days.",
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
    title: "Hard Money Loans for Real Estate Investors | AssetLift",
    description:
      "Fast hard money loans for fix & flip, construction, DSCR rental, and bridge financing. Up to 92.5% LTC. Close in 7-10 days.",
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
