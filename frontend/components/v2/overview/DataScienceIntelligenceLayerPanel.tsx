"use client";

// IR-42A-V2-DECISION-INTELLIGENCE-OS-UI-RESTRUCTURE — Data Science
// Intelligence Layer panel. Surfaces:
//   · 11 DS readiness dimensions (descriptive · NO ML active)
//   · upstream → downstream flow
//   · locked future gates (ML · MLOps · Simulation · Physics · Warehouse · Before/after validation)

interface DSDimension {
  id: string;
  name: string;
  caveat: string;
}

const DIMENSIONS: DSDimension[] = [
  { id: "DS-D01", name: "Metadata completeness",            caveat: "per-token presence of sha256 / source row reference" },
  { id: "DS-D02", name: "Source reliability",                caveat: "per-source-family reviewer-signed posture" },
  { id: "DS-D03", name: "Evidence sufficiency",              caveat: "per-zone reviewer-signed sufficiency band" },
  { id: "DS-D04", name: "Spatial aggregation readiness",     caveat: "H3 · Quadbin · descriptive only" },
  { id: "DS-D05", name: "Feature engineering readiness",     caveat: "feature store prerequisite · NOT activated" },
  { id: "DS-D06", name: "Supervised learning readiness",     caveat: "labeled set prerequisite · NOT activated" },
  { id: "DS-D07", name: "Unsupervised clustering readiness", caveat: "descriptive only · no segmentation activation" },
  { id: "DS-D08", name: "Regression readiness",              caveat: "future ML gate · descriptive coefficients only when activated" },
  { id: "DS-D09", name: "Statistics readiness",              caveat: "Moran-style / GWR descriptive · no forecast" },
  { id: "DS-D10", name: "Remote sensing eligibility",        caveat: "USGS visual reference only · no spectral activation" },
  { id: "DS-D11", name: "ML readiness blockers",             caveat: "NO_LABELED_DATASET · MLR_NOT_PASSED · DLR_NOT_PASSED" },
];

interface LockedGate {
  id: string;
  label: string;
  status: "BLOCKED" | "future_gated";
}

const LOCKED_GATES: LockedGate[] = [
  { id: "LG-01", label: "Machine Learning",                  status: "BLOCKED" },
  { id: "LG-02", label: "MLOps lifecycle",                   status: "BLOCKED" },
  { id: "LG-03", label: "Simulation runtime",                status: "BLOCKED" },
  { id: "LG-04", label: "Physics runtime",                   status: "BLOCKED" },
  { id: "LG-05", label: "Production warehouse · DB",         status: "future_gated" },
  { id: "LG-06", label: "Before / after validation",         status: "future_gated" },
];

const STATUS_CHIP: Record<LockedGate["status"], string> = {
  BLOCKED:      "border-risk-high text-risk-high bg-risk-high/[0.04]",
  future_gated: "border-amber-muted text-amber-muted bg-amber-muted/[0.04]",
};

export function DataScienceIntelligenceLayerPanel() {
  return (
    <section
      aria-labelledby="ds-layer-title"
      className="bg-white border border-rule"
    >
      <header className="px-4 py-3 border-b border-rule">
        <p className="text-[10px] uppercase tracking-wider text-ink-mute font-mono">
          Data Science Intelligence Layer · foundation_ready · NO ML active
        </p>
        <h2 id="ds-layer-title" className="mt-1 font-serif text-base text-ink leading-tight">
          Evidence Tokens → Feature Objects → Spatial Indexes → Relationship Edges → Formula Engine → Readiness Band → Decision Trace
        </h2>
        <p className="mt-1 text-[11px] text-ink-mute font-mono">
          source: udi-os-v2/config/intelligence_layers/data_science_methodology_lifecycle.json
        </p>
      </header>

      <div className="px-4 py-3">
        <p className="text-[10px] uppercase tracking-wider text-ink-mute font-mono mb-2">
          11 readiness dimensions
        </p>
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {DIMENSIONS.map((d) => (
            <li key={d.id} className="border border-rule bg-paper p-2">
              <p className="text-[10px] uppercase tracking-wider text-ink-mute font-mono">
                {d.id}
              </p>
              <p className="mt-1 font-serif text-sm text-ink leading-tight">{d.name}</p>
              <p className="mt-1 text-[10px] text-ink-mute leading-snug">{d.caveat}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="px-4 py-3 border-t border-rule bg-paper">
        <p className="text-[10px] uppercase tracking-wider text-ink-mute font-mono mb-2">
          Locked future gates · explicitly NOT active in P0
        </p>
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {LOCKED_GATES.map((g) => (
            <li key={g.id} className="border border-rule bg-white p-2 flex items-baseline justify-between gap-2">
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-wider text-ink-mute font-mono">{g.id}</p>
                <p className="mt-1 font-serif text-sm text-ink leading-tight">{g.label}</p>
              </div>
              <span className={["px-1.5 py-0.5 border text-[10px] font-mono whitespace-nowrap", STATUS_CHIP[g.status]].join(" ")}>
                {g.status === "BLOCKED" ? "BLOCKED · value=0" : "future_gated"}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <p className="px-4 py-2 border-t border-rule text-[10px] text-ink-mute font-mono leading-snug">
        no ML / DL / Physics / Simulation / MLOps activation · no automated decision · no prediction · no forecast · no surveillance · no enforcement · advisory only · candidate only · reviewer-anchored
      </p>
    </section>
  );
}
