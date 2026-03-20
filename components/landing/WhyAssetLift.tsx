'use client';

import { motion } from "framer-motion";
import { Shield, Zap, DollarSign, Users, CheckCircle2, TrendingUp } from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "Close in 7 to 10 Days",
    description:
      "Our streamlined underwriting process and in-house decision making allow us to fund deals faster than traditional lenders. When you find the right property, speed matters.",
  },
  {
    icon: Shield,
    title: "Direct Lender, Not a Broker",
    description:
      "AssetLift Lending funds loans from our own balance sheet. No middlemen, no third-party approvals, and no last-minute surprises at the closing table.",
  },
  {
    icon: DollarSign,
    title: "Up to 92.5% Loan-to-Cost",
    description:
      "We offer some of the highest leverage in the hard money lending industry. Keep more of your own capital available for additional investments and project reserves.",
  },
  {
    icon: Users,
    title: "Built for Repeat Investors",
    description:
      "Our programs reward experienced borrowers with better rates, higher leverage, and faster closings. The more you work with AssetLift, the better your terms become.",
  },
  {
    icon: CheckCircle2,
    title: "Transparent Terms from Day One",
    description:
      "You will know your rate, fees, and timeline before you commit. We believe real estate investors deserve upfront pricing with no hidden costs or surprise charges at closing.",
  },
  {
    icon: TrendingUp,
    title: "Nationwide Coverage in 46 States",
    description:
      "Whether you are investing in Florida, Texas, California, or any of the other states we serve, AssetLift provides consistent execution and reliable funding across the country.",
  },
];

const WhyAssetLift = () => {
  return (
    <section className="py-20 md:py-28 relative">
      <div className="container px-4 md:px-6">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <benefit.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

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
