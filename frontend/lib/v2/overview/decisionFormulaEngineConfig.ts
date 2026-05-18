// IR-42A-R1-V2-REFERENCE-ARCHITECTURE-INTELLIGENCE-CONFIGURATION-REGISTRY
// Frontend-readable BDII Decision Formula & Relationship Engine config.
// Canonical source: udi-os-v2/config/intelligence_layers/decision_formula_relationship_engine.json
//
// BDII's governed equivalent of Power BI's DAX + relationships, for
// urban municipal intelligence. This file is a typed mirror of the
// JSON registry so UI components can render the equation, the
// Power-BI analogy, and the per-factor counts safely.

export const ENGINE_TAGLINE =
  "BDII's governed equivalent of Power BI's DAX + relationships, for urban municipal intelligence.";

export interface PowerBiAnalogyRow {
  pbi_concept: string;
  bdii_equivalent: string;
}

export const POWER_BI_ANALOGY: PowerBiAnalogyRow[] = [
  { pbi_concept: "Tables",               bdii_equivalent: "BDII Registries · Evidence Tokens · Source Families" },
  { pbi_concept: "Relationships",        bdii_equivalent: "BDII Relationship Graph (280 candidate edges)" },
  { pbi_concept: "DAX Measures",         bdii_equivalent: "BDII Mathematical Core (MC-A..MC-J) + Governance Rules + Workflow Status" },
  { pbi_concept: "Filters / Slicers",    bdii_equivalent: "BDII Source Layers · Zones · Buyers · Governance State" },
  { pbi_concept: "Visuals",              bdii_equivalent: "BDII Dynamic UI Surfaces (Map · Workflows · Evidence · Observatory · Apps · Developer · Governance)" },
  { pbi_concept: "Drill-through",        bdii_equivalent: "BDII Decision Trace (RightExplanationPanel + DecisionTraceContextCard + MapLocalTracePanel)" },
];

export interface EngineFactor {
  factor: string;
  // IR-42A-R2 — UI-rendering fields (additive · no semantic change)
  uiLabel: string;
  shortPurpose: string;
  source_config: string;
  uiSurfaces: string[];
  current_status: "active_candidate" | "foundation_ready" | "locked_future_gate";
  nextHumanAction: string;
  current_count: number;
  type: string;
  blocker_if_missing: string;
  blockerLogic: string;
}

export const ENGINE_EQUATION_FORM =
  "Decision Readiness = EvidenceTokens × RelationshipGraph × MathematicalCore × DataScienceReadiness × MacroMicroEconomic × GovernanceConstraints × WorkflowState × HumanReviewAction";

export const ENGINE_FACTORS: EngineFactor[] = [
  {
    factor: "EvidenceTokens",
    uiLabel: "Evidence Tokens",
    shortPurpose: "anchor every advisory claim to a reviewer-signed evidence row · per-token sha256 + provenance",
    source_config: "udi-os-v2/etl/gate3_ir39b_g3_controlled_entry/reviewed_evidence_tokens.json (71 rows)",
    uiSurfaces: ["Evidence Explorer", "Riyadh Evidence Map · metadata drawer", "Right Decision Trace · source block"],
    current_status: "active_candidate",
    nextHumanAction: "data_reviewer signs per-row source_row_reference upgrade",
    current_count: 71,
    type: "registry_row",
    blocker_if_missing: "INSUFFICIENT_EVIDENCE_BLOCKER",
    blockerLogic: "if 0 reviewed tokens for a zone/source/scope → output is INSUFFICIENT_EVIDENCE · reviewer must add evidence",
  },
  {
    factor: "RelationshipGraph",
    uiLabel: "Relationship Graph",
    shortPurpose: "typed edges across evidence · tokens · sources · zones · formulas · workflows · 280 candidate edges today",
    source_config: "udi-os-v2/etl/gate3_ir39b_g3_controlled_entry/relationship_edges_candidate.json (280 edges · 6 edge types)",
    uiSurfaces: ["Evidence Lineage Panel", "Developer · Ontology · linked_bdii_objects[]", "Decision Kernel · Layer Status"],
    current_status: "active_candidate",
    nextHumanAction: "data_reviewer + governance_reviewer ratify per-edge promotion",
    current_count: 280,
    type: "edge_set",
    blocker_if_missing: "MISSING_LINK_BLOCKER",
    blockerLogic: "if no edge supports the candidate composition → output is REVIEWER-REQUIRED · reviewer must declare the link",
  },
  {
    factor: "MathematicalCore",
    uiLabel: "Mathematical Core",
    shortPurpose: "10 rule-based formulas MC-A..MC-J · 710 candidate score rows · 5 allowed readiness bands",
    source_config: "udi-os-v2/runtime/mathematical_core/ir39b_mc_run/mathematical_scores_candidate.json (710 rows)",
    uiSurfaces: ["MathematicalIntelligencePanel", "ReadinessBandsPanel", "Riyadh map zone tint", "Right Decision Trace · formula block"],
    current_status: "active_candidate",
    nextHumanAction: "governance_reviewer ratifies any threshold change (constitutional amendment)",
    current_count: 10,
    type: "formula",
    blocker_if_missing: "MC_NOT_RUN_BLOCKER",
    blockerLogic: "if MC has not been run for the scope → output is CANDIDATE-ONLY · no readiness band emitted",
  },
  {
    factor: "DataScienceReadiness",
    uiLabel: "Data Science Readiness",
    shortPurpose: "11 descriptive dimensions (metadata completeness · source reliability · sufficiency · spatial aggregation · …) · foundation_ready · NOT activated",
    source_config: "udi-os-v2/config/intelligence_layers/data_science_methodology_lifecycle.json (DS-01..DS-11)",
    uiSurfaces: ["DataObservatorySection", "DataSizeReadinessStrip", "Developer · Ontology · Architecture Intelligence Matrix"],
    current_status: "foundation_ready",
    nextHumanAction: "data_reviewer + governance_reviewer authorize per-dimension activation",
    current_count: 11,
    type: "dimension",
    blocker_if_missing: "DS_FOUNDATION_NOT_PASSED_BLOCKER",
    blockerLogic: "if DS foundation has not passed for the scope → output is FUTURE-GATED · descriptive methods remain locked",
  },
  {
    factor: "MacroMicroEconomic",
    uiLabel: "Macro · Micro · Economic Context",
    shortPurpose: "domain routing across 3 layers · Macro (GASTAT · Saudi Open Data) · Micro (Balady · Riyadh zones) · Economic (REGA)",
    source_config: "udi-os-v2/config/intelligence_layers/macro_micro_economic_mapping.json",
    uiSurfaces: ["Riyadh Evidence Map · per-zone tint", "GCC Data Observatory · 8 categories", "Map source layer rail"],
    current_status: "active_candidate",
    nextHumanAction: "GIS_reviewer signs per-zone Balady tag · data_reviewer signs per-value GASTAT reference · business_reviewer interviews before REGA framing",
    current_count: 3,
    type: "layer",
    blocker_if_missing: "DOMAIN_CONTEXT_MISSING_BLOCKER",
    blockerLogic: "if no domain context for the scope → output is BLOCKED · reviewer must route the scope into Macro/Micro/Economic",
  },
  {
    factor: "GovernanceConstraints",
    uiLabel: "Governance Constraints",
    shortPurpose: "constitutional posture · 11 always-visible advisory chips · 6 forbidden CTAs · per-source forbidden-use chips · widening any limitation requires amendment",
    source_config: "udi-os-v2/authorizations/gate5_p0_ui/p0_governance_display_contract.md + tools/banned_claims.yml",
    uiSurfaces: ["TopHeader 5 pills", "GovernanceTrustRail", "Footer caveat strip", "every metadata drawer", "every workflow CTA bar"],
    current_status: "active_candidate",
    nextHumanAction: "Bader Alabddan + governance_reviewer dual-signature for any constitutional amendment",
    current_count: 11,
    type: "constitutional",
    blocker_if_missing: "GOVERNANCE_NOT_RATIFIED_BLOCKER",
    blockerLogic: "if a governance constraint is unratified for the scope → output is BLOCKED BY GOVERNANCE · cannot reach UI",
  },
  {
    factor: "WorkflowState",
    uiLabel: "Workflow State",
    shortPurpose: "60 candidate workflow templates across 14 families · configuration only · no execution",
    source_config: "frontend/lib/v2/overview/workflowConfig.ts (60 templates) + udi-os-v2/config/reference_patterns/workflow_reference_taxonomy.json",
    uiSurfaces: ["WorkflowCanvas (17 nodes)", "WorkflowConfigurationLayer · per-family detail · per-template detail"],
    current_status: "active_candidate",
    nextHumanAction: "data_reviewer + governance_reviewer ratify per-template promotion · no execution today",
    current_count: 60,
    type: "template",
    blocker_if_missing: "WORKFLOW_NOT_CONFIGURED_BLOCKER",
    blockerLogic: "if no workflow template covers the scope → output is REVIEWER-REQUIRED · reviewer must declare or future-gate the workflow",
  },
  {
    factor: "HumanReviewAction",
    uiLabel: "Human Review Action",
    shortPurpose: "17 next-human-action cards (one per kernel layer) · municipal review is the sole producer of consequential conclusions",
    source_config: "udi-os-v2/architecture_runtime/ir39b_decision_kernel_foundation/next_human_action_contract.json",
    uiSurfaces: ["NextHumanActionPanel", "Right Decision Trace · next human action block", "map-local trace · next-action line"],
    current_status: "active_candidate",
    nextHumanAction: "(this factor IS the aggregate of all next human actions across the platform)",
    current_count: 17,
    type: "next_human_action",
    blocker_if_missing: "NO_HUMAN_ACTION_BLOCKER",
    blockerLogic: "if no next-human-action card exists for the scope → output is REVIEWER-REQUIRED · advisory must name a who and a how",
  },
];

// IR-42A-R2 — 6 brief-required worked examples surfacing the Decision Formula Engine
export interface WorkedExample {
  example_id: "A" | "B" | "C" | "D" | "E" | "F";
  name: string;
  input_chain: string;
  engine_interpretation: string;
  ui_surface: string;
  governance_limitation: string;
  next_human_action: string;
}

export const WORKED_EXAMPLES: WorkedExample[] = [
  {
    example_id: "A",
    name: "REGA economic signal",
    input_chain: "REGA EvidenceToken → SourceFamily(REGA) → MC-D candidate_high → Economic Intelligence layer → BuyerPack candidate (Investor lane)",
    engine_interpretation: "buyer package eligibility · candidate",
    ui_surface: "Applications Gallery · Buyer Narrative Layer (future) · Right Decision Trace source block",
    governance_limitation: "no investment recommendation · no price prediction · no guaranteed return",
    next_human_action: "business_reviewer interview before any pilot framing",
  },
  {
    example_id: "B",
    name: "USGS visual evidence",
    input_chain: "USGS EvidenceAsset → BeforeAfterPair → SourceFamily(USGS) → Map Surface zone tint",
    engine_interpretation: "advisory zone reference card · visual reference frame only",
    ui_surface: "Riyadh Evidence Map · BeforeAfterEvidenceTiles · EvidenceMetadataDrawer",
    governance_limitation: "no automated change detection · no NDVI · no spectral-index · no surveillance",
    next_human_action: "GIS_reviewer ratifies conceptual zone extent · no official boundary",
  },
  {
    example_id: "C",
    name: "GASTAT macro context",
    input_chain: "GASTAT EvidenceToken → SourceFamily(GASTAT) → Macro Intelligence layer → readiness trace",
    engine_interpretation: "advisory macro context card · national statistic reference",
    ui_surface: "GCC Data Observatory · GCC Region workspace · Right Decision Trace source block",
    governance_limitation: "no forecast · no prediction · no per-zone derivation without reviewer signoff",
    next_human_action: "data_reviewer signs per-statistic value reference",
  },
  {
    example_id: "D",
    name: "Balady municipal reference",
    input_chain: "Balady EvidenceToken → SourceFamily(Balady) → Micro Intelligence layer → Zone readiness posture",
    engine_interpretation: "advisory zone readiness band · municipal reference context",
    ui_surface: "Riyadh Evidence Map · per-zone tint · ReadinessBandsPanel",
    governance_limitation: "no official municipal boundary · no enforcement · no automated inspection",
    next_human_action: "GIS_reviewer ratifies any Balady zone tag",
  },
  {
    example_id: "E",
    name: "Telco workflow",
    input_chain: "WF-TELCO WorkflowTemplate → Infrastructure & Connectivity Intelligence (Micro layer) → privacy gate (aggregate-only)",
    engine_interpretation: "advisory infrastructure planning reference",
    ui_surface: "Workflow Studio · WorkflowConfigurationLayer (WF-TELCO family detail)",
    governance_limitation: "no surveillance · no individual identification · no telecom operational decision",
    next_human_action: "infrastructure reviewer interview before any pilot framing",
  },
  {
    example_id: "F",
    name: "Insurance workflow",
    input_chain: "WF-INS WorkflowTemplate → Insurance & Real Estate Risk Intelligence (Economic layer + Risk context)",
    engine_interpretation: "advisory risk-reference card · per asset",
    ui_surface: "Workflow Studio · WorkflowConfigurationLayer (WF-INS family detail)",
    governance_limitation: "no underwriting decision · no pricing decision · no automated claim decision",
    next_human_action: "insurance reviewer interview · Bader Alabddan ratifies before pilot framing",
  },
];

// IR-42A-R2 — Allowed CTA labels for the Decision Formula Engine panel
export const ENGINE_ALLOWED_CTAS = [
  "Inspect formula factor",
  "View decision trace",
  "Review required evidence",
  "Prepare reviewer brief",
  "Mark as future-gated",
  "Open governance note",
] as const;

// Forbidden CTA labels — declared for engineering visibility only · NEVER rendered as JSX
export const ENGINE_FORBIDDEN_CTAS = [
  "run model",
  "execute model",
  "deploy model",
  "predict",
  "optimize automatically",
  "production-ready",
  "approve decision",
] as const;

// IR-42A-R2 — caveat strip text · always rendered above the factor grid
export const ENGINE_CAVEAT_STRIP = [
  "advisory only",
  "candidate only",
  "not a prediction",
  "not a recommendation",
  "not an automated decision",
  "human review required",
] as const;

export const ENGINE_OUTPUTS = [
  "readiness interpretation (band per zone · advisory)",
  "decision trace (per click)",
  "source limitation (per source family)",
  "next human action (per layer · per token · per workflow)",
  "buyer package eligibility (candidate · future_gate)",
  "workflow eligibility (candidate_config · future_gated)",
] as const;

export const ENGINE_CONSTRAINTS = [
  "advisory · candidate only",
  "no automated decision",
  "no production interpretation",
  "no ML-derived composition",
] as const;
