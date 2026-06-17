import type { NextConfig } from "next";
import { CITIES } from "./lib/data/cities";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  serverExternalPackages: ['nodemailer'],
  async redirects() {
    // Consolidate the removed templated "hard money loans {city}" blog guides
    // into their canonical /lending/{state}/{city} pages. These blog posts
    // duplicated the lending pages and were getting crawled-but-not-indexed by
    // Google. 301 keeps any earned authority and external links pointing at the
    // single strong page per market.
    return CITIES.map((city) => ({
      source: `/blog/hard-money-loans-${city.citySlug}-${city.stateAbbreviation.toLowerCase()}`,
      destination: `/lending/${city.stateSlug}/${city.citySlug}`,
      permanent: true,
    }));
  },
};

export default nextConfig;
