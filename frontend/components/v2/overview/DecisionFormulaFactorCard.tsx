"use client";

// IR-42A-R2-V2-DECISION-FORMULA-ENGINE-UI-BINDING — Per-factor card.
// Renders one of the 8 Decision Formula factors with purpose · source ·
// UI surfaces · current status · blocker logic · next human action.
// Read-only · no execution affordance.

import type { EngineFactor } from "@/lib/v2/overview/decisionFormulaEngineConfig";

interface Props {
  factor: EngineFactor;
  selected: boolean;
  onSelect: (id: string | null) => void;
}

const STATUS_CHIP: Record<EngineFactor["current_status"], string> = {
  active_candidate:    "border-accent text-accent bg-accent-soft",
  foundation_ready:    "border-amber-muted text-amber-muted bg-amber-muted/[0.04]",
  locked_future_gate:  "border-risk-high text-risk-high bg-risk-high/[0.04]",
};

const STATUS_LABEL: Record<EngineFactor["current_status"], string> = {
  active_candidate:    "active · candidate",
  foundation_ready:    "foundation · ready · not activated",
  locked_future_gate:  "future-gated · BLOCKED",
};

export function DecisionFormulaFactorCard({ factor, selected, onSelect }: Props) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(selected ? null : factor.factor)}
        aria-pressed={selected}
        className={[
          "w-full h-full text-start p-3 border bg-white transition-colors",
          selected ? "border-accent ring-1 ring-accent/40" : "border-rule hover:border-accent/60",
        ].join(" ")}
      >
        <div className="flex items-baseline justify-between gap-2">
          <p className="text-[10px] uppercase tracking-wider text-ink-mute font-mono">
            {factor.factor}
          </p>
          <span className={["px-1.5 py-0.5 border text-[10px] font-mono", STATUS_CHIP[factor.current_status]].join(" ")}>
            {STATUS_LABEL[factor.current_status]}
          </span>
        </div>
        <p className="mt-1 font-serif text-sm text-ink leading-tight">{factor.uiLabel}</p>
        <p className="mt-1 text-[11px] text-ink-soft leading-snug line-clamp-3">
          {factor.shortPurpose}
        </p>
        <div className="mt-2 grid grid-cols-[5rem_minmax(0,1fr)] gap-x-2 gap-y-1 text-[10px] font-mono">
          <span className="text-ink-mute">count:</span>
          <span className="text-ink tabular-nums">{factor.current_count.toLocaleString()} {factor.type}{factor.current_count === 1 ? "" : "s"}</span>
          <span className="text-ink-mute">source:</span>
          <span className="text-ink-mute leading-snug truncate">{factor.source_config}</span>
          <span className="text-ink-mute">blocker:</span>
          <span className="text-ink-mute leading-snug">{factor.blocker_if_missing}</span>
        </div>
        {selected && (
          <div className="mt-2 space-y-1 border-t border-rule pt-2 text-[11px]">
            <p className="text-ink-soft">
              <span className="text-ink-mute">UI surfaces: </span>
              {factor.uiSurfaces.join(" · ")}
            </p>
            <p className="text-ink-soft">
              <span className="text-ink-mute">blocker logic: </span>
              {factor.blockerLogic}
            </p>
            <p className="text-ink-soft">
              <span className="text-ink-mute">next human action: </span>
              {factor.nextHumanAction}
            </p>
          </div>
        )}
      </button>
    </li>
  );
}
