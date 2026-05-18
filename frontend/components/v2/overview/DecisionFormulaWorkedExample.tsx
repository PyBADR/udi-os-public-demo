"use client";

// IR-42A-R2-V2-DECISION-FORMULA-ENGINE-UI-BINDING — Worked example card.
// Renders one of the 6 worked examples (A-F) showing the input chain,
// engine interpretation, UI surface, governance limitation, and next
// human action. Read-only · no execution affordance.

import type { WorkedExample } from "@/lib/v2/overview/decisionFormulaEngineConfig";

interface Props {
  example: WorkedExample;
  selected: boolean;
  onSelect: (id: string | null) => void;
}

export function DecisionFormulaWorkedExample({ example, selected, onSelect }: Props) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(selected ? null : example.example_id)}
        aria-pressed={selected}
        className={[
          "w-full h-full text-start p-3 border bg-paper transition-colors",
          selected ? "border-accent ring-1 ring-accent/40" : "border-rule hover:border-accent/60",
        ].join(" ")}
      >
        <div className="flex items-baseline justify-between gap-2">
          <p className="text-[10px] uppercase tracking-wider text-ink-mute font-mono">
            example · {example.example_id}
          </p>
          <span className="px-1.5 py-0.5 border border-rule text-[10px] font-mono text-ink-mute bg-white">
            worked
          </span>
        </div>
        <p className="mt-1 font-serif text-sm text-ink leading-tight">{example.name}</p>
        <div className="mt-2 space-y-1.5 text-[11px]">
          <Row label="input chain" value={example.input_chain} mono />
          <Row label="engine interpretation" value={example.engine_interpretation} />
          <Row label="UI surface" value={example.ui_surface} mono />
          <Row label="governance limitation" value={example.governance_limitation} muted />
          <Row label="next human action" value={example.next_human_action} />
        </div>
      </button>
    </li>
  );
}

function Row({
  label,
  value,
  mono,
  muted,
}: {
  label: string;
  value: string;
  mono?: boolean;
  muted?: boolean;
}) {
  return (
    <div>
      <p className="text-[9px] uppercase tracking-wider text-ink-mute font-mono">{label}</p>
      <p
        className={[
          "leading-snug",
          mono ? "font-mono text-[10px]" : "text-[11px]",
          muted ? "text-ink-mute italic" : "text-ink-soft",
        ].join(" ")}
      >
        {value}
      </p>
    </div>
  );
}
