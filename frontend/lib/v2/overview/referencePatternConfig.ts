// IR-42A-R1-V2-REFERENCE-ARCHITECTURE-INTELLIGENCE-CONFIGURATION-REGISTRY
// Frontend-readable subset of the reference-pattern registry. The
// canonical source of truth is
// `udi-os-v2/config/reference_patterns/reference_pattern_registry.json`.
//
// This subset is safe for client bundling: it carries only the
// reference-family identifiers, governance-safe BDII labels, and
// constraint strings. No vendor logo, image, or copyrighted asset
// is referenced. No partnership or official integration is claimed.

export type ReferenceFamilyId =
  | "PALANTIR_REFERENCE_FAMILY"
  | "MAXAR_MASTER_TECH_REFERENCE_FAMILY"
  | "CARTO_WORKSPACE_REFERENCE_FAMILY"
  | "CARTO_WORKFLOW_TAXONOMY_REFERENCE_FAMILY"
  | "URBANLOGIQ_REFERENCE_FAMILY"
  | "BDII_NATIVE_REFERENCE_FAMILY";

export interface ReferenceFamily {
  id: ReferenceFamilyId;
  purpose: string;
  bdii_translation_module: string;
  governance_safe_constraints: string[];
  affiliation_claimed: false;
  vendor_asset_imported: false;
}

export const ALLOWED_FRAMING = [
  "reference pattern",
  "adapted as",
  "translated into BDII module",
  "inspired product pattern",
  "no vendor branding",
  "no vendor asset",
  "no affiliation claimed",
] as const;

export const FORBIDDEN_FRAMING = [
  "copied from",
  "partnered with",
  "official integration",
  "powered by vendor",
  "production ready",
] as const;

export const REFERENCE_FAMILIES: ReferenceFamily[] = [
  {
    id: "PALANTIR_REFERENCE_FAMILY",
    purpose: "Ontology · Operating System · Decision Objects · Explanation Trace",
    bdii_translation_module: "Municipal Decision Ontology · Developer · Ontology Hub · Decision Trace",
    governance_safe_constraints: [
      "no automated consequential routing",
      "no enforcement action",
      "no automated decision",
      "human reviewer is the sole producer of consequential conclusions",
    ],
    affiliation_claimed: false,
    vendor_asset_imported: false,
  },
  {
    id: "MAXAR_MASTER_TECH_REFERENCE_FAMILY",
    purpose: "Satellite Evidence · Visual Geospatial Evidence · Before / After · Metadata · Map Intelligence",
    bdii_translation_module: "Riyadh Evidence Intelligence Map",
    governance_safe_constraints: [
      "visual reference only",
      "no automated change detection",
      "no NDVI · no spectral-index",
      "no surveillance",
      "no enforcement",
      "no official Riyadh municipal boundary",
      "reviewer inspection required",
    ],
    affiliation_claimed: false,
    vendor_asset_imported: false,
  },
  {
    id: "CARTO_WORKSPACE_REFERENCE_FAMILY",
    purpose: "Workspace Shell · Maps · Workflows · Data Explorer · Observatory · Connections · Applications · Developer · Settings",
    bdii_translation_module: "Platform Shell + 9-workspace surface set",
    governance_safe_constraints: [
      "no live AI agent action today",
      "no live credential vault today",
      "no live DB today",
      "configuration only",
    ],
    affiliation_claimed: false,
    vendor_asset_imported: false,
  },
  {
    id: "CARTO_WORKFLOW_TAXONOMY_REFERENCE_FAMILY",
    purpose: "Workflow Template Categories and Data Science · Spatial Analytics · ML-readiness taxonomy",
    bdii_translation_module: "Workflow Configuration Layer · 14 families · 60 templates",
    governance_safe_constraints: [
      "no workflow execution",
      "no ML activation",
      "no model run",
      "configuration only",
    ],
    affiliation_claimed: false,
    vendor_asset_imported: false,
  },
  {
    id: "URBANLOGIQ_REFERENCE_FAMILY",
    purpose: "Government Decision Intelligence · Public-sector trust · Ripple effects · Multi-department impact",
    bdii_translation_module: "Government · Municipality Narrative · Evidence-to-Decision Journey · Pilot Pack",
    governance_safe_constraints: [
      "advisory only",
      "human review required",
      "no enforcement",
      "no automated decision",
      "no surveillance",
      "municipal review is the sole producer of consequential conclusions",
    ],
    affiliation_claimed: false,
    vendor_asset_imported: false,
  },
  {
    id: "BDII_NATIVE_REFERENCE_FAMILY",
    purpose: "What is uniquely BDII for Riyadh-first GCC municipal intelligence",
    bdii_translation_module: "Riyadh Evidence Intelligence Map + Mathematical Core + Decision Kernel + Governance Trust Rail + Locked Future Engines + Workflow Configuration Layer + Applications Gallery + Developer Hub",
    governance_safe_constraints: [
      "no official boundary",
      "no surveillance",
      "no automated decision",
      "no ROI claim",
      "no investment recommendation",
      "no price prediction",
      "no forecast",
      "no production claim",
    ],
    affiliation_claimed: false,
    vendor_asset_imported: false,
  },
];
