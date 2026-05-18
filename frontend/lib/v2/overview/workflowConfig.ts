// IR-40B-V2-WORKFLOW-CONFIGURATION-LAYER — Static workflow taxonomy
// for /v2/overview Workflows workspace. Configuration only. No runtime
// import, no score computation, no execution affordance.
//
// Each family translates a referenced industry-standard workflow
// taxonomy (CARTO-style category names are retained in
// `source_reference_label` for engineering legibility only) into the
// BDII / GCC Urban Municipal Intelligence product label
// (`bdii_label`), with a governance posture that explicitly preserves
// the constitutional invariants of /v2/overview.
//
// Allowed CTAs anywhere in the surface that consumes this config:
//   · "Inspect workflow configuration"
//   · "View required evidence"
//   · "Prepare reviewer brief"
//   · "Add to candidate pilot scope"
//   · "Open decision trace"
//
// Forbidden CTAs (NEVER emit, NEVER render):
//   "Run model" · "Execute workflow" · "Deploy" · "Predict" ·
//   "Optimize automatically" · "Production-ready"

export type WorkflowStatus = "candidate_config" | "future_gated" | "blocked";

export interface WorkflowTemplate {
  id: string;
  title: string;
  description: string;
  required_inputs: string[];
  candidate_outputs: string[];
  linked_bdii_objects: string[];
  governance_limitations: string[];
  next_human_action: string;
  recommended_surface:
    | "map"
    | "evidence"
    | "observatory"
    | "applications"
    | "developer"
    | "governance"
    | "workflows";
}

export interface WorkflowFamily {
  id: string;
  source_reference_label: string;
  bdii_label: string;
  description: string;
  platform_layer: string;
  buyer_relevance: string;
  governance_posture: string;
  status: WorkflowStatus;
  connects_to: Array<
    "map" | "evidence" | "observatory" | "applications" | "developer" | "governance"
  >;
  templates: WorkflowTemplate[];
}

// -----------------------------------------------------------------
// 1 · Modeling & Scoring (BigQuery ML)
// -----------------------------------------------------------------
const F_BQML: WorkflowFamily = {
  id: "WF-BQML",
  source_reference_label: "BigQuery ML",
  bdii_label: "Modeling & Scoring Workflows",
  description:
    "Configuration of rule-based scoring and (future-gated) supervised modeling references. ML execution is not active in /v2/overview today; this family describes only the configuration shape and the prerequisite ledger a future ML gate would require.",
  platform_layer: "Mathematical Core · Decision Kernel",
  buyer_relevance:
    "Municipal & investor stakeholders see the shape a model-backed advisory layer would take after a future ML gate — without any live inference today.",
  governance_posture:
    "Future gated · no ML activation · no prediction · no production model · advisory configuration only.",
  status: "future_gated",
  connects_to: ["developer", "governance"],
  templates: [
    {
      id: "WF-BQML-01",
      title: "Configure classification model reference",
      description:
        "Document the inputs, candidate labels, and reviewer assumptions a future classification model would require. No inference, no training run.",
      required_inputs: [
        "candidate evidence token set (≥ 1 source family)",
        "reviewer-signed label intent",
        "governance posture per label class",
      ],
      candidate_outputs: [
        "per-class label intent card",
        "prerequisite ledger draft (future ML gate)",
      ],
      linked_bdii_objects: ["Evidence Token", "Decision Token", "Governance Constraint"],
      governance_limitations: [
        "no model output today · no predicted class · no automated decision",
        "label intent is reviewer-defined, never inferred",
      ],
      next_human_action: "data_reviewer drafts label intent · governance_reviewer ratifies",
      recommended_surface: "developer",
    },
    {
      id: "WF-BQML-02",
      title: "Configure regression model reference",
      description:
        "Document continuous-target configuration shape. Future gate only; no regression is computed.",
      required_inputs: [
        "candidate evidence token set",
        "reviewer-signed target intent (descriptive · not financial)",
      ],
      candidate_outputs: ["target intent card", "prerequisite ledger draft"],
      linked_bdii_objects: ["Evidence Token", "Formula"],
      governance_limitations: [
        "no predicted value · no expected return · no forecast",
        "target intent is descriptive only · never investment framing",
      ],
      next_human_action: "data_reviewer drafts target intent · governance_reviewer ratifies",
      recommended_surface: "developer",
    },
    {
      id: "WF-BQML-03",
      title: "Configure forecast reference",
      description:
        "Configuration shape for a hypothetical future forecast surface. /v2/overview today emits NO forecast.",
      required_inputs: [
        "candidate time-series intent",
        "reviewer-signed assumption ledger",
      ],
      candidate_outputs: ["assumption ledger draft", "prerequisite gate request"],
      linked_bdii_objects: ["Evidence Token", "Governance Constraint"],
      governance_limitations: [
        "no forecast emitted today · no prediction · no projected band",
        "scenario eligibility framing only when activated, never a prediction",
      ],
      next_human_action: "governance_reviewer + Bader Alabddan · authorize a future Simulation/ML gate",
      recommended_surface: "governance",
    },
    {
      id: "WF-BQML-04",
      title: "Configure imported model reference",
      description:
        "Configuration shape for an externally-trained model reference. Import is not active today; this is a documentation-only template.",
      required_inputs: [
        "external model card (provenance · training data summary)",
        "reviewer-signed import intent",
      ],
      candidate_outputs: ["model card placeholder", "prerequisite gate request"],
      linked_bdii_objects: ["Governance Constraint", "Kernel Layer"],
      governance_limitations: [
        "no imported model activated · no live inference · no automated decision",
      ],
      next_human_action: "Bader Alabddan · authorize future ML gate before any import is considered",
      recommended_surface: "governance",
    },
  ],
};

// -----------------------------------------------------------------
// 2 · Workflow Governance Controls (Control Components)
// -----------------------------------------------------------------
const F_CTRL: WorkflowFamily = {
  id: "WF-CTRL",
  source_reference_label: "Control Components",
  bdii_label: "Workflow Governance Controls",
  description:
    "UI-logic primitives for branching the *configuration* surface (e.g. show this card if a precondition is reviewer-signed). Never used for consequential routing of evidence or decisions.",
  platform_layer: "Dynamic UI Intelligence",
  buyer_relevance:
    "Demonstrates that the platform's branching is auditable UI logic, not opaque automation.",
  governance_posture:
    "Allowed as UI logic concept only · no automated consequential routing · no enforcement branching.",
  status: "candidate_config",
  connects_to: ["developer", "governance"],
  templates: [
    {
      id: "WF-CTRL-01",
      title: "Conditional split (UI logic only)",
      description:
        "Show or hide a configuration card based on a reviewer-signed precondition. Pure UI display logic.",
      required_inputs: ["reviewer-signed precondition flag", "two display branches"],
      candidate_outputs: ["one of two configuration views"],
      linked_bdii_objects: ["Governance Constraint"],
      governance_limitations: [
        "UI display only · no consequential routing of evidence or decisions",
      ],
      next_human_action: "reviewer reviews each branch before it is exposed",
      recommended_surface: "developer",
    },
    {
      id: "WF-CTRL-02",
      title: "Success / error split (UI logic only)",
      description:
        "Render a 'precondition met' card or a 'precondition missing' card. Surfacing only.",
      required_inputs: ["precondition check result"],
      candidate_outputs: ["one of two display states"],
      linked_bdii_objects: ["Governance Constraint"],
      governance_limitations: [
        "no automated retry · no automated escalation · UI display only",
      ],
      next_human_action: "reviewer attends to the 'precondition missing' branch when shown",
      recommended_surface: "governance",
    },
  ],
};

// -----------------------------------------------------------------
// 3 · Evidence Enrichment (Data Enrichment)
// -----------------------------------------------------------------
const F_ENRICH: WorkflowFamily = {
  id: "WF-ENRICH",
  source_reference_label: "Data Enrichment",
  bdii_label: "Evidence Enrichment",
  description:
    "Configuration of candidate enrichment templates that attach reviewer-signed reference attributes to evidence tokens by spatial proximity or area context.",
  platform_layer: "Evidence Intelligence · Relationship Intelligence",
  buyer_relevance:
    "Shows reviewers how candidate signals can be enriched with municipal/macro/economic context without making any official integration claim.",
  governance_posture:
    "Candidate enrichment only · source provenance and reviewer approval required · no automated overwrite of token attributes.",
  status: "candidate_config",
  connects_to: ["evidence", "observatory", "developer"],
  templates: [
    {
      id: "WF-ENRICH-01",
      title: "Enrich buffer regions using spatial indexes",
      description:
        "For each candidate token, attach reference attributes from intersecting H3/Quadbin buffers.",
      required_inputs: [
        "candidate token set",
        "reviewer-signed buffer radius intent",
        "spatial index choice (H3 · Quadbin)",
      ],
      candidate_outputs: ["per-token reference-attribute candidate row"],
      linked_bdii_objects: ["Evidence Token", "Source Family"],
      governance_limitations: [
        "candidate enrichment only · attribute remains tagged as 'candidate · reviewer pending'",
      ],
      next_human_action: "data_reviewer ratifies enriched attribute per token",
      recommended_surface: "evidence",
    },
    {
      id: "WF-ENRICH-02",
      title: "Enrich grid data with a custom source",
      description:
        "Attach reference attributes from a candidate custom source onto a grid index.",
      required_inputs: ["grid index", "candidate custom source", "reviewer signoff"],
      candidate_outputs: ["per-grid-cell candidate attribute"],
      linked_bdii_objects: ["Source Family", "Governance Constraint"],
      governance_limitations: ["custom source must be reviewer-signed before exposure"],
      next_human_action: "data_reviewer signs the custom source provenance row",
      recommended_surface: "evidence",
    },
    {
      id: "WF-ENRICH-03",
      title: "Enrich point data with a custom source",
      description:
        "Per-point reference attribute derivation from a candidate custom source.",
      required_inputs: ["point set", "candidate custom source", "reviewer signoff"],
      candidate_outputs: ["per-point candidate attribute row"],
      linked_bdii_objects: ["Evidence Token", "Source Family"],
      governance_limitations: ["no automated personal identification · advisory reference only"],
      next_human_action: "data_reviewer ratifies the per-point enrichment",
      recommended_surface: "evidence",
    },
    {
      id: "WF-ENRICH-04",
      title: "Enrich polygon data with a custom source",
      description:
        "Per-polygon reference attribute derivation, anchored to conceptual zones only.",
      required_inputs: ["polygon set (conceptual · not official)", "custom source", "reviewer signoff"],
      candidate_outputs: ["per-polygon candidate attribute row"],
      linked_bdii_objects: ["Source Family", "Governance Constraint"],
      governance_limitations: [
        "polygons are conceptual · no official Riyadh municipal boundary inferred",
      ],
      next_human_action: "GIS_reviewer ratifies conceptual polygon assumption",
      recommended_surface: "map",
    },
    {
      id: "WF-ENRICH-05",
      title: "Enrich trade areas using H3 indexes",
      description:
        "H3-indexed reference attribution for candidate trade-area framings. Advisory only.",
      required_inputs: ["candidate trade-area definition", "H3 resolution", "reviewer signoff"],
      candidate_outputs: ["per-H3-cell candidate attribute"],
      linked_bdii_objects: ["Source Family", "Evidence Token"],
      governance_limitations: [
        "trade-area framing is candidate · no investment recommendation · no ROI claim",
      ],
      next_human_action: "business_reviewer interviews before pilot framing is used",
      recommended_surface: "applications",
    },
  ],
};

// -----------------------------------------------------------------
// 4 · Evidence Preparation (Data Preparation)
// -----------------------------------------------------------------
const F_PREP: WorkflowFamily = {
  id: "WF-PREP",
  source_reference_label: "Data Preparation",
  bdii_label: "Evidence Preparation",
  description:
    "Reviewer-facing preparation templates for shaping candidate evidence tables before they are referenced in advisory surfaces.",
  platform_layer: "Evidence Intelligence · Data Science Foundation",
  buyer_relevance:
    "Communicates that preparation is governed and reviewer-signed, not opaque automated ETL.",
  governance_posture:
    "Preparation only · no production warehouse claim · no official dataset claim · candidate-only.",
  status: "candidate_config",
  connects_to: ["evidence", "observatory", "developer"],
  templates: [
    {
      id: "WF-PREP-01",
      title: "Filter columns",
      description: "Reviewer-driven column selection on a candidate table.",
      required_inputs: ["candidate table", "reviewer-selected column set"],
      candidate_outputs: ["narrower candidate table"],
      linked_bdii_objects: ["Evidence Token"],
      governance_limitations: ["candidate-only · no production warehouse claim"],
      next_human_action: "data_reviewer signs the column-selection intent",
      recommended_surface: "evidence",
    },
    {
      id: "WF-PREP-02",
      title: "Filter rows using a custom geography",
      description: "Filter rows by candidate (conceptual) geography boundary.",
      required_inputs: ["candidate table", "candidate geography (conceptual)"],
      candidate_outputs: ["geography-scoped candidate table"],
      linked_bdii_objects: ["Source Family", "Evidence Token"],
      governance_limitations: ["geography is conceptual · no official boundary inferred"],
      next_human_action: "GIS_reviewer signs the conceptual geography",
      recommended_surface: "map",
    },
    {
      id: "WF-PREP-03",
      title: "Generate calculated column from multi-column formula",
      description: "Reviewer-defined derived column from a documented formula.",
      required_inputs: ["candidate table", "reviewer-signed formula text"],
      candidate_outputs: ["derived candidate column"],
      linked_bdii_objects: ["Formula", "Evidence Token"],
      governance_limitations: ["formula must be reviewer-documented · no opaque derivation"],
      next_human_action: "data_reviewer signs the formula text",
      recommended_surface: "developer",
    },
    {
      id: "WF-PREP-04",
      title: "Join two datasets and group by property",
      description: "Reviewer-defined join + group-by on candidate tables.",
      required_inputs: ["two candidate tables", "reviewer-signed join key", "group property"],
      candidate_outputs: ["aggregated candidate table"],
      linked_bdii_objects: ["Source Family", "Evidence Token"],
      governance_limitations: ["candidate-only · no production aggregation claim"],
      next_human_action: "data_reviewer signs the join intent",
      recommended_surface: "evidence",
    },
    {
      id: "WF-PREP-05",
      title: "Join datasets by common column",
      description: "Reviewer-defined join on a common key.",
      required_inputs: ["two candidate tables", "common column"],
      candidate_outputs: ["joined candidate table"],
      linked_bdii_objects: ["Evidence Token"],
      governance_limitations: ["candidate-only"],
      next_human_action: "data_reviewer signs the join intent",
      recommended_surface: "evidence",
    },
    {
      id: "WF-PREP-06",
      title: "Normalize variable to index between 0 and 1",
      description: "Min-max normalization of a candidate variable to a 0..1 index.",
      required_inputs: ["candidate variable column", "min/max bounds (reviewer-signed)"],
      candidate_outputs: ["normalized candidate index column"],
      linked_bdii_objects: ["Formula", "Evidence Token"],
      governance_limitations: [
        "index is descriptive · not a readiness/score · not a forecast",
      ],
      next_human_action: "data_reviewer ratifies normalization bounds",
      recommended_surface: "developer",
    },
    {
      id: "WF-PREP-07",
      title: "Rank and limit a table",
      description: "Reviewer-defined ranking and top-N limit on a candidate table.",
      required_inputs: ["candidate table", "rank column", "limit N"],
      candidate_outputs: ["top-N candidate slice"],
      linked_bdii_objects: ["Evidence Token"],
      governance_limitations: ["ranking is reference only · not an investment/ROI ranking"],
      next_human_action: "data_reviewer signs the rank intent",
      recommended_surface: "evidence",
    },
    {
      id: "WF-PREP-08",
      title: "Union two data sources with same schema",
      description: "Reviewer-confirmed union of two same-schema candidate tables.",
      required_inputs: ["two candidate tables with identical schema"],
      candidate_outputs: ["unioned candidate table"],
      linked_bdii_objects: ["Source Family", "Evidence Token"],
      governance_limitations: ["candidate-only · no official dataset claim"],
      next_human_action: "data_reviewer signs the union intent",
      recommended_surface: "evidence",
    },
  ],
};

// -----------------------------------------------------------------
// 5 · Spatial Evidence Generation (Generating New Spatial Data)
// -----------------------------------------------------------------
const F_SPGEN: WorkflowFamily = {
  id: "WF-SPGEN",
  source_reference_label: "Generating New Spatial Data",
  bdii_label: "Spatial Evidence Generation",
  description:
    "Configuration of templates that derive candidate spatial features (routes, isochrones, points, geocoded geometries). All output is candidate geometry; nothing in this family produces an official boundary.",
  platform_layer: "Spatial Index Foundation · Evidence Intelligence",
  buyer_relevance:
    "Shows municipal stakeholders how derived spatial framing is generated under explicit reviewer signoff.",
  governance_posture:
    "Candidate geometry only · not official municipal boundary · no enforcement use.",
  status: "candidate_config",
  connects_to: ["map", "evidence", "developer"],
  templates: [
    {
      id: "WF-SPGEN-01",
      title: "Create routes from origin/destination dataset",
      description:
        "Derive candidate route geometries between reviewer-signed origin/destination pairs.",
      required_inputs: ["origin/destination candidate pairs", "reviewer-signed routing intent"],
      candidate_outputs: ["candidate route geometry set"],
      linked_bdii_objects: ["Source Family"],
      governance_limitations: ["routes are candidate · no operational dispatch use"],
      next_human_action: "GIS_reviewer signs routing intent",
      recommended_surface: "map",
    },
    {
      id: "WF-SPGEN-02",
      title: "Draw custom geographies",
      description: "Author candidate (conceptual) geography boundaries.",
      required_inputs: ["reviewer-drawn polygon intent"],
      candidate_outputs: ["candidate conceptual polygon"],
      linked_bdii_objects: ["Governance Constraint"],
      governance_limitations: [
        "conceptual polygon only · no official Riyadh municipal boundary inferred",
      ],
      next_human_action: "GIS_reviewer ratifies the conceptual polygon",
      recommended_surface: "map",
    },
    {
      id: "WF-SPGEN-03",
      title: "Generate isochrones from point data",
      description:
        "Derive candidate isochrone polygons (travel-time bands) from reviewer-signed points.",
      required_inputs: ["point set", "isochrone time bands", "reviewer signoff"],
      candidate_outputs: ["candidate isochrone polygon set"],
      linked_bdii_objects: ["Source Family"],
      governance_limitations: [
        "isochrones are reference only · not service-level commitments",
      ],
      next_human_action: "GIS_reviewer signs the isochrone band assumptions",
      recommended_surface: "map",
    },
    {
      id: "WF-SPGEN-04",
      title: "Generate points from latitude and longitude columns",
      description: "Materialize candidate point geometries from a coordinate table.",
      required_inputs: ["table with lat/lon columns"],
      candidate_outputs: ["candidate point geometry set"],
      linked_bdii_objects: ["Evidence Token", "Source Family"],
      governance_limitations: ["candidate-only · no personal identification framing"],
      next_human_action: "data_reviewer signs the source coordinate provenance",
      recommended_surface: "evidence",
    },
    {
      id: "WF-SPGEN-05",
      title: "Geocode street addresses into point geometries",
      description: "Reviewer-mediated geocoding of candidate addresses. No live geocoder is called from /v2/overview today.",
      required_inputs: ["address table", "reviewer-signed geocoder reference"],
      candidate_outputs: ["candidate point geometry set"],
      linked_bdii_objects: ["Source Family"],
      governance_limitations: [
        "no live external geocoder call · candidate geometry only",
      ],
      next_human_action: "data_reviewer signs the geocoder provenance",
      recommended_surface: "evidence",
    },
  ],
};

// -----------------------------------------------------------------
// 6 · Insurance & Real Estate Risk Intelligence (Insurance)
// -----------------------------------------------------------------
const F_INS: WorkflowFamily = {
  id: "WF-INS",
  source_reference_label: "Insurance",
  bdii_label: "Insurance & Real Estate Risk Intelligence",
  description:
    "Configuration of advisory risk-reference templates relevant to insurance and real-estate context. Nothing in this family produces an underwriting decision or a premium.",
  platform_layer: "Economic Intelligence · Decision Kernel",
  buyer_relevance:
    "Speaks to insurance & real-estate stakeholders without making any underwriting or pricing claim.",
  governance_posture:
    "Advisory risk reference only · no underwriting decision · no pricing decision · no automated claim decision.",
  status: "candidate_config",
  connects_to: ["applications", "governance"],
  templates: [
    {
      id: "WF-INS-01",
      title: "Assess disaster damage exposure (reference framing)",
      description:
        "Describe the inputs and reviewer signoffs a candidate damage-exposure reference card would require.",
      required_inputs: [
        "candidate hazard reference",
        "candidate asset set (reviewer-signed)",
      ],
      candidate_outputs: ["per-asset exposure reference card (advisory)"],
      linked_bdii_objects: ["Governance Constraint", "Source Family"],
      governance_limitations: [
        "no underwriting · no premium · no automated claim decision",
      ],
      next_human_action: "insurance reviewer interview before any pilot framing",
      recommended_surface: "applications",
    },
    {
      id: "WF-INS-02",
      title: "Calculate risk reference for a journey",
      description:
        "Configure a per-journey advisory risk reference. No automated routing consequence.",
      required_inputs: ["candidate journey path", "reviewer-signed risk reference table"],
      candidate_outputs: ["per-journey advisory risk reference"],
      linked_bdii_objects: ["Governance Constraint"],
      governance_limitations: [
        "advisory reference only · no operational routing decision",
      ],
      next_human_action: "operations reviewer attends to advisory output before acting",
      recommended_surface: "applications",
    },
    {
      id: "WF-INS-03",
      title: "Coastal flood reference",
      description:
        "Configure a coastal-flood reference card. Advisory framing only.",
      required_inputs: [
        "candidate coastal elevation reference",
        "candidate asset set",
      ],
      candidate_outputs: ["per-asset coastal-flood advisory reference"],
      linked_bdii_objects: ["Source Family", "Governance Constraint"],
      governance_limitations: [
        "advisory only · no claim decision · no surveillance framing",
      ],
      next_human_action: "GIS_reviewer signs the coastal reference assumption",
      recommended_surface: "map",
    },
    {
      id: "WF-INS-04",
      title: "Flood reference assessment",
      description: "Configure a candidate flood-reference card for advisory use.",
      required_inputs: [
        "candidate flood reference layer",
        "candidate asset set",
      ],
      candidate_outputs: ["per-asset flood advisory reference"],
      linked_bdii_objects: ["Source Family", "Governance Constraint"],
      governance_limitations: ["advisory only · no claim decision"],
      next_human_action: "insurance reviewer interview before pilot framing",
      recommended_surface: "applications",
    },
    {
      id: "WF-INS-05",
      title: "Insurance underwriting reference (advisory)",
      description:
        "Documents which evidence rows an advisory underwriting reference card would consume. No live underwriting takes place.",
      required_inputs: ["candidate evidence row set", "reviewer-signed scope intent"],
      candidate_outputs: ["advisory reference card (per asset)"],
      linked_bdii_objects: ["Governance Constraint", "Decision Token"],
      governance_limitations: [
        "no underwriting · no premium · no automated decision · advisory reference only",
      ],
      next_human_action: "insurance reviewer interview · Bader Alabddan ratifies",
      recommended_surface: "governance",
    },
  ],
};

// -----------------------------------------------------------------
// 7 · Municipal Operational Planning (Operational Planning)
// -----------------------------------------------------------------
const F_OPS: WorkflowFamily = {
  id: "WF-OPS",
  source_reference_label: "Operational Planning",
  bdii_label: "Municipal Operational Planning",
  description:
    "Configuration of advisory planning-support templates. No automated operational decision is produced.",
  platform_layer: "Decision Kernel · Micro Intelligence",
  buyer_relevance:
    "Shows municipal directors the planning-support shape without implying automation of operational decisions.",
  governance_posture:
    "Planning support only · no automated operational decision · municipal review remains the sole producer.",
  status: "candidate_config",
  connects_to: ["applications", "map", "governance"],
  templates: [
    {
      id: "WF-OPS-01",
      title: "Location allocation reference · maximize coverage (advisory)",
      description:
        "Configure inputs for an advisory coverage-maximization reference card.",
      required_inputs: ["candidate demand layer", "candidate facility layer"],
      candidate_outputs: ["advisory coverage reference card"],
      linked_bdii_objects: ["Source Family", "Decision Token"],
      governance_limitations: ["no automated dispatch · advisory reference only"],
      next_human_action: "municipal reviewer interviews before any pilot use",
      recommended_surface: "applications",
    },
    {
      id: "WF-OPS-02",
      title: "Location allocation reference · minimize cost (advisory)",
      description:
        "Configure inputs for an advisory cost-minimization reference card.",
      required_inputs: ["candidate demand layer", "candidate facility layer", "cost reference table"],
      candidate_outputs: ["advisory cost reference card"],
      linked_bdii_objects: ["Source Family", "Decision Token"],
      governance_limitations: ["no automated budget decision · advisory reference only"],
      next_human_action: "municipal reviewer interviews before any pilot use",
      recommended_surface: "applications",
    },
    {
      id: "WF-OPS-03",
      title: "Workload distribution reference through territory balancing (advisory)",
      description:
        "Configure inputs for an advisory territory-balancing reference card.",
      required_inputs: ["candidate workload table", "candidate territory definitions"],
      candidate_outputs: ["advisory territory-balance reference card"],
      linked_bdii_objects: ["Source Family", "Governance Constraint"],
      governance_limitations: [
        "no automated staffing decision · no surveillance framing · advisory only",
      ],
      next_human_action: "municipal reviewer reviews advisory output before acting",
      recommended_surface: "applications",
    },
  ],
};

// -----------------------------------------------------------------
// 8 · Urban Visibility & Asset Placement (Out of Home Advertising)
// -----------------------------------------------------------------
const F_OOH: WorkflowFamily = {
  id: "WF-OOH",
  source_reference_label: "Out of Home Advertising",
  bdii_label: "Urban Visibility & Asset Placement",
  description:
    "Configuration of advisory urban-visibility reference cards. No personal targeting, no surveillance framing.",
  platform_layer: "Micro Intelligence · Economic Intelligence",
  buyer_relevance:
    "Speaks to urban placement & visibility planners without ever implying personal targeting.",
  governance_posture:
    "Urban visibility reference only · no personal targeting · no surveillance · no individual identification.",
  status: "candidate_config",
  connects_to: ["map", "applications"],
  templates: [
    {
      id: "WF-OOH-01",
      title: "Identify candidate placement zones for an aggregate audience reference",
      description:
        "Configure inputs for a candidate placement-zone reference card. Aggregate-only audience reference; no individual identification.",
      required_inputs: ["candidate placement zone set", "aggregate audience reference"],
      candidate_outputs: ["per-zone placement advisory reference"],
      linked_bdii_objects: ["Source Family", "Governance Constraint"],
      governance_limitations: [
        "aggregate reference only · no individual identification · no surveillance",
      ],
      next_human_action: "urban reviewer signs the aggregate audience reference",
      recommended_surface: "map",
    },
  ],
};

// -----------------------------------------------------------------
// 9 · Market Demand & Site Selection (Retail and CPG)
// -----------------------------------------------------------------
const F_RETAIL: WorkflowFamily = {
  id: "WF-RETAIL",
  source_reference_label: "Retail and CPG",
  bdii_label: "Market Demand & Site Selection",
  description:
    "Configuration of advisory market-signal reference cards relevant to retail/CPG framing. No investment recommendation, no ROI claim.",
  platform_layer: "Economic Intelligence · Decision Kernel",
  buyer_relevance:
    "Speaks to retail/CPG stakeholders without making any market-prediction or ROI claim.",
  governance_posture:
    "Candidate market signal only · no investment recommendation · no guaranteed return · no automated underwriting.",
  status: "candidate_config",
  connects_to: ["applications", "map", "governance"],
  templates: [
    {
      id: "WF-RETAIL-01",
      title: "Commercial hotspot reference for candidate site selection",
      description:
        "Configure inputs for a candidate commercial-hotspot reference card.",
      required_inputs: ["candidate POI set", "candidate population reference"],
      candidate_outputs: ["per-zone commercial-hotspot advisory reference"],
      linked_bdii_objects: ["Source Family", "Decision Token"],
      governance_limitations: [
        "candidate reference only · no investment recommendation · no expected return",
      ],
      next_human_action: "business_reviewer interview before pilot framing",
      recommended_surface: "applications",
    },
    {
      id: "WF-RETAIL-02",
      title: "Reference population around top-performing candidate sites",
      description:
        "Configure inputs for an advisory candidate-population reference card around reviewer-tagged sites.",
      required_inputs: ["candidate site set", "candidate population reference"],
      candidate_outputs: ["per-site population advisory reference"],
      linked_bdii_objects: ["Source Family"],
      governance_limitations: ["aggregate reference only · no individual identification"],
      next_human_action: "data_reviewer signs the population reference provenance",
      recommended_surface: "observatory",
    },
  ],
};

// -----------------------------------------------------------------
// 10 · Warehouse ML Readiness (Snowflake ML)
// -----------------------------------------------------------------
const F_SNOWML: WorkflowFamily = {
  id: "WF-SNOWML",
  source_reference_label: "Snowflake ML",
  bdii_label: "Warehouse ML Readiness",
  description:
    "Documents the shape a future warehouse-side ML readiness layer would take. No external warehouse is contacted; no ML is activated.",
  platform_layer: "Data Warehouse / PostgreSQL · Machine Learning",
  buyer_relevance:
    "Speaks to enterprise data teams who will eventually ask 'where does this run' — answer: future gate, never today.",
  governance_posture:
    "Future gated · no warehouse execution · no ML activation · no external connection.",
  status: "future_gated",
  connects_to: ["developer", "governance"],
  templates: [
    {
      id: "WF-SNOWML-01",
      title: "Configure classification model reference (warehouse-side)",
      description:
        "Configuration shape only; no warehouse call, no model creation.",
      required_inputs: ["future warehouse connection reference", "reviewer-signed scope intent"],
      candidate_outputs: ["configuration card placeholder"],
      linked_bdii_objects: ["Governance Constraint", "Kernel Layer"],
      governance_limitations: ["no warehouse execution · no model · no prediction"],
      next_human_action: "Bader Alabddan authorizes future DB gate + future ML gate",
      recommended_surface: "governance",
    },
    {
      id: "WF-SNOWML-02",
      title: "Configure forecasting reference (warehouse-side)",
      description:
        "Configuration shape only. /v2/overview today emits NO forecast.",
      required_inputs: ["future warehouse connection reference", "reviewer-signed scope intent"],
      candidate_outputs: ["configuration card placeholder"],
      linked_bdii_objects: ["Governance Constraint", "Kernel Layer"],
      governance_limitations: ["no warehouse execution · no forecast · no prediction"],
      next_human_action: "Bader Alabddan authorizes future DB gate + future ML gate",
      recommended_surface: "governance",
    },
  ],
};

// -----------------------------------------------------------------
// 11 · Spatial Relationship Analysis (Spatial Analysis)
// -----------------------------------------------------------------
const F_SPANALYSIS: WorkflowFamily = {
  id: "WF-SPANALYSIS",
  source_reference_label: "Spatial Analysis",
  bdii_label: "Spatial Relationship Analysis",
  description:
    "Configuration of candidate spatial-relationship analyses. Outputs are descriptive only; no automated decision is implied.",
  platform_layer: "Relationship Intelligence · Mathematical Core",
  buyer_relevance:
    "Demonstrates the descriptive spatial-relationship layer to GIS reviewers and decision officers.",
  governance_posture:
    "Candidate relationship analysis only · no automated decision · no causal inference.",
  status: "candidate_config",
  connects_to: ["map", "evidence", "developer"],
  templates: [
    {
      id: "WF-SPANALYSIS-01",
      title: "Aggregate point data into polygons (descriptive)",
      description: "Per-polygon descriptive point count and reference statistics.",
      required_inputs: ["point set", "polygon set (conceptual)"],
      candidate_outputs: ["per-polygon descriptive count column"],
      linked_bdii_objects: ["Evidence Token", "Source Family"],
      governance_limitations: ["descriptive only · no decision automation"],
      next_human_action: "data_reviewer signs the aggregation intent",
      recommended_surface: "evidence",
    },
    {
      id: "WF-SPANALYSIS-02",
      title: "Custom select using two inputs (reviewer-defined)",
      description:
        "Reviewer-defined join / filter between two candidate sets. UI configuration only; no live SQL is executed.",
      required_inputs: ["two candidate inputs", "reviewer-signed select expression"],
      candidate_outputs: ["candidate joined slice"],
      linked_bdii_objects: ["Evidence Token", "Formula"],
      governance_limitations: ["no live database call · configuration only"],
      next_human_action: "data_reviewer signs the select expression intent",
      recommended_surface: "developer",
    },
    {
      id: "WF-SPANALYSIS-03",
      title: "Find descriptive clusters with K-Means reference",
      description:
        "Configuration shape for a descriptive clustering reference. Clusters are descriptive; not customer segmentation.",
      required_inputs: ["candidate point set", "reviewer-signed k value"],
      candidate_outputs: ["per-point candidate cluster label"],
      linked_bdii_objects: ["Source Family", "Formula"],
      governance_limitations: [
        "descriptive clustering only · no individual identification · no automated segmentation",
      ],
      next_human_action: "data_reviewer signs the cluster reference intent",
      recommended_surface: "developer",
    },
    {
      id: "WF-SPANALYSIS-04",
      title: "Find points within polygons and add properties",
      description: "Per-point membership in candidate polygons + attribute attachment.",
      required_inputs: ["point set", "polygon set"],
      candidate_outputs: ["per-point candidate attribute row"],
      linked_bdii_objects: ["Evidence Token", "Source Family"],
      governance_limitations: ["candidate-only · advisory reference"],
      next_human_action: "data_reviewer signs the membership rule",
      recommended_surface: "map",
    },
    {
      id: "WF-SPANALYSIS-05",
      title: "Generate Voronoi polygons from points (descriptive)",
      description:
        "Construct descriptive Voronoi cells around candidate points. Not an official zone definition.",
      required_inputs: ["candidate point set"],
      candidate_outputs: ["candidate Voronoi polygon set"],
      linked_bdii_objects: ["Source Family"],
      governance_limitations: [
        "descriptive geometry only · no official boundary inferred",
      ],
      next_human_action: "GIS_reviewer signs the Voronoi reference intent",
      recommended_surface: "map",
    },
  ],
};

// -----------------------------------------------------------------
// 12 · Spatial Index Foundation (Spatial Indexes)
// -----------------------------------------------------------------
const F_SPINDEX: WorkflowFamily = {
  id: "WF-SPINDEX",
  source_reference_label: "Spatial Indexes",
  bdii_label: "Spatial Index Foundation",
  description:
    "Configuration of candidate spatial-index transforms (H3 / Quadbin). The indexing foundation is descriptive only; it does not produce an official zone definition.",
  platform_layer: "Spatial Index Foundation · Evidence Intelligence",
  buyer_relevance:
    "Shows that the spatial substrate is auditable and grid-based, not opaque.",
  governance_posture:
    "Indexing foundation only · no official boundary · no final zone approval.",
  status: "candidate_config",
  connects_to: ["map", "evidence", "developer"],
  templates: [
    {
      id: "WF-SPINDEX-01",
      title: "Aggregate point data into Quadbin grid",
      description: "Per-Quadbin candidate aggregate from a point set.",
      required_inputs: ["candidate point set", "Quadbin resolution"],
      candidate_outputs: ["per-Quadbin candidate aggregate row"],
      linked_bdii_objects: ["Evidence Token", "Source Family"],
      governance_limitations: ["candidate-only · descriptive index"],
      next_human_action: "data_reviewer signs the resolution intent",
      recommended_surface: "evidence",
    },
    {
      id: "WF-SPINDEX-02",
      title: "Aggregate point data into H3 grid",
      description: "Per-H3-cell candidate aggregate from a point set.",
      required_inputs: ["candidate point set", "H3 resolution"],
      candidate_outputs: ["per-H3 candidate aggregate row"],
      linked_bdii_objects: ["Evidence Token", "Source Family"],
      governance_limitations: ["candidate-only · descriptive index"],
      next_human_action: "data_reviewer signs the resolution intent",
      recommended_surface: "evidence",
    },
    {
      id: "WF-SPINDEX-03",
      title: "Polyfill polygons with H3 indexes",
      description:
        "Convert candidate polygons to H3-cell coverings (no official boundary asserted).",
      required_inputs: ["candidate polygon set", "H3 resolution"],
      candidate_outputs: ["per-polygon H3-cell candidate set"],
      linked_bdii_objects: ["Source Family", "Governance Constraint"],
      governance_limitations: [
        "polygons are conceptual · no official Riyadh municipal boundary",
      ],
      next_human_action: "GIS_reviewer signs the conceptual polygon source",
      recommended_surface: "map",
    },
    {
      id: "WF-SPINDEX-04",
      title: "Use H3 K-rings to define candidate areas of influence",
      description:
        "Build candidate K-ring areas around reviewer-signed center cells. Descriptive only.",
      required_inputs: ["center H3 cells", "K value", "reviewer signoff"],
      candidate_outputs: ["per-center K-ring candidate area"],
      linked_bdii_objects: ["Source Family"],
      governance_limitations: [
        "descriptive area of influence · no operational consequence",
      ],
      next_human_action: "GIS_reviewer signs the K-ring intent",
      recommended_surface: "map",
    },
  ],
};

// -----------------------------------------------------------------
// 13 · Statistical Intelligence (Statistics)
// -----------------------------------------------------------------
const F_STATS: WorkflowFamily = {
  id: "WF-STATS",
  source_reference_label: "Statistics",
  bdii_label: "Statistical Intelligence",
  description:
    "Configuration of descriptive statistical-reference templates. Templates that would otherwise produce a forecast are explicitly held back to a reviewer-signed reference card.",
  platform_layer: "Mathematical Core · Data Science Foundation",
  buyer_relevance:
    "Reassures statisticians and analysts that the descriptive layer exists, without overpromising forecasts.",
  governance_posture:
    "Statistical reference only · no forecast · no prediction · no production model.",
  status: "candidate_config",
  connects_to: ["developer", "observatory", "governance"],
  templates: [
    {
      id: "WF-STATS-01",
      title: "Apply GWR reference to model local spatial relationships (descriptive)",
      description:
        "Configure inputs for a descriptive geographically-weighted regression reference. Descriptive only.",
      required_inputs: ["candidate variable", "candidate covariates", "reviewer-signed bandwidth"],
      candidate_outputs: ["per-cell candidate coefficient reference"],
      linked_bdii_objects: ["Formula", "Source Family"],
      governance_limitations: ["descriptive coefficient · no forecast · no production model"],
      next_human_action: "data_reviewer signs the descriptive reference intent",
      recommended_surface: "developer",
    },
    {
      id: "WF-STATS-02",
      title: "Compute spatial auto-correlation reference of POI locations",
      description:
        "Descriptive autocorrelation reference (Moran-style framing). Descriptive only.",
      required_inputs: ["POI point set"],
      candidate_outputs: ["candidate descriptive autocorrelation statistic"],
      linked_bdii_objects: ["Source Family", "Formula"],
      governance_limitations: ["descriptive only · no decision automation"],
      next_human_action: "data_reviewer signs the statistic reference intent",
      recommended_surface: "observatory",
    },
    {
      id: "WF-STATS-03",
      title: "Create composite reference score with supervised method (descriptive)",
      description:
        "Configuration of a descriptive composite-reference score using a reviewer-signed supervised reference table. /v2/overview emits no live supervised score.",
      required_inputs: ["candidate variable set", "reviewer-signed weighting table"],
      candidate_outputs: ["descriptive composite-reference column"],
      linked_bdii_objects: ["Formula", "Source Family"],
      governance_limitations: [
        "descriptive composite reference · no production score · no readiness label",
      ],
      next_human_action: "governance_reviewer ratifies the weighting table",
      recommended_surface: "developer",
    },
    {
      id: "WF-STATS-04",
      title: "Create composite reference score with unsupervised method (descriptive)",
      description:
        "Configuration of a descriptive composite score using a reviewer-signed unsupervised reference. Descriptive only.",
      required_inputs: ["candidate variable set", "reviewer-signed reference cluster method"],
      candidate_outputs: ["descriptive composite-reference column"],
      linked_bdii_objects: ["Formula", "Source Family"],
      governance_limitations: ["descriptive only · no production score · no readiness label"],
      next_human_action: "governance_reviewer ratifies the method choice",
      recommended_surface: "developer",
    },
    {
      id: "WF-STATS-05",
      title: "Detect candidate space-time anomalies (descriptive)",
      description:
        "Configuration of a descriptive space-time anomaly reference card. Candidate only.",
      required_inputs: ["candidate space-time table", "reviewer-signed anomaly threshold"],
      candidate_outputs: ["per-cell anomaly reference flag (descriptive)"],
      linked_bdii_objects: ["Source Family", "Decision Token"],
      governance_limitations: [
        "descriptive flag only · no enforcement framing · advisory reference",
      ],
      next_human_action: "data_reviewer signs the threshold intent",
      recommended_surface: "observatory",
    },
    {
      id: "WF-STATS-06",
      title: "Identify candidate hotspots of a specific POI type (descriptive)",
      description: "Descriptive hotspot reference for a reviewer-selected POI type.",
      required_inputs: ["POI point set", "reviewer-signed type filter"],
      candidate_outputs: ["per-zone descriptive hotspot reference"],
      linked_bdii_objects: ["Source Family"],
      governance_limitations: ["descriptive reference only · no decision automation"],
      next_human_action: "data_reviewer signs the type filter",
      recommended_surface: "map",
    },
    {
      id: "WF-STATS-07",
      title: "Space-time hotspot reference analysis (descriptive)",
      description:
        "Configuration of a descriptive space-time hotspot reference. Descriptive only.",
      required_inputs: ["candidate space-time table", "reviewer-signed parameters"],
      candidate_outputs: ["per-cell space-time descriptive hotspot reference"],
      linked_bdii_objects: ["Source Family", "Formula"],
      governance_limitations: ["descriptive only · no forecast · no enforcement framing"],
      next_human_action: "data_reviewer signs the parameter intent",
      recommended_surface: "observatory",
    },
    {
      id: "WF-STATS-08",
      title: "Space-time hotspot reference classification (descriptive)",
      description:
        "Descriptive classification of space-time hotspot cells. Descriptive only.",
      required_inputs: ["space-time hotspot reference", "reviewer-signed class scheme"],
      candidate_outputs: ["per-cell descriptive class label"],
      linked_bdii_objects: ["Formula", "Source Family"],
      governance_limitations: ["descriptive label only · no production class"],
      next_human_action: "data_reviewer signs the class scheme",
      recommended_surface: "developer",
    },
    {
      id: "WF-STATS-09",
      title: "Time-series clustering reference (descriptive)",
      description:
        "Configuration of a descriptive time-series clustering reference. Descriptive only.",
      required_inputs: ["candidate time-series set", "reviewer-signed K"],
      candidate_outputs: ["per-series descriptive cluster label"],
      linked_bdii_objects: ["Formula", "Source Family"],
      governance_limitations: ["descriptive label only · no forecast"],
      next_human_action: "data_reviewer signs the K value",
      recommended_surface: "developer",
    },
  ],
};

// -----------------------------------------------------------------
// 14 · Infrastructure & Connectivity Intelligence (Telco)
// -----------------------------------------------------------------
const F_TELCO: WorkflowFamily = {
  id: "WF-TELCO",
  source_reference_label: "Telco",
  bdii_label: "Infrastructure & Connectivity Intelligence",
  description:
    "Configuration of advisory infrastructure & connectivity-reference cards. No individual identification, no surveillance, no telecom operational decision.",
  platform_layer: "Micro Intelligence · Decision Kernel",
  buyer_relevance:
    "Speaks to telecom & infrastructure planners without implying live operational control.",
  governance_posture:
    "Infrastructure planning reference only · no individual identification · no surveillance · no telecom operational decision.",
  status: "candidate_config",
  connects_to: ["map", "applications", "governance"],
  templates: [
    {
      id: "WF-TELCO-01",
      title: "Competitor coverage reference for connectivity providers (advisory)",
      description: "Configure a candidate competitor-coverage reference card.",
      required_inputs: ["candidate competitor coverage layer set"],
      candidate_outputs: ["per-zone competitor-coverage advisory reference"],
      linked_bdii_objects: ["Source Family"],
      governance_limitations: ["advisory only · no operational decision"],
      next_human_action: "infrastructure reviewer interviews before pilot framing",
      recommended_surface: "applications",
    },
    {
      id: "WF-TELCO-02",
      title: "Emergency response reference (advisory)",
      description: "Configure an advisory emergency-response reference card.",
      required_inputs: ["candidate facility layer", "candidate incident reference set"],
      candidate_outputs: ["per-incident advisory response reference"],
      linked_bdii_objects: ["Source Family", "Governance Constraint"],
      governance_limitations: [
        "advisory reference only · no automated dispatch · municipal reviewer attends",
      ],
      next_human_action: "municipal reviewer attends to advisory reference before acting",
      recommended_surface: "applications",
    },
    {
      id: "WF-TELCO-03",
      title: "Reference population covered by candidate connectivity cell network (aggregate)",
      description:
        "Per-cell aggregate-population advisory reference. No individual identification.",
      required_inputs: ["candidate cell coverage layer", "aggregate population reference"],
      candidate_outputs: ["per-cell aggregate-population advisory reference"],
      linked_bdii_objects: ["Source Family"],
      governance_limitations: ["aggregate reference only · no individual identification"],
      next_human_action: "data_reviewer signs the aggregate reference",
      recommended_surface: "observatory",
    },
    {
      id: "WF-TELCO-04",
      title: "Aggregate signal pings reference within candidate area (advisory)",
      description:
        "Aggregate ping-reference card. No individual identification, no surveillance.",
      required_inputs: ["aggregate ping reference layer", "candidate area"],
      candidate_outputs: ["per-area aggregate ping advisory reference"],
      linked_bdii_objects: ["Source Family", "Governance Constraint"],
      governance_limitations: [
        "aggregate only · no individual identification · no surveillance",
      ],
      next_human_action: "data_reviewer signs the aggregate reference",
      recommended_surface: "applications",
    },
    {
      id: "WF-TELCO-05",
      title: "New tower site reference selection (advisory)",
      description: "Configure a candidate tower-site reference card.",
      required_inputs: ["candidate site set", "candidate coverage reference"],
      candidate_outputs: ["per-site advisory reference"],
      linked_bdii_objects: ["Source Family", "Decision Token"],
      governance_limitations: ["advisory reference only · no operational siting decision"],
      next_human_action: "infrastructure reviewer interviews before pilot framing",
      recommended_surface: "applications",
    },
    {
      id: "WF-TELCO-06",
      title: "Path profile and path loss reference",
      description: "Descriptive path profile/path-loss reference card.",
      required_inputs: ["candidate terrain reference", "candidate transmit/receive pair"],
      candidate_outputs: ["per-pair descriptive path-loss reference"],
      linked_bdii_objects: ["Source Family", "Formula"],
      governance_limitations: ["descriptive only · advisory reference"],
      next_human_action: "data_reviewer signs the terrain reference",
      recommended_surface: "developer",
    },
    {
      id: "WF-TELCO-07",
      title: "Path profile and path loss reference with raster sources",
      description: "Raster-based descriptive path-loss reference card.",
      required_inputs: ["candidate raster terrain reference", "candidate transmit/receive pair"],
      candidate_outputs: ["per-pair raster-based descriptive path-loss reference"],
      linked_bdii_objects: ["Source Family", "Formula"],
      governance_limitations: ["descriptive only · advisory reference"],
      next_human_action: "data_reviewer signs the raster terrain reference",
      recommended_surface: "developer",
    },
    {
      id: "WF-TELCO-08",
      title: "Aggregate population statistics reference (advisory)",
      description:
        "Aggregate population-statistics reference card. No individual identification.",
      required_inputs: ["aggregate population reference layer", "candidate area"],
      candidate_outputs: ["per-area aggregate population advisory reference"],
      linked_bdii_objects: ["Source Family"],
      governance_limitations: ["aggregate reference only · no individual identification"],
      next_human_action: "data_reviewer signs the aggregate reference",
      recommended_surface: "observatory",
    },
  ],
};

// -----------------------------------------------------------------
// Exported config
// -----------------------------------------------------------------
export const WORKFLOW_FAMILIES: WorkflowFamily[] = [
  F_BQML, F_CTRL, F_ENRICH, F_PREP, F_SPGEN, F_INS, F_OPS,
  F_OOH, F_RETAIL, F_SNOWML, F_SPANALYSIS, F_SPINDEX, F_STATS, F_TELCO,
];

export const ALLOWED_WORKFLOW_CTAS = [
  "Inspect workflow configuration",
  "View required evidence",
  "Prepare reviewer brief",
  "Add to candidate pilot scope",
  "Open decision trace",
] as const;

export const FORBIDDEN_WORKFLOW_CTAS = [
  "Run model",
  "Execute workflow",
  "Deploy",
  "Predict",
  "Optimize automatically",
  "Production-ready",
] as const;

export const WORKFLOW_STATUS_LABEL: Record<WorkflowStatus, string> = {
  candidate_config: "candidate config · advisory",
  future_gated:    "future-gated · BLOCKED today",
  blocked:         "BLOCKED · value=0",
};

export function totalTemplateCount(): number {
  return WORKFLOW_FAMILIES.reduce((acc, f) => acc + f.templates.length, 0);
}

// IR-42A-V2-DECISION-INTELLIGENCE-OS-UI-RESTRUCTURE — additive alias
// overlay. The original BDII labels remain authoritative on each
// WorkflowFamily; these aliases expose the GCC-urban-specific
// renames the new restructure brief calls for. Used by the upgraded
// WorkflowConfigurationLayer presentation. No semantic change.
export interface MunicipalAlias {
  family_id: string;
  reference_inspiration: string;
  gcc_urban_name: string;
  decision_layer_mapping: Array<
    | "Economic Intelligence"
    | "Macro Intelligence"
    | "Micro Intelligence"
    | "Data Science Intelligence"
    | "Mathematical Core"
    | "Governance"
    | "Dynamic UI"
  >;
}

export const MUNICIPAL_ALIASES: MunicipalAlias[] = [
  { family_id: "WF-BQML",        reference_inspiration: "BigQuery ML",                  gcc_urban_name: "Municipal Modeling Readiness",              decision_layer_mapping: ["Data Science Intelligence", "Mathematical Core", "Governance"] },
  { family_id: "WF-CTRL",        reference_inspiration: "Control Components",           gcc_urban_name: "Governance Control Components",             decision_layer_mapping: ["Governance", "Dynamic UI"] },
  { family_id: "WF-ENRICH",      reference_inspiration: "Data Enrichment",              gcc_urban_name: "Evidence Enrichment",                       decision_layer_mapping: ["Data Science Intelligence", "Micro Intelligence"] },
  { family_id: "WF-PREP",        reference_inspiration: "Data Preparation",             gcc_urban_name: "Evidence Preparation",                      decision_layer_mapping: ["Data Science Intelligence", "Mathematical Core"] },
  { family_id: "WF-SPGEN",       reference_inspiration: "Generating New Spatial Data",  gcc_urban_name: "Spatial Evidence Generation",               decision_layer_mapping: ["Micro Intelligence", "Data Science Intelligence"] },
  { family_id: "WF-INS",         reference_inspiration: "Insurance",                    gcc_urban_name: "Insurance & Real Estate Risk Intelligence", decision_layer_mapping: ["Economic Intelligence", "Mathematical Core", "Governance"] },
  { family_id: "WF-OPS",         reference_inspiration: "Operational Planning",         gcc_urban_name: "Municipal Operational Planning",            decision_layer_mapping: ["Micro Intelligence", "Governance"] },
  { family_id: "WF-OOH",         reference_inspiration: "Out of Home Advertising",      gcc_urban_name: "Urban Visibility & Asset Placement",        decision_layer_mapping: ["Micro Intelligence", "Economic Intelligence"] },
  { family_id: "WF-RETAIL",      reference_inspiration: "Retail & CPG",                 gcc_urban_name: "Market Demand & Site Selection",            decision_layer_mapping: ["Economic Intelligence", "Micro Intelligence"] },
  { family_id: "WF-SNOWML",      reference_inspiration: "Snowflake ML",                 gcc_urban_name: "Warehouse ML Readiness",                    decision_layer_mapping: ["Data Science Intelligence", "Governance"] },
  { family_id: "WF-SPANALYSIS",  reference_inspiration: "Spatial Analysis",             gcc_urban_name: "Spatial Relationship Analysis",             decision_layer_mapping: ["Mathematical Core", "Micro Intelligence"] },
  { family_id: "WF-SPINDEX",     reference_inspiration: "Spatial Indexes",              gcc_urban_name: "Spatial Index Foundation",                  decision_layer_mapping: ["Micro Intelligence", "Data Science Intelligence"] },
  { family_id: "WF-STATS",       reference_inspiration: "Statistics",                   gcc_urban_name: "Statistical Intelligence",                  decision_layer_mapping: ["Data Science Intelligence", "Mathematical Core"] },
  { family_id: "WF-TELCO",       reference_inspiration: "Telco",                        gcc_urban_name: "Infrastructure & Connectivity Intelligence",decision_layer_mapping: ["Micro Intelligence", "Economic Intelligence", "Governance"] },
];

export function findMunicipalAlias(family_id: string): MunicipalAlias | undefined {
  return MUNICIPAL_ALIASES.find((a) => a.family_id === family_id);
}
