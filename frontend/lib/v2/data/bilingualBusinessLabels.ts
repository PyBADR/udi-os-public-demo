// IR-42B-V2-R3-BILINGUAL-MAP-FIRST-VISUAL-INSPECT
//
// Static bilingual business-label registry for the V2 Map Operating
// Surface. English remains the primary enterprise language; Arabic is
// added as a secondary GCC-trust microcopy layer. No i18n framework,
// no language toggle, no new dependencies. Components consume these
// labels directly and render Arabic spans with `dir="rtl"`.

export interface BilingualLabel {
  en: string;
  ar: string;
}

// -----------------------------------------------------------------
// Platform · map surface · governance · evidence · review · readiness
// -----------------------------------------------------------------
export const V2_BILINGUAL_LABELS = {
  platform: {
    en: "GCC Urban Decision Intelligence OS",
    ar: "نظام ذكاء القرار الحضري الخليجي",
  } as BilingualLabel,
  map_operating_surface: {
    en: "Riyadh Evidence Operating Surface",
    ar: "سطح تشغيل أدلة الرياض",
  } as BilingualLabel,
  governance_advisory_only: {
    en: "Advisory only",
    ar: "للاسترشاد فقط",
  } as BilingualLabel,
  evidence_reference_imagery: {
    en: "Reference imagery",
    ar: "صور مرجعية",
  } as BilingualLabel,
  review_human_reviewed: {
    en: "Human-reviewed",
    ar: "خاضع للمراجعة البشرية",
  } as BilingualLabel,
  boundary_no_official: {
    en: "No official boundary",
    ar: "لا يمثل حدوداً رسمية",
  } as BilingualLabel,
  readiness_needs_more_evidence: {
    en: "Needs More Evidence",
    ar: "يحتاج إلى أدلة إضافية",
  } as BilingualLabel,
  next_human_action: {
    en: "Next human action",
    ar: "الإجراء البشري التالي",
  } as BilingualLabel,
} as const;

// -----------------------------------------------------------------
// Riyadh zone Arabic micro-labels (keyed by lower-case zone id used
// throughout riyadhMapConfig.ts AND by RIY-* upper form used by
// the evidence-pack binding).
// -----------------------------------------------------------------
export const V2_RIYADH_ZONE_AR: Record<string, string> = {
  core:        "مركز الرياض",
  north:       "شمال الرياض",
  south:       "جنوب الرياض",
  east:        "شرق الرياض",
  west:        "غرب الرياض",
  "RIY-CORE":  "مركز الرياض",
  "RIY-NORTH": "شمال الرياض",
  "RIY-SOUTH": "جنوب الرياض",
  "RIY-EAST":  "شرق الرياض",
  "RIY-WEST":  "غرب الرياض",
};

// -----------------------------------------------------------------
// Concise bilingual business line near the map section
// -----------------------------------------------------------------
export const V2_MAP_BUSINESS_LINE: BilingualLabel = {
  en: "Source-linked evidence surface for municipal review support and pilot-ready decision readiness.",
  ar: "سطح أدلة مترابط بالمصادر لدعم المراجعة البلدية وجاهزية القرار في مرحلة تجريبية.",
};

// -----------------------------------------------------------------
// IR-44C — Intelligence OS UI Positioning Layer
// Bilingual labels for the /v2/overview Platform Intelligence OS section.
// Visible UI copy only. Neutral institutional language.
// No vendor name in any value. No surveillance vocabulary. No enforcement vocabulary.
// No "official GIS" / "official municipal integration" claim.
// -----------------------------------------------------------------
export const V2_IR44C_INTELLIGENCE_OS = {
  section_eyebrow: {
    en: "Positioning",
    ar: "تموضع المنصة",
  } as BilingualLabel,
  section_title: {
    en: "Platform Intelligence OS",
    ar: "نظام تشغيل ذكاء المنصة",
  } as BilingualLabel,
  buyer_value_sentence: {
    en: "The platform turns regional evidence, spatial workflows, and human-review governance into buyer-ready urban decision intelligence packs.",
    ar: "تحوّل المنصة الأدلة الإقليمية وسير العمل المكاني وحوكمة المراجعة البشرية إلى حزم ذكاء قرار حضري جاهزة للمستفيد.",
  } as BilingualLabel,
  // IR-44C-R3 — buyer-clarity caption rendered as a second small line
  // beneath the buyer-value sentence. Operational framing for the
  // four institutional audiences the platform is built for.
  buyer_value_clarity: {
    en: "Built for executive review, municipal strategy, evidence packaging, and governed pilot delivery.",
    ar: "مُصمَّمة للمراجعة التنفيذية والاستراتيجية البلدية وحزم الأدلة وتسليم التجربة المحكوم.",
  } as BilingualLabel,
  card_ontology_title: {
    en: "Operating Ontology",
    ar: "نموذج التشغيل والقرار",
  } as BilingualLabel,
  card_ontology_summary: {
    en: "Governance-controlled workflow over a named object model — sources, evidence objects, packs, readiness posture, and reviewer attestations — every step traceable to its inputs.",
    ar: "سير عمل خاضع للحوكمة فوق نموذج كائنات مُسمّى — المصادر، كائنات الأدلة، الحزم، حالة الجاهزية، وشهادات المراجِع — كل خطوة قابلة للتتبع إلى مدخلاتها.",
  } as BilingualLabel,
  card_geospatial_title: {
    en: "Geospatial Evidence Intelligence",
    ar: "ذكاء الأدلة الجغرافية المكانية",
  } as BilingualLabel,
  card_geospatial_summary: {
    en: "Imagery snapshots, before/after pairs, and zone-level readiness posture across the GCC operating footprint — descriptive, source-attributed, reviewer-anchored.",
    ar: "صور مرجعية ومقارنات قبل/بعد وحالة جاهزية على مستوى المناطق ضمن نطاق التشغيل الخليجي — وصفية، منسوبة إلى مصادرها، مُراسَاة بمراجِع بشري.",
  } as BilingualLabel,
  card_workflow_title: {
    en: "Workflow Template System",
    ar: "منظومة قوالب سير العمل",
  } as BilingualLabel,
  card_workflow_summary: {
    en: "Template capability families and sector evidence packs composed under a governance-controlled workflow — no template runs without source-registry attribution.",
    ar: "عائلات قوالب القدرات وحزم أدلة القطاعات تُركَّب ضمن سير عمل خاضع للحوكمة — لا يعمل أي قالب دون نسبٍ مرجعي للمصدر.",
  } as BilingualLabel,
  surfaces_heading: {
    en: "Surfaces",
    ar: "الواجهات",
  } as BilingualLabel,
  surface_executive_label: {
    en: "Executive review surfaces",
    ar: "واجهات المراجعة التنفيذية",
  } as BilingualLabel,
  surface_executive_desc: {
    en: "Authority surfaces (ink). Compact, restrained — designed for an undersecretary or municipal director reading a single pack in one screen.",
    ar: "واجهات السلطة (داكنة). مكثفة ومتزنة — مصمَّمة لوكيل وزارة أو مدير بلدية يطّلع على حزمة واحدة في شاشة واحدة.",
  } as BilingualLabel,
  surface_analyst_label: {
    en: "Analyst workspace surfaces",
    ar: "واجهات بيئة عمل المحلل",
  } as BilingualLabel,
  surface_analyst_desc: {
    en: "Workspace surfaces (paper). Map, evidence explorer, workflow canvas, formula registry — the operating bench for the analyst who composes a pack.",
    ar: "واجهات بيئة العمل (ورقية). الخريطة ومستعرض الأدلة ولوحة سير العمل وسجل الصيغ — منصة المحلل الذي يُركّب الحزمة.",
  } as BilingualLabel,
  surface_future_label: {
    en: "Future developer and observatory surfaces",
    ar: "واجهات المطوّر والمرصد المستقبلية",
  } as BilingualLabel,
  surface_future_desc: {
    en: "Staged surfaces — Data Observatory, Connections, Applications, Developer reference. Documented as future governed capability; not rendered as live integrations.",
    ar: "واجهات مرحلية — مرصد البيانات والاتصالات والتطبيقات ومرجع المطوّر. موثَّقة كقدرة حوكمية مستقبلية ولا تُعرض كتكامل حيّ.",
  } as BilingualLabel,
  what_this_is_heading: {
    en: "What this is",
    ar: "ما هي هذه المنصة",
  } as BilingualLabel,
  what_this_is_bullets: {
    en: [
      "An advisory decision intelligence platform that prepares evidence for human municipal review.",
      "A governance-controlled workflow over a named object model with source-registry attribution.",
      "A composition layer for sector evidence packs anchored to the GCC operating footprint.",
    ] as readonly string[],
    ar: [
      "منصة ذكاء قرار استرشادية تُعدّ الأدلة لمراجعة بلدية بشرية.",
      "سير عمل خاضع للحوكمة فوق نموذج كائنات مُسمّى مع نسبٍ مرجعي للمصادر.",
      "طبقة تركيب لحزم أدلة قطاعية مرتبطة بنطاق التشغيل الخليجي.",
    ] as readonly string[],
  } as { en: readonly string[]; ar: readonly string[] },
  what_this_is_not_heading: {
    en: "What this is not",
    ar: "ما ليست عليه هذه المنصة",
  } as BilingualLabel,
  what_this_is_not_bullets: {
    en: [
      "Not an official municipal record and not an official boundary register.",
      "Not an automated decisioning system; municipal review is the sole producer of consequential conclusions.",
      "Not a surveillance tool; the platform observes zone-level posture, never individuals.",
      "Not a fixed-return product; commercial framing describes scope, not commercial return.",
    ] as readonly string[],
    ar: [
      "ليست سجلاً بلدياً رسمياً ولا مرجعاً رسمياً للحدود.",
      "ليست نظاماً للقرار الآلي؛ المراجعة البلدية هي المُنتِج الوحيد للاستنتاجات ذات الأثر.",
      "ليست أداة مراقبة فردية؛ المنصة ترصد حالة المناطق فقط، لا الأفراد.",
      "ليست منتجاً يَعِد بعائد مضمون؛ التأطير التجاري يصف النطاق لا العائد.",
    ] as readonly string[],
  } as { en: readonly string[]; ar: readonly string[] },
} as const;

// -----------------------------------------------------------------
// IR-44C-R2 — Intelligence OS Navigation + Sidebar Restructure
// Bilingual labels for the left workspace sidebar (5 groups) and the
// short navigation clarity copy line on /v2/overview. Visible UI only.
// Neutral institutional language. No vendor name. No surveillance
// vocabulary. No enforcement vocabulary. No official-GIS claim.
// -----------------------------------------------------------------

export const V2_IR44C_R2_NAV_CLARITY: BilingualLabel = {
  en: "Executive navigation explains the decision story. The workspace rail exposes the operating tools.",
  ar: "تشرح القائمة التنفيذية قصة القرار. ويعرض شريط بيئة العمل أدوات التشغيل.",
};

export const V2_IR44C_R2_SIDEBAR_GROUPS = {
  surface:         { en: "Surface",         ar: "الواجهة" } as BilingualLabel,
  intelligence_os: { en: "Intelligence OS", ar: "نظام تشغيل الذكاء" } as BilingualLabel,
  data_layer:      { en: "Data Layer",      ar: "طبقة البيانات" } as BilingualLabel,
  platform:        { en: "Platform",        ar: "المنصة" } as BilingualLabel,
  governance:      { en: "Governance",      ar: "الحوكمة" } as BilingualLabel,
} as const;

// Staged-badge wording used on non-clickable sidebar / top-nav items.
// IR-44C-R3 — softened from "reserved/محجوز" to "staged/مرحلي" so the
// staged posture reads as a calm investor-ready roadmap signal rather
// than a technical reservation tag.
export const V2_IR44C_R2_STAGED_BADGE: BilingualLabel = {
  en: "staged",
  ar: "مرحلي",
};

// -----------------------------------------------------------------
// IR-45 — Executive 30-Second Story + Buyer Pack Layer.
//
// Visible UI content for the new /v2/overview executive story
// sections: hero · 30-second decision journey · status strip ·
// buyer lens cards · evidence pack catalog · 75-second executive
// briefing · intelligence layers summary. Bilingual EN + AR
// authored in Gulf-institutional register; no vendor name; no
// production / official-GIS / official-municipal-integration /
// automated-decisioning / surveillance / enforcement / return-
// guarantee framing. Advanced ML, simulation, and physics-informed
// modeling remain gated future capabilities only.
// -----------------------------------------------------------------

// ---- Hero -------------------------------------------------------
export const V2_IR45_HERO = {
  eyebrow: {
    en: "Executive 30-Second Story",
    ar: "قصة تنفيذية في 30 ثانية",
  } as BilingualLabel,
  title: {
    en: "Saudi / Riyadh Urban Decision Intelligence",
    ar: "ذكاء القرار الحضري · السعودية / الرياض",
  } as BilingualLabel,
  subtitle: {
    en: "From spatial evidence to governed decision readiness.",
    ar: "من الأدلة المكانية إلى جاهزية قرار محكومة.",
  } as BilingualLabel,
  definition: {
    en: "A governed platform that turns urban evidence, public-source signals, and human review into buyer-ready urban decision intelligence packs.",
    ar: "منصة محكومة تحوّل الأدلة الحضرية والإشارات العامة والمراجعة البشرية إلى حزم ذكاء قرار حضري جاهزة للمشتري.",
  } as BilingualLabel,
} as const;

// ---- 30-Second Decision Journey (8 steps) ----------------------
export interface V2JourneyStep {
  id: string;
  en: string;
  ar: string;
}
export const V2_IR45_DECISION_JOURNEY: readonly V2JourneyStep[] = [
  { id: "saudi-context",      en: "Saudi Context",      ar: "السياق السعودي" },
  { id: "riyadh-active-lane", en: "Riyadh Active Lane", ar: "مسار الرياض النشط" },
  { id: "map-evidence",       en: "Map Evidence",       ar: "الأدلة الخرائطية" },
  { id: "evidence-atlas",     en: "Evidence Atlas",     ar: "أطلس الأدلة" },
  { id: "decision-readiness", en: "Decision Readiness", ar: "جاهزية القرار" },
  { id: "scenario-preview",   en: "Scenario Preview",   ar: "معاينة السيناريو" },
  { id: "human-review",       en: "Human Review",       ar: "المراجعة البشرية" },
  { id: "evidence-pack",      en: "Evidence Pack",      ar: "حزمة الأدلة" },
] as const;

// ---- Status strip (4 markets / lanes) --------------------------
export interface V2StatusItem {
  id: string;
  label_en: string;
  label_ar: string;
  status_en: string;
  status_ar: string;
  tone: "active" | "staged" | "reference" | "context";
}
export const V2_IR45_STATUS_STRIP: readonly V2StatusItem[] = [
  {
    id: "riyadh",
    label_en: "Riyadh",
    label_ar: "الرياض",
    status_en: "Active evidence lane",
    status_ar: "مسار أدلة نشط",
    tone: "active",
  },
  {
    id: "saudi-coverage",
    label_en: "Saudi Coverage",
    label_ar: "التغطية السعودية",
    status_en: "Staged expansion architecture",
    status_ar: "معمارية توسّع مرحلية",
    tone: "staged",
  },
  {
    id: "kuwait",
    label_en: "Kuwait",
    label_ar: "الكويت",
    status_en: "Baseline reference",
    status_ar: "مرجع خط الأساس",
    tone: "reference",
  },
  {
    id: "gcc",
    label_en: "GCC",
    label_ar: "الخليج",
    status_en: "Regional comparison context",
    status_ar: "سياق المقارنة الإقليمية",
    tone: "context",
  },
] as const;

// ---- Buyer Lens Cards (5) --------------------------------------
export interface V2BuyerLens {
  id: string;
  title_en: string;
  title_ar: string;
  cares_about_en: string;
  cares_about_ar: string;
  evidence_needed_en: string;
  evidence_needed_ar: string;
  output_received_en: string;
  output_received_ar: string;
}
export const V2_IR45_BUYER_LENSES: readonly V2BuyerLens[] = [
  {
    id: "municipal",
    title_en: "Municipality / Public Sector",
    title_ar: "البلدية / القطاع العام",
    cares_about_en: "Urban evidence to support municipal review, planning, and oversight inside Saudi cities.",
    cares_about_ar: "أدلة حضرية تدعم المراجعة البلدية والتخطيط والإشراف داخل المدن السعودية.",
    evidence_needed_en: "Zone-level posture, before/after change snapshots, source provenance, readiness bands.",
    evidence_needed_ar: "وضعية على مستوى المناطق، ومقارنات قبل/بعد، ونسب المصادر، وعصابات الجاهزية.",
    output_received_en: "Municipal Readiness Pack — governed and advisory-only, prepared for human review.",
    output_received_ar: "حزمة الجاهزية البلدية — محكومة واسترشادية فقط، مُعدّة للمراجعة البشرية.",
  },
  {
    id: "investor-developer",
    title_en: "Investor / Developer",
    title_ar: "المستثمر / المطوّر",
    cares_about_en: "Site, parcel, and master-plan posture for capital-allocation review under Saudi market conditions.",
    cares_about_ar: "وضعية الموقع والقطعة والمخطط الرئيسي لمراجعة تخصيص رأس المال ضمن ظروف السوق السعودي.",
    evidence_needed_en: "Site context, zone readiness, regional comparison, evidence provenance.",
    evidence_needed_ar: "سياق الموقع، وجاهزية المنطقة، والمقارنة الإقليمية، ونسب الأدلة.",
    output_received_en: "Developer Site Intelligence Pack — review-ready, advisory-only, no return guarantee.",
    output_received_ar: "حزمة ذكاء مواقع المطوّر — جاهزة للمراجعة، استرشادية فقط، دون أي ضمان لعائد.",
  },
  {
    id: "insurance",
    title_en: "Insurance / Risk",
    title_ar: "التأمين / المخاطر",
    cares_about_en: "Geographic and contextual risk posture for portfolios across Saudi and the wider GCC.",
    cares_about_ar: "وضعية المخاطر الجغرافية والسياقية لمحافظ التأمين في السعودية والخليج.",
    evidence_needed_en: "Zone-level posture, change indicators, source documentation, governance caveats.",
    evidence_needed_ar: "وضعية المناطق ومؤشرات التغيّر وتوثيق المصادر والتحفّظات الحوكمية.",
    output_received_en: "Insurance Risk Context Pack — advisory posture only, not an underwriting decision.",
    output_received_ar: "حزمة سياق مخاطر التأمين — وضعية استرشادية فقط، وليست قرار اكتتاب.",
  },
  {
    id: "telecom-infra",
    title_en: "Telecom / Infrastructure",
    title_ar: "الاتصالات / البنية التحتية",
    cares_about_en: "Coverage planning, infrastructure context, and demand patterns across Saudi cities and the GCC.",
    cares_about_ar: "تخطيط التغطية وسياق البنية التحتية وأنماط الطلب عبر المدن السعودية والخليج.",
    evidence_needed_en: "Spatial posture, footfall context, infrastructure layers, governance caveats.",
    evidence_needed_ar: "الوضعية المكانية وسياق الحركة وطبقات البنية التحتية والتحفّظات الحوكمية.",
    output_received_en: "Telecom / Infrastructure Context Pack — advisory readiness signal, no automated rollout decision.",
    output_received_ar: "حزمة سياق الاتصالات والبنية التحتية — إشارة جاهزية استرشادية، دون أي قرار نشر آلي.",
  },
  {
    id: "cloud-advisory",
    title_en: "Cloud / Advisory Partner",
    title_ar: "شريك الحوسبة السحابية / الاستشارات",
    cares_about_en: "Reference architecture, governance pattern, and pilot delivery against a Saudi-anchored evidence platform.",
    cares_about_ar: "المعمارية المرجعية، ونمط الحوكمة، وتسليم التجربة على منصة أدلة مرتكزة على السعودية.",
    evidence_needed_en: "Architecture documentation, governance contracts, evidence-pack templates, pilot scope.",
    evidence_needed_ar: "وثائق المعمارية، وعقود الحوكمة، وقوالب حزم الأدلة، ونطاق التجربة.",
    output_received_en: "60-day Governed Pilot scaffolding — partner-ready advisory engagement.",
    output_received_ar: "هيكلة تجربة محكومة لمدة 60 يوماً — ارتباط استشاري جاهز للشركاء.",
  },
] as const;

// ---- Evidence Pack Catalog (6 packs) ----------------------------
export interface V2EvidencePack {
  id: string;
  title_en: string;
  title_ar: string;
  buyer_en: string;
  buyer_ar: string;
  decision_question_en: string;
  decision_question_ar: string;
  evidence_used_en: string;
  evidence_used_ar: string;
  output_en: string;
  output_ar: string;
  governance_caveat_en: string;
  governance_caveat_ar: string;
}
export const V2_IR45_EVIDENCE_PACK_CATALOG: readonly V2EvidencePack[] = [
  {
    id: "municipal-readiness",
    title_en: "Municipal Readiness Pack",
    title_ar: "حزمة الجاهزية البلدية",
    buyer_en: "Municipality, planning authority, or public-sector reviewer in a Saudi city.",
    buyer_ar: "بلدية أو هيئة تخطيط أو مراجِع قطاع عام في مدينة سعودية.",
    decision_question_en: "Across the zones in our city, which are ready for review today, which need more evidence, and which warrant only an executive brief?",
    decision_question_ar: "أيُّ مناطق المدينة جاهزة للمراجعة اليوم، وأيُّها يحتاج إلى أدلة إضافية، وأيُّها يستحق ملخصاً تنفيذياً فقط؟",
    evidence_used_en: "Zone administrative layer, imagery snapshot pairs, change indicators, readiness scoring inputs.",
    evidence_used_ar: "طبقة المناطق الإدارية، وأزواج اللقطات المرجعية، ومؤشرات التغيّر، ومدخلات تسجيل الجاهزية.",
    output_en: "Per-zone readiness panel with posture, confidence band, missing-evidence notes, and a 'requires municipal review' caveat.",
    output_ar: "لوحة جاهزية لكل منطقة مع الوضعية وعصابة الثقة وملاحظات الأدلة الناقصة وتحفّظ 'يتطلب مراجعة بلدية'.",
    governance_caveat_en: "Advisory only. Not an automated decisioning system. No enforcement claim.",
    governance_caveat_ar: "استرشادية فقط. ليست نظام قرار آلي. لا ادّعاء بإنفاذ.",
  },
  {
    id: "developer-site-intelligence",
    title_en: "Developer Site Intelligence Pack",
    title_ar: "حزمة ذكاء مواقع المطوّر",
    buyer_en: "Real-estate developer, investor, or master-plan analyst.",
    buyer_ar: "مطوّر عقاري، أو مستثمر، أو محلّل مخطط رئيسي.",
    decision_question_en: "For a candidate site or master-plan parcel, what evidence-bounded posture warrants further developer review?",
    decision_question_ar: "لموقع مرشّح أو قطعة في مخطط رئيسي: أيُّ وضعية مدعومة بالأدلة تستحق مراجعة إضافية من المطوّر؟",
    evidence_used_en: "Spatial context, zone readiness, regional comparison, source provenance.",
    evidence_used_ar: "السياق المكاني، وجاهزية المنطقة، والمقارنة الإقليمية، ونسب المصدر.",
    output_en: "Site-level readiness brief with an evidence trace and a 'requires developer review' caveat.",
    output_ar: "ملخص جاهزية على مستوى الموقع مع تتبّع للأدلة وتحفّظ 'يتطلب مراجعة المطوّر'.",
    governance_caveat_en: "Advisory only. No return guarantee. No fixed commercial outcome promised.",
    governance_caveat_ar: "استرشادية فقط. لا ضمان لعائد. لا وعد بأي مخرَج تجاري ثابت.",
  },
  {
    id: "insurance-risk-context",
    title_en: "Insurance Risk Context Pack",
    title_ar: "حزمة سياق مخاطر التأمين",
    buyer_en: "Property and casualty underwriter or portfolio risk lead at a regional insurer.",
    buyer_ar: "مكتتب ممتلكات وحوادث أو قائد محفظة مخاطر في شركة تأمين إقليمية.",
    decision_question_en: "Across a portfolio of insured locations, which sub-areas show a posture that warrants underwriter review before renewal?",
    decision_question_ar: "ضمن محفظة المواقع المؤمّن عليها: أيُّ مناطق فرعية تُظهر وضعية تستحق مراجعة المكتتب قبل التجديد؟",
    evidence_used_en: "Zone-level posture, change indicators, declared context layers, governance flags.",
    evidence_used_ar: "وضعية المناطق ومؤشرات التغيّر وطبقات السياق المُعلَنة وأعلام الحوكمة.",
    output_en: "Portfolio-zone risk-context brief with posture distribution and missing-evidence notes.",
    output_ar: "ملخص سياق مخاطر للمحفظة على مستوى المناطق مع توزيع الوضعية وملاحظات الأدلة الناقصة.",
    governance_caveat_en: "Advisory only. Underwriter review required. Not a pricing decision. No active model.",
    governance_caveat_ar: "استرشادية فقط. مراجعة المكتتب مطلوبة. ليست قراراً تسعيرياً. لا نموذج نشط.",
  },
  {
    id: "retail-footfall",
    title_en: "Retail / Footfall Pack",
    title_ar: "حزمة التجزئة وحركة الزوّار",
    buyer_en: "Retail expansion lead, trade-area analyst, or category-management lead.",
    buyer_ar: "قائد توسّع التجزئة، أو محلّل نطاق تجاري، أو قائد إدارة فئات.",
    decision_question_en: "For candidate stores or trade-area boundaries, what footfall and posture context warrants expansion-team review?",
    decision_question_ar: "لمواقع المتاجر المرشّحة أو حدود النطاق التجاري: أيُّ سياق حركة ووضعية يستحق مراجعة فريق التوسّع؟",
    evidence_used_en: "Administrative geography, declared mobility tiles where licensed, candidate site list, spatial context.",
    evidence_used_ar: "الجغرافيا الإدارية، وطبقات التنقّل المُعلَنة حيث مُرخّص بها، وقائمة المواقع المرشّحة، والسياق المكاني.",
    output_en: "Per-site or per-trade-area readiness brief with posture, missing-evidence notes, and a 'requires expansion-team review' caveat.",
    output_ar: "ملخص جاهزية لكل موقع أو نطاق تجاري مع الوضعية وملاحظات الأدلة الناقصة وتحفّظ 'يتطلب مراجعة فريق التوسّع'.",
    governance_caveat_en: "Advisory only. Not a sales forecast. No automated site-selection. No active model.",
    governance_caveat_ar: "استرشادية فقط. ليست تنبؤاً بالمبيعات. لا اختيار موقع آلي. لا نموذج نشط.",
  },
  {
    id: "public-asset-monetization",
    title_en: "Public Asset Monetization Pack",
    title_ar: "حزمة تثمين الأصول العامة",
    buyer_en: "Public-sector asset holder or strategic portfolio lead.",
    buyer_ar: "جهة قطاع عام مالكة لأصول أو قائد محفظة استراتيجية.",
    decision_question_en: "Across a portfolio of public assets, what posture warrants further asset-holder review for value scenarios?",
    decision_question_ar: "ضمن محفظة الأصول العامة: أيُّ وضعية تستحق مراجعة إضافية من الجهة المالكة لأجل سيناريوهات القيمة؟",
    evidence_used_en: "Asset geography, zone posture, comparative context, governance flags.",
    evidence_used_ar: "جغرافيا الأصول، ووضعية المناطق، والسياق المقارن، وأعلام الحوكمة.",
    output_en: "Asset-portfolio context brief with posture, comparison, and missing-evidence notes.",
    output_ar: "ملخص سياقي لمحفظة الأصول مع الوضعية والمقارنة وملاحظات الأدلة الناقصة.",
    governance_caveat_en: "Advisory only. Not a disposal or lease recommendation. Reviewer-of-record is the public-sector asset owner.",
    governance_caveat_ar: "استرشادية فقط. ليست توصية بتفويت أو تأجير. المراجِع المسؤول هو الجهة المالكة في القطاع العام.",
  },
  {
    id: "strategic-gcc-comparison",
    title_en: "Strategic GCC Comparison Pack",
    title_ar: "حزمة المقارنة الاستراتيجية الخليجية",
    buyer_en: "Executive-brief audience comparing posture across GCC municipalities.",
    buyer_ar: "جمهور الملخصات التنفيذية الذي يقارن الوضعية بين بلديات الخليج.",
    decision_question_en: "How does Riyadh's posture compare to Kuwait's reference baseline and the wider GCC operating footprint?",
    decision_question_ar: "كيف تُقارَن وضعية الرياض بمرجع خط الأساس الكويتي ونطاق التشغيل الخليجي الأوسع؟",
    evidence_used_en: "Per-country administrative posture, source registry declarations, governance caveats.",
    evidence_used_ar: "الوضعية الإدارية لكل دولة، وتصاريح سجل المصادر، والتحفّظات الحوكمية.",
    output_en: "Comparative posture brief with executive-brief framing.",
    output_ar: "ملخص وضعية مقارن بتأطير الملخصات التنفيذية.",
    governance_caveat_en: "Advisory only. Comparative posture is descriptive across declared sources. Not an authoritative ranking of municipalities.",
    governance_caveat_ar: "استرشادية فقط. الوضعية المقارنة وصفية عبر المصادر المُعلَنة. ليست ترتيباً مرجعياً للبلديات.",
  },
] as const;

// ---- 75-Second Executive Briefing -------------------------------
export const V2_IR45_EXECUTIVE_BRIEFING = {
  title: {
    en: "75-Second Executive Briefing",
    ar: "ملخص تنفيذي في 75 ثانية",
  } as BilingualLabel,
  body_en: [
    "We are building a governed Urban Decision Intelligence OS for the GCC, starting with Saudi Arabia and using Riyadh as the active evidence lane.",
    "The problem is not that institutions lack data. The problem is that urban evidence is fragmented across maps, public datasets, satellite imagery, market signals, and manual review processes. This makes decisions hard to explain, hard to defend, and slow to prepare.",
    "The platform connects these signals into one governed journey: Saudi context, Riyadh evidence, spatial layers, evidence atlas, decision readiness, scenario preview, human review, and finally a buyer-ready evidence pack.",
    "Behind the interface are intelligence layers: macro, micro, economic, mathematical, dynamic, geospatial evidence, and governance. Advanced ML, simulation, and physics-informed modeling remain gated future capabilities, not active outputs.",
    "The commercial output is clear: a 60-day governed pilot, evidence packs, and a controlled data room for municipalities, investors, insurers, infrastructure teams, telecom partners, and cloud providers.",
    "This is not a map and not a dashboard. It is decision infrastructure for urban evidence, review, and investment readiness.",
  ] as readonly string[],
  body_ar: [
    "نبني نظام تشغيل ذكاء قرار حضري محكوم لمنطقة الخليج، انطلاقاً من المملكة العربية السعودية، وباعتماد الرياض مسار الأدلة النشط.",
    "المشكلة ليست في غياب البيانات؛ بل في تشتّت الأدلة الحضرية بين الخرائط والبيانات العامة وصور الأقمار والإشارات السوقية والمراجعات اليدوية، مما يُصعّب شرح القرار وتبريره ويُبطئ إعداده.",
    "تربط المنصة هذه الإشارات في رحلة محكومة واحدة: السياق السعودي، أدلة الرياض، الطبقات المكانية، أطلس الأدلة، جاهزية القرار، معاينة السيناريو، المراجعة البشرية، ثم حزمة أدلة جاهزة للمشتري.",
    "وخلف الواجهة طبقات ذكاء: الكلي، والجزئي، والاقتصادي، والرياضي، والديناميكي، وذكاء الأدلة الجغرافية المكانية، والحوكمة. أما التعلّم الآلي المتقدم والمحاكاة والنمذجة المسترشدة بالفيزياء فتبقى قدرات مستقبلية محكومة، ولا تُعرض كمخرجات نشطة.",
    "المخرج التجاري واضح: تجربة محكومة لمدة 60 يوماً، وحزم أدلة، وغرفة بيانات منضبطة موجّهة للبلديات والمستثمرين وشركات التأمين وفِرق البنية التحتية وشركاء الاتصالات ومزوّدي الحوسبة السحابية.",
    "ليست هذه خريطة ولا لوحة معلومات؛ بل بنية تحتية للقرار قائمة على الأدلة الحضرية والمراجعة وجاهزية الاستثمار.",
  ] as readonly string[],
} as const;

// ---- Intelligence Layers Summary (9 layers) ---------------------
export interface V2IntelligenceLayer {
  id: string;
  title_en: string;
  title_ar: string;
  summary_en: string;
  summary_ar: string;
  gated: boolean;
}
export const V2_IR45_INTELLIGENCE_LAYERS: readonly V2IntelligenceLayer[] = [
  {
    id: "macro",
    title_en: "Macro Intelligence",
    title_ar: "الذكاء الكلي",
    summary_en: "Regional and city-scale context across the GCC, Saudi, Riyadh, and the Kuwait baseline.",
    summary_ar: "السياق على مستوى المنطقة والمدن عبر الخليج والسعودية والرياض ومرجع الكويت.",
    gated: false,
  },
  {
    id: "micro",
    title_en: "Micro Intelligence",
    title_ar: "الذكاء الجزئي",
    summary_en: "Zone- and parcel-level posture and change signals within active operating areas.",
    summary_ar: "وضعية وإشارات تغيّر على مستوى المناطق والقطع داخل نطاقات التشغيل النشطة.",
    gated: false,
  },
  {
    id: "economic",
    title_en: "Economic Intelligence",
    title_ar: "الذكاء الاقتصادي",
    summary_en: "Public-source economic context and market-signal framing for buyer-relevant questions.",
    summary_ar: "سياق اقتصادي من مصادر عامة وتأطير الإشارات السوقية للأسئلة ذات الصلة بالمستفيد.",
    gated: false,
  },
  {
    id: "mathematical-core",
    title_en: "Mathematical Core",
    title_ar: "النواة الرياضية",
    summary_en: "Descriptive scoring, posture bands, and formula traceability for every signal reaching the reviewer.",
    summary_ar: "تسجيل وصفي وعصابات وضعية وتتبّع للصيغ لكل إشارة تصل إلى المراجِع.",
    gated: false,
  },
  {
    id: "dynamic",
    title_en: "Dynamic Intelligence",
    title_ar: "الذكاء الديناميكي",
    summary_en: "Mode-driven workspace surfaces that compose evidence into reviewer-readable journeys.",
    summary_ar: "واجهات بيئة العمل التي تُركّب الأدلة في رحلات قابلة للقراءة من قِبل المراجِع.",
    gated: false,
  },
  {
    id: "geospatial",
    title_en: "Geospatial Evidence Intelligence",
    title_ar: "ذكاء الأدلة الجغرافية المكانية",
    summary_en: "Imagery snapshots, before/after pairs, zone readiness, and spatial layers for the active lane.",
    summary_ar: "صور مرجعية ومقارنات قبل/بعد وجاهزية المناطق والطبقات المكانية للمسار النشط.",
    gated: false,
  },
  {
    id: "governance",
    title_en: "Governance & Human Review",
    title_ar: "الحوكمة والمراجعة البشرية",
    summary_en: "Audit trail, governance caveats, reviewer-of-record posture, and the boundary the platform does not cross.",
    summary_ar: "سجل التدقيق والتحفّظات الحوكمية ووضعية المراجِع المسؤول والحدّ الذي لا تتجاوزه المنصة.",
    gated: false,
  },
  {
    id: "physics-informed",
    title_en: "Physics-Informed Boundary",
    title_ar: "حدّ المعرفة الفيزيائية",
    summary_en: "Gated future capability. No physics-informed output is rendered today.",
    summary_ar: "قدرة مستقبلية محكومة. لا يُعرض اليوم أيُّ ناتج مسترشد بالفيزياء.",
    gated: true,
  },
  {
    id: "ml-simulation-dl",
    title_en: "ML / Simulation / Deep Learning",
    title_ar: "التعلّم الآلي / المحاكاة / التعلّم العميق",
    summary_en: "Gated future capability. No active model is run on user input today.",
    summary_ar: "قدرات مستقبلية محكومة. لا يعمل أيُّ نموذج اليوم على إدخال المستخدم.",
    gated: true,
  },
] as const;

// ---- Section headers + small labels -----------------------------
export const V2_IR45_SECTION_LABELS = {
  journey_eyebrow:     { en: "30-Second Decision Journey",   ar: "رحلة قرار في 30 ثانية" } as BilingualLabel,
  status_eyebrow:      { en: "Market Posture",                ar: "وضعية السوق" } as BilingualLabel,
  buyer_eyebrow:       { en: "Buyer Lens",                    ar: "عدسة المستفيد" } as BilingualLabel,
  pack_eyebrow:        { en: "Evidence Pack Catalog",         ar: "قائمة حزم الأدلة" } as BilingualLabel,
  intelligence_eyebrow:{ en: "Intelligence Layers",           ar: "طبقات الذكاء" } as BilingualLabel,
  cares_about:         { en: "Cares about",                   ar: "ما يهمّه" } as BilingualLabel,
  evidence_needed:     { en: "Evidence needed",               ar: "الأدلة المطلوبة" } as BilingualLabel,
  output_received:     { en: "Output received",               ar: "المخرَج المُستلَم" } as BilingualLabel,
  pack_buyer:          { en: "Buyer",                         ar: "المستفيد" } as BilingualLabel,
  pack_decision:       { en: "Decision question",             ar: "سؤال القرار" } as BilingualLabel,
  pack_evidence:       { en: "Evidence used",                 ar: "الأدلة المستخدمة" } as BilingualLabel,
  pack_output:         { en: "Output",                        ar: "المخرَج" } as BilingualLabel,
  pack_governance:     { en: "Governance caveat",             ar: "تحفّظ الحوكمة" } as BilingualLabel,
  gated_badge:         { en: "gated · future",                ar: "محكومة · مستقبلية" } as BilingualLabel,
} as const;

// -----------------------------------------------------------------
// IR-46 — Overview Product Intelligence Compression Layer.
//
// Bilingual content for the six executive clusters that compress
// /v2/overview into a buyer-readable product-intelligence surface:
//
//   (1) Executive Intelligence Strip — 4 advisory/candidate metrics
//   (2) Product Intelligence Flow    — 5-step pipeline (heart of page)
//   (3) Urban Signal Fusion Layer    — 5 candidate signal-domain cards
//   (4) Decision Readiness Panel     — 5 review-state pills + boundary
//   (5) Buyer Pack Layer             — reuses IR-45 V2_IR45_BUYER_LENSES
//   (6) 75-Second Executive Preview  — 5 time-stamped lines + CTA
//
// All content is advisory-only / candidate / reference-only / human-
// reviewed. No production claim, no official-GIS claim, no automated-
// decisioning claim, no surveillance vocabulary, no enforcement
// vocabulary, no guaranteed-ROI, no real-time monitoring.
// -----------------------------------------------------------------

// ---- Cluster 1 · Executive Intelligence Strip --------------------
export const V2_IR46_INTELLIGENCE_STRIP = {
  title: {
    en: "GCC Urban Decision Intelligence OS",
    ar: "نظام ذكاء القرار الحضري الخليجي",
  } as BilingualLabel,
  subtitle: {
    en: "From urban signals to evidence-backed decision readiness.",
    ar: "من الإشارات الحضرية إلى جاهزية قرار مدعومة بالأدلة.",
  } as BilingualLabel,
  metrics: [
    {
      id: "signals-ingested",
      label_en: "Signals Ingested",
      label_ar: "إشارات مُدخلة",
      caveat_en: "candidate · advisory",
      caveat_ar: "مرشّحة · استشارية",
    },
    {
      id: "evidence-objects",
      label_en: "Evidence Objects",
      label_ar: "كائنات أدلة",
      caveat_en: "candidate · human-reviewed",
      caveat_ar: "مرشّحة · مُراجَعة بشرياً",
    },
    {
      id: "readiness-paths",
      label_en: "Readiness Paths",
      label_ar: "مسارات الجاهزية",
      caveat_en: "reference only",
      caveat_ar: "للمرجعية فقط",
    },
    {
      id: "buyer-packs",
      label_en: "Buyer Packs",
      label_ar: "حزم المستفيدين",
      caveat_en: "advisory · roadmap",
      caveat_ar: "استشارية · خارطة طريق",
    },
  ] as const,
} as const;

// ---- Cluster 2 · Product Intelligence Flow (5 steps) -------------
export interface V2FlowStep {
  id: string;
  label_en: string;
  label_ar: string;
  sentence_en: string;
  sentence_ar: string;
}
export const V2_IR46_PRODUCT_FLOW = {
  eyebrow: {
    en: "Product Intelligence Flow",
    ar: "تدفّق ذكاء المنتج",
  } as BilingualLabel,
  intro: {
    en: "How urban signals become an evidence-backed buyer pack — five governed steps, advisory only.",
    ar: "كيف تتحوّل الإشارات الحضرية إلى حزمة أدلة جاهزة للمستفيد — خمس خطوات محكومة، استرشادية فقط.",
  } as BilingualLabel,
  steps: [
    {
      id: "urban-signals",
      label_en: "Urban Signals",
      label_ar: "الإشارات الحضرية",
      sentence_en: "Imagery snapshots, public datasets, market signals, and review notes enter the platform under source-registry attribution.",
      sentence_ar: "تدخل صور الأقمار والبيانات العامة وإشارات السوق وملاحظات المراجعة المنصة منسوبةً إلى سجل المصادر.",
    },
    {
      id: "evidence-layer",
      label_en: "Evidence Layer",
      label_ar: "طبقة الأدلة",
      sentence_en: "Signals are normalised, joined to administrative context, and packaged as inspectable evidence objects with provenance.",
      sentence_ar: "تُطَبَّع الإشارات وتُربط بالسياق الإداري وتُغلَّف ككائنات أدلة قابلة للتدقيق مع نسبٍ مرجعي.",
    },
    {
      id: "mathematical-core",
      label_en: "Mathematical Core",
      label_ar: "النواة الرياضية",
      sentence_en: "Descriptive scoring, posture bands, and formula traceability prepare each signal for human review — no model output is rendered as a decision.",
      sentence_ar: "تسجيل وصفي وعصابات وضعية وتتبّع للصيغ تُعِدّ كل إشارة للمراجعة البشرية — ولا يُعرض أيُّ ناتج نموذج بوصفه قراراً.",
    },
    {
      id: "decision-readiness",
      label_en: "Decision Readiness",
      label_ar: "جاهزية القرار",
      sentence_en: "Each pack is scored on source completeness, confidence band, and missing-evidence count, producing a readiness posture for the reviewer.",
      sentence_ar: "تُقيَّم كل حزمة على اكتمال المصادر وعصابة الثقة وعدد الأدلة الناقصة، وتُنتَج وضعية جاهزية لاطلاع المراجِع.",
    },
    {
      id: "buyer-pack",
      label_en: "Buyer Pack",
      label_ar: "حزمة المستفيد",
      sentence_en: "A bilingual, governance-caveated evidence pack is composed for the buyer — municipal, investor, insurer, telecom, or cloud partner.",
      sentence_ar: "تُركَّب حزمة أدلة ثنائية اللغة محكومة الحوكمة للمستفيد — البلدية أو المستثمر أو شركة التأمين أو الاتصالات أو شريك الحوسبة السحابية.",
    },
  ] as readonly V2FlowStep[],
} as const;

// ---- Cluster 3 · Urban Signal Fusion Layer (5 cards) -------------
export interface V2FusionCard {
  id: string;
  title_en: string;
  title_ar: string;
  platform_meaning_en: string;
  platform_meaning_ar: string;
  status_en: string;
  status_ar: string;
}
export const V2_IR46_FUSION_LAYER = {
  eyebrow: {
    en: "Urban Signal Fusion",
    ar: "دمج الإشارات الحضرية",
  } as BilingualLabel,
  intro: {
    en: "The five signal domains the platform composes into evidence packs. Each domain is candidate or reference-only until partner data and municipal review confirm scope.",
    ar: "المجالات الخمسة للإشارات التي تُركّبها المنصة في حزم الأدلة. كل مجال مرشّح أو مرجعي فقط حتى تؤكّد بيانات الشريك والمراجعة البلدية النطاق.",
  } as BilingualLabel,
  cards: [
    {
      id: "population-mobility",
      title_en: "Population & Mobility",
      title_ar: "السكان والتنقّل",
      platform_meaning_en: "Public-source demographic and movement context used to read zone-level posture; never personal identification.",
      platform_meaning_ar: "سياق ديموغرافي وحركي من مصادر عامة لقراءة وضعية المناطق؛ ولا يشمل أي تعرّف فردي.",
      status_en: "candidate · requires partner data",
      status_ar: "مرشّح · يتطلّب بيانات شريك",
    },
    {
      id: "real-estate-economy",
      title_en: "Real Estate & Economy",
      title_ar: "العقار والاقتصاد",
      platform_meaning_en: "Public-source market context for buyer-relevant questions; no price forecast and no investment recommendation.",
      platform_meaning_ar: "سياق سوقي من مصادر عامة للأسئلة ذات الصلة بالمستفيد؛ لا توقّع للأسعار ولا توصية باستثمار.",
      status_en: "candidate · review needed",
      status_ar: "مرشّح · يتطلّب مراجعة",
    },
    {
      id: "municipal-planning",
      title_en: "Municipal & Planning",
      title_ar: "البلدية والتخطيط",
      platform_meaning_en: "Administrative geography and declared planning context. Advisory only; the municipal reviewer is the sole authority.",
      platform_meaning_ar: "الجغرافيا الإدارية والسياق التخطيطي المُعلَن. استشاري فقط؛ والمراجِع البلدي هو السلطة الوحيدة.",
      status_en: "reference only",
      status_ar: "للمرجعية فقط",
    },
    {
      id: "infrastructure-telecom",
      title_en: "Infrastructure & Telecom",
      title_ar: "البنية التحتية والاتصالات",
      platform_meaning_en: "Spatial context for coverage and infrastructure questions; no automated rollout decision and no operator-side assertion.",
      platform_meaning_ar: "سياق مكاني لأسئلة التغطية والبنية التحتية؛ لا قرار نشر آلي ولا ادّعاء من جانب المشغّل.",
      status_en: "candidate · requires partner data",
      status_ar: "مرشّح · يتطلّب بيانات شريك",
    },
    {
      id: "insurance-risk",
      title_en: "Insurance & Risk",
      title_ar: "التأمين والمخاطر",
      platform_meaning_en: "Zone-level risk posture for underwriting review; not a pricing decision and not a claim adjudication.",
      platform_meaning_ar: "وضعية مخاطر على مستوى المناطق لمراجعة الاكتتاب؛ ليست قراراً تسعيرياً ولا فصلاً في مطالبات.",
      status_en: "candidate · review needed",
      status_ar: "مرشّح · يتطلّب مراجعة",
    },
  ] as readonly V2FusionCard[],
} as const;

// ---- Cluster 4 · Decision Readiness Panel (5 states + boundary) --
export interface V2ReadinessState {
  id: string;
  label_en: string;
  label_ar: string;
  description_en: string;
  description_ar: string;
  tone: "ready" | "review" | "limited" | "insufficient" | "blocked";
}
export const V2_IR46_READINESS_PANEL = {
  eyebrow: {
    en: "Decision Readiness — Riyadh Active Lane",
    ar: "جاهزية القرار — مسار الرياض النشط",
  } as BilingualLabel,
  intro: {
    en: "Five posture states a reviewer can read on any zone or pack in the Riyadh active lane. The platform produces posture; the human review produces the decision.",
    ar: "خمس حالات وضعية يمكن للمراجِع قراءتها على أي منطقة أو حزمة في مسار الرياض النشط. المنصة تُنتج الوضعية، والمراجعة البشرية تُنتج القرار.",
  } as BilingualLabel,
  states: [
    {
      id: "ready-for-reference",
      label_en: "Ready for Reference",
      label_ar: "جاهز للمرجعية",
      description_en: "Source-registry attribution complete; evidence pair available; posture readable. Reviewer can cite as reference.",
      description_ar: "النسب المرجعي مكتمل؛ وأزواج الأدلة متوفّرة؛ والوضعية قابلة للقراءة. يمكن للمراجِع الاستشهاد به كمرجع.",
      tone: "ready",
    },
    {
      id: "review-pending",
      label_en: "Review Pending",
      label_ar: "بانتظار المراجعة",
      description_en: "Sources are attached but the human reviewer-of-record has not signed off. Posture is candidate-only.",
      description_ar: "المصادر مرفقة لكن المراجِع المسؤول لم يعتمد بعد. الوضعية مرشّحة فقط.",
      tone: "review",
    },
    {
      id: "governance-limited",
      label_en: "Governance Limited",
      label_ar: "محدود بالحوكمة",
      description_en: "Constitutional caveat applies — a vocabulary, jurisdictional, or source-licence limit prevents broader use.",
      description_ar: "ينطبق تحفّظ دستوري — قيد على المفردات أو الاختصاص أو ترخيص المصدر يمنع توسيع الاستخدام.",
      tone: "limited",
    },
    {
      id: "insufficient-evidence",
      label_en: "Insufficient Evidence",
      label_ar: "أدلة غير كافية",
      description_en: "Source pair pending; readiness inputs incomplete. Cannot be cited as decision input until evidence is registered.",
      description_ar: "زوج المصادر بانتظار التحقق؛ ومدخلات الجاهزية غير مكتملة. لا يُستشهد به كمدخل قرار حتى يُسجَّل الدليل.",
      tone: "insufficient",
    },
    {
      id: "blocked-from-decision-use",
      label_en: "Blocked from Decision Use",
      label_ar: "محظور من استخدام القرار",
      description_en: "Reviewer-of-record or governance gate has explicitly blocked this pack from any decision context.",
      description_ar: "المراجِع المسؤول أو بوابة الحوكمة قد منعت صراحةً استخدام هذه الحزمة في أي سياق قرار.",
      tone: "blocked",
    },
  ] as readonly V2ReadinessState[],
  boundary: {
    en: "Advisory only. Municipal review remains the source of consequential decision.",
    ar: "استرشادي فقط. تبقى المراجعة البلدية مصدر القرار ذي الأثر.",
  } as BilingualLabel,
} as const;

// ---- Cluster 6 · 75-Second Executive Preview (compact stepped) ---
export interface V2PreviewStep {
  range: string;
  label_en: string;
  label_ar: string;
}
export const V2_IR46_EXECUTIVE_PREVIEW = {
  cta_label: {
    en: "Run 75-second Executive Preview",
    ar: "تشغيل المعاينة التنفيذية في 75 ثانية",
  } as BilingualLabel,
  eyebrow: {
    en: "75-second Executive Preview",
    ar: "معاينة تنفيذية في 75 ثانية",
  } as BilingualLabel,
  intro: {
    en: "A five-step walkthrough that explains the platform in seventy-five seconds without leaving this page.",
    ar: "جولة من خمس خطوات تشرح المنصة في خمس وسبعين ثانية دون مغادرة هذه الصفحة.",
  } as BilingualLabel,
  steps: [
    {
      range: "0-10 sec",
      label_en: "Saudi / Riyadh active lane — the platform's operating geography.",
      label_ar: "مسار الرياض النشط في السعودية — الجغرافيا التشغيلية للمنصة.",
    },
    {
      range: "10-25 sec",
      label_en: "Urban signals enter the platform under source-registry attribution.",
      label_ar: "تدخل الإشارات الحضرية المنصة منسوبةً إلى سجل المصادر.",
    },
    {
      range: "25-40 sec",
      label_en: "Evidence objects and lineage carry every signal forward with provenance.",
      label_ar: "تحمل كائنات الأدلة وسلسلة النسب كل إشارة إلى الأمام مع توثيق المصدر.",
    },
    {
      range: "40-55 sec",
      label_en: "Mathematical core and readiness scoring prepare each pack for human review.",
      label_ar: "النواة الرياضية وتسجيل الجاهزية تُعِدّان كل حزمة للمراجعة البشرية.",
    },
    {
      range: "55-75 sec",
      label_en: "Buyer pack composed for municipality, investor, insurer, telecom, and cloud partner.",
      label_ar: "حزمة المستفيد تُركَّب للبلدية والمستثمر وشركة التأمين والاتصالات وشريك الحوسبة السحابية.",
    },
  ] as readonly V2PreviewStep[],
} as const;

// ---- Cluster section headings / collapse labels ------------------
export const V2_IR46_SECTION_LABELS = {
  buyer_pack_eyebrow: {
    en: "Buyer Pack Layer",
    ar: "طبقة حزم المستفيدين",
  } as BilingualLabel,
  buyer_pack_intro: {
    en: "Five buyer-side framings the platform composes evidence for. Advisory only; reviewer-of-record stays on the buyer side.",
    ar: "خمسة تأطيرات على جانب المستفيد تُركّب المنصة الأدلة لها. استرشادية فقط؛ ويبقى المراجِع المسؤول على جانب المستفيد.",
  } as BilingualLabel,
  analyst_depth_label: {
    en: "Analyst depth — Mathematical core, readiness bands, evidence lineage, kernel layers, locked-engine grid, intelligence layers. Open to review.",
    ar: "عمق المحلل — النواة الرياضية، عصابات الجاهزية، سلسلة نسب الأدلة، طبقات النواة، شبكة المحركات المُغلقة، طبقات الذكاء. قابلة للمراجعة.",
  } as BilingualLabel,
  analyst_depth_caveat: {
    en: "Engineering detail intentionally compressed below the executive read. Open this section to see how each cluster is composed; the boundary above (advisory only · municipal review required) remains in force for every output below.",
    ar: "التفصيل الهندسي مضغوط عمداً تحت القراءة التنفيذية. افتح هذا القسم لرؤية كيف تُركَّب كل عنقدة؛ ويبقى الحدّ أعلاه (استشاري فقط · مراجعة بلدية مطلوبة) سارياً على كل مخرَج أدناه.",
  } as BilingualLabel,
} as const;

// Helper · returns the Arabic zone name if known, otherwise null
export function findArabicZoneName(zone_id_or_lower: string | null): string | null {
  if (!zone_id_or_lower) return null;
  return V2_RIYADH_ZONE_AR[zone_id_or_lower]
    ?? V2_RIYADH_ZONE_AR[zone_id_or_lower.toUpperCase()]
    ?? V2_RIYADH_ZONE_AR[zone_id_or_lower.toLowerCase()]
    ?? null;
}

// ====================================================================
// IR-47 — Partner Intelligence Backbone Layer (cloud-agnostic).
//
// Visible name: Partner Intelligence Backbone · العمود الذكي لمواءمة الشركاء
// Cloud-agnostic mapping of urban evidence, geospatial intelligence,
// AI explanation, governance, and buyer readiness into partner-ready
// deployment pathways. Advisory-only · no active integration claim ·
// no vendor name in any visible badge · partner examples appear only
// inside a single "candidate mappings only" disclosure note.
// ====================================================================

export const V2_IR47_PAGE_HEADER = {
  eyebrow: {
    en: "PARTNER INTELLIGENCE BACKBONE",
    ar: "العمود الذكي لمواءمة الشركاء",
  } as BilingualLabel,
  title: {
    en: "Partner Intelligence Backbone",
    ar: "العمود الذكي لمواءمة الشركاء",
  } as BilingualLabel,
  subtitle: {
    en: "A cloud-agnostic architecture layer for turning urban evidence into partner-ready decision intelligence pathways.",
    ar: "طبقة معمارية محايدة سحابيًا لتحويل الأدلة الحضرية إلى مسارات ذكاء قرار جاهزة للشركاء.",
  } as BilingualLabel,
  positioning: {
    en: "A cloud-agnostic architecture layer that maps urban evidence, geospatial intelligence, AI explanation, governance, and buyer readiness into partner-ready deployment pathways.",
    ar: "طبقة معمارية محايدة سحابيًا تربط الأدلة الحضرية، الذكاء الجغرافي، الشرح الذكي، الحوكمة، وجاهزية المشترين بمسارات شراكة قابلة للتنفيذ.",
  } as BilingualLabel,
  boundary: {
    en: "Advisory architecture mapping only. No active cloud integration, no official municipal boundary, no automated decisioning, and no guaranteed return is claimed.",
    ar: "مواءمة معمارية استشارية فقط. لا يوجد تكامل سحابي إنتاجي، ولا حدود بلدية رسمية، ولا قرار آلي، ولا عائد مضمون.",
  } as BilingualLabel,
} as const;

export const V2_IR47_TAB_LABELS = {
  workflow: {
    en: "Intelligence Workflow",
    ar: "سير العمل الذكي",
  } as BilingualLabel,
  capability: {
    en: "Cloud Capability Mapping",
    ar: "مواءمة قدرات السحابة",
  } as BilingualLabel,
  readiness: {
    en: "Pilot Readiness",
    ar: "جاهزية التجربة",
  } as BilingualLabel,
  value: {
    en: "Partner Value",
    ar: "قيمة الشركاء",
  } as BilingualLabel,
} as const;

// ---- (A-I) Intelligence Workflow steps -----------------------------
interface V2WorkflowStep {
  readonly id: string;
  readonly letter: string;
  readonly label_en: string;
  readonly label_ar: string;
  readonly description_en: string;
  readonly description_ar: string;
  readonly input_en: string;
  readonly input_ar: string;
  readonly output_en: string;
  readonly output_ar: string;
  readonly caveat_en?: string;
  readonly caveat_ar?: string;
}

export const V2_IR47_WORKFLOW_STEPS: readonly V2WorkflowStep[] = [
  {
    id: "evidence-intake",
    letter: "A",
    label_en: "Evidence Intake",
    label_ar: "استقبال الأدلة",
    description_en: "Reference urban-evidence packs (satellite tiles, municipal-style records, mobility traces, partner-supplied indicators) registered for review.",
    description_ar: "حزم أدلة حضرية مرجعية (لقطات قمرية، سجلات على نمط البلدية، آثار تنقّل، مؤشرات يقدّمها الشركاء) تُسجَّل للمراجعة.",
    input_en: "External reference evidence packs · partner-supplied indicators",
    input_ar: "حزم أدلة مرجعية خارجية · مؤشرات يقدّمها الشركاء",
    output_en: "Registered evidence tokens · candidate-only",
    output_ar: "رموز أدلة مسجَّلة · مرشّحة فقط",
    caveat_en: "Reference imagery only. No official-GIS claim. No municipal-integration claim.",
    caveat_ar: "صور مرجعية فقط. لا ادعاء بـGIS رسمي. لا ادعاء بتكامل بلدي.",
  },
  {
    id: "classification",
    letter: "B",
    label_en: "Classification",
    label_ar: "التصنيف",
    description_en: "Evidence tokens are organised into source families and intent categories so reviewers can navigate by meaning, not by file name.",
    description_ar: "تُنظَّم رموز الأدلة في عائلات مصدرية وفئات قصدية ليتنقّل المراجعون بالمعنى لا باسم الملف.",
    input_en: "Registered evidence tokens",
    input_ar: "رموز الأدلة المسجَّلة",
    output_en: "Source families · readiness bands · candidate edges",
    output_ar: "عائلات المصدر · عصابات الجاهزية · حواف مرشّحة",
  },
  {
    id: "transform",
    letter: "C",
    label_en: "Transform",
    label_ar: "التحويل",
    description_en: "Classified tokens are projected onto the platform's analytical surface (objects, relationships, readiness bands). No active warehouse, no live ETL.",
    description_ar: "تُسقَط الرموز المصنَّفة على السطح التحليلي للمنصة (كائنات، علاقات، عصابات جاهزية). لا مستودع نشط ولا تحويل بياني حي.",
    input_en: "Classified evidence tokens",
    input_ar: "رموز أدلة مصنَّفة",
    output_en: "Projected analytical objects · in-memory",
    output_ar: "كائنات تحليلية مُسقَطة · في الذاكرة",
    caveat_en: "Projection-only. No persistent database. No production ETL.",
    caveat_ar: "إسقاط فقط. لا قاعدة بيانات دائمة. لا تحويل بياني إنتاجي.",
  },
  {
    id: "buyer-intelligence",
    letter: "D",
    label_en: "Buyer Intelligence",
    label_ar: "ذكاء المستفيد",
    description_en: "Analytical projections are composed into buyer-side framings (municipality, investor, insurance, telecom, cloud, advisory) so each buyer sees evidence in their own decision lens.",
    description_ar: "تُركَّب الإسقاطات التحليلية في تأطيرات على جانب المستفيد (بلدية، مستثمر، تأمين، اتصالات، سحابة، استشارات) ليرى كل مستفيد الأدلة بعدسة قراره.",
    input_en: "Analytical objects · readiness bands",
    input_ar: "كائنات تحليلية · عصابات جاهزية",
    output_en: "Buyer lenses · buyer packs (candidate)",
    output_ar: "عدسات المستفيدين · حزم المستفيدين (مرشّحة)",
  },
  {
    id: "earth-evidence",
    letter: "E",
    label_en: "Satellite / Earth Evidence",
    label_ar: "أدلة الأقمار والأرض",
    description_en: "Reference satellite tiles and earth-observation imagery support the spatial reading; map context is rendered through MapLibre with a public basemap key.",
    description_ar: "تدعم لقطات الأقمار المرجعية وصور رصد الأرض القراءة المكانية؛ ويُعرض سياق الخريطة عبر MapLibre بمفتاح خريطة أساس عام.",
    input_en: "Reference satellite tiles · public basemap",
    input_ar: "لقطات قمرية مرجعية · خريطة أساس عامة",
    output_en: "Spatial context · zone-level posture",
    output_ar: "سياق مكاني · حالة على مستوى المنطقة",
    caveat_en: "Reference imagery, not an official survey. Zone-level posture, never individuals.",
    caveat_ar: "صور مرجعية، لا مسح رسمي. حالة على مستوى المنطقة، لا أفراد.",
  },
  {
    id: "mathematical-core",
    letter: "F",
    label_en: "Mathematical Core",
    label_ar: "النواة الرياضية",
    description_en: "Bounded readiness mathematics produces candidate readiness bands; weights and thresholds are constitutionally frozen until governance review.",
    description_ar: "رياضيات الجاهزية المقيدة تُنتج عصابات جاهزية مرشّحة؛ والأوزان والعتبات مجمّدة دستوريًا حتى المراجعة الحوكمية.",
    input_en: "Analytical objects · candidate edges",
    input_ar: "كائنات تحليلية · حواف مرشّحة",
    output_en: "Readiness bands · explainability traces",
    output_ar: "عصابات الجاهزية · أثر التفسير",
    caveat_en: "Bounded outputs. Not a yield model. No guaranteed return.",
    caveat_ar: "مخرجات مقيدة. ليست نموذج عائد. لا عائد مضمون.",
  },
  {
    id: "ai-explanation",
    letter: "G",
    label_en: "AI Explanation",
    label_ar: "الشرح الذكي",
    description_en: "A reviewer-facing explanation layer renders why each readiness band landed where it did, tied back to the evidence tokens that drove it.",
    description_ar: "طبقة شرح موجَّهة للمراجع تُظهر سبب وقوع كل عصابة جاهزية حيث وقعت، مع ربطها بأدلتها المغذِّية.",
    input_en: "Readiness bands · evidence tokens",
    input_ar: "عصابات الجاهزية · رموز الأدلة",
    output_en: "Explanation traces · per-band rationale",
    output_ar: "آثار الشرح · تبرير لكل عصابة",
    caveat_en: "Advisory explanation. Not an automated decisioning system.",
    caveat_ar: "شرح استشاري. ليس نظام قرار آلي.",
  },
  {
    id: "decision-surface",
    letter: "H",
    label_en: "Decision Surface",
    label_ar: "سطح القرار",
    description_en: "The reviewer sees readiness, evidence, and explanation in one institutional surface so a single screen can be acted on by a municipal director.",
    description_ar: "يرى المراجع الجاهزية والأدلة والشرح في سطح مؤسسي واحد، فيمكن لمدير بلدي العمل على شاشة واحدة.",
    input_en: "Bands · evidence · explanation",
    input_ar: "عصابات · أدلة · شرح",
    output_en: "Reviewer-facing decision surface",
    output_ar: "سطح قرار يواجه المراجع",
  },
  {
    id: "governance",
    letter: "I",
    label_en: "Governance",
    label_ar: "الحوكمة",
    description_en: "A digest-verified audit trail captures every projection, every reviewer interaction, and every readiness emission; municipal review remains the sole producer of consequential conclusions.",
    description_ar: "سجل تدقيق مُحقَّق رقمياً يلتقط كل إسقاط وكل تفاعل من المراجع وكل إصدار جاهزية؛ وتبقى المراجعة البلدية المنتج الوحيد للاستنتاجات ذات الأثر.",
    input_en: "All surface emissions",
    input_ar: "كل المخرجات السطحية",
    output_en: "Audit trail · governance seal",
    output_ar: "سجل تدقيق · ختم حوكمي",
    caveat_en: "Constitutional rail. Advisory pressure only. No enforcement claim.",
    caveat_ar: "ركيزة دستورية. ضغط استرشادي فقط. لا ادعاء إنفاذ.",
  },
] as const;

// ---- Cloud Capability Mapping (cloud-agnostic) ---------------------
interface V2CapabilityRow {
  readonly id: string;
  readonly need_en: string;
  readonly need_ar: string;
  readonly capability_en: string;
  readonly capability_ar: string;
}

export const V2_IR47_CAPABILITY_MAP: readonly V2CapabilityRow[] = [
  { id: "evidence-storage",         need_en: "Evidence storage",                   need_ar: "تخزين الأدلة",                  capability_en: "Object storage",                       capability_ar: "تخزين كائني" },
  { id: "evidence-warehouse",       need_en: "Structured evidence warehouse",      need_ar: "مستودع أدلة مهيكَل",            capability_en: "Analytical warehouse",                  capability_ar: "مستودع تحليلي" },
  { id: "geospatial-analytics",     need_en: "Geospatial analytics",               need_ar: "تحليلات جغرافية مكانية",        capability_en: "Spatial query engine",                  capability_ar: "محرك استعلام مكاني" },
  { id: "earth-observation",        need_en: "Satellite / raster context",         need_ar: "سياق قمري / نقطي",              capability_en: "Earth observation layer",               capability_ar: "طبقة رصد الأرض" },
  { id: "ai-explanation",           need_en: "AI explanation",                     need_ar: "الشرح الذكي",                    capability_en: "Foundation model / agent layer",        capability_ar: "نموذج أساسي / طبقة وكيل ذكي" },
  { id: "executive-analytics",      need_en: "Executive analytics",                need_ar: "تحليلات تنفيذية",               capability_en: "BI / embedded analytics",               capability_ar: "ذكاء أعمال / تحليلات مدمجة" },
  { id: "governance",               need_en: "Governance",                         need_ar: "الحوكمة",                       capability_en: "IAM, logs, policy controls",            capability_ar: "هويات وصلاحيات وسجلات وضوابط سياسات" },
  { id: "secure-deployment",        need_en: "Secure deployment",                  need_ar: "نشر آمن",                       capability_en: "Cloud environment",                     capability_ar: "بيئة سحابية" },
] as const;

export const V2_IR47_CAPABILITY_NOTE = {
  en: "Partner examples may include cloud and advisory ecosystem partners. These are candidate capability mappings only, not active integrations. The platform claims no production deployment, no official integration, and no live data ingestion through any named partner.",
  ar: "قد تشمل أمثلة الشركاء شركاء سحابة واستشارات. هذه مواءمات قدرات مرشّحة فقط، وليست تكاملات نشطة. لا تدّعي المنصة نشرًا إنتاجيًا، ولا تكاملًا رسميًا، ولا استيعابًا حيًّا للبيانات عبر أي شريك مُسمَّى.",
} as BilingualLabel;

// ---- Pilot Readiness rows ------------------------------------------
type V2ReadinessTone =
  | "candidate-ready"
  | "staged"
  | "reference"
  | "not-active"
  | "active"
  | "required"
  | "not-claimed";

interface V2ReadinessRow {
  readonly id: string;
  readonly lane_en: string;
  readonly lane_ar: string;
  readonly status_en: string;
  readonly status_ar: string;
  readonly tone: V2ReadinessTone;
}

export const V2_IR47_PILOT_READINESS: readonly V2ReadinessRow[] = [
  { id: "riyadh-evidence",     lane_en: "Riyadh evidence lane",     lane_ar: "مسار أدلة الرياض",            status_en: "Candidate-ready",           status_ar: "جاهز كمرشّح",        tone: "candidate-ready" },
  { id: "saudi-expansion",     lane_en: "Saudi expansion",          lane_ar: "التوسع السعودي",              status_en: "Staged",                    status_ar: "مرحلي",              tone: "staged" },
  { id: "kuwait-baseline",     lane_en: "Kuwait baseline",          lane_ar: "الخط الأساسي الكويتي",         status_en: "Reference only",            status_ar: "مرجعي فقط",          tone: "reference" },
  { id: "gcc-expansion",       lane_en: "GCC expansion",            lane_ar: "التوسع الخليجي",               status_en: "Staged",                    status_ar: "مرحلي",              tone: "staged" },
  { id: "cloud-deployment",    lane_en: "Cloud deployment",         lane_ar: "النشر السحابي",                status_en: "Not active",                status_ar: "غير نشط",            tone: "not-active" },
  { id: "governance",          lane_en: "Governance",               lane_ar: "الحوكمة",                       status_en: "Active",                    status_ar: "نشط",                tone: "active" },
  { id: "human-review",        lane_en: "Human review",             lane_ar: "المراجعة البشرية",             status_en: "Required",                  status_ar: "مطلوبة",             tone: "required" },
  { id: "production",          lane_en: "Production integration",   lane_ar: "التكامل الإنتاجي",             status_en: "Not claimed",               status_ar: "غير مُدَّعى",        tone: "not-claimed" },
] as const;

// ---- Partner Value cards -------------------------------------------
interface V2PartnerValueCard {
  readonly id: string;
  readonly partner_en: string;
  readonly partner_ar: string;
  readonly care_en: string;
  readonly care_ar: string;
  readonly provides_en: string;
  readonly provides_ar: string;
  readonly output_en: string;
  readonly output_ar: string;
  readonly boundary_en: string;
  readonly boundary_ar: string;
}

export const V2_IR47_PARTNER_VALUE: readonly V2PartnerValueCard[] = [
  {
    id: "cloud-partner",
    partner_en: "Cloud Partner",
    partner_ar: "شريك سحابي",
    care_en: "A reference customer that maps real urban evidence onto cloud capability categories without claiming active integration.",
    care_ar: "عميل مرجعي يربط أدلة حضرية فعلية بفئات قدرات سحابية دون ادعاء تكامل نشط.",
    provides_en: "Cloud-agnostic capability map · evidence-to-capability tracing · governance posture",
    provides_ar: "خريطة قدرات محايدة سحابيًا · تتبّع من الأدلة إلى القدرة · موقف حوكمي",
    output_en: "Candidate partnership architecture card",
    output_ar: "بطاقة معمارية شراكة مرشّحة",
    boundary_en: "Candidate mapping only. No active partnership claim.",
    boundary_ar: "مواءمة مرشّحة فقط. لا ادعاء بشراكة نشطة.",
  },
  {
    id: "municipality",
    partner_en: "Municipality / Public Sector",
    partner_ar: "البلدية / القطاع العام",
    care_en: "A reviewer-anchored decision surface that exposes evidence, readiness, and explanation in one institutional view.",
    care_ar: "سطح قرار يرتكز على المراجع ويعرض الأدلة والجاهزية والشرح في عرض مؤسسي واحد.",
    provides_en: "Decision Readiness Panel · Evidence Atlas · digest-verified audit trail",
    provides_ar: "لوحة جاهزية القرار · أطلس الأدلة · سجل تدقيق مُحقَّق رقمياً",
    output_en: "Reviewer brief · evidence-anchored readiness packet",
    output_ar: "موجز للمراجع · حزمة جاهزية مرتكزة على الأدلة",
    boundary_en: "Advisory only. Municipal review is the sole producer of consequential conclusions.",
    boundary_ar: "استشاري فقط. المراجعة البلدية هي المنتِج الوحيد للاستنتاجات ذات الأثر.",
  },
  {
    id: "investor",
    partner_en: "Investor / Developer",
    partner_ar: "مستثمر / مطوّر",
    care_en: "Zone-level readiness signal as a candidate input to a wider, human-led investment review.",
    care_ar: "إشارة جاهزية على مستوى المنطقة كمدخل مرشّح لمراجعة استثمارية أشمل بقيادة بشرية.",
    provides_en: "Buyer Pack (investor lens) · readiness bands · explanation trace",
    provides_ar: "حزمة مستفيد (عدسة المستثمر) · عصابات جاهزية · أثر شرح",
    output_en: "Investor reference brief · candidate readiness lanes",
    output_ar: "موجز مرجعي للمستثمر · مسارات جاهزية مرشّحة",
    boundary_en: "Not a yield model. No investment recommendation. No guaranteed return.",
    boundary_ar: "ليس نموذج عائد. لا توصية استثمارية. لا عائد مضمون.",
  },
  {
    id: "telecom",
    partner_en: "Telecom / Infrastructure",
    partner_ar: "اتصالات / بنية تحتية",
    care_en: "Mobility and infrastructure signal context to support a partner-led infrastructure planning workflow.",
    care_ar: "سياق إشارات التنقّل والبنية التحتية لدعم سير عمل تخطيط بنية تحتية يقوده الشريك.",
    provides_en: "Infrastructure & Telecom fusion card · zone-level posture · explanation trace",
    provides_ar: "بطاقة دمج البنية والاتصالات · حالة على مستوى المنطقة · أثر شرح",
    output_en: "Telecom / infrastructure reference brief",
    output_ar: "موجز مرجعي للاتصالات / البنية",
    boundary_en: "Reference only. Not a network deployment plan.",
    boundary_ar: "مرجعي فقط. ليس خطة نشر شبكة.",
  },
  {
    id: "insurance",
    partner_en: "Insurance / Risk",
    partner_ar: "تأمين / مخاطر",
    care_en: "Zone-level exposure context as a candidate input to insurer-side underwriting review.",
    care_ar: "سياق تعرّض على مستوى المنطقة كمدخل مرشّح لمراجعة اكتتاب لدى المؤمِّن.",
    provides_en: "Insurance & Risk fusion card · readiness bands · governance posture",
    provides_ar: "بطاقة دمج التأمين والمخاطر · عصابات جاهزية · موقف حوكمي",
    output_en: "Insurance reference brief · candidate exposure bands",
    output_ar: "موجز مرجعي للتأمين · عصابات تعرّض مرشّحة",
    boundary_en: "Bounded exposure bands. Not a pricing engine. No underwriting decision.",
    boundary_ar: "عصابات تعرّض مقيدة. ليس محرك تسعير. لا قرار اكتتاب.",
  },
  {
    id: "advisory",
    partner_en: "Advisory Firm",
    partner_ar: "بيت استشاري",
    care_en: "A defensible architecture mapping that an advisory partner can present alongside their own diligence work.",
    care_ar: "مواءمة معمارية قابلة للدفاع يمكن لبيت استشاري شريك تقديمها إلى جانب عمله البحثي.",
    provides_en: "Architecture mapping · governance posture · partner-readable evidence trail",
    provides_ar: "مواءمة معمارية · موقف حوكمي · أثر أدلة قابل للقراءة من الشريك",
    output_en: "Advisory reference deck · candidate-only",
    output_ar: "عرض مرجعي استشاري · مرشّح فقط",
    boundary_en: "Reference architecture only. Not a procurement decision.",
    boundary_ar: "معمارية مرجعية فقط. ليست قرار مشتريات.",
  },
] as const;

// ---- Overview teaser (compact, on /v2/overview) --------------------
export const V2_IR47_OVERVIEW_TEASER = {
  eyebrow: {
    en: "PARTNER INTELLIGENCE BACKBONE",
    ar: "العمود الذكي لمواءمة الشركاء",
  } as BilingualLabel,
  title: {
    en: "Partner Intelligence Backbone",
    ar: "العمود الذكي لمواءمة الشركاء",
  } as BilingualLabel,
  body: {
    en: "Cloud-agnostic architecture for mapping evidence, geospatial intelligence, AI explanation, governance, and buyer readiness into partner-ready deployment pathways.",
    ar: "معمارية محايدة سحابيًا تربط الأدلة، الذكاء الجغرافي، الشرح الذكي، الحوكمة، وجاهزية المشترين بمسارات شراكة قابلة للتنفيذ.",
  } as BilingualLabel,
  cta: {
    en: "Open Partner Backbone",
    ar: "فتح عمود الشركاء",
  } as BilingualLabel,
} as const;

// ---- Cross-surface labels (sidebar nav · top-nav · footer) ---------
export const V2_IR47_NAV_LABELS = {
  top_nav: {
    en: "Partner Backbone",
    ar: "عمود الشركاء",
  } as BilingualLabel,
  sidebar: {
    en: "Partner Intelligence Backbone",
    ar: "العمود الذكي لمواءمة الشركاء",
  } as BilingualLabel,
  sidebar_hint: {
    en: "External route · /v2/partner-backbone · advisory architecture",
    ar: "مسار خارجي · /v2/partner-backbone · معمارية استشارية",
  } as BilingualLabel,
} as const;
