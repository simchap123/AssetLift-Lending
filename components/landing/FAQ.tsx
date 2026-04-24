'use client';

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What types of properties do you lend on?",
      answer: "We finance non-owner occupied residential investment properties including single-family homes, 2-4 unit properties, condos, and townhomes. We focus on fix & flip, ground-up construction, rental, and bridge loan scenarios.",
    },
    {
      question: "How quickly can you close?",
      answer: "Many deals can close in as fast as 7-14 business days, subject to underwriting, valuation, title, and file complexity.",
    },
    {
      question: "What are your minimum loan requirements?",
      answer: "Our minimum loan amount is $100,000 and maximum is $5,000,000. We require a minimum credit score of 660 and prefer borrowers with real estate investing experience, though we work with first-time investors on a case-by-case basis.",
    },
    {
      question: "Do you require personal guarantees?",
      answer: "Yes, we typically require a full personal guarantee from all members with 20%+ ownership in the borrowing entity. This helps us offer competitive rates and terms.",
    },
    {
      question: "What states do you lend in?",
      answer: "We are a nationwide lender, providing financing in most U.S. states. Some state-specific restrictions may apply. Contact us to confirm availability in your market.",
    },
  ];

  return (
    <section className="py-24 md:py-32 relative">
      <div className="container px-4 md:px-6 max-w-3xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2 data-speakable className="text-4xl md:text-5xl font-bold mb-4">FAQ</h2>
          <p data-speakable className="text-muted-foreground text-lg">
            Quick answers to common questions
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="bg-card border border-border rounded-lg px-6 data-[state=open]:border-primary/50 transition-colors"
                >
                  <AccordionTrigger className="text-left hover:text-primary hover:no-underline py-5 text-base font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5" data-speakable>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
