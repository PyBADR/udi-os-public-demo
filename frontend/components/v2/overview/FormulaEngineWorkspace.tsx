"use client";

// IR-42A-V2-DECISION-INTELLIGENCE-OS-UI-RESTRUCTURE — Formula Engine
// workspace. Dedicated workspace surface for the BDII Decision Formula
// & Relationship Engine, composing:
//   · the existing DecisionFormulaEnginePanel (factor cards + worked examples)
//   · the FormulaRegistry (MC-A..MC-J · 10 formulas)
//   · the DataScienceIntelligenceLayerPanel (11 dimensions + 6 locked gates)
//
// All bound to platform Decision Trace selections (factor · worked
// example · formula) without route changes.

import { DecisionFormulaEnginePanel } from "./DecisionFormulaEnginePanel";
import { FormulaRegistry } from "./FormulaRegistry";
import { DataScienceIntelligenceLayerPanel } from "./DataScienceIntelligenceLayerPanel";
import type {
  EngineFactor,
  WorkedExample,
} from "@/lib/v2/overview/decisionFormulaEngineConfig";

interface Props {
  selectedFormula: string | null;
  onFormula: (id: string | null) => void;
  onSelectDecisionFactor?: (factor: EngineFactor | null) => void;
  onSelectWorkedExample?: (example: WorkedExample | null) => void;
}

export function FormulaEngineWorkspace({
  selectedFormula,
  onFormula,
  onSelectDecisionFactor,
  onSelectWorkedExample,
}: Props) {
  return (
    <section
      aria-labelledby="formula-engine-workspace-title"
      className="space-y-4"
    >
      <header>
        <p className="text-[10px] uppercase tracking-wider text-ink-mute font-mono">
          BDII Decision Intelligence OS · Intelligence group
        </p>
        <h1 id="formula-engine-workspace-title" className="font-serif text-xl text-ink leading-tight">
          Formula Engine
        </h1>
        <p className="mt-1 text-sm text-ink-soft max-w-3xl">
          BDII&rsquo;s governed alternative to dashboard measure logic. Evidence tokens, relationship edges, formula rules, governance constraints, and readiness bands produce advisory decision intelligence — not predictions, not recommendations, not automated decisions.
        </p>
      </header>

      <DecisionFormulaEnginePanel
        onSelectFactor={onSelectDecisionFactor}
        onSelectWorkedExample={onSelectWorkedExample}
      />

      <FormulaRegistry
        selectedFormula={selectedFormula}
        onFormula={onFormula}
      />

      <DataScienceIntelligenceLayerPanel />
    </section>
  );
}
