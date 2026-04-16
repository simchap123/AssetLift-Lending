'use client';

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, BadgeCheck, Clock3, MapPinned, TrendingUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  const trustPoints = [
    "Fix & flip, bridge, DSCR, and construction financing",
    "We get back to you within 24 hours, usually within a few hours",
    "Close in as fast as 7-14 days on many deals",
  ];

  const proofItems = [
    { icon: Clock3, label: "Response Time", value: "Within 24 Hours" },
    { icon: BadgeCheck, label: "Closing Speed", value: "As Fast As 7-14 Days" },
    { icon: MapPinned, label: "Coverage", value: "46 States" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
                Private Lending for Real Estate Investors
              </span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="text-foreground">Close Faster.</span>
              <br />
              <span className="gradient-text">Scale Smarter.</span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Private lending for investors who need realistic leverage, fast communication,
              and a lender that can actually move. We handle fix and flip, bridge, DSCR rental,
              and construction financing nationwide.
            </motion.p>

            <motion.p
              className="text-sm md:text-base text-muted-foreground/90 max-w-2xl mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              Many deals are closed through our private lending platform, and some deals are
              brokered with capital partners when that creates the strongest path to execution.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button asChild size="lg" className="text-lg px-8 py-6 glow-primary">
                <Link href="/apply">
                  Get My Deal Reviewed
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 border-primary/50 hover:bg-primary/10 backdrop-blur-sm">
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
            <div className="rounded-3xl border border-border/80 bg-background/85 p-6 shadow-2xl backdrop-blur-md">
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
                  Why Borrowers Reach Out
                </p>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
                  Speed matters, but clear execution matters more.
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Investors come to AssetLift when they need a lender that communicates quickly,
                  tells them what is realistic, and helps them get to the closing table without
                  unnecessary surprises.
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
                <p className="text-lg font-semibold">Rates starting as low as 5.75%</p>
                <p className="text-sm text-background/75 mt-1">
                  Available for qualifying rental-property scenarios.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
