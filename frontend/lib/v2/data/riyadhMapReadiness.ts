/**
 * IR-31B — Riyadh Map Readiness Layer fixture.
 *
 * Extends IR-31A's Riyadh Product Intelligence Surface with the full
 * regional context (GCC → Saudi → Riyadh → 5 zones) plus the Kuwait
 * baseline reference. Local, static, governance-safe — no live data,
 * no paid map provider, no external network call.
 *
 * Constitutional posture (binding):
 *   - Advisory only.
 *   - Human review required.
 *   - Evidence may be incomplete.
 *   - No automated decisions.
 *   - No enforcement use.
 *   - No official integration claimed.
 *   - No ROI or production performance claim.
 *
 * Wording discipline:
 *   Zones are advisory/indicative — they do NOT claim measured urban
 *   conditions. Where a zone has no source-backed before/after pair,
 *   consumers render the canonical `PENDING_SOURCE_SENTINEL` instead
 *   of inventing comparison content.
 */

import type { BilingualString } from "./riyadhProductIntelligence";
import {
  RIYADH_EVIDENCE_ASSETS,
  findBeforeAfterPair,
  type EvidenceAsset,
} from "./riyadhProductIntelligence";

export type { BilingualString };

// -----------------------------------------------------------------
// Canonical sentinels
// -----------------------------------------------------------------

export const PENDING_SOURCE_SENTINEL: BilingualString = {
  en: "Pending source validation — this zone is not used for decision output yet.",
  ar: "بانتظار التحقق من المصدر — لا تُستخدم هذه المنطقة لإخراج قرار حالياً.",
};

// -----------------------------------------------------------------
// GCC / Saudi context
// -----------------------------------------------------------------

export type GccContextRole =
  | "regional_context"
  | "primary_context"
  | "primary_pilot"
  | "baseline_reference";

export type GeographyType =
  | "supranational_region"
  | "country"
  | "metropolitan_zone";

export type ContextStatus =
  | "context_reference_only"
  | "primary_demonstration_scope"
  | "comparative_reference"
  | "future_expansion_candidate";

export interface GccSaudiContextEntry {
  id: string;
  label: BilingualString;
  role: GccContextRole;
  geographyType: GeographyType;
  status: ContextStatus;
  description: BilingualString;
  caveat: BilingualString;
}

export const GCC_SAUDI_CONTEXT: GccSaudiContextEntry[] = [
  {
    id: "gcc_context",
    label: { en: "GCC region", ar: "منطقة الخليج" },
    role: "regional_context",
    geographyType: "supranational_region",
    status: "context_reference_only",
    description: {
      en: "The Gulf region frames the platform's intended deployment context. No GCC-wide coverage is claimed.",
      ar: "تُؤطِّر منطقة الخليج سياق النشر المستهدف للمنصة. ولا يُدَّعى تغطية على مستوى المنطقة بكاملها.",
    },
    caveat: {
      en: "Not a GCC-wide coverage claim · no live regional integration.",
      ar: "ليس ادّعاء تغطية على مستوى الخليج · لا تكامل إقليمي حي.",
    },
  },
  {
    id: "saudi_primary_context",
    label: { en: "Saudi Arabia", ar: "المملكة العربية السعودية" },
    role: "primary_context",
    geographyType: "country",
    status: "primary_demonstration_scope",
    description: {
      en: "Saudi Arabia is the primary demonstration context. The current pilot is bounded to a Riyadh-scoped evidence surface.",
      ar: "المملكة هي السياق الرئيسي للعرض. والتجربة الحالية محدودة بسطح أدلة بنطاق الرياض.",
    },
    caveat: {
      en: "Not a national-coverage claim · not an official-integration claim.",
      ar: "ليس ادّعاء تغطية وطنية · ليس ادّعاء تكامل رسمي.",
    },
  },
  {
    id: "kuwait_baseline_context",
    label: { en: "Kuwait", ar: "الكويت" },
    role: "baseline_reference",
    geographyType: "country",
    status: "comparative_reference",
    description: {
      en: "Kuwait serves as a comparative governance and evidence baseline. It is a reference, not a primary pilot, in this surface.",
      ar: "تعمل الكويت كمرجع مقارن للحوكمة والأدلة. وهي مرجع، وليست تجربة رئيسية في هذا السطح.",
    },
    caveat: {
      en: "Not a Kuwait pilot claim · no Kuwait municipal integration claim.",
      ar: "ليست ادّعاء تجربة في الكويت · لا ادّعاء تكامل بلدي مع الكويت.",
    },
  },
  {
    id: "riyadh_primary_pilot",
    label: { en: "Riyadh — primary pilot", ar: "الرياض — التجربة الرئيسية" },
    role: "primary_pilot",
    geographyType: "metropolitan_zone",
    status: "primary_demonstration_scope",
    description: {
      en: "Riyadh is the primary pilot scope. The five zones (north, south, east, west, central) host the evidence operating surface.",
      ar: "الرياض هي نطاق التجربة الرئيسي. وتستضيف المناطق الخمس (شمال، جنوب، شرق، غرب، وسط) سطح تشغيل الأدلة.",
    },
    caveat: {
      en: "Indicative zones · not measured urban conditions · not regulatory boundaries.",
      ar: "مناطق إرشادية · ليست حالات حضرية مقيسة · ليست حدودًا تنظيمية.",
    },
  },
];

// -----------------------------------------------------------------
// Riyadh zones
// -----------------------------------------------------------------

export type RiyadhZoneId =
  | "north_riyadh"
  | "south_riyadh"
  | "east_riyadh"
  | "west_riyadh"
  | "central_riyadh";

export type ReadinessState =
  | "ready_for_review"
  | "needs_more_evidence"
  | "blocked_by_governance"
  | "executive_brief_only";

export type ConfidenceBand = "low" | "medium" | "high" | "not_assessed";

export interface RiyadhZone {
  id: RiyadhZoneId;
  labelEn: string;
  labelAr: string;
  shortRoleEn: string;
  shortRoleAr: string;
  geographyRole: BilingualString;
  /** EvidenceAsset ids drawn from RIYADH_EVIDENCE_ASSETS. */
  evidenceIds: string[];
  /** Identifier of a preferred before/after pair, derived by geography
   *  label (EN). Null when no source-backed pair is available. */
  preferredBeforeAfterPairId: string | null;
  readinessState: ReadinessState;
  confidenceBand: ConfidenceBand;
  evidenceSufficiency: BilingualString;
  primarySignals: BilingualString[];
  limitationNote: BilingualString;
  nextHumanAction: BilingualString;
  governanceCaveat: BilingualString;
}

// Re-used short-form caveats
const ZONE_CAVEAT_ADVISORY: BilingualString = {
  en: "Advisory only · human review required · not a regulatory boundary.",
  ar: "استشاري فقط · المراجعة البشرية مطلوبة · ليس حدًا تنظيميًا.",
};

const ZONE_CAVEAT_PENDING: BilingualString = {
  en: "Advisory only · evidence sufficiency is pending for this zone.",
  ar: "استشاري فقط · كفاية الأدلة معلَّقة لهذه المنطقة.",
};

export const RIYADH_ZONES: RiyadhZone[] = [
  {
    id: "central_riyadh",
    labelEn: "Central Riyadh",
    labelAr: "وسط الرياض",
    shortRoleEn: "Urban-core demonstration zone",
    shortRoleAr: "منطقة عرض النواة الحضرية",
    geographyRole: {
      en: "Primary demonstration zone for the urban-core operating surface.",
      ar: "منطقة العرض الأساسية لسطح تشغيل النواة الحضرية.",
    },
    evidenceIds: [
      "asset.before.core",
      "asset.after.core",
      "asset.balady.surface",
      "asset.balady.legend",
      "asset.metadata.index",
    ],
    preferredBeforeAfterPairId: "Central Riyadh",
    readinessState: "ready_for_review",
    confidenceBand: "medium",
    evidenceSufficiency: {
      en: "Before/after open imagery captured · public-surface references pending validation.",
      ar: "صور مفتوحة قبل/بعد مُلتقَطة · مراجع السطح العام بانتظار التحقق.",
    },
    primarySignals: [
      {
        en: "Urban-core open imagery (before/after) — visual reference only.",
        ar: "صور مفتوحة للنواة الحضرية (قبل/بعد) — مرجع بصري فقط.",
      },
      {
        en: "Public municipal surface — reference view only.",
        ar: "السطح البلدي العام — عرض مرجعي فقط.",
      },
    ],
    limitationNote: {
      en: "Open imagery does not certify any specific intervention; interpretation rests with the municipal reviewer.",
      ar: "الصور المفتوحة لا تُصادق على أي تدخل بعينه؛ التفسير من اختصاص المراجع البلدي.",
    },
    nextHumanAction: {
      en: "Reviewer confirms metadata sufficiency before the Municipal Decision Readiness Pack is assembled.",
      ar: "يؤكّد المراجع كفاية البيانات الوصفية قبل تجميع حزمة جاهزية القرار البلدي.",
    },
    governanceCaveat: ZONE_CAVEAT_ADVISORY,
  },
  {
    id: "north_riyadh",
    labelEn: "North Riyadh",
    labelAr: "شمال الرياض",
    shortRoleEn: "Northern corridor reference zone",
    shortRoleAr: "منطقة الممر الشمالي المرجعية",
    geographyRole: {
      en: "Reference zone for the northern corridor, used for stakeholder alignment and review preparation.",
      ar: "منطقة مرجعية للممر الشمالي، تُستخدم لمواءمة أصحاب المصلحة وإعداد المراجعة.",
    },
    evidenceIds: [
      "asset.before.north",
      "asset.after.north",
      "asset.metadata.index",
    ],
    preferredBeforeAfterPairId: "North Riyadh",
    readinessState: "ready_for_review",
    confidenceBand: "medium",
    evidenceSufficiency: {
      en: "Before/after open imagery captured for the northern corridor.",
      ar: "صور مفتوحة قبل/بعد مُلتقَطة للممر الشمالي.",
    },
    primarySignals: [
      {
        en: "Northern corridor open imagery (before/after) — visual reference only.",
        ar: "صور مفتوحة للممر الشمالي (قبل/بعد) — مرجع بصري فقط.",
      },
    ],
    limitationNote: {
      en: "No supplementary municipal or statistical signal is bundled for this zone yet.",
      ar: "لا توجد إشارة بلدية أو إحصائية تكميلية مُرفقة لهذه المنطقة حتى الآن.",
    },
    nextHumanAction: {
      en: "Reviewer prepares site-readiness handoff anchored to the northern corridor imagery.",
      ar: "يُعِدّ المراجع تسليم جاهزية الموقع المرتبط بصور الممر الشمالي.",
    },
    governanceCaveat: ZONE_CAVEAT_ADVISORY,
  },
  {
    id: "south_riyadh",
    labelEn: "South Riyadh",
    labelAr: "جنوب الرياض",
    shortRoleEn: "Southern reference zone — pending evidence",
    shortRoleAr: "منطقة مرجعية جنوبية — أدلة معلَّقة",
    geographyRole: {
      en: "Reference zone for the southern segment; not yet anchored to a source-backed before/after pair in this surface.",
      ar: "منطقة مرجعية للقطاع الجنوبي؛ لم تُربط بعد بزوج قبل/بعد مستند إلى مصدر في هذا السطح.",
    },
    evidenceIds: [],
    preferredBeforeAfterPairId: null,
    readinessState: "needs_more_evidence",
    confidenceBand: "not_assessed",
    evidenceSufficiency: {
      en: "Pending source validation — no zone-scoped before/after pair is bundled.",
      ar: "بانتظار التحقق من المصدر — لا يوجد زوج قبل/بعد بنطاق هذه المنطقة.",
    },
    primarySignals: [
      {
        en: "No source-backed primary signal is bundled for this zone yet.",
        ar: "لا توجد إشارة أساسية مستندة إلى مصدر مُرفَقة لهذه المنطقة حتى الآن.",
      },
    ],
    limitationNote: {
      en: "This zone is not used for decision output until evidence sufficiency is reviewed.",
      ar: "لا تُستخدم هذه المنطقة لإخراج قرار حتى تُراجَع كفاية الأدلة.",
    },
    nextHumanAction: {
      en: "Reviewer determines whether to scope additional southern-segment evidence for the pilot.",
      ar: "يُحدِّد المراجع ما إذا كان سيُضمَّن دليل إضافي للقطاع الجنوبي في التجربة.",
    },
    governanceCaveat: ZONE_CAVEAT_PENDING,
  },
  {
    id: "east_riyadh",
    labelEn: "East Riyadh",
    labelAr: "شرق الرياض",
    shortRoleEn: "Eastern reference zone — pending evidence",
    shortRoleAr: "منطقة مرجعية شرقية — أدلة معلَّقة",
    geographyRole: {
      en: "Reference zone for the eastern segment; not yet anchored to a source-backed before/after pair in this surface.",
      ar: "منطقة مرجعية للقطاع الشرقي؛ لم تُربط بعد بزوج قبل/بعد مستند إلى مصدر في هذا السطح.",
    },
    evidenceIds: [],
    preferredBeforeAfterPairId: null,
    readinessState: "needs_more_evidence",
    confidenceBand: "not_assessed",
    evidenceSufficiency: {
      en: "Pending source validation — no zone-scoped before/after pair is bundled.",
      ar: "بانتظار التحقق من المصدر — لا يوجد زوج قبل/بعد بنطاق هذه المنطقة.",
    },
    primarySignals: [
      {
        en: "No source-backed primary signal is bundled for this zone yet.",
        ar: "لا توجد إشارة أساسية مستندة إلى مصدر مُرفَقة لهذه المنطقة حتى الآن.",
      },
    ],
    limitationNote: {
      en: "This zone is not used for decision output until evidence sufficiency is reviewed.",
      ar: "لا تُستخدم هذه المنطقة لإخراج قرار حتى تُراجَع كفاية الأدلة.",
    },
    nextHumanAction: {
      en: "Reviewer determines whether to scope additional eastern-segment evidence for the pilot.",
      ar: "يُحدِّد المراجع ما إذا كان سيُضمَّن دليل إضافي للقطاع الشرقي في التجربة.",
    },
    governanceCaveat: ZONE_CAVEAT_PENDING,
  },
  {
    id: "west_riyadh",
    labelEn: "West Riyadh",
    labelAr: "غرب الرياض",
    shortRoleEn: "Western reference zone — executive brief only",
    shortRoleAr: "منطقة مرجعية غربية — إيجاز تنفيذي فقط",
    geographyRole: {
      en: "Reference zone for the western segment; referenced at executive-brief level only until additional evidence is scoped.",
      ar: "منطقة مرجعية للقطاع الغربي؛ يُشار إليها على مستوى الإيجاز التنفيذي فقط حتى يُحدَّد دليل إضافي.",
    },
    evidenceIds: [],
    preferredBeforeAfterPairId: null,
    readinessState: "executive_brief_only",
    confidenceBand: "not_assessed",
    evidenceSufficiency: {
      en: "Pending source validation — this zone surfaces only at executive-brief framing.",
      ar: "بانتظار التحقق من المصدر — تظهر هذه المنطقة بإطار إيجاز تنفيذي فقط.",
    },
    primarySignals: [
      {
        en: "Executive-brief reference only — no operating-surface signal is bundled.",
        ar: "مرجع إيجاز تنفيذي فقط — لا توجد إشارة لسطح التشغيل مُرفَقة.",
      },
    ],
    limitationNote: {
      en: "Western-segment operating surface is intentionally deferred until evidence is scoped.",
      ar: "سطح تشغيل القطاع الغربي مؤجَّل عمدًا حتى يُحدَّد الدليل.",
    },
    nextHumanAction: {
      en: "Reviewer scopes whether the western segment enters the next pilot iteration.",
      ar: "يُحدِّد المراجع ما إذا كان القطاع الغربي يدخل تكرار التجربة التالي.",
    },
    governanceCaveat: ZONE_CAVEAT_PENDING,
  },
];

// -----------------------------------------------------------------
// Kuwait baseline
// -----------------------------------------------------------------

export interface KuwaitBaseline {
  id: "kuwait_baseline";
  role: "comparative_reference";
  labelEn: string;
  labelAr: string;
  sourceReadiness: BilingualString;
  whatItHelpsCompare: BilingualString;
  whatIsNotClaimed: BilingualString;
  futureExpansionPath: BilingualString;
  governanceCaveat: BilingualString;
}

export const KUWAIT_BASELINE: KuwaitBaseline = {
  id: "kuwait_baseline",
  role: "comparative_reference",
  labelEn: "Kuwait — comparative baseline",
  labelAr: "الكويت — مرجع مقارن",
  sourceReadiness: {
    en: "Kuwait reference materials remain in preparation; this surface references Kuwait at baseline level only.",
    ar: "مواد مرجع الكويت لا تزال قيد الإعداد؛ ويُشير هذا السطح إلى الكويت على مستوى المرجع فقط.",
  },
  whatItHelpsCompare: {
    en: "Helps compare governance posture, evidence-pack discipline, and review-gate language across two Gulf institutional contexts.",
    ar: "يساعد على مقارنة وضع الحوكمة، وانضباط حزمة الأدلة، ولغة بوابات المراجعة عبر سياقين مؤسسيين خليجيين.",
  },
  whatIsNotClaimed: {
    en: "Not a Kuwait pilot · not an official Kuwait municipal integration · not a Kuwait-coverage claim.",
    ar: "ليست تجربة كويتية · ليست تكاملًا بلديًا رسميًا مع الكويت · ليست ادّعاء تغطية للكويت.",
  },
  futureExpansionPath: {
    en: "Future expansion candidate, contingent on institutional sign-off and a separate evidence-pack scope.",
    ar: "مرشَّحة للتوسع المستقبلي بشرط الموافقة المؤسسية ونطاق حزمة أدلة منفصل.",
  },
  governanceCaveat: {
    en: "Comparative reference only · advisory · human review required · no live or official Kuwait integration claim.",
    ar: "مرجع مقارن فقط · استشاري · المراجعة البشرية مطلوبة · لا ادّعاء تكامل حي أو رسمي مع الكويت.",
  },
};

// -----------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------

export function getRiyadhZone(zoneId: RiyadhZoneId): RiyadhZone {
  return (
    RIYADH_ZONES.find((z) => z.id === zoneId) ??
    RIYADH_ZONES[RIYADH_ZONES.length - 1]
  );
}

export function getEvidenceForZone(zoneId: RiyadhZoneId): EvidenceAsset[] {
  const zone = getRiyadhZone(zoneId);
  const ids = new Set(zone.evidenceIds);
  return RIYADH_EVIDENCE_ASSETS.filter((a) => ids.has(a.id));
}

export interface ZoneBeforeAfter {
  before: EvidenceAsset | null;
  after: EvidenceAsset | null;
  hasPair: boolean;
  /** Bilingual sentinel string consumers SHOULD render when hasPair
   *  is false; never inferred. */
  pendingSentinel: BilingualString;
}

export function getBeforeAfterForZone(zoneId: RiyadhZoneId): ZoneBeforeAfter {
  const zone = getRiyadhZone(zoneId);
  if (!zone.preferredBeforeAfterPairId) {
    return {
      before: null,
      after: null,
      hasPair: false,
      pendingSentinel: PENDING_SOURCE_SENTINEL,
    };
  }
  const { before, after } = findBeforeAfterPair(zone.preferredBeforeAfterPairId);
  return {
    before,
    after,
    hasPair: before !== null || after !== null,
    pendingSentinel: PENDING_SOURCE_SENTINEL,
  };
}

export interface ZoneReadinessOutput {
  zone: RiyadhZone;
  readinessLabel: BilingualString;
  confidenceLabel: BilingualString;
}

const READINESS_LABEL: Record<ReadinessState, BilingualString> = {
  ready_for_review: {
    en: "Ready for review",
    ar: "جاهزة للمراجعة",
  },
  needs_more_evidence: {
    en: "Needs more evidence",
    ar: "بحاجة إلى مزيد من الأدلة",
  },
  blocked_by_governance: {
    en: "Blocked by governance",
    ar: "محجوبة بموجب الحوكمة",
  },
  executive_brief_only: {
    en: "Executive brief only",
    ar: "إيجاز تنفيذي فقط",
  },
};

const CONFIDENCE_LABEL: Record<ConfidenceBand, BilingualString> = {
  low: { en: "Low confidence band", ar: "نطاق ثقة منخفض" },
  medium: { en: "Medium confidence band", ar: "نطاق ثقة متوسط" },
  high: { en: "High confidence band", ar: "نطاق ثقة مرتفع" },
  not_assessed: {
    en: "Confidence not assessed",
    ar: "الثقة غير مُقيَّمة",
  },
};

export function getZoneReadiness(zoneId: RiyadhZoneId): ZoneReadinessOutput {
  const zone = getRiyadhZone(zoneId);
  return {
    zone,
    readinessLabel: READINESS_LABEL[zone.readinessState],
    confidenceLabel: CONFIDENCE_LABEL[zone.confidenceBand],
  };
}

export function getKuwaitBaseline(): KuwaitBaseline {
  return KUWAIT_BASELINE;
}

/** Convenience colour token per readiness state. Pure presentation
 *  hint — Tailwind class strings. Consumers may ignore. */
export const READINESS_TONE: Record<
  ReadinessState,
  { dot: string; ring: string; text: string }
> = {
  ready_for_review: {
    dot: "bg-risk-low",
    ring: "ring-risk-low/40",
    text: "text-risk-low",
  },
  needs_more_evidence: {
    dot: "bg-amber-muted",
    ring: "ring-amber-muted/40",
    text: "text-amber-muted",
  },
  blocked_by_governance: {
    dot: "bg-risk-high",
    ring: "ring-risk-high/40",
    text: "text-risk-high",
  },
  executive_brief_only: {
    dot: "bg-ink/60",
    ring: "ring-ink/30",
    text: "text-ink/70",
  },
};
