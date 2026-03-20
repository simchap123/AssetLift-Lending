'use client';

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const buckets = [
  {
    title: "I'm Flipping",
    subtitle: "Fix & Flip Loans",
    href: "/loans/fix-and-flip",
  },
  {
    title: "I'm Buying",
    subtitle: "DSCR Rental Loans",
    href: "/loans/dscr-rental",
  },
  {
    title: "I'm Building",
    subtitle: "Construction Loans",
    href: "/loans/ground-up-construction",
  },
  {
    title: "I'm Refinancing",
    subtitle: "Bridge Loans",
    href: "/loans/bridge",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const bucketVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const Hero = () => {
  const stats = [
    { value: "$5MM+", label: "Max Loan" },
    { value: "92.5%", label: "LTC" },
    { value: "24HR", label: "Funding" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/hero-house.jpg"
          alt="Luxury investment property representing hard money loan opportunities for real estate investors"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
      </div>

      <div className="container relative z-10 px-4 md:px-6">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm"
          >
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Private Real Estate Lending</span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-foreground">Hard Money Loans</span>
            <br />
            <span className="gradient-text">for Real Estate Investors</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Fast fix and flip, bridge, DSCR rental, and construction financing with closings in
            7 to 10 days for investors who need reliable execution.
          </motion.p>

          {/* Standalone Get Funded CTA */}
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button asChild size="lg" className="text-base px-6 py-5 glow-primary">
              <Link href="/apply">
                Get Funded
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>

          {/* Bucket CTA Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14 max-w-2xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {buckets.map((bucket) => (
              <motion.div key={bucket.href} variants={bucketVariants}>
                <Link
                  href={bucket.href}
                  className="group flex items-center justify-between gap-4 rounded-xl bg-card/80 backdrop-blur-lg border border-border/50 px-6 py-5 transition-all duration-300 ease-in-out hover:scale-[1.03] hover:border-primary hover:shadow-lg hover:shadow-primary/10"
                >
                  <div>
                    <div className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                      {bucket.title}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {bucket.subtitle}
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-all duration-300 group-hover:translate-x-1 shrink-0" />
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex flex-wrap gap-8 md:gap-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

    </section>
  );
};

export default Hero;
