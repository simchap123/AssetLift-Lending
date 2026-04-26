'use client';

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, BadgeCheck, Clock3, MapPinned, TrendingUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  const trustPoints = [
    "Fix and flip, bridge, DSCR, and construction loan options",
    "Hear back within 24 hours, usually within a few hours",
    "Many deals close in as fast as 7-14 business days",
  ];

  const proofItems = [
    { icon: Clock3, label: "Response Time", value: "Within 24 Hours" },
    { icon: BadgeCheck, label: "Closing Speed", value: "As Fast As 7-14 Business Days" },
    { icon: MapPinned, label: "Coverage", value: "46 States" },
  ];

  const quickLinks = [
    { label: "Compare options", href: "/compare" },
    { label: "Browse markets", href: "/markets" },
    { label: "Use calculators", href: "/tools/fix-and-flip-calculator" },
    { label: "Read guides", href: "/blog" },
  ];

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden py-24 sm:py-28">
      <div className="absolute inset-0">
        <Image
          src="/hero-house.jpg"
          alt="Luxury investment property representing hard money loan opportunities for real estate investors"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
      </div>

      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm"
            >
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Financing for Real Estate Investors
              </span>
            </motion.div>

            <motion.h1
              data-speakable
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="text-foreground">Get the Deal Closed.</span>
              <br />
              <span className="gradient-text">Keep Your Capital Moving.</span>
            </motion.h1>

            <motion.p
              data-speakable
              className="hero-description text-lg md:text-xl text-muted-foreground max-w-2xl mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Fast financing for investors who need a clear answer, realistic leverage, and a team
              that knows how to move a file from quote to closing. We handle fix and flip, bridge,
              DSCR rental, and construction scenarios across 46 states.
            </motion.p>

            <motion.p
              className="text-sm md:text-base text-muted-foreground/90 max-w-2xl mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              Some deals are funded through our private lending platform, and some are placed with
              capital partners when that creates the strongest path to closing.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button asChild size="lg" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-6 glow-primary">
                <Link href="/apply">
                  Get My Deal Reviewed
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-6 border-primary/50 hover:bg-primary/10 backdrop-blur-sm">
                <a href="#programs">View Loan Programs</a>
              </Button>
            </motion.div>

            <motion.div
              className="grid gap-3 sm:grid-cols-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {trustPoints.map((point) => (
                <div
                  key={point}
                  className="rounded-xl border border-border/80 bg-background/70 px-4 py-4 backdrop-blur-sm"
                >
                  <p className="text-sm leading-relaxed text-foreground/90">{point}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:justify-self-end w-full max-w-md"
          >
            <div className="rounded-3xl border border-border/80 bg-background/85 p-5 sm:p-6 shadow-2xl backdrop-blur-md">
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
                  Why Borrowers Reach Out
                </p>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
                  Speed matters, but clear execution matters more.
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Borrowers come to AssetLift when timing matters, the file has moving parts, and
                  they want straight answers before they waste time chasing the wrong lender.
                </p>
              </div>

              <div className="space-y-4 mb-6">
                {proofItems.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-start gap-4 rounded-2xl border border-border bg-secondary/25 p-4"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        {item.label}
                      </p>
                      <p className="text-base font-semibold">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl bg-foreground px-5 py-4 text-background">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-2">
                  DSCR Highlight
                </p>
                <p className="text-lg font-semibold">Rates starting as low as 5.85%</p>
                <p className="text-sm text-background/75 mt-1">
                  For qualifying DSCR rental-property scenarios.
                </p>
              </div>

              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-3">
                  Quick Paths
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {quickLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-xl border border-border bg-secondary/20 px-4 py-3 text-sm font-medium hover:border-primary/50 hover:bg-secondary/35 transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
