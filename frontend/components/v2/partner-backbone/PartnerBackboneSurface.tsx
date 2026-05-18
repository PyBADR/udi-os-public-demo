"use client";

// IR-47 — Partner Intelligence Backbone Layer.
//
// Cloud-agnostic architecture mapping: turns urban evidence,
// geospatial intelligence, AI explanation, governance, and buyer
// readiness into partner-ready deployment pathways.
//
// All content lives in `frontend/lib/v2/data/bilingualBusinessLabels.ts`
// under the V2_IR47_* exports. Bilingual EN + Gulf-institutional AR,
// rendered side-by-side per the established V2 pattern. Logical
// Tailwind direction utilities only (border-s-*, ps-*, pe-*).
//
// Advisory architecture only. No active cloud integration claim.
// No vendor name in any visible badge. No "official GIS" claim. No
// production deployment claim. No automated decisioning. No
// surveillance framing. No enforcement framing. No return guarantee.
// No real-time framing.

import { useState } from "react";
import {
  V2_IR47_PAGE_HEADER,
  V2_IR47_TAB_LABELS,
  V2_IR47_WORKFLOW_STEPS,
  V2_IR47_CAPABILITY_MAP,
  V2_IR47_CAPABILITY_NOTE,
  V2_IR47_PILOT_READINESS,
  V2_IR47_PARTNER_VALUE,
} from "@/lib/v2/data/bilingualBusinessLabels";

type TabId = "workflow" | "capability" | "readiness" | "value";

const TAB_ORDER: readonly TabId[] = ["workflow", "capability", "readiness", "value"] as const;

export function PartnerBackboneSurface() {
  const [tab, setTab] = useState<TabId>("workflow");
  return (
    <main
      className="bg-paper min-h-screen text-ink"
      data-testid="ir47-partner-backbone-surface"
    >
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <ExecutiveHeader />
        <Tabs active={tab} onSelect={setTab} />
        <section
          aria-labelledby={`ir47-tab-${tab}-title`}
          data-testid={`ir47-tab-${tab}`}
          className="space-y-4"
        >
          {tab === "workflow"  && <WorkflowPanel />}
          {tab === "capability" && <CapabilityPanel />}
          {tab === "readiness"  && <ReadinessPanel />}
          {tab === "value"      && <PartnerValuePanel />}
        </section>
        <PageFooterCaveat />
      </div>
    </main>
  );
}

// -----------------------------------------------------------------
// Header
// -----------------------------------------------------------------
function ExecutiveHeader() {
  const h = V2_IR47_PAGE_HEADER;
  return (
    <header
      data-testid="ir47-page-header"
      className="bg-white border border-rule px-6 py-5 space-y-3"
    >
      <p
        className="text-[11px] uppercase tracking-wider text-ink-mute font-mono space-x-1"
        data-testid="ir47-page-eyebrow"
      >
        <span>{h.eyebrow.en}</span>
        <span
          lang="ar"
          dir="rtl"
          className="font-sans normal-case tracking-normal [unicode-bidi:isolate]"
        >
          · {h.eyebrow.ar}
        </span>
      </p>
      <h1
        id="ir47-page-title"
        className="font-serif text-2xl md:text-3xl text-ink leading-tight"
      >
        {h.title.en}{" "}
        <span
          lang="ar"
          dir="rtl"
          className="font-serif text-lg md:text-xl text-ink-mute [unicode-bidi:isolate]"
        >
          · {h.title.ar}
        </span>
      </h1>
      <p className="text-sm text-ink-soft leading-snug max-w-3xl">
        {h.subtitle.en}
      </p>
      <p
        lang="ar"
        dir="rtl"
        className="text-sm text-ink-soft leading-snug max-w-3xl [unicode-bidi:isolate]"
      >
        {h.subtitle.ar}
      </p>
      <p className="text-[12px] text-ink-mute leading-snug max-w-3xl">
        {h.positioning.en}
      </p>
      <p
        lang="ar"
        dir="rtl"
        className="text-[12px] text-ink-mute leading-snug max-w-3xl [unicode-bidi:isolate]"
      >
        {h.positioning.ar}
      </p>
      <div
        className="border-s-2 border-ink ps-3 py-2 bg-paper text-[12px] text-ink-soft leading-snug max-w-3xl"
        data-testid="ir47-boundary"
      >
        <p>{h.boundary.en}</p>
        <p
          lang="ar"
          dir="rtl"
          className="mt-1 [unicode-bidi:isolate]"
        >
          {h.boundary.ar}
        </p>
      </div>
    </header>
  );
}

// -----------------------------------------------------------------
// Tabs
// -----------------------------------------------------------------
interface TabsProps {
  active: TabId;
  onSelect: (t: TabId) => void;
}
function Tabs({ active, onSelect }: TabsProps) {
  return (
    <nav
      aria-label="Partner Intelligence Backbone tabs"
      data-testid="ir47-tabs"
      className="bg-white border border-rule flex flex-wrap"
    >
      {TAB_ORDER.map((id) => {
        const l = V2_IR47_TAB_LABELS[id];
        const isActive = id === active;
        return (
          <button
            key={id}
            type="button"
            data-testid={`ir47-tab-button-${id}`}
            aria-pressed={isActive}
            onClick={() => onSelect(id)}
            className={[
              "px-4 py-2 text-sm transition-colors border-e border-rule last:border-e-0 text-start",
              isActive
                ? "bg-accent-soft text-accent border-b-2 border-accent"
                : "text-ink-soft hover:bg-paper hover:text-ink",
            ].join(" ")}
          >
            <span>{l.en}</span>
            <span
              lang="ar"
              dir="rtl"
              className="ms-2 text-[11px] font-sans normal-case tracking-normal text-ink-mute [unicode-bidi:isolate]"
            >
              · {l.ar}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

// -----------------------------------------------------------------
// Tab A · Intelligence Workflow
// -----------------------------------------------------------------
function WorkflowPanel() {
  const l = V2_IR47_TAB_LABELS.workflow;
  return (
    <div className="space-y-3" data-testid="ir47-workflow-panel">
      <h2
        id="ir47-tab-workflow-title"
        className="font-serif text-lg text-ink leading-tight"
      >
        {l.en}{" "}
        <span
          lang="ar"
          dir="rtl"
          className="text-ink-mute text-base [unicode-bidi:isolate]"
        >
          · {l.ar}
        </span>
      </h2>
      <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {V2_IR47_WORKFLOW_STEPS.map((s) => (
          <li
            key={s.id}
            data-testid={`ir47-workflow-${s.id}`}
            className="bg-white border border-rule p-3 space-y-2"
          >
            <div className="flex items-baseline gap-2">
              <span className="text-[11px] font-mono text-ink-mute">
                {s.letter}.
              </span>
              <h3 className="font-serif text-sm text-ink leading-tight">
                {s.label_en}{" "}
                <span
                  lang="ar"
                  dir="rtl"
                  className="text-ink-mute text-[12px] [unicode-bidi:isolate]"
                >
                  · {s.label_ar}
                </span>
              </h3>
            </div>
            <p className="text-[12px] text-ink-soft leading-snug">
              {s.description_en}
            </p>
            <p
              lang="ar"
              dir="rtl"
              className="text-[12px] text-ink-soft leading-snug [unicode-bidi:isolate]"
            >
              {s.description_ar}
            </p>
            <dl className="text-[11px] font-mono text-ink-mute space-y-0.5">
              <div className="flex flex-wrap gap-x-1">
                <dt>input:</dt>
                <dd className="text-ink-soft">{s.input_en}</dd>
                <dd
                  lang="ar"
                  dir="rtl"
                  className="text-ink-mute font-sans normal-case [unicode-bidi:isolate]"
                >
                  · {s.input_ar}
                </dd>
              </div>
              <div className="flex flex-wrap gap-x-1">
                <dt>output:</dt>
                <dd className="text-ink-soft">{s.output_en}</dd>
                <dd
                  lang="ar"
                  dir="rtl"
                  className="text-ink-mute font-sans normal-case [unicode-bidi:isolate]"
                >
                  · {s.output_ar}
                </dd>
              </div>
            </dl>
            {s.caveat_en && (
              <p className="text-[11px] text-ink-mute italic leading-snug border-t border-rule pt-2">
                <span>{s.caveat_en}</span>
                {s.caveat_ar && (
                  <span
                    lang="ar"
                    dir="rtl"
                    className="ms-2 [unicode-bidi:isolate]"
                  >
                    · {s.caveat_ar}
                  </span>
                )}
              </p>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

// -----------------------------------------------------------------
// Tab B · Cloud Capability Mapping
// -----------------------------------------------------------------
function CapabilityPanel() {
  const l = V2_IR47_TAB_LABELS.capability;
  return (
    <div className="space-y-3" data-testid="ir47-capability-panel">
      <h2
        id="ir47-tab-capability-title"
        className="font-serif text-lg text-ink leading-tight"
      >
        {l.en}{" "}
        <span
          lang="ar"
          dir="rtl"
          className="text-ink-mute text-base [unicode-bidi:isolate]"
        >
          · {l.ar}
        </span>
      </h2>
      <div className="bg-white border border-rule overflow-x-auto">
        <table className="w-full text-sm text-start border-collapse">
          <thead className="bg-paper">
            <tr className="border-b border-rule">
              <th className="px-3 py-2 text-start text-[11px] uppercase tracking-wider text-ink-mute font-mono">
                Platform Need{" "}
                <span
                  lang="ar"
                  dir="rtl"
                  className="font-sans normal-case tracking-normal [unicode-bidi:isolate]"
                >
                  · حاجة المنصة
                </span>
              </th>
              <th className="px-3 py-2 text-start text-[11px] uppercase tracking-wider text-ink-mute font-mono">
                Partner Capability{" "}
                <span
                  lang="ar"
                  dir="rtl"
                  className="font-sans normal-case tracking-normal [unicode-bidi:isolate]"
                >
                  · قدرة الشريك
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {V2_IR47_CAPABILITY_MAP.map((row) => (
              <tr
                key={row.id}
                data-testid={`ir47-capability-${row.id}`}
                className="border-b border-rule last:border-b-0"
              >
                <td className="px-3 py-2 align-top text-ink leading-snug">
                  <div>{row.need_en}</div>
                  <div
                    lang="ar"
                    dir="rtl"
                    className="text-[12px] text-ink-mute [unicode-bidi:isolate]"
                  >
                    · {row.need_ar}
                  </div>
                </td>
                <td className="px-3 py-2 align-top text-ink leading-snug">
                  <div>{row.capability_en}</div>
                  <div
                    lang="ar"
                    dir="rtl"
                    className="text-[12px] text-ink-mute [unicode-bidi:isolate]"
                  >
                    · {row.capability_ar}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        className="border-s-2 border-ink ps-3 py-2 bg-white text-[12px] text-ink-soft leading-snug"
        data-testid="ir47-capability-note"
      >
        <p>{V2_IR47_CAPABILITY_NOTE.en}</p>
        <p
          lang="ar"
          dir="rtl"
          className="mt-1 [unicode-bidi:isolate]"
        >
          {V2_IR47_CAPABILITY_NOTE.ar}
        </p>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------
// Tab C · Pilot Readiness
// -----------------------------------------------------------------
function readinessToneClass(tone: string): string {
  switch (tone) {
    case "candidate-ready": return "text-ink";
    case "active":          return "text-ink";
    case "required":        return "text-ink";
    case "staged":          return "text-ink-soft";
    case "reference":       return "text-ink-soft";
    case "not-active":      return "text-ink-mute";
    case "not-claimed":     return "text-ink-mute";
    default:                return "text-ink-soft";
  }
}

function ReadinessPanel() {
  const l = V2_IR47_TAB_LABELS.readiness;
  return (
    <div className="space-y-3" data-testid="ir47-readiness-panel">
      <h2
        id="ir47-tab-readiness-title"
        className="font-serif text-lg text-ink leading-tight"
      >
        {l.en}{" "}
        <span
          lang="ar"
          dir="rtl"
          className="text-ink-mute text-base [unicode-bidi:isolate]"
        >
          · {l.ar}
        </span>
      </h2>
      <div className="bg-white border border-rule overflow-x-auto">
        <table className="w-full text-sm text-start border-collapse">
          <thead className="bg-paper">
            <tr className="border-b border-rule">
              <th className="px-3 py-2 text-start text-[11px] uppercase tracking-wider text-ink-mute font-mono">
                Lane{" "}
                <span
                  lang="ar"
                  dir="rtl"
                  className="font-sans normal-case tracking-normal [unicode-bidi:isolate]"
                >
                  · المسار
                </span>
              </th>
              <th className="px-3 py-2 text-start text-[11px] uppercase tracking-wider text-ink-mute font-mono">
                Status{" "}
                <span
                  lang="ar"
                  dir="rtl"
                  className="font-sans normal-case tracking-normal [unicode-bidi:isolate]"
                >
                  · الحالة
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {V2_IR47_PILOT_READINESS.map((row) => (
              <tr
                key={row.id}
                data-testid={`ir47-readiness-${row.id}`}
                className="border-b border-rule last:border-b-0"
              >
                <td className="px-3 py-2 align-top text-ink leading-snug">
                  <div>{row.lane_en}</div>
                  <div
                    lang="ar"
                    dir="rtl"
                    className="text-[12px] text-ink-mute [unicode-bidi:isolate]"
                  >
                    · {row.lane_ar}
                  </div>
                </td>
                <td className={`px-3 py-2 align-top leading-snug ${readinessToneClass(row.tone)}`}>
                  <div className="font-mono text-[12px]">{row.status_en}</div>
                  <div
                    lang="ar"
                    dir="rtl"
                    className="text-[12px] text-ink-mute [unicode-bidi:isolate]"
                  >
                    · {row.status_ar}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------
// Tab D · Partner Value
// -----------------------------------------------------------------
function PartnerValuePanel() {
  const l = V2_IR47_TAB_LABELS.value;
  return (
    <div className="space-y-3" data-testid="ir47-value-panel">
      <h2
        id="ir47-tab-value-title"
        className="font-serif text-lg text-ink leading-tight"
      >
        {l.en}{" "}
        <span
          lang="ar"
          dir="rtl"
          className="text-ink-mute text-base [unicode-bidi:isolate]"
        >
          · {l.ar}
        </span>
      </h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {V2_IR47_PARTNER_VALUE.map((card) => (
          <li
            key={card.id}
            data-testid={`ir47-value-${card.id}`}
            className="bg-white border border-rule p-3 space-y-2"
          >
            <h3 className="font-serif text-sm text-ink leading-tight">
              {card.partner_en}{" "}
              <span
                lang="ar"
                dir="rtl"
                className="text-ink-mute text-[12px] [unicode-bidi:isolate]"
              >
                · {card.partner_ar}
              </span>
            </h3>
            <dl className="text-[12px] text-ink-soft space-y-1">
              <Row label_en="cares about" label_ar="يهتم بـ" v_en={card.care_en} v_ar={card.care_ar} />
              <Row label_en="platform provides" label_ar="تقدّم المنصة" v_en={card.provides_en} v_ar={card.provides_ar} />
              <Row label_en="output" label_ar="المُخرج" v_en={card.output_en} v_ar={card.output_ar} />
            </dl>
            <p className="text-[11px] text-ink-mute italic leading-snug border-t border-rule pt-2">
              <span>{card.boundary_en}</span>
              <span
                lang="ar"
                dir="rtl"
                className="ms-2 [unicode-bidi:isolate]"
              >
                · {card.boundary_ar}
              </span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface RowProps {
  label_en: string;
  label_ar: string;
  v_en: string;
  v_ar: string;
}
function Row({ label_en, label_ar, v_en, v_ar }: RowProps) {
  return (
    <div className="space-y-0.5">
      <dt className="text-[10px] uppercase tracking-wider text-ink-mute font-mono space-x-1">
        <span>{label_en}</span>
        <span
          lang="ar"
          dir="rtl"
          className="font-sans normal-case tracking-normal [unicode-bidi:isolate]"
        >
          · {label_ar}
        </span>
      </dt>
      <dd className="text-ink-soft leading-snug">{v_en}</dd>
      <dd
        lang="ar"
        dir="rtl"
        className="text-ink-mute leading-snug [unicode-bidi:isolate]"
      >
        · {v_ar}
      </dd>
    </div>
  );
}

// -----------------------------------------------------------------
// Page footer caveat — keeps the boundary visible at every tab.
// -----------------------------------------------------------------
function PageFooterCaveat() {
  const h = V2_IR47_PAGE_HEADER;
  return (
    <footer
      data-testid="ir47-page-footer"
      className="bg-white border border-rule px-4 py-3"
    >
      <p className="text-[11px] font-mono text-ink-mute leading-snug">
        {h.boundary.en}
      </p>
      <p
        lang="ar"
        dir="rtl"
        className="mt-1 text-[11px] font-mono text-ink-mute leading-snug [unicode-bidi:isolate]"
      >
        {h.boundary.ar}
      </p>
    </footer>
  );
}
