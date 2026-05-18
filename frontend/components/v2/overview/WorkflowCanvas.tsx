"use client";

// IR-40A-V2-DYNAMIC-PLATFORM-SHELL-BUILD — Workflow Canvas.
// 17-node decision pipeline rendered as a left-to-right ordered DAG.
// Status is sourced from the kernel layer registry surfaced through
// data.ts (active_candidate_runtime / foundation_ready / locked_future_gate).
// No CARTO branding, no copied affordances — just a quiet, institutional
// flow visualization. Each node is a button; selection updates the
// right Decision Trace Panel.

interface WfNode {
  id: string;
  label: string;
  band: "evidence" | "data" | "math" | "decision" | "human";
  status: "active_candidate_runtime" | "foundation_ready" | "locked_future_gate";
  caveat: string;
}

const NODES: WfNode[] = [
  { id: "N01", label: "Evidence Pack",            band: "evidence", status: "active_candidate_runtime", caveat: "local RIY pack · reviewer-anchored" },
  { id: "N02", label: "File Census",              band: "evidence", status: "active_candidate_runtime", caveat: "716 files · 100 folders · SHA-256 anchored" },
  { id: "N03", label: "Source Registry",          band: "evidence", status: "active_candidate_runtime", caveat: "4 included families · 3 excluded" },
  { id: "N04", label: "Asset Registry",           band: "evidence", status: "active_candidate_runtime", caveat: "per-file asset record · reviewer-signed" },
  { id: "N05", label: "Document Registry",        band: "evidence", status: "active_candidate_runtime", caveat: "per-doc reference row" },
  { id: "N06", label: "Signal Registry",          band: "data",     status: "active_candidate_runtime", caveat: "advisory signals only · no forecast" },
  { id: "N07", label: "Data Warehouse Contract",  band: "data",     status: "locked_future_gate",       caveat: "future DB gate · file-based today" },
  { id: "N08", label: "ETL / ELT Contract",       band: "data",     status: "active_candidate_runtime", caveat: "Gate 3 ETL · candidate hydration" },
  { id: "N09", label: "Data Quality Rules",       band: "data",     status: "foundation_ready",         caveat: "rule-based descriptive · NO ML" },
  { id: "N10", label: "Metadata & Lineage",       band: "data",     status: "active_candidate_runtime", caveat: "per-token provenance chain" },
  { id: "N11", label: "Feature Store Contract",   band: "data",     status: "locked_future_gate",       caveat: "future ML gate · BLOCKED today" },
  { id: "N12", label: "Data Science Foundation",  band: "math",     status: "foundation_ready",         caveat: "descriptive profiles only · NO model" },
  { id: "N13", label: "Mathematical Core",        band: "math",     status: "active_candidate_runtime", caveat: "10 formulas · 710 candidate scores" },
  { id: "N14", label: "Relationship Graph",       band: "math",     status: "active_candidate_runtime", caveat: "280 candidate edges · descriptive" },
  { id: "N15", label: "Decision Kernel",          band: "decision", status: "active_candidate_runtime", caveat: "17 layers · advisory only" },
  { id: "N16", label: "Human Review",             band: "human",    status: "active_candidate_runtime", caveat: "municipal reviewer is the sole producer" },
  { id: "N17", label: "Advisory Output",          band: "human",    status: "active_candidate_runtime", caveat: "no enforcement · no automated decision" },
];

const BAND_LABEL: Record<WfNode["band"], string> = {
  evidence: "Evidence",
  data:     "Data substrate",
  math:     "Mathematical / graph",
  decision: "Decision kernel",
  human:    "Reviewer",
};

const STATUS_CHIP: Record<WfNode["status"], string> = {
  active_candidate_runtime: "border-accent text-accent bg-accent-soft",
  foundation_ready:         "border-rule text-ink-mute bg-paper",
  locked_future_gate:       "border-risk-high text-risk-high bg-risk-high/[0.04]",
};

const STATUS_LABEL: Record<WfNode["status"], string> = {
  active_candidate_runtime: "active · candidate",
  foundation_ready:         "foundation · not activated",
  locked_future_gate:       "BLOCKED · value=0",
};

interface Props {
  selectedNode: string | null;
  onNode: (id: string | null) => void;
}

export function WorkflowCanvas({ selectedNode, onNode }: Props) {
  const bands: Array<WfNode["band"]> = ["evidence", "data", "math", "decision", "human"];
  return (
    <section
      aria-labelledby="workflow-canvas-title"
      className="bg-white border border-rule"
    >
      <header className="px-4 py-3 border-b border-rule flex items-baseline justify-between">
        <div>
          <h2 id="workflow-canvas-title" className="font-serif text-lg text-ink">
            Decision pipeline · 17 nodes
          </h2>
          <p className="mt-0.5 text-[11px] text-ink-mute font-mono">
            Evidence → Data substrate → Math / graph → Decision kernel → Human review → Advisory output
          </p>
        </div>
        {selectedNode && (
          <button
            type="button"
            onClick={() => onNode(null)}
            className="text-xs text-accent hover:underline"
          >
            Clear node
          </button>
        )}
      </header>
      <div className="p-4 overflow-x-auto">
        <div className="min-w-[920px] grid grid-cols-5 gap-3">
          {bands.map((b) => (
            <div key={b} className="space-y-2">
              <p className="text-[10px] uppercase tracking-wider text-ink-mute font-mono">
                {BAND_LABEL[b]}
              </p>
              {NODES.filter((n) => n.band === b).map((n) => {
                const active = n.id === selectedNode;
                return (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => onNode(active ? null : n.id)}
                    aria-pressed={active}
                    className={[
                      "w-full text-start p-2 border bg-paper transition-colors",
                      active ? "border-accent ring-1 ring-accent/40" : "border-rule hover:border-accent/60",
                    ].join(" ")}
                  >
                    <p className="text-[10px] text-ink-mute font-mono">{n.id}</p>
                    <p className="mt-0.5 text-sm text-ink font-medium leading-tight">{n.label}</p>
                    <p className={["mt-1 inline-block px-1.5 py-0.5 border text-[10px] font-mono",
                      STATUS_CHIP[n.status]].join(" ")}>
                      {STATUS_LABEL[n.status]}
                    </p>
                    <p className="mt-1 text-[10px] text-ink-mute leading-snug">{n.caveat}</p>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <p className="px-4 py-2 border-t border-rule text-[11px] text-ink-mute font-mono">
        Conceptual decision pipeline · advisory only · no automated escalation · no automated decision
      </p>
    </section>
  );
}
