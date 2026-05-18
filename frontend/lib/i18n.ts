// Client-safe i18n module. Keep this file free of `next/headers` or any
// other server-only API so it can be imported by client components like
// LanguageToggle. The server-side `getLang()` lives in `lib/i18n-server.ts`.

export type Lang = "en" | "ar";

export const LANG_COOKIE = "gcc_lang";

export function dirFor(lang: Lang): "ltr" | "rtl" {
  return lang === "ar" ? "rtl" : "ltr";
}

export type Bilingual = { en: string; ar: string };

export function pickBilingual<T extends Bilingual>(v: T, lang: Lang): string {
  return lang === "ar" ? v.ar : v.en;
}

// All translatable strings for the municipal surface. Keep keys flat — the
// list is short enough that nesting adds no value. Add new keys here only;
// never inline Arabic strings inside components.
const dict = {
  // ---- Brand / nav -------------------------------------------------
  "brand.line1": {
    en: "GCC Urban & Municipal Intelligence Pilot",
    ar: "تجربة الذكاء الحضري والبلدي في الخليج",
  },
  // 32.5.1-R-3: terminology cleanup — institutional preview label
  "brand.line2": {
    en: "Decision Readiness Preview",
    ar: "معاينة جاهزية القرار",
  },
  // 32.5.1-R-2-B: institutional nav labels (executive-buyer-clarity refinement)
  "nav.dashboard": { en: "Executive Review Center", ar: "مركز المراجعة التنفيذية" },
  "nav.cases": { en: "Cases", ar: "الحالات" },
  "nav.evidence": { en: "Evidence Sufficiency", ar: "كفاية الأدلة" },
  "nav.audit": { en: "Audit Trail", ar: "سجل التدقيق" },
  "nav.outcomes": { en: "Review Outcomes", ar: "مخرجات المراجعة" },
  "nav.map": { en: "Coverage & Governance Boundaries", ar: "التغطية وحدود الحوكمة" },
  "nav.summary": { en: "Executive Summary", ar: "الملخص التنفيذي" },
  "nav.operations": { en: "Operating Model", ar: "نموذج التشغيل" },
  // 32.5.1-R-2-B (continued)
  "nav.pilot": { en: "60-Day Pilot Pack", ar: "حزمة تجربة 60 يوم" },
  "nav.defensibility": { en: "Audit & Defensibility", ar: "التدقيق وقابلية الدفاع" },
  "nav.decision_surface": { en: "Decision Readiness", ar: "جاهزية القرار" },
  // ---------------------------------------------------------------------
  // Macro Intelligence story taxonomy (sitewide nav redesign).
  // Nine top-down entries that walk the platform from regional macro to
  // the static scenario mock. AR strings are reviewer-authored Gulf
  // institutional Arabic; they are not machine-translated.
  // ---------------------------------------------------------------------
  "nav.story.macro_intelligence": {
    en: "Macro Intelligence",
    ar: "الذكاء الماكرو",
  },
  "nav.story.gcc_region": {
    en: "GCC Region",
    ar: "الإقليم الخليجي",
  },
  "nav.story.saudi_riyadh": {
    en: "Saudi Arabia / Riyadh",
    ar: "السعودية / الرياض",
  },
  "nav.story.decision_surface": {
    en: "Decision Surface",
    ar: "سطح القرار",
  },
  "nav.story.dynamic_intelligence": {
    en: "Dynamic Intelligence",
    ar: "الطبقة الديناميكية",
  },
  "nav.story.evidence_governance": {
    en: "Evidence & Governance",
    ar: "الأدلة والحوكمة",
  },
  "nav.story.audit_defensibility": {
    en: "Audit & Defensibility",
    ar: "التدقيق والقابلية للدفاع",
  },
  "nav.story.sixty_day_pilot": {
    en: "60-Day Pilot",
    ar: "تجربة 60 يوم",
  },
  "nav.story.scenario_mock": {
    en: "Scenario Mock",
    ar: "نموذج السيناريو",
  },
  // ---------------------------------------------------------------------
  // IR-29B — V2 platform navigation. Additive; pre-IR-29B nav.story.*
  // keys above remain in the dictionary for backwards compatibility but
  // are no longer referenced by the primary nav. The six V2 entries
  // below match the new sitemap: Overview · Saudi/Riyadh · Spatial
  // Evidence · Governance · GCC Region · Pilot.
  // ---------------------------------------------------------------------
  "nav.v2.overview":           { en: "Overview",            ar: "نظرة عامة" },
  "nav.v2.saudi_riyadh":       { en: "Riyadh Active Lane",  ar: "مسار الرياض التشغيلي" },
  "nav.v2.spatial_evidence":   { en: "Spatial Evidence",    ar: "الأدلة المكانية" },
  "nav.v2.evidence_atlas":     { en: "Evidence Atlas",      ar: "أطلس الأدلة" },
  "nav.v2.decision_readiness": { en: "Decision Readiness",  ar: "جاهزية القرار" },
  "nav.v2.scenario_preview":   { en: "Scenario Preview",    ar: "معاينة السيناريو" },
  "nav.v2.review_assurance":   { en: "Review Assurance",    ar: "ضمان المراجعة" },
  "nav.v2.governance":         { en: "Governance",          ar: "الحوكمة" },
  "nav.v2.gcc_region":         { en: "GCC Region",          ar: "منطقة الخليج" },
  "nav.v2.pilot":              { en: "Pilot",               ar: "التجربة" },
  // IR-47 — Partner Intelligence Backbone (cloud-agnostic partner
  // architecture mapping). Top-nav label uses the short form
  // "Partner Backbone"; the dedicated page renders the full
  // "Partner Intelligence Backbone" headline.
  "nav.v2.partner_backbone":   { en: "Partner Backbone",    ar: "عمود الشركاء" },
  // IR-44C-R2 — staged top-nav labels (no route exists yet; rendered
  // non-clickable). Saudi Coverage is reserved for the future IR-44B
  // Saudi National Coverage Architecture sprint. Map Surface is
  // reserved for a future standalone /v2/map route; the live MapLibre
  // surface currently lives inside /v2/saudi-riyadh/spatial-evidence
  // and is unchanged in IR-44C-R2.
  "nav.v2.saudi_coverage":     { en: "Saudi Coverage",      ar: "التغطية السعودية" },
  "nav.v2.map_surface":        { en: "Map Surface",         ar: "سطح الخريطة" },
  "nav.v2.staged_badge":       { en: "Staged",              ar: "مرحلي" },
  "lang.toggle.en": { en: "EN", ar: "EN" },
  "lang.toggle.ar": { en: "AR", ar: "AR" },

  // ---- Dashboard ---------------------------------------------------
  "dashboard.title": { en: "Executive Overview", ar: "نظرة تنفيذية عامة" },
  "dashboard.lede": {
    en: "Suspected urban policy signals across Kuwait and Saudi Arabia from satellite and geospatial analysis. Every case is pending human municipal validation.",
    ar: "إشارات مشتبه بها لسياسات التخطيط العمراني في الكويت والمملكة العربية السعودية، مستندة إلى تحليلات الأقمار الاصطناعية والبيانات الجغرافية. كل حالة بحاجة إلى مراجعة بشرية بلدية.",
  },
  "stat.totalCases": { en: "Total Cases", ar: "إجمالي الحالات" },
  "stat.kuwait": { en: "Kuwait", ar: "الكويت" },
  "stat.saudi": { en: "Saudi Arabia", ar: "المملكة العربية السعودية" },
  "stat.avgConfidence": { en: "Avg Confidence", ar: "متوسط الثقة" },

  // Phase 14.5 — dashboard column + section labels (renamed from "Violation")
  "dashboard.col.observedPattern": { en: "Observed Pattern", ar: "النمط المرصود" },
  "dashboard.section.topPatterns": {
    en: "Top Observed Patterns",
    ar: "أبرز الأنماط المرصودة",
  },
  "dashboard.section.riskDistribution": { en: "Risk Distribution", ar: "توزيع المخاطر" },
  "dashboard.section.caseQueue": { en: "Case Queue", ar: "قائمة الحالات" },
  "dashboard.queue.showing": { en: "Showing", ar: "عرض" },
  "dashboard.queue.of": { en: "of", ar: "من" },
  "dashboard.queue.cases": { en: "cases", ar: "حالة" },
  "dashboard.col.id": { en: "ID", ar: "المعرّف" },
  "dashboard.col.country": { en: "Country", ar: "الدولة" },
  "dashboard.col.city": { en: "City", ar: "المدينة" },
  "dashboard.col.risk": { en: "Risk Classification", ar: "تصنيف المخاطر" },
  "dashboard.col.confidence": { en: "Confidence", ar: "الثقة" },
  "dashboard.col.status": { en: "Status", ar: "الحالة" },
  "dashboard.viewMap": { en: "View on map", ar: "عرض على الخريطة" },

  // ---- Map ---------------------------------------------------------
  "map.title": {
    en: "Geospatial Decision Center",
    ar: "مركز القرار الجغرافي",
  },
  "map.lede": {
    en: "Live municipal command workspace. Select a stage to focus a case, review its evidence, and surface the decision moment.",
    ar: "مساحة عمل بلدية حيّة لاتخاذ القرار. اختر مرحلة لتركيز حالة ومراجعة أدلّتها وعرض لحظة القرار.",
  },
  "map.fallback.title": { en: "Map could not be loaded", ar: "تعذّر تحميل الخريطة" },
  "map.fallback.body": {
    en: "The map library failed to initialise. Verify network access to the configured tile provider.",
    ar: "فشل تهيئة مكتبة الخرائط. تحقّق من الوصول إلى مزوّد البلاطات المُهيَّأ.",
  },
  "map.fallback.providerStatus": {
    en: "Map provider unavailable — showing case coordinates.",
    ar: "مزوّد الخرائط غير متاح — تُعرض إحداثيات الحالات.",
  },
  "map.fallback.cta": {
    en: "Configure satellite/street tile provider.",
    ar: "هيّئ مزوّد بلاطات الشوارع/الأقمار الاصطناعية.",
  },
  "map.popup.location": { en: "Location", ar: "الموقع" },
  "map.popup.violationType": { en: "Observed Pattern", ar: "النمط المرصود" },
  "map.popup.risk": { en: "Risk", ar: "مستوى المخاطر" },
  "map.popup.decisionState": { en: "Decision state", ar: "حالة القرار" },
  "map.popup.recommendedAction": { en: "Recommended action", ar: "الإجراء المقترح" },
  "map.popup.openCase": { en: "Open case", ar: "فتح الحالة" },
  "map.popup.openReview": { en: "Open detection review", ar: "فتح مراجعة الكشف" },

  // ---- Operations --------------------------------------------------
  "ops.title": { en: "Municipal Review Queue", ar: "طابور المراجعة البلدية" },
  "ops.lede": {
    en: "Decision queue for assigned reviewers and inspectors. Priority is deterministic and computed from policy + risk factors. Operations never overrides Decision Intelligence.",
    ar: "قائمة قرارات للمراجعين والمفتشين المعيّنين. الأولوية حتمية ومحسوبة وفق عوامل السياسة والمخاطر. طبقة العمليات لا تتجاوز ذكاء القرار.",
  },
  "ops.col.priority": { en: "Review Priority", ar: "أولوية المراجعة" },
  "ops.col.case": { en: "Case ID", ar: "رقم الحالة" },
  "ops.col.signal": { en: "Municipal Signal", ar: "الإشارة البلدية" },
  "ops.col.reason": { en: "Reason", ar: "السبب" },
  "ops.col.decisionState": { en: "Review Decision", ar: "قرار المراجعة" },
  "ops.col.recommendedAction": { en: "Next Action", ar: "الإجراء التالي" },
  "ops.col.sla": { en: "Review Timeframe", ar: "مدة المراجعة" },
  "ops.col.owner": { en: "Review Owner", ar: "مسؤول المراجعة" },
  "ops.col.review": { en: "Review", ar: "مراجعة" },
  "ops.col.actions": { en: "Actions", ar: "الإجراءات" },
  "ops.action.review": { en: "Review", ar: "مراجعة" },
  "ops.action.assign": { en: "Assign Review Owner", ar: "تعيين مسؤول مراجعة" },
  "ops.action.start": { en: "Start", ar: "بدء" },
  "ops.action.hold": { en: "Hold", ar: "تعليق" },
  "ops.action.close": { en: "Close", ar: "إغلاق" },
  "ops.action.releaseHold": { en: "Release hold", ar: "رفع التعليق" },
  "ops.filter.queueState": { en: "Review Progress", ar: "تقدّم المراجعة" },
  "ops.filter.risk": { en: "Risk Classification", ar: "تصنيف المخاطر" },
  "ops.filter.assignee": { en: "Review Owner", ar: "مسؤول المراجعة" },
  "ops.filter.apply": { en: "Apply", ar: "تطبيق" },
  "ops.filter.all": { en: "All", ar: "الكل" },
  "ops.empty": { en: "No cases match these filters.", ar: "لا توجد حالات تطابق هذه المرشحات." },
  "ops.unassigned": { en: "Unassigned", ar: "غير مُعيَّن" },

  // Phase 14.5 — KPI strip on /operations
  "ops.kpi.activeCases": {
    en: "Active Cases Requiring Action",
    ar: "حالات نشطة تتطلب إجراءً",
  },
  "ops.kpi.highPriority": { en: "High Priority Cases", ar: "حالات ذات أولوية عالية" },
  "ops.kpi.adminReview": {
    en: "Pending Administrative Review",
    ar: "بانتظار المراجعة الإدارية",
  },
  "ops.kpi.fieldInspection": {
    en: "Field Inspection Recommended",
    ar: "يُوصى بتفتيش ميداني",
  },
  // Per-row administrative-review note
  "ops.row.adminNote": {
    en: "This case presents an observed municipal signal requiring administrative review.",
    ar: "تعرض هذه الحالة مؤشرًا بلديًا مرصودًا يتطلب مراجعة إدارية.",
  },
  // Phase 17.5 — short explanation under the queue table
  "ops.queueExplanation": {
    en: "This queue prioritises municipal review work. It does not confirm a deviation or trigger any action automatically.",
    ar: "يرتب هذا الطابور أعمال المراجعة البلدية حسب الأولوية. ولا يؤكد أي مخالفة أو يفعّل أي إجراء تلقائيًا.",
  },

  // ---- Summary -----------------------------------------------------
  "summary.titleEyebrow": { en: "Government Executive Summary", ar: "ملخص تنفيذي حكومي" },
  "summary.title": {
    en: "Urban Compliance Intelligence — Decision Snapshot",
    ar: "مراقبة الالتزام العمراني — لمحة عن القرار",
  },
  "summary.lede": {
    en: "Aggregated view of suspected signals, classified indicators, and current decision posture. Intended for ministerial and municipal leadership review. Every underlying case is pending human validation.",
    ar: "عرض مُجمَّع للإشارات المشتبه بها والمؤشرات المصنّفة وحالة القرار الراهنة. مُعَدّ لمراجعة القيادات الوزارية والبلدية. كل حالة بحاجة إلى مراجعة بشرية.",
  },
  "summary.brief.title": { en: "Decision Intelligence Brief", ar: "موجز ذكاء القرار" },
  "summary.brief.topSignal": { en: "Emerging signals", ar: "الإشارات الناشئة" },
  "summary.brief.highestRisk": {
    en: "Highest priority administrative area",
    ar: "أعلى منطقة إدارية أولوية",
  },
  "summary.brief.fieldInspection": {
    en: "Cases requiring field inspection",
    ar: "حالات تتطلب تفتيشًا ميدانيًا",
  },
  "summary.brief.desktopReview": {
    en: "Cases pending administrative review",
    ar: "حالات بانتظار المراجعة الإدارية",
  },
  "summary.brief.systemConfidence": { en: "System confidence level", ar: "مستوى ثقة النظام" },
  "summary.brief.governanceNote": {
    en: "All cases require human municipal validation before any administrative action.",
    ar: "تتطلّب جميع الحالات مراجعة بشرية بلدية قبل أي إجراء إداري.",
  },
  "summary.jurisdictional": { en: "Municipal Distribution", ar: "التوزيع البلدي" },
  "summary.caseStatus": { en: "Case Status", ar: "حالة الحالة" },
  "summary.violationMix": {
    en: "Observed Pattern Distribution",
    ar: "توزيع الأنماط المرصودة",
  },
  "summary.dataIntegrity": {
    en: "Data integrity digest (SHA-256)",
    ar: "بصمة سلامة البيانات (SHA-256)",
  },
  "summary.schemaVersion": { en: "Schema version", ar: "إصدار المخطط" },
  "summary.statCritical": { en: "Critical Priority", ar: "أولوية حرجة" },
  "summary.statHigh": { en: "High Priority", ar: "أولوية عالية" },
  "summary.statCriticalHint": {
    en: "Council escalation suggested",
    ar: "يُقترح التصعيد إلى المجلس",
  },
  "summary.statHighHint": {
    en: "Field inspection suggested",
    ar: "يُقترح إجراء تفتيش ميداني",
  },
  // Phase 14.5 — top-of-summary governance block
  "summary.governance": {
    en: "This system provides analytical indications only and requires municipal validation before any administrative action.",
    ar: "يقدم هذا النظام مؤشرات تحليلية فقط ويتطلب تحققًا بلديًا قبل أي إجراء إداري.",
  },

  // ---- Case detail page -------------------------------------------
  "case.eyebrow": {
    en: "Suspected Indicator — Human Validation Required",
    ar: "مؤشر مشتبه به — يتطلب مراجعة بشرية",
  },
  "case.section.signal": { en: "Signal", ar: "الإشارة" },
  "case.section.policyRule": { en: "Policy Rule", ar: "السند التنظيمي" },
  "case.field.permit": { en: "Permit", ar: "الترخيص" },
  "case.field.status": { en: "Status", ar: "الحالة" },
  "case.section.before": { en: "Before", ar: "قبل" },
  "case.section.after": { en: "After", ar: "بعد" },
  "case.section.recommendedAction": { en: "Recommended Action", ar: "الإجراء المقترح" },
  "case.link.evidence": { en: "View evidence pack", ar: "عرض ملف الأدلة" },
  "case.link.openDetectionReview": { en: "Open Detection Review", ar: "فتح مراجعة الكشف" },
  "case.disclaimer": {
    en: "Suggested action only. A municipal officer must validate this case before any administrative action is taken.",
    ar: "إجراء مقترح فقط. يجب أن يتحقق موظف البلدية من هذه الحالة قبل اتخاذ أي إجراء إداري.",
  },

  // ---- Detection review page (page-level chrome only) -------------
  "det.breadcrumb.dashboard": { en: "Dashboard", ar: "لوحة التحكم" },
  "det.breadcrumb.detectionReview": { en: "Detection Review", ar: "مراجعة الكشف" },
  "det.bundleSchema": { en: "Bundle schema", ar: "إصدار حزمة المراجعة" },
  "det.manifest": { en: "manifest", ar: "بصمة المخزون" },
  "det.empty.title": { en: "No detection run yet", ar: "لا يوجد تشغيل كشف بعد" },
  "det.empty.body": {
    en: "This case has no detection run on record. The Review Panel renders only after a run has executed.",
    ar: "لا يوجد تشغيل كشف مُسجَّل لهذه الحالة. تظهر لوحة المراجعة بعد تنفيذ تشغيل الكشف.",
  },
  "det.empty.back": { en: "Back to case", ar: "العودة إلى الحالة" },
  "det.drift.title": { en: "Manifest drift detected", ar: "اكتُشف انحراف في بصمة المخزون" },
  "det.drift.body": {
    en: "The Review Panel refuses to render because the on-disk manifest no longer matches the sealed value. This is a defense against silent provenance loss.",
    ar: "ترفض لوحة المراجعة العرض لأن بصمة المخزون على القرص لم تعد مطابقة للقيمة المختومة. هذه حماية من فقدان المنشأ بصمت.",
  },
  "det.drift.sealed": { en: "Sealed", ar: "المختومة" },
  "det.drift.recomputed": { en: "Recomputed", ar: "المُعاد حسابها" },
  "det.drift.fix": {
    en: "Re-seal the manifest with tools/build_manifest.py and reload.",
    ar: "أعد ختم بصمة المخزون باستخدام tools/build_manifest.py وأعد التحميل.",
  },
  "det.schemaMismatch.title": { en: "Client out of date", ar: "إصدار العميل قديم" },
  "det.schemaMismatch.body": {
    en: "This frontend was built for a different review-bundle schema; the backend returned an unexpected version. Refusing to render to avoid mis-displaying an unknown shape.",
    ar: "بُني هذا الواجهة الأمامية لمخطط حزمة مراجعة مختلف؛ أعاد الخادم إصدارًا غير متوقع. يُرفض العرض لتفادي عرض شكل غير معروف.",
  },
  "det.schemaMismatch.fix": { en: "Redeploy the frontend.", ar: "أعد نشر الواجهة الأمامية." },
  "det.error.title": { en: "Could not load Detection Review", ar: "تعذّر تحميل مراجعة الكشف" },

  // ---- Detection page — DetectionHeader ----------------------------
  "dh.eyebrow": { en: "Detection Review Panel — Layer 6 (Reviewer Surface)", ar: "لوحة مراجعة الكشف — الطبقة السادسة (سطح المراجع)" },
  "dh.bridge": { en: "bridge", ar: "ربط" },
  "dh.run": { en: "Run", ar: "التشغيل" },
  "dh.model": { en: "Model", ar: "النموذج" },
  "dh.executed": { en: "Executed", ar: "نُفّذ في" },
  "dh.badge.flag": { en: "Auto-flag emitted", ar: "صدرت إشارة تلقائية" },
  "dh.badge.awaiting": { en: "awaiting human review", ar: "بانتظار مراجعة بشرية" },
  "dh.badge.noFlag": { en: "No automatic flag — desktop review required", ar: "لا توجد إشارة تلقائية — مطلوبة مراجعة مكتبية" },

  // ---- ScorePanel --------------------------------------------------
  "sp.composite": { en: "Composite Score", ar: "النتيجة المجمَّعة" },
  "sp.weightsSha": { en: "weights sha256", ar: "بصمة الأوزان sha256" },
  "sp.featureBreakdown": { en: "Feature Breakdown", ar: "تفصيل الخصائص" },
  "sp.col.feature": { en: "Feature", ar: "الخاصية" },
  "sp.col.weight": { en: "Weight", ar: "الوزن" },
  "sp.col.value": { en: "Value", ar: "القيمة" },
  "sp.col.wv": { en: "w · v", ar: "و · ق" },
  "sp.feat.footprint": { en: "Normalized building-footprint area change", ar: "تغيّر مُسوَّى في مساحة بصمة المبنى" },
  "sp.feat.edge": { en: "Edge-density divergence between before/after", ar: "تباين كثافة الحواف بين قبل/بعد" },
  "sp.feat.ndvi": { en: "NDVI visible-band proxy (RGB only — not true NDVI)", ar: "بديل NDVI من النطاق المرئي (RGB فقط — ليس NDVI الحقيقي)" },
  "sp.feat.hist": { en: "Color-histogram Bhattacharyya divergence", ar: "تباعد Bhattacharyya لمدرّج الألوان" },
  "sp.feat.ssim": { en: "1 − SSIM(before, after); higher = more change", ar: "١ − SSIM(قبل، بعد)؛ كلما زادت دلَّ على تغيير أكبر" },

  // ---- RationaleList -----------------------------------------------
  "rl.rule.nullFlag": { en: "Null-flag short-circuit", ar: "تجاوز عدم الإشارة" },
  "rl.rule.baseMap": { en: "Base mapping", ar: "تعيين أساس" },
  "rl.rule.severityLift": { en: "Severity lift", ar: "رفع شدّة" },
  "rl.rule.permitLock": { en: "Permit lock", ar: "قفل ترخيص" },
  "rl.rule.confidenceFloor": { en: "Confidence floor", ar: "حدّ الثقة الأدنى" },
  "rl.rule.heritageRoute": { en: "Heritage route", ar: "مسار حماية تراثية" },
  "rl.rule.coastalRoute": { en: "Coastal route", ar: "مسار حماية ساحلية" },
  "rl.rule.councilCap": { en: "Council cap", ar: "سقف تصعيد المجلس" },

  // ---- DecisionPanel -----------------------------------------------
  "dp.title": { en: "Decision", ar: "القرار" },
  "dp.gate.label": { en: "Gate", ar: "البوابة" },
  "dp.field.decision": { en: "Decision", ar: "القرار" },
  "dp.field.reason": { en: "Reason", ar: "السبب" },
  "dp.field.recommendedAction": { en: "Recommended action", ar: "الإجراء المقترح" },
  "dp.field.flagId": { en: "Flag id", ar: "مُعرّف الإشارة" },
  "dp.headline.flag": { en: "Auto-flag emitted", ar: "صدرت إشارة تلقائية" },
  "dp.headline.noFlag": { en: "No automatic flag", ar: "لا توجد إشارة تلقائية" },
  "dp.staticDisclaimer": {
    en: "This panel does not constitute a finding. No notice or administrative action is implied.",
    ar: "لا تُشكّل هذه اللوحة استنتاجًا. لا يُفهم منها أي إشعار أو إجراء إداري.",
  },
  "dp.layer5.title": { en: "Decision Intelligence (Layer 5)", ar: "ذكاء القرار (الطبقة الخامسة)" },
  "dp.layer5.tier": { en: "Tier", ar: "الفئة" },
  "dp.layer5.actionOwner": { en: "Action owner", ar: "المسؤول عن الإجراء" },
  "dp.layer5.confidenceTier": { en: "Confidence tier", ar: "فئة الثقة" },
  "dp.layer5.riskLevel": { en: "Risk level", ar: "مستوى المخاطر" },
  "dp.layer5.escalationLevel": { en: "Escalation level", ar: "مستوى التصعيد" },
  "dp.layer5.sla": { en: "SLA", ar: "مدة المعالجة" },
  "dp.layer5.due": { en: "due", ar: "حتى" },
  "dp.layer5.decisionId": { en: "Decision id", ar: "مُعرّف القرار" },
  "dp.layer5.featureSource": { en: "Feature source", ar: "مصدر الخصائص" },
  "dp.layer5.rationaleSummary": { en: "Rationale (ordered rule firings)", ar: "المنطق (إطلاقات القواعد المرتّبة)" },
  "dp.reviewer.title": { en: "Reviewer Action", ar: "إجراء المراجع" },
  "dp.reviewer.note": {
    en: "Approval mutates Case.status to the tier-bound value and writes a DECISION_APPROVED audit record with your identity. Rejection records DECISION_REJECTED and leaves Case.status unchanged.",
    ar: "تؤدي الموافقة إلى تعديل Case.status إلى القيمة المرتبطة بالفئة وتسجّل قيدًا في الأرشيف باسم المراجع. الرفض يسجّل DECISION_REJECTED ولا يغيّر Case.status.",
  },
  "dp.empty": {
    en: "No Decision Intelligence proposal yet for this case.",
    ar: "لا يوجد اقتراح من ذكاء القرار لهذه الحالة بعد.",
  },
  "dp.empty.howto": {
    en: "POST /decisions/propose with this caseId to generate one (Phase 14, gated behind DECISION_API_ENABLED).",
    ar: "أرسل POST /decisions/propose بمعرّف الحالة لتوليد اقتراح (المرحلة 14، خلف بوابة DECISION_API_ENABLED).",
  },

  // ---- DecisionGateControls (client) -------------------------------
  "gc.closed.notice": {
    en: "No further reviewer action available on this decision.",
    ar: "لا يوجد إجراء مراجعة إضافي متاح على هذا القرار.",
  },
  "gc.closed.state": { en: "Gate state", ar: "حالة البوابة" },
  "gc.gated.notice": {
    en: "Decision API is gated. Approve/Reject controls are visible but disabled until Decision Gate G3 closes server-side.",
    ar: "واجهة برمجة القرار مغلقة بالبوابة. عناصر الموافقة/الرفض مرئية لكنها معطّلة حتى تُغلَق بوابة القرار G3 من جهة الخادم.",
  },
  "gc.field.approver": { en: "Approver", ar: "المعتمد" },
  "gc.field.role": { en: "Role", ar: "الدور" },
  "gc.field.note": { en: "Note (optional, persisted to audit chain)", ar: "ملاحظة (اختيارية، تُحفظ في سلسلة الأرشيف)" },
  "gc.field.reason": { en: "Rejection reason (required for Reject only)", ar: "سبب الرفض (مطلوب عند الرفض فقط)" },
  "gc.btn.approve": { en: "Approve & commit", ar: "اعتماد وتثبيت" },
  "gc.btn.reject": { en: "Reject", ar: "رفض" },
  "gc.audit.note": {
    en: "Approval mutates Case.status. Audit-logged with approver identity.",
    ar: "تعديل Case.status يحدث عند الاعتماد. يُسجَّل في الأرشيف بهوية المعتمد.",
  },
  "gc.error.approverRequired": { en: "Approver identity is required.", ar: "هوية المعتمد مطلوبة." },
  "gc.error.reasonRequired": { en: "Rejection reason is required.", ar: "سبب الرفض مطلوب." },

  // ---- LimitationsPanel --------------------------------------------
  "lp.title": { en: "Limitations & Disclosures", ar: "القيود والإفصاحات" },
  "lp.bullet.visualOnly": {
    en: "Visual screening only — no LiDAR, no SAR, no thermal imagery.",
    ar: "فحص بصري فقط — بدون LiDAR ولا SAR ولا تصوير حراري.",
  },
  "lp.bullet.notConfirmed": {
    en: "This is not a confirmed municipal indicator. Pending human review.",
    ar: "هذا ليس مؤشرًا بلديًا مؤكَّدًا. بانتظار المراجعة البشرية.",
  },
  "lp.bullet.parcelZoningPermit": {
    en: "Determination requires parcel, zoning, permit, and human review before any administrative action.",
    ar: "يتطلّب الحكم التحقّق من القسيمة والتنظيم والترخيص ومراجعة بشرية قبل أي إجراء إداري.",
  },
  "lp.flag.visualScreeningOnly": { en: "visualScreeningOnly", ar: "فحص بصري فقط" },
  // Phase 32.5.1 — legacy flag key neutralised. Original wording retired
  // per the constitutional adversarial-framing ban (CLAUDE.md §5;
  // tools/banned_claims.yml). Key preserved to avoid TKey-type breakage in
  // any pre-V2 caller; rendered text is now governance-safe.
  "lp.flag.confirmedViolation": {
    en: "Suspected indicator — pending human review",
    ar: "مؤشر مشتبه — بانتظار المراجعة البشرية",
  },

  // ---- ProvenanceTable ---------------------------------------------
  "pv.title": { en: "Provenance", ar: "المنشأ والأثر" },
  "pv.fallback.notice": {
    en: "Synthetic deterministic fallback used — no real raster pair was resolved for this run.",
    ar: "استُخدم البديل التركيبي الحتمي — لم يتمّ حلّ زوج صور حقيقي لهذا التشغيل.",
  },
  "pv.recentAudit": { en: "Recent audit events", ar: "أحدث أحداث الأرشيف" },

  // ---- Map satellite toggle (Phase 15B) ----------------------------
  "map.layer.base": { en: "Base map", ar: "خريطة أساسية" },
  "map.layer.satellite": { en: "Satellite", ar: "أقمار اصطناعية" },
  "map.layer.notConfigured": { en: "Satellite layer not configured", ar: "طبقة الأقمار الاصطناعية غير مهيّأة" },
  "map.layer.label": { en: "Layer", ar: "الطبقة" },

  // ---- Phase 16 — Geo Command Map upgrade --------------------------
  "map.basemap.label": { en: "Basemap", ar: "الخريطة الأساسية" },
  "map.basemap.streets": { en: "Streets", ar: "شوارع" },
  "map.basemap.satellite": { en: "Satellite", ar: "أقمار اصطناعية" },
  "map.basemap.hybrid": { en: "Hybrid", ar: "مختلطة" },
  "map.basemap.hybridNotConfigured": {
    en: "Hybrid layer not configured (requires a vector tile provider key)",
    ar: "الطبقة المختلطة غير مهيّأة (تتطلّب مفتاح مزوّد بلاطات متّجهة)",
  },

  "map.views.label": { en: "Quick views", ar: "العَرض السريع" },
  "map.views.gcc": { en: "GCC View", ar: "عرض دول الخليج" },
  "map.views.kuwait": { en: "Kuwait View", ar: "عرض الكويت" },
  "map.views.southSurra": { en: "South Surra / Zahra", ar: "جنوب السرة / الزهراء" },
  "map.views.kw9001": { en: "KW-9001 Case", ar: "حالة KW-9001" },

  "map.legend.title": { en: "Risk legend", ar: "دليل المخاطر" },
  "map.legend.critical": { en: "Critical", ar: "حرجة" },
  "map.legend.high": { en: "High", ar: "عالية" },
  "map.legend.medium": { en: "Medium", ar: "متوسطة" },
  "map.legend.low": { en: "Low", ar: "منخفضة" },

  "map.governance": {
    en: "Visual geospatial reference only. Requires municipal human review.",
    ar: "مرجع جغرافي بصري فقط. يتطلّب مراجعة بشرية بلدية.",
  },

  "map.controls.zoomIn": { en: "Zoom in", ar: "تكبير" },
  "map.controls.zoomOut": { en: "Zoom out", ar: "تصغير" },
  "map.controls.compass": { en: "Reset bearing", ar: "إعادة الاتجاه" },
  "map.controls.fullscreen": { en: "Toggle fullscreen", ar: "تبديل ملء الشاشة" },

  "map.popup.detectionScore": { en: "Detection score", ar: "نتيجة الكشف" },
  "map.popup.signal": { en: "Signal", ar: "الإشارة" },

  // ---- Phase 17 — Story Mode --------------------------------------
  "story.title": {
    en: "Geospatial Decision Path",
    ar: "مسار القرار الجغرافي",
  },
  "story.activeStage": { en: "Active stage", ar: "المرحلة الحالية" },
  "story.decisionMoment.title": { en: "Decision moment", ar: "لحظة القرار" },
  "story.decisionMoment.decision": { en: "Decision", ar: "القرار" },
  "story.decisionMoment.action": { en: "Action", ar: "الإجراء" },
  "story.decisionMoment.confidence": { en: "Confidence", ar: "الثقة" },
  "story.decisionMoment.owner": { en: "Owner", ar: "المسؤول" },
  // Phase 23 — Decision urgency + queue impact
  "story.urgency.label": { en: "Urgency", ar: "الإلحاح" },
  "story.urgency.review24h": { en: "Review required within 24h", ar: "تتطلّب المراجعة خلال 24 ساعة" },
  "story.urgency.review72h": { en: "Review required within 72h", ar: "تتطلّب المراجعة خلال 72 ساعة" },
  "story.urgency.review7d": { en: "Review required within 7 days", ar: "تتطلّب المراجعة خلال 7 أيام" },
  "story.urgency.review14d": { en: "Review required within 14 days", ar: "تتطلّب المراجعة خلال 14 يومًا" },
  "story.urgency.queueImpactOne": { en: "1 similar case pending", ar: "حالة مشابهة واحدة قيد الانتظار" },
  "story.urgency.queueImpactMany": { en: "similar cases pending", ar: "حالات مشابهة قيد الانتظار" },
  "story.severity.label": { en: "Severity", ar: "الشدّة" },
  "story.severity.critical": { en: "Critical", ar: "حرجة" },
  "story.severity.high": { en: "High", ar: "عالية" },
  "story.severity.medium": { en: "Medium", ar: "متوسطة" },
  "story.severity.low": { en: "Low", ar: "منخفضة" },
  // Phase 23 — Evidence visual dominance
  "story.evidence.detectedChange": { en: "Detected change area", ar: "منطقة التغيّر المكتشفة" },
  "story.evidence.confidenceExplain": {
    en: "Model confidence based on visual change-detection patterns. Subject to municipal validation.",
    ar: "ثقة النموذج مبنية على أنماط الكشف عن التغيّر البصري. تخضع للتحقّق البلدي.",
  },
  // Phase 23 — Map focus overlay
  "map.focus.overlay": { en: "Focused inspection area", ar: "منطقة التفتيش المُركَّزة" },
  // Phase 23 — Trust mini block
  "trust.mini.title": { en: "Trust", ar: "الثقة" },

  // ---- Phase 24 — institutional-grade interaction layer ----------
  "drawer.title": { en: "Selected case", ar: "حالة محددة" },
  "drawer.section.status": { en: "Status", ar: "الحالة" },
  "drawer.section.decision": { en: "Decision", ar: "القرار" },
  "drawer.section.evidence": { en: "Evidence", ar: "الأدلة" },
  "drawer.section.actionIntent": { en: "Action intent", ar: "نية إجراء" },
  "drawer.section.trace": { en: "Interaction trace", ar: "أثر التفاعل" },
  "drawer.empty": { en: "Select a marker to populate the decision drawer.", ar: "اختر علامة لتعبئة لوحة القرار." },

  "drawer.evidence.before": { en: "Before observation", ar: "ملاحظة قبل" },
  "drawer.evidence.after": { en: "After observation", ar: "ملاحظة بعد" },
  "drawer.evidence.reference": { en: "Reference view", ar: "عرض مرجعي" },
  "drawer.evidence.unavailable": {
    en: "Evidence imagery unavailable for this case in the current environment.",
    ar: "صور الأدلة لهذه الحالة غير متاحة في البيئة الحالية.",
  },
  "drawer.evidence.clickToEnlarge": {
    en: "Click a thumbnail to enlarge.",
    ar: "اضغط على صورة مصغّرة للتكبير.",
  },

  "drawer.intent.recorded": {
    en: "Action intent recorded locally for review.",
    ar: "تم تسجيل نية الإجراء محليًا للمراجعة.",
  },
  "drawer.intent.note": {
    en: "Intents are not yet committed to the audit chain. They surface here so the reviewer can recall what was considered.",
    ar: "لا تُحفظ النيّات في سلسلة الأرشيف بعد. تُعرض هنا ليتذكّر المراجع ما تمّ النظر فيه.",
  },

  "drawer.trace.selected": { en: "Selected", ar: "تمّ الاختيار" },
  "drawer.trace.evidence": { en: "Evidence viewed", ar: "تمّت مراجعة الأدلة" },
  "drawer.trace.decision": { en: "Decision reviewed", ar: "تمّت مراجعة القرار" },
  "drawer.trace.intent": { en: "Action intent", ar: "نية إجراء" },

  "drawer.popup.openSurface": { en: "Open decision surface", ar: "فتح سطح القرار" },
  "drawer.popup.viewEvidence": { en: "View evidence", ar: "عرض الأدلة" },
  "drawer.popup.initiate": { en: "Initiate review", ar: "بدء المراجعة" },
  "drawer.statusChip.notRun": { en: "Detection not yet run", ar: "لم يُشغَّل الكشف بعد" },
  "drawer.statusChip.municipalReview": { en: "Municipal review required", ar: "مراجعة بلدية مطلوبة" },
  "drawer.indicatorOnly": { en: "Analytical indication only", ar: "مؤشر تحليلي فقط" },

  // ---- Phase 25 — Decision System Activation ----------------------
  "drawer.activeReview": { en: "Active review", ar: "مراجعة نشطة" },
  "drawer.reviewStatus.pending": { en: "Pending", ar: "قيد الانتظار" },
  "drawer.reviewStatus.underReview": {
    en: "Under municipal review",
    ar: "قيد المراجعة البلدية",
  },

  "drawer.workflow.title": { en: "Workflow", ar: "تدفّق العمل" },
  "drawer.workflow.signal": { en: "Signal received", ar: "تم استلام الإشارة" },
  "drawer.workflow.evidence": { en: "Evidence reviewed", ar: "تمت مراجعة الأدلة" },
  "drawer.workflow.initiated": { en: "Review initiated", ar: "بدأت المراجعة" },
  "drawer.workflow.owner": { en: "Owner assigned", ar: "تمّ تعيين المسؤول" },
  "drawer.workflow.field": {
    en: "Field check requested",
    ar: "طُلب التحقّق الميداني",
  },
  "drawer.workflow.admin": {
    en: "Administrative review pending",
    ar: "المراجعة الإدارية قيد الانتظار",
  },

  "map.related.label": { en: "Related observed pattern", ar: "نمط مرصود مرتبط" },
  "map.related.countOne": { en: "1 related case", ar: "حالة واحدة ذات صلة" },
  "map.related.countMany": { en: "related cases", ar: "حالات ذات صلة" },

  "drawer.queueImpact.title": { en: "Queue impact", ar: "أثر الطابور" },
  "drawer.queueImpact.activeReview": {
    en: "1 case moved into active review",
    ar: "حالة واحدة انتقلت إلى المراجعة النشطة",
  },
  "drawer.queueImpact.workload": { en: "Review workload", ar: "حِمل المراجعة" },
  "drawer.queueImpact.relatedCases": { en: "Related cases", ar: "حالات ذات صلة" },
  "drawer.queueImpact.pendingField": {
    en: "Pending field checks",
    ar: "فحوصات ميدانية قيد الانتظار",
  },

  "drawer.miniImpact.title": { en: "Impact", ar: "الأثر" },
  "drawer.miniImpact.caseImpact": { en: "Case impact", ar: "أثر الحالة" },
  "drawer.miniImpact.relatedPattern": {
    en: "Related pattern count",
    ar: "عدد الأنماط المرتبطة",
  },
  "drawer.miniImpact.nextStep": { en: "Required next step", ar: "الخطوة التالية المطلوبة" },
  "drawer.miniImpact.ownerStatus": { en: "Review owner status", ar: "حالة مسؤول المراجعة" },
  "drawer.miniImpact.fieldRequired": {
    en: "Field review required",
    ar: "مراجعة ميدانية مطلوبة",
  },

  // ---- Phase 29 — Decision Interaction Tabs ----------------------
  "tabs.signal": { en: "Signal", ar: "الإشارة" },
  "tabs.evidence": { en: "Evidence", ar: "الأدلة" },
  "tabs.decision": { en: "Decision", ar: "القرار" },
  "tabs.action": { en: "Action", ar: "الإجراء" },
  "tabs.audit": { en: "Audit", ar: "سجل المراجعة" },

  "panel.observedPattern": { en: "Observed pattern", ar: "النمط المرصود" },
  "panel.administrativeArea": { en: "Administrative area", ar: "المنطقة الإدارية" },
  "panel.riskLevel": { en: "Risk level", ar: "مستوى المخاطر" },
  "panel.confidence": { en: "Confidence", ar: "الثقة" },
  "panel.reasonPriority": { en: "Reason for priority", ar: "سبب الأولوية" },
  "panel.reason": { en: "Reason", ar: "السبب" },
  "panel.confidenceExplain": {
    en: "Confidence reflects model agreement on visual change-detection patterns. Subject to municipal validation.",
    ar: "تعكس الثقة توافق النموذج على أنماط الكشف عن التغيّر البصري. تخضع للتحقّق البلدي.",
  },
  "panel.unverified": { en: "Remains unverified", ar: "لم يتم التحقّق منه بعد" },
  "panel.requiredReview": { en: "Required review", ar: "المراجعة المطلوبة" },
  "panel.openDetectionReview": { en: "Open detection review", ar: "فتح مراجعة الكشف" },
  "panel.governanceNote": {
    en: "All actions remain subject to municipal validation before any administrative step.",
    ar: "تظل جميع الإجراءات خاضعة للتحقّق البلدي قبل أي خطوة إدارية.",
  },
  "panel.followUp": { en: "Under follow-up", ar: "قيد المتابعة" },
  "panel.requiresMunicipalReview": {
    en: "Requires municipal review",
    ar: "يتطلب مراجعة بلدية",
  },

  // ---- Phase 29 — Operations & Summary upgrades ------------------
  "ops.row.reasonPriority": { en: "Reason for priority", ar: "سبب الأولوية" },
  "summary.kpi.needsAttention": {
    en: "What needs attention now",
    ar: "ما يستحقّ الاهتمام الآن",
  },
  "summary.kpi.topPatterns": { en: "Top observed patterns", ar: "أبرز الأنماط المرصودة" },
  "summary.kpi.reviewWorkload": { en: "Review workload", ar: "حِمل المراجعة" },
  "summary.kpi.openInQueue": { en: "Open in queue", ar: "فتح في الطابور" },
  // Phase 17.5 — visual flow strip (5 conceptual stages)
  "story.flow.context": { en: "Context", ar: "السياق" },
  "story.flow.area": { en: "Area", ar: "المنطقة" },
  "story.flow.case": { en: "Case", ar: "الحالة" },
  "story.flow.evidence": { en: "Evidence", ar: "الأدلة" },
  "story.flow.decision": { en: "Decision", ar: "القرار" },
  "story.focus.label": { en: "Active focus", ar: "التركيز الحالي" },
  "story.focus.gcc": { en: "GCC region", ar: "منطقة الخليج" },
  "story.focus.kuwait": { en: "Kuwait", ar: "الكويت" },
  "story.focus.southSurra": { en: "South Surra / Zahra", ar: "جنوب السرة / الزهراء" },
  "story.focus.kw9001": { en: "Case KW-9001", ar: "الحالة KW-9001" },
  "story.simulation.title": { en: "Simulation flow", ar: "تسلسل المحاكاة" },
  "story.decision.outputTitle": { en: "Decision Output", ar: "ناتج القرار" },
  "story.eyebrow": {
    en: "Municipal intelligence narrative",
    ar: "سرد المعلومات البلدية",
  },
  "story.stepLabel": { en: "Step", ar: "الخطوة" },
  "story.of": { en: "of", ar: "من" },
  "story.btn.play": { en: "Play simulation", ar: "تشغيل المحاكاة" },
  "story.btn.pause": { en: "Pause", ar: "إيقاف مؤقّت" },
  "story.btn.prev": { en: "Previous", ar: "السابق" },
  "story.btn.next": { en: "Next", ar: "التالي" },
  "story.btn.reset": { en: "Reset view", ar: "إعادة العرض" },
  "story.section.youSee": { en: "What we observe", ar: "ما نرصده" },
  "story.section.whyMatters": { en: "Why it matters", ar: "أهمية ذلك" },
  "story.section.decision": { en: "Recommended action", ar: "الإجراء المقترح" },
  "story.humanNote": { en: "Human municipal review required at every stage.", ar: "تتطلّب كل مرحلة مراجعة بشرية بلدية." },
  "story.evidence.title": { en: "Operator-collected evidence", ar: "أدلة جمعها المُشغّل" },
  "story.evidence.before": { en: "Before", ar: "قبل" },
  "story.evidence.after": { en: "After", ar: "بعد" },
  "story.evidence.reference": { en: "Reference", ar: "مرجع" },
  "story.evidence.unavailable": {
    en: "Evidence imagery is not yet ingested for this case. Open the detection review for the full provenance trail.",
    ar: "لم تُستورَد صور الأدلة لهذه الحالة بعد. افتح مراجعة الكشف للاطّلاع على السلسلة الكاملة للمنشأ.",
  },
  "story.decision.title": { en: "Decision Intelligence outcome", ar: "نتيجة ذكاء القرار" },
  "story.decision.composite": { en: "Composite score", ar: "النتيجة المجمَّعة" },
  "story.decision.recommendedAction": { en: "Recommended action", ar: "الإجراء المقترح" },
  "story.decision.tier": { en: "Tier", ar: "الفئة" },
  "story.decision.openReview": { en: "Open Detection Review", ar: "فتح مراجعة الكشف" },
  "story.decision.notRunYet": {
    en: "Detection has not been run for this case in the current session. Run it from the case page to see live score and decision.",
    ar: "لم يُشغَّل الكشف لهذه الحالة في الجلسة الحالية. شغّله من صفحة الحالة لرؤية النتيجة والقرار مباشرةً.",
  },

  // Per-step narratives. Keep wording conservative — use suspected,
  // signal, requires validation. Avoid every banned pattern in
  // tools/banned_claims.yml.
  "story.s1.title": { en: "Regional Context", ar: "السياق الإقليمي" },
  "story.s1.youSee": {
    en: "All suspected indicators across Kuwait and Saudi Arabia, coloured by risk level.",
    ar: "جميع المؤشرات المشتبه بها في الكويت والمملكة العربية السعودية، ملوّنة حسب مستوى المخاطر.",
  },
  "story.s1.whyMatters": {
    en: "A bird's-eye view sets jurisdictional scope and lets municipal leadership see signal density before drilling in.",
    ar: "تُحدّد النظرة العامة النطاق القضائي وتُتيح للقيادة البلدية رؤية كثافة الإشارات قبل التعمّق.",
  },
  "story.s1.decision": {
    en: "No decision required at this scale. Choose a jurisdiction to enter focused review.",
    ar: "لا يلزم اتخاذ قرار بهذا النطاق. اختر ولاية للدخول في مراجعة مركّزة.",
  },

  "story.s2.title": { en: "National Focus", ar: "التركيز الوطني" },
  "story.s2.youSee": {
    en: "Kuwait-only suspected indicators, including the Mubarak Al-Kabeer cluster around South Surra.",
    ar: "مؤشرات مشتبه بها داخل الكويت فقط، بما فيها تجمّع مبارك الكبير حول جنوب السرة.",
  },
  "story.s2.whyMatters": {
    en: "Municipal-level review starts at the country tier so reviewers can compare neighbouring parcels and prior cases.",
    ar: "تبدأ المراجعة على المستوى البلدي من نطاق الدولة بحيث يستطيع المراجعون المقارنة بين القسائم المجاورة والحالات السابقة.",
  },
  "story.s2.decision": {
    en: "Identify the area requiring closer inspection. Move to neighbourhood scale.",
    ar: "حدّد المنطقة التي تحتاج تفتيشًا أقرب. انتقل إلى نطاق الحيّ.",
  },

  "story.s3.title": { en: "Area Analysis", ar: "تحليل المنطقة" },
  "story.s3.youSee": {
    en: "South Surra / Zahra parcel context: residential land with a recent suspected rear-yard structural change.",
    ar: "سياق قسائم جنوب السرة / الزهراء: أرض سكنية مع تغيّر إنشائي مشتبه به مؤخّرًا في الفناء الخلفي.",
  },
  "story.s3.whyMatters": {
    en: "Neighbourhood-scale view places the suspected indicator in the correct zoning context (residential R2).",
    ar: "تضع نظرة الحيّ المؤشّر المشتبه به في سياق التصنيف التنظيمي الصحيح (سكني R2).",
  },
  "story.s3.decision": {
    en: "Verify parcel boundary, zoning, and permit before any escalation.",
    ar: "تحقّق من حدود القسيمة والتصنيف التنظيمي والترخيص قبل أي تصعيد.",
  },

  "story.s4.title": { en: "Case Intelligence", ar: "استخبارات الحالة" },
  "story.s4.youSee": {
    en: "KW-9001 marker centered. Popup carries the suspected setback indicator and the policy rule it tests.",
    ar: "علامة الحالة KW-9001 في المركز. تحمل النافذة المنبثقة المؤشّر المشتبه به للارتداد والقاعدة التنظيمية التي يختبرها.",
  },
  "story.s4.whyMatters": {
    en: "This is the candidate parcel for review: parcel KW-PACI-SURRA-Z-7-2218 against Kuwait Municipality Building Code Art. 18.",
    ar: "هذه هي القسيمة المرشَّحة للمراجعة: قسيمة KW-PACI-SURRA-Z-7-2218 وفق المادة 18 من نظام البناء البلدي الكويتي.",
  },
  "story.s4.decision": {
    en: "Open the detection review to inspect imagery, score, and rule trace.",
    ar: "افتح مراجعة الكشف لتفقّد الصور والنتيجة وأثر القواعد.",
  },

  "story.s5.title": { en: "Detection Evidence", ar: "أدلة الرصد" },
  "story.s5.youSee": {
    en: "Operator-collected before / after / reference imagery for KW-9001, alongside the parcel.",
    ar: "صور (قبل / بعد / مرجع) جمعها المُشغّل لحالة KW-9001، إلى جانب القسيمة.",
  },
  "story.s5.whyMatters": {
    en: "Visual screening on Sentinel imagery is suggestive only. Resolution limits and shadow effects mean ground truth requires field work.",
    ar: "الفحص البصري على صور Sentinel استرشادي فقط. حدود الدقة وتأثيرات الظلال تعني أن إثبات الواقع يتطلّب عملًا ميدانيًا.",
  },
  "story.s5.decision": {
    en: "Decide whether the visual evidence warrants a desktop review packet or a field inspection.",
    ar: "قرّر ما إذا كانت الأدلة البصرية تستدعي ملف مراجعة مكتبية أو تفتيشًا ميدانيًا.",
  },

  "story.s6.title": { en: "Decision Outcome", ar: "نتيجة القرار" },
  "story.s6.youSee": {
    en: "Composite detection score, decision tier, and the recommended next action surfaced by Decision Intelligence.",
    ar: "النتيجة المجمَّعة للكشف، وفئة القرار، والإجراء التالي الموصى به من ذكاء القرار.",
  },
  "story.s6.whyMatters": {
    en: "Decision Intelligence proposes a non-binding action and writes its rationale to the audit chain. The reviewer remains the decision authority.",
    ar: "يقترح ذكاء القرار إجراءً غير مُلزِم ويسجّل مبرّراته في سلسلة الأرشيف. يبقى المراجع هو صاحب صلاحية القرار.",
  },
  "story.s6.decision": {
    en: "Confirm the recommended action, request additional evidence, or close the review with a documented note.",
    ar: "اعتمد الإجراء الموصى به، أو اطلب أدلّة إضافية، أو أغلق المراجعة مع ملاحظة موثّقة.",
  },

  // ---- Phase 18 — Ontology Panel (Object → Evidence → Signal → Decision → Action → Audit)
  "ont.title": { en: "Object Map", ar: "خريطة الكيانات" },
  "ont.label.case": { en: "Case", ar: "الحالة" },
  "ont.label.adminArea": { en: "Administrative Area", ar: "المنطقة الإدارية" },
  "ont.label.evidencePack": { en: "Evidence Pack", ar: "حزمة الأدلة" },
  "ont.label.detectionRun": { en: "Detection Run", ar: "تشغيل الكشف" },
  "ont.label.reviewDecision": { en: "Review Decision", ar: "قرار المراجعة" },
  "ont.label.reviewOwner": { en: "Review Owner", ar: "مسؤول المراجعة" },
  "ont.label.nextAction": { en: "Recommended Action", ar: "الإجراء المقترح" },
  "ont.label.auditTrail": { en: "Audit Trail", ar: "سلسلة الأرشيف" },
  "ont.evidencePack.sealed": { en: "sealed", ar: "مختومة" },
  "ont.unassigned": { en: "Unassigned", ar: "غير مُعيَّن" },
  "ont.notRunYet": { en: "Not run yet", ar: "لم يُشغَّل بعد" },
  "ont.auditEvents": { en: "events", ar: "أحداث" },
  "ont.auditOpen": { en: "Open audit on detection page", ar: "افتح الأرشيف في صفحة الكشف" },

  // ---- Phase 18 — Decision Trace
  "trace.title": { en: "Decision Trace", ar: "أثر القرار" },
  "trace.step.matters": { en: "Why this case matters", ar: "أهمية هذه الحالة" },
  "trace.step.signal": { en: "Observed municipal signal", ar: "الإشارة البلدية المرصودة" },
  "trace.step.score": { en: "Detection score", ar: "نتيجة الكشف" },
  "trace.step.rule": { en: "Decision rule triggered", ar: "القاعدة المُطلَقة" },
  "trace.step.confidence": { en: "Confidence level", ar: "مستوى الثقة" },
  "trace.step.review": { en: "Required review action", ar: "الإجراء المطلوب من المراجعة" },
  "trace.step.reviewOwner": { en: "Review owner", ar: "مسؤول المراجعة" },
  "trace.reviewOwner.unassigned": {
    en: "Unassigned — pending owner assignment",
    ar: "غير مُعيَّن — بانتظار اختيار المسؤول",
  },
  "trace.step.unverified": { en: "What remains unverified", ar: "ما لم يتم التحقّق منه بعد" },
  "trace.unverified.parcel": { en: "Parcel boundary", ar: "حدود القسيمة" },
  "trace.unverified.permit": { en: "Permit record", ar: "سجل الترخيص" },
  "trace.unverified.zoning": { en: "Zoning rule", ar: "قاعدة التنظيم" },
  "trace.unverified.field": { en: "Field-level confirmation", ar: "تأكيد ميداني" },
  "trace.scoreBelow": { en: "below advisory threshold", ar: "تحت عتبة المراجعة الاستشارية" },
  "trace.scoreAbove": { en: "above advisory threshold", ar: "فوق عتبة المراجعة الاستشارية" },
  "trace.matters.empty": {
    en: "Matters as a candidate parcel for municipal review against the cited policy rule.",
    ar: "تُعدّ قسيمة مرشَّحة للمراجعة البلدية وفق القاعدة التنظيمية المُستشهد بها.",
  },
  "trace.confidence.high": { en: "High", ar: "عالية" },
  "trace.confidence.medium": { en: "Medium", ar: "متوسطة" },
  "trace.confidence.low": { en: "Low", ar: "منخفضة" },
  "trace.confidence.floor": { en: "Below floor", ar: "تحت الحد الأدنى" },

  // ---- Phase 18 — Trust Layer
  "trust.title": { en: "Trust Layer", ar: "طبقة الثقة" },
  "trust.dataSource": { en: "Data source", ar: "مصدر البيانات" },
  "trust.evidenceStatus": { en: "Evidence status", ar: "حالة الأدلة" },
  "trust.modelVersion": { en: "Model version", ar: "إصدار النموذج" },
  "trust.manifestHash": { en: "Manifest hash", ar: "بصمة المخزون" },
  "trust.humanReview": { en: "Human review", ar: "المراجعة البشرية" },
  "trust.required": { en: "Required", ar: "مطلوبة" },
  "trust.lastUpdated": { en: "Last updated", ar: "آخر تحديث" },
  "trust.governance.title": { en: "Governance", ar: "الحوكمة" },
  "trust.governance.body": {
    en: "All cases require municipal validation before any administrative action.",
    ar: "تتطلّب جميع الحالات تحقّقًا بلديًا قبل أي إجراء إداري.",
  },
  "trust.dataSource.sentinel": { en: "Sentinel-2 (operator-collected)", ar: "Sentinel-2 (جمعها المُشغّل)" },
  "trust.dataSource.unknown": { en: "Operator-collected imagery", ar: "صور جمعها المُشغّل" },
  "trust.evidence.opencv": { en: "OpenCV visible-band proxy", ar: "بديل OpenCV من النطاق المرئي" },
  "trust.evidence.synthetic": { en: "Deterministic synthetic fallback", ar: "بديل تركيبي حتمي" },
  "trust.evidence.notRun": { en: "Detection not yet run", ar: "لم يُشغَّل الكشف بعد" },

  // ---- Phase 18 — Operations: Why prioritized?
  "ops.whyPrioritized": { en: "Why prioritized?", ar: "سبب الأولوية؟" },
  "ops.driver.criticalRisk": { en: "Critical risk classification", ar: "تصنيف خطورة حرجة" },
  "ops.driver.highRisk": { en: "High risk classification", ar: "تصنيف خطورة عالية" },
  "ops.driver.permitLock": { en: "No active permit", ar: "لا يوجد ترخيص ساري" },
  "ops.driver.councilTier": { en: "Council-tier escalation", ar: "تصعيد على مستوى المجلس" },
  "ops.driver.priorityFlag": { en: "Priority flag", ar: "إشارة أولوية" },
  "ops.driver.recentSignal": { en: "Recent municipal signal", ar: "إشارة بلدية حديثة" },
  "ops.driver.fieldInspection": { en: "Field inspection suggested", ar: "يُقترح تفتيش ميداني" },

  // ---- Phase 19 — Action Layer
  "action.title": { en: "Action Layer", ar: "طبقة الإجراءات" },
  "action.primary": { en: "Primary", ar: "أساسية" },
  "action.secondary": { en: "Secondary", ar: "ثانوية" },
  "action.btn.initiate": { en: "Initiate Review", ar: "بدء المراجعة" },
  "action.btn.assign": { en: "Assign Review Owner", ar: "تعيين مسؤول مراجعة" },
  "action.btn.fieldInspection": { en: "Request Field Inspection", ar: "طلب تفتيش ميداني" },
  "action.btn.adminReview": { en: "Mark for Administrative Review", ar: "وضع علامة للمراجعة الإدارية" },
  "action.btn.close": { en: "Close Case", ar: "إغلاق الحالة" },
  "action.note": {
    en: "Each action navigates to the appropriate review surface and is recorded to the audit chain. No automatic municipal action is implied.",
    ar: "ينقل كل إجراء إلى السطح المناسب للمراجعة ويُسجَّل في سلسلة الأرشيف. لا يُفهم منه أي إجراء بلدي تلقائي.",
  },
  "action.tooltip.initiate": {
    en: "Open the Detection Review surface to inspect imagery, score, and decision rationale.",
    ar: "افتح سطح مراجعة الكشف لتفقّد الصور والنتيجة ومنطق القرار.",
  },
  "action.tooltip.assign": {
    en: "Assign a review owner from the Municipal Review Queue.",
    ar: "عيّن مسؤول مراجعة من طابور المراجعة البلدية.",
  },
  "action.tooltip.fieldInspection": {
    en: "Field inspection is requested from the Municipal Review Queue row controls.",
    ar: "يُطلب التفتيش الميداني من عناصر التحكّم في صف طابور المراجعة البلدية.",
  },
  "action.tooltip.adminReview": {
    en: "Administrative review is recorded via the Municipal Review Queue.",
    ar: "تُسجَّل المراجعة الإدارية عبر طابور المراجعة البلدية.",
  },
  "action.tooltip.close": {
    en: "Closure is performed from the Municipal Review Queue row controls.",
    ar: "يتمّ الإغلاق من عناصر التحكّم في صف طابور المراجعة البلدية.",
  },

  // ---- Phase X — Decision Surface (unified surface) -------------
  "ds.title": { en: "Decision Surface", ar: "سطح القرار" },
  "ds.summary.status": { en: "Decision status", ar: "حالة القرار" },
  "ds.summary.confidence": { en: "Confidence", ar: "الثقة" },
  "ds.summary.recommended": { en: "Recommended action", ar: "الإجراء المقترح" },
  "ds.summary.reviewOwner": { en: "Review owner", ar: "مسؤول المراجعة" },
  "ds.summary.sla": { en: "Review timeframe", ar: "مدة المراجعة" },
  "ds.summary.statusNoFlag": { en: "No automatic flag", ar: "لا توجد إشارة تلقائية" },
  "ds.summary.statusFlag": { en: "Auto-flag emitted", ar: "صدرت إشارة تلقائية" },
  "ds.summary.statusNotRun": { en: "Detection not yet run", ar: "لم يُشغَّل الكشف بعد" },
  "ds.section.why": { en: "Why this case", ar: "سبب هذه الحالة" },
  "ds.section.evidence": { en: "Evidence preview", ar: "نظرة على الأدلة" },
  "ds.section.timeline": { en: "Timeline", ar: "الخط الزمني" },
  "ds.section.ontology": { en: "Linked objects", ar: "الكيانات المرتبطة" },
  "ds.why.signal": { en: "Observed signal", ar: "الإشارة المرصودة" },
  "ds.why.policy": { en: "Policy reference", ar: "السند التنظيمي" },
  "ds.why.rules": { en: "Rules triggered", ar: "القواعد المُطلَقة" },
  "ds.why.empty": { en: "No rules triggered yet.", ar: "لم تُطلق أي قواعد بعد." },

  // Decision Authority — outcome awareness + evidence labels
  "ds.outcome.title": { en: "Outcome awareness", ar: "نتائج القرار" },
  "ds.outcome.approved": {
    en: "If approved → status moves to the tier-bound value and the recommended action is recorded.",
    ar: "عند الاعتماد ← تنتقل الحالة إلى القيمة المرتبطة بالفئة ويُسجَّل الإجراء المقترح.",
  },
  "ds.outcome.rejected": {
    en: "If rejected → the proposal closes with a reviewer note. Case status is unchanged.",
    ar: "عند الرفض ← يُغلق الاقتراح مع ملاحظة من المراجع. لا تتغيّر حالة القضية.",
  },
  "ds.evidence.observedChange": { en: "Observed change", ar: "تغيّر مُلاحَظ" },
  "ds.evidence.noSignificantChange": { en: "No significant change", ar: "لا تغيير جوهري" },

  // ---- Phase 19 — Case Timeline
  "timeline.title": { en: "Case Timeline", ar: "الخط الزمني للحالة" },
  "timeline.event.detectionCreated": { en: "Detection created", ar: "تم إنشاء الكشف" },
  "timeline.event.evidenceReviewed": { en: "Evidence reviewed", ar: "تمت مراجعة الأدلة" },
  "timeline.event.decisionUpdated": { en: "Decision updated", ar: "تم تحديث القرار" },
  "timeline.event.assigned": { en: "Assigned", ar: "تم التعيين" },
  "timeline.event.closed": { en: "Closed", ar: "تم الإغلاق" },
  "timeline.pending": { en: "Pending", ar: "قيد الانتظار" },
  "timeline.empty": {
    en: "No timeline events yet for this case.",
    ar: "لا توجد أحداث زمنية لهذه الحالة بعد.",
  },

  // ---- Phase 18 — Story decision-step operational chain
  "story.chain.title": { en: "Operational chain", ar: "السلسلة التشغيلية" },
  "story.chain.context": { en: "Context", ar: "السياق" },
  "story.chain.area": { en: "Area", ar: "المنطقة" },
  "story.chain.case": { en: "Case", ar: "الحالة" },
  "story.chain.evidence": { en: "Evidence", ar: "الأدلة" },
  "story.chain.decision": { en: "Decision", ar: "القرار" },
  "story.chain.review": { en: "Review", ar: "المراجعة" },

  // ---- Cross-cutting governance phrases ----------------------------
  "g.suspected": { en: "suspected", ar: "مشتبه به" },
  "g.signal": { en: "signal", ar: "إشارة" },
  "g.reviewRequired": { en: "review required", ar: "مراجعة مطلوبة" },
  "g.requiresValidation": { en: "requires validation", ar: "يتطلب التحقّق" },
  "g.humanReviewRequired": { en: "Human review required", ar: "يتطلب مراجعة بشرية" },
  "g.noAutoFlag": { en: "No automatic flag", ar: "لا توجد إشارة تلقائية" },

  // ---- DecisionBasisBlock (OID P1) — read-only projection surface ----
  // No UI built yet (Phase OID-P2). Keys are added so the surface compiles
  // when components land and so the linter / docs reference a real key path.
  // AR is authored Gulf-institutional Arabic per CLAUDE.md §11.
  "dbb.title":                         { en: "Decision Basis",                                                ar: "أساس القرار" },
  "dbb.region.evidence_sufficiency":   { en: "Evidence sufficiency",                                          ar: "كفاية الأدلة" },
  "dbb.region.audit_completeness":     { en: "Audit completeness",                                            ar: "اكتمال السجل التدقيقي" },
  "dbb.region.time_in_state":          { en: "Time in state",                                                 ar: "الوقت في الحالة" },
  "dbb.region.similar_case_context":   { en: "Similar-case context",                                          ar: "سياق الحالات المشابهة" },
  "dbb.region.confidence_caveats":     { en: "Confidence caveats",                                            ar: "تحفظات الثقة" },
  "dbb.region.governance_notice":      { en: "Governance notice",                                             ar: "إشعار حوكمي" },

  // Floor descriptors.
  "dbb.floor.below":                   { en: "Below floor",                                                   ar: "دون الحد الأدنى" },
  "dbb.floor.at":                      { en: "At floor",                                                      ar: "عند الحد الأدنى" },
  "dbb.floor.above":                   { en: "Above floor",                                                   ar: "فوق الحد الأدنى" },

  // Audit completeness band labels.
  "dbb.audit.band.complete":           { en: "Complete",                                                      ar: "مكتمل" },
  "dbb.audit.band.partial":            { en: "Partial",                                                       ar: "جزئي" },
  "dbb.audit.band.verifying":          { en: "Verifying",                                                     ar: "قيد التحقق" },
  "dbb.audit.band.mismatched":         { en: "Mismatched",                                                    ar: "غير مطابق" },

  // Evidence sufficiency band labels.
  "dbb.evidence.band.insufficient":    { en: "Insufficient",                                                  ar: "غير كافية" },
  "dbb.evidence.band.partial":         { en: "Partial",                                                       ar: "جزئية" },
  "dbb.evidence.band.sufficient":      { en: "Sufficient",                                                    ar: "كافية" },
  "dbb.evidence.band.saturated":       { en: "Saturated",                                                     ar: "مكتملة" },

  // Confidence band labels (Established / Provisional / Indicative / Withheld).
  "dbb.confidence.band.indicative":    { en: "Indicative",                                                    ar: "استرشادية" },
  "dbb.confidence.band.provisional":   { en: "Provisional",                                                   ar: "أولية" },
  "dbb.confidence.band.established":   { en: "Established",                                                   ar: "ثابتة" },
  "dbb.confidence.band.withheld":      { en: "Withheld",                                                      ar: "مؤجلة" },

  // Degraded / blocked caveat copy (one paragraph per key, design §3).
  "dbb.degraded.baseline_insufficient": {
    en: "Baseline window does not yet meet the minimum observation period. Comparison withheld.",
    ar: "نافذة المقارنة المرجعية لم تستوفِ الحد الأدنى من فترة الرصد بعد. المقارنة مؤجلة.",
  },
  "dbb.degraded.pilot_window_too_short": {
    en: "Pilot phase has not accumulated enough observations for a stable reading.",
    ar: "مرحلة التجربة لم تجمع رصدًا كافيًا لقراءة مستقرة.",
  },
  "dbb.degraded.reconciliation_halted": {
    en: "Reconciliation paused pending governance review. Existing readings are frozen as-of the pause timestamp.",
    ar: "تم تعليق المطابقة بانتظار المراجعة الحوكمية. القراءات الحالية مجمّدة عند توقيت التعليق.",
  },
  "dbb.degraded.cohort_too_small": {
    en: "Similar-case cohort below the minimum size for context. Cohort context withheld.",
    ar: "حجم مجموعة الحالات المشابهة أقل من الحد الأدنى. سياق المجموعة مؤجل.",
  },
  "dbb.degraded.confidence_withheld": {
    en: "Confidence band withheld pending sufficient observations and a valid governance seal.",
    ar: "نطاق الثقة مؤجل بانتظار رصد كافٍ وختم حوكمة صالح.",
  },
  "dbb.degraded.projection_fixture": {
    en: "Synthetic projection — fixture data only. The reconciled outcome surface is not yet wired.",
    ar: "إسقاط اصطناعي — بيانات عرض توضيحي فقط. لم يتم بعد ربط واجهة المطابقة الفعلية.",
  },
  "dbb.blocked.seal_mismatch": {
    en: "Outcome basis temporarily unavailable. The most recent governance seal did not validate; this surface is suppressed until the next valid seal is published.",
    ar: "أساس النتيجة غير متاح مؤقتًا. لم يتم التحقق من ختم الحوكمة الأخير، وسيُحجب هذا العرض إلى حين إصدار ختم صالح.",
  },
  "dbb.blocked.outcome_unavailable": {
    en: "No outcome measurement is associated with this case in the current pilot phase.",
    ar: "لا توجد قياسات نتائج مرتبطة بهذه الحالة في مرحلة التجربة الحالية.",
  },
  "dbb.blocked.evidence_unavailable": {
    en: "Evidence sufficiency cannot be computed for this case at the moment.",
    ar: "لا يمكن احتساب كفاية الأدلة لهذه الحالة في الوقت الحالي.",
  },
  "dbb.blocked.audit_unavailable": {
    en: "Audit completeness cannot be verified for this case at the moment.",
    ar: "لا يمكن التحقق من اكتمال السجل التدقيقي لهذه الحالة في الوقت الحالي.",
  },

  // Provenance + posture statements.
  "dbb.advisory_only": {
    en: "Advisory signal — does not change case status.",
    ar: "إشارة استرشادية — لا تُغيّر حالة الحالة.",
  },
  "dbb.requires_municipal_review": {
    en: "Requires municipal review.",
    ar: "تستدعي المراجعة البلدية.",
  },

  // ---- Phase 2 — Riyadh Safe Scaffolding (Track 1) ----------------
  // Governance posture strings. These do not assert violation, ownership,
  // zoning, construction, or legality. Display-only.
  "phase2.preliminary_visual_review_only": {
    en: "Preliminary visual review only",
    ar: "مراجعة بصرية مبدئية فقط",
  },
  "phase2.human_review_required": {
    en: "Human review required",
    ar: "تستلزم مراجعة بشرية",
  },
  "phase2.possible_land_cover_change": {
    en: "Possible land-cover change",
    ar: "احتمال تغير في الغطاء الأرضي",
  },
  "phase2.evidence_backed_review": {
    en: "Evidence-backed review",
    ar: "مراجعة مدعومة بالأدلة",
  },
  "phase2.basemap_context_not_evidence": {
    en: "Basemap context — not evidence",
    ar: "خلفية خرائطية — ليست دليلاً",
  },
  "phase2.tier_t1_preliminary_visual": {
    en: "T1 — preliminary visual evidence",
    ar: "المستوى الأول — دليل بصري مبدئي",
  },
  "phase2.tier_t0_basemap_context": {
    en: "T0 — basemap context",
    ar: "المستوى صفر — سياق خرائطي",
  },
  "phase2.source_usgs": {
    en: "Source: USGS satellite reference",
    ar: "المصدر: مرجع الأقمار الاصطناعية USGS",
  },
  "phase2.source_maptiler": {
    en: "Source: MapTiler basemap",
    ar: "المصدر: خلفية MapTiler",
  },
  "phase2.capture_window": {
    en: "Capture window: 2020 → 2025",
    ar: "نطاق الالتقاط: 2020 → 2025",
  },
  "phase2.disclaimer_no_inference": {
    en: "No legal, ownership, zoning, construction, or municipal violation may be inferred from this view.",
    ar: "لا يجوز استنتاج أي ادعاء قانوني أو ملكية أو تخصيص أو إنشاء أو مخالفة بلدية من هذه الصورة.",
  },

  // ---- Phase 2 Track 3C — read-only Riyadh evidence surface ------
  "phase2.riyadh_review.nav": {
    en: "Riyadh — Preliminary Review",
    ar: "الرياض — مراجعة مبدئية",
  },
  "phase2.riyadh_review.title": {
    en: "Riyadh — Preliminary Visual Review",
    ar: "الرياض — مراجعة بصرية مبدئية",
  },
  "phase2.riyadh_review.lede": {
    en: "Riyadh is shown here as a planned, preliminary visual review surface. Every entry is metadata-only and awaits human review. No operational finding, municipal conclusion, or legal claim is made on this page.",
    ar: "تُعرض الرياض هنا كسطح مراجعة بصرية مبدئية، حالتها مخططة. كل مدخل بيانات وصفية فقط ينتظر مراجعة بشرية. لا تُقدَّم على هذه الصفحة أي نتيجة تشغيلية أو خلاصة بلدية أو مطالبة قانونية.",
  },
  "phase2.riyadh_review.metadata_only_sidecar": {
    en: "Metadata-only sidecar",
    ar: "بطاقة بيانات وصفية فقط",
  },
  "phase2.riyadh_review.usgs_scene_metadata": {
    en: "USGS scene metadata",
    ar: "بيانات مشهد USGS",
  },
  "phase2.riyadh_review.no_operational_finding": {
    en: "No operational finding",
    ar: "لا توجد نتيجة تشغيلية",
  },
  "phase2.riyadh_review.no_municipal_conclusion": {
    en: "No municipal or legal conclusion",
    ar: "لا توجد خلاصة بلدية أو قانونية",
  },
  "phase2.riyadh_review.col.zone": { en: "Zone", ar: "النطاق" },
  "phase2.riyadh_review.col.before": { en: "Before (2020)", ar: "قبل (٢٠٢٠)" },
  "phase2.riyadh_review.col.after": { en: "After (2025)", ar: "بعد (٢٠٢٥)" },
  "phase2.riyadh_review.col.captureDate": { en: "Capture date", ar: "تاريخ الالتقاط" },
  "phase2.riyadh_review.col.sceneId": { en: "Scene ID", ar: "معرّف المشهد" },
  "phase2.riyadh_review.col.productId": { en: "Product ID", ar: "معرّف المنتج" },
  "phase2.riyadh_review.col.wrs": { en: "WRS path / row", ar: "مسار/صف WRS" },
  "phase2.riyadh_review.col.cloudCover": { en: "Cloud cover", ar: "نسبة الغيوم" },
  "phase2.riyadh_review.col.evidenceTier": { en: "Evidence tier", ar: "مستوى الدليل" },
  "phase2.riyadh_review.col.humanReviewRequired": {
    en: "Human review required",
    ar: "تستلزم مراجعة بشرية",
  },
  "phase2.riyadh_review.posture.planned": {
    en: "Planned — not active pilot",
    ar: "مخططة — ليست تجربة نشطة",
  },
  "phase2.riyadh_review.posture.kuwait_unchanged": {
    en: "Kuwait active-pilot review surfaces are unchanged.",
    ar: "أسطح مراجعة التجربة النشطة في الكويت لم تتغير.",
  },

  // Track 3C.1 — UI polish: top summary panel + disclaimer banner labels.
  "phase2.riyadh_review.summary.title": {
    en: "Review surface posture",
    ar: "وضع سطح المراجعة",
  },
  "phase2.riyadh_review.summary.riyadh_status": {
    en: "Riyadh status",
    ar: "حالة الرياض",
  },
  "phase2.riyadh_review.summary.evidence_posture": {
    en: "Evidence posture",
    ar: "وضع الأدلة",
  },
  "phase2.riyadh_review.summary.metadata_only": {
    en: "metadata-only",
    ar: "بيانات وصفية فقط",
  },
  "phase2.riyadh_review.summary.zones_count": {
    en: "Zones",
    ar: "النطاقات",
  },
  "phase2.riyadh_review.summary.imagery": {
    en: "Imagery",
    ar: "الصور",
  },
  "phase2.riyadh_review.summary.imagery_value": {
    en: "not committed / not displayed",
    ar: "غير مُضمّنة / غير معروضة",
  },
  "phase2.riyadh_review.summary.no_operational_finding": {
    en: "No operational finding",
    ar: "لا توجد نتيجة تشغيلية",
  },
  "phase2.riyadh_review.disclaimer.title": {
    en: "Governance notice",
    ar: "تنبيه حوكمي",
  },
  "phase2.riyadh_review.section.zones_heading": {
    en: "Zones",
    ar: "النطاقات",
  },
  "phase2.riyadh_review.cloud.land_sceneL1": {
    en: "land / scene L1",
    ar: "اليابسة / المشهد L1",
  },

  // Track 3C.2 — final presentation copy polish.
  "phase2.riyadh_review.value.required": {
    en: "Required",
    ar: "مطلوبة",
  },
  "phase2.riyadh_review.tier.t1_label": {
    en: "T1 — Preliminary Visual",
    ar: "المستوى الأول — دليل بصري مبدئي",
  },
  "phase2.riyadh_review.tier.technical_reference": {
    en: "technical reference",
    ar: "مرجع فني",
  },
  // Refined summary panel title (Track 3C.2 wording).
  "phase2.riyadh_review.summary.status_title": {
    en: "Review surface status",
    ar: "وضع سطح المراجعة",
  },

  // ---- Track 4A — GCC macro navigation layer ----------------------
  "phase4a.nav": {
    en: "GCC Macro Intelligence",
    ar: "الذكاء الإقليمي الخليجي",
  },
  "phase4a.title": {
    en: "GCC Urban Municipal Intelligence",
    ar: "الذكاء الحضري والبلدي في الخليج",
  },
  "phase4a.subtitle": {
    en: "Regional context. Governed evidence. Human-reviewed decisions.",
    ar: "سياق إقليمي. أدلة محوكمة. قرارات بمراجعة بشرية.",
  },
  "phase4a.status.active_pilot": {
    en: "Active pilot",
    ar: "تجربة نشطة",
  },
  "phase4a.status.planned": {
    en: "Planned",
    ar: "مخططة",
  },
  "phase4a.status.metadata_only": {
    en: "Metadata-only",
    ar: "بيانات وصفية فقط",
  },
  "phase4a.status.future_review": {
    en: "Future review",
    ar: "مراجعة مستقبلية",
  },
  "phase4a.disclaimer.no_operational_finding": {
    en: "No operational finding",
    ar: "لا توجد نتيجة تشغيلية",
  },
  "phase4a.disclaimer.no_municipal_conclusion": {
    en: "No automated municipal conclusion",
    ar: "لا توجد خلاصة بلدية آلية",
  },
  "phase4a.section.macro": {
    en: "1 · GCC macro context",
    ar: "١ · السياق الإقليمي الخليجي",
  },
  "phase4a.section.kuwait": {
    en: "2 · Kuwait — active pilot",
    ar: "٢ · الكويت — تجربة نشطة",
  },
  "phase4a.section.saudi": {
    en: "3 · Saudi Arabia — planned review",
    ar: "٣ · المملكة العربية السعودية — مراجعة مخططة",
  },
  "phase4a.section.riyadh": {
    en: "4 · Riyadh — metadata preview",
    ar: "٤ · الرياض — معاينة بيانات وصفية",
  },
  "phase4a.macro.body": {
    en: "Six Gulf states share urban policy challenges that benefit from a structured decision-support layer. This view sits above the per-city surfaces and never produces operational findings on its own.",
    ar: "تتقاسم ست دول خليجية تحديات السياسات العمرانية التي تستفيد من طبقة دعم قرار منظمة. تقع هذه الواجهة فوق أسطح المدن ولا تنتج بحد ذاتها أي نتائج تشغيلية.",
  },
  "phase4a.kuwait.body": {
    en: "Kuwait City carries the active 60-day decision-support pilot. Every signal reaches a named municipal reviewer with its source log, capture date, and caveats. No automated municipal action.",
    ar: "تستضيف مدينة الكويت تجربة دعم القرار النشطة لمدة ستين يوماً. تصل كل إشارة إلى مراجِع بلدي معروف مع سجل المصدر وتاريخ الالتقاط والتحفظات. لا يوجد إجراء بلدي آلي.",
  },
  "phase4a.saudi.body": {
    en: "Saudi Arabia is on the planned-review track. Surfaces are scaffolded for governance review only; no active pilot is running and no operational framing is implied.",
    ar: "تسير المملكة العربية السعودية على مسار المراجعة المخططة. الأسطح مهيأة لأغراض مراجعة الحوكمة فقط؛ لا توجد تجربة نشطة ولا أي تأطير تشغيلي.",
  },
  "phase4a.riyadh.body": {
    en: "Riyadh is shown as a planned, preliminary visual review surface. Five zones carry metadata-only sidecars transcribed from authoritative USGS scene records. Human review required. No operational finding.",
    ar: "تُعرض الرياض كسطح مراجعة بصرية مبدئية، حالتها مخططة. تحمل خمسة نطاقات بطاقات بيانات وصفية فقط، منسوخة من سجلات مشاهد USGS الموثوقة. تستلزم مراجعة بشرية. لا توجد نتيجة تشغيلية.",
  },
  "phase4a.link.kuwait_dashboard": {
    en: "Open Kuwait command centre",
    ar: "فتح مركز قيادة الكويت",
  },
  "phase4a.link.kuwait_cases": {
    en: "Open Kuwait case queue",
    ar: "فتح قائمة حالات الكويت",
  },
  "phase4a.link.kuwait_map": {
    en: "Open Kuwait coverage map",
    ar: "فتح خريطة تغطية الكويت",
  },
  "phase4a.link.riyadh_preview": {
    en: "Open Riyadh preliminary review",
    ar: "فتح المراجعة المبدئية للرياض",
  },
  "phase4a.country.uae": {
    en: "United Arab Emirates",
    ar: "الإمارات العربية المتحدة",
  },
  "phase4a.country.qatar": { en: "Qatar", ar: "قطر" },
  "phase4a.country.bahrain": { en: "Bahrain", ar: "البحرين" },
  "phase4a.country.oman": { en: "Oman", ar: "عُمان" },
  "phase4a.future.note": {
    en: "Listed for completeness only. No surface, no fixtures, no review.",
    ar: "مدرجة للاكتمال فقط. لا توجد واجهة ولا بيانات ولا مراجعة.",
  },
  "phase4a.footer.governance": {
    en: "All cross-country claims on this page are descriptive, not operational. Per-pilot governance applies on each linked surface.",
    ar: "جميع الادعاءات العابرة للدول على هذه الصفحة وصفية، ليست تشغيلية. تنطبق حوكمة كل تجربة على واجهتها المرتبطة.",
  },

  // ---- Track 4A.1 — visual polish ---------------------------------
  "phase4a.metric.gulf_states": { en: "Gulf states", ar: "دول خليجية" },
  "phase4a.metric.active_pilots": {
    en: "Active pilot",
    ar: "تجربة نشطة",
  },
  "phase4a.metric.planned_city_reviews": {
    en: "Planned city review",
    ar: "مراجعة مدينة مخططة",
  },
  "phase4a.metric.automated_conclusions": {
    en: "Automated municipal conclusions",
    ar: "خلاصات بلدية آلية",
  },
  "phase4a.flow.title": {
    en: "Regional flow",
    ar: "المسار الإقليمي",
  },
  "phase4a.flow.macro": { en: "GCC context", ar: "السياق الخليجي" },
  "phase4a.flow.kuwait": { en: "Kuwait pilot", ar: "تجربة الكويت" },
  "phase4a.flow.saudi": { en: "Saudi planned", ar: "السعودية مخططة" },
  "phase4a.flow.riyadh": {
    en: "Riyadh metadata",
    ar: "بيانات الرياض",
  },
  "phase4a.kuwait.proof_point": {
    en: "Primary proof point",
    ar: "نقطة الإثبات الرئيسية",
  },
  "phase4a.saudi.expansion": {
    en: "Planned expansion",
    ar: "توسع مخطط",
  },
  "phase4a.riyadh.preview": {
    en: "Metadata-only preview",
    ar: "معاينة بيانات وصفية فقط",
  },
  "phase4a.future.heading": {
    en: "Future review countries",
    ar: "دول للمراجعة المستقبلية",
  },

  // ---- V2 — UDI-OS Decision Surface (Phase 32 implementation) ------
  // Additive namespace per docs/architecture/udi_os_v2_build_authorization.md §7.
  // AR strings drafted in Gulf institutional voice; subject to editor-of-record
  // sign-off per build authorization §7.1 before implementation merge.
  // No editor-pending placeholders ship — every key carries authored EN + AR.

  // ---- v2 · command bar / brand ---
  "v2.command_bar.brand_line1": {
    en: "GCC Urban Municipal Intelligence",
    ar: "الذكاء الحضري والبلدي في الخليج",
  },
  "v2.command_bar.brand_line2": {
    en: "Decision OS V2",
    ar: "نظام القرار الإصدار الثاني",
  },
  "v2.command_bar.theatre_link": { en: "Operating Surface", ar: "السطح التشغيلي" },
  "v2.command_bar.reference_link": { en: "Reference", ar: "المرجع" },

  // ---- v2 · acts (zone headings) ---
  "v2.acts.i.eyebrow": {
    en: "Enterprise decision-system preview · Advisory only",
    ar: "عرض نظام قرار مؤسسي · استشاري فقط",
  },
  "v2.acts.i.heading": { en: "Macro Pressure", ar: "الضغط الإقليمي" },
  "v2.acts.i.caption": {
    en: "All data is synthetic · No automated municipal action",
    ar: "كل البيانات افتراضية · لا يوجد إجراء بلدي آلي",
  },
  "v2.acts.ii.heading": { en: "Coverage Readiness", ar: "جاهزية التغطية" },
  "v2.acts.iii.heading": { en: "Satellite Signal", ar: "إشارة القمر الاصطناعي" },
  "v2.acts.iv.heading": { en: "Evidence Intelligence", ar: "ذكاء الأدلة" },
  "v2.acts.v.heading": { en: "Case Intelligence", ar: "ذكاء الحالات" },
  "v2.acts.vi.heading": { en: "Human Review", ar: "المراجعة البشرية" },
  "v2.acts.vii.heading": { en: "Audit Integrity", ar: "سلامة التدقيق" },
  "v2.acts.viii.heading": { en: "Outcome Intelligence", ar: "ذكاء النتائج" },
  "v2.acts.ix.heading": { en: "Pilot Decision Ask", ar: "طلب قرار التجربة" },

  // ---- v2 · states (six Gulf states) ---
  "v2.states.kuwait.eyebrow": { en: "Active pilot", ar: "تجربة قيد التشغيل" },
  "v2.states.kuwait.title": { en: "Kuwait", ar: "الكويت" },
  "v2.states.saudi.eyebrow": { en: "Metadata-only review path", ar: "مسار مراجعة ببيانات وصفية فقط" },
  "v2.states.saudi.title": { en: "Saudi Arabia", ar: "المملكة العربية السعودية" },
  "v2.states.uae.eyebrow": { en: "Planned evidence pack", ar: "حزمة أدلة مقررة" },
  "v2.states.uae.title": { en: "United Arab Emirates", ar: "الإمارات العربية المتحدة" },
  "v2.states.qatar.eyebrow": { en: "Planned evidence pack", ar: "حزمة أدلة مقررة" },
  "v2.states.qatar.title": { en: "Qatar", ar: "قطر" },
  "v2.states.bahrain.eyebrow": { en: "Planned evidence pack", ar: "حزمة أدلة مقررة" },
  "v2.states.bahrain.title": { en: "Bahrain", ar: "البحرين" },
  "v2.states.oman.eyebrow": { en: "Planned evidence pack", ar: "حزمة أدلة مقررة" },
  "v2.states.oman.title": { en: "Oman", ar: "عُمان" },

  // ---- v2 · districts ---
  "v2.districts.south_surra.name": { en: "South Surra", ar: "جنوب السرة" },
  "v2.districts.south_surra.context": {
    en: "Kuwait City anchor district. Active pilot review surface.",
    ar: "حي مرجعي في مدينة الكويت. سطح مراجعة التجربة النشطة.",
  },
  "v2.districts.riyadh_core.name": { en: "Riyadh — Core", ar: "الرياض — النواة" },
  "v2.districts.riyadh_core.context": {
    en: "Riyadh planning review zone. Metadata-only; not promoted to anchor.",
    ar: "منطقة مراجعة تخطيطية في الرياض. بيانات وصفية فقط؛ لم تُرفع إلى مرجع.",
  },
  "v2.districts.dubai_001.name": { en: "Dubai — Zone 001", ar: "دبي — نطاق ٠٠١" },
  "v2.districts.dubai_001.context": {
    en: "Planned evidence-pack surface; review remains in scope-prep.",
    ar: "سطح حزمة أدلة مقرر؛ المراجعة في طور التحضير.",
  },

  // ---- v2 · formulas (math core) ---
  "v2.formulas.spatial_pressure.name": { en: "Spatial Pressure", ar: "الضغط المكاني" },
  "v2.formulas.spatial_pressure.rationale": {
    en: "Concentration of inspection-backing aggregated review pressure inside the active district.",
    ar: "تركيز الضغط المراجِع المدعوم بالتفتيش داخل الحي النشط.",
  },
  "v2.formulas.spatial_pressure.output_band": { en: "Advisory band only", ar: "نطاق استشاري فقط" },
  "v2.formulas.evidence_score.name": { en: "Evidence Score", ar: "تقييم الأدلة" },
  "v2.formulas.evidence_score.rationale": {
    en: "Weighted source coverage with confidence band and human-review status.",
    ar: "تغطية مصادر مرجَّحة مع نطاق الثقة وحالة المراجعة البشرية.",
  },
  "v2.formulas.evidence_score.output_band": { en: "Advisory band only", ar: "نطاق استشاري فقط" },
  "v2.formulas.freshness_decay.name": { en: "Freshness Decay", ar: "تناقص الحداثة" },
  "v2.formulas.freshness_decay.rationale": {
    en: "How recently each evidence item was captured, decayed by time-since-capture.",
    ar: "حداثة التقاط كل عنصر دليل، متناقصة بمرور الوقت منذ الالتقاط.",
  },
  "v2.formulas.freshness_decay.output_band": { en: "Advisory band only", ar: "نطاق استشاري فقط" },
  "v2.formulas.case_priority.name": { en: "Case Priority", ar: "أولوية الحالة" },
  "v2.formulas.case_priority.rationale": {
    en: "Priority indicator combining evidence score, spatial pressure, and reviewer routing.",
    ar: "مؤشر أولوية يجمع تقييم الأدلة والضغط المكاني وتوجيه المراجعين.",
  },
  "v2.formulas.case_priority.output_band": { en: "Advisory band only", ar: "نطاق استشاري فقط" },
  "v2.formulas.audit_completeness.name": { en: "Audit Completeness", ar: "اكتمال التدقيق" },
  "v2.formulas.audit_completeness.rationale": {
    en: "Share of decided cases carrying at least one digest-verified audit entry.",
    ar: "نسبة الحالات المُبَتَّ فيها التي تحمل سجل تدقيق واحدًا على الأقل موثَّق التجزئة.",
  },
  "v2.formulas.audit_completeness.output_band": { en: "Advisory band only", ar: "نطاق استشاري فقط" },

  // ---- v2 · signals ---
  "v2.signals.sig_kw_007.title": { en: "Permit packet · missing capture dates · South Surra", ar: "حزمة تصريح · غياب تواريخ الالتقاط · جنوب السرة" },
  "v2.signals.sig_kw_005.title": { en: "Address normalization candidates · Salmiya", ar: "مرشحون لتوحيد العناوين · السالمية" },
  "v2.signals.sig_kw_010.title": { en: "Aged inspection request · Hawalli", ar: "طلب تفتيش متأخر · حولي" },
  "v2.signals.sig_ry_001.title": { en: "Riyadh coverage outline · metadata only", ar: "موجز تغطية الرياض · بيانات وصفية فقط" },
  "v2.signals.sig_du_001.title": { en: "Dubai coverage outline · planned pack", ar: "موجز تغطية دبي · حزمة مقررة" },

  // ---- v2 · evidence source names ---
  "v2.evidence.source_name.ev_001": { en: "Parcel registry export · District 7", ar: "تصدير سجل القطع · حي ٧" },
  "v2.evidence.source_name.ev_002": { en: "Licence packet KW-LIC-2026-0317", ar: "حزمة ترخيص KW-LIC-2026-0317" },
  "v2.evidence.source_name.ev_003": { en: "Backlog snapshot · Hawalli", ar: "لقطة قائمة التفتيش · حولي" },
  "v2.evidence.source_name.ev_004": { en: "Address normalization candidates · Salmiya", ar: "مرشحون لتوحيد العناوين · السالمية" },
  "v2.evidence.source_name.ev_006": { en: "Reviewer attachment · KW-DEMO packet", ar: "مرفق المراجع · حزمة KW-DEMO" },
  "v2.evidence.source_name.ev_008": { en: "Licence packet KW-LIC-2026-0419", ar: "حزمة ترخيص KW-LIC-2026-0419" },
  "v2.evidence.source_name.ev_011": { en: "Riyadh coverage outline reference", ar: "مرجع موجز تغطية الرياض" },

  // ---- v2 · cases ---
  "v2.cases.kw_007.title": { en: "Permit packet · missing capture dates · South Surra", ar: "حزمة تصريح · غياب تواريخ الالتقاط · جنوب السرة" },
  "v2.cases.kw_007.event.opened": { en: "Case opened", ar: "فُتحت الحالة" },
  "v2.cases.kw_007.event.evidence_attached": { en: "Evidence pack attached", ar: "أُرفقت حزمة الأدلة" },
  "v2.cases.kw_007.event.review_started": { en: "Reviewer started visual context check", ar: "بدأ المراجع فحص السياق البصري" },
  "v2.cases.kw_005.title": { en: "Address normalization · Salmiya", ar: "توحيد العناوين · السالمية" },
  "v2.cases.kw_005.event.opened": { en: "Case opened", ar: "فُتحت الحالة" },
  "v2.cases.kw_010.title": { en: "Aged inspection request · Hawalli", ar: "طلب تفتيش متأخر · حولي" },
  "v2.cases.kw_010.event.opened": { en: "Case opened", ar: "فُتحت الحالة" },
  "v2.cases.ry_001.title": { en: "Riyadh coverage scoping", ar: "تحديد نطاق تغطية الرياض" },
  "v2.cases.ry_001.event.opened": { en: "Case opened", ar: "فُتحت الحالة" },
  "v2.cases.du_001.title": { en: "Dubai coverage scoping", ar: "تحديد نطاق تغطية دبي" },
  "v2.cases.du_001.event.opened": { en: "Case opened", ar: "فُتحت الحالة" },

  // ---- v2 · priority bands ---
  "v2.priority.high.description": {
    en: "High priority — warrants accelerated reviewer attention. No automated action.",
    ar: "أولوية عالية — تستدعي اهتمامًا متسارعًا من المراجع. لا يوجد إجراء آلي.",
  },
  "v2.priority.medium.description": {
    en: "Medium priority — standard review window applies.",
    ar: "أولوية متوسطة — تنطبق نافذة المراجعة المعتادة.",
  },
  "v2.priority.low.description": {
    en: "Low priority — review when convenient within window.",
    ar: "أولوية منخفضة — تُراجَع وقت الإمكان داخل النافذة.",
  },

  // ---- v2 · reviewer roles ---
  "v2.reviewers.inspections_lead.name": { en: "Reviewer A · Inspections Lead", ar: "المراجع أ · رئيس التفتيش" },
  "v2.reviewers.inspections_lead.workflow": { en: "Inspection backlog triage", ar: "فرز قائمة التفتيش" },
  "v2.reviewers.permit_officer.name": { en: "Reviewer B · Permit Officer", ar: "المراجع ب · مسؤول التصاريح" },
  "v2.reviewers.permit_officer.workflow": { en: "Permit evidence review", ar: "مراجعة أدلة التصاريح" },
  "v2.reviewers.data_steward.name": { en: "Reviewer C · Data Steward", ar: "المراجع ج · أمين البيانات" },
  // 32.5.1-R-C #8 — display rename, no underlying data change
  "v2.reviewers.data_steward.workflow": { en: "Urban record alignment", ar: "مواءمة السجل الحضري" },
  "v2.reviewers.finance_and_risk_lead.name": { en: "Reviewer D · Finance & Risk Lead", ar: "المراجع د · رئيس التمويل والمخاطر" },
  "v2.reviewers.finance_and_risk_lead.workflow": { en: "Municipal exposure bands", ar: "نطاقات الانكشاف البلدي" },

  // ---- v2 · review verbs (Human Review Gate) ---
  "v2.review_verbs.acknowledge": { en: "Acknowledge", ar: "الإقرار" },
  "v2.review_verbs.request_evidence": { en: "Request evidence", ar: "طلب أدلة" },
  "v2.review_verbs.defer": { en: "Defer", ar: "تأجيل" },
  "v2.review_verbs.escalate": { en: "Escalate", ar: "تصعيد" },

  // ---- v2 · operational value indicators (Outcome Intelligence) ---
  "v2.indicators.review_clarity.label": { en: "Review clarity", ar: "وضوح المراجعة" },
  "v2.indicators.review_clarity.description": {
    en: "Share of cases ready for human review with linked evidence and defended classification.",
    ar: "نسبة الحالات الجاهزة للمراجعة البشرية بأدلة مرتبطة وتصنيف مُسوَّغ.",
  },
  "v2.indicators.evidence_readiness.label": { en: "Evidence readiness", ar: "جاهزية الأدلة" },
  "v2.indicators.evidence_readiness.description": {
    en: "Share of decided cases linked to at least one source-logged evidence pack.",
    ar: "نسبة الحالات المُبَتَّ فيها المرتبطة بحزمة أدلة واحدة على الأقل ذات سجل مصدر.",
  },
  "v2.indicators.audit_coverage.label": { en: "Audit coverage", ar: "تغطية التدقيق" },
  "v2.indicators.audit_coverage.description": {
    en: "Share of decided cases carrying at least one digest-verified audit entry.",
    ar: "نسبة الحالات المُبَتَّ فيها التي تحمل سجل تدقيق واحدًا على الأقل موثَّق التجزئة.",
  },
  "v2.indicators.queue_balance.label": { en: "Queue balance", ar: "توازن قائمة الحالات" },
  "v2.indicators.queue_balance.description": {
    en: "Aggregated load on reviewer queues across the seven workflows.",
    ar: "الحمل المجمَّع على قوائم المراجعين عبر التدفقات السبعة.",
  },
  "v2.indicators.routing_quality.label": { en: "Routing quality", ar: "جودة التوجيه" },
  "v2.indicators.routing_quality.description": {
    en: "Aggregate signal-to-reviewer match across the named role set.",
    ar: "مدى مطابقة الإشارات للمراجعين المسمَّيْن عبر مجموعة الأدوار.",
  },
  "v2.indicators.management_visibility.label": { en: "Management visibility", ar: "وضوح الإدارة" },
  "v2.indicators.management_visibility.description": {
    en: "Share of cases held in human review for less than the source-logged review window.",
    ar: "نسبة الحالات قيد المراجعة البشرية لأقل من نافذة المراجعة المسجَّلة.",
  },
  "v2.indicators.decision_readiness.label": { en: "Decision readiness", ar: "جاهزية القرار" },
  "v2.indicators.decision_readiness.description": {
    en: "Share of cases ready for the named human reviewer to log a decision.",
    ar: "نسبة الحالات الجاهزة لتسجيل قرار من المراجع البشري المسمَّى.",
  },

  // ---- v2 · indicator bands (shared label set) ---
  "v2.indicator_band.moderate": { en: "Moderate", ar: "متوسط" },
  "v2.indicator_band.ready": { en: "Ready", ar: "جاهز" },
  "v2.indicator_band.needs_evidence": { en: "Needs evidence", ar: "بحاجة إلى أدلة" },
  "v2.indicator_band.not_yet": { en: "Not yet", ar: "ليس بعد" },

  // ---- v2 · coverage tiers and gates ---
  "v2.coverage.tier.kuwait_south_surra.label": { en: "Kuwait / South Surra", ar: "الكويت / جنوب السرة" },
  "v2.coverage.tier.kuwait_south_surra.surface": { en: "Anchor review surface", ar: "سطح مراجعة مرجعي" },
  "v2.coverage.tier.kuwait_south_surra.posture": { en: "Current reference demo", ar: "العرض المرجعي الحالي" },
  "v2.coverage.tier.saudi_riyadh.label": { en: "Saudi Arabia / Riyadh", ar: "السعودية / الرياض" },
  "v2.coverage.tier.saudi_riyadh.surface": { en: "Metadata review path", ar: "مسار مراجعة بيانات وصفية" },
  "v2.coverage.tier.saudi_riyadh.posture": { en: "Evidence-gated expansion", ar: "توسعة مشروطة بالأدلة" },
  "v2.coverage.tier.uae_dubai.label": { en: "UAE / Dubai", ar: "الإمارات / دبي" },
  "v2.coverage.tier.uae_dubai.surface": { en: "Planned evidence-pack surface", ar: "سطح حزمة أدلة مقرر" },
  "v2.coverage.tier.uae_dubai.posture": { en: "Future coverage candidate", ar: "مرشَّح للتغطية المستقبلية" },
  "v2.coverage.gate.anchor_review": { en: "Anchor review surface", ar: "سطح المراجعة المرجعي" },
  "v2.coverage.gate.evidence_attached": { en: "Evidence pack attached", ar: "حزمة الأدلة مُرفقة" },
  "v2.coverage.gate.scene_metadata": { en: "Scene metadata published", ar: "بيانات المشهد منشورة" },
  "v2.coverage.gate.named_human_review": { en: "Named human reviewer assigned", ar: "تعيين مراجع بشري مسمَّى" },
  "v2.coverage.gate.aoi_caveats": { en: "AOI caveats published", ar: "تحفظات منطقة الاهتمام منشورة" },
  "v2.coverage.gate.display_classification": { en: "Display classification declared", ar: "إعلان تصنيف العرض" },
  "v2.coverage.gate.evidence_pack_pending": { en: "Evidence pack still pending", ar: "حزمة الأدلة لا تزال معلَّقة" },
  "v2.coverage.promotion.explainer": {
    en: "Promotion from metadata-only to anchor requires four named gates plus an explicit human review decision.",
    ar: "الانتقال من بيانات وصفية فقط إلى مرجع يستلزم أربع بوابات مسمَّاة، إضافة إلى قرار مراجعة بشرية صريح.",
  },
  "v2.coverage.promotion.human_reviewer": {
    en: "Promotion decision is made by a named municipal reviewer; no automated promotion.",
    ar: "قرار الترقية يتخذه مراجع بلدي مسمَّى؛ ولا توجد ترقية آلية.",
  },

  // ---- v2 · satellite caveats ---
  "v2.satellite.tier.t1_preliminary_visual": {
    en: "T1 — Preliminary visual evidence tier",
    ar: "المستوى الأول — أدلة بصرية تمهيدية",
  },
  "v2.satellite.caveat": {
    en: "Imagery is illustrative · captured-date-anchored · presented as observed pattern only.",
    ar: "الصور للتوضيح · مرتبطة بتاريخ الالتقاط · تُعرض بوصفها نمطًا مرصودًا فقط.",
  },

  // ---- v2 · pilot decision ask ---
  "v2.pilot_ask.heading": {
    en: "Promote Riyadh from metadata-only to anchor?",
    ar: "هل تُرفع الرياض من بيانات وصفية فقط إلى مرجع؟",
  },
  "v2.pilot_ask.primary_action": { en: "Open Riyadh review", ar: "فتح مراجعة الرياض" },
  "v2.pilot_ask.secondary_action": { en: "Open coverage map", ar: "فتح خريطة التغطية" },
  "v2.pilot_ask.caption": {
    en: "This is a recorded interaction intent · No automated promotion occurs · A named municipal reviewer must sign off.",
    ar: "هذه نية تفاعل مسجَّلة · لا تتم ترقية آلية · يجب أن يعتمدها مراجع بلدي مسمَّى.",
  },
  "v2.gates.scene_metadata.description": {
    en: "Scene metadata is published, dated, and signed.",
    ar: "بيانات المشهد منشورة ومؤرَّخة وموقَّعة.",
  },
  "v2.gates.named_human_review.description": {
    en: "A named human reviewer is assigned to the surface.",
    ar: "تعيين مراجع بشري مسمَّى لسطح المراجعة.",
  },
  "v2.gates.aoi_caveats.description": {
    en: "Area-of-interest caveats are written and published.",
    ar: "تحفظات منطقة الاهتمام مكتوبة ومنشورة.",
  },
  "v2.gates.display_classification.description": {
    en: "Display classification (anchor / metadata / planned) is explicit.",
    ar: "تصنيف العرض (مرجع / بيانات وصفية / مقرر) صريح.",
  },
  "v2.gates.promotion_decision.description": {
    en: "Final promotion decision is recorded by the named reviewer.",
    ar: "قرار الترقية النهائي يُسجَّل من قِبل المراجع المسمَّى.",
  },

  // ---- v2 · governance notices (cross-zone) ---
  "v2.governance.advisory_only.title": { en: "Advisory only", ar: "استشاري فقط" },
  "v2.governance.advisory_only.body": {
    en: "Every output is advisory. No municipal action is executed by the system.",
    ar: "كل المخرجات استشارية. لا ينفذ النظام أي إجراء بلدي.",
  },
  "v2.governance.human_review.title": { en: "Human review required", ar: "المراجعة البشرية مطلوبة" },
  "v2.governance.human_review.body": {
    en: "Every signal reaches a named municipal reviewer before any onward use.",
    ar: "كل إشارة تصل إلى مراجع بلدي مسمَّى قبل أي استخدام لاحق.",
  },
  "v2.governance.no_executory.title": { en: "No executory authority", ar: "لا توجد صلاحية تنفيذية" },
  "v2.governance.no_executory.body": {
    en: "The system records reviewer decisions only · It does not act on the municipality's behalf.",
    ar: "يسجل النظام قرارات المراجع فقط · ولا يتصرف بالنيابة عن البلدية.",
  },
  "v2.governance.synthetic_data.title": { en: "Synthetic demonstration data", ar: "بيانات عرض افتراضية" },
  "v2.governance.synthetic_data.body": {
    en: "All data shown is synthetic · indicators are suspected until human validation · no automated decision.",
    ar: "جميع البيانات المعروضة افتراضية · المؤشرات مشتبه بها إلى حين التحقق البشري · لا يوجد قرار آلي.",
  },

  // ---- v2 · reveal phase labels (testid + a11y) ---
  "v2.reveal.phase_a": { en: "Pass A", ar: "المرور أ" },
  "v2.reveal.phase_b": { en: "Pass B", ar: "المرور ب" },
  "v2.reveal.phase_c": { en: "Pass C", ar: "المرور ج" },

  // ---- v2 · LangParityGate fallback label ---
  "v2.lang_parity.fallback_label": {
    en: "AR pending editor sign-off",
    ar: "نسخة عربية قيد اعتماد المحرِّر",
  },

  // ---- v2 · theatre / reference caveat ribbons ---
  "v2.ribbon.theatre": {
    en: "Theatre — synthetic walkthrough fixture · Not a live municipal record.",
    ar: "العرض — حزمة افتراضية للتجوّل · ليست سجلاً بلديًا مباشرًا.",
  },
  "v2.ribbon.reference": {
    en: "Reference — printable, motion-free preview · All numbers are illustrative.",
    ar: "المرجع — معاينة قابلة للطباعة دون حركة · جميع الأرقام للتوضيح.",
  },

  // ---- v2 · Phase 32.4 Group 1.1 — Ontology + governance envelope -----
  // Tier labels (T1–T6)
  "v2.tier.t1.label": { en: "Primary Active Surface", ar: "السطح النشط الرئيسي" },
  "v2.tier.t2.label": { en: "Secondary Active Surface", ar: "السطح النشط الثانوي" },
  "v2.tier.t3_t6.label": { en: "Planned / Deferred", ar: "مقرَّر / مؤجَّل" },

  // Region
  "v2.region.gcc.name": { en: "Gulf Cooperation Council", ar: "مجلس التعاون الخليجي" },

  // City theatres
  "v2.city_theatre.riyadh.name": { en: "Riyadh", ar: "الرياض" },
  "v2.city_theatre.kuwait_city.name": { en: "Kuwait City", ar: "مدينة الكويت" },

  // Corridors
  "v2.corridors.riy_core_transit_001.name": { en: "Riyadh-Core north–south transit reference", ar: "مرجع نقل شمال–جنوب — نواة الرياض" },
  "v2.corridors.kw_ss_drainage_001.name": { en: "South Surra drainage-line reference", ar: "مرجع خط الصرف — جنوب السرة" },

  // Zones
  "v2.zones.riy_core_001.name": { en: "Riyadh-Core stylized zone 001", ar: "نطاق نواة الرياض المُبسَّط ٠٠١" },
  "v2.zones.riy_core_001.aoi_caveat": { en: "Stylized canvas tile · not an official municipal boundary", ar: "بلاطة لوحية مُبسَّطة · ليست حدًّا بلديًّا رسميًّا" },
  "v2.zones.kw_ss_001.name": { en: "South Surra stylized zone 001", ar: "نطاق جنوب السرة المُبسَّط ٠٠١" },
  "v2.zones.kw_ss_001.aoi_caveat": { en: "Stylized canvas tile · not an official municipal boundary", ar: "بلاطة لوحية مُبسَّطة · ليست حدًّا بلديًّا رسميًّا" },

  // Urban assets
  "v2.urban_assets.riy_comm_001.name": { en: "Riyadh-Core sample commercial building", ar: "مبنى تجاري نموذجي — نواة الرياض" },
  "v2.urban_assets.kw_sch_001.name": { en: "South Surra sample school", ar: "مدرسة نموذجية — جنوب السرة" },

  // Infrastructure nodes
  "v2.infrastructure_nodes.riy_int_001.name": { en: "Riyadh-Core sample intersection signal", ar: "إشارة تقاطع نموذجية — نواة الرياض" },
  "v2.infrastructure_nodes.kw_drain_001.name": { en: "South Surra sample drainage outflow", ar: "مصرف صرف نموذجي — جنوب السرة" },

  // Risk regions
  "v2.risk_regions.riy_rr_congestion_001.name": { en: "Riyadh-Core congestion-pressure advisory zone", ar: "منطقة استشارية لضغط الازدحام — نواة الرياض" },
  "v2.risk_regions.riy_rr_congestion_001.description": {
    en: "Advisory framing of inspection-backing concentration along the central transit corridor. Synthetic; advisory only; human review required.",
    ar: "إطار استشاري لتركيز الضغط المراجِع المدعوم بالتفتيش على ممر النقل المركزي. افتراضي · استشاري فقط · المراجعة البشرية مطلوبة.",
  },
  "v2.risk_regions.kw_rr_drainage_001.name": { en: "South Surra drainage-sensitivity advisory zone", ar: "منطقة استشارية لحساسية الصرف — جنوب السرة" },
  "v2.risk_regions.kw_rr_drainage_001.description": {
    en: "Advisory framing of low-lying-area visible-band change. Synthetic; advisory only; human review required.",
    ar: "إطار استشاري لتغيُّر النطاق المرئي في المناطق المنخفضة. افتراضي · استشاري فقط · المراجعة البشرية مطلوبة.",
  },

  // Economic clusters
  "v2.economic_clusters.riy_ec_comm_001.name": { en: "Riyadh-Core commercial-cluster reference", ar: "مرجع التجمُّع التجاري — نواة الرياض" },
  "v2.economic_clusters.riy_ec_comm_001.description": {
    en: "Advisory band-only framing of commercial-activity concentration. No currency, no return-on-investment framing, no money-saving claims.",
    ar: "إطار استشاري بنطاقات فقط لتركُّز النشاط التجاري. لا توجد عملة · لا إطار لعائد الاستثمار · لا ادعاءات بتوفير المال.",
  },
  "v2.economic_clusters.kw_ec_mixed_001.name": { en: "South Surra mixed-use-cluster reference", ar: "مرجع التجمُّع متعدِّد الاستخدامات — جنوب السرة" },
  "v2.economic_clusters.kw_ec_mixed_001.description": {
    en: "Advisory band-only framing of mixed-use activity concentration. No currency, no return-on-investment framing.",
    ar: "إطار استشاري بنطاقات فقط لتركُّز النشاط متعدِّد الاستخدامات. لا توجد عملة · لا إطار لعائد الاستثمار.",
  },

  // Urban-object aggregate statements
  "v2.urban_object.riyadh_core.statement": {
    en: "Riyadh-Core inventory: stylized zone, sample commercial asset, sample intersection node, congestion-pressure risk region, commercial cluster reference.",
    ar: "جرد نواة الرياض: نطاق مُبسَّط · أصل تجاري نموذجي · عقدة تقاطع نموذجية · منطقة مخاطر ضغط الازدحام · مرجع التجمُّع التجاري.",
  },
  "v2.urban_object.south_surra.statement": {
    en: "South Surra inventory: stylized zone, sample school asset, sample drainage outflow node, drainage-sensitivity risk region, mixed-use cluster reference.",
    ar: "جرد جنوب السرة: نطاق مُبسَّط · أصل مدرسي نموذجي · عقدة مصرف نموذجية · منطقة مخاطر حساسية الصرف · مرجع التجمُّع متعدِّد الاستخدامات.",
  },

  // Scenarios (only the two used in fixture; remaining six remain authored when needed)
  "v2.scenario.urban_expansion.name": { en: "Urban expansion", ar: "التوسُّع الحضري" },
  "v2.scenario.urban_expansion.description": {
    en: "Advisory pathway from a Riyadh-Core captured-date-anchored signal through the central transit corridor to a low-priority municipal-readiness case.",
    ar: "مسار استشاري من إشارة في نواة الرياض مرتبطة بتاريخ الالتقاط، عبر ممر النقل المركزي، إلى حالة جاهزية بلدية بأولوية منخفضة.",
  },
  "v2.scenario.drainage_sensitivity.name": { en: "Drainage sensitivity", ar: "حساسية الصرف" },
  "v2.scenario.drainage_sensitivity.description": {
    en: "Advisory pathway from a South Surra signal through the drainage corridor and outflow node to a high-priority case under inspections-lead review.",
    ar: "مسار استشاري من إشارة في جنوب السرة، عبر ممر الصرف وعقدة المصرف، إلى حالة عالية الأولوية تحت مراجعة رئيس التفتيش.",
  },

  // Readiness state labels
  "v2.readiness.new.label": { en: "New", ar: "جديدة" },
  "v2.readiness.under_review.label": { en: "Under review", ar: "قيد المراجعة" },
  "v2.readiness.approved_for_follow_up.label": { en: "Approved for follow-up", ar: "مُعتمد للمتابعة" },
  "v2.readiness.escalated.label": { en: "Escalated", ar: "مصعَّدة" },
  "v2.readiness.rejected.label": { en: "Rejected", ar: "مرفوضة" },

  // License boundary
  "v2.license_boundary.synthetic": { en: "Synthetic", ar: "افتراضي" },
  "v2.license_boundary.open_data_equivalent": { en: "Open-data-equivalent", ar: "ما يعادل البيانات المفتوحة" },
  "v2.license_boundary.licensed_imagery": { en: "Licensed imagery", ar: "صور مرخَّصة" },

  // Privacy boundary
  "v2.privacy_boundary.place_only": { en: "Place-only", ar: "مكان فقط" },
  "v2.privacy_boundary.no_personal_identifier": { en: "No personal identifier", ar: "بلا معرِّف شخصي" },

  // Limitations (reusable across all envelope-bearing entities)
  "v2.limitation.synthetic_demonstration": { en: "Synthetic demonstration data", ar: "بيانات عرض افتراضية" },
  "v2.limitation.captured_date_anchored": { en: "Captured-date-anchored", ar: "مرتبط بتاريخ الالتقاط" },
  "v2.limitation.advisory_only": { en: "Advisory only", ar: "استشاري فقط" },
  "v2.limitation.human_review_required": { en: "Human review required", ar: "المراجعة البشرية مطلوبة" },
  "v2.limitation.not_official_boundary": { en: "Not an official municipal boundary", ar: "ليس حدًّا بلديًّا رسميًّا" },
  "v2.limitation.scenario_not_prediction": { en: "Scenario propagation is not prediction", ar: "انتشار السيناريو ليس تنبُّؤًا" },

  // ---- v2 · Phase 32.4 Group 1.2 — Intelligence contract evaluators -----
  // Contract explanations (one short sentence each; reviewer-readable).
  "v2.contract.confidence.explanation": {
    en: "Confidence band derived from source type, capture date, and corroborating evidence count. Bands only; advisory.",
    ar: "نطاق الثقة مُشتقّ من نوع المصدر وتاريخ الالتقاط وعدد الأدلة المُساندة. نطاقات فقط؛ استشاري.",
  },
  "v2.contract.evidence_sufficiency.explanation": {
    en: "Evidence sufficiency band derived from linked-evidence count, confidence levels, and digest-verified evidence log presence.",
    ar: "نطاق كفاية الأدلة مُشتقّ من عدد الأدلة المرتبطة ومستويات الثقة ووجود سجل أدلة موثَّق التجزئة.",
  },
  "v2.contract.readiness.explanation": {
    en: "Decision-readiness band composed from evidence sufficiency and governance risk. Reviewer decides advance.",
    ar: "نطاق جاهزية القرار مُركَّب من كفاية الأدلة ومخاطر الحوكمة. يحدِّد المراجع التقدُّم.",
  },
  "v2.contract.scenario_propagation.explanation": {
    en: "Pathway-band reflects how many ontology entities the scenario touches. Advisory pathway only; not prediction.",
    ar: "نطاق المسار يعكس عدد كيانات الأنطولوجيا التي يلامسها السيناريو. مسار استشاري فقط؛ ليس تنبُّؤًا.",
  },
  "v2.contract.governance_risk.explanation": {
    en: "Governance-risk band derived from explicit license boundary, privacy boundary, limitations, and confidence floor.",
    ar: "نطاق مخاطر الحوكمة مُشتقّ من حدود الترخيص الصريحة وحدود الخصوصية والقيود وحدِّ الثقة الأدنى.",
  },
  "v2.contract.recommendation_frame.explanation": {
    en: "Frame lists allowed advisory verbs and explicitly forbidden decisions. Reviewer decides; system records only.",
    ar: "يُدرج الإطار الأفعال الاستشارية المسموح بها والقرارات الممنوعة صراحةً. المراجع يقرِّر؛ يكتفي النظام بالتسجيل.",
  },
  "v2.contract.classification.explanation": {
    en: "Deterministic mapping from signal context to one of eight scenario types. Fallback: municipal-readiness.",
    ar: "تعيين حتميّ من سياق الإشارة إلى أحد ثمانية أنواع للسيناريو. الافتراضي: جاهزية بلدية.",
  },
  "v2.contract.anomaly_signal.explanation": {
    en: "Anomaly band reflects low confidence, missing evidence, or elevated risk. Observational only; never adjudicative.",
    ar: "نطاق الشذوذ يعكس انخفاض الثقة أو نقص الأدلة أو ارتفاع المخاطر. للملاحظة فقط؛ ليس حُكمًا.",
  },

  // Recommendation-frame recommended action labels
  "v2.contract.recommendation_frame.recommended.acknowledge": {
    en: "Recommended action: acknowledge",
    ar: "الإجراء المُوصى به: الإقرار",
  },
  "v2.contract.recommendation_frame.recommended.request_evidence": {
    en: "Recommended action: request evidence",
    ar: "الإجراء المُوصى به: طلب أدلة",
  },
  "v2.contract.recommendation_frame.recommended.defer": {
    en: "Recommended action: defer",
    ar: "الإجراء المُوصى به: تأجيل",
  },
  "v2.contract.recommendation_frame.recommended.escalate": {
    en: "Recommended action: escalate",
    ar: "الإجراء المُوصى به: تصعيد",
  },

  // Recommendation-frame forbidden-decision labels (the decisions the frame
  // does NOT authorize — surfaced as caveats next to the allowed verbs).
  "v2.contract.recommendation_frame.forbidden.final_decision": {
    en: "Frame does not authorize a final decision",
    ar: "لا يُجيز الإطار قرارًا نهائيًا",
  },
  "v2.contract.recommendation_frame.forbidden.automatic_approval": {
    en: "Frame does not authorize automatic approval",
    ar: "لا يُجيز الإطار اعتمادًا آليًا",
  },
  "v2.contract.recommendation_frame.forbidden.regulatory_action": {
    en: "Frame does not authorize a regulatory action",
    ar: "لا يُجيز الإطار إجراءً تنظيميًا",
  },
  "v2.contract.recommendation_frame.forbidden.adjudicated_violation": {
    en: "Frame does not authorize an adjudicated-violation indicator",
    ar: "لا يُجيز الإطار مؤشِّرًا لمخالفة مَفصول فيها",
  },
  "v2.contract.recommendation_frame.forbidden.penalty_application": {
    en: "Frame does not authorize a penalty or sanction surface",
    ar: "لا يُجيز الإطار سطح عقوبة أو جزاء",
  },
  "v2.contract.recommendation_frame.forbidden.compelled_compliance": {
    en: "Frame does not authorize a compelled-compliance direction",
    ar: "لا يُجيز الإطار توجيهًا للامتثال القسري",
  },

  // Two extra reusable limitation labels referenced by contract result
  // limitationKeys[] (alongside the ones already in the dict).
  "v2.limitation.contract_band_only": {
    en: "Contract output is band-only; no numeric score",
    ar: "ناتج العقد بالنطاقات فقط؛ بلا درجة رقمية",
  },
  "v2.limitation.derived_from_envelope": {
    en: "Derived from governance envelope; advisory only",
    ar: "مُشتقّ من غلاف الحوكمة؛ استشاري فقط",
  },

  // ---- v2 · Phase 32.4 Group 1.3 — Cascade contract trace -----
  "v2.cascade.contract_trace.label": { en: "Contract trace", ar: "تتبُّع العقود" },
  "v2.cascade.contract_trace.caveat": {
    en: "Advisory only · digest-verified evidence log · human review required",
    ar: "استشاري فقط · سجل أدلة موثَّق التجزئة · المراجعة البشرية مطلوبة",
  },
  "v2.evidence_log.canonical_phrase": { en: "digest-verified evidence log", ar: "سجل أدلة موثَّق التجزئة" },

  // ---- v2 · Phase 32.4 Group 1.4 — Visual Operating Surface i18n -----
  // Additive only. Keys are forward-compatible with the future Phase 32.3-impl
  // visual rebuild; no UI is built in this group. AR drafted in Gulf
  // institutional voice; subject to editor-of-record sign-off per CLAUDE.md
  // §11.4 / build-authorization §7.1. No __pending_editor_review__.

  // ---- v2.zone.* — nine zone-aligned components (Phase 32.3-docs §B) ---

  // Zone 1 — CommandHero
  "v2.zone.command_hero.heading": { en: "Command Hero", ar: "هيرو القيادة" },
  "v2.zone.command_hero.eyebrow": { en: "GCC Urban Decision Infrastructure", ar: "منصة قرار البنية الحضرية الخليجية" },
  "v2.zone.command_hero.description": {
    en: "Saudi/Riyadh-first hero with cascade-aliveness chips and a four-chip caveat strip.",
    ar: "هيرو بصدارة السعودية/الرياض، مع شارات حيوية للتسلسل وشريط تحفظات بأربع شارات.",
  },
  "v2.zone.command_hero.caveat": {
    en: "Advisory only · synthetic simulation · human review required",
    ar: "استشاري فقط · معاينة افتراضية · المراجعة البشرية مطلوبة",
  },

  // Zone 2 — SaudiTheatreCanvas
  "v2.zone.saudi_theatre_canvas.heading": { en: "Saudi Decision Surface", ar: "سطح القرار السعودي" },
  "v2.zone.saudi_theatre_canvas.eyebrow": { en: "Primary Active Surface · Riyadh-Core", ar: "السطح النشط الرئيسي · نواة الرياض" },
  "v2.zone.saudi_theatre_canvas.description": {
    en: "Stylized canvas with district labels, captured-date metadata, and scene-id chip.",
    ar: "لوحة مُبسَّطة بأسماء الأحياء وبيانات تاريخ الالتقاط وشارة معرِّف المشهد.",
  },
  "v2.zone.saudi_theatre_canvas.caveat": {
    en: "Stylized only · not an official municipal boundary · no operational imagery",
    ar: "مُبسَّطة فقط · ليست حدًّا بلديًّا رسميًّا · بلا صور تشغيلية",
  },

  // Zone 3 — LayerControlRail
  "v2.zone.layer_control_rail.heading": { en: "Layer Control Rail", ar: "شريط التحكُّم بالطبقات" },
  "v2.zone.layer_control_rail.eyebrow": { en: "Eleven V2 layers", ar: "إحدى عشرة طبقة في الإصدار الثاني" },
  "v2.zone.layer_control_rail.description": {
    en: "Read-only rail listing the V2 layer model. Anchor-link navigation only.",
    ar: "شريط للقراءة فقط يدرج نموذج الطبقات في الإصدار الثاني. تنقُّل بالروابط المرجعية فقط.",
  },
  "v2.zone.layer_control_rail.caveat": {
    en: "No layer toggling · no live data path",
    ar: "لا يوجد تبديل للطبقات · لا مسار بيانات تشغيلي",
  },

  // Zone 4 — ScenarioPropagationStrip
  "v2.zone.scenario_propagation_strip.heading": { en: "Scenario Propagation Strip", ar: "شريط انتشار السيناريو" },
  "v2.zone.scenario_propagation_strip.eyebrow": { en: "Eight-step deterministic chain", ar: "سلسلة حتميّة من ثماني خطوات" },
  "v2.zone.scenario_propagation_strip.description": {
    en: "Cascade chain: signal → operating surface → analysis → analytical core → case → review → audit → readiness.",
    ar: "تسلسل المرور: إشارة → السطح التشغيلي → تحليل → النواة التحليليَّة → حالة → مراجعة → تدقيق → جاهزية.",
  },
  "v2.zone.scenario_propagation_strip.caveat": {
    en: "Scenario propagation is not prediction",
    ar: "انتشار السيناريو ليس تنبُّؤًا",
  },

  // Zone 5 — MathematicalCoreDeck
  "v2.zone.mathematical_core_deck.heading": { en: "Mathematical Core Deck", ar: "طاولة النواة الرياضية" },
  "v2.zone.mathematical_core_deck.eyebrow": { en: "Phase 2A formulas", ar: "صيغ المرحلة الثانية – ألف" },
  "v2.zone.mathematical_core_deck.description": {
    en: "Three-column deck of formula cards. Active formula highlights on signal click.",
    ar: "طاولة من ثلاثة أعمدة لبطاقات الصيغ. تتميَّز الصيغة النشطة عند نقر الإشارة.",
  },
  "v2.zone.mathematical_core_deck.caveat": {
    en: "Bands only · no numeric scores · no probability claims",
    ar: "نطاقات فقط · بلا درجات رقمية · بلا ادعاءات احتمالية",
  },

  // Zone 6 — EvidenceTwinRail
  "v2.zone.evidence_twin_rail.heading": { en: "Evidence Twin Rail", ar: "شريط أدلة التوأم" },
  "v2.zone.evidence_twin_rail.eyebrow": { en: "Source-logged evidence", ar: "أدلة بسجلِّ مصدر" },
  "v2.zone.evidence_twin_rail.description": {
    en: "Confidence-band rollup, source-type chips, captured-date discipline.",
    ar: "تجميع نطاقات الثقة وشارات نوع المصدر وانضباط تاريخ الالتقاط.",
  },
  "v2.zone.evidence_twin_rail.caveat": {
    en: "Evidence is officer-validated · never auto-generated",
    ar: "الأدلة موثَّقة من الموظَّف · لا تُنتَج تلقائيًا",
  },

  // Phase 32.5.2 D1 — Source Registry Panel (compact, review-support only).
  // AR strings below are implementation draft; pending Gulf-institutional-Arabic
  // editor-of-record review before any future PR may merge to a release branch.
  "v2.source_registry.title": { en: "Source Registry", ar: "سجلّ المصادر" },
  "v2.source_registry.subtitle": {
    en: "Review-support only",
    ar: "لدعم المراجعة فقط",
  },
  "v2.source_registry.source_id": { en: "Source ID", ar: "معرِّف المصدر" },
  "v2.source_registry.source_kind": { en: "Source type", ar: "نوع المصدر" },
  "v2.source_registry.provider_type": {
    en: "Provider type",
    ar: "نوع الجهة المُزوِّدة",
  },
  "v2.source_registry.captured_date": {
    en: "Captured date",
    ar: "تاريخ الالتقاط",
  },
  "v2.source_registry.resolution_band": {
    en: "Resolution band",
    ar: "نطاق الدِّقَّة",
  },
  "v2.source_registry.license_boundary": {
    en: "License boundary",
    ar: "حدود الترخيص",
  },
  "v2.source_registry.privacy_boundary": {
    en: "Privacy boundary",
    ar: "حدود الخصوصيَّة",
  },
  "v2.source_registry.evidence_status": {
    en: "Evidence status",
    ar: "حالة الأدلَّة",
  },
  "v2.source_registry.confidence_band": {
    en: "Confidence band",
    ar: "نطاق الثِّقة",
  },
  "v2.source_registry.provenance_note": {
    en: "Provenance note",
    ar: "ملاحظة المصدر",
  },
  "v2.source_registry.synthetic_source": {
    en: "Synthetic source",
    ar: "مصدر افتراضي",
  },
  "v2.source_registry.review_support_only": {
    en: "Review-support only — not an official source of record",
    ar: "لدعم المراجعة فقط — ليس مصدراً رسميَّاً للتسجيل",
  },
  "v2.source_registry.governance_caveat": {
    en: "Governance caveat",
    ar: "تحفُّظ حوكمي",
  },
  "v2.source_registry.data_status": {
    en: "Data status",
    ar: "حالة البيانات",
  },
  "v2.source_registry.empty_state": {
    en: "No source registry entries on file for the active signal.",
    ar: "لا توجد قيود سجلِّ مصادر للإشارة النشطة.",
  },
  // Per-entry display copy. AR is implementation draft.
  "v2.source_registry.entry.ry_001.label": {
    en: "Riyadh-Core · synthetic satellite reference",
    ar: "الرياض — النواة · مرجع فضائي افتراضي",
  },
  "v2.source_registry.entry.ry_001.provenance": {
    en: "Synthetic capture marker prepared for Riyadh-Core preview.",
    ar: "معلَم التقاط افتراضي مُعَدّ لمعاينة الرياض — النواة.",
  },
  "v2.source_registry.entry.ry_001.caveat": {
    en: "Categorical class only · no real-vendor attribution.",
    ar: "تصنيف فئوي فقط · بلا إسناد لمزوِّد فعلي.",
  },
  "v2.source_registry.entry.ry_002.label": {
    en: "Riyadh-Core · synthetic municipal-registry reference",
    ar: "الرياض — النواة · مرجع سجلّ بلدي افتراضي",
  },
  "v2.source_registry.entry.ry_002.provenance": {
    en: "Open-data-equivalent reference shape; no production registry connector.",
    ar: "هيكل مرجعي مكافئ للبيانات المفتوحة · بلا اتصال بسجلّ تشغيلي.",
  },
  "v2.source_registry.entry.ry_002.caveat": {
    en: "Place-only fields · no personal identifier.",
    ar: "حقول الموقع فقط · بلا معرِّف شخصي.",
  },
  "v2.source_registry.entry.ry_003.label": {
    en: "Riyadh-Core · synthetic capture marker",
    ar: "الرياض — النواة · معلَم التقاط افتراضي",
  },
  "v2.source_registry.entry.ry_003.provenance": {
    en: "Capture marker placeholder for the Riyadh-Core preview signal.",
    ar: "معلَم التقاط نائب للإشارة المعاينة في الرياض — النواة.",
  },
  "v2.source_registry.entry.ry_003.caveat": {
    en: "Awaiting reviewer-attached evidence before further use.",
    ar: "بانتظار أدلَّة مرفقة من المراجع قبل أيِّ استخدام إضافي.",
  },
  "v2.source_registry.entry.kw_001.label": {
    en: "Kuwait reference · synthetic municipal-registry shape",
    ar: "مرجع الكويت · هيكل سجلّ بلدي افتراضي",
  },
  "v2.source_registry.entry.kw_001.provenance": {
    en: "Kuwait reference fixture for cross-tenant comparability.",
    ar: "حزمة مرجعية للكويت لأغراض المقارنة بين المُلَّاك.",
  },
  "v2.source_registry.entry.kw_001.caveat": {
    en: "Reference scope · primary surface remains Riyadh-Core.",
    ar: "نطاق مرجعي · السطح الأساسي يبقى الرياض — النواة.",
  },

  // Phase 32.5.2 D2 — Evidence Lifecycle Strip (compact, review-support only).
  // AR strings below are implementation draft; pending Gulf-institutional-Arabic
  // editor-of-record review before any future PR may merge to a release branch.
  "v2.evidence_lifecycle.title": { en: "Evidence Lifecycle", ar: "دورة حياة الأدلَّة" },
  "v2.evidence_lifecycle.subtitle": {
    en: "Review-support only",
    ar: "لدعم المراجعة فقط",
  },
  "v2.evidence_lifecycle.not_official_record": {
    en: "Not a record of official evidentiary status",
    ar: "ليس قيداً بصفة الأدلَّة الرسميَّة",
  },
  "v2.evidence_lifecycle.current_stage": {
    en: "Current evidence stage",
    ar: "المرحلة الحاليَّة للأدلَّة",
  },
  "v2.evidence_lifecycle.next_review_need": {
    en: "Next review need",
    ar: "متطلَّب المراجعة التالي",
  },
  "v2.evidence_lifecycle.governance_boundary": {
    en: "Governance boundary",
    ar: "حدود الحوكمة",
  },
  "v2.evidence_lifecycle.lifecycle_note": {
    en: "Lifecycle note",
    ar: "ملاحظة الدورة",
  },
  "v2.evidence_lifecycle.source_ref_label": {
    en: "Source reference",
    ar: "مرجع المصدر",
  },
  "v2.evidence_lifecycle.empty_state": {
    en: "No lifecycle entries on file for the active signal.",
    ar: "لا توجد قيود لدورة الأدلَّة للإشارة النشطة.",
  },

  // Step labels
  "v2.evidence_lifecycle.step.source_captured.label": {
    en: "Source captured",
    ar: "تمَّ التقاط المصدر",
  },
  "v2.evidence_lifecycle.step.registered_in_review_pack.label": {
    en: "Registered in review pack",
    ar: "مُودَع ضمن حزمة المراجعة",
  },
  "v2.evidence_lifecycle.step.evidence_screened.label": {
    en: "Evidence screened",
    ar: "فحص أوَّلي للأدلَّة",
  },
  "v2.evidence_lifecycle.step.gap_identified.label": {
    en: "Gap identified",
    ar: "فجوة محدَّدة",
  },
  "v2.evidence_lifecycle.step.review_ready.label": {
    en: "Review-ready",
    ar: "جاهز للمراجعة",
  },
  "v2.evidence_lifecycle.step.needs_more_evidence.label": {
    en: "Needs more evidence",
    ar: "بحاجة لأدلَّة إضافيَّة",
  },

  // Review-need labels
  "v2.evidence_lifecycle.review_need.none": { en: "None", ar: "لا شيء" },
  "v2.evidence_lifecycle.review_need.evidence_pack_completion": {
    en: "Evidence-pack completion",
    ar: "اكتمال حزمة الأدلَّة",
  },
  "v2.evidence_lifecycle.review_need.reviewer_attestation": {
    en: "Reviewer attestation",
    ar: "إقرار المراجع",
  },
  "v2.evidence_lifecycle.review_need.policy_context": {
    en: "Policy context",
    ar: "السياق التنظيمي",
  },

  // Per-step notes and boundaries
  "v2.evidence_lifecycle.entry.elc_ry_001.note": {
    en: "Synthetic capture marker placed for the Riyadh-Core preview signal.",
    ar: "تمَّ وضع معلَم التقاط افتراضي للإشارة المعاينة في الرياض — النواة.",
  },
  "v2.evidence_lifecycle.entry.elc_ry_001.boundary": {
    en: "Categorical step only · review-support indicator.",
    ar: "خطوة فئويَّة فقط · مؤشِّر لدعم المراجعة.",
  },
  "v2.evidence_lifecycle.entry.elc_ry_002.note": {
    en: "Source bundled into a synthetic review pack for the active signal.",
    ar: "تمَّ ضمّ المصدر إلى حزمة مراجعة افتراضيَّة للإشارة النشطة.",
  },
  "v2.evidence_lifecycle.entry.elc_ry_002.boundary": {
    en: "Pack registration is categorical · review-support only.",
    ar: "التسجيل في الحزمة فئوي · لدعم المراجعة فقط.",
  },
  "v2.evidence_lifecycle.entry.elc_ry_003.note": {
    en: "Initial categorical screen complete; no adjudicative judgement.",
    ar: "اكتمل الفحص الأوَّلي الفئوي · بلا أيِّ حكم تقريري.",
  },
  "v2.evidence_lifecycle.entry.elc_ry_003.boundary": {
    en: "Screening describes posture · does not establish a finding.",
    ar: "الفحص يصف الموقف · ولا يثبت نتيجة.",
  },
  "v2.evidence_lifecycle.entry.elc_ry_004.note": {
    en: "Categorical gap noted; awaits reviewer-attached evidence.",
    ar: "لُوحِظت فجوة فئويَّة · بانتظار أدلَّة مرفقة من المراجع.",
  },
  "v2.evidence_lifecycle.entry.elc_ry_004.boundary": {
    en: "Gap is descriptive · reviewer attestation precedes any next step.",
    ar: "الفجوة وصفيَّة · إقرار المراجع يسبق أيَّ خطوة لاحقة.",
  },
  "v2.evidence_lifecycle.entry.elc_ry_005.note": {
    en: "Awaiting policy-context input before review-ready posture is set.",
    ar: "بانتظار سياق تنظيمي قبل إعلان الجاهزيَّة للمراجعة.",
  },
  "v2.evidence_lifecycle.entry.elc_ry_005.boundary": {
    en: "Stage label is review-support only · municipal review remains the sole producer of consequential conclusions.",
    ar: "تسمية المرحلة لدعم المراجعة فقط · المراجعة البلديَّة هي المنتج الوحيد للاستنتاجات ذات الأثر.",
  },

  // Phase 32.5.2 D3 — Analyst Workflow Strip (compact, review-support only).
  // AR strings below are implementation draft; pending Gulf-institutional-Arabic
  // editor-of-record review before any future PR may merge to a release branch.
  "v2.analyst_workflow.title": {
    en: "Analyst Workflow",
    ar: "سير عمل المُحلِّل",
  },
  "v2.analyst_workflow.subtitle": {
    en: "Review posture only",
    ar: "وضعيَّة مراجعة فقط",
  },
  "v2.analyst_workflow.review_support_only": {
    en: "Review-support only",
    ar: "لدعم المراجعة فقط",
  },
  "v2.analyst_workflow.not_operational_workflow": {
    en: "Not an operational workflow",
    ar: "ليس سير عمل تشغيلي",
  },
  "v2.analyst_workflow.current_step": {
    en: "Current review step",
    ar: "خطوة المراجعة الحاليَّة",
  },
  "v2.analyst_workflow.next_human_action": {
    en: "Next human action",
    ar: "الإجراء البشري التالي",
  },
  "v2.analyst_workflow.review_input": {
    en: "Review input",
    ar: "مُدخَل المراجعة",
  },
  "v2.analyst_workflow.review_output": {
    en: "Review output",
    ar: "مُخرَج المراجعة",
  },
  "v2.analyst_workflow.governance_boundary": {
    en: "Governance boundary",
    ar: "حدود الحوكمة",
  },
  "v2.analyst_workflow.empty_state": {
    en: "No analyst-workflow steps on file for the active signal.",
    ar: "لا توجد خطوات سير عمل لمحلِّل الإشارة النشطة.",
  },

  // Step labels
  "v2.analyst_workflow.step.review_source_context.label": {
    en: "Review source context",
    ar: "مراجعة سياق المصدر",
  },
  "v2.analyst_workflow.step.check_evidence_sufficiency.label": {
    en: "Check evidence sufficiency",
    ar: "فحص كفاية الأدلَّة",
  },
  "v2.analyst_workflow.step.identify_review_gap.label": {
    en: "Identify review gap",
    ar: "تحديد فجوة المراجعة",
  },
  "v2.analyst_workflow.step.record_human_attestation_need.label": {
    en: "Record human attestation need",
    ar: "تسجيل الحاجة لإقرار بشري",
  },
  "v2.analyst_workflow.step.prepare_decision_readiness_note.label": {
    en: "Prepare decision-readiness note",
    ar: "تهيئة ملاحظة الجاهزيَّة للقرار",
  },

  // Per-step note / boundary / review-output / next-action keys
  // awf-ry-001 — source-context review (complete)
  "v2.analyst_workflow.entry.awf_ry_001.note": {
    en: "Source context for the active signal has been read by a data steward.",
    ar: "اطَّلع أمين البيانات على سياق المصدر للإشارة النشطة.",
  },
  "v2.analyst_workflow.entry.awf_ry_001.boundary": {
    en: "Review posture only · no commitment to act has been recorded.",
    ar: "وضعيَّة مراجعة فقط · لا يوجد التزام بإجراء.",
  },
  "v2.analyst_workflow.entry.awf_ry_001.review_output": {
    en: "Source context noted",
    ar: "تمَّت الإشارة إلى سياق المصدر",
  },
  "v2.analyst_workflow.entry.awf_ry_001.next_action": {
    en: "Inspect evidence sufficiency",
    ar: "فحص كفاية الأدلَّة",
  },
  // awf-ry-002 — evidence sufficiency check (current)
  "v2.analyst_workflow.entry.awf_ry_002.note": {
    en: "An inspections lead is reviewing categorical evidence sufficiency.",
    ar: "يقوم رئيس التفتيش بمراجعة كفاية الأدلَّة فئوياً.",
  },
  "v2.analyst_workflow.entry.awf_ry_002.boundary": {
    en: "Categorical only · no adjudicative judgement at this step.",
    ar: "فئوي فقط · لا يوجد حكم تقريري في هذه الخطوة.",
  },
  "v2.analyst_workflow.entry.awf_ry_002.review_output": {
    en: "Evidence-sufficiency band noted",
    ar: "تمَّت الإشارة إلى نطاق كفاية الأدلَّة",
  },
  "v2.analyst_workflow.entry.awf_ry_002.next_action": {
    en: "Identify any remaining review gap",
    ar: "تحديد أيَّة فجوة مراجعة متبقيَّة",
  },
  // awf-ry-003 — gap review (pending)
  "v2.analyst_workflow.entry.awf_ry_003.note": {
    en: "A categorical gap is awaiting reviewer-attached evidence.",
    ar: "فجوة فئويَّة بانتظار أدلَّة مرفقة من المراجع.",
  },
  "v2.analyst_workflow.entry.awf_ry_003.boundary": {
    en: "Gap is descriptive · no claim is made about the underlying matter.",
    ar: "الفجوة وصفيَّة · لا ادِّعاء حول المسألة الأساسيَّة.",
  },
  "v2.analyst_workflow.entry.awf_ry_003.review_output": {
    en: "Gap category noted",
    ar: "تمَّت الإشارة إلى تصنيف الفجوة",
  },
  "v2.analyst_workflow.entry.awf_ry_003.next_action": {
    en: "Record reviewer attestation need",
    ar: "تسجيل الحاجة لإقرار بشري",
  },
  // awf-ry-004 — human attestation (blocked)
  "v2.analyst_workflow.entry.awf_ry_004.note": {
    en: "A permit officer must attest before this step proceeds.",
    ar: "يلزم إقرار من مسؤول التصاريح قبل تقدُّم هذه الخطوة.",
  },
  "v2.analyst_workflow.entry.awf_ry_004.boundary": {
    en: "No automatic advance · human attestation precedes any next step.",
    ar: "بلا تقدُّم تلقائي · إقرار بشري يسبق أيَّ خطوة لاحقة.",
  },
  "v2.analyst_workflow.entry.awf_ry_004.review_output": {
    en: "Awaits reviewer attestation",
    ar: "بانتظار إقرار المراجع",
  },
  "v2.analyst_workflow.entry.awf_ry_004.next_action": {
    en: "Provide policy context",
    ar: "إتاحة السياق التنظيمي",
  },
  // awf-ry-005 — decision-readiness prep (pending)
  "v2.analyst_workflow.entry.awf_ry_005.note": {
    en: "A decision-readiness note is prepared once policy context is in place.",
    ar: "تُعَدّ ملاحظة الجاهزيَّة للقرار بعد توفُّر السياق التنظيمي.",
  },
  "v2.analyst_workflow.entry.awf_ry_005.boundary": {
    en: "Note is review-support only · municipal review issues any consequential conclusion.",
    ar: "الملاحظة لدعم المراجعة فقط · المراجعة البلديَّة تُصدِر أيَّ استنتاج ذي أثر.",
  },
  "v2.analyst_workflow.entry.awf_ry_005.review_output": {
    en: "Decision-readiness note draft",
    ar: "مسودَّة ملاحظة الجاهزيَّة للقرار",
  },
  "v2.analyst_workflow.entry.awf_ry_005.next_action": {
    en: "Hand to municipal reviewer for sign-off",
    ar: "إحالة إلى المراجع البلدي للتوقيع",
  },

  // -------------------------------------------------------------------------
  // D4 — Decision Readiness Strip (advisory-only, read-only).
  // No approval / no verdict / no decision-final / no automated penalties /
  // no official municipal determination. Indicative posture only.
  // -------------------------------------------------------------------------
  "v2.decision_readiness.title": {
    en: "Decision Readiness",
    ar: "جاهزية القرار",
  },
  "v2.decision_readiness.subtitle": {
    en: "Review posture only",
    ar: "وضعية مراجعة فقط",
  },
  "v2.decision_readiness.not_an_official_determination": {
    en: "Not an official municipal determination",
    ar: "ليس قراراً بلدياً رسمياً",
  },
  "v2.decision_readiness.empty_state": {
    en: "No decision-readiness record on file for the active signal.",
    ar: "لا يوجد سجل جاهزية قرار للإشارة النشطة.",
  },

  // D4 — field labels
  "v2.decision_readiness.readiness_state": {
    en: "Readiness state",
    ar: "حالة الجاهزية",
  },
  "v2.decision_readiness.confidence": {
    en: "Confidence",
    ar: "الثقة",
  },
  "v2.decision_readiness.evidence_sufficiency": {
    en: "Evidence sufficiency",
    ar: "كفاية الأدلة",
  },
  "v2.decision_readiness.next_human_action": {
    en: "Next human action",
    ar: "الإجراء البشري التالي",
  },
  "v2.decision_readiness.governance_constraints": {
    en: "Governance constraints",
    ar: "قيود الحوكمة",
  },
  "v2.decision_readiness.limitation_note": {
    en: "Limitation note",
    ar: "ملاحظة القيد",
  },
  "v2.decision_readiness.source_evidence_dependency": {
    en: "Source / evidence dependency",
    ar: "اعتماد المصدر والأدلة",
  },
  "v2.decision_readiness.analyst_workflow_dependency": {
    en: "Analyst-workflow dependency",
    ar: "اعتماد سير عمل المحلل",
  },

  // D4 — per-record content for active synthetic signal sig-ry-001
  "v2.decision_readiness.entry.dr_ry_001.next_action": {
    en: "Request additional capture for the suspected change footprint and return for inspections-lead review.",
    ar: "طلب رصد إضافي للنطاق المرصود واستعادته لمراجعة قائد التفتيش.",
  },
  "v2.decision_readiness.entry.dr_ry_001.governance_constraints": {
    en: "Synthetic source · advisory-only · no municipal determination · municipal review remains the sole authority.",
    ar: "مصدر افتراضي · استشاري فقط · لا قرار بلدي · المراجعة البلدية هي السلطة الوحيدة.",
  },
  "v2.decision_readiness.entry.dr_ry_001.limitation_note": {
    en: "Capture cadence is intermittent and license boundaries restrict downstream use; readout reflects the evidence picture as of the last review step.",
    ar: "وتيرة الرصد متقطعة وحدود الترخيص تقيّد الاستخدام اللاحق؛ تعكس النتيجة صورة الأدلة حتى آخر خطوة مراجعة.",
  },
  "v2.decision_readiness.entry.dr_ry_001.source_evidence_summary": {
    en: "Linked to source srg-ry-001 and evidence-lifecycle steps elc-ry-001 and elc-ry-003 (under review).",
    ar: "مرتبطة بالمصدر srg-ry-001 وخطوتَي دورة الأدلة elc-ry-001 و elc-ry-003 (قيد المراجعة).",
  },
  "v2.decision_readiness.entry.dr_ry_001.analyst_workflow_summary": {
    en: "Linked to analyst-workflow rollup awf-ry-002 (current) and downstream steps awf-ry-003, awf-ry-004, awf-ry-005 (pending or held).",
    ar: "مرتبطة بإجمالي سير عمل المحلل awf-ry-002 (الحالية) والخطوات اللاحقة awf-ry-003 و awf-ry-004 و awf-ry-005 (قيد الانتظار أو موقوفة).",
  },

  // Zone 7 — MunicipalCaseConsole
  "v2.zone.municipal_case_console.heading": { en: "Municipal Case Console", ar: "وحدة تحكُّم الحالات البلدية" },
  "v2.zone.municipal_case_console.eyebrow": { en: "Reviewer lanes", ar: "ممرَّات المراجعين" },
  "v2.zone.municipal_case_console.description": {
    en: "Case console with reviewer-lane swimlanes, status chips, and monospaced case IDs.",
    ar: "وحدة تحكُّم بالحالات بممرَّات سباحة لكل مراجع وشارات حالة ومعرِّفات حالة بخطٍّ ثابت العرض.",
  },
  "v2.zone.municipal_case_console.caveat": {
    en: "No municipal action is initiated · advisory only",
    ar: "لا يُبادَر بأيِّ إجراء بلديٍّ · استشاري فقط",
  },

  // Zone 8 — HumanReviewGate
  "v2.zone.human_review_gate.heading": { en: "Human Review Gate", ar: "بوَّابة المراجعة البشرية" },
  "v2.zone.human_review_gate.eyebrow": { en: "Four advisory verbs", ar: "أربعة أفعال استشارية" },
  "v2.zone.human_review_gate.description": {
    en: "Acknowledge · request evidence · defer · escalate. Verbs disabled until a case is active.",
    ar: "الإقرار · طلب أدلة · تأجيل · تصعيد. الأفعال مُعطَّلة حتى تنشط حالة.",
  },
  "v2.zone.human_review_gate.caveat": {
    en: "Reviewer is the only producer of consequential decisions",
    ar: "المراجع هو المنتج الوحيد للقرارات ذات الأثر",
  },

  // Zone 9 — DecisionReadinessRoom
  "v2.zone.decision_readiness_room.heading": { en: "Decision Readiness Room", ar: "غرفة جاهزية القرار" },
  "v2.zone.decision_readiness_room.eyebrow": { en: "Audit + outcome posture", ar: "تدقيق + موقف النتيجة" },
  "v2.zone.decision_readiness_room.description": {
    en: "Audit-depth chip, outcome posture band, decision-readiness summary, pilot decision ask.",
    ar: "شارة عمق التدقيق ونطاق موقف النتيجة وملخَّص جاهزية القرار وطلب قرار التجربة.",
  },
  "v2.zone.decision_readiness_room.caveat": {
    en: "Pilot decision is recorded by a named reviewer · no automated promotion",
    ar: "قرار التجربة يُسجَّل من مراجع مسمَّى · لا توجد ترقية آلية",
  },

  // ---- v2.layer.* — eleven target layers (Phase 32.3-docs §3) ---

  "v2.layer.satellite_intelligence.label": { en: "Satellite Intelligence Layer", ar: "طبقة ذكاء الأقمار الاصطناعية" },
  "v2.layer.satellite_intelligence.description": {
    en: "Captured-date-anchored visible-band signals. No live feed. Synthetic only.",
    ar: "إشارات نطاق مرئيّ مرتبطة بتاريخ الالتقاط. لا تغذية تشغيلية. افتراضي فقط.",
  },
  "v2.layer.urban_object_gis.label": { en: "Urban Object / GIS Layer", ar: "طبقة الكائنات الحضرية / نظم المعلومات الجغرافية" },
  "v2.layer.urban_object_gis.description": {
    en: "Region · country · city · district · zone hierarchy. Stylized canvas only.",
    ar: "تسلسل: إقليم · دولة · مدينة · حي · نطاق. لوحة مُبسَّطة فقط.",
  },
  "v2.layer.municipality_operations.label": { en: "Municipality Operations Layer", ar: "طبقة عمليات البلدية" },
  "v2.layer.municipality_operations.description": {
    en: "Cases, inspection backlog, permit packets. Always advisory; always linked to a named reviewer role.",
    ar: "حالات · قائمة التفتيش · حزم التصاريح. استشاري دائمًا · مرتبط دائمًا بدور مراجع مسمَّى.",
  },
  "v2.layer.economic_exposure.label": { en: "Economic Exposure Layer", ar: "طبقة الانكشاف الاقتصادي" },
  "v2.layer.economic_exposure.description": {
    en: "Advisory band-only framing. No currency, no return-on-investment framing, no money-saving claims.",
    ar: "إطار بنطاقات استشارية فقط. لا توجد عملة · لا إطار لعائد الاستثمار · لا ادعاءات بتوفير المال.",
  },
  "v2.layer.evidence_infrastructure.label": { en: "Evidence Infrastructure Layer", ar: "طبقة بنية الأدلة" },
  "v2.layer.evidence_infrastructure.description": {
    en: "Pack · item · source · digest · projection. Source-type chip and confidence band on every entry.",
    ar: "حزمة · عنصر · مصدر · تجزئة · إسقاط. شارة نوع المصدر ونطاق الثقة على كل إدخال.",
  },
  // 32.5.1-R-2-C: institutional layer label
  "v2.layer.mathematical_core.label": { en: "Decision Logic Layer", ar: "طبقة منطق القرار" },
  "v2.layer.mathematical_core.description": {
    en: "Phase 2A formulas surfaced as cards. Bands only; no numeric scores.",
    ar: "صيغ المرحلة الثانية – ألف معروضة كبطاقات. نطاقات فقط · بلا درجات رقمية.",
  },
  "v2.layer.physics_scenario_propagation.label": { en: "Scenario Impact Layer", ar: "طبقة أثر السيناريو" },
  "v2.layer.physics_scenario_propagation.description": {
    en: "Reproducible-from-fixture deterministic walk. Advisory pathway only; not prediction.",
    ar: "مسير حتميّ قابل لإعادة الإنتاج من الحزمة. مسار استشاري فقط · ليس تنبُّؤًا.",
  },
  "v2.layer.multi_agent_advisory.label": { en: "Human Review Workflow Layer", ar: "طبقة مسار المراجعة البشرية" },
  "v2.layer.multi_agent_advisory.description": {
    en: "Four named reviewer-role lanes. No autonomous-agent runtime.",
    ar: "أربع ممرَّات لأدوار مراجعة مسمَّاة. بلا وقت تشغيل لوكلاء ذاتيِّي العمل.",
  },
  "v2.layer.governance_explainability.label": { en: "Governance / Explainability Layer", ar: "طبقة الحوكمة / قابلية التفسير" },
  "v2.layer.governance_explainability.description": {
    en: "Caveats, banned-claims policy, AR/EN parity gate, source registry, evidence-log registry.",
    ar: "تحفظات · سياسة الادعاءات الممنوعة · بوَّابة تكافؤ العربية والإنجليزية · سجل المصادر · سجل الأدلة.",
  },
  "v2.layer.decision_readiness.label": { en: "Decision Readiness Layer", ar: "طبقة جاهزية القرار" },
  "v2.layer.decision_readiness.description": {
    en: "Per-case readiness state. Combined with chainDepth and systemEnergy for advisory framing.",
    ar: "حالة جاهزية لكل حالة. مدمجة مع عمق السلسلة وطاقة النظام لإطار استشاري.",
  },
  "v2.layer.procurement_institutional_narrative.label": { en: "Procurement / Institutional Narrative Layer", ar: "طبقة السرد المؤسَّسي / المشتريات" },
  "v2.layer.procurement_institutional_narrative.description": {
    en: "Pilot decision ask, governance boundary, six-state coverage roadmap, AR/EN parity disclosure.",
    ar: "طلب قرار التجربة · حدود الحوكمة · خارطة تغطية الدول الستِّ · إفصاح تكافؤ العربية والإنجليزية.",
  },

  // ---- v2.scenario.* — six new scenario types + shared caveat ---
  // (urban_expansion + drainage_sensitivity already authored in Group 1.1.)

  "v2.scenario.congestion_pressure.name": { en: "Congestion pressure", ar: "ضغط الازدحام" },
  "v2.scenario.congestion_pressure.description": {
    en: "Advisory framing of inspection-backing concentration along a corridor. Synthetic; advisory only.",
    ar: "إطار استشاري لتركيز الضغط المراجِع المدعوم بالتفتيش على ممر. افتراضي · استشاري فقط.",
  },
  "v2.scenario.land_use_shift.name": { en: "Land-use shift", ar: "تحوُّل استخدام الأراضي" },
  "v2.scenario.land_use_shift.description": {
    en: "Captured-date-anchored visible-band change in a district's zone composition. No zoning claim.",
    ar: "تغيُّر النطاق المرئي مرتبطًا بتاريخ الالتقاط في تركيب نطاقات الحي. لا ادعاء تخطيطي.",
  },
  "v2.scenario.infrastructure_stress.name": { en: "Infrastructure stress", ar: "إجهاد البنية التحتية" },
  "v2.scenario.infrastructure_stress.description": {
    en: "Advisory framing of multiple inspection-backing signals on infrastructure nodes along a corridor.",
    ar: "إطار استشاري لعدَّة إشارات مراجعة مدعومة بالتفتيش على عقد البنية التحتية على طول ممر.",
  },
  "v2.scenario.disaster_resilience_posture.name": { en: "Disaster-resilience posture", ar: "موقف الصمود أمام الكوارث" },
  "v2.scenario.disaster_resilience_posture.description": {
    en: "Advisory posture of a district's drainage / infrastructure / corridor against a hypothetical disaster class.",
    ar: "موقف استشاري لصرف الحي وبنيته التحتية وممرَّاته أمام فئة كارثة افتراضية.",
  },
  "v2.scenario.economic_exposure_sensitivity.name": { en: "Economic-exposure sensitivity", ar: "حساسية الانكشاف الاقتصادي" },
  "v2.scenario.economic_exposure_sensitivity.description": {
    en: "Band-only framing of district-level exposure to economic-activity shifts. No currency.",
    ar: "إطار بنطاقات فقط لانكشاف الحي أمام تحوُّلات النشاط الاقتصادي. لا توجد عملة.",
  },
  "v2.scenario.municipal_readiness.name": { en: "Municipal readiness", ar: "الجاهزية البلدية" },
  "v2.scenario.municipal_readiness.description": {
    en: "Advisory framing of a district's case-set readiness for municipal review. Bands only.",
    ar: "إطار استشاري لجاهزية مجموعة حالات الحي للمراجعة البلدية. نطاقات فقط.",
  },
  "v2.scenario.advisory_caveat": {
    en: "Scenario propagation is not prediction · advisory pathway only · human review required",
    ar: "انتشار السيناريو ليس تنبُّؤًا · مسار استشاري فقط · المراجعة البشرية مطلوبة",
  },

  // ---- v2.hierarchy_strip.* — T1–T6 single-line strip labels ---

  "v2.hierarchy_strip.t1.label": {
    en: "Saudi Arabia / Riyadh — Primary Active Surface",
    ar: "المملكة العربية السعودية / الرياض — السطح النشط الرئيسي",
  },
  "v2.hierarchy_strip.t2.label": {
    en: "Kuwait City — Reference Surface",
    ar: "مدينة الكويت — السطح المرجعي",
  },
  "v2.hierarchy_strip.t3.label": {
    en: "Bahrain — Planned / Deferred",
    ar: "البحرين — مقرَّر / مؤجَّل",
  },
  "v2.hierarchy_strip.t4.label": {
    en: "Qatar — Planned / Deferred",
    ar: "قطر — مقرَّر / مؤجَّل",
  },
  "v2.hierarchy_strip.t5.label": {
    en: "UAE — Planned / Deferred",
    ar: "الإمارات — مقرَّر / مؤجَّل",
  },
  "v2.hierarchy_strip.t6.label": {
    en: "Oman — Planned / Deferred",
    ar: "عُمان — مقرَّر / مؤجَّل",
  },

  // ---- v2.contract_trace_display.* — short labels for the trace strip ---

  "v2.contract_trace_display.confidence.label": { en: "Confidence", ar: "الثقة" },
  "v2.contract_trace_display.evidence_sufficiency.label": { en: "Evidence sufficiency", ar: "كفاية الأدلة" },
  "v2.contract_trace_display.readiness.label": { en: "Readiness", ar: "الجاهزية" },
  "v2.contract_trace_display.scenario_propagation.label": { en: "Scenario propagation", ar: "انتشار السيناريو" },
  "v2.contract_trace_display.governance_risk.label": { en: "Governance risk", ar: "مخاطر الحوكمة" },
  "v2.contract_trace_display.recommendation_frame.label": { en: "Recommendation frame", ar: "إطار التوصية" },
  "v2.contract_trace_display.classification.label": { en: "Classification", ar: "التصنيف" },
  "v2.contract_trace_display.anomaly_signal.label": { en: "Anomaly signal", ar: "إشارة شذوذ" },

  // Contract-trace caveats (4)
  "v2.contract_trace_display.caveat.banded_only": {
    en: "Banded only — no numeric scores",
    ar: "بالنطاقات فقط — بلا درجات رقمية",
  },
  "v2.contract_trace_display.caveat.advisory_only": { en: "Advisory only", ar: "استشاري فقط" },
  "v2.contract_trace_display.caveat.human_review_required": {
    en: "Human review required",
    ar: "المراجعة البشرية مطلوبة",
  },
  "v2.contract_trace_display.caveat.no_automated_decision": {
    en: "No automated-decision claim",
    ar: "بلا ادعاء قرار آلي",
  },

  // ---- v2.simulation_theatre.* — product-level posture labels ---

  "v2.simulation_theatre.product_name": {
    en: "GCC Urban Decision Infrastructure",
    ar: "منصة قرار البنية الحضرية الخليجية",
  },
  "v2.simulation_theatre.primary_theatre": {
    en: "Saudi Arabia / Riyadh primary surface",
    ar: "السطح الرئيسي للسعودية / الرياض",
  },
  "v2.simulation_theatre.reference_surface": {
    en: "Kuwait reference surface",
    ar: "سطح الكويت المرجعي",
  },
  "v2.simulation_theatre.expansion_shelf": {
    en: "Planned GCC expansion shelf",
    ar: "رفّ التوسُّع الخليجي المقرَّر",
  },
  // 32.5.1-R-3: prominent chip label simplified to "Synthetic Preview"
  "v2.simulation_theatre.synthetic": { en: "Synthetic Preview", ar: "معاينة افتراضية" },
  "v2.simulation_theatre.non_operational": { en: "Non-operational", ar: "غير تشغيلية" },
  "v2.simulation_theatre.no_live_data_claim": {
    en: "No live-data claim",
    ar: "بلا ادعاء بيانات تشغيلية",
  },
  "v2.simulation_theatre.captured_date_anchored_only": {
    en: "Captured-date-anchored only",
    ar: "مرتبطة بتاريخ الالتقاط فقط",
  },
  "v2.simulation_theatre.not_official_government_model": {
    en: "Not an official government model",
    ar: "ليست نموذجًا حكوميًا رسميًا",
  },

  // ==========================================================================
  // Phase 32.5.1 — Institutional Pre-PR Hardening additions
  // (nav · footer · SVG canvas labels · 5 cards · 1 ribbon · scope hierarchy)
  // ==========================================================================

  // Primary nav — V2 first
  // 32.5.1-R-2-B: V2 entry renamed to institutional decision-surface label
  "nav.operating_surface": {
    en: "Urban Decision Surface",
    ar: "سطح القرار الحضري",
  },

  // Footer — Riyadh-first hierarchy (DoD 4)
  "footer.scope_line": {
    en: "Active expansion review: Saudi Arabia / Riyadh · Baseline reference: Kuwait City · Staged lanes: Bahrain / Qatar / UAE / Oman",
    ar: "مراجعة التوسّع الفعّالة: السعودية / الرياض · المرجع الأساسي: مدينة الكويت · مسارات مُرحَّلة: البحرين / قطر / الإمارات / عُمان",
  },
  "footer.synthetic_disclaimer": {
    en: "All data is synthetic. Indicators are suspected until human review. No automated action.",
    ar: "كل البيانات افتراضية. المؤشرات مشتبه بها حتى تتم المراجعة البشرية. لا توجد إجراءات آلية.",
  },

  // SVG canvas labels (DoD 1, A12 — purge hard-coded English/theatre from SVG)
  "v2.canvas.t1_active_region": {
    en: "T1 · PRIMARY ACTIVE SURFACE",
    ar: "T1 · السطح النشط الرئيسي",
  },
  "v2.canvas.t2_reference_region": {
    en: "T2 · REFERENCE SURFACE",
    ar: "T2 · السطح المرجعي",
  },
  "v2.canvas.t3_label": { en: "T3 · BHR · Planned", ar: "T3 · البحرين · مخطط" },
  "v2.canvas.t4_label": { en: "T4 · QAT · Planned", ar: "T4 · قطر · مخطط" },
  "v2.canvas.t5_label": { en: "T5 · UAE · Planned", ar: "T5 · الإمارات · مخطط" },
  "v2.canvas.t6_label": { en: "T6 · OMN · Planned", ar: "T6 · عُمان · مخطط" },

  // Anti-surveillance / anti-enforcement ribbon (DoD 8)
  "v2.ribbon.anti_surveillance.label": {
    en: "Not surveillance · Not enforcement · Not an official municipal model · Not real-time",
    ar: "ليس مراقبة · ليس إنفاذًا · ليس نموذجًا بلديًا رسميًا · ليس فوريًا",
  },

  // Reviewer-surface caveat (Spatial audit A6)
  "v2.ribbon.reviewer_surface.label": {
    en: "Reviewer surface · not a resident application",
    ar: "سطح للمراجعين · ليس تطبيقًا للسكان",
  },

  // Schematic framing (DoD I)
  "v2.ribbon.schematic.label": {
    en: "Schematic advisory surface — not a map engine, GIS, or official municipal record.",
    ar: "سطح تخطيطي استشاري — ليس محرك خرائط، ولا نظام GIS، ولا سجلًا بلديًا رسميًا.",
  },

  // Riyadh / Kuwait / GCC scope statement (DoD H)
  "v2.scope.hierarchy.heading": {
    en: "Active scope",
    ar: "النطاق النشط",
  },
  "v2.scope.hierarchy.body": {
    en: "Riyadh — Saudi Arabia is the active primary surface. Kuwait City is the reference surface. Bahrain, Qatar, UAE, and Oman are planned/deferred expansion surfaces.",
    ar: "الرياض — المملكة العربية السعودية هي السطح النشط الأساسي. مدينة الكويت هي السطح المرجعي. البحرين وقطر والإمارات وعُمان أسطح توسع مخططة / مؤجلة.",
  },

  // Procurement Scope card (DoD 5)
  "v2.card.procurement_scope.heading": {
    en: "Procurement Scope",
    ar: "نطاق المشتريات",
  },
  // 32.5.1-R-3: pilot naming aligned with global "60-Day Pilot Pack"
  "v2.card.procurement_scope.line1": {
    en: "60-Day Pilot Pack — decision-support pilot for Riyadh-Core only",
    ar: "حزمة تجربة 60 يوم — تجربة دعم قرار لنطاق الرياض — النواة فقط",
  },
  "v2.card.procurement_scope.line2": {
    en: "Riyadh-Core only",
    ar: "نطاق الرياض فقط",
  },
  "v2.card.procurement_scope.line3": {
    en: "Synthetic preview",
    ar: "معاينة افتراضية منظمة",
  },
  "v2.card.procurement_scope.line4": {
    en: "Visual-band signals only",
    ar: "إشارات بصرية فقط",
  },
  "v2.card.procurement_scope.line5": {
    en: "No municipal-record mutation",
    ar: "لا تعديل على السجلات البلدية",
  },

  // Operating Principles card (DoD 6)
  "v2.card.principles.heading": {
    en: "Operating Principles",
    ar: "المبادئ التشغيلية",
  },
  "v2.card.principles.triad": {
    en: "Purpose · Trust · Function",
    ar: "الغاية · الثقة · الأداء",
  },
  "v2.card.principles.posture": {
    en: "Advisory-only · Human-review-first · Evidence-bounded",
    ar: "استشاري فقط · مراجعة بشرية أولًا · محكوم بالأدلة",
  },

  // Out-of-Scope card (DoD 7)
  "v2.card.out_of_scope.heading": {
    en: "Out of Scope",
    ar: "خارج النطاق",
  },
  "v2.card.out_of_scope.line1": { en: "No enforcement", ar: "لا إنفاذ" },
  "v2.card.out_of_scope.line2": { en: "No surveillance", ar: "لا مراقبة" },
  "v2.card.out_of_scope.line3": { en: "No live data", ar: "لا بيانات حية" },
  "v2.card.out_of_scope.line4": {
    en: "No real-time signal",
    ar: "لا إشارات فورية",
  },
  "v2.card.out_of_scope.line5": {
    en: "No official municipal model",
    ar: "لا نموذج بلدي رسمي",
  },
  "v2.card.out_of_scope.line6": {
    en: "No automated decision",
    ar: "لا قرار آلي",
  },
  "v2.card.out_of_scope.line7": {
    en: "No satellite truth",
    ar: "لا حقيقة فضائية مطلقة",
  },
  "v2.card.out_of_scope.line8": {
    en: "No GIS replacement",
    ar: "لا يستبدل نظم المعلومات الجغرافية",
  },

  // Future 3D / Satellite Authorization card (DoD 10)
  "v2.card.future_3d.heading": {
    en: "Future 3D & Satellite — Pending Authorization",
    ar: "الواقع ثلاثي الأبعاد ومصادر الأقمار — بانتظار التفويض",
  },
  "v2.card.future_3d.body": {
    en: "Future 3D and satellite-source integration require separate authorization. The current surface is synthetic, schematic, advisory, and human-reviewed.",
    ar: "أي تكامل مستقبلي ثلاثي الأبعاد أو مع مصادر فضائية يتطلب تفويضًا مستقلًا. السطح الحالي افتراضي، تخطيطي، استشاري، وخاضع للمراجعة البشرية.",
  },

  // Defensibility Pack link (DoD 9)
  "v2.link.defensibility_pack.label": {
    en: "View Defensibility Pack",
    ar: "عرض حزمة الدفاعية",
  },

  // ==========================================================================
  // Phase 32.5.1-R-2 — Executive Naming & Buyer Clarity Refinement
  // (Executive Answer · Why this matters · 60-Day Pilot Pack · Who uses this)
  // ==========================================================================

  // D — Executive Answer strip
  "v2.exec_answer.heading": {
    en: "Executive Answer",
    ar: "الخلاصة التنفيذية",
  },
  "v2.exec_answer.row.signal.label": {
    en: "Current signal",
    ar: "الإشارة الحالية",
  },
  "v2.exec_answer.row.signal.value": {
    en: "Riyadh coverage scoping",
    ar: "تحديد نطاق تغطية الرياض",
  },
  "v2.exec_answer.row.readiness.label": {
    en: "Readiness",
    ar: "الجاهزية",
  },
  "v2.exec_answer.row.readiness.value": {
    en: "New — not ready for municipal action",
    ar: "جديدة — غير جاهزة لإجراء بلدي",
  },
  "v2.exec_answer.row.evidence.label": {
    en: "Evidence status",
    ar: "حالة الأدلة",
  },
  "v2.exec_answer.row.evidence.value": {
    en: "Needs additional evidence",
    ar: "تحتاج أدلة إضافية",
  },
  "v2.exec_answer.row.governance.label": {
    en: "Governance risk",
    ar: "مخاطر الحوكمة",
  },
  "v2.exec_answer.row.governance.value": {
    en: "Low to moderate",
    ar: "منخفضة إلى متوسطة",
  },
  "v2.exec_answer.row.next.label": {
    en: "Recommended next step",
    ar: "الخطوة المقترحة",
  },
  "v2.exec_answer.row.next.value": {
    en: "Request additional evidence",
    ar: "طلب أدلة إضافية",
  },
  "v2.exec_answer.row.owner.label": {
    en: "Decision owner",
    ar: "صاحب القرار",
  },
  "v2.exec_answer.row.owner.value": {
    en: "Named municipal reviewer",
    ar: "مراجع بلدي محدد",
  },

  // E — Why this matters strip
  "v2.why_matters.heading": {
    en: "Why this matters",
    ar: "لماذا يهمُّ هذا؟",
  },
  "v2.why_matters.line1": {
    en: "Converts fragmented urban signals into a reviewable municipal case.",
    ar: "يحول الإشارات الحضرية المتفرقة إلى حالة بلدية قابلة للمراجعة.",
  },
  "v2.why_matters.line2": {
    en: "Shows evidence gaps before decision escalation.",
    ar: "يوضح فجوات الأدلة قبل تصعيد القرار.",
  },
  "v2.why_matters.line3": {
    en: "Keeps governance, privacy, license, and authority boundaries visible.",
    ar: "يُبقي حدود الحوكمة والخصوصية والترخيص والصلاحية ظاهرة.",
  },
  "v2.why_matters.line4": {
    en: "Records human-review actions without recommending enforcement.",
    ar: "يسجل إجراءات المراجعة البشرية دون توصية بإنفاذ أو عقوبة.",
  },
  "v2.why_matters.line5": {
    en: "Produces an audit-ready review pack for institutional discussion.",
    ar: "ينتج حزمة مراجعة قابلة للتدقيق للنقاش المؤسسي.",
  },

  // F — 60-Day Pilot Pack card
  "v2.pilot_pack.heading": {
    en: "60-Day Pilot Pack",
    ar: "حزمة تجربة 60 يوم",
  },
  "v2.pilot_pack.line1": {
    en: "Defined municipal review cases",
    ar: "حالات مراجعة بلدية محددة",
  },
  "v2.pilot_pack.line2": {
    en: "Evidence sufficiency log",
    ar: "سجل كفاية الأدلة",
  },
  "v2.pilot_pack.line3": {
    en: "Governance boundary register",
    ar: "سجل حدود الحوكمة",
  },
  "v2.pilot_pack.line4": {
    en: "Human-review workflow",
    ar: "مسار مراجعة بشرية",
  },
  "v2.pilot_pack.line5": {
    en: "Decision-readiness dashboard",
    ar: "لوحة جاهزية القرار",
  },
  "v2.pilot_pack.line6": {
    en: "Audit & defensibility pack",
    ar: "حزمة التدقيق وقابلية الدفاع",
  },

  // G — Who uses this card
  "v2.users.heading": {
    en: "Who uses this",
    ar: "المستخدمون المستهدفون",
  },
  "v2.users.line1": {
    en: "Municipal planning team",
    ar: "فريق التخطيط البلدي",
  },
  "v2.users.line2": {
    en: "Urban data steward",
    ar: "مسؤول البيانات الحضرية",
  },
  "v2.users.line3": {
    en: "Evidence officer",
    ar: "مسؤول الأدلة",
  },
  "v2.users.line4": {
    en: "Governance and risk reviewer",
    ar: "مراجع الحوكمة والمخاطر",
  },
  "v2.users.line5": {
    en: "Executive decision sponsor",
    ar: "الراعي التنفيذي للقرار",
  },
} as const;

export type TKey = keyof typeof dict;

export function t(key: TKey, lang: Lang): string {
  return dict[key][lang] ?? dict[key].en;
}

// Runtime-safe translation lookup with graceful fallback.
//
// Used by Phase OID-P2 components that consume server-supplied i18n keys
// (e.g. `missing_artifact_keys` like `evidence.field_photo`) which may not
// yet be defined in the static dict. When the key is unknown, we humanize
// it ("evidence.field_photo" → "Evidence: field photo") rather than
// rendering an empty string. Never used inside the strongly-typed `t()`
// path — that one keeps compile-time safety for known keys.
export function tSafe(key: string, lang: Lang): string {
  const entry = (dict as unknown as Record<string, { en: string; ar: string } | undefined>)[key];
  if (entry) return entry[lang] ?? entry.en;
  // Fallback: "namespace.snake_case_leaf" → "Namespace: snake case leaf"
  const parts = key.split(".");
  const leaf = (parts[parts.length - 1] || key).replace(/_/g, " ");
  const ns = parts.length > 1 ? parts[0].replace(/_/g, " ") : "";
  if (!ns) return leaf;
  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  return `${cap(ns)}: ${leaf}`;
}
