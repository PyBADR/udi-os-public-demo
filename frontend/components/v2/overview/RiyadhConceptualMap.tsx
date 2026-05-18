"use client";

// IR-41A-V2-RIYADH-EVIDENCE-MAP-BINDING — Upgraded conceptual map.
// Renders the 5 Riyadh conceptual zones on a 3×3 grid, but now with
// per-zone evidence + readiness tints sourced from riyadhMapConfig.ts.
// Zones remain conceptual; no official municipal boundary is rendered.
// The component is the focus surface inside RiyadhEvidenceMapSurface.

import {
  RIYADH_CONCEPTUAL_ZONES,
  type RiyadhZone,
  type ReadinessPosture,
  type EvidencePosture,
} from "@/lib/v2/overview/riyadhMapConfig";

interface Props {
  selectedZone: string | null;
  onZone: (key: string | null) => void;
}

const READINESS_TINT: Record<ReadinessPosture, string> = {
  candidate_ready_for_reference: "bg-accent-soft/70 border-accent/40",
  review_pending:                "bg-amber-muted/[0.08] border-amber-muted/40",
  governance_limited:            "bg-risk-medium/[0.07] border-risk-medium/40",
  insufficient_evidence:         "bg-risk-high/[0.07] border-risk-high/40",
  blocked_from_decision_use:     "bg-risk-critical/[0.07] border-risk-critical/40",
};

const EVIDENCE_DOT: Record<EvidencePosture, string> = {
  evidence_present:        "bg-accent",
  evidence_partial:        "bg-amber-muted",
  evidence_pending_review: "bg-risk-high",
};

export function RiyadhConceptualMap({ selectedZone, onZone }: Props) {
  return (
    <section
      aria-labelledby="riyadh-map-title"
      className="bg-white border border-rule"
    >
      <header className="px-4 py-3 border-b border-rule flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h2 id="riyadh-map-title" className="font-serif text-lg text-ink">
            Riyadh conceptual intelligence map
          </h2>
          <p className="mt-0.5 text-[11px] text-ink-mute font-mono">
            Conceptual zones only · not official Riyadh municipal boundary · advisory
          </p>
        </div>
        {selectedZone && (
          <button
            type="button"
            onClick={() => onZone(null)}
            className="text-xs text-accent hover:underline"
          >
            Clear zone
          </button>
        )}
      </header>
      <div className="p-4">
        <div className="relative h-80 grid grid-cols-3 grid-rows-3 gap-2 bg-paper p-2 border border-rule">
          {RIYADH_CONCEPTUAL_ZONES.map((z) => (
            <ZoneCell
              key={z.id}
              z={z}
              selected={selectedZone === z.id}
              onSelect={onZone}
            />
          ))}
        </div>
        <ul className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1 text-[11px] text-ink-mute">
          <li>· No automated change detection</li>
          <li>· No NDVI / spectral-index</li>
          <li>· No surveillance · no individual identification</li>
          <li>· No enforcement signal</li>
          <li>· No official municipal boundary</li>
          <li>· Conceptual advisory zone reference</li>
        </ul>
      </div>
    </section>
  );
}

function ZoneCell({
  z,
  selected,
  onSelect,
}: {
  z: RiyadhZone;
  selected: boolean;
  onSelect: (k: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(z.id)}
      style={{ gridRow: z.gridRow, gridColumn: z.gridCol }}
      aria-pressed={selected}
      className={[
        "flex flex-col items-start justify-between p-2 border text-start transition-colors",
        READINESS_TINT[z.readinessPosture],
        selected
          ? "outline outline-2 outline-accent text-accent"
          : "text-ink-soft hover:outline hover:outline-1 hover:outline-accent/60",
      ].join(" ")}
    >
      <div className="flex items-center gap-1.5">
        <span
          aria-hidden="true"
          className={["inline-block w-2 h-2 rounded-full", EVIDENCE_DOT[z.evidencePosture]].join(" ")}
        />
        <span className="font-serif text-sm leading-tight text-ink">
          {z.label}
        </span>
        <span className="text-[10px] text-ink-mute font-mono">{z.arabicLabel}</span>
      </div>
      <div className="mt-1 text-[9px] text-ink-mute font-mono leading-snug">
        {z.role.replace(/_/g, " ")}
      </div>
      <div className="text-[9px] text-ink-mute font-mono">
        {z.readinessPosture.replace(/_/g, " ")}
      </div>
    </button>
  );
}
