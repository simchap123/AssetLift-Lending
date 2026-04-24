'use client';

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const CTA = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Ready to <span className="gradient-text">Close Your Next Deal?</span>
          </h2>

          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Submit your deal in minutes. We will get back to you within 24 hours, usually within a few hours.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button asChild size="lg" className="text-lg px-10 py-7 glow-primary">
              <Link href="/apply">
                Apply for Funding
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-10 py-7">
              <Link href="/contact">
                Talk to Our Team
              </Link>
            </Button>
          </motion.div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-5 text-sm">
            <Link href="/compare" className="font-medium text-primary hover:text-primary/80 transition-colors">
              Compare lenders
            </Link>
            <Link href="/markets" className="font-medium text-primary hover:text-primary/80 transition-colors">
              Browse markets
            </Link>
            <Link href="/tools/dscr-calculator" className="font-medium text-primary hover:text-primary/80 transition-colors">
              Run DSCR numbers
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
