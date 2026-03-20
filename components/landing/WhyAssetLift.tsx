'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const panels = [
  {
    title: "Fast Processing",
    content:
      "Get pre-approved within 24 hours and close in as few as 10 days. Our streamlined underwriting process and in-house decision making allow us to fund deals faster than traditional lenders. When you find the right property, speed matters.",
  },
  {
    title: "Direct Lender Advantage",
    content:
      "AssetLift Lending funds loans from our own balance sheet. No middlemen, no third-party approvals, and no last-minute surprises. The team you talk to is the team that underwrites, approves, and funds your loan. One point of contact from application through funding.",
  },
  {
    title: "Highest Leverage Available",
    content:
      "We offer up to 92.5% loan-to-cost on fix and flip loans with 100% of rehab funded. Our DSCR rental loans go up to 80% LTV with no personal income verification. Keep more of your capital available for additional investments and project reserves.",
  },
  {
    title: "Built for Repeat Investors",
    content:
      "Our programs reward experienced borrowers with better rates, higher leverage, and faster closings. The more you work with AssetLift, the better your terms become. Count on our full support before and after closing — your project is the start of a lasting relationship.",
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
          {/* Left column — sticky heading */}
          <motion.div
            className="lg:sticky lg:top-32 lg:self-start"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Why Real Estate Investors Choose{" "}
              <span className="gradient-text">AssetLift Lending</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              AssetLift Lending is a direct private money lender that specializes in hard money loans
              for real estate investors nationwide. We provide fast, flexible financing for fix and flip
              projects, ground-up construction, DSCR rental properties, and bridge loans. Our team
              understands that in competitive real estate markets, the ability to close quickly and
              reliably is what separates successful investors from those who miss out on opportunities.
            </p>
          </motion.div>

          {/* Right column — accordion panels */}
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
              Hard Money Lending Built for Today&apos;s Real Estate Market
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Traditional bank financing is too slow for most investment properties. By the time a
              conventional lender completes their underwriting process, the deal has already gone to
              another buyer. Hard money loans from AssetLift Lending solve this problem by providing
              asset-based financing with fast approvals and closings in as few as seven business days.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              As a direct lender, every loan decision is made in-house by our underwriting team. There
              are no brokers adding time and fees to the process. When you submit a deal to AssetLift,
              the same team that reviews your application is the team that approves and funds your loan.
              This means fewer delays, clearer communication, and a more predictable closing process
              from start to finish.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Whether you are a first-time flipper looking for your initial investment property or an
              experienced investor scaling a portfolio of rental properties, AssetLift Lending has loan
              programs designed to match your strategy. Our fix and flip loans offer up to 92.5%
              loan-to-cost with 100% of rehab funded. Our DSCR rental loans provide long-term
              financing with no personal income verification required. And our bridge and construction
              programs give you the flexibility to execute on complex deals with confidence.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyAssetLift;
