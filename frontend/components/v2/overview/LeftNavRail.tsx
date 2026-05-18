"use client";

// IR-40A-V2-DYNAMIC-PLATFORM-SHELL-BUILD — Left navigation rail.
// 10 workspace items rendered as in-page state changes only. URL stays
// /v2/overview for every workspace selection. No routing, no fetch, no
// mutation.
//
// IR-44C-R2 — Intelligence OS Navigation + Sidebar Restructure.
// Reorganised into 5 groups (Surface · Intelligence OS · Data Layer ·
// Platform · Governance) so the rail reads as a unified Urban Decision
// Intelligence OS rather than a mixed tool list. Items that do not
// have a workspace or a route are rendered as `staged` (non-clickable,
// "reserved" micro-badge). The 10 existing workspace ids are preserved
// so every in-page state transition continues to work.
//
// IR-45R2 — Arabic RTL navigation/sidebar fix.
// Every label and hint now ships in both English and Gulf-institutional
// Arabic. The component reads the current language from
// `document.documentElement.lang` after hydration and renders the matching
// language. AR text gets `lang="ar" dir="rtl"` + bidi isolation. Group
// labels and the "staged" badge re-use the existing bilingual entries
// already published in `bilingualBusinessLabels.ts`. English mode is
// byte-identical to the IR-44C-R2 baseline.
//
// Allowed scope: this file only. No backend, no API, no fetch.

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  V2_IR44C_R2_SIDEBAR_GROUPS,
  V2_IR44C_R2_STAGED_BADGE,
  V2_IR47_NAV_LABELS,
} from "@/lib/v2/data/bilingualBusinessLabels";
import type { Lang } from "@/lib/i18n";

export type WorkspaceId =
  | "overview"
  | "map"
  | "workflows"
  | "formula"
  | "evidence"
  | "observatory"
  | "connections"
  | "applications"
  | "developer"
  | "governance";

export type SidebarGroupId =
  | "surface"
  | "intelligence_os"
  | "data_layer"
  | "platform"
  | "governance";

interface WorkspaceItem {
  kind: "workspace";
  id: WorkspaceId;
  label: string;
  label_ar: string;
  group: SidebarGroupId;
  hint: string;
  hint_ar: string;
}

interface StagedItem {
  kind: "staged";
  id: string; // arbitrary slug, not a workspace id
  label: string;
  label_ar: string;
  group: SidebarGroupId;
  hint: string;
  hint_ar: string;
}

// IR-47 — sidebar items that point to a real V2 route outside the
// /v2/overview shell (rendered as <Link href="...">). Distinct from
// `workspace` (in-page state switch) and `staged` (non-clickable).
interface ExternalItem {
  kind: "external";
  id: string;
  href: string;
  label: string;
  label_ar: string;
  group: SidebarGroupId;
  hint: string;
  hint_ar: string;
}

export type NavItem = WorkspaceItem | StagedItem | ExternalItem;

// IR-45R2 — read the page-level `<html lang>` set by the server layout
// (driven by the gcc_lang cookie) after hydration. Returns "en" until
// the client has mounted, then resolves to the actual document language.
// Standard 1-tick hydration flash, same pattern used elsewhere in the
// repo for cookie-driven client surfaces.
function useLang(): Lang {
  const [lang, setLang] = useState<Lang>("en");
  useEffect(() => {
    if (typeof document !== "undefined" && document.documentElement.lang === "ar") {
      setLang("ar");
    }
  }, []);
  return lang;
}

// IR-44C-R2 — 5-group structure.
//
// `staged: true` items are non-clickable; they appear in the rail with
// a "reserved" micro-badge so the OS journey reads at a glance without
// inventing a fake working route.
//
// Note: "Operating Ontology" is the IR-44C-R2 label for the existing
// `developer` workspace (DeveloperOntologyLayer.tsx) — the component
// IS the ontology layer; the label simply expresses that more
// institutionally. The platform group's "Developer" surface is reserved
// for a future developer-reference catalogue that is distinct from the
// ontology layer.
export const NAV_ITEMS: NavItem[] = [
  // ---- Surface --------------------------------------------------
  { kind: "workspace", id: "overview", group: "surface", label: "Overview",            label_ar: "العرض العام",       hint: "Decision Intelligence OS surface", hint_ar: "سطح نظام ذكاء القرار" },
  { kind: "workspace", id: "map",      group: "surface", label: "Map Surface",         label_ar: "سطح الخريطة",       hint: "Riyadh map workspace",             hint_ar: "بيئة عمل خريطة الرياض" },
  { kind: "staged",    id: "staged-saudi-coverage", group: "surface", label: "Saudi Coverage",    label_ar: "التغطية السعودية",     hint: "Staged · IR-44B Saudi National Coverage Architecture", hint_ar: "مرحلي · معمارية التغطية الوطنية السعودية" },
  { kind: "staged",    id: "staged-riyadh-active",  group: "surface", label: "Riyadh Active Lane", label_ar: "مسار الرياض النشط",   hint: "Top-nav route · /v2/saudi-riyadh",                     hint_ar: "مسار في القائمة العلوية · /v2/saudi-riyadh" },

  // ---- Intelligence OS -----------------------------------------
  { kind: "workspace", id: "developer", group: "intelligence_os", label: "Operating Ontology", label_ar: "نموذج التشغيل والقرار", hint: "Object model · ontology layer",                       hint_ar: "نموذج الكائنات · طبقة الأنطولوجيا" },
  { kind: "staged",    id: "staged-evidence-intelligence", group: "intelligence_os", label: "Evidence Intelligence", label_ar: "ذكاء الأدلة",        hint: "Staged · positioning card already on Overview",        hint_ar: "مرحلي · بطاقة التموضع موجودة على العرض العام" },
  { kind: "staged",    id: "staged-template-gallery",       group: "intelligence_os", label: "Template Gallery",       label_ar: "معرض القوالب",       hint: "Staged · IR-44A2 taxonomy · no surface yet",            hint_ar: "مرحلي · تصنيف IR-44A2 · لا توجد واجهة بعد" },
  { kind: "workspace", id: "workflows", group: "intelligence_os", label: "Workflow Engine",     label_ar: "محرك سير العمل",    hint: "14 workflow families · 60 templates",                  hint_ar: "14 عائلة سير عمل · 60 قالباً" },
  { kind: "workspace", id: "formula",   group: "intelligence_os", label: "Formula Engine",      label_ar: "محرك المعادلات",   hint: "Decision Formula & Relationship Engine",                hint_ar: "محرك معادلات وعلاقات القرار" },
  { kind: "staged",    id: "staged-scenario-engine",        group: "intelligence_os", label: "Scenario Engine",        label_ar: "محرك السيناريوهات", hint: "Staged · scenario preview lives in top nav",           hint_ar: "مرحلي · معاينة السيناريو في القائمة العلوية" },

  // ---- Data Layer -----------------------------------------------
  { kind: "workspace", id: "evidence",    group: "data_layer", label: "Evidence Explorer",  label_ar: "مستكشف الأدلة",       hint: "Per-token reference list",                              hint_ar: "قائمة مرجعية لكل رمز" },
  { kind: "workspace", id: "observatory", group: "data_layer", label: "Data Observatory",   label_ar: "مرصد البيانات",       hint: "8 evidence categories",                                  hint_ar: "ثماني فئات للأدلة" },
  { kind: "staged",    id: "staged-source-registry",  group: "data_layer", label: "Source Registry",   label_ar: "سجل المصادر",         hint: "Staged · future governed capability",                  hint_ar: "مرحلي · قدرة حوكمية مستقبلية" },
  { kind: "staged",    id: "staged-spatial-indexes",  group: "data_layer", label: "Spatial Indexes",   label_ar: "الفهارس المكانية",    hint: "Staged · IR-44A2 future capability",                   hint_ar: "مرحلي · قدرة مستقبلية ضمن IR-44A2" },
  { kind: "staged",    id: "staged-metadata-review",  group: "data_layer", label: "Metadata Review",   label_ar: "مراجعة البيانات الوصفية", hint: "Staged · future governed capability",              hint_ar: "مرحلي · قدرة حوكمية مستقبلية" },

  // ---- Platform -------------------------------------------------
  { kind: "workspace", id: "connections",  group: "platform", label: "Connections",   label_ar: "الربط والتكامل",     hint: "Local pack · future warehouses",                       hint_ar: "حزمة محلية · مستودعات مستقبلية" },
  { kind: "workspace", id: "applications", group: "platform", label: "Applications",  label_ar: "التطبيقات",          hint: "8 candidate app surfaces",                              hint_ar: "ثماني واجهات تطبيقات مرشحة" },
  // IR-47 — Partner Intelligence Backbone · external V2 route.
  { kind: "external",  id: "ext-partner-backbone",     group: "platform", href: "/v2/partner-backbone", label: V2_IR47_NAV_LABELS.sidebar.en, label_ar: V2_IR47_NAV_LABELS.sidebar.ar, hint: V2_IR47_NAV_LABELS.sidebar_hint.en, hint_ar: V2_IR47_NAV_LABELS.sidebar_hint.ar },
  { kind: "staged",    id: "staged-developer",          group: "platform", label: "Developer",            label_ar: "المطوّر",            hint: "Staged · contract reference · no SDK",                 hint_ar: "مرحلي · مرجع تعاقدي · لا توجد حزمة تطوير" },
  { kind: "staged",    id: "staged-exports-data-room",  group: "platform", label: "Exports / Data Room",  label_ar: "التصدير / غرفة البيانات", hint: "Staged · signed export channel",                  hint_ar: "مرحلي · قناة تصدير موقّعة" },

  // ---- Governance -----------------------------------------------
  { kind: "staged",    id: "staged-review-assurance",  group: "governance", label: "Review Assurance",     label_ar: "ضمان المراجعة",       hint: "Top-nav route · /v2/saudi-riyadh/review-assurance",    hint_ar: "مسار في القائمة العلوية · /v2/saudi-riyadh/review-assurance" },
  { kind: "workspace", id: "governance",               group: "governance", label: "Governance",            label_ar: "الحوكمة",             hint: "Constitutional rail · trust",                           hint_ar: "شريط الحوكمة الدستورية · الثقة" },
  { kind: "staged",    id: "staged-audit-log",         group: "governance", label: "Audit Log",             label_ar: "سجل التدقيق",        hint: "Staged · digest-verified audit trail",                  hint_ar: "مرحلي · سجل تدقيق مُحقَّق رقمياً" },
  { kind: "staged",    id: "staged-human-review-rules", group: "governance", label: "Human Review Rules",  label_ar: "قواعد المراجعة البشرية", hint: "Staged · human-review operating model",          hint_ar: "مرحلي · نموذج تشغيل المراجعة البشرية" },
];

interface Props {
  active: WorkspaceId;
  onSelect: (id: WorkspaceId) => void;
}

// IR-45R2 — workspace-header strings, footer caveat, and staged-badge
// wording in both languages. Constants kept local to keep the diff
// surgical.
const RAIL_HEADER = {
  eyebrow:  { en: "BDII · Workspace",                  ar: "BDII · بيئة العمل" },
  brand:    { en: "GCC Urban Decision Intelligence OS", ar: "نظام ذكاء القرار الحضري الخليجي" },
  surface:  { en: "/v2/overview · single surface",      ar: "/v2/overview · سطح موحد" },
} as const;
const RAIL_FOOTER = {
  en: "Advisory · candidate · municipal review is the sole producer of consequential conclusions.",
  ar: "استشاري · مرشّح · المراجعة البلدية هي المُنتِج الوحيد للاستنتاجات ذات الأثر.",
} as const;

export function LeftNavRail({ active, onSelect }: Props) {
  // IR-45R2 — current language; resolves to "ar" after hydration when
  // the layout's <html lang="ar"> was set by the gcc_lang cookie.
  const lang = useLang();
  const isAr = lang === "ar";
  const pickG = (g: keyof typeof V2_IR44C_R2_SIDEBAR_GROUPS) =>
    isAr ? V2_IR44C_R2_SIDEBAR_GROUPS[g].ar : V2_IR44C_R2_SIDEBAR_GROUPS[g].en;
  const stagedBadge = isAr ? V2_IR44C_R2_STAGED_BADGE.ar : V2_IR44C_R2_STAGED_BADGE.en;
  const groups: Array<{ id: SidebarGroupId; label: string }> = [
    { id: "surface",         label: pickG("surface") },
    { id: "intelligence_os", label: pickG("intelligence_os") },
    { id: "data_layer",      label: pickG("data_layer") },
    { id: "platform",        label: pickG("platform") },
    { id: "governance",      label: pickG("governance") },
  ];
  // Common AR text props applied to localized spans so RTL flows are
  // isolated and won't break neighbouring LTR fragments.
  const arProps = isAr
    ? { lang: "ar", dir: "rtl" as const, className: "[unicode-bidi:isolate]" }
    : {};
  return (
    <nav
      aria-label={isAr ? "تنقّل بيئة العمل" : "Workspace navigation"}
      className="bg-white border-e border-rule h-full flex flex-col"
      data-testid="ir44c-r2-left-nav-rail"
      data-lang={lang}
    >
      <div className="px-3 py-3 border-b border-rule">
        <p
          {...arProps}
          className={`text-[10px] uppercase tracking-wider text-ink-mute font-mono ${isAr ? "[unicode-bidi:isolate]" : ""}`}
        >
          {isAr ? RAIL_HEADER.eyebrow.ar : RAIL_HEADER.eyebrow.en}
        </p>
        <p
          {...arProps}
          className={`mt-1 font-serif text-sm text-ink leading-tight ${isAr ? "[unicode-bidi:isolate]" : ""}`}
        >
          {isAr ? RAIL_HEADER.brand.ar : RAIL_HEADER.brand.en}
        </p>
        <p
          {...arProps}
          className={`mt-0.5 text-[10px] text-ink-mute font-mono ${isAr ? "[unicode-bidi:isolate]" : ""}`}
        >
          {isAr ? RAIL_HEADER.surface.ar : RAIL_HEADER.surface.en}
        </p>
      </div>
      <div className="flex-1 overflow-y-auto">
        {groups.map((g) => {
          const items = NAV_ITEMS.filter((n) => n.group === g.id);
          if (items.length === 0) return null;
          return (
            <div
              key={g.id}
              data-testid={`ir44c-r2-group-${g.id}`}
              className="py-2 border-b border-rule last:border-b-0"
            >
              <p
                {...arProps}
                className={`px-3 pb-1 text-[10px] uppercase tracking-wider text-ink-mute font-mono ${isAr ? "[unicode-bidi:isolate]" : ""}`}
              >
                {g.label}
              </p>
              <ul>
                {items.map((n) => {
                  const label = isAr ? n.label_ar : n.label;
                  const hint  = isAr ? n.hint_ar  : n.hint;
                  const itemArProps = isAr
                    ? { lang: "ar", dir: "rtl" as const }
                    : {};
                  if (n.kind === "staged") {
                    return (
                      <li key={n.id}>
                        <div
                          data-testid={`ir44c-r2-item-${n.id}`}
                          aria-disabled="true"
                          title={hint}
                          {...itemArProps}
                          className={`w-full text-start px-3 py-2 text-sm flex items-baseline gap-2 border-s-2 border-transparent text-ink-mute opacity-60 cursor-not-allowed ${isAr ? "[unicode-bidi:isolate]" : ""}`}
                        >
                          <span className="block font-medium leading-tight">
                            {label}
                          </span>
                          <span className="text-[10px] uppercase tracking-wider font-mono">
                            · {stagedBadge}
                          </span>
                        </div>
                      </li>
                    );
                  }
                  if (n.kind === "external") {
                    // IR-47 — sidebar link to a real V2 route. Rendered
                    // as a Next.js <Link> so the navigation is a true
                    // client-side route change, not an in-page state
                    // switch. No active integration claim; the
                    // destination page carries the boundary line.
                    return (
                      <li key={n.id}>
                        <Link
                          href={n.href}
                          data-testid={`ir44c-r2-item-${n.id}`}
                          title={hint}
                          {...itemArProps}
                          className={[
                            "w-full text-start px-3 py-2 text-sm transition-colors flex items-baseline gap-2",
                            isAr ? "[unicode-bidi:isolate]" : "",
                            "text-ink-soft hover:bg-paper hover:text-ink border-s-2 border-transparent",
                          ].join(" ")}
                        >
                          <span className="block font-medium leading-tight">
                            {label}
                          </span>
                        </Link>
                      </li>
                    );
                  }
                  const isActive = n.id === active;
                  return (
                    <li key={n.id}>
                      <button
                        type="button"
                        data-testid={`ir44c-r2-item-${n.id}`}
                        onClick={() => onSelect(n.id)}
                        aria-pressed={isActive}
                        {...itemArProps}
                        className={[
                          "w-full text-start px-3 py-2 text-sm transition-colors flex items-baseline gap-2",
                          isAr ? "[unicode-bidi:isolate]" : "",
                          isActive
                            ? "bg-accent-soft text-accent border-s-2 border-accent"
                            : "text-ink-soft hover:bg-paper hover:text-ink border-s-2 border-transparent",
                        ].join(" ")}
                      >
                        <span className="block font-medium leading-tight">
                          {label}
                        </span>
                      </button>
                      {isActive && (
                        <p
                          {...itemArProps}
                          className={`px-3 pb-2 text-[10px] text-ink-mute font-mono ${isAr ? "[unicode-bidi:isolate]" : ""}`}
                        >
                          · {hint}
                        </p>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
      <div className="px-3 py-2 border-t border-rule">
        <p
          {...arProps}
          className={`text-[10px] text-ink-mute font-mono leading-snug ${isAr ? "[unicode-bidi:isolate]" : ""}`}
        >
          {isAr ? RAIL_FOOTER.ar : RAIL_FOOTER.en}
        </p>
      </div>
    </nav>
  );
}
