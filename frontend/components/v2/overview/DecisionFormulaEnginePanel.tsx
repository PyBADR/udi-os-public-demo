"use client";

// IR-42A-R2-V2-DECISION-FORMULA-ENGINE-UI-BINDING — Top-level panel
// that surfaces the BDII Decision Formula & Relationship Engine inside
// the Developer · Ontology Hub workspace. Composes:
//   · executive heading + subtitle
//   · BDII vs Power BI analogy strip (compact)
//   · formula equation strip
//   · constitutional caveat strip
//   · 8 factor cards (DecisionFormulaFactorCard)
//   · 6 worked examples A-F (DecisionFormulaWorkedExample)
//   · allowed-CTA bar (5 buttons · all visually disabled in P0)
//
// Selection is local to this panel. No broad page rewiring; the
// existing right Decision Trace panel is unchanged.

import { useState } from "react";
import {
  ENGINE_FACTORS,
  ENGINE_EQUATION_FORM,
  ENGINE_CAVEAT_STRIP,
  ENGINE_TAGLINE,
  ENGINE_ALLOWED_CTAS,
  POWER_BI_ANALOGY,
  WORKED_EXAMPLES,
  type EngineFactor,
  type WorkedExample,
} from "@/lib/v2/overview/decisionFormulaEngineConfig";
import { DecisionFormulaFactorCard } from "./DecisionFormulaFactorCard";
import { DecisionFormulaWorkedExample } from "./DecisionFormulaWorkedExample";

interface Props {
  // IR-42A-R3 — optional callbacks to lift selection into platform state.
  // When omitted, the panel behaves exactly as in IR-42A-R2 (local only).
  onSelectFactor?: (factor: EngineFactor | null) => void;
  onSelectWorkedExample?: (example: WorkedExample | null) => void;
}

export function DecisionFormulaEnginePanel({
  onSelectFactor,
  onSelectWorkedExample,
}: Props = {}) {
  const [selectedFactor, setSelectedFactor] = useState<string | null>(null);
  const [selectedExample, setSelectedExample] = useState<string | null>(null);

  const handleFactor = (id: string | null) => {
    setSelectedFactor(id);
    const next = id ? ENGINE_FACTORS.find((f) => f.factor === id) ?? null : null;
    onSelectFactor?.(next);
  };
  const handleExample = (id: string | null) => {
    setSelectedExample(id);
    const next = id ? WORKED_EXAMPLES.find((e) => e.example_id === id) ?? null : null;
    onSelectWorkedExample?.(next);
  };

  return (
    <section
      aria-labelledby="dfre-title"
      className="border-y border-rule bg-paper px-4 py-3"
    >
      <header className="mb-3">
        <p className="text-[10px] uppercase tracking-wider text-ink-mute font-mono">
          IR-42A-R2 · BDII DAX-equivalent
        </p>
        <h3 id="dfre-title" className="mt-1 font-serif text-lg text-ink leading-tight">
          Decision Formula &amp; Relationship Engine
        </h3>
        <p className="mt-1 text-sm text-ink-soft max-w-3xl">
          BDII&rsquo;s governed alternative to BI measures: evidence, relationships, formulas, data science readiness, context, governance, workflow state, and human review combine into reviewer-facing decision readiness.
        </p>
        <p className="mt-1 text-[10px] text-ink-mute font-mono">{ENGINE_TAGLINE}</p>
      </header>

      {/* Equation strip */}
      <div className="border border-rule bg-white px-3 py-2 mb-3">
        <p className="text-[10px] uppercase tracking-wider text-ink-mute font-mono mb-1">
          BDII Decision Readiness equation
        </p>
        <p className="font-mono text-[12px] text-ink leading-relaxed break-words">
          {ENGINE_EQUATION_FORM}
        </p>
        <p className="mt-1 text-[10px] text-ink-mute italic leading-snug">
          if any required factor is missing, blocked, unreviewed, or zero → output is CANDIDATE-ONLY · REVIEWER-REQUIRED · BLOCKED BY GOVERNANCE · or FUTURE-GATED
        </p>
      </div>

      {/* Caveat strip */}
      <ul className="flex flex-wrap gap-1 mb-3 text-[10px] font-mono">
        {ENGINE_CAVEAT_STRIP.map((c) => (
          <li key={c} className="px-1.5 py-0.5 border border-rule bg-white text-ink-mute">
            {c}
          </li>
        ))}
      </ul>

      {/* Power BI analogy strip · compact */}
      <details className="border border-rule bg-white mb-3">
        <summary className="px-3 py-2 text-[11px] font-mono text-ink-mute cursor-pointer hover:bg-paper">
          BDII vs Power BI · concept analogy (compare · do not copy)
        </summary>
        <ul className="divide-y divide-rule">
          {POWER_BI_ANALOGY.map((row) => (
            <li key={row.pbi_concept} className="px-3 py-2 grid grid-cols-[10rem_minmax(0,1fr)] gap-2 text-[11px]">
              <span className="text-ink-mute font-mono">{row.pbi_concept}</span>
              <span className="text-ink-soft">{row.bdii_equivalent}</span>
            </li>
          ))}
        </ul>
      </details>

      {/* 8 factor cards */}
      <p className="text-[10px] uppercase tracking-wider text-ink-mute font-mono mb-2">
        8 factors · click a factor to inspect
      </p>
      <ul className="grid gap-2 md:grid-cols-2 xl:grid-cols-4 mb-4">
        {ENGINE_FACTORS.map((f) => (
          <DecisionFormulaFactorCard
            key={f.factor}
            factor={f}
            selected={f.factor === selectedFactor}
            onSelect={handleFactor}
          />
        ))}
      </ul>

      {/* 6 worked examples */}
      <p className="text-[10px] uppercase tracking-wider text-ink-mute font-mono mb-2">
        6 worked examples · A through F
      </p>
      <ul className="grid gap-2 md:grid-cols-2 xl:grid-cols-3 mb-3">
        {WORKED_EXAMPLES.map((e) => (
          <DecisionFormulaWorkedExample
            key={e.example_id}
            example={e}
            selected={e.example_id === selectedExample}
            onSelect={handleExample}
          />
        ))}
      </ul>

      {/* Allowed CTAs · visually disabled in P0 */}
      <div className="border-t border-rule pt-3 flex flex-wrap items-center gap-2">
        <p className="text-[10px] uppercase tracking-wider text-ink-mute font-mono">
          P0 surfaces are configuration-only · allowed CTAs render as disabled buttons:
        </p>
        <ul className="flex flex-wrap gap-1">
          {ENGINE_ALLOWED_CTAS.map((cta) => (
            <li key={cta}>
              <button
                type="button"
                disabled
                aria-disabled="true"
                title="P0 surfaces are configuration-only; the reviewer brief workflow is a future gate"
                className="px-2 py-1 border border-rule text-[11px] font-mono text-ink-mute bg-white cursor-not-allowed"
              >
                {cta}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-2 text-[10px] text-ink-mute font-mono leading-snug">
        forbidden CTAs (NEVER rendered): run model · execute model · deploy model · predict · optimize automatically · production-ready · approve decision
      </p>
    </section>
  );
}
