"use client";

import { HEADLINE_METRICS, FORMULA_COUNTS, EDGE_TYPE_COUNTS, BAND_COUNTS } from "@/lib/v2/overview/data";

export function DataSizeReadinessStrip() {
  const m = HEADLINE_METRICS;
  const totalBands = Object.values(BAND_COUNTS).reduce((a, b) => a + (b as number), 0);
  const totalFormulas = Object.keys(FORMULA_COUNTS).length;
  const totalEdgeTypes = Object.keys(EDGE_TYPE_COUNTS).length;
  return (
    <section
      aria-labelledby="data-size-title"
      className="bg-white border border-rule"
    >
      <header className="px-4 py-3 border-b border-rule">
        <h2 id="data-size-title" className="font-serif text-lg text-ink">
          Data size readiness strip
        </h2>
        <p className="mt-0.5 text-[11px] text-ink-mute font-mono">
          candidate counts · advisory only · no production warehouse sizing
        </p>
      </header>
      <ul className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 divide-x divide-y sm:divide-y-0 divide-rule">
        <StripCell label="Reviewed tokens"   value={m.reviewed_token_count} />
        <StripCell label="Math scores"       value={m.mathematical_score_count} />
        <StripCell label="Readiness bands"   value={m.readiness_band_count} />
        <StripCell label="Candidate edges"   value={m.candidate_edge_count} />
        <StripCell label="Source families"   value={m.source_family_count} />
        <StripCell label="Active layers"     value={m.active_layer_count} />
        <StripCell label="Foundation layers" value={m.foundation_layer_count} />
        <StripCell label="Locked layers"     value={m.locked_layer_count} />
      </ul>
      <div className="px-4 py-2 border-t border-rule text-[11px] text-ink-mute font-mono flex flex-wrap gap-x-4 gap-y-1">
        <span>· {totalFormulas} formulas executed</span>
        <span>· {totalEdgeTypes} edge types</span>
        <span>· {totalBands} bands assigned</span>
        <span>· 9 engines BLOCKED · value=0</span>
      </div>
    </section>
  );
}

function StripCell({ label, value }: { label: string; value: number }) {
  return (
    <li className="px-4 py-3">
      <p className="text-[10px] uppercase tracking-wider text-ink-mute">
        {label}
      </p>
      <p className="mt-1 font-serif text-xl text-ink tabular-nums">{value}</p>
    </li>
  );
}
