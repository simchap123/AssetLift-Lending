'use client';

import { motion, useInView } from "framer-motion";
import { FileText, Search, ClipboardCheck, Banknote } from "lucide-react";
import { useRef } from "react";

const StepCard = ({ step, index }: { step: { icon: any; title: string; description: string; number: string }; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 100, scale: 0.9 }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="flex flex-col items-center text-center"
    >
      <motion.span
        className="text-sm font-bold text-primary mb-3 px-3 py-1 rounded-full bg-primary/10 border border-primary/30"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: index * 0.15 + 0.1 }}
      >
        Step {step.number}
      </motion.span>

      <motion.div
        className="relative z-10 w-16 h-16 rounded-full bg-card border-2 border-primary flex items-center justify-center mb-4 shadow-lg"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
        transition={{
          duration: 0.5,
          delay: index * 0.15 + 0.2,
          type: "spring",
          stiffness: 200,
          damping: 15
        }}
        whileHover={{ scale: 1.1, rotate: 5 }}
      >
        <step.icon className="w-7 h-7 text-primary" />
      </motion.div>

      <motion.h3
        className="text-xl font-semibold mb-2"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
      >
        {step.title}
      </motion.h3>

      <motion.p
        className="text-muted-foreground text-sm"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: index * 0.15 + 0.4 }}
      >
        {step.description}
      </motion.p>
    </motion.div>
  );
};

const HowItWorks = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  const steps = [
    {
      icon: FileText,
      title: "Submit Your Deal",
      description: "Send the purchase, scope, rent story, or exit plan in a few minutes",
      number: "01",
    },
    {
      icon: Search,
      title: "Get a Real Answer",
      description: "We review the file and get back to you within 24 hours, usually within a few hours",
      number: "02",
    },
    {
      icon: ClipboardCheck,
      title: "Clear Due Diligence",
      description: "Valuation, title, insurance, and borrower items move in parallel to keep the file clean",
      number: "03",
    },
    {
      icon: Banknote,
      title: "Close and Fund",
      description: "Once the file is ready, many deals close in as fast as 7-14 days",
      number: "04",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-secondary/30 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          ref={headerRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 60 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 40 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            How It Works
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-lg max-w-xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            A cleaner process for borrowers who want speed without last-minute surprises
          </motion.p>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
            {steps.map((step, index) => (
              <StepCard key={step.title} step={step} index={index} />
            ))}
          </div>
        </div>

        <div className="mt-14 max-w-5xl mx-auto grid md:grid-cols-3 gap-4">
          {[
            {
              title: "If your deal is time-sensitive",
              text: "Bridge and fix and flip borrowers usually care most about how fast the lender can identify real issues and still get to the table.",
            },
            {
              title: "If your plan is to hold the property",
              text: "DSCR borrowers usually need clarity on rental support, leverage, reserves, and whether the refinance path really works.",
            },
            {
              title: "If the file has moving parts",
              text: "Construction and more complex scenarios need more than a rate quote. They need a lender that can explain the process before costs start stacking up.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-border bg-card p-5 text-left">
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
