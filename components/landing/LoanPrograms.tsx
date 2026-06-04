'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Check, Hammer, Building2, Home, ArrowLeftRight, CalendarDays, Landmark } from "lucide-react";

const LoanPrograms = () => {
  const consultHref = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_URL || "/contact";

  const programs = [
    {
      id: "fix-flip",
      title: "Fix & Flip",
      subtitle: "SHORT-TERM INVESTOR CAPITAL",
      maxValue: "95",
      loanType: "LTC",
      loanTypeLabel: "COST",
      highlights: [
        "Up to 95% LTC on purchase & 75% LTV",
        "Up to 100% rehab funded",
        "Loans up to $5MM",
        "Terms built for acquisition and rehab",
        "1-4 unit residential properties",
        "Pay no interest on undrawn renovation funds",
      ],
      otherOptions: "*Bridge only options available",
      href: "/loans/fix-and-flip",
      Icon: Hammer,
    },
    {
      id: "ground-up",
      title: "Ground-Up",
      subtitle: "NEW BUILD FINANCING",
      maxValue: "90",
      loanType: "LTC",
      loanTypeLabel: "COST",
      highlights: [
        "Up to 90% LTC & 70% LTARV",
        "Up to 100% of construction",
        "Loans up to $5MM",
        "Built for experienced operators",
        "Spec builds, infills, neighborhood developments",
        "Pay no interest on undrawn construction funds",
      ],
      otherOptions: "BUILD2RENT\u00AE: Flexible DSCR options",
      href: "/loans/ground-up-construction",
      Icon: Building2,
    },
    {
      id: "bridge",
      title: "Bridge",
      subtitle: "SPEED AND TRANSITIONAL CAPITAL",
      maxValue: "80",
      loanType: "LTV",
      loanTypeLabel: "VALUE",
      highlights: [
        "Up to 80% LTV",
        "Quick closings in as fast as 5 days",
        "Loans up to $5MM",
        "Flexible short-term structure",
        "Residential & commercial",
        "Flexible exit strategies",
      ],
      href: "/loans/bridge",
      Icon: ArrowLeftRight,
    },
    {
      id: "rental",
      title: "Rental / DSCR",
      subtitle: "LONG-TERM RENTAL DEBT",
      maxValue: "85",
      loanType: "LTV",
      loanTypeLabel: "VALUE",
      highlights: [
        "Up to 85% LTV on purchase & refi",
        "Up to 75% LTV on cash out",
        "Loans up to $3MM",
        "30-year fixed and ARM options",
        "1-4 unit residential properties",
        "No personal income verification",
      ],
      href: "/loans/dscr-rental",
      Icon: Home,
    },
  ];

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
            Private Lending Solutions
          </motion.div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
            Loan Programs{" "}
            <span className="relative">
              <span className="gradient-text">Built for Investors</span>
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 rounded-full"
                initial={{ x: "-30%" }}
                animate={{ x: "30%" }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }}
              />
            </span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Choose the right structure faster. Every program is organized around deal type,
            leverage, and the likely exit.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={consultHref}
              className="inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/5 px-6 py-3 text-sm font-semibold text-primary hover:bg-primary/10 transition-colors"
            >
              <CalendarDays className="w-4 h-4" />
              Book a Free Consult
            </Link>
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-95 transition-opacity"
            >
              Get Funded
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        {/* Program cards */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
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
              className="group h-full"
            >
              <div className="relative flex flex-col h-full bg-card rounded-xl border border-border overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
                {/* Header */}
                <div className="relative bg-gradient-to-br from-zinc-900 to-zinc-800 dark:from-zinc-800 dark:to-zinc-900 p-5">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-amber-400 to-primary" />
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-primary text-[10px] font-semibold uppercase tracking-[0.2em] mb-1">
                        {program.subtitle}
                      </p>
                      <h3 className="text-white text-xl font-bold">
                        {program.title}
                      </h3>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <program.Icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow">
                  <div className="mb-5 pb-5 border-b border-border">
                    <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground mb-2">
                      Top End Leverage
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-black tracking-tight text-foreground">
                        {program.maxValue}
                      </span>
                      <span className="text-2xl font-bold text-foreground/70">%</span>
                      <span className="ml-2 text-xs font-semibold text-muted-foreground uppercase">
                        {program.loanType}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-2.5 mb-5 flex-grow">
                    {program.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm">
                        <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                        <span className="text-muted-foreground leading-snug">{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  {program.otherOptions && (
                    <p className="text-xs text-muted-foreground/70 italic mb-5 pl-6">
                      {program.otherOptions}
                    </p>
                  )}

                  <div className="mt-auto grid grid-cols-2 gap-3">
                    <Link
                      href={program.href}
                      className="flex h-12 items-center justify-center rounded-lg border border-border text-sm font-semibold hover:border-primary/50 hover:bg-secondary/30 transition-colors"
                    >
                      Program Details
                    </Link>
                    <Link
                      href="/apply"
                      className="group/btn relative flex h-12 items-center justify-center gap-2
                        bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500
                        hover:from-amber-400 hover:via-yellow-400 hover:to-amber-400
                        text-zinc-900 font-bold text-sm tracking-wide
                        rounded-lg overflow-hidden
                        shadow-[0_2px_8px_rgba(245,158,11,0.25)]
                        hover:shadow-[0_4px_20px_rgba(245,158,11,0.4)]
                        transition-all duration-300 ease-out"
                    >
                      <span className="relative z-10">Get Started</span>
                      <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Commercial — extended capability, not a core product */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="rounded-xl border border-border/60 bg-secondary/10 px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Landmark className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-0.5">
                  Extended Capabilities
                </p>
                <p className="font-semibold text-foreground">
                  Commercial &amp; Mixed-Use Scenarios
                </p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Acquisitions, refinances, bridge needs, and business-purpose investment properties. Structures matched to the asset.
                </p>
              </div>
            </div>
            <Link
              href="/loans/commercial-lending"
              className="shrink-0 inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-semibold text-foreground/80 hover:border-primary/50 hover:text-primary transition-colors"
            >
              Learn More
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LoanPrograms;
