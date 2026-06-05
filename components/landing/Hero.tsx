'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, BadgeCheck, CheckCircle, Clock3, MapPinned, Phone, TrendingUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { sendNotification } from "@/services/notificationService";
import { gtagReportConversion, gtagEvent } from "@/lib/gtag";
import { metaTrackLead } from "@/lib/meta-pixel";
import { pushToGHL } from "@/services/ghlService";

const Hero = () => {
  const [miniForm, setMiniForm] = useState({
    name: "",
    phone: "",
    email: "",
    strategy: "",
    purchasePrice: "",
    creditScore: "",
    state: "",
    flipsCompleted: "",
  });
  const [miniSubmitting, setMiniSubmitting] = useState(false);
  const [miniSubmitted, setMiniSubmitted] = useState(false);

  const proofItems = [
    { icon: Clock3, label: "Response Time", value: "Within 24 Hours" },
    { icon: BadgeCheck, label: "Closing Speed", value: "As Fast As 5 Days" },
    { icon: MapPinned, label: "Coverage", value: "46 States" },
  ];

  const borrowerSignals = [
    "Fix & flip, DSCR, bridge, and construction — four programs for every investor strategy",
    "No bank timelines. No income docs for DSCR. No runaround.",
    "Tell us the deal Thursday. Close next week.",
  ];

  const formatPhone = (value: string): string => {
    const numbers = value.replace(/\D/g, "");
    const char: { [key: number]: string } = { 0: "(", 3: ") ", 6: "-" };
    let formatted = "";
    for (let i = 0; i < numbers.length && i < 10; i++) {
      formatted += (char[i] || "") + numbers[i];
    }
    return formatted;
  };

  const formatCurrency = (value: string): string => {
    const raw = value.replace(/\D/g, "");
    return raw ? Number(raw).toLocaleString("en-US") : "";
  };

  const handleMiniChange = (name: string, value: string) => {
    let formatted = value;
    if (name === "phone") formatted = formatPhone(value);
    if (name === "purchasePrice") formatted = formatCurrency(value);
    setMiniForm((prev) => ({ ...prev, [name]: formatted }));
  };

  const miniFormValid =
    miniForm.name.trim().length >= 2 &&
    miniForm.phone.replace(/\D/g, "").length >= 10 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(miniForm.email) &&
    miniForm.strategy !== "" &&
    miniForm.purchasePrice.trim().length > 0 &&
    miniForm.creditScore !== "" &&
    miniForm.state.trim().length >= 2;

  const handleMiniSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!miniFormValid) return;
    setMiniSubmitting(true);
    try {
      await sendNotification("form", {
        name: miniForm.name,
        phone: miniForm.phone,
        email: miniForm.email,
        program: miniForm.strategy,
        loanAmount: miniForm.purchasePrice,
        creditScore: miniForm.creditScore,
        propertyAddress: miniForm.state,
        loanPurpose: "",
        contactMethod: "",
        arv: "",
        rehabAmount: "",
        message: `Quick quote request from homepage hero form. Completed flips: ${miniForm.flipsCompleted || "Not specified"}`,
      });
      gtagReportConversion();
      gtagEvent("generate_lead", {
        currency: "USD",
        value: Number(miniForm.purchasePrice.replace(/\D/g, "")),
      });
      metaTrackLead({
        currency: "USD",
        value: Number(miniForm.purchasePrice.replace(/\D/g, "")),
      });
      pushToGHL({
        name: miniForm.name,
        email: miniForm.email,
        phone: miniForm.phone,
        loanType: miniForm.strategy,
        propertyAddress: miniForm.state,
        purchasePrice: miniForm.purchasePrice,
        creditScore: miniForm.creditScore,
        flipsCompleted: miniForm.flipsCompleted || undefined,
        source: 'hero-form',
      });
      setMiniSubmitted(true);
    } finally {
      setMiniSubmitting(false);
    }
  };

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden py-24 sm:py-28">
      <div className="absolute inset-0">
        <Image
          src="/hero-house.jpg"
          alt="Luxury investment property representing hard money loan opportunities for real estate investors"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
      </div>

      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm"
            >
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                46 States &nbsp;·&nbsp; 24hr Response &nbsp;·&nbsp; 5-Day Close
              </span>
            </motion.div>

            <motion.h1
              data-speakable
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="text-foreground">Hard Money Loans</span>
              <br />
              <span className="gradient-text">for Real Estate Investors</span>
            </motion.h1>

            <motion.p
              data-speakable
              className="hero-description text-lg md:text-xl text-muted-foreground max-w-2xl mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Financing for borrowers who need speed, clean execution, and a lender that can
              actually explain the file. AssetLift handles fix and flip, bridge, DSCR rental,
              construction, and commercial lending scenarios across 46 states.
            </motion.p>

            <motion.p
              className="text-sm md:text-base text-muted-foreground/90 max-w-2xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              Fast closings, straight answers, and a real answer before you&apos;ve spent money on the wrong path.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button asChild size="lg" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-6 glow-primary">
                <Link href="/apply">
                  Review My Deal
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-6 border-primary/50 hover:bg-primary/10 backdrop-blur-sm">
                <a href="#programs">See Loan Options</a>
              </Button>
            </motion.div>

            <motion.div
              className="mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32 }}
            >
              <a
                href="tel:+19296392284"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" />
                (929) 639-2284 — call or text
              </a>
            </motion.div>

            <motion.div
              className="grid gap-3 sm:grid-cols-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.42 }}
            >
              {borrowerSignals.map((point) => (
                <div
                  key={point}
                  className="rounded-2xl border border-border/80 bg-background/72 px-4 py-4 backdrop-blur-sm"
                >
                  <p className="text-sm leading-relaxed text-foreground/90">{point}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Mini lead capture form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:justify-self-end w-full max-w-md"
          >
            <div className="rounded-[28px] border border-border/80 bg-background/88 p-6 shadow-2xl backdrop-blur-md sm:p-7">
              {miniSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Got it — we&apos;ll be in touch shortly.</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Usually within a few hours during business hours.
                  </p>
                  <Button asChild size="lg" className="w-full glow-primary">
                    <Link href="/apply">
                      Submit Full Deal Details
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </motion.div>
              ) : (
                <>
                  <div className="mb-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">
                      Get a Quick Quote
                    </p>
                    <h2 className="text-xl font-bold tracking-tight">
                      Tell us the deal. We&apos;ll tell you the rate.
                    </h2>
                    <p className="text-xs text-muted-foreground mt-1">We respond within a few hours.</p>
                  </div>

                  <form onSubmit={handleMiniSubmit} className="space-y-2.5">
                    {/* Row 1: Name */}
                    <Input
                      placeholder="Full name *"
                      value={miniForm.name}
                      onChange={(e) => handleMiniChange("name", e.target.value)}
                      className="h-10 rounded-xl bg-background/60 text-sm"
                    />

                    {/* Row 2: Phone + Email */}
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        placeholder="Phone *"
                        type="tel"
                        value={miniForm.phone}
                        onChange={(e) => handleMiniChange("phone", e.target.value)}
                        className="h-10 rounded-xl bg-background/60 text-sm"
                      />
                      <Input
                        placeholder="Email *"
                        type="email"
                        value={miniForm.email}
                        onChange={(e) => handleMiniChange("email", e.target.value)}
                        className="h-10 rounded-xl bg-background/60 text-sm"
                      />
                    </div>

                    {/* Row 3: Loan type */}
                    <Select
                      value={miniForm.strategy}
                      onValueChange={(v) => handleMiniChange("strategy", v)}
                    >
                      <SelectTrigger className="h-10 rounded-xl bg-background/60 text-sm">
                        <SelectValue placeholder="Loan type *" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fix-flip">Fix &amp; Flip</SelectItem>
                        <SelectItem value="dscr-rental">DSCR Rental</SelectItem>
                        <SelectItem value="bridge">Bridge Loan</SelectItem>
                        <SelectItem value="ground-up">Ground-Up Construction</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Row 4: Purchase price + Credit score */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">$</span>
                        <Input
                          placeholder="Purchase price *"
                          value={miniForm.purchasePrice}
                          onChange={(e) => handleMiniChange("purchasePrice", e.target.value)}
                          className="h-10 rounded-xl bg-background/60 pl-6 text-sm"
                          inputMode="numeric"
                        />
                      </div>
                      <Select
                        value={miniForm.creditScore}
                        onValueChange={(v) => handleMiniChange("creditScore", v)}
                      >
                        <SelectTrigger className="h-10 rounded-xl bg-background/60 text-sm">
                          <SelectValue placeholder="Credit score *" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="760+">760+ Excellent</SelectItem>
                          <SelectItem value="720-759">720–759 Very Good</SelectItem>
                          <SelectItem value="680-719">680–719 Good</SelectItem>
                          <SelectItem value="640-679">640–679 Fair</SelectItem>
                          <SelectItem value="600-640">600–640</SelectItem>
                          <SelectItem value="below-600">Below 600</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Row 5: Property state */}
                    <Input
                      placeholder="Property state (e.g. Texas) *"
                      value={miniForm.state}
                      onChange={(e) => handleMiniChange("state", e.target.value)}
                      className="h-10 rounded-xl bg-background/60 text-sm"
                    />

                    {/* Row 6: Completed flips */}
                    <Select
                      value={miniForm.flipsCompleted}
                      onValueChange={(v) => handleMiniChange("flipsCompleted", v)}
                    >
                      <SelectTrigger className="h-10 rounded-xl bg-background/60 text-sm">
                        <SelectValue placeholder="Completed flips" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">0 — First time</SelectItem>
                        <SelectItem value="1-3">1–3 flips</SelectItem>
                        <SelectItem value="4-10">4–10 flips</SelectItem>
                        <SelectItem value="11-25">11–25 flips</SelectItem>
                        <SelectItem value="25+">25+ flips</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full glow-primary rounded-xl"
                      disabled={miniSubmitting || !miniFormValid}
                    >
                      {miniSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          Get My Quote
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </form>

                  <div className="mt-4 pt-3 border-t border-border/50 grid grid-cols-3 gap-2">
                    {proofItems.map((item) => (
                      <div key={item.label} className="text-center">
                        <item.icon className="w-4 h-4 text-primary mx-auto mb-1" />
                        <p className="text-xs font-semibold leading-tight">{item.value}</p>
                        <p className="text-[10px] text-muted-foreground">{item.label}</p>
                      </div>
                    ))}
                  </div>

                  <p className="text-xs text-muted-foreground text-center mt-2">
                    No commitment. Business-purpose loans only.
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
