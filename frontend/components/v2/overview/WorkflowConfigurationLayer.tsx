"use client";

// IR-40B-V2-WORKFLOW-CONFIGURATION-LAYER — UI rendering of the
// workflowConfig.ts taxonomy. Configuration display only. No execution
// affordance. Allowed CTAs only. Institutional palette only.

import { useMemo, useState } from "react";
import {
  WORKFLOW_FAMILIES,
  WORKFLOW_STATUS_LABEL,
  ALLOWED_WORKFLOW_CTAS,
  totalTemplateCount,
  findMunicipalAlias,
  type WorkflowFamily,
  type WorkflowTemplate,
  type WorkflowStatus,
} from "@/lib/v2/overview/workflowConfig";

// IR-42A-V2-R1-WORKFLOW-MUNICIPAL-LABEL-ROLLOUT — per-family decision
// purpose sentences. Inline fallback map (no broad refactor); each
// sentence is reviewer-anchored advisory framing only — never asserts
// production, prediction, or automated decision logic.
const PURPOSE_SENTENCES: Record<string, string> = {
  "WF-BQML":       "Converts model-oriented workflow patterns into governed readiness assessment logic for human-reviewed municipal decisions.",
  "WF-CTRL":       "Codifies UI-side branching rules so every conditional path on the decision surface remains auditable and reviewer-anchored.",
  "WF-ENRICH":     "Attaches reviewer-signed reference attributes to candidate evidence tokens to thicken context without inferring new claims.",
  "WF-PREP":       "Shapes candidate evidence tables under explicit reviewer signoff before any advisory surface references them.",
  "WF-SPGEN":      "Derives candidate spatial features for advisory reference only · never produces an official boundary or operational geometry.",
  "WF-INS":        "Frames exposure and risk-reference context for human reviewers · advisory only, never an underwriting or pricing decision.",
  "WF-OPS":        "Documents planning-support inputs so municipal reviewers can attend to advisory readiness, never automated dispatch.",
  "WF-OOH":        "Aggregates urban visibility reference context · aggregate-only · no individual identification, no surveillance framing.",
  "WF-RETAIL":     "Surfaces candidate market-signal context for advisory framing · no investment recommendation, no expected return.",
  "WF-SNOWML":     "Documents the future-warehouse readiness shape · advisory-only configuration, never a live ML or warehouse activation.",
  "WF-SPANALYSIS": "Describes candidate relationship analyses across evidence and zones · descriptive only · never a causal claim.",
  "WF-SPINDEX":    "Anchors a descriptive H3 / Quadbin spatial substrate · indexing foundation only · not an official zone definition.",
  "WF-STATS":      "Holds descriptive statistical-reference templates as candidate framing · never a forecast or predicted band.",
  "WF-TELCO":      "Frames infrastructure and connectivity planning context for human reviewers · advisory only · no operational dispatch.",
};

export interface WorkflowSelection {
  familyId: string | null;
  templateId: string | null;
}

interface Props {
  selection: WorkflowSelection;
  onSelect: (s: WorkflowSelection) => void;
}

const STATUS_CHIP: Record<WorkflowStatus, string> = {
  candidate_config: "border-accent text-accent bg-accent-soft",
  future_gated:     "border-amber-muted text-amber-muted bg-amber-muted/[0.04]",
  blocked:          "border-risk-high text-risk-high bg-risk-high/[0.04]",
};

export function WorkflowConfigurationLayer({ selection, onSelect }: Props) {
  const [filter, setFilter] = useState<"all" | WorkflowStatus>("all");
  const families = useMemo(() => {
    if (filter === "all") return WORKFLOW_FAMILIES;
    return WORKFLOW_FAMILIES.filter((f) => f.status === filter);
  }, [filter]);
  const selectedFamily = selection.familyId
    ? WORKFLOW_FAMILIES.find((f) => f.id === selection.familyId) ?? null
    : null;
  const selectedTemplate =
    selectedFamily && selection.templateId
      ? selectedFamily.templates.find((t) => t.id === selection.templateId) ?? null
      : null;

  return (
    <section
      aria-labelledby="wf-config-title"
      className="bg-white border border-rule"
    >
      <header className="px-4 py-3 border-b border-rule flex items-baseline justify-between gap-3 flex-wrap">
        <div>
          <h2 id="wf-config-title" className="font-serif text-lg text-ink">
            Workflow Configuration Layer · {WORKFLOW_FAMILIES.length} families · {totalTemplateCount()} candidate templates
          </h2>
          <p className="mt-0.5 text-[11px] text-ink-mute font-mono">
            Configuration only · advisory · candidate · no execution affordance · reviewer-anchored
          </p>
        </div>
        <label className="flex items-center gap-2 text-[11px] text-ink-mute font-mono">
          status:
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as typeof filter)}
            className="border border-rule bg-paper px-2 py-1 text-ink"
          >
            <option value="all">all</option>
            <option value="candidate_config">candidate config</option>
            <option value="future_gated">future-gated</option>
            <option value="blocked">BLOCKED</option>
          </select>
        </label>
      </header>

      {/* Family rail (top, scrollable) */}
      <nav
        aria-label="Workflow families"
        className="border-b border-rule bg-paper px-3 py-2 overflow-x-auto"
      >
        <ul className="flex gap-2 min-w-max">
          {families.map((f) => {
            const active = f.id === selection.familyId;
            const alias = findMunicipalAlias(f.id);
            return (
              <li key={f.id}>
                <button
                  type="button"
                  onClick={() =>
                    onSelect({ familyId: active ? null : f.id, templateId: null })
                  }
                  aria-pressed={active}
                  className={[
                    "px-2 py-1 border text-[11px] font-mono transition-colors whitespace-nowrap",
                    active
                      ? "border-accent text-accent bg-white"
                      : "border-rule text-ink-soft bg-white hover:border-accent/60",
                  ].join(" ")}
                >
                  {alias?.gcc_urban_name ?? f.bdii_label}
                  <span className="ms-1 text-ink-mute">· {f.templates.length}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Family cards grid */}
      <ul className="grid gap-3 p-4 md:grid-cols-2 xl:grid-cols-3">
        {families.map((f) => {
          const active = f.id === selection.familyId;
          const alias = findMunicipalAlias(f.id);
          const primaryLabel = alias?.gcc_urban_name ?? f.bdii_label;
          const referenceLabel = alias?.reference_inspiration ?? f.source_reference_label;
          const layerChips = alias?.decision_layer_mapping ?? [];
          const purpose = PURPOSE_SENTENCES[f.id];
          return (
            <li key={f.id}>
              <button
                type="button"
                onClick={() =>
                  onSelect({ familyId: active ? null : f.id, templateId: null })
                }
                aria-pressed={active}
                className={[
                  "w-full h-full text-start p-3 border bg-paper transition-colors",
                  active
                    ? "border-accent ring-1 ring-accent/40"
                    : "border-rule hover:border-accent/60",
                ].join(" ")}
              >
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-[10px] uppercase tracking-wider text-ink-mute font-mono">
                    {f.id}
                  </p>
                  <span
                    className={[
                      "px-1.5 py-0.5 border text-[10px] font-mono",
                      STATUS_CHIP[f.status],
                    ].join(" ")}
                  >
                    {WORKFLOW_STATUS_LABEL[f.status]}
                  </span>
                </div>
                {/* GCC Urban / municipal name · primary */}
                <p className="mt-1 font-serif text-base text-ink leading-tight">
                  {primaryLabel}
                </p>
                {/* Reference pattern · secondary */}
                <p className="mt-1 text-[10px] text-ink-mute font-mono">
                  Reference pattern: {referenceLabel} · {f.templates.length} templates
                </p>
                <p className="mt-1 text-[10px] text-ink-mute font-mono">
                  layer: {f.platform_layer}
                </p>
                {/* Decision layer mapping chips */}
                {layerChips.length > 0 && (
                  <ul className="mt-2 flex flex-wrap gap-1">
                    {layerChips.map((c) => (
                      <li
                        key={c}
                        className="px-1.5 py-0.5 border border-rule text-[10px] font-mono text-ink-mute bg-white"
                      >
                        {c}
                      </li>
                    ))}
                  </ul>
                )}
                {/* Optional decision-purpose sentence */}
                {purpose && (
                  <p className="mt-2 text-[11px] text-ink-soft leading-snug">
                    {purpose}
                  </p>
                )}
                <p className="mt-2 text-[11px] text-ink-soft leading-snug line-clamp-3">
                  {f.governance_posture}
                </p>
                <p className="mt-2 text-[10px] text-ink-mute font-mono">
                  connects: {f.connects_to.join(" · ")}
                </p>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Selected family detail */}
      {selectedFamily && (
        <SelectedFamilyDetail
          family={selectedFamily}
          selectedTemplateId={selection.templateId}
          onTemplate={(tid) =>
            onSelect({ familyId: selectedFamily.id, templateId: tid })
          }
        />
      )}

      {/* Selected template detail (echo / quick-reference) */}
      {selectedTemplate && selectedFamily && (
        <SelectedTemplateDetail
          family={selectedFamily}
          template={selectedTemplate}
        />
      )}

      <p className="px-4 py-2 border-t border-rule text-[11px] text-ink-mute font-mono">
        Allowed CTAs: {ALLOWED_WORKFLOW_CTAS.join(" · ")} · forbidden: run / execute / deploy / predict / optimize automatically / production-ready
      </p>
    </section>
  );
}

function SelectedFamilyDetail({
  family,
  selectedTemplateId,
  onTemplate,
}: {
  family: WorkflowFamily;
  selectedTemplateId: string | null;
  onTemplate: (tid: string | null) => void;
}) {
  const alias = findMunicipalAlias(family.id);
  const primaryLabel = alias?.gcc_urban_name ?? family.bdii_label;
  const referenceLabel = alias?.reference_inspiration ?? family.source_reference_label;
  const layerChips = alias?.decision_layer_mapping ?? [];
  return (
    <section className="border-t border-rule bg-paper">
      <header className="px-4 py-3 border-b border-rule">
        <p className="text-[10px] uppercase tracking-wider text-ink-mute font-mono">
          Family detail · {family.id}
        </p>
        <h3 className="mt-1 font-serif text-base text-ink">{primaryLabel}</h3>
        <p className="mt-1 text-[11px] text-ink-mute font-mono">
          Reference pattern: {referenceLabel} · platform layer: {family.platform_layer}
        </p>
        {layerChips.length > 0 && (
          <ul className="mt-2 flex flex-wrap gap-1">
            {layerChips.map((c) => (
              <li
                key={c}
                className="px-1.5 py-0.5 border border-rule text-[10px] font-mono text-ink-mute bg-white"
              >
                {c}
              </li>
            ))}
          </ul>
        )}
      </header>
      <div className="px-4 py-3 grid gap-3 md:grid-cols-2">
        <Block label="Description">{family.description}</Block>
        <Block label="Buyer relevance">{family.buyer_relevance}</Block>
        <Block label="Governance posture">{family.governance_posture}</Block>
        <Block label="Connects to">{family.connects_to.join(" · ")}</Block>
      </div>
      <div className="px-4 pb-4">
        <p className="text-[10px] uppercase tracking-wider text-ink-mute font-mono">
          Templates ({family.templates.length})
        </p>
        <ul className="mt-2 grid gap-2 md:grid-cols-2 xl:grid-cols-3">
          {family.templates.map((t) => {
            const active = t.id === selectedTemplateId;
            return (
              <li key={t.id}>
                <button
                  type="button"
                  onClick={() => onTemplate(active ? null : t.id)}
                  aria-pressed={active}
                  className={[
                    "w-full h-full text-start p-3 border bg-white transition-colors",
                    active ? "border-accent ring-1 ring-accent/40" : "border-rule hover:border-accent/60",
                  ].join(" ")}
                >
                  <p className="text-[10px] uppercase tracking-wider text-ink-mute font-mono">
                    {t.id}
                  </p>
                  <p className="mt-1 font-serif text-sm text-ink leading-tight">{t.title}</p>
                  <p className="mt-1 text-[11px] text-ink-mute leading-snug line-clamp-3">
                    {t.description}
                  </p>
                  <p className="mt-2 text-[10px] text-ink-mute font-mono">
                    surface: {t.recommended_surface}
                  </p>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function SelectedTemplateDetail({
  family,
  template,
}: {
  family: WorkflowFamily;
  template: WorkflowTemplate;
}) {
  return (
    <section className="border-t border-rule bg-white">
      <header className="px-4 py-3 border-b border-rule">
        <p className="text-[10px] uppercase tracking-wider text-ink-mute font-mono">
          Template detail · {template.id} · {family.id}
        </p>
        <h3 className="mt-1 font-serif text-base text-ink">{template.title}</h3>
        <p className="mt-1 text-[11px] text-ink-soft leading-snug">
          {template.description}
        </p>
      </header>
      <div className="grid gap-4 p-4 md:grid-cols-2">
        <ChipList label="Required inputs" items={template.required_inputs} />
        <ChipList label="Candidate outputs" items={template.candidate_outputs} />
        <ChipList label="Linked BDII objects" items={template.linked_bdii_objects} />
        <ChipList
          label="Governance limitations"
          items={template.governance_limitations}
          tone="muted"
        />
      </div>
      <div className="border-t border-rule px-4 py-3 grid gap-2 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-ink-mute font-mono">
            Next human action
          </p>
          <p className="mt-1 text-sm text-ink">{template.next_human_action}</p>
          <p className="mt-1 text-[10px] text-ink-mute font-mono">
            recommended surface: {template.recommended_surface}
          </p>
        </div>
        <ul className="flex flex-wrap gap-1 justify-end">
          {ALLOWED_WORKFLOW_CTAS.map((cta) => (
            <li key={cta}>
              <button
                type="button"
                disabled
                aria-disabled="true"
                title="P0 surfaces are configuration-only; the reviewer brief workflow is a future gate"
                className="px-2 py-1 border border-rule text-[11px] font-mono text-ink-mute bg-paper cursor-not-allowed"
              >
                {cta}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wider text-ink-mute font-mono">
        {label}
      </p>
      <p className="mt-1 text-[12px] text-ink-soft leading-snug">{children}</p>
    </div>
  );
}

function ChipList({
  label,
  items,
  tone = "default",
}: {
  label: string;
  items: string[];
  tone?: "default" | "muted";
}) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wider text-ink-mute font-mono">
        {label}
      </p>
      <ul className="mt-1 space-y-1">
        {items.map((it) => (
          <li
            key={it}
            className={[
              "text-[11px] leading-snug border-s ps-2",
              tone === "muted"
                ? "border-amber-muted text-ink-mute"
                : "border-rule text-ink-soft",
            ].join(" ")}
          >
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}
