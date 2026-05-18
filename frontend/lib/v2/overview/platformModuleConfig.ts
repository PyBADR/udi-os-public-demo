// IR-42A-R1-V2-REFERENCE-ARCHITECTURE-INTELLIGENCE-CONFIGURATION-REGISTRY
// Frontend-readable platform module configuration. Canonical source of
// truth: udi-os-v2/config/enterprise_architecture/enterprise_ui_architecture_registry.json
// + udi-os-v2/config/reference_patterns/platform_module_mapping.json.
//
// Pure UI configuration. No vendor branding referenced.

import type { ReferenceFamilyId } from "./referencePatternConfig";

export type PlatformModuleStatus =
  | "active_candidate"
  | "future_gate"
  | "blocked";

export interface PlatformModule {
  module_id: string;
  name: string;
  purpose: string;
  primary_user: string;
  buyer_value: string;
  reference_families: ReferenceFamilyId[];
  intelligence_layers: string[];
  current_components: string[];
  status: PlatformModuleStatus;
}

export const PLATFORM_MODULES: PlatformModule[] = [
  {
    module_id: "BDII-M01-PLATFORM-SHELL",
    name: "Platform Shell · Overview Home",
    purpose: "host the single-surface platform · left nav rail + top header + body + sticky right Decision Trace + footer caveats",
    primary_user: "Bader Alabddan · municipal director · investor reviewer",
    buyer_value: "first impression communicates a governed decision intelligence platform (not a report)",
    reference_families: ["CARTO_WORKSPACE_REFERENCE_FAMILY", "PALANTIR_REFERENCE_FAMILY"],
    intelligence_layers: ["enterprise_ui", "dynamic_ui"],
    current_components: ["LeftNavRail", "TopHeader", "ExecutiveHero", "RightExplanationPanel", "DecisionTraceContextCard"],
    status: "active_candidate",
  },
  {
    module_id: "BDII-M02-MAP-SURFACE",
    name: "Riyadh Evidence Intelligence Map",
    purpose: "geospatial evidence intelligence with 5 conceptual zones · 6 source layers · before/after USGS-derived reference frames · metadata drawer · map-local trace",
    primary_user: "municipal director · GIS reviewer · Bader Alabddan",
    buyer_value: "demonstrates Riyadh-first geospatial intelligence with explicit governance posture",
    reference_families: ["MAXAR_MASTER_TECH_REFERENCE_FAMILY", "CARTO_WORKSPACE_REFERENCE_FAMILY", "URBANLOGIQ_REFERENCE_FAMILY", "BDII_NATIVE_REFERENCE_FAMILY"],
    intelligence_layers: ["evidence", "micro", "macro", "relationship_graph", "dynamic_ui"],
    current_components: ["RiyadhEvidenceMapSurface", "RiyadhConceptualMap", "MapSourceLayerRail", "EvidenceMetadataDrawer", "BeforeAfterEvidenceTiles"],
    status: "active_candidate",
  },
  {
    module_id: "BDII-M03-WORKFLOW-STUDIO",
    name: "Workflow Studio",
    purpose: "configuration-only workflow taxonomy · 14 families · 60 templates · advisory CTAs only",
    primary_user: "data reviewer · governance reviewer · Bader Alabddan",
    buyer_value: "demonstrates the platform brain · governed workflow intelligence layer",
    reference_families: ["CARTO_WORKFLOW_TAXONOMY_REFERENCE_FAMILY", "CARTO_WORKSPACE_REFERENCE_FAMILY", "PALANTIR_REFERENCE_FAMILY"],
    intelligence_layers: ["data_science", "mathematical_core", "decision_formula_relationship_engine", "dynamic_ui"],
    current_components: ["WorkflowCanvas", "WorkflowConfigurationLayer", "DecisionKernelLayerStatus", "NextHumanActionPanel"],
    status: "active_candidate",
  },
  {
    module_id: "BDII-M04-EVIDENCE-EXPLORER",
    name: "Evidence Explorer",
    purpose: "per-token evidence reference list · per-family filter · sha256 chip · reviewer-anchored",
    primary_user: "data reviewer · governance reviewer",
    buyer_value: "auditable per-token evidence pane",
    reference_families: ["PALANTIR_REFERENCE_FAMILY", "CARTO_WORKSPACE_REFERENCE_FAMILY", "MAXAR_MASTER_TECH_REFERENCE_FAMILY"],
    intelligence_layers: ["evidence", "data_architecture", "relationship_graph"],
    current_components: ["EvidenceExplorerPanel", "EvidenceLineagePanel"],
    status: "active_candidate",
  },
  {
    module_id: "BDII-M05-DATA-OBSERVATORY",
    name: "GCC Data Observatory",
    purpose: "8 evidence categories · per-category candidate / reserved status",
    primary_user: "Bader Alabddan · governance reviewer",
    buyer_value: "platform substrate breadth made visible without overclaiming",
    reference_families: ["CARTO_WORKSPACE_REFERENCE_FAMILY", "URBANLOGIQ_REFERENCE_FAMILY"],
    intelligence_layers: ["macro", "micro", "economic", "data_science"],
    current_components: ["DataObservatorySection", "DataSizeReadinessStrip", "ReadinessBandsPanel"],
    status: "active_candidate",
  },
  {
    module_id: "BDII-M06-CONNECTIONS",
    name: "Connections",
    purpose: "connection ledger · 2 active local · 4 future-gated",
    primary_user: "Bader Alabddan · governance reviewer",
    buyer_value: "communicates what the platform is NOT connected to as a posture",
    reference_families: ["CARTO_WORKSPACE_REFERENCE_FAMILY"],
    intelligence_layers: ["data_warehouse_future_gate", "mlops_future_gate", "simulation_future_gate"],
    current_components: ["ConnectionsPanel", "LockedFutureEnginesRail"],
    status: "active_candidate",
  },
  {
    module_id: "BDII-M07-APPLICATIONS",
    name: "Applications · Solution Gallery",
    purpose: "8 candidate application cards · in-page workspace transitions",
    primary_user: "investor reviewer · municipal director · business reviewer",
    buyer_value: "concrete things stakeholders can do with the platform",
    reference_families: ["CARTO_WORKSPACE_REFERENCE_FAMILY", "URBANLOGIQ_REFERENCE_FAMILY", "BDII_NATIVE_REFERENCE_FAMILY"],
    intelligence_layers: ["enterprise_ui", "dynamic_ui", "economic"],
    current_components: ["ApplicationsGallery"],
    status: "active_candidate",
  },
  {
    module_id: "BDII-M08-DEVELOPER-HUB",
    name: "Developer · Ontology Hub",
    purpose: "8 typed ontology objects · per-object source-of-truth artifact",
    primary_user: "developer · technical reviewer · Bader Alabddan",
    buyer_value: "communicates a typed substrate, not an ad-hoc dashboard",
    reference_families: ["PALANTIR_REFERENCE_FAMILY", "CARTO_WORKSPACE_REFERENCE_FAMILY"],
    intelligence_layers: ["enterprise_ui", "relationship_graph", "decision_formula_relationship_engine"],
    current_components: ["DeveloperOntologyLayer"],
    status: "active_candidate",
  },
  {
    module_id: "BDII-M09-GOVERNANCE-CONSOLE",
    name: "Governance Console",
    purpose: "per-source posture rail · constitutional caveats · locked-engine list · forbidden-claims toggle",
    primary_user: "governance reviewer · Bader Alabddan",
    buyer_value: "auditable governance posture made visible",
    reference_families: ["URBANLOGIQ_REFERENCE_FAMILY", "BDII_NATIVE_REFERENCE_FAMILY"],
    intelligence_layers: ["enterprise_ui", "dynamic_ui"],
    current_components: ["GovernanceTrustRail", "LockedFutureEnginesRail", "EvidenceLineagePanel"],
    status: "active_candidate",
  },
  {
    module_id: "BDII-M10-SETTINGS-ADMIN",
    name: "Settings · Admin",
    purpose: "future gate · reviewer accounts · per-tenant config · per-language toggle",
    primary_user: "platform admin · Bader Alabddan",
    buyer_value: "operational hygiene",
    reference_families: ["CARTO_WORKSPACE_REFERENCE_FAMILY"],
    intelligence_layers: ["enterprise_ui"],
    current_components: [],
    status: "future_gate",
  },
  {
    module_id: "BDII-M11-AI-ADVISORY-AGENT-BOUNDARY",
    name: "AI Advisory Agent Boundary",
    purpose: "future gate · explicit boundary where any future LLM agent will operate · advisory-only · human-in-the-loop",
    primary_user: "Bader Alabddan · governance reviewer",
    buyer_value: "communicates exactly where AI may and may not act",
    reference_families: ["CARTO_WORKSPACE_REFERENCE_FAMILY", "PALANTIR_REFERENCE_FAMILY"],
    intelligence_layers: ["enterprise_ui", "mlops_future_gate"],
    current_components: [],
    status: "future_gate",
  },
  {
    module_id: "BDII-M12-PILOT-PACK",
    name: "Pilot Pack",
    purpose: "future gate · 9 candidate pilot packages framing",
    primary_user: "business reviewer · Bader Alabddan",
    buyer_value: "concrete pilot framing for buyer interviews",
    reference_families: ["URBANLOGIQ_REFERENCE_FAMILY", "BDII_NATIVE_REFERENCE_FAMILY"],
    intelligence_layers: ["economic", "enterprise_ui"],
    current_components: [],
    status: "future_gate",
  },
  {
    module_id: "BDII-M13-BUYER-NARRATIVE-LAYER",
    name: "Buyer Narrative Layer",
    purpose: "future gate · per-buyer narrative composition",
    primary_user: "business reviewer · Bader Alabddan",
    buyer_value: "tailored narrative per buyer without rewriting the platform",
    reference_families: ["URBANLOGIQ_REFERENCE_FAMILY", "BDII_NATIVE_REFERENCE_FAMILY"],
    intelligence_layers: ["economic", "macro", "enterprise_ui"],
    current_components: [],
    status: "future_gate",
  },
];
