"use client";

import { MODES, MC_EXAMPLES, LAYER_CARDS, NHA_CARDS, SOURCE_FAMILY_DETAILS, type ModeId } from "@/lib/v2/overview/data";
import { WORKFLOW_FAMILIES } from "@/lib/v2/overview/workflowConfig";
import { findSourceLayerById, findZoneById, findZoneOperatingMetadata } from "@/lib/v2/overview/riyadhMapConfig";
import type { EngineFactor, WorkedExample } from "@/lib/v2/overview/decisionFormulaEngineConfig";

interface Props {
  mode: ModeId;
  selectedSource: string | null;
  selectedZone: string | null;
  selectedFormula: string | null;
  selectedBand: string | null;
  selectedLayer: string | null;
  selectedWorkflowFamily?: string | null;
  selectedWorkflowTemplate?: string | null;
  selectedMapZoneId?: string | null;
  selectedMapSourceLayerId?: string | null;
  // IR-42A-R3 — platform-level Decision Formula Engine selection
  selectedDecisionFactor?: EngineFactor | null;
  selectedWorkedExample?: WorkedExample | null;
}

export function RightExplanationPanel(props: Props) {
  const { mode, selectedFormula, selectedLayer, selectedSource } = props;
  const modeInfo = MODES.find((m) => m.mode_id === mode);
  const formula = selectedFormula
    ? MC_EXAMPLES.find((f) => f.formula_id === selectedFormula)
    : null;
  const layer = selectedLayer
    ? LAYER_CARDS.find((l) => l.layer_id === selectedLayer)
    : null;
  const source = selectedSource
    ? SOURCE_FAMILY_DETAILS.find((s) => s.source_family === selectedSource)
    : null;
  const nha = selectedLayer
    ? NHA_CARDS.find((c) => c.layer_id === selectedLayer)
    : null;
  const wfFamily = props.selectedWorkflowFamily
    ? WORKFLOW_FAMILIES.find((f) => f.id === props.selectedWorkflowFamily)
    : null;
  const wfTemplate = wfFamily && props.selectedWorkflowTemplate
    ? wfFamily.templates.find((t) => t.id === props.selectedWorkflowTemplate)
    : null;
  const mapZone = findZoneById(props.selectedMapZoneId ?? null);
  const mapLayer = findSourceLayerById(props.selectedMapSourceLayerId ?? null);
  // IR-42B-V2 — also resolve extended ZoneOperatingMetadata for Riyadh
  // zones AND Kuwait baseline IDs (KW-007 · KW-SOUTH-SURRA). Same input
  // slot · same right-trace integration.
  const mapZoneOperating = findZoneOperatingMetadata(props.selectedMapZoneId ?? props.selectedZone ?? null);
  const decisionFactor = props.selectedDecisionFactor ?? null;
  const workedExample = props.selectedWorkedExample ?? null;

  return (
    <aside
      aria-labelledby="explanation-title"
      className="bg-white border border-rule sticky top-4"
    >
      <header className="px-4 py-3 border-b border-rule">
        <p className="text-[10px] uppercase tracking-wider text-ink-mute font-mono">
          Explanation · advisory
        </p>
        <h2 id="explanation-title" className="mt-1 font-serif text-base text-ink">
          {modeInfo?.mode_name || "Overview"}
        </h2>
      </header>
      <div className="p-4 space-y-4 text-sm">
        {modeInfo && (
          <Block label="Mode behavior">
            <p>{modeInfo.primary_panel_behavior}</p>
            <p className="mt-2 text-[11px] text-ink-mute font-mono">
              Map: {modeInfo.map_behavior}
            </p>
          </Block>
        )}
        {formula && (
          <Block label={`${formula.formula_id} · ${formula.formula_name}`}>
            <p className="text-[11px] text-ink-mute font-mono">
              scale: {formula.score_scale}
            </p>
            <p className="mt-1">{formula.calculation_method}</p>
            <p className="mt-2 text-[11px] text-ink-mute italic">
              {formula.limitation_note}
            </p>
            <p className="mt-2 text-[11px] text-ink-mute font-mono">
              not inferred: prediction · forecast · return-of-investment · investment recommendation · compliance authority · automated decision · ML · simulation · physics output
            </p>
          </Block>
        )}
        {layer && (
          <Block label={`Layer · ${layer.layer_name}`}>
            <p className="text-[11px] text-ink-mute font-mono">
              status: {layer.status} · gate: {layer.gate_required}
            </p>
            {layer.allowed_language && layer.allowed_language.length > 0 && (
              <p className="mt-1 text-[11px]">
                allowed: {layer.allowed_language.slice(0, 3).join(" · ")}
              </p>
            )}
            {layer.forbidden_claims && layer.forbidden_claims.length > 0 && (
              <p className="mt-1 text-[11px] text-ink-mute">
                forbidden: {layer.forbidden_claims.slice(0, 3).join(" · ")}
              </p>
            )}
          </Block>
        )}
        {source && (
          <Block label={`Source · ${source.source_family}`}>
            <p className="text-[11px] text-ink-mute font-mono">
              {source.token_count} tokens · routes to {source.layer}
            </p>
            {source.limitation_note && (
              <p className="mt-1 text-[11px] italic">{source.limitation_note}</p>
            )}
            {source.sample_tokens && source.sample_tokens.length > 0 && (
              <ul className="mt-2 space-y-1 text-[10px] text-ink-mute font-mono">
                {source.sample_tokens.slice(0, 3).map((t: { id: string; sha256: string }) => (
                  <li key={t.id}>· {t.id} · sha256 {t.sha256}…</li>
                ))}
              </ul>
            )}
          </Block>
        )}
        {nha && (
          <Block label="Next human action">
            <p className="text-sm">{nha.action}</p>
            <p className="mt-1 text-[11px] text-ink-mute font-mono">
              who: {nha.who_acts}
            </p>
            <p className="mt-1 text-[11px] text-ink-mute">
              unlocks: {nha.unlocks}
            </p>
          </Block>
        )}
        {wfFamily && (
          <Block label={`Workflow family · ${wfFamily.bdii_label}`}>
            <p className="text-[11px] text-ink-mute font-mono">
              {wfFamily.id} · ref: {wfFamily.source_reference_label} · {wfFamily.templates.length} templates
            </p>
            <p className="mt-1 text-[11px]">
              <span className="text-ink-mute">why this matters: </span>
              {wfFamily.buyer_relevance}
            </p>
            <p className="mt-1 text-[11px] text-ink-mute italic">
              {wfFamily.governance_posture}
            </p>
          </Block>
        )}
        {wfTemplate && wfFamily && (
          <Block label={`Template · ${wfTemplate.id}`}>
            <p className="text-sm text-ink">{wfTemplate.title}</p>
            <p className="mt-1 text-[10px] text-ink-mute font-mono">
              required evidence: {wfTemplate.required_inputs.slice(0, 3).join(" · ")}
            </p>
            <p className="mt-1 text-[10px] text-ink-mute font-mono">
              governance limitation: {wfTemplate.governance_limitations.slice(0, 2).join(" · ")}
            </p>
            <p className="mt-1 text-[11px]">
              <span className="text-ink-mute">next human action: </span>
              {wfTemplate.next_human_action}
            </p>
          </Block>
        )}
        {mapZone && (
          <Block label={`Map zone · ${mapZone.label}`}>
            <p className="text-[11px] text-ink-mute font-mono">
              role: {mapZone.role.replace(/_/g, " ")} · readiness: {mapZone.readinessPosture.replace(/_/g, " ")}
            </p>
            <p className="mt-1 text-[11px]">
              <span className="text-ink-mute">why it matters: </span>
              Conceptual {mapZone.role.replace(/_/g, " ")} framing · advisory only · candidate-only
            </p>
            <p className="mt-1 text-[11px]">
              <span className="text-ink-mute">evidence used: </span>
              {mapZone.sourceFamilies.slice(0, 3).join(" · ")}
              {mapZone.sourceFamilies.length > 3 ? " · …" : ""}
            </p>
            <p className="mt-1 text-[11px] text-ink-mute italic">
              {mapZone.limitationNote}
            </p>
            <p className="mt-1 text-[11px]">
              <span className="text-ink-mute">next human action: </span>
              {mapZone.nextHumanAction}
            </p>
          </Block>
        )}
        {mapZoneOperating && (
          <Block label={`Zone metadata · ${mapZoneOperating.zone_name}`}>
            <p className="text-[11px] text-ink-mute font-mono">
              {mapZoneOperating.zone_id} · {mapZoneOperating.jurisdiction} · {mapZoneOperating.classification === "active_pilot" ? "active pilot" : "baseline reference"}
            </p>
            <p className="mt-1 text-[11px]">
              <span className="text-ink-mute">readiness: </span>
              {mapZoneOperating.readiness_band}
            </p>
            <p className="mt-1 text-[11px]">
              <span className="text-ink-mute">confidence: </span>
              {mapZoneOperating.confidence_band}
            </p>
            <p className="mt-1 text-[10px] text-ink-mute font-mono leading-snug">
              source: {mapZoneOperating.source_family.slice(0, 3).join(" · ")}
              {mapZoneOperating.source_family.length > 3 ? " · …" : ""}
            </p>
            <p className="mt-1 text-[10px] text-ink-mute leading-snug">
              workflows: {mapZoneOperating.linked_workflows.slice(0, 2).join(" · ")}
              {mapZoneOperating.linked_workflows.length > 2 ? " · …" : ""}
            </p>
            <p className="mt-1 text-[11px] text-ink-mute italic leading-snug">
              {mapZoneOperating.governance_note}
            </p>
            <p className="mt-1 text-[11px]">
              <span className="text-ink-mute">next human action: </span>
              {mapZoneOperating.next_human_action}
            </p>
          </Block>
        )}
        {mapLayer && (
          <Block label={`Map source layer · ${mapLayer.label}`}>
            <p className="text-[11px] text-ink-mute font-mono">
              type: {mapLayer.type.replace(/_/g, " ")} · status: {mapLayer.status.replace(/_/g, " ")}
            </p>
            <p className="mt-1 text-[11px]">{mapLayer.evidenceRole}</p>
            <p className="mt-1 text-[11px] text-ink-mute">
              forbidden: {mapLayer.forbiddenUse.slice(0, 3).join(" · ")}
            </p>
            <p className="mt-1 text-[11px] text-ink-mute italic">
              {mapLayer.limitationNote}
            </p>
          </Block>
        )}
        {decisionFactor && (
          <Block label={`Decision factor · ${decisionFactor.uiLabel}`}>
            <p className="text-[11px] text-ink-mute font-mono">
              {decisionFactor.factor} · {decisionFactor.current_count.toLocaleString()} {decisionFactor.type}{decisionFactor.current_count === 1 ? "" : "s"} · status: {decisionFactor.current_status.replace(/_/g, " ")}
            </p>
            <p className="mt-1 text-[11px]">
              <span className="text-ink-mute">purpose: </span>
              {decisionFactor.shortPurpose}
            </p>
            <p className="mt-1 text-[10px] text-ink-mute font-mono leading-snug">
              source: {decisionFactor.source_config}
            </p>
            <p className="mt-1 text-[10px] text-ink-mute leading-snug">
              UI surfaces: {decisionFactor.uiSurfaces.slice(0, 3).join(" · ")}
              {decisionFactor.uiSurfaces.length > 3 ? " · …" : ""}
            </p>
            <p className="mt-1 text-[11px]">
              <span className="text-ink-mute">blocker logic: </span>
              {decisionFactor.blockerLogic}
            </p>
            <p className="mt-1 text-[11px]">
              <span className="text-ink-mute">next human action: </span>
              {decisionFactor.nextHumanAction}
            </p>
            <p className="mt-1 text-[10px] text-ink-mute italic">
              advisory only · candidate only · human review required
            </p>
          </Block>
        )}
        {workedExample && (
          <Block label={`Worked example · ${workedExample.name}`}>
            <p className="text-[11px] text-ink-mute font-mono">
              example {workedExample.example_id}
            </p>
            <p className="mt-1 text-[10px] text-ink-mute font-mono leading-snug">
              input chain: {workedExample.input_chain}
            </p>
            <p className="mt-1 text-[11px]">
              <span className="text-ink-mute">engine interpretation: </span>
              {workedExample.engine_interpretation}
            </p>
            <p className="mt-1 text-[10px] text-ink-mute font-mono leading-snug">
              UI surface: {workedExample.ui_surface}
            </p>
            <p className="mt-1 text-[11px] text-ink-mute italic">
              {workedExample.governance_limitation}
            </p>
            <p className="mt-1 text-[11px]">
              <span className="text-ink-mute">next human action: </span>
              {workedExample.next_human_action}
            </p>
          </Block>
        )}
        {!formula && !layer && !source && !nha && !wfFamily && !wfTemplate && !mapZone && !mapLayer && !mapZoneOperating && !decisionFactor && !workedExample && (
          <p className="text-[11px] text-ink-mute italic">
            Click a mode, formula, source family, readiness band, kernel layer, workflow family, workflow template, map zone, map source layer, decision-formula factor, or worked example to see its rule-chain trace and governance limitation here.
          </p>
        )}
      </div>
      <p className="px-4 py-2 border-t border-rule text-[10px] text-ink-mute font-mono">
        advisory · candidate · municipal review remains the sole producer of consequential conclusions
      </p>
    </aside>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wider text-ink-mute font-mono">
        {label}
      </p>
      <div className="mt-1 text-ink-soft">{children}</div>
    </div>
  );
}
