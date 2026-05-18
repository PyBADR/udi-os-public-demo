// IR-41A-V2-RIYADH-EVIDENCE-MAP-BINDING — Static configuration for
// the Riyadh Evidence Intelligence Map surface. Pure UI configuration.
// No fetch, no API, no DB, no GIS runtime, no spectral computation,
// no change detection, no automated decision. Local USGS placeholder
// PNGs already present under frontend/public/v2/evidence/riyadh/ are
// bound here as visual reference frames only.

export type RoleKind =
  | "central_municipal_business"
  | "growth_corridor"
  | "infrastructure_corridor"
  | "industrial_logistic_corridor"
  | "residential_growth_corridor";

export type EvidencePosture =
  | "evidence_present"
  | "evidence_partial"
  | "evidence_pending_review";

export type ReadinessPosture =
  | "candidate_ready_for_reference"
  | "review_pending"
  | "governance_limited"
  | "insufficient_evidence"
  | "blocked_from_decision_use";

export type SourceLayerStatus =
  | "active_candidate_layer"
  | "reference_only"
  | "future_gated";

export type SourceLayerType =
  | "visual_reference"
  | "municipal_reference"
  | "macro_statistical_context"
  | "public_open_data_context"
  | "economic_market_signal"
  | "governance_constraint_layer";

export interface RiyadhZone {
  id: string;            // "core" | "north" | "south" | "east" | "west"
  label: string;
  arabicLabel: string;
  role: RoleKind;
  evidencePosture: EvidencePosture;
  readinessPosture: ReadinessPosture;
  sourceFamilies: string[];      // names from RIYADH_SOURCE_LAYERS
  missingEvidence: string[];
  nextHumanAction: string;
  limitationNote: string;
  // Visual layout cell on a 3×3 grid for the conceptual map
  gridRow: 1 | 2 | 3;
  gridCol: 1 | 2 | 3;
  // Bound USGS placeholder asset paths (visual reference only)
  beforeAssetUrl: string;
  afterAssetUrl: string;
  contextAssetUrl?: string;
}

export interface RiyadhSourceLayer {
  id: string;
  label: string;
  type: SourceLayerType;
  status: SourceLayerStatus;
  allowedUse: string[];
  forbiddenUse: string[];
  evidenceRole: string;
  limitationNote: string;
}

export type EvidenceTileSlot =
  | "before"
  | "after"
  | "metadata"
  | "governance_note"
  | "reviewer_status";

export interface RiyadhEvidenceTile {
  slot: EvidenceTileSlot;
  label: string;
  helperText: string;
  caveat: string;
  // If `bindable === true`, the tile consumes the per-zone asset URL from
  // the selected zone (Before / After slots). Otherwise the tile renders
  // static configuration text only.
  bindable: boolean;
}

export interface RiyadhMetadataField {
  key: string;
  label: string;
  example: string;
  caveat: string;
}

export interface MapStatusLegendEntry {
  key: ReadinessPosture | EvidencePosture | SourceLayerStatus;
  label: string;
  swatchClass: string;   // tailwind class for the color swatch
  description: string;
}

// -----------------------------------------------------------------
// IR-42B-V2 — Map Operating Hierarchy + Zone Metadata
// -----------------------------------------------------------------
export type MapScopeId = "gcc" | "saudi" | "riyadh" | "kuwait_baseline";

export interface MapScope {
  id: MapScopeId;
  label: string;
  short_label: string;
  posture: "active_pilot" | "active_focus" | "regional_context" | "baseline_reference";
  description: string;
  status_note: string;
}

export const MAP_SCOPES: MapScope[] = [
  {
    id: "gcc",
    label: "GCC Region",
    short_label: "GCC",
    posture: "regional_context",
    description: "Regional expansion context · Wave 1 (SA · KW · UAE) product · Wave 2 (BH · QA · OM) commercial-mapping-only",
    status_note: "regional context only · advisory only · no live regional integration",
  },
  {
    id: "saudi",
    label: "Saudi Focus",
    short_label: "Saudi",
    posture: "active_focus",
    description: "Saudi Arabia · macro context layer surrounding the active Riyadh pilot surface",
    status_note: "macro context · advisory · candidate · reviewer-anchored",
  },
  {
    id: "riyadh",
    label: "Riyadh Zones",
    short_label: "Riyadh",
    posture: "active_pilot",
    description: "Active Riyadh pilot surface · 5 conceptual zones (Core · North · South · East · West)",
    status_note: "active pilot · conceptual zones only · municipal review is the sole producer of consequential conclusions",
  },
  {
    id: "kuwait_baseline",
    label: "Kuwait Baseline",
    short_label: "Kuwait",
    posture: "baseline_reference",
    description: "Kuwait baseline reference case · preserved as a comparison anchor · not the main story",
    status_note: "baseline reference only · not active pilot · advisory only",
  },
];

// Extended per-zone metadata model per IR-42B-V2 brief. Additive to the
// existing RiyadhZone shape; consumed by the new RiyadhZoneMetadataPanel
// without breaking the existing Map Surface bindings.
export interface ZoneOperatingMetadata {
  zone_id: string;            // upper-case form e.g. "RIY-NORTH"
  zone_name: string;
  jurisdiction: string;
  zone_type: "conceptual" | "baseline_reference";
  source_family: string[];
  evidence_status: "candidate" | "candidate_partial" | "review_pending";
  readiness_band: string;     // formatted e.g. "B — Needs More Evidence"
  confidence_band: string;    // formatted e.g. "reference only / medium"
  governance_note: string;
  linked_workflows: string[];
  next_human_action: string;
  buyer_relevance: string[];
  classification: "active_pilot" | "baseline_reference";
}

export const RIYADH_ZONE_OPERATING_METADATA: ZoneOperatingMetadata[] = [
  {
    zone_id: "RIY-CORE",
    zone_name: "Riyadh Core",
    jurisdiction: "Saudi Arabia / Riyadh",
    zone_type: "conceptual",
    source_family: ["USGS Reference", "Balady Municipal Reference", "GASTAT Macro Context", "Saudi Open Data placeholder", "REGA Real Estate Signal"],
    evidence_status: "candidate",
    readiness_band: "A — Candidate Ready for Reference",
    confidence_band: "reference only / medium",
    governance_note: "Conceptual central area · no official municipal boundary · advisory only · reviewer-anchored",
    linked_workflows: [
      "Zone Indexing & Evidence Grid",
      "Evidence Enrichment Layer",
      "Municipal Operational Planning",
    ],
    next_human_action: "data_reviewer signs per-source row reference for Core",
    buyer_relevance: ["Municipality", "Investor", "Cloud/Data Partner"],
    classification: "active_pilot",
  },
  {
    zone_id: "RIY-NORTH",
    zone_name: "Riyadh North",
    jurisdiction: "Saudi Arabia / Riyadh",
    zone_type: "conceptual",
    source_family: ["USGS Reference", "Balady Municipal Reference", "GASTAT Macro Context", "Saudi Open Data placeholder"],
    evidence_status: "candidate",
    readiness_band: "A — Candidate Ready for Reference",
    confidence_band: "reference only / medium",
    governance_note: "Conceptual northern growth area · no official boundary · advisory · reviewer-anchored",
    linked_workflows: [
      "Zone Indexing & Evidence Grid",
      "Evidence Enrichment Layer",
      "Market Demand & Site Selection",
    ],
    next_human_action: "GIS_reviewer ratifies conceptual North extent · no official boundary",
    buyer_relevance: ["Investor", "Municipality"],
    classification: "active_pilot",
  },
  {
    zone_id: "RIY-SOUTH",
    zone_name: "Riyadh South",
    jurisdiction: "Saudi Arabia / Riyadh",
    zone_type: "conceptual",
    source_family: ["USGS Reference", "Balady Municipal Reference", "GASTAT Macro Context", "Saudi Open Data placeholder"],
    evidence_status: "candidate",
    readiness_band: "A — Candidate Ready for Reference",
    confidence_band: "reference only / medium",
    governance_note: "Conceptual southern logistic corridor · no official zoning record · advisory",
    linked_workflows: [
      "Zone Indexing & Evidence Grid",
      "Infrastructure & Connectivity Intelligence",
      "Municipal Operational Planning",
    ],
    next_human_action: "municipal reviewer interview before any pilot framing on South corridor",
    buyer_relevance: ["Municipality", "Cloud/Data Partner"],
    classification: "active_pilot",
  },
  {
    zone_id: "RIY-EAST",
    zone_name: "Riyadh East",
    jurisdiction: "Saudi Arabia / Riyadh",
    zone_type: "conceptual",
    source_family: ["USGS Reference", "Balady Municipal Reference", "Saudi Open Data placeholder", "REGA Real Estate Signal"],
    evidence_status: "candidate_partial",
    readiness_band: "B — Needs More Evidence",
    confidence_band: "reference only / low-medium",
    governance_note: "Conceptual eastern residential corridor · candidate framing · review pending · no official boundary",
    linked_workflows: [
      "Evidence Enrichment Layer",
      "Market Demand & Site Selection",
      "Insurance & Real Estate Risk Intelligence",
    ],
    next_human_action: "governance_reviewer ratifies East residential framing limitation language",
    buyer_relevance: ["Investor", "Insurance reviewer", "Municipality"],
    classification: "active_pilot",
  },
  {
    zone_id: "RIY-WEST",
    zone_name: "Riyadh West",
    jurisdiction: "Saudi Arabia / Riyadh",
    zone_type: "conceptual",
    source_family: ["USGS Reference", "Balady Municipal Reference", "Saudi Open Data placeholder"],
    evidence_status: "candidate_partial",
    readiness_band: "B — Needs More Evidence",
    confidence_band: "reference only / low-medium",
    governance_note: "Conceptual western infrastructure corridor · not an official network map · advisory",
    linked_workflows: [
      "Infrastructure & Connectivity Intelligence",
      "Evidence Enrichment Layer",
      "Spatial Index Foundation",
    ],
    next_human_action: "data_reviewer signs per-corridor infrastructure reference set",
    buyer_relevance: ["Municipality", "Cloud/Data Partner"],
    classification: "active_pilot",
  },
];

// Kuwait baseline reference case · preserved as a comparison anchor
export const KUWAIT_BASELINE_METADATA: ZoneOperatingMetadata[] = [
  {
    zone_id: "KW-SOUTH-SURRA",
    zone_name: "Kuwait — South Surra Baseline",
    jurisdiction: "Kuwait",
    zone_type: "baseline_reference",
    source_family: ["Kuwait Baseline Reference", "USGS Reference"],
    evidence_status: "candidate",
    readiness_band: "Baseline Reference (not an active pilot)",
    confidence_band: "reference only",
    governance_note: "Baseline reference case only · NOT the active pilot surface · advisory · no official boundary",
    linked_workflows: [
      "Zone Indexing & Evidence Grid",
      "Evidence Enrichment Layer",
    ],
    next_human_action: "preserved as historical baseline · no active reviewer action required",
    buyer_relevance: ["Baseline comparison only"],
    classification: "baseline_reference",
  },
  {
    zone_id: "KW-007",
    zone_name: "Kuwait — KW-007 Baseline",
    jurisdiction: "Kuwait",
    zone_type: "baseline_reference",
    source_family: ["Kuwait Baseline Reference"],
    evidence_status: "candidate",
    readiness_band: "Baseline Reference (not an active pilot)",
    confidence_band: "reference only",
    governance_note: "Baseline reference case only · NOT the active pilot surface · advisory · no official boundary",
    linked_workflows: [
      "Evidence Enrichment Layer",
    ],
    next_human_action: "preserved as historical baseline · no active reviewer action required",
    buyer_relevance: ["Baseline comparison only"],
    classification: "baseline_reference",
  },
];

export function findZoneOperatingMetadata(zone_id_or_riyadh_id: string | null): ZoneOperatingMetadata | null {
  if (!zone_id_or_riyadh_id) return null;
  // Allow lookup by the lower-case Riyadh id (e.g. "north" → "RIY-NORTH")
  const upper = zone_id_or_riyadh_id.toUpperCase();
  const tryRiy = `RIY-${upper}`;
  return (
    RIYADH_ZONE_OPERATING_METADATA.find((z) => z.zone_id === upper || z.zone_id === tryRiy)
    ?? KUWAIT_BASELINE_METADATA.find((z) => z.zone_id === upper)
    ?? null
  );
}

// -----------------------------------------------------------------
// 5 conceptual Riyadh zones
// -----------------------------------------------------------------
export const RIYADH_CONCEPTUAL_ZONES: RiyadhZone[] = [
  {
    id: "core",
    label: "Core Riyadh",
    arabicLabel: "المركز",
    role: "central_municipal_business",
    evidencePosture: "evidence_present",
    readinessPosture: "candidate_ready_for_reference",
    sourceFamilies: ["USGS Visual Evidence", "Balady Municipal Reference", "GASTAT Macro Context", "Saudi Open Data Public Context", "REGA Real Estate Signal"],
    missingEvidence: ["per-block municipal infrastructure depth (future Balady deepening)"],
    nextHumanAction: "data_reviewer signs per-source row reference for Core",
    limitationNote: "Conceptual central area · not an official municipal boundary · advisory only",
    gridRow: 2, gridCol: 2,
    beforeAssetUrl: "/v2/evidence/riyadh/before-after/riyadh-core-2020-before-usgs.png",
    afterAssetUrl:  "/v2/evidence/riyadh/before-after/riyadh-core-2025-after-usgs.png",
    contextAssetUrl: "/v2/evidence/riyadh/context/riyadh-balady-map-base-01.png",
  },
  {
    id: "north",
    label: "North Riyadh",
    arabicLabel: "الشمال",
    role: "growth_corridor",
    evidencePosture: "evidence_present",
    readinessPosture: "candidate_ready_for_reference",
    sourceFamilies: ["USGS Visual Evidence", "Balady Municipal Reference", "GASTAT Macro Context", "Saudi Open Data Public Context"],
    missingEvidence: ["per-zone GIS reviewer signoff on conceptual extent"],
    nextHumanAction: "GIS_reviewer ratifies conceptual North extent · no official boundary",
    limitationNote: "Conceptual northern growth area · not an official boundary",
    gridRow: 1, gridCol: 2,
    beforeAssetUrl: "/v2/evidence/riyadh/before-after/riyadh-north-001-2020-before-usgs.png",
    afterAssetUrl:  "/v2/evidence/riyadh/before-after/riyadh-north-001-2025-after-usgs.png",
    contextAssetUrl: "/v2/evidence/riyadh/context/riyadh-north-aoi-location-usgs.png",
  },
  {
    id: "south",
    label: "South Riyadh",
    arabicLabel: "الجنوب",
    role: "industrial_logistic_corridor",
    evidencePosture: "evidence_present",
    readinessPosture: "candidate_ready_for_reference",
    sourceFamilies: ["USGS Visual Evidence", "Balady Municipal Reference", "GASTAT Macro Context", "Saudi Open Data Public Context"],
    missingEvidence: ["per-corridor logistic land-use reviewer signoff"],
    nextHumanAction: "municipal reviewer interviews before any pilot framing on South corridor",
    limitationNote: "Conceptual southern logistic corridor · not an official zoning record",
    gridRow: 3, gridCol: 2,
    beforeAssetUrl: "/v2/evidence/riyadh/before-after/riyadh-south-001-2020-before-usgs.png",
    afterAssetUrl:  "/v2/evidence/riyadh/before-after/riyadh-south-001-2025-after-usgs.png",
  },
  {
    id: "east",
    label: "East Riyadh",
    arabicLabel: "الشرق",
    role: "residential_growth_corridor",
    evidencePosture: "evidence_partial",
    readinessPosture: "review_pending",
    sourceFamilies: ["USGS Visual Evidence", "Balady Municipal Reference", "Saudi Open Data Public Context", "REGA Real Estate Signal"],
    missingEvidence: ["per-block governance ratification on residential framing", "GASTAT per-district context"],
    nextHumanAction: "governance_reviewer ratifies East residential framing limitation language",
    limitationNote: "Conceptual eastern residential corridor · candidate framing · review pending",
    gridRow: 2, gridCol: 3,
    beforeAssetUrl: "/v2/evidence/riyadh/before-after/riyadh-east-001-2020-before-usgs.png",
    afterAssetUrl:  "/v2/evidence/riyadh/before-after/riyadh-east-001-2025-after-usgs.png",
  },
  {
    id: "west",
    label: "West Riyadh",
    arabicLabel: "الغرب",
    role: "infrastructure_corridor",
    evidencePosture: "evidence_partial",
    readinessPosture: "review_pending",
    sourceFamilies: ["USGS Visual Evidence", "Balady Municipal Reference", "Saudi Open Data Public Context"],
    missingEvidence: ["per-corridor infrastructure depth (future enrichment)", "GASTAT per-corridor population reference"],
    nextHumanAction: "data_reviewer signs per-corridor infrastructure reference set",
    limitationNote: "Conceptual western infrastructure corridor · not an official network map",
    gridRow: 2, gridCol: 1,
    beforeAssetUrl: "/v2/evidence/riyadh/before-after/riyadh-west-001-2020-before-usgs.png",
    afterAssetUrl:  "/v2/evidence/riyadh/before-after/riyadh-west-001-2025-after-usgs.png",
  },
];

// -----------------------------------------------------------------
// 6 source layers
// -----------------------------------------------------------------
export const RIYADH_SOURCE_LAYERS: RiyadhSourceLayer[] = [
  {
    id: "usgs",
    label: "USGS Visual Evidence",
    type: "visual_reference",
    status: "active_candidate_layer",
    allowedUse: ["per-zone visual reference frame", "before/after visual context only"],
    forbiddenUse: ["automated change detection", "NDVI / spectral-index derivation", "official boundary inference"],
    evidenceRole: "Visual reference frame · advisory · candidate-only",
    limitationNote: "USGS placeholder tiles bound locally · no official imagery partnership claimed",
  },
  {
    id: "balady",
    label: "Balady Municipal Reference",
    type: "municipal_reference",
    status: "reference_only",
    allowedUse: ["municipal-service surface reference", "per-zone advisory framing"],
    forbiddenUse: ["enforcement framing", "automated inspection", "official municipal boundary claim"],
    evidenceRole: "Municipal reference context · advisory only",
    limitationNote: "Balady-derived reference · no official municipal integration is claimed",
  },
  {
    id: "gastat",
    label: "GASTAT Macro Context",
    type: "macro_statistical_context",
    status: "reference_only",
    allowedUse: ["national statistic reference", "macro context framing"],
    forbiddenUse: ["per-zone derivation without reviewer signoff", "forecast framing"],
    evidenceRole: "Macro statistical context · advisory only",
    limitationNote: "GASTAT-derived reference · no forecast · no automated decision",
  },
  {
    id: "saudi_open_data",
    label: "Saudi Open Data Public Context",
    type: "public_open_data_context",
    status: "reference_only",
    allowedUse: ["open-data signal catalogue", "public-record context"],
    forbiddenUse: ["official integration claim", "automated underwriting"],
    evidenceRole: "Public open-data reference · advisory only",
    limitationNote: "Open-data context only · no official portal integration is claimed",
  },
  {
    id: "rega",
    label: "REGA Real Estate Signal",
    type: "economic_market_signal",
    status: "reference_only",
    allowedUse: ["indicative market signal", "candidate investment-zone framing (advisory)"],
    forbiddenUse: ["investment recommendation", "price prediction", "guaranteed return framing"],
    evidenceRole: "Real-estate market signal · advisory only",
    limitationNote: "REGA-derived reference · no investment recommendation · no price prediction",
  },
  {
    id: "governance_notes",
    label: "Governance Notes",
    type: "governance_constraint_layer",
    status: "active_candidate_layer",
    allowedUse: ["per-zone constitutional caveat surfacing", "per-source limitation rendering"],
    forbiddenUse: ["softening of advisory-only notice", "removal of locked-engines reference"],
    evidenceRole: "Constitutional constraint overlay · always-visible",
    limitationNote: "Governance overlay · binding constitutional posture",
  },
];

// -----------------------------------------------------------------
// 5 evidence tile slot definitions
// -----------------------------------------------------------------
export const RIYADH_EVIDENCE_TILES: RiyadhEvidenceTile[] = [
  {
    slot: "before",
    label: "Before evidence frame",
    helperText: "USGS visual reference · t0",
    caveat: "Visual reference only · no automated change detection · no NDVI",
    bindable: true,
  },
  {
    slot: "after",
    label: "After evidence frame",
    helperText: "USGS visual reference · t1",
    caveat: "Visual reference only · no automated change detection · no NDVI",
    bindable: true,
  },
  {
    slot: "metadata",
    label: "Evidence metadata",
    helperText: "per-frame provenance · sha256 · reviewer status",
    caveat: "Provenance is reviewer-anchored · not auto-curated",
    bindable: false,
  },
  {
    slot: "governance_note",
    label: "Governance note",
    helperText: "advisory-only caveat per zone",
    caveat: "Constitutional posture · not user-configurable",
    bindable: false,
  },
  {
    slot: "reviewer_status",
    label: "Reviewer status",
    helperText: "who has signed · who is pending",
    caveat: "No automated reviewer signoff · human action required",
    bindable: false,
  },
];

// -----------------------------------------------------------------
// Metadata drawer field schema
// -----------------------------------------------------------------
export const RIYADH_METADATA_FIELDS: RiyadhMetadataField[] = [
  { key: "zone_id",           label: "Zone ID",                    example: "north",                                           caveat: "conceptual zone id · not an official municipal code" },
  { key: "zone_role",         label: "Zone role",                  example: "growth_corridor",                                 caveat: "descriptive role · not a regulatory designation" },
  { key: "source_family",     label: "Source family",              example: "USGS Visual Evidence",                            caveat: "advisory context only" },
  { key: "evidence_posture",  label: "Evidence posture",           example: "evidence_present",                                caveat: "reviewer-anchored · candidate-only" },
  { key: "readiness_posture", label: "Readiness posture",          example: "candidate_ready_for_reference",                   caveat: "candidate band · not production readiness" },
  { key: "reviewer_status",   label: "Reviewer status",            example: "data_reviewer signed · governance_reviewer pending", caveat: "no automated signoff" },
  { key: "next_human_action", label: "Next human action",          example: "GIS_reviewer ratifies conceptual extent",         caveat: "advisory · never auto-triggered" },
  { key: "limitation_note",   label: "Governance limitation",      example: "not an official municipal boundary",              caveat: "constitutional caveat · always visible" },
];

// -----------------------------------------------------------------
// Constitutional limitation strip rendered on the map
// -----------------------------------------------------------------
export const RIYADH_MAP_LIMITATIONS: string[] = [
  "Conceptual review zones only · not official municipal boundaries · no automated change detection",
  "No NDVI · no spectral-index · no satellite analytics activation",
  "No surveillance · no individual identification · no enforcement",
  "No prediction · no forecast · no automated decision",
  "No ROI · no investment recommendation · no underwriting",
  "Visual frames are USGS-derived references · no official imagery partnership is claimed",
];

// -----------------------------------------------------------------
// Visual status legend
// -----------------------------------------------------------------
export const RIYADH_MAP_STATUS_LEGEND: MapStatusLegendEntry[] = [
  { key: "candidate_ready_for_reference", label: "candidate ready · reference",      swatchClass: "bg-accent",          description: "advisory band candidate-ready for reference use" },
  { key: "review_pending",                label: "review pending",                    swatchClass: "bg-amber-muted",     description: "reviewer attention recommended before reference" },
  { key: "governance_limited",            label: "governance limited",                swatchClass: "bg-risk-medium",     description: "reference held pending constitutional posture" },
  { key: "insufficient_evidence",         label: "insufficient evidence",             swatchClass: "bg-risk-high",       description: "reference held pending evidence deepening" },
  { key: "blocked_from_decision_use",     label: "blocked from decision use",         swatchClass: "bg-risk-critical",   description: "advisory display only · not for decision use" },
  { key: "active_candidate_layer",        label: "source layer · active candidate",   swatchClass: "bg-accent-soft",     description: "source layer renders in candidate-config mode" },
  { key: "reference_only",                label: "source layer · reference",          swatchClass: "bg-panel",           description: "source layer used as advisory reference only" },
  { key: "future_gated",                  label: "future-gated · BLOCKED today",      swatchClass: "bg-risk-high/[0.3]", description: "source/layer requires a future gate before activation" },
];

// Helpful lookup helpers (pure read-only)
export function findZoneById(id: string | null): RiyadhZone | null {
  if (!id) return null;
  return RIYADH_CONCEPTUAL_ZONES.find((z) => z.id === id) ?? null;
}
export function findSourceLayerById(id: string | null): RiyadhSourceLayer | null {
  if (!id) return null;
  return RIYADH_SOURCE_LAYERS.find((s) => s.id === id) ?? null;
}
export function findTileBySlot(slot: EvidenceTileSlot | null): RiyadhEvidenceTile | null {
  if (!slot) return null;
  return RIYADH_EVIDENCE_TILES.find((t) => t.slot === slot) ?? null;
}
