'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

/* ── useCountUp hook ─────────────────────────────────────────────── */

function easeOutQuad(t: number) {
  return t * (2 - t);
}

function useCountUp(target: number, duration = 2000) {
  const [value, setValue] = useState(0);
  const started = useRef(false);

  const start = useCallback(() => {
    if (started.current) return;
    started.current = true;

    let rafId: number;
    let startTime: number | null = null;

    function tick(now: number) {
      if (startTime === null) startTime = now;
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuad(progress);

      setValue(Math.round(eased * target));

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    }

    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, [target, duration]);

  return { value, start };
}

/* ── Stat data ───────────────────────────────────────────────────── */

const stats = [
  { target: 500, prefix: '', suffix: '+', label: 'Projects Funded' },
  { target: 150, prefix: '$', suffix: 'M+', label: 'Loans Originated' },
  { target: 46, prefix: '', suffix: '', label: 'States Covered' },
];

/* ── Component ───────────────────────────────────────────────────── */

export default function AnimatedStats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasIntersected, setHasIntersected] = useState(false);

  const counter1 = useCountUp(stats[0].target);
  const counter2 = useCountUp(stats[1].target);
  const counter3 = useCountUp(stats[2].target);
  const counters = [counter1, counter2, counter3];

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasIntersected) {
          setHasIntersected(true);
          counters.forEach((c) => c.start());
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasIntersected]);

  return (
    <section
      ref={sectionRef}
      className="bg-foreground text-background py-20 md:py-28"
    >
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-1 gap-12 text-center sm:grid-cols-3">
          {stats.map((stat, i) => (
            <div key={stat.label}>
              <p className="text-5xl font-bold tracking-tight text-primary md:text-6xl">
                {stat.prefix}
                {counters[i].value}
                {stat.suffix}
              </p>
              <p className="mt-3 text-sm uppercase tracking-widest text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
