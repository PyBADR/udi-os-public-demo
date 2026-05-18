"use client";

import { MC_EXAMPLES, FORMULA_COUNTS } from "@/lib/v2/overview/data";

interface Props {
  selectedFormula: string | null;
  onFormula: (id: string | null) => void;
}

export function MathematicalIntelligencePanel({
  selectedFormula,
  onFormula,
}: Props) {
  return (
    <section
      aria-labelledby="math-title"
      className="bg-white border border-rule"
    >
      <header className="px-4 py-3 border-b border-rule">
        <h2 id="math-title" className="font-serif text-lg text-ink">
          Mathematical Intelligence (rule-based · advisory)
        </h2>
        <p className="mt-0.5 text-[11px] text-ink-mute font-mono">
          10 formulas · score_status=candidate_only · production_ready=false · signal_value=null
        </p>
      </header>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 divide-x divide-y sm:divide-y-0 divide-rule">
        {MC_EXAMPLES.map((f) => {
          const active = selectedFormula === f.formula_id;
          const count = FORMULA_COUNTS[f.formula_id] || 0;
          return (
            <li key={f.formula_id}>
              <button
                type="button"
                onClick={() => onFormula(active ? null : f.formula_id)}
                className={[
                  "w-full h-full text-start px-3 py-3 text-sm transition-colors",
                  active
                    ? "bg-accent-soft text-accent"
                    : "text-ink-soft hover:bg-paper hover:text-ink",
                ].join(" ")}
              >
                <span className="block font-mono text-[11px] text-ink-mute">
                  {f.formula_id}
                </span>
                <span className="mt-0.5 block font-medium text-ink">
                  {f.formula_name}
                </span>
                <span className="mt-1 block text-[10px] text-ink-mute">
                  {count} rows · {f.score_scale}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <p className="px-4 py-2 border-t border-rule text-[11px] text-ink-mute font-mono">
        no prediction · no forecast · no return-of-investment framing · no investment recommendation · no automated decision · no ML / Physics / Simulation output
      </p>
    </section>
  );
}
