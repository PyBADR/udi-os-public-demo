"use client";

import { HEADLINE_METRICS } from "@/lib/v2/overview/data";
import type { WorkspaceId } from "./LeftNavRail";

interface Props {
  onPrimary?: (id: WorkspaceId) => void;
  onSecondary?: (id: WorkspaceId) => void;
  // IR-42B-V2-R7 — when compact, suppress lede paragraph, metric chips,
  // and engine summary line. Caller is expected to render the metric
  // chips elsewhere (below the map). Result: hero shrinks ~480 px → ~190 px.
  compact?: boolean;
}

// IR-40A-V2-DYNAMIC-PLATFORM-SHELL-BUILD — upgraded with two CTAs.
// IR-42B-V2-R7 — `compact` mode added so the map can dominate the first fold.
export function ExecutiveHero({ onPrimary, onSecondary, compact = false }: Props = {}) {
  const m = HEADLINE_METRICS;
  return (
    <section
      aria-labelledby="bdii-hero-title"
      className="bg-paper border-b border-rule"
    >
      <div className={compact ? "px-6 pt-4 pb-3" : "px-6 pt-6 pb-5"}>
        <p className="text-xs uppercase tracking-wider text-ink-mute font-mono">
          GCC · Riyadh · BDII
        </p>
        <h1
          id="bdii-hero-title"
          className={compact
            ? "mt-1 font-serif text-xl md:text-2xl text-ink leading-tight"
            : "mt-2 font-serif text-2xl md:text-3xl text-ink leading-tight"}
        >
          GCC Urban Decision Intelligence OS
        </h1>
        {!compact && (
          <p className="mt-2 text-sm text-ink-soft max-w-3xl">
            Evidence-backed · advisory-only · municipal-review governed. A single
            integrated decision intelligence operating system — not a report page,
            not a dashboard. Every signal below is candidate · reference ·
            inventory-anchored · reviewer-signed. Municipal review is the sole
            producer of consequential conclusions.
          </p>
        )}
        {compact && (
          <p className="mt-1 text-[12px] text-ink-soft max-w-3xl">
            Evidence-backed · advisory-only · municipal-review governed.
          </p>
        )}
        <div className={compact ? "mt-2 flex flex-wrap gap-2" : "mt-4 flex flex-wrap gap-2"}>
          <button
            type="button"
            onClick={() => onPrimary?.("workflows")}
            className={compact
              ? "px-2.5 py-1.5 text-[12px] font-medium bg-accent text-white border border-accent hover:bg-ink"
              : "px-3 py-2 text-sm font-medium bg-accent text-white border border-accent hover:bg-ink"}
          >
            Run 60-second Executive Preview
          </button>
          <button
            type="button"
            onClick={() => onSecondary?.("map")}
            className={compact
              ? "px-2.5 py-1.5 text-[12px] font-medium bg-white text-accent border border-accent hover:bg-accent-soft"
              : "px-3 py-2 text-sm font-medium bg-white text-accent border border-accent hover:bg-accent-soft"}
          >
            Open Riyadh Evidence Surface
          </button>
          {!compact && (
            <span className="self-center text-[10px] text-ink-mute font-mono">
              in-page workspace transitions · URL stays /v2/overview
            </span>
          )}
        </div>
        {!compact && (
          <>
            <dl className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-sm">
              <HeroChip label="Reviewed tokens"  value={m.reviewed_token_count} />
              <HeroChip label="Math scores"      value={m.mathematical_score_count} />
              <HeroChip label="Readiness bands"  value={m.readiness_band_count} />
              <HeroChip label="Candidate edges"  value={m.candidate_edge_count} />
              <HeroChip label="Source families"  value={m.source_family_count} />
              <HeroChip label="Kernel layers"    value={m.kernel_layer_count} />
            </dl>
            <p className="mt-3 text-[11px] text-ink-mute font-mono">
              {m.active_layer_count} active · {m.foundation_layer_count} foundation · {m.locked_layer_count} locked future · {m.locked_engine_count} engines BLOCKED · value=0
            </p>
          </>
        )}
      </div>
    </section>
  );
}

// IR-42B-V2-R7 — extracted compact metric strip · rendered below the map
// (so the map dominates first fold but metrics remain accessible)
export function ExecutiveMetricStrip() {
  const m = HEADLINE_METRICS;
  return (
    <section aria-label="Inventory metrics" className="bg-paper border-y border-rule px-6 py-3">
      <dl className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-sm">
        <HeroChip label="Reviewed tokens"  value={m.reviewed_token_count} />
        <HeroChip label="Math scores"      value={m.mathematical_score_count} />
        <HeroChip label="Readiness bands"  value={m.readiness_band_count} />
        <HeroChip label="Candidate edges"  value={m.candidate_edge_count} />
        <HeroChip label="Source families"  value={m.source_family_count} />
        <HeroChip label="Kernel layers"    value={m.kernel_layer_count} />
      </dl>
      <p className="mt-2 text-[11px] text-ink-mute font-mono">
        {m.active_layer_count} active · {m.foundation_layer_count} foundation · {m.locked_layer_count} locked future · {m.locked_engine_count} engines BLOCKED · value=0
      </p>
    </section>
  );
}

function HeroChip({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white border border-rule px-3 py-2">
      <dt className="text-[11px] uppercase tracking-wider text-ink-mute">
        {label}
      </dt>
      <dd className="mt-1 font-serif text-xl text-ink tabular-nums">
        {value}
      </dd>
    </div>
  );
}
