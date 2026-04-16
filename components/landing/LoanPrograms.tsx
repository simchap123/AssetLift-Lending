'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Check, Hammer, Building2, Home, ArrowLeftRight, CalendarDays } from "lucide-react";

const LoanPrograms = () => {
  const consultHref = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_URL || "/contact";

  const programs = [
    {
      id: "fix-flip",
      title: "Fix & Flip",
      subtitle: "INVESTMENTS",
      maxValue: "92.5",
      loanType: "LTC",
      loanTypeLabel: "COST",
      highlights: [
        "Up to 92.5% LTC & 75% LTV",
        "Up to 100% rehab funded",
        "Loans up to $5MM",
        "13, 19-month term options",
        "1-4 unit residential properties",
        "Pay no interest on undrawn renovation funds",
      ],
      otherOptions: "*Bridge only options available",
      Icon: Hammer,
    },
    {
      id: "ground-up",
      title: "Ground-Up",
      subtitle: "CONSTRUCTION",
      maxValue: "90",
      loanType: "LTC",
      loanTypeLabel: "COST",
      highlights: [
        "Up to 90% LTC & 70% LTARV",
        "Up to 100% of construction",
        "Loans up to $5MM",
        "19, 24-month term options",
        "Spec builds, infills, neighborhood developments",
        "Pay no interest on undrawn construction funds",
      ],
      otherOptions: "BUILD2RENT\u00AE: Flexible DSCR options",
      Icon: Building2,
    },
    {
      id: "bridge",
      title: "Bridge",
      subtitle: "FINANCING",
      maxValue: "80",
      loanType: "LTV",
      loanTypeLabel: "VALUE",
      highlights: [
        "Up to 80% LTV",
        "Quick closings in as fast as 7-14 days",
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
      subtitle: "PROPERTIES",
      maxValue: "80",
      loanType: "LTV",
      loanTypeLabel: "VALUE",
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
            Real Estate{" "}
            <span className="relative">
              <span className="gradient-text">Financing</span>
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
            Institutional-grade leverage for fix & flip, construction, and rental portfolios.
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
                      Maximum Leverage
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

                  <Link
                    href="/apply"
                    className="group/btn relative mt-auto w-full h-12 flex items-center justify-center gap-2
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoanPrograms;
