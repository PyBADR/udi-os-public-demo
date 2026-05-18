"use client";

// IR-42A-V2-DECISION-INTELLIGENCE-OS-UI-RESTRUCTURE — Formula Registry
// view for the Formula Engine workspace. Surfaces MC-A..MC-J as a
// compact registry with score scale and calculation method (read-only).
// Configuration only · no live computation · scores are advisory.

import { MC_EXAMPLES } from "@/lib/v2/overview/data";

interface Props {
  selectedFormula: string | null;
  onFormula: (id: string | null) => void;
}

export function FormulaRegistry({ selectedFormula, onFormula }: Props) {
  return (
    <section
      aria-labelledby="formula-registry-title"
      className="bg-white border border-rule"
    >
      <header className="px-4 py-3 border-b border-rule">
        <p className="text-[10px] uppercase tracking-wider text-ink-mute font-mono">
          Formula Registry · 10 rule-based formulas
        </p>
        <h2 id="formula-registry-title" className="mt-1 font-serif text-base text-ink leading-tight">
          MC-A through MC-J · advisory · candidate · rule-based
        </h2>
        <p className="mt-1 text-[11px] text-ink-mute font-mono">
          source: mc_run · formula_explainability_log.json · 710 candidate score rows
        </p>
      </header>
      <ul className="divide-y divide-rule max-h-[28rem] overflow-y-auto">
        {MC_EXAMPLES.map((f) => {
          const active = f.formula_id === selectedFormula;
          return (
            <li key={f.formula_id}>
              <button
                type="button"
                onClick={() => onFormula(active ? null : f.formula_id)}
                aria-pressed={active}
                className={[
                  "w-full text-start px-4 py-3 transition-colors",
                  active ? "bg-accent-soft" : "hover:bg-paper",
                ].join(" ")}
              >
                <div className="flex items-baseline justify-between gap-2 flex-wrap">
                  <p className="font-serif text-sm text-ink">
                    <span className="text-ink-mute font-mono text-[11px] me-2">{f.formula_id}</span>
                    {f.formula_name}
                  </p>
                  <span className="text-[10px] font-mono text-ink-mute">
                    scale: {f.score_scale}
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-ink-soft leading-snug">
                  {f.calculation_method}
                </p>
                {active && (
                  <p className="mt-1 text-[10px] text-ink-mute italic leading-snug">
                    {f.limitation_note}
                  </p>
                )}
              </button>
            </li>
          );
        })}
      </ul>
      <p className="px-4 py-2 border-t border-rule text-[11px] text-ink-mute font-mono">
        every formula is rule-based · no ML inference · advisory only · candidate only · not a prediction · not a recommendation · not an automated decision
      </p>
    </section>
  );
}
