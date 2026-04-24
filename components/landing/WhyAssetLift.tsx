'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const panels = [
  {
    title: "Fast Processing",
    content:
      "Hear back within 24 hours, usually within a few hours, and close in as fast as 7 to 14 business days on many deals. Experienced fix-and-flip investors with 3 or more completed flips may close in as fast as 5 business days, subject to underwriting, valuation, title, and file complexity.",
  },
  {
    title: "Flexible Capital Execution",
    content:
      "We provide private lending on many deals, and some deals are brokered with capital partners when that is the strongest fit for the file. The goal is not to force one structure on every scenario. It is to get you the strongest realistic path to closing.",
  },
  {
    title: "Highest Leverage Available",
    content:
      "We offer up to 92.5% loan-to-cost on fix and flip loans with 100% of rehab funded. Our DSCR rental loans go up to 80% LTV with no personal income verification. Keep more of your capital available for additional investments and project reserves.",
  },
  {
    title: "Built for Repeat Investors",
    content:
      "Our programs reward experienced borrowers with better rates, higher leverage, and faster closings. The more you work with AssetLift, the better your terms become. Count on our full support before and after closing. Your project is the start of a lasting relationship.",
  },
];

const WhyAssetLift = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const togglePanel = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="py-20 md:py-28 relative">
      <div className="container px-4 md:px-6">
        {/* Two-column layout */}
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
        {/* Left column: sticky heading */}
          <motion.div
            className="lg:sticky lg:top-32 lg:self-start"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Why Borrowers Choose{" "}
              <span className="gradient-text">AssetLift Lending</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              AssetLift helps real estate investors finance deals that banks usually slow down,
              overcomplicate, or decline. The focus is simple: give borrowers a realistic path to
              closing for fix and flip, bridge, rental, and construction files without wasting time.
            </p>
          </motion.div>

          {/* Right column: accordion panels */}
          <motion.div
            className="flex flex-col gap-3"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            {panels.map((panel, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={panel.title}
                  className={`border border-border rounded-xl overflow-hidden transition-colors duration-300 ${
                    isOpen ? "border-l-4 border-l-primary bg-card" : "bg-card/50"
                  }`}
                >
                  {/* Panel header */}
                  <button
                    onClick={() => togglePanel(index)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-secondary/40 transition-colors duration-200 cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="text-lg font-semibold pr-4">{panel.title}</span>
                    <motion.span
                      className="flex-shrink-0 text-primary"
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      {isOpen ? (
                        <Minus className="w-5 h-5" />
                      ) : (
                        <Plus className="w-5 h-5" />
                      )}
                    </motion.span>
                  </button>

                  {/* Panel content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5">
                          <p className="text-muted-foreground leading-relaxed">
                            {panel.content}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* SEO content section */}
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-secondary/30 border border-border rounded-2xl p-6 md:p-8">
            <h3 className="text-2xl font-bold mb-4">
              Financing Built for Real Deals, Not Perfect Files
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Most borrowers do not need more lender marketing. They need a financing partner who
              can tell them quickly whether the leverage, timeline, title, insurance, and exit
              story actually make sense. That is where AssetLift is strongest.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Instead of forcing every opportunity into one credit box, we look for the financing
              structure that best fits the property and the borrower&apos;s plan. That can mean private
              lending directly or a capital-partner execution path, but the borrower still gets one
              coordinated process and one team driving the file forward.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              If you are buying a value-add property, bridging a timing gap, refinancing into DSCR
              debt, or funding a build, the page should make one thing clear: this is lender copy
              written around borrower outcomes, not around generic buzzwords.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyAssetLift;
