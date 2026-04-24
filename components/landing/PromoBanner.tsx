'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const messages = [
  { text: "Qualifying DSCR Rates Starting As Low As", highlight: "5.85%" },
  {
    text: "Qualifying Fix and Flip Rates Starting As Low As",
    highlight: "8.5%",
  },
];

const PromoBanner = () => {
  const [current, setCurrent] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % messages.length);
        setIsVisible(true);
      }, 350);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const msg = messages[current];

  return (
    <div className="fixed top-16 md:top-20 left-0 right-0 z-40 bg-foreground border-b border-primary/20">
      <div className="container flex items-center justify-center gap-4 md:gap-6 px-4 py-3 md:py-3.5">
        <span
          className="text-sm md:text-base font-medium text-background/90 tracking-wide transition-all duration-300 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(-8px)",
          }}
        >
          {msg.text}{" "}
          <span className="text-primary font-extrabold text-base md:text-lg">
            {msg.highlight}
          </span>
        </span>

        <Link
          href="/apply"
          className="inline-flex items-center gap-2 px-5 py-2 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-bold rounded-md transition-all duration-200 hover:shadow-[0_0_20px_hsl(45,93%,47%,0.4)] hover:scale-105 shrink-0"
        >
          Get My Quote
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default PromoBanner;
