'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { FAQCategory } from '@/lib/data/faq-expanded';

interface FAQAccordionProps {
  categories: FAQCategory[];
}

export default function FAQAccordion({ categories }: FAQAccordionProps) {
  return (
    <div className="space-y-12">
      {categories.map((category, catIndex) => (
        <div key={catIndex}>
          <h2 className="text-2xl font-bold mb-6">{category.category}</h2>
          <Accordion type="single" collapsible className="space-y-3">
            {category.items.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`cat-${catIndex}-item-${i}`}
                className="bg-card border border-border rounded-lg px-6 data-[state=open]:border-primary/50 transition-colors"
              >
                <AccordionTrigger className="text-left hover:text-primary hover:no-underline py-5 text-base font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}
    </div>
  );
}
