'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import atlas from 'us-atlas/states-albers-10m.json';
import { STATES } from '@/lib/data/states';

type SupportedState = (typeof STATES)[number];

interface LendingCoverageMapProps {
  compact?: boolean;
}

const stateByName = new Map(STATES.map((state) => [state.name, state]));
const pathGenerator = geoPath();

export default function LendingCoverageMap({ compact = false }: LendingCoverageMapProps) {
  const router = useRouter();
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  const supportedStates = useMemo(() => [...STATES].sort((a, b) => a.abbreviation.localeCompare(b.abbreviation)), []);

  const mapFeatures = useMemo(() => {
    const collection = feature(atlas as never, (atlas as any).objects.states) as any;
    return collection.features
      .map((entry: any) => {
        const supported = stateByName.get(entry.properties.name) as SupportedState | undefined;
        if (!supported) return null;
        return {
          ...entry,
          supported,
          path: pathGenerator(entry) ?? '',
        };
      })
      .filter(Boolean) as Array<any>;
  }, []);

  const activeState =
    supportedStates.find((state) => state.slug === hoveredSlug) ?? supportedStates[0];

  return (
    <div className="rounded-[28px] border border-border bg-card overflow-hidden shadow-xl">
      <div className="border-b border-border bg-gradient-to-r from-primary/20 via-primary/15 to-primary/10 px-5 py-4 md:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
          Where We Lend
        </p>
      </div>

      <div className={`grid ${compact ? 'xl:grid-cols-[1.25fr_0.75fr]' : 'xl:grid-cols-[1.35fr_0.65fr]'} gap-0`}>
        <div className="bg-gradient-to-b from-secondary/50 to-secondary/20 p-3 md:p-6">
          <svg
            viewBox="0 0 975 610"
            className="w-full h-auto"
            role="img"
            aria-label="Map of the United States showing states where AssetLift Lending provides hard money loans"
          >
            {mapFeatures.map((entry) => {
              const state = entry.supported as SupportedState;
              const isActive = activeState.slug === state.slug;

              return (
                <path
                  key={state.slug}
                  d={entry.path}
                  fill={isActive ? 'hsl(45, 93%, 52%)' : 'hsl(220, 15%, 22%)'}
                  stroke="hsl(var(--border))"
                  strokeWidth={1.8}
                  className="cursor-pointer transition-colors duration-150 hover:opacity-90"
                  onMouseEnter={() => setHoveredSlug(state.slug)}
                  onFocus={() => setHoveredSlug(state.slug)}
                  onClick={() => router.push(`/lending/${state.slug}`)}
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      router.push(`/lending/${state.slug}`);
                    }
                  }}
                />
              );
            })}
          </svg>
        </div>

        <div className="flex flex-col justify-between bg-card p-6 md:p-8">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
              Lending Across 46 States
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Hover over a state to preview coverage, then click through for local lending
              details, borrower guidance, and market-specific financing pages.
            </p>

            <div className="rounded-2xl border border-border bg-secondary/30 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-2">
                Currently Highlighted
              </p>
              <h4 className="text-2xl font-bold mb-2">{activeState.name}</h4>
              <p className="text-muted-foreground text-sm mb-4">
                Median home price {activeState.medianHomePrice}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                {activeState.marketHighlight}
              </p>
              <Link
                href={`/lending/${activeState.slug}`}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                View {activeState.name} lending page
              </Link>
            </div>
          </div>

          {!compact && (
            <div className="mt-8 rounded-2xl border border-border bg-secondary/30 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-3">
                Featured Product Paths
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Fix & Flip', href: '/loans/fix-and-flip' },
                  { label: 'Bridge', href: '/loans/bridge' },
                  { label: 'DSCR Rental', href: '/loans/dscr-rental' },
                  { label: 'Construction', href: '/loans/ground-up-construction' },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-full border border-border px-3 py-1.5 text-sm text-foreground/80 hover:bg-primary/10 hover:border-primary/50 transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-border bg-secondary/20 px-6 py-5 md:px-8">
        <p className="text-center text-sm font-semibold text-foreground mb-3">
          AssetLift currently lends in
        </p>
        <div className="flex flex-wrap justify-center gap-x-2 gap-y-2 text-sm text-muted-foreground">
          {supportedStates.map((state, index) => (
            <span key={state.slug} className="inline-flex items-center gap-2">
              <Link
                href={`/lending/${state.slug}`}
                className="hover:text-primary transition-colors"
                onMouseEnter={() => setHoveredSlug(state.slug)}
              >
                {state.abbreviation}
              </Link>
              {index < supportedStates.length - 1 ? <span className="text-muted-foreground/30">,</span> : null}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
