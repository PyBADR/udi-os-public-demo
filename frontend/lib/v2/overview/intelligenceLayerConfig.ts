// IR-42A-R1-V2-REFERENCE-ARCHITECTURE-INTELLIGENCE-CONFIGURATION-REGISTRY
// Frontend-readable intelligence layer config. Canonical source:
// udi-os-v2/config/intelligence_layers/intelligence_layer_registry.json.
//
// 14 intelligence layers. Configuration only. No vendor branding.
// No ML / DB / API / simulation / physics activation.

export type LayerKey =
  | "evidence"
  | "data_architecture"
  | "data_warehouse_future_gate"
  | "data_science"
  | "mathematical_core"
  | "macro"
  | "micro"
  | "economic"
  | "relationship_graph"
  | "decision_formula_relationship_engine"
  | "dynamic_ui"
  | "mlops_future_gate"
  | "simulation_future_gate"
  | "enterprise_ui"
  // IR-42B-R1 supplemental layers (audit gap closure)
  | "workflow_intelligence"
  | "buyer_pilot_applications"
  | "governance_assurance";

export type LayerStatus =
  | "active_candidate"
  | "foundation_ready"
  | "locked_future_gate";

export interface IntelligenceLayer {
  layer_id: string;
  key: LayerKey;
  name: string;
  status: LayerStatus;
  purpose: string;
}

export const INTELLIGENCE_LAYERS: IntelligenceLayer[] = [
  { layer_id: "L01", key: "evidence",                             name: "Evidence Infrastructure",                status: "active_candidate",    purpose: "raw evidence · source families · metadata · visual assets · before/after · source row references" },
  { layer_id: "L02", key: "data_architecture",                    name: "Data Architecture",                      status: "active_candidate",    purpose: "registries · lineage · missing-input register · structured queryable objects" },
  { layer_id: "L03", key: "data_warehouse_future_gate",           name: "Data Warehouse Future Gate",             status: "locked_future_gate",  purpose: "PostgreSQL · PostGIS · BigQuery · Snowflake — none active today" },
  { layer_id: "L04", key: "data_science",                         name: "Data Science Intelligence",              status: "foundation_ready",    purpose: "rule-based descriptive readiness · NO ML active" },
  { layer_id: "L05", key: "mathematical_core",                    name: "Mathematical Core Intelligence",         status: "active_candidate",    purpose: "10 candidate formulas · 710 candidate scores · 5 allowed bands" },
  { layer_id: "L06", key: "macro",                                name: "Macro Intelligence",                     status: "active_candidate",    purpose: "national · regional context (GASTAT · Saudi Open Data)" },
  { layer_id: "L07", key: "micro",                                name: "Micro Intelligence",                     status: "active_candidate",    purpose: "municipal · local zone context (Balady · Riyadh zones)" },
  { layer_id: "L08", key: "economic",                             name: "Economic Intelligence",                  status: "active_candidate",    purpose: "real-estate · market · insurance · infrastructure signals (REGA)" },
  { layer_id: "L09", key: "relationship_graph",                   name: "Relationship Graph",                     status: "active_candidate",    purpose: "280 candidate edges across evidence · tokens · sources · zones · formulas · workflows" },
  { layer_id: "L10", key: "decision_formula_relationship_engine", name: "Decision Formula & Relationship Engine", status: "active_candidate",    purpose: "BDII DAX-equivalent · composes evidence × graph × MC × DS × Macro/Micro/Economic × Governance × Workflow × Human Review" },
  { layer_id: "L11", key: "dynamic_ui",                           name: "Dynamic UI · BI Urban",                  status: "active_candidate",    purpose: "state-machine UI · 9 workspaces · config-driven surfaces · no live data binding" },
  { layer_id: "L12", key: "mlops_future_gate",                    name: "MLOps Future Gate",                      status: "locked_future_gate",  purpose: "feature store · training · model registry · monitoring · rollback — none active today" },
  { layer_id: "L13", key: "simulation_future_gate",               name: "Simulation · Physics Future Gate",       status: "locked_future_gate",  purpose: "time series · assumption ledger · calibration · scenario boundary — none active today" },
  { layer_id: "L14", key: "enterprise_ui",                        name: "Enterprise UI Architecture",             status: "active_candidate",    purpose: "13 enterprise modules · platform shell · workspaces · governance console" },
  // IR-42B-R1 supplemental layers — promoted from sub-roles of L14 / L05 / L11 into first-class layers per the GCC4 OS audit
  { layer_id: "L15", key: "workflow_intelligence",                name: "Workflow Intelligence",                  status: "active_candidate",    purpose: "60 candidate templates across 14 families · configuration only" },
  { layer_id: "L16", key: "buyer_pilot_applications",             name: "Buyer · Pilot · Applications",           status: "active_candidate",    purpose: "8 candidate application cards + 9 candidate pilot package framings" },
  { layer_id: "L17", key: "governance_assurance",                 name: "Governance · Assurance",                 status: "active_candidate",    purpose: "always-visible advisory chips + locked-engines + forbidden-claims toggle + amendment audit ledger (future)" },
];

// IR-42B-R1 — GCC4 Decision Intelligence OS 6-pillar contract surface.
// Compact mirror of udi-os-v2/config/intelligence_layers/gcc4_decision_intelligence_os_contract.json
// for UI rendering inside the Developer Hub matrix card.
export interface GCC4_OS_Pillar {
  pillar_id: string;
  name: string;
  ui_modules: string[];
  locked_capabilities: string[];
}

export const GCC4_OS_PILLARS: GCC4_OS_Pillar[] = [
  { pillar_id: "OS-P01", name: "Evidence OS",         ui_modules: ["Riyadh Evidence Map", "Evidence Explorer", "Data Observatory", "Governance Console"],          locked_capabilities: ["automated change detection", "NDVI", "spectral-index", "surveillance", "individual identification"] },
  { pillar_id: "OS-P02", name: "Workflow OS",         ui_modules: ["Workflow Studio", "Developer · Ontology Hub"],                                                 locked_capabilities: ["execute model", "run model", "deploy model", "predict", "optimize automatically", "production-ready"] },
  { pillar_id: "OS-P03", name: "Map Intelligence OS", ui_modules: ["Riyadh Evidence Map", "Overview Home (hero promotion)", "Evidence Explorer"],                  locked_capabilities: ["official municipal boundary", "automated change detection", "NDVI", "spectral-index", "surveillance", "enforcement"] },
  { pillar_id: "OS-P04", name: "Decision Formula OS", ui_modules: ["Developer · Ontology Hub", "Decision Trace (RightExplanationPanel)", "MapLocalTracePanel"],   locked_capabilities: ["ML-derived score composition", "automated decision", "production interpretation"] },
  { pillar_id: "OS-P05", name: "Governance OS",       ui_modules: ["Governance Console", "TopHeader (5 pills)", "Footer caveat strip", "GovernanceTrustRail"],     locked_capabilities: ["softening of advisory-only notice", "removal of locked-engines list", "unilateral threshold change"] },
  { pillar_id: "OS-P06", name: "Buyer · Pilot OS",    ui_modules: ["Applications · Solution Gallery", "Pilot Pack (future)", "Buyer Narrative Layer (future)"],   locked_capabilities: ["confirmed buyer pain without recorded interview", "pilot outcome guarantee", "ROI claim", "investment recommendation", "price prediction"] },
];

export const LAYER_CONSTRAINTS_GLOBAL = [
  "advisory only · candidate only",
  "no ML · no DL · no Physics · no Simulation · no MLOps activation",
  "no DB · no SQL · no PostgreSQL · no PostGIS",
  "no automated decision · no enforcement",
  "no surveillance · no individual identification",
  "no prediction · no forecast · no ROI · no investment recommendation",
  "no production claim · no official integration claim",
  "no vendor branding · no vendor asset · no affiliation",
];
