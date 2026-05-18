// IR-42B-V2-R2-RIY-EVIDENCE-PACK-BINDING-AND-MAP-FIRST-FIX
//
// Static binding between the owner-authorized local RIY-Riyadh-Evidence-Pack
// and the V2 Map Operating Surface. Configuration only — no fetch, no
// API, no DB, no ML. The owner's evidence files at
//   /Users/bdr.ai/Desktop/RIY-Riyadh-Evidence-Pack
// remain authoritative on disk; this binding only references them via
// `local_source_path_reference` and reuses the 10 curated, normalized
// USGS PNGs already public-served at
//   frontend/public/demo-assets/riyadh-evidence-pack/*.png
//
// All language is safe: reference imagery · evidence context · visual
// anchor · candidate evidence · human-reviewed · advisory only.
// No official boundary, no live GIS, no automated change detection,
// no NDVI, no surveillance, no enforcement, no claims prediction,
// no underwriting automation, no production claim.

// -----------------------------------------------------------------
// Pack-level metadata
// -----------------------------------------------------------------
export interface RiyadhEvidencePackBinding {
  pack_id: string;
  pack_title: string;
  owner_authorized_root_local_path: string;
  curated_public_asset_root: string;
  evidence_role: string;
  source_family: string;
  governance_posture: string;
  forbidden_use: string[];
  reviewer_anchor: string;
}

export const RIY_EVIDENCE_PACK_BINDING: RiyadhEvidencePackBinding = {
  pack_id: "RIY-RIYADH-EVIDENCE-PACK",
  pack_title: "RIY Riyadh Evidence Pack",
  owner_authorized_root_local_path: "/Users/bdr.ai/Desktop/RIY-Riyadh-Evidence-Pack",
  curated_public_asset_root: "/demo-assets/riyadh-evidence-pack",
  evidence_role: "reference visual evidence · advisory context · candidate framing",
  source_family: "USGS Reference Imagery",
  governance_posture: "human-reviewed · advisory only · candidate evidence · no official boundary · no live GIS",
  forbidden_use: [
    "no automated change detection",
    "no NDVI",
    "no spectral-index derivation",
    "no surveillance",
    "no individual identification",
    "no enforcement",
    "no claims prediction",
    "no underwriting automation",
    "no production GIS",
    "no official Riyadh municipal boundary claim",
  ],
  reviewer_anchor: "owner-authorized local pack · normalized visual anchors mirrored under demo-assets · reviewer must approve before any reference is escalated beyond candidate",
};

// -----------------------------------------------------------------
// Per-zone evidence asset binding
// -----------------------------------------------------------------
export type RiyZoneId =
  | "RIY-CORE"
  | "RIY-NORTH"
  | "RIY-SOUTH"
  | "RIY-EAST"
  | "RIY-WEST";

export interface RiyZoneEvidenceAsset {
  zone_id: RiyZoneId;
  zone_name: string;
  before_asset_public_path: string;
  after_asset_public_path: string;
  local_source_path_reference: {
    before: string;
    after: string;
  };
  source_family: string;
  evidence_role: string;
  evidence_status: "candidate" | "candidate_partial" | "reviewer_required";
  governance_note: string;
  allowed_use: string[];
  blocked_use: string[];
  linked_workflows: string[];
  next_human_action: string;
}

const PACK_LOCAL = RIY_EVIDENCE_PACK_BINDING.owner_authorized_root_local_path;
const PUB = RIY_EVIDENCE_PACK_BINDING.curated_public_asset_root;

export const RIY_ZONE_EVIDENCE_ASSETS: RiyZoneEvidenceAsset[] = [
  {
    zone_id: "RIY-CORE",
    zone_name: "Riyadh Core",
    before_asset_public_path: `${PUB}/riyadh-core-before-usgs.png`,
    after_asset_public_path:  `${PUB}/riyadh-core-after-usgs.png`,
    local_source_path_reference: {
      before: `${PACK_LOCAL}/usgs/core/RIY-CORE-2020-BEFORE-USGS-EVIDENCE.png`,
      after:  `${PACK_LOCAL}/usgs/core/RIY-CORE-2025-AFTER-USGS-EVIDENCE.png`,
    },
    source_family: "USGS Reference Imagery",
    evidence_role: "visual anchor for Core conceptual zone",
    evidence_status: "candidate",
    governance_note: "Conceptual central area · no official municipal boundary · advisory only · reviewer-anchored",
    allowed_use: ["reference imagery", "evidence context", "visual anchor", "human-reviewed advisory framing"],
    blocked_use: [
      "automated change detection",
      "NDVI / spectral-index",
      "surveillance / individual identification",
      "official boundary inference",
    ],
    linked_workflows: [
      "Zone Indexing & Evidence Grid",
      "Evidence Enrichment Layer",
      "Municipal Operational Planning",
    ],
    next_human_action: "data_reviewer signs per-source row reference for Core",
  },
  {
    zone_id: "RIY-NORTH",
    zone_name: "Riyadh North",
    before_asset_public_path: `${PUB}/riyadh-north-before-usgs.png`,
    after_asset_public_path:  `${PUB}/riyadh-north-after-usgs.png`,
    local_source_path_reference: {
      before: `${PACK_LOCAL}/usgs/north/RIY-NORTH-001-2020-BEFORE-USGS-EVIDENCE.png`,
      after:  `${PACK_LOCAL}/usgs/north/RIY-NORTH-001-2025-AFTER-USGS-EVIDENCE.png`,
    },
    source_family: "USGS Reference Imagery",
    evidence_role: "visual anchor for North conceptual growth corridor",
    evidence_status: "candidate",
    governance_note: "Conceptual northern growth area · no official boundary · advisory · reviewer-anchored",
    allowed_use: ["reference imagery", "evidence context", "visual anchor", "human-reviewed advisory framing"],
    blocked_use: [
      "automated change detection",
      "NDVI / spectral-index",
      "surveillance",
      "official boundary inference",
    ],
    linked_workflows: [
      "Zone Indexing & Evidence Grid",
      "Evidence Enrichment Layer",
      "Market Demand & Site Selection",
    ],
    next_human_action: "GIS_reviewer ratifies conceptual North extent · no official boundary",
  },
  {
    zone_id: "RIY-SOUTH",
    zone_name: "Riyadh South",
    before_asset_public_path: `${PUB}/riyadh-south-before-usgs.png`,
    after_asset_public_path:  `${PUB}/riyadh-south-after-usgs.png`,
    local_source_path_reference: {
      before: `${PACK_LOCAL}/usgs/south/RIY-SOUTH-001-2020-BEFORE-USGS-EVIDENCE.png`,
      after:  `${PACK_LOCAL}/usgs/south/RIY-SOUTH-001-2025-AFTER-USGS-EVIDENCE.png`,
    },
    source_family: "USGS Reference Imagery",
    evidence_role: "visual anchor for South conceptual logistic corridor",
    evidence_status: "candidate",
    governance_note: "Conceptual southern logistic corridor · no official zoning record · advisory",
    allowed_use: ["reference imagery", "evidence context", "visual anchor", "human-reviewed advisory framing"],
    blocked_use: [
      "automated change detection",
      "NDVI / spectral-index",
      "surveillance",
      "official boundary inference",
    ],
    linked_workflows: [
      "Zone Indexing & Evidence Grid",
      "Infrastructure & Connectivity Intelligence",
      "Municipal Operational Planning",
    ],
    next_human_action: "municipal reviewer interview before any pilot framing on South corridor",
  },
  {
    zone_id: "RIY-EAST",
    zone_name: "Riyadh East",
    before_asset_public_path: `${PUB}/riyadh-east-before-usgs.png`,
    after_asset_public_path:  `${PUB}/riyadh-east-after-usgs.png`,
    local_source_path_reference: {
      before: `${PACK_LOCAL}/usgs/east/RIY-EAST-001-2020-BEFORE-USGS-EVIDENCE.png`,
      after:  `${PACK_LOCAL}/usgs/east/RIY-EAST-001-2025-AFTER-USGS-EVIDENCE.png`,
    },
    source_family: "USGS Reference Imagery",
    evidence_role: "visual anchor for East conceptual residential corridor",
    evidence_status: "candidate_partial",
    governance_note: "Conceptual eastern residential corridor · candidate framing · review pending · no official boundary",
    allowed_use: ["reference imagery", "evidence context", "visual anchor", "human-reviewed advisory framing"],
    blocked_use: [
      "automated change detection",
      "NDVI / spectral-index",
      "surveillance",
      "official boundary inference",
      "investment recommendation",
    ],
    linked_workflows: [
      "Evidence Enrichment Layer",
      "Market Demand & Site Selection",
      "Insurance & Real Estate Risk Intelligence",
    ],
    next_human_action: "governance_reviewer ratifies East residential framing limitation language",
  },
  {
    zone_id: "RIY-WEST",
    zone_name: "Riyadh West",
    before_asset_public_path: `${PUB}/riyadh-west-before-usgs.png`,
    after_asset_public_path:  `${PUB}/riyadh-west-after-usgs.png`,
    local_source_path_reference: {
      before: `${PACK_LOCAL}/usgs/west/RIY-WEST-001-2020-BEFORE-USGS-EVIDENCE.png`,
      after:  `${PACK_LOCAL}/usgs/west/RIY-WEST-001-2025-AFTER-USGS-EVIDENCE.png`,
    },
    source_family: "USGS Reference Imagery",
    evidence_role: "visual anchor for West conceptual infrastructure corridor",
    evidence_status: "candidate_partial",
    governance_note: "Conceptual western infrastructure corridor · not an official network map · advisory",
    allowed_use: ["reference imagery", "evidence context", "visual anchor", "human-reviewed advisory framing"],
    blocked_use: [
      "automated change detection",
      "NDVI / spectral-index",
      "surveillance",
      "official boundary inference",
    ],
    linked_workflows: [
      "Infrastructure & Connectivity Intelligence",
      "Evidence Enrichment Layer",
      "Spatial Index Foundation",
    ],
    next_human_action: "data_reviewer signs per-corridor infrastructure reference set",
  },
];

// -----------------------------------------------------------------
// Named evidence sources (seed for IR-42C-V2-NAMED-EVIDENCE-SOURCES)
// -----------------------------------------------------------------
export interface NamedEvidenceSource {
  source_id: string;
  source_label: string;
  source_family: string;
  evidence_role: string;
  status: "active_candidate" | "reference_only" | "future_gated" | "baseline_reference";
  governance_note: string;
  allowed_use: string[];
  blocked_use: string[];
}

export const RIY_NAMED_EVIDENCE_SOURCES: NamedEvidenceSource[] = [
  {
    source_id: "USGS-REF",
    source_label: "USGS Reference Imagery",
    source_family: "USGS Reference Imagery",
    evidence_role: "per-zone visual reference frame · before / after candidate context",
    status: "active_candidate",
    governance_note: "USGS-derived reference imagery only · advisory · no automated change detection · no NDVI",
    allowed_use: ["reference imagery", "evidence context", "visual anchor"],
    blocked_use: ["automated change detection", "NDVI / spectral-index", "surveillance", "official boundary inference"],
  },
  {
    source_id: "BALADY-MUNI-REF",
    source_label: "MOMRAH / Balady Municipal Reference",
    source_family: "Balady Municipal Reference",
    evidence_role: "municipal-service surface reference · per-zone advisory framing",
    status: "reference_only",
    governance_note: "Balady-derived reference context only · no official municipal integration claimed · no enforcement",
    allowed_use: ["municipal reference context", "per-zone advisory framing"],
    blocked_use: ["enforcement framing", "automated inspection", "official municipal boundary claim"],
  },
  {
    source_id: "GASTAT-MACRO",
    source_label: "GASTAT Macro Context",
    source_family: "GASTAT Macro Context",
    evidence_role: "national statistic reference · macro context framing",
    status: "reference_only",
    governance_note: "GASTAT-derived reference · no forecast · no automated decision",
    allowed_use: ["national statistic reference", "macro context framing"],
    blocked_use: ["per-zone derivation without reviewer signoff", "forecast framing"],
  },
  {
    source_id: "SOD-PUBLIC",
    source_label: "Saudi Open Data Public Context",
    source_family: "Saudi Open Data placeholder",
    evidence_role: "open-data signal catalogue · public-record context",
    status: "reference_only",
    governance_note: "Open-data context only · no official portal integration is claimed",
    allowed_use: ["open-data signal catalogue", "public-record context"],
    blocked_use: ["official integration claim", "automated underwriting"],
  },
  {
    source_id: "REGA-REF",
    source_label: "REGA Real Estate Signal",
    source_family: "REGA Real Estate Signal",
    evidence_role: "indicative market signal · candidate investment-zone framing (advisory)",
    status: "reference_only",
    governance_note: "REGA-derived reference · no investment recommendation · no price prediction",
    allowed_use: ["indicative market signal", "candidate investment-zone framing (advisory)"],
    blocked_use: ["investment recommendation", "price prediction", "guaranteed return framing"],
  },
  {
    source_id: "GOV-NOTES",
    source_label: "Governance Notes",
    source_family: "Governance Constraint Overlay",
    evidence_role: "constitutional constraint overlay · always-visible",
    status: "active_candidate",
    governance_note: "Constitutional posture · widening any limitation requires amendment",
    allowed_use: ["per-zone constitutional caveat surfacing", "per-source limitation rendering"],
    blocked_use: ["softening of advisory-only notice", "removal of locked-engines reference"],
  },
  {
    source_id: "KW-BASELINE",
    source_label: "Kuwait Baseline Reference",
    source_family: "Kuwait Baseline Reference",
    evidence_role: "baseline comparison anchor only · NOT the active pilot",
    status: "baseline_reference",
    governance_note: "Baseline reference only · not active pilot · advisory · no official boundary",
    allowed_use: ["baseline comparison framing", "historical anchor"],
    blocked_use: ["dominant V2 product story", "investment recommendation", "operational decision"],
  },
];

// -----------------------------------------------------------------
// Always-visible governance notes for the pack
// -----------------------------------------------------------------
export const RIY_EVIDENCE_GOVERNANCE_NOTES: string[] = [
  "Conceptual review zones only · not official Riyadh municipal boundaries",
  "Reference imagery only · USGS-derived · no live GIS · no production GIS",
  "Candidate evidence · human review required before any escalation",
  "No automated change detection · no NDVI · no spectral-index activation",
  "No surveillance · no individual identification",
  "No enforcement · no automated decision · no automated prioritization",
  "No claims prediction · no underwriting automation",
  "ML / DL / Physics / Simulation / MLOps remain BLOCKED · future-gated",
  "Municipal review remains the sole producer of consequential conclusions",
];

// -----------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------
export function findRiyZoneEvidenceAsset(
  zone_or_id: string | null
): RiyZoneEvidenceAsset | null {
  if (!zone_or_id) return null;
  const upper = zone_or_id.toUpperCase();
  const tryRiy = upper.startsWith("RIY-") ? upper : `RIY-${upper}`;
  return RIY_ZONE_EVIDENCE_ASSETS.find((z) => z.zone_id === tryRiy) ?? null;
}

export function totalCuratedAssetCount(): number {
  // 2 (before + after) per zone × 5 zones = 10
  return RIY_ZONE_EVIDENCE_ASSETS.length * 2;
}
