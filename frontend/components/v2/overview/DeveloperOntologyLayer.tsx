"use client";

// IR-40A-V2-DYNAMIC-PLATFORM-SHELL-BUILD — Developer / Ontology layer.
// 8 core ontology objects exposed as candidate type cards. Each card
// shows the object's shape (key fields), its source-of-truth artifact,
// and a constitutional forbidden-claims note. This communicates that
// the platform sits on a typed substrate, not an ad-hoc dashboard.
//
// IR-42A-R1: appended a small Architecture Intelligence Matrix card
// at the bottom of the layer that surfaces the 14 BDII intelligence
// layers (configuration only · no live data binding).

import { HEADLINE_METRICS, ALLOWED_BANDS, MC_EXAMPLES, SOURCE_FAMILY_COUNTS } from "@/lib/v2/overview/data";
import {
  INTELLIGENCE_LAYERS,
  GCC4_OS_PILLARS,
  type LayerStatus,
} from "@/lib/v2/overview/intelligenceLayerConfig";
import { DecisionFormulaEnginePanel } from "./DecisionFormulaEnginePanel";
import type {
  EngineFactor,
  WorkedExample,
} from "@/lib/v2/overview/decisionFormulaEngineConfig";

interface OntCard {
  id: string;
  name: string;
  count: number | string;
  fields: string[];
  source_artifact: string;
  forbidden: string;
}

function buildOntology(): OntCard[] {
  const sourceCount = Object.keys(SOURCE_FAMILY_COUNTS).length;
  return [
    { id: "O01", name: "Evidence Token",        count: HEADLINE_METRICS.reviewed_token_count,  fields: ["id", "candidate_id", "path", "sha256", "size", "band"],                  source_artifact: "gate3 · reviewed_evidence_tokens.json",            forbidden: "no verified provenance without signoff" },
    { id: "O02", name: "Decision Token",        count: HEADLINE_METRICS.mathematical_score_count, fields: ["token_id", "formula_id", "value", "explanation", "limitation_note"], source_artifact: "mc_run · mathematical_scores_candidate.json",      forbidden: "no predicted decision · no ML inference" },
    { id: "O03", name: "Source Family",         count: sourceCount,                              fields: ["source_family", "layer", "governance_status", "forbidden_claims"],     source_artifact: "gate3 · materialized_source_registry.json",        forbidden: "no official integration claim" },
    { id: "O04", name: "Formula",               count: MC_EXAMPLES.length,                       fields: ["formula_id", "formula_name", "score_scale", "calculation_method"],     source_artifact: "mc_run · formula_explainability_log.json",         forbidden: "no return-of-investment framing · no forecast · no investment recommendation" },
    { id: "O05", name: "Readiness Band",        count: ALLOWED_BANDS.length,                     fields: ["band", "members", "candidate"],                                        source_artifact: "mc_run · readiness_bands_candidate.json",          forbidden: "no production readiness · no enforcement readiness" },
    { id: "O06", name: "Kernel Layer",          count: HEADLINE_METRICS.kernel_layer_count,      fields: ["layer_id", "layer_name", "status", "gate_required"],                  source_artifact: "kernel · decision_kernel_registry.json",           forbidden: "no live ML · no live DB · no live simulation" },
    { id: "O07", name: "Next Human Action",     count: HEADLINE_METRICS.kernel_layer_count,      fields: ["who_acts", "action", "evidence", "unlocks", "still_blocked"],          source_artifact: "kernel · next_human_action_contract.json",         forbidden: "no automated action · no auto-triggered consequence" },
    { id: "O08", name: "Governance Constraint", count: "constitutional",                         fields: ["always_visible", "one_click_toggle", "forbidden_phrases"],            source_artifact: "p0_governance_display_contract.md",                forbidden: "no softening of advisory-only notice · no removal of locked-engines list" },
  ];
}

interface Props {
  selectedObject: string | null;
  onObject: (id: string | null) => void;
  // IR-42A-R3 — optional callbacks lifting Decision Formula Engine
  // selection into platform-level Right Decision Trace state.
  onSelectDecisionFactor?: (factor: EngineFactor | null) => void;
  onSelectWorkedExample?: (example: WorkedExample | null) => void;
}

export function DeveloperOntologyLayer({
  selectedObject,
  onObject,
  onSelectDecisionFactor,
  onSelectWorkedExample,
}: Props) {
  const items = buildOntology();
  return (
    <section
      aria-labelledby="ontology-title"
      className="bg-white border border-rule"
    >
      <header className="px-4 py-3 border-b border-rule flex items-baseline justify-between">
        <div>
          <h2 id="ontology-title" className="font-serif text-lg text-ink">
            Developer · Ontology · 8 objects
          </h2>
          <p className="mt-0.5 text-[11px] text-ink-mute font-mono">
            Typed substrate · candidate · advisory · source-of-truth artifact named per object
          </p>
        </div>
        {selectedObject && (
          <button
            type="button"
            onClick={() => onObject(null)}
            className="text-xs text-accent hover:underline"
          >
            Clear
          </button>
        )}
      </header>
      <ArchitectureIntelligenceMatrix />
      <DecisionIntelligenceOsMatrix />
      <DecisionFormulaEnginePanel
        onSelectFactor={onSelectDecisionFactor}
        onSelectWorkedExample={onSelectWorkedExample}
      />
      <ul className="grid gap-3 p-4 md:grid-cols-2 xl:grid-cols-4">
        {items.map((o) => {
          const active = o.id === selectedObject;
          return (
            <li key={o.id}>
              <button
                type="button"
                onClick={() => onObject(active ? null : o.id)}
                aria-pressed={active}
                className={[
                  "w-full h-full text-start p-3 border bg-paper transition-colors",
                  active ? "border-accent ring-1 ring-accent/40" : "border-rule hover:border-accent/60",
                ].join(" ")}
              >
                <div className="flex items-baseline justify-between">
                  <p className="text-[10px] uppercase tracking-wider text-ink-mute font-mono">
                    {o.id}
                  </p>
                  <p className="font-mono text-xs text-ink tabular-nums">
                    {typeof o.count === "number" ? `${o.count} rows` : o.count}
                  </p>
                </div>
                <p className="mt-1 font-serif text-sm text-ink leading-tight">{o.name}</p>
                <p className="mt-2 text-[10px] text-ink-mute font-mono leading-snug">
                  fields: {o.fields.join(" · ")}
                </p>
                <p className="mt-2 text-[10px] text-ink-mute font-mono leading-snug">
                  source: {o.source_artifact}
                </p>
                <p className="mt-2 text-[10px] text-ink-mute leading-snug">
                  forbidden: {o.forbidden}
                </p>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

// IR-42A-R1 — Architecture Intelligence Matrix. Configuration-only
// display of the 14 BDII intelligence layers. Reads from
// `frontend/lib/v2/overview/intelligenceLayerConfig.ts`. No live data
// binding, no fetch, no execution. Communicates the architecture
// posture inside the Developer Hub.
const STATUS_CHIP: Record<LayerStatus, string> = {
  active_candidate:    "border-accent text-accent bg-accent-soft",
  foundation_ready:    "border-amber-muted text-amber-muted bg-amber-muted/[0.04]",
  locked_future_gate:  "border-risk-high text-risk-high bg-risk-high/[0.04]",
};

function ArchitectureIntelligenceMatrix() {
  return (
    <section
      aria-labelledby="arch-intel-matrix-title"
      className="border-y border-rule bg-paper px-4 py-3"
    >
      <header className="mb-2">
        <p className="text-[10px] uppercase tracking-wider text-ink-mute font-mono">
          IR-42A-R1 · Architecture Intelligence Matrix
        </p>
        <h3 id="arch-intel-matrix-title" className="font-serif text-base text-ink leading-tight">
          14 BDII intelligence layers · configuration only
        </h3>
        <p className="mt-0.5 text-[11px] text-ink-mute font-mono">
          Canonical registry: udi-os-v2/config/intelligence_layers/intelligence_layer_registry.json · no live data binding · no execution
        </p>
      </header>
      <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {INTELLIGENCE_LAYERS.map((l) => (
          <li key={l.layer_id} className="border border-rule bg-white p-2">
            <div className="flex items-baseline justify-between gap-2">
              <p className="text-[10px] uppercase tracking-wider text-ink-mute font-mono">
                {l.layer_id}
              </p>
              <span className={["px-1.5 py-0.5 border text-[10px] font-mono", STATUS_CHIP[l.status]].join(" ")}>
                {l.status.replace(/_/g, " ")}
              </span>
            </div>
            <p className="mt-1 font-serif text-sm text-ink leading-tight">{l.name}</p>
            <p className="mt-1 text-[10px] text-ink-mute leading-snug">{l.purpose}</p>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-[10px] text-ink-mute font-mono">
        advisory · candidate only · no ML/DL/Physics/Simulation/MLOps activation · no DB · no automated decision
      </p>
    </section>
  );
}

// IR-42B-R1 — Decision Intelligence OS Matrix (compact 6-pillar strip).
// Reads from `frontend/lib/v2/overview/intelligenceLayerConfig.ts` ·
// canonical source: udi-os-v2/config/intelligence_layers/gcc4_decision_intelligence_os_contract.json.
// Read-only · configuration only · no live data binding.
function DecisionIntelligenceOsMatrix() {
  return (
    <section
      aria-labelledby="gcc4-os-matrix-title"
      className="border-y border-rule bg-white px-4 py-3"
    >
      <header className="mb-2">
        <p className="text-[10px] uppercase tracking-wider text-ink-mute font-mono">
          IR-42B-R1 · GCC4 Decision Intelligence OS Matrix
        </p>
        <h3 id="gcc4-os-matrix-title" className="font-serif text-base text-ink leading-tight">
          6 OS pillars · GCC4 Decision Intelligence inside the GCC Urban Municipal Intelligence platform
        </h3>
        <p className="mt-0.5 text-[11px] text-ink-mute font-mono">
          Canonical contract: udi-os-v2/config/intelligence_layers/gcc4_decision_intelligence_os_contract.json
        </p>
      </header>
      <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {GCC4_OS_PILLARS.map((p) => (
          <li key={p.pillar_id} className="border border-rule bg-paper p-2">
            <div className="flex items-baseline justify-between gap-2">
              <p className="text-[10px] uppercase tracking-wider text-ink-mute font-mono">
                {p.pillar_id}
              </p>
              <span className="px-1.5 py-0.5 border border-accent text-accent bg-accent-soft text-[10px] font-mono">
                active · candidate
              </span>
            </div>
            <p className="mt-1 font-serif text-sm text-ink leading-tight">{p.name}</p>
            <p className="mt-1 text-[10px] text-ink-mute leading-snug">
              modules: {p.ui_modules.slice(0, 2).join(" · ")}
              {p.ui_modules.length > 2 ? " · …" : ""}
            </p>
            <p className="mt-1 text-[10px] text-ink-mute leading-snug">
              locked: {p.locked_capabilities.slice(0, 3).join(" · ")}
              {p.locked_capabilities.length > 3 ? " · …" : ""}
            </p>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-[10px] text-ink-mute font-mono">
        BDII is not a normal BI dashboard · Decision Readiness = Evidence × Graph × MathCore × DS × Macro/Micro/Economic × Governance × Workflow × Human Review · any missing factor → BLOCKED · CANDIDATE-ONLY · REVIEWER-REQUIRED
      </p>
    </section>
  );
}
