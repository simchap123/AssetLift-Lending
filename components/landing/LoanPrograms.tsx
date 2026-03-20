'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Check, Hammer, Building2, Home, ArrowLeftRight } from "lucide-react";

const programs = [
  {
    id: "fix-flip",
    title: "Fix & Flip",
    description: "Buy and rehab residential. Close in as few as 10 days.",
    href: "/loans/fix-and-flip",
    highlights: [
      "Up to 92.5% LTC & 75% LTV",
      "Up to 100% rehab funded",
      "Loans up to $5MM",
      "13, 19-month term options",
      "1-4 unit residential properties",
      "Pay no interest on undrawn renovation funds",
    ],
    Icon: Hammer,
  },
  {
    id: "ground-up",
    title: "Ground-Up Construction",
    description: "Build from the ground up. New investors welcome.",
    href: "/loans/ground-up-construction",
    highlights: [
      "Up to 90% LTC & 70% LTARV",
      "Up to 100% of construction",
      "Loans up to $5MM",
      "19, 24-month term options",
      "Spec builds, infills, neighborhood developments",
      "Pay no interest on undrawn construction funds",
    ],
    Icon: Building2,
  },
  {
    id: "bridge",
    title: "Bridge",
    description: "Extract equity or refinance. Flexible exit strategies.",
    href: "/loans/bridge",
    highlights: [
      "Up to 80% LTV",
      "Quick closings in 7-10 days",
      "Loans up to $5MM",
      "6, 12, 18-month terms",
      "Residential & commercial",
      "Flexible exit strategies",
    ],
    Icon: ArrowLeftRight,
  },
  {
    id: "rental",
    title: "Rental / DSCR",
    description: "Long-term financing. No personal income verification.",
    href: "/loans/dscr-rental",
    highlights: [
      "Up to 80% LTV on purchase & refi",
      "Up to 75% LTV on cash out",
      "Loans up to $3MM",
      "30-year fixed rate, 10|1 ARM & 5 year interest-only",
      "1-4 unit residential properties",
      "No personal income verification",
    ],
    Icon: Home,
  },
];

const LoanPrograms = () => {
  return (
    <section id="programs" className="py-28 md:py-40 relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container px-4 md:px-6 relative">
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2.5 mb-6 text-xs font-bold uppercase tracking-[0.2em] text-primary border border-primary/30 bg-primary/5 rounded-full backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Direct Private Lender
          </motion.div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
            Real Estate{" "}
            <span className="relative inline-block">
              <span className="gradient-text">Financing</span>
              <motion.span
                className="absolute -bottom-2 left-0 h-1 rounded-full bg-gradient-to-r from-primary to-yellow-500"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
            </span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Institutional-grade leverage for fix & flip, construction, and rental portfolios.
          </p>
        </motion.div>

        {/* Program cards — 2x2 grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {programs.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group"
            >
              <div className="relative flex flex-col bg-card rounded-2xl border border-border overflow-hidden transition-all duration-[400ms] ease-out hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2">
                {/* Top portion — always visible */}
                <div className="p-7 pb-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-2xl font-bold text-foreground mb-1.5 tracking-tight">
                        {program.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {program.description}
                      </p>
                    </div>
                    <Link
                      href={program.href}
                      className="flex-shrink-0 ml-4 w-11 h-11 rounded-full border border-border bg-card flex items-center justify-center transition-all duration-[400ms] group-hover:border-primary/50 group-hover:bg-primary/10 group-hover:rotate-[-45deg]"
                      aria-label={`Learn more about ${program.title}`}
                    >
                      <ArrowRight className="w-5 h-5 text-primary" />
                    </Link>
                  </div>
                </div>

                {/* Bottom portion — hover reveal */}
                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-[400ms] ease-out">
                  <div className="overflow-hidden">
                    <div className="px-7 pb-7 pt-2">
                      {/* Divider */}
                      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-5" />

                      <ul className="space-y-2.5 mb-6">
                        {program.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-sm">
                            <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                            <span className="text-muted-foreground leading-snug">{highlight}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex items-center gap-4">
                        <Link
                          href={program.href}
                          className="text-sm font-semibold text-primary hover:text-yellow-500 transition-colors duration-300 inline-flex items-center gap-1.5"
                        >
                          Learn More
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                        <Link
                          href="/apply"
                          className="inline-flex items-center justify-center gap-2 h-10 px-5 text-sm font-bold tracking-wide rounded-lg
                            bg-gradient-to-r from-primary via-yellow-500 to-primary
                            hover:from-amber-400 hover:via-yellow-400 hover:to-amber-400
                            text-zinc-900
                            shadow-[0_2px_8px_rgba(245,158,11,0.25)]
                            hover:shadow-[0_4px_20px_rgba(245,158,11,0.4)]
                            transition-all duration-300 ease-out"
                        >
                          Get Started
                          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoanPrograms;
