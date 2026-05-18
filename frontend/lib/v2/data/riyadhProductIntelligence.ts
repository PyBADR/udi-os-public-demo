/**
 * IR-31A — Riyadh Product Intelligence Operating Surface fixture.
 *
 * Local, static, governance-safe fixture that converts Saudi/Riyadh
 * evidence assets into typed buyer-facing decision-readiness objects.
 *
 * Constitutional posture (binding):
 *   - Advisory only.
 *   - Human review required.
 *   - Evidence-linked.
 *   - No automated action.
 *   - Not an official municipal finding.
 *   - Not a regulatory determination.
 *   - Not an underwriting decision.
 *   - No guaranteed ROI.
 *
 * Data discipline:
 *   - No live API.
 *   - No backend dependency.
 *   - No paid map service.
 *   - All asset paths point to existing repo placeholders or are
 *     marked as `placeholder: true` so missing files cannot break
 *     the build (consumers fall back to a "Pending source" tile).
 *   - All copy is bilingual (EN + AR, authored). AR is institutional
 *     Gulf-Arabic phrasing, never machine-translated.
 *
 * Banned-vocabulary discipline:
 *   Every governance caveat uses negation framing only ("Not a …",
 *   "No …"). Positive positioning is restricted to the safe-commercial
 *   vocabulary documented in the IR-31A brief §F.
 */

export interface BilingualString {
  en: string;
  ar: string;
}

/** Coarse provenance family. Source-Registry boundary, never an
 *  official-integration claim. */
export type SourceFamily =
  | "open_satellite"
  | "open_municipal_public_surface"
  | "open_market_authority"
  | "open_statistical_authority"
  | "internal_governance_note"
  | "buyer_pack_compilation"
  | "reference_index";

/** Asset-type taxonomy used by the operating surface tiles. */
export type AssetType =
  | "regional_context_imagery"
  | "before_after_imagery"
  | "municipal_public_surface_view"
  | "municipal_legend_reference"
  | "metadata_index"
  | "market_signal_reference"
  | "statistical_signal_reference"
  | "governance_note"
  | "buyer_ready_pack";

export type VisualRole =
  | "base_map"
  | "before_state"
  | "after_state"
  | "reference_overlay"
  | "legend_overlay"
  | "index_panel"
  | "signal_panel"
  | "governance_panel"
  | "pack_panel";

export type MetadataStatus =
  | "captured"
  | "partial_pending"
  | "review_pending";

export type ReviewStatus =
  | "human_review_required"
  | "human_review_in_preparation";

/** Buyer-relevance is a soft routing hint — not a recommendation. */
export type BuyerRelevance =
  | "municipality"
  | "insurance"
  | "developer"
  | "cloud_telco"
  | "investor"
  | "consulting"
  | "cross_buyer";

export type LinkedPackageId =
  | "municipal_decision_readiness"
  | "riyadh_saudi_evidence_atlas"
  | "developer_site_readiness"
  | "real_estate_intelligence"
  | "insurable_urban_risk_context"
  | "cloud_telco_reference_architecture"
  | "governance_assurance"
  | "sixty_day_institutional_pilot";

export interface EvidenceAsset {
  id: string;
  title: BilingualString;
  geography: BilingualString;
  sourceFamily: SourceFamily;
  assetType: AssetType;
  visualRole: VisualRole;
  metadataStatus: MetadataStatus;
  reviewStatus: ReviewStatus;
  buyerRelevance: BuyerRelevance[];
  linkedPackage: LinkedPackageId[];
  governanceCaveat: BilingualString;
  safeLabel: BilingualString;
  /** Public asset path under /public, or null if no asset is bundled. */
  filePath: string | null;
  /** When true, consumers render a "Pending source" tile instead of
   *  the image — the surface never blocks on missing files. */
  placeholder: boolean;
  /** Optional capture-date or vintage marker (string, free-form,
   *  authored — never inferred). Use the sentinel "Pending source"
   *  for any value the registry has not yet validated. */
  vintage: BilingualString;
}

// -----------------------------------------------------------------
// Canonical caveats (reused across multiple assets)
// -----------------------------------------------------------------

const CAVEAT_NOT_OFFICIAL: BilingualString = {
  en: "Not an official municipal finding · not a regulatory determination · advisory only.",
  ar: "ليست نتيجة بلدية رسمية · ليست حكمًا تنظيميًا · استشاري فقط.",
};

const CAVEAT_NOT_LIVE_GIS: BilingualString = {
  en: "Not a live GIS feed · public-source-informed reference imagery · human review required.",
  ar: "ليست تغذية نظام معلومات جغرافية حية · صور مرجعية مستندة إلى مصدر عام · المراجعة البشرية مطلوبة.",
};

const CAVEAT_NOT_UNDERWRITING: BilingualString = {
  en: "Not an underwriting decision · not an actuarial model · advisory market context only.",
  ar: "ليس قرار اكتتاب · ليس نموذجًا اكتواريًا · سياق سوق استشاري فقط.",
};

const CAVEAT_NOT_STATISTICAL_PUBLICATION: BilingualString = {
  en: "Not an official statistical publication · reference signal for review preparation only.",
  ar: "ليست نشرة إحصائية رسمية · إشارة مرجعية لإعداد المراجعة فقط.",
};

const CAVEAT_GOVERNANCE_BOUNDARY: BilingualString = {
  en: "Governance posture is constitutional — no enforcement, no automated approval, no production decisioning.",
  ar: "وضع الحوكمة دستوري — لا إنفاذ، لا اعتماد آلي، لا تقرير إنتاجي.",
};

const CAVEAT_PACK_PREVIEW: BilingualString = {
  en: "Preview pack only · institutional review required before any downstream use.",
  ar: "حزمة معاينة فقط · مراجعة مؤسسية مطلوبة قبل أي استخدام لاحق.",
};

// -----------------------------------------------------------------
// Evidence assets
// -----------------------------------------------------------------

export const RIYADH_EVIDENCE_ASSETS: EvidenceAsset[] = [
  {
    id: "asset.regional.context",
    title: {
      en: "Riyadh regional context — base map",
      ar: "السياق الإقليمي للرياض — الخريطة الأساس",
    },
    geography: { en: "Riyadh region", ar: "منطقة الرياض" },
    sourceFamily: "open_satellite",
    assetType: "regional_context_imagery",
    visualRole: "base_map",
    metadataStatus: "captured",
    reviewStatus: "human_review_required",
    buyerRelevance: ["cross_buyer"],
    linkedPackage: ["riyadh_saudi_evidence_atlas", "sixty_day_institutional_pilot"],
    governanceCaveat: CAVEAT_NOT_LIVE_GIS,
    safeLabel: {
      en: "Operational context for review preparation",
      ar: "سياق تشغيلي لإعداد المراجعة",
    },
    filePath: "/v2/intro/saudi-riyadh-platform-reveal.png",
    placeholder: false,
    vintage: {
      en: "Open-source imagery · vintage authored on review",
      ar: "صور مفتوحة المصدر · العمر يُقَر عند المراجعة",
    },
  },
  {
    id: "asset.before.core",
    title: {
      en: "Riyadh urban core — before state",
      ar: "النواة الحضرية للرياض — الحالة قبل",
    },
    geography: { en: "Central Riyadh", ar: "وسط الرياض" },
    sourceFamily: "open_satellite",
    assetType: "before_after_imagery",
    visualRole: "before_state",
    metadataStatus: "captured",
    reviewStatus: "human_review_required",
    buyerRelevance: ["municipality", "developer", "investor", "consulting"],
    linkedPackage: [
      "municipal_decision_readiness",
      "developer_site_readiness",
      "real_estate_intelligence",
    ],
    governanceCaveat: CAVEAT_NOT_OFFICIAL,
    safeLabel: {
      en: "Before-state reference for visual comparison",
      ar: "مرجع لحالة ما قبل المقارنة البصرية",
    },
    filePath: "/demo-assets/riyadh-evidence-pack/riyadh-core-before-usgs.png",
    placeholder: false,
    vintage: {
      en: "USGS-equivalent open imagery · vintage on file",
      ar: "صور مفتوحة بمستوى USGS · العمر موثَّق",
    },
  },
  {
    id: "asset.after.core",
    title: {
      en: "Riyadh urban core — after state",
      ar: "النواة الحضرية للرياض — الحالة بعد",
    },
    geography: { en: "Central Riyadh", ar: "وسط الرياض" },
    sourceFamily: "open_satellite",
    assetType: "before_after_imagery",
    visualRole: "after_state",
    metadataStatus: "captured",
    reviewStatus: "human_review_required",
    buyerRelevance: ["municipality", "developer", "investor", "consulting"],
    linkedPackage: [
      "municipal_decision_readiness",
      "developer_site_readiness",
      "real_estate_intelligence",
    ],
    governanceCaveat: CAVEAT_NOT_OFFICIAL,
    safeLabel: {
      en: "After-state reference for visual comparison",
      ar: "مرجع لحالة ما بعد المقارنة البصرية",
    },
    filePath: "/demo-assets/riyadh-evidence-pack/riyadh-core-after-usgs.png",
    placeholder: false,
    vintage: {
      en: "USGS-equivalent open imagery · vintage on file",
      ar: "صور مفتوحة بمستوى USGS · العمر موثَّق",
    },
  },
  {
    id: "asset.before.north",
    title: {
      en: "Northern corridor — before state",
      ar: "الممر الشمالي — الحالة قبل",
    },
    geography: { en: "North Riyadh", ar: "شمال الرياض" },
    sourceFamily: "open_satellite",
    assetType: "before_after_imagery",
    visualRole: "before_state",
    metadataStatus: "captured",
    reviewStatus: "human_review_required",
    buyerRelevance: ["municipality", "developer", "cloud_telco"],
    linkedPackage: [
      "municipal_decision_readiness",
      "developer_site_readiness",
      "cloud_telco_reference_architecture",
    ],
    governanceCaveat: CAVEAT_NOT_OFFICIAL,
    safeLabel: {
      en: "Northern corridor reference imagery",
      ar: "صور مرجعية للممر الشمالي",
    },
    filePath: "/demo-assets/riyadh-evidence-pack/riyadh-north-before-usgs.png",
    placeholder: false,
    vintage: {
      en: "Open imagery · vintage on file",
      ar: "صور مفتوحة · العمر موثَّق",
    },
  },
  {
    id: "asset.after.north",
    title: {
      en: "Northern corridor — after state",
      ar: "الممر الشمالي — الحالة بعد",
    },
    geography: { en: "North Riyadh", ar: "شمال الرياض" },
    sourceFamily: "open_satellite",
    assetType: "before_after_imagery",
    visualRole: "after_state",
    metadataStatus: "captured",
    reviewStatus: "human_review_required",
    buyerRelevance: ["municipality", "developer", "cloud_telco"],
    linkedPackage: [
      "municipal_decision_readiness",
      "developer_site_readiness",
      "cloud_telco_reference_architecture",
    ],
    governanceCaveat: CAVEAT_NOT_OFFICIAL,
    safeLabel: {
      en: "Northern corridor reference imagery — after state",
      ar: "صور مرجعية للممر الشمالي — الحالة بعد",
    },
    filePath: "/demo-assets/riyadh-evidence-pack/riyadh-north-after-usgs.png",
    placeholder: false,
    vintage: {
      en: "Open imagery · vintage on file",
      ar: "صور مفتوحة · العمر موثَّق",
    },
  },
  {
    id: "asset.balady.surface",
    title: {
      en: "Balady municipal public surface — reference view",
      ar: "السطح البلدي العام (بلدي) — عرض مرجعي",
    },
    geography: { en: "Riyadh municipality", ar: "أمانة منطقة الرياض" },
    sourceFamily: "open_municipal_public_surface",
    assetType: "municipal_public_surface_view",
    visualRole: "reference_overlay",
    metadataStatus: "partial_pending",
    reviewStatus: "human_review_required",
    buyerRelevance: ["municipality", "developer", "consulting"],
    linkedPackage: [
      "municipal_decision_readiness",
      "developer_site_readiness",
      "governance_assurance",
    ],
    governanceCaveat: {
      en: "Reference view of a public municipal surface · not a live municipal system integration.",
      ar: "عرض مرجعي لسطح بلدي عام · ليس تكاملًا حيًا مع أي نظام بلدي.",
    },
    safeLabel: {
      en: "Public-surface reference for stakeholder alignment",
      ar: "مرجع للسطح العام لمواءمة أصحاب المصلحة",
    },
    filePath: null,
    placeholder: true,
    vintage: {
      en: "Pending source — capture under review",
      ar: "في انتظار المصدر — الالتقاط قيد المراجعة",
    },
  },
  {
    id: "asset.balady.legend",
    title: {
      en: "Balady legend reference",
      ar: "مرجع وسيلة الإيضاح لبلدي",
    },
    geography: { en: "Riyadh municipality", ar: "أمانة منطقة الرياض" },
    sourceFamily: "open_municipal_public_surface",
    assetType: "municipal_legend_reference",
    visualRole: "legend_overlay",
    metadataStatus: "partial_pending",
    reviewStatus: "human_review_in_preparation",
    buyerRelevance: ["municipality", "developer", "consulting"],
    linkedPackage: ["municipal_decision_readiness", "developer_site_readiness"],
    governanceCaveat: {
      en: "Legend is reference vocabulary only · authoritative interpretation rests with the municipality.",
      ar: "وسيلة الإيضاح مفردات مرجعية فقط · التفسير المعتمد عند البلدية.",
    },
    safeLabel: {
      en: "Legend reference for review preparation",
      ar: "مرجع وسيلة الإيضاح لإعداد المراجعة",
    },
    filePath: null,
    placeholder: true,
    vintage: {
      en: "Pending source — capture under review",
      ar: "في انتظار المصدر — الالتقاط قيد المراجعة",
    },
  },
  {
    id: "asset.metadata.index",
    title: {
      en: "Evidence metadata index",
      ar: "فهرس بيانات الأدلة الوصفية",
    },
    geography: { en: "Riyadh evidence pack", ar: "حزمة أدلة الرياض" },
    sourceFamily: "reference_index",
    assetType: "metadata_index",
    visualRole: "index_panel",
    metadataStatus: "captured",
    reviewStatus: "human_review_required",
    buyerRelevance: ["cross_buyer"],
    linkedPackage: [
      "riyadh_saudi_evidence_atlas",
      "governance_assurance",
      "sixty_day_institutional_pilot",
    ],
    governanceCaveat: {
      en: "Index lists evidence assets · it does not certify any single asset's regulatory standing.",
      ar: "الفهرس يسرد أصول الأدلة · ولا يُصادق على أي وضع تنظيمي لأي أصل.",
    },
    safeLabel: {
      en: "Index for evidence sufficiency review",
      ar: "فهرس لمراجعة كفاية الأدلة",
    },
    filePath: null,
    placeholder: true,
    vintage: {
      en: "Index maintained alongside each asset",
      ar: "الفهرس يُحدَّث بمحاذاة كل أصل",
    },
  },
  {
    id: "asset.rega.market.signal",
    title: {
      en: "Open market authority signal — reference",
      ar: "إشارة من جهة سوق عامة — مرجع",
    },
    geography: { en: "Riyadh metropolitan area", ar: "نطاق الرياض الحضري" },
    sourceFamily: "open_market_authority",
    assetType: "market_signal_reference",
    visualRole: "signal_panel",
    metadataStatus: "review_pending",
    reviewStatus: "human_review_required",
    buyerRelevance: ["investor", "developer", "insurance", "consulting"],
    linkedPackage: [
      "real_estate_intelligence",
      "insurable_urban_risk_context",
      "developer_site_readiness",
    ],
    governanceCaveat: CAVEAT_NOT_UNDERWRITING,
    safeLabel: {
      en: "Indicative market context for review preparation",
      ar: "سياق سوق إرشادي لإعداد المراجعة",
    },
    filePath: null,
    placeholder: true,
    vintage: {
      en: "Open market authority data · vintage on file",
      ar: "بيانات جهة سوق عامة · العمر موثَّق",
    },
  },
  {
    id: "asset.gastat.statistical.signal",
    title: {
      en: "Open statistical authority signal — reference",
      ar: "إشارة من جهة إحصائية عامة — مرجع",
    },
    geography: { en: "Riyadh statistical region", ar: "المنطقة الإحصائية للرياض" },
    sourceFamily: "open_statistical_authority",
    assetType: "statistical_signal_reference",
    visualRole: "signal_panel",
    metadataStatus: "review_pending",
    reviewStatus: "human_review_required",
    buyerRelevance: ["municipality", "investor", "consulting"],
    linkedPackage: [
      "municipal_decision_readiness",
      "real_estate_intelligence",
      "riyadh_saudi_evidence_atlas",
    ],
    governanceCaveat: CAVEAT_NOT_STATISTICAL_PUBLICATION,
    safeLabel: {
      en: "Indicative statistical context for review preparation",
      ar: "سياق إحصائي إرشادي لإعداد المراجعة",
    },
    filePath: null,
    placeholder: true,
    vintage: {
      en: "Open statistical authority data · vintage on file",
      ar: "بيانات جهة إحصائية عامة · العمر موثَّق",
    },
  },
  {
    id: "asset.governance.note",
    title: {
      en: "Governance posture note",
      ar: "مذكرة وضع الحوكمة",
    },
    geography: { en: "Platform-wide", ar: "على مستوى المنصة" },
    sourceFamily: "internal_governance_note",
    assetType: "governance_note",
    visualRole: "governance_panel",
    metadataStatus: "captured",
    reviewStatus: "human_review_required",
    buyerRelevance: ["cross_buyer"],
    linkedPackage: ["governance_assurance", "sixty_day_institutional_pilot"],
    governanceCaveat: CAVEAT_GOVERNANCE_BOUNDARY,
    safeLabel: {
      en: "Governance boundary for evidence interpretation",
      ar: "حدود الحوكمة لتفسير الأدلة",
    },
    filePath: null,
    placeholder: true,
    vintage: {
      en: "Constitutional · revised under amendment only",
      ar: "دستوري · يُعدَّل عبر تعديل دستوري فقط",
    },
  },
  {
    id: "asset.gold.set",
    title: {
      en: "Gold set — buyer-ready evidence pack preview",
      ar: "المجموعة الذهبية — معاينة حزمة أدلة جاهزة للمشتري",
    },
    geography: { en: "Riyadh pilot scope", ar: "نطاق تجربة الرياض" },
    sourceFamily: "buyer_pack_compilation",
    assetType: "buyer_ready_pack",
    visualRole: "pack_panel",
    metadataStatus: "captured",
    reviewStatus: "human_review_required",
    buyerRelevance: ["cross_buyer"],
    linkedPackage: [
      "riyadh_saudi_evidence_atlas",
      "municipal_decision_readiness",
      "sixty_day_institutional_pilot",
    ],
    governanceCaveat: CAVEAT_PACK_PREVIEW,
    safeLabel: {
      en: "Board-ready evidence pack preview",
      ar: "معاينة حزمة أدلة جاهزة لمجلس الإدارة",
    },
    filePath: "/v2/intro/gcc-context-intro.png",
    placeholder: false,
    vintage: {
      en: "Compiled per pilot scope",
      ar: "تُجمَع حسب نطاق التجربة",
    },
  },
];

// -----------------------------------------------------------------
// Buyer lenses
// -----------------------------------------------------------------

export interface BuyerLens {
  id: BuyerRelevance;
  label: BilingualString;
  whatThisPageProves: BilingualString;
  whoThisServes: BilingualString;
  whatTheyReceive: BilingualString;
  whyItMatters: BilingualString;
  whatIsNotClaimed: BilingualString;
  nextStep: BilingualString;
  primaryPackages: LinkedPackageId[];
}

export const BUYER_LENSES: BuyerLens[] = [
  {
    id: "municipality",
    label: {
      en: "Municipality / Ministry",
      ar: "البلدية / الوزارة",
    },
    whatThisPageProves: {
      en: "That Riyadh-scoped evidence can be assembled into a review-ready decision-readiness pack with named sources and human-review gates at every transition.",
      ar: "أن الأدلة في نطاق الرياض يمكن تجميعها في حزمة جاهزية قرار قابلة للمراجعة، بمصادر مُسمّاة وبوابات مراجعة بشرية عند كل انتقال.",
    },
    whoThisServes: {
      en: "Municipal directors, ministry undersecretaries, and review-preparation teams.",
      ar: "مدراء البلدية، ووكلاء الوزارة، وفرق إعداد المراجعة.",
    },
    whatTheyReceive: {
      en: "A Municipal Decision Readiness Pack: evidence index, governance note, source-to-decision trace, and a 60-day institutional pilot pathway.",
      ar: "حزمة جاهزية القرار البلدي: فهرس الأدلة، ومذكرة الحوكمة، وأثر المصدر إلى القرار، ومسار تجربة مؤسسية لـ٦٠ يومًا.",
    },
    whyItMatters: {
      en: "It supports operational prioritization and stakeholder alignment ahead of formal review — without claiming a regulatory determination.",
      ar: "تدعم الأولوية التشغيلية ومواءمة أصحاب المصلحة قبل المراجعة الرسمية — دون ادّعاء حكم تنظيمي.",
    },
    whatIsNotClaimed: {
      en: "Not an official municipal finding. Not an enforcement instrument. Not a regulatory determination. No production decisioning.",
      ar: "ليست نتيجة بلدية رسمية. ليست أداة إنفاذ. ليست حكمًا تنظيميًا. لا تقرير إنتاجي.",
    },
    nextStep: {
      en: "Schedule a 60-day institutional pilot — governance-safe adoption, human-review gated.",
      ar: "جدولة تجربة مؤسسية لـ٦٠ يومًا — تبنٍّ آمن دستوريًا، وبمراجعة بشرية مُحكَمة.",
    },
    primaryPackages: [
      "municipal_decision_readiness",
      "governance_assurance",
      "sixty_day_institutional_pilot",
    ],
  },
  {
    id: "insurance",
    label: {
      en: "Insurance / Reinsurance",
      ar: "التأمين / إعادة التأمين",
    },
    whatThisPageProves: {
      en: "That Riyadh-scoped urban-risk context can be packaged with named open sources for portfolio-review preparation — without acting as an underwriting decision.",
      ar: "أن سياق المخاطر الحضرية في الرياض يمكن تغليفه بمصادر عامة مُسمّاة لإعداد مراجعة المحفظة — دون أن يكون قرار اكتتاب.",
    },
    whoThisServes: {
      en: "Portfolio analysts, risk officers, and reinsurance review desks.",
      ar: "محللو المحافظ، ومسؤولو المخاطر، ومكاتب مراجعة إعادة التأمين.",
    },
    whatTheyReceive: {
      en: "An Insurable Urban Risk Context Pack: indicative market and statistical signals with negation-framed caveats and a source-to-decision trace.",
      ar: "حزمة سياق مخاطر حضرية قابلة للتأمين: إشارات سوق وإحصاء إرشادية بقيود مُؤطَّرة بالنفي، وأثر المصدر إلى القرار.",
    },
    whyItMatters: {
      en: "It supports indicative operational value during portfolio-review preparation and stakeholder alignment.",
      ar: "تدعم قيمة تشغيلية إرشادية أثناء إعداد مراجعة المحفظة ومواءمة أصحاب المصلحة.",
    },
    whatIsNotClaimed: {
      en: "Not an underwriting decision. Not an actuarial model. No pricing or capacity recommendation.",
      ar: "ليس قرار اكتتاب. ليس نموذجًا اكتواريًا. لا توصية تسعير ولا توصية بسعة.",
    },
    nextStep: {
      en: "Run a bounded 60-day pilot to review evidence sufficiency for risk-context preparation.",
      ar: "تشغيل تجربة محدودة لـ٦٠ يومًا لمراجعة كفاية الأدلة لإعداد سياق المخاطر.",
    },
    primaryPackages: [
      "insurable_urban_risk_context",
      "riyadh_saudi_evidence_atlas",
      "sixty_day_institutional_pilot",
    ],
  },
  {
    id: "developer",
    label: {
      en: "Real Estate Developer / Master Developer",
      ar: "مطوّر عقاري / مطوّر رئيسي",
    },
    whatThisPageProves: {
      en: "That a site-level evidence operating surface can be assembled from open imagery and public-surface references for site-readiness review preparation.",
      ar: "أن سطح تشغيل أدلة على مستوى الموقع يمكن تجميعه من صور مفتوحة ومراجع عامة لإعداد مراجعة جاهزية الموقع.",
    },
    whoThisServes: {
      en: "Master-plan directors, site readiness leads, and developer governance teams.",
      ar: "مدراء المخطط الشامل، وقادة جاهزية الموقع، وفرق حوكمة المطوّر.",
    },
    whatTheyReceive: {
      en: "A Developer Site Readiness Pack and a Real Estate Intelligence Pack with named evidence and a 60-day pilot pathway.",
      ar: "حزمة جاهزية موقع المطوّر، وحزمة ذكاء عقاري بأدلة مُسمّاة ومسار تجربة لـ٦٠ يومًا.",
    },
    whyItMatters: {
      en: "It supports decision readiness and stakeholder alignment before binding commitments — without claiming any official planning approval.",
      ar: "تدعم جاهزية القرار ومواءمة أصحاب المصلحة قبل أي التزامات مُلزِمة — دون ادّعاء أي اعتماد تخطيطي رسمي.",
    },
    whatIsNotClaimed: {
      en: "Not an official planning approval. Not a regulatory determination. No automated underwriting.",
      ar: "ليس اعتمادًا تخطيطيًا رسميًا. ليس حكمًا تنظيميًا. لا اكتتاب آلي.",
    },
    nextStep: {
      en: "Engage on a 60-day pilot to align site-readiness evidence with internal governance.",
      ar: "الدخول في تجربة لـ٦٠ يومًا لمواءمة أدلة جاهزية الموقع مع الحوكمة الداخلية.",
    },
    primaryPackages: [
      "developer_site_readiness",
      "real_estate_intelligence",
      "sixty_day_institutional_pilot",
    ],
  },
  {
    id: "cloud_telco",
    label: {
      en: "Cloud / Telco Partner",
      ar: "شريك السحابة / الاتصالات",
    },
    whatThisPageProves: {
      en: "That the platform fits a reference architecture pattern with no production data dependency and a governance-safe deployment posture.",
      ar: "أن المنصة تنسجم مع نمط مرجعي معماري بلا تبعية لبيانات إنتاجية ووبموقف نشر آمن دستوريًا.",
    },
    whoThisServes: {
      en: "Cloud architecture partners, sovereign-cloud teams, and telco product teams.",
      ar: "شركاء معماريات السحابة، وفرق السحابة السيادية، وفرق منتجات الاتصالات.",
    },
    whatTheyReceive: {
      en: "A Cloud / Telco Reference Architecture Pack with deployment surface notes, governance posture, and a 60-day institutional pilot pathway.",
      ar: "حزمة مرجعية معمارية للسحابة / الاتصالات بملاحظات سطح النشر، ووضع الحوكمة، ومسار تجربة مؤسسية لـ٦٠ يومًا.",
    },
    whyItMatters: {
      en: "It supports stakeholder alignment on a governance-safe adoption pattern without claiming production decisioning.",
      ar: "تدعم مواءمة أصحاب المصلحة على نمط تبنٍّ آمن دستوريًا دون ادّعاء تقرير إنتاجي.",
    },
    whatIsNotClaimed: {
      en: "Not a production deployment claim. Not a live integration. No service-level guarantee.",
      ar: "ليس ادّعاء نشر إنتاجي. ليس تكاملًا حيًا. لا ضمان لمستوى خدمة.",
    },
    nextStep: {
      en: "Open a 60-day reference-architecture pilot scoped to the Riyadh evidence surface.",
      ar: "افتح تجربة معمارية مرجعية لـ٦٠ يومًا في نطاق سطح أدلة الرياض.",
    },
    primaryPackages: [
      "cloud_telco_reference_architecture",
      "governance_assurance",
      "sixty_day_institutional_pilot",
    ],
  },
  {
    id: "investor",
    label: {
      en: "Investor / Pilot Sponsor",
      ar: "مستثمر / راعي تجربة",
    },
    whatThisPageProves: {
      en: "That a bounded 60-day pilot can produce institutionally-defensible evidence packs anchored to named sources — without ROI guarantees.",
      ar: "أن تجربة محدودة لـ٦٠ يومًا يمكنها إنتاج حزم أدلة قابلة للدفاع مؤسسيًا ومرتبطة بمصادر مُسمّاة — دون ضمانات عائد.",
    },
    whoThisServes: {
      en: "Pilot sponsors, programme investors, and board-level governance readers.",
      ar: "رعاة التجارب، ومستثمرو البرامج، وقرّاء الحوكمة على مستوى المجلس.",
    },
    whatTheyReceive: {
      en: "A 60-Day Institutional Pilot Pack with milestones, governance contract preview, evidence-pack handoff structure, and forbidden-claims posture.",
      ar: "حزمة تجربة مؤسسية لـ٦٠ يومًا مع المعالم، ومعاينة عقد الحوكمة، وهيكل تسليم حزمة الأدلة، وموقف المزاعم المحظورة.",
    },
    whyItMatters: {
      en: "It supports indicative operational value with a defined-scope, advisory-only pathway and a clear governance boundary.",
      ar: "تدعم قيمة تشغيلية إرشادية بمسار محدود النطاق واستشاري فقط وحدّ حوكمة واضح.",
    },
    whatIsNotClaimed: {
      en: "No guaranteed ROI. No revenue uplift guarantee. No cost-saving guarantee. Not an investment recommendation.",
      ar: "لا ضمان عائد. لا ضمان رفع إيرادات. لا ضمان توفير تكاليف. ليست توصية استثمارية.",
    },
    nextStep: {
      en: "Sponsor a bounded 60-day pilot scoped to the Riyadh evidence operating surface.",
      ar: "رعاية تجربة محدودة لـ٦٠ يومًا في نطاق سطح تشغيل أدلة الرياض.",
    },
    primaryPackages: [
      "sixty_day_institutional_pilot",
      "riyadh_saudi_evidence_atlas",
      "governance_assurance",
    ],
  },
  {
    id: "consulting",
    label: {
      en: "Consulting / Advisory Firm",
      ar: "شركة استشارية",
    },
    whatThisPageProves: {
      en: "That advisory engagements can be evidence-anchored to a Riyadh operating surface with named sources, traceable reasoning, and a forbidden-claims linter.",
      ar: "أن الالتزامات الاستشارية يمكن ربطها بأدلة سطح تشغيلي للرياض بمصادر مُسمّاة، وسببية قابلة للتتبع، ولينتر مزاعم محظورة.",
    },
    whoThisServes: {
      en: "Engagement partners, advisory practice leads, and client-governance reviewers.",
      ar: "شركاء الالتزامات، وقادة الممارسة الاستشارية، ومراجعو الحوكمة لدى العميل.",
    },
    whatTheyReceive: {
      en: "An Evidence Atlas Pack and a Governance Assurance Pack for client-facing advisory delivery preparation.",
      ar: "حزمة أطلس أدلة وحزمة ضمانة حوكمة لإعداد التسليم الاستشاري الموجَّه للعميل.",
    },
    whyItMatters: {
      en: "It supports review preparation, stakeholder alignment, and a board-ready evidence pack for advisory delivery.",
      ar: "تدعم إعداد المراجعة، ومواءمة أصحاب المصلحة، وحزمة أدلة جاهزة لمجلس الإدارة للتسليم الاستشاري.",
    },
    whatIsNotClaimed: {
      en: "Not a regulatory opinion. Not an audit certification. No automated determination.",
      ar: "ليس رأيًا تنظيميًا. ليس شهادة تدقيق. لا حكم آلي.",
    },
    nextStep: {
      en: "Co-deliver a 60-day pilot anchored to the Riyadh evidence operating surface.",
      ar: "التسليم المشترك لتجربة ٦٠ يومًا مرتبطة بسطح تشغيل أدلة الرياض.",
    },
    primaryPackages: [
      "riyadh_saudi_evidence_atlas",
      "governance_assurance",
      "sixty_day_institutional_pilot",
    ],
  },
];

// -----------------------------------------------------------------
// Buyer-output packages
// -----------------------------------------------------------------

export interface BuyerPackage {
  id: LinkedPackageId;
  label: BilingualString;
  oneLine: BilingualString;
  contains: BilingualString;
  notClaimed: BilingualString;
}

export const BUYER_PACKAGES: BuyerPackage[] = [
  {
    id: "municipal_decision_readiness",
    label: {
      en: "Municipal Decision Readiness Pack",
      ar: "حزمة جاهزية القرار البلدي",
    },
    oneLine: {
      en: "Evidence-linked review-preparation pack for municipal directors.",
      ar: "حزمة إعداد مراجعة مرتبطة بالأدلة لمدراء البلدية.",
    },
    contains: {
      en: "Evidence index · governance note · source-to-decision trace · pilot pathway.",
      ar: "فهرس الأدلة · مذكرة الحوكمة · أثر المصدر إلى القرار · مسار التجربة.",
    },
    notClaimed: {
      en: "Not an official municipal finding · not enforcement.",
      ar: "ليست نتيجة بلدية رسمية · لا إنفاذ.",
    },
  },
  {
    id: "riyadh_saudi_evidence_atlas",
    label: {
      en: "Riyadh / Saudi Evidence Atlas Pack",
      ar: "حزمة أطلس أدلة الرياض / السعودية",
    },
    oneLine: {
      en: "Atlas-style assembly of named evidence assets for board-ready review.",
      ar: "تجميع بأسلوب أطلس لأصول أدلة مُسمّاة لمراجعة جاهزة لمجلس الإدارة.",
    },
    contains: {
      en: "Regional context · before/after references · open-source signals · governance posture.",
      ar: "السياق الإقليمي · مراجع قبل/بعد · إشارات مفتوحة المصدر · وضع الحوكمة.",
    },
    notClaimed: {
      en: "Not a regulatory determination · not a national-coverage claim.",
      ar: "ليس حكمًا تنظيميًا · ليس ادّعاء تغطية وطنية.",
    },
  },
  {
    id: "developer_site_readiness",
    label: {
      en: "Developer Site Readiness Pack",
      ar: "حزمة جاهزية موقع المطوّر",
    },
    oneLine: {
      en: "Site-level evidence pack for review preparation by master developers.",
      ar: "حزمة أدلة على مستوى الموقع لإعداد المراجعة لدى المطوّرين الرئيسيين.",
    },
    contains: {
      en: "Site imagery · public-surface references · evidence sufficiency notes.",
      ar: "صور الموقع · مراجع السطح العام · ملاحظات كفاية الأدلة.",
    },
    notClaimed: {
      en: "Not an official planning approval · not a regulatory determination.",
      ar: "ليس اعتمادًا تخطيطيًا رسميًا · ليس حكمًا تنظيميًا.",
    },
  },
  {
    id: "real_estate_intelligence",
    label: {
      en: "Real Estate Intelligence Pack",
      ar: "حزمة الذكاء العقاري",
    },
    oneLine: {
      en: "Indicative market-context pack for portfolio-review preparation.",
      ar: "حزمة سياق سوقي إرشادي لإعداد مراجعة المحفظة.",
    },
    contains: {
      en: "Open market signals · open statistical signals · operational caveats.",
      ar: "إشارات سوق مفتوحة · إشارات إحصائية مفتوحة · قيود تشغيلية.",
    },
    notClaimed: {
      en: "Not an investment recommendation · no guaranteed ROI.",
      ar: "ليست توصية استثمارية · لا ضمان عائد.",
    },
  },
  {
    id: "insurable_urban_risk_context",
    label: {
      en: "Insurable Urban Risk Context Pack",
      ar: "حزمة سياق مخاطر حضرية قابلة للتأمين",
    },
    oneLine: {
      en: "Indicative urban-risk context pack for portfolio-review preparation.",
      ar: "حزمة سياق مخاطر حضرية إرشادي لإعداد مراجعة المحفظة.",
    },
    contains: {
      en: "Urban-risk signals · governance posture · forbidden-claims posture.",
      ar: "إشارات المخاطر الحضرية · وضع الحوكمة · موقف المزاعم المحظورة.",
    },
    notClaimed: {
      en: "Not an underwriting decision · not an actuarial model.",
      ar: "ليس قرار اكتتاب · ليس نموذجًا اكتواريًا.",
    },
  },
  {
    id: "cloud_telco_reference_architecture",
    label: {
      en: "Cloud / Telco Reference Architecture Pack",
      ar: "حزمة معمارية مرجعية للسحابة / الاتصالات",
    },
    oneLine: {
      en: "Deployment-surface reference for partners on a governance-safe adoption pattern.",
      ar: "مرجع سطح نشر للشركاء على نمط تبنٍّ آمن دستوريًا.",
    },
    contains: {
      en: "Deployment surface notes · governance posture · 60-day pilot pathway.",
      ar: "ملاحظات سطح النشر · وضع الحوكمة · مسار تجربة ٦٠ يومًا.",
    },
    notClaimed: {
      en: "Not a production deployment · not a live integration claim.",
      ar: "ليس نشرًا إنتاجيًا · ليس ادّعاء تكامل حي.",
    },
  },
  {
    id: "governance_assurance",
    label: {
      en: "Governance Assurance Pack",
      ar: "حزمة ضمانة الحوكمة",
    },
    oneLine: {
      en: "Constitutional posture, forbidden-claims linter, and review-gate documentation.",
      ar: "الوضع الدستوري، ولينتر المزاعم المحظورة، وتوثيق بوابات المراجعة.",
    },
    contains: {
      en: "Governance note · forbidden-claims list · review-gate map.",
      ar: "مذكرة الحوكمة · قائمة المزاعم المحظورة · خريطة بوابات المراجعة.",
    },
    notClaimed: {
      en: "Not an audit certification · not an enforcement instrument.",
      ar: "ليس شهادة تدقيق · ليست أداة إنفاذ.",
    },
  },
  {
    id: "sixty_day_institutional_pilot",
    label: {
      en: "60-Day Institutional Pilot Pack",
      ar: "حزمة تجربة مؤسسية لـ٦٠ يومًا",
    },
    oneLine: {
      en: "Bounded pilot scope, milestones, governance contract preview, and handoff structure.",
      ar: "نطاق تجربة محدود، ومعالم، ومعاينة عقد حوكمة، وهيكل تسليم.",
    },
    contains: {
      en: "Pilot scope · milestones · governance contract preview · handoff structure.",
      ar: "نطاق التجربة · المعالم · معاينة عقد الحوكمة · هيكل التسليم.",
    },
    notClaimed: {
      en: "No guaranteed ROI · no production decisioning at conclusion.",
      ar: "لا ضمان عائد · لا تقرير إنتاجي عند الختام.",
    },
  },
];

// -----------------------------------------------------------------
// Source-to-decision trace
// -----------------------------------------------------------------

export interface TraceStep {
  step: number;
  label: BilingualString;
  detail: BilingualString;
  reviewGate: BilingualString;
}

export const SOURCE_TO_DECISION_TRACE: TraceStep[] = [
  {
    step: 1,
    label: { en: "Source", ar: "المصدر" },
    detail: {
      en: "Open imagery, public municipal surface, open market authority, open statistical authority. Each named, never inferred.",
      ar: "صور مفتوحة، وسطح بلدي عام، وجهة سوق عامة، وجهة إحصائية عامة. كل منها مُسمّى، ولا يُستنتَج.",
    },
    reviewGate: {
      en: "Human review confirms named source on capture.",
      ar: "تؤكّد المراجعة البشرية المصدر المُسمّى عند الالتقاط.",
    },
  },
  {
    step: 2,
    label: { en: "Evidence asset", ar: "أصل الدليل" },
    detail: {
      en: "Imagery, signal, or reference index — tagged with metadata status and review status.",
      ar: "صورة أو إشارة أو فهرس مرجعي — موسومة بحالة بيانات وصفية وحالة مراجعة.",
    },
    reviewGate: {
      en: "Human review confirms metadata sufficiency before pack assembly.",
      ar: "تؤكّد المراجعة البشرية كفاية البيانات الوصفية قبل تجميع الحزمة.",
    },
  },
  {
    step: 3,
    label: { en: "Operating surface", ar: "سطح التشغيل" },
    detail: {
      en: "The Riyadh Product Intelligence Surface composes named assets into a single review-ready operating view.",
      ar: "يجمع سطح ذكاء منتج الرياض الأصول المُسمّاة في عرض تشغيلي واحد جاهز للمراجعة.",
    },
    reviewGate: {
      en: "Human review confirms composition before buyer-pack export.",
      ar: "تؤكّد المراجعة البشرية التركيب قبل تصدير حزمة المشتري.",
    },
  },
  {
    step: 4,
    label: { en: "Buyer pack", ar: "حزمة المشتري" },
    detail: {
      en: "Pack contents are routed by buyer-lens selection — each pack carries its own negation-framed caveats.",
      ar: "تُوجَّه محتويات الحزمة باختيار عدسة المشتري — وتحمل كل حزمة قيودها المُؤطَّرة بالنفي.",
    },
    reviewGate: {
      en: "Human review confirms governance posture before handoff.",
      ar: "تؤكّد المراجعة البشرية وضع الحوكمة قبل التسليم.",
    },
  },
  {
    step: 5,
    label: { en: "Advisory handoff", ar: "تسليم استشاري" },
    detail: {
      en: "Pack is handed to the institutional buyer for internal review — the platform produces no decision.",
      ar: "تُسلَّم الحزمة للمشتري المؤسسي للمراجعة الداخلية — والمنصة لا تُنتج قرارًا.",
    },
    reviewGate: {
      en: "Buyer's own governance reviews and decides — platform is advisory only.",
      ar: "تتولى حوكمة المشتري المراجعة والقرار — والمنصة استشارية فقط.",
    },
  },
];

// -----------------------------------------------------------------
// Governance boundary (always-on strip)
// -----------------------------------------------------------------

export const GOVERNANCE_BOUNDARY_BULLETS: BilingualString[] = [
  { en: "Advisory only.",                         ar: "استشاري فقط." },
  { en: "Human review required.",                 ar: "المراجعة البشرية مطلوبة." },
  { en: "Evidence-linked.",                       ar: "مرتبط بالأدلة." },
  { en: "No automated action.",                   ar: "لا فعل آلي." },
  { en: "Not an official municipal finding.",     ar: "ليست نتيجة بلدية رسمية." },
  { en: "Not a regulatory determination.",        ar: "ليس حكمًا تنظيميًا." },
  { en: "Not an underwriting decision.",          ar: "ليس قرار اكتتاب." },
  { en: "No guaranteed ROI.",                     ar: "لا ضمان عائد." },
];

// -----------------------------------------------------------------
// Page-level copy
// -----------------------------------------------------------------

export const PAGE_COPY = {
  eyebrow: {
    en: "IR-31A · Riyadh product intelligence",
    ar: "IR-31A · ذكاء منتج الرياض",
  } as BilingualString,
  title: {
    en: "Spatial Evidence — Riyadh Product Intelligence Surface",
    ar: "الأدلة المكانية — سطح ذكاء منتج الرياض",
  } as BilingualString,
  subtitle: {
    en: "An advisory evidence operating surface that composes Riyadh-scoped open-source assets into review-ready, buyer-routable packs. Human review gates every transition.",
    ar: "سطح تشغيل أدلة استشاري يجمع أصول الرياض المفتوحة في حزم جاهزة للمراجعة وقابلة للتوجيه نحو المشتري. المراجعة البشرية تحكم كل انتقال.",
  } as BilingualString,
  evidenceSurfaceTitle: {
    en: "Evidence operating surface",
    ar: "سطح تشغيل الأدلة",
  } as BilingualString,
  beforeAfterTitle: {
    en: "Before / after evidence",
    ar: "الأدلة قبل / بعد",
  } as BilingualString,
  metadataPanelTitle: {
    en: "Metadata panel",
    ar: "لوحة البيانات الوصفية",
  } as BilingualString,
  traceTitle: {
    en: "Source-to-decision trace",
    ar: "أثر المصدر إلى القرار",
  } as BilingualString,
  lensSwitcherTitle: {
    en: "Buyer lens",
    ar: "عدسة المشتري",
  } as BilingualString,
  packagesTitle: {
    en: "Package output mapping",
    ar: "تخطيط مخرجات الحزم",
  } as BilingualString,
  governanceTitle: {
    en: "Governance boundary",
    ar: "حدود الحوكمة",
  } as BilingualString,
  pendingSourceLabel: {
    en: "Pending source",
    ar: "في انتظار المصدر",
  } as BilingualString,
  beforeTabLabel: { en: "Before", ar: "قبل" } as BilingualString,
  afterTabLabel:  { en: "After",  ar: "بعد" } as BilingualString,
  noBeforeAfterAvailable: {
    en: "No before/after pair is currently scoped to this selection.",
    ar: "لا يوجد زوج قبل/بعد ضمن نطاق هذا الاختيار حاليًا.",
  } as BilingualString,
};

// -----------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------

export function pickStr(v: BilingualString, lang: "en" | "ar"): string {
  return lang === "ar" ? v.ar : v.en;
}

/** Find the before/after pair sharing a geography label (EN match). */
export function findBeforeAfterPair(
  geographyEn: string,
): { before: EvidenceAsset | null; after: EvidenceAsset | null } {
  const before =
    RIYADH_EVIDENCE_ASSETS.find(
      (a) =>
        a.visualRole === "before_state" && a.geography.en === geographyEn,
    ) ?? null;
  const after =
    RIYADH_EVIDENCE_ASSETS.find(
      (a) =>
        a.visualRole === "after_state" && a.geography.en === geographyEn,
    ) ?? null;
  return { before, after };
}

/** Resolve the package metadata by id, never null — falls back to an
 *  inert placeholder so consumers don't crash on a stale id. */
export function getPackage(id: LinkedPackageId): BuyerPackage {
  return (
    BUYER_PACKAGES.find((p) => p.id === id) ?? {
      id,
      label: { en: id, ar: id },
      oneLine: {
        en: "Pack metadata pending source.",
        ar: "بيانات الحزمة في انتظار المصدر.",
      },
      contains: {
        en: "Pending source.",
        ar: "في انتظار المصدر.",
      },
      notClaimed: {
        en: "Advisory only · human review required.",
        ar: "استشاري فقط · المراجعة البشرية مطلوبة.",
      },
    }
  );
}
