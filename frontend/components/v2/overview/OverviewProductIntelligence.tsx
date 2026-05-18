"use client";

// IR-46 — Overview Product Intelligence Compression Layer.
//
// Five new executive clusters that compress /v2/overview into a buyer-
// readable product-intelligence surface, plus a sixth (Buyer Pack
// Layer) that re-uses the IR-45 BuyerPackCatalog. The brief calls the
// Product Intelligence Flow "the heart of the page"; everything else
// orbits that flow.
//
// All visible strings live in `frontend/lib/v2/data/bilingualBusinessLabels.ts`.
// Bilingual EN + AR, Gulf-institutional Arabic, rendered side-by-side
// per the established V2 pattern (no language switch). Logical Tailwind
// only (border-s-*, ps-*, pe-*). Institutional white surface.
// No vendor name. No production claim. No official-GIS claim.
// No automated-decisioning framing. No surveillance framing.
// No enforcement framing. No return-guarantee framing. No
// real-time framing.

import { HEADLINE_METRICS } from "@/lib/v2/overview/data";
import {
  V2_IR45_BUYER_LENSES,
  V2_IR46_INTELLIGENCE_STRIP,
  V2_IR46_PRODUCT_FLOW,
  V2_IR46_FUSION_LAYER,
  V2_IR46_READINESS_PANEL,
  V2_IR46_EXECUTIVE_PREVIEW,
  V2_IR46_SECTION_LABELS,
} from "@/lib/v2/data/bilingualBusinessLabels";

// -----------------------------------------------------------------
// (1) Executive Intelligence Strip — 4 advisory metrics
// -----------------------------------------------------------------
export function ExecutiveIntelligenceStrip() {
  // Source the metric values from the existing HEADLINE_METRICS where
  // a meaningful mapping exists; "Buyer Packs" maps to the IR-45
  // buyer-lens count surfaced by the BuyerPackCatalog.
  const m = HEADLINE_METRICS;
  const values: Record<string, number> = {
    "signals-ingested": m.source_family_count,
    "evidence-objects": m.reviewed_token_count,
    "readiness-paths":  m.readiness_band_count,
    "buyer-packs":      V2_IR45_BUYER_LENSES.length,
  };
  return (
    <section
      aria-labelledby="ir46-intelligence-strip-title"
      data-testid="ir46-intelligence-strip"
      className="bg-paper border border-rule px-6 py-5 space-y-3"
    >
      <header className="space-y-1">
        <h2
          id="ir46-intelligence-strip-title"
          className="font-serif text-2xl md:text-3xl text-ink leading-tight"
        >
          {V2_IR46_INTELLIGENCE_STRIP.title.en}{" "}
          <span
            lang="ar"
            dir="rtl"
            className="font-serif text-lg md:text-xl text-ink-mute [unicode-bidi:isolate]"
          >
            · {V2_IR46_INTELLIGENCE_STRIP.title.ar}
          </span>
        </h2>
        <p className="text-sm text-ink-soft leading-snug max-w-3xl">
          {V2_IR46_INTELLIGENCE_STRIP.subtitle.en}
        </p>
        <p
          lang="ar"
          dir="rtl"
          className="text-sm text-ink-soft leading-snug max-w-3xl [unicode-bidi:isolate]"
        >
          {V2_IR46_INTELLIGENCE_STRIP.subtitle.ar}
        </p>
      </header>
      <dl className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {V2_IR46_INTELLIGENCE_STRIP.metrics.map((metric) => (
          <div
            key={metric.id}
            data-testid={`ir46-metric-${metric.id}`}
            className="bg-white border border-rule px-3 py-2"
          >
            <dt className="text-[11px] uppercase tracking-wider text-ink-mute font-mono space-x-1">
              <span>{metric.label_en}</span>
              <span
                lang="ar"
                dir="rtl"
                className="font-sans normal-case tracking-normal [unicode-bidi:isolate]"
              >
                · {metric.label_ar}
              </span>
            </dt>
            <dd className="mt-1 font-serif text-2xl text-ink leading-none tabular-nums">
              {values[metric.id]}
            </dd>
            <p className="mt-1 text-[10px] text-ink-mute font-mono space-x-1">
              <span>{metric.caveat_en}</span>
              <span
                lang="ar"
                dir="rtl"
                className="font-sans normal-case tracking-normal [unicode-bidi:isolate]"
              >
                · {metric.caveat_ar}
              </span>
            </p>
          </div>
        ))}
      </dl>
    </section>
  );
}

// -----------------------------------------------------------------
// (2) Product Intelligence Flow — 5-step stepped flow
// -----------------------------------------------------------------
export function ProductIntelligenceFlow() {
  return (
    <section
      aria-labelledby="ir46-flow-title"
      data-testid="ir46-product-flow"
      className="space-y-4"
    >
      <header className="space-y-1">
        <p
          id="ir46-flow-title"
          className="text-[11px] uppercase tracking-wider text-ink-mute font-mono space-x-1"
        >
          <span>{V2_IR46_PRODUCT_FLOW.eyebrow.en}</span>
          <span
            lang="ar"
            dir="rtl"
            className="font-sans normal-case tracking-normal [unicode-bidi:isolate]"
          >
            · {V2_IR46_PRODUCT_FLOW.eyebrow.ar}
          </span>
        </p>
        <p className="text-sm text-ink-soft leading-snug max-w-3xl">
          {V2_IR46_PRODUCT_FLOW.intro.en}
        </p>
        <p
          lang="ar"
          dir="rtl"
          className="text-sm text-ink-soft leading-snug max-w-3xl [unicode-bidi:isolate]"
        >
          {V2_IR46_PRODUCT_FLOW.intro.ar}
        </p>
      </header>
      <ol className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {V2_IR46_PRODUCT_FLOW.steps.map((step, idx) => (
          <li
            key={step.id}
            data-testid={`ir46-flow-step-${step.id}`}
            className="bg-white border border-rule p-4 flex flex-col gap-2 min-w-0"
          >
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-[10px] uppercase tracking-wider text-ink-mute font-mono">
                {String(idx + 1).padStart(2, "0")}
              </span>
              {idx < V2_IR46_PRODUCT_FLOW.steps.length - 1 && (
                <span aria-hidden="true" className="text-ink-mute font-mono">
                  →
                </span>
              )}
            </div>
            <h3 className="font-serif text-base text-ink leading-tight">
              {step.label_en}
            </h3>
            <p
              lang="ar"
              dir="rtl"
              className="font-serif text-sm text-ink-mute leading-tight [unicode-bidi:isolate]"
            >
              {step.label_ar}
            </p>
            <p className="text-[12px] text-ink-soft leading-relaxed">
              {step.sentence_en}
            </p>
            <p
              lang="ar"
              dir="rtl"
              className="text-[12px] text-ink-soft leading-relaxed [unicode-bidi:isolate]"
            >
              {step.sentence_ar}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

// -----------------------------------------------------------------
// (3) Urban Signal Fusion Layer — 5 compact cards
// -----------------------------------------------------------------
export function UrbanSignalFusionLayer() {
  return (
    <section
      aria-labelledby="ir46-fusion-title"
      data-testid="ir46-fusion-layer"
      className="space-y-3"
    >
      <header className="space-y-1">
        <p
          id="ir46-fusion-title"
          className="text-[11px] uppercase tracking-wider text-ink-mute font-mono space-x-1"
        >
          <span>{V2_IR46_FUSION_LAYER.eyebrow.en}</span>
          <span
            lang="ar"
            dir="rtl"
            className="font-sans normal-case tracking-normal [unicode-bidi:isolate]"
          >
            · {V2_IR46_FUSION_LAYER.eyebrow.ar}
          </span>
        </p>
        <p className="text-sm text-ink-soft leading-snug max-w-3xl">
          {V2_IR46_FUSION_LAYER.intro.en}
        </p>
        <p
          lang="ar"
          dir="rtl"
          className="text-sm text-ink-soft leading-snug max-w-3xl [unicode-bidi:isolate]"
        >
          {V2_IR46_FUSION_LAYER.intro.ar}
        </p>
      </header>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {V2_IR46_FUSION_LAYER.cards.map((card) => (
          <li
            key={card.id}
            data-testid={`ir46-fusion-${card.id}`}
            className="bg-white border border-rule p-4 flex flex-col gap-2 min-w-0"
          >
            <h4 className="font-serif text-base text-ink leading-tight">
              {card.title_en}
            </h4>
            <p
              lang="ar"
              dir="rtl"
              className="font-serif text-sm text-ink-mute leading-tight [unicode-bidi:isolate]"
            >
              {card.title_ar}
            </p>
            <p className="text-[12px] text-ink-soft leading-relaxed">
              {card.platform_meaning_en}
            </p>
            <p
              lang="ar"
              dir="rtl"
              className="text-[12px] text-ink-soft leading-relaxed [unicode-bidi:isolate]"
            >
              {card.platform_meaning_ar}
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-wider text-ink-mute font-mono space-x-1">
              <span>· {card.status_en}</span>
              <span
                lang="ar"
                dir="rtl"
                className="font-sans normal-case tracking-normal [unicode-bidi:isolate]"
              >
                · {card.status_ar}
              </span>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

// -----------------------------------------------------------------
// (4) Decision Readiness Panel — 5 states + boundary
// -----------------------------------------------------------------
export function DecisionReadinessPanel() {
  const toneClass = (tone: "ready" | "review" | "limited" | "insufficient" | "blocked") => {
    switch (tone) {
      case "ready":        return "border-s-2 border-ink bg-white";
      case "review":       return "border-s-2 border-rule bg-white";
      case "limited":      return "border-s-2 border-rule bg-panel";
      case "insufficient": return "border-s-2 border-rule bg-panel";
      case "blocked":      return "border-s-2 border-ink bg-panel";
    }
  };
  return (
    <section
      aria-labelledby="ir46-readiness-title"
      data-testid="ir46-readiness-panel"
      className="bg-paper border border-rule px-6 py-5 space-y-4"
    >
      <header className="space-y-1">
        <h3
          id="ir46-readiness-title"
          className="font-serif text-lg md:text-xl text-ink leading-tight"
        >
          {V2_IR46_READINESS_PANEL.eyebrow.en}{" "}
          <span
            lang="ar"
            dir="rtl"
            className="font-serif text-base text-ink-mute [unicode-bidi:isolate]"
          >
            · {V2_IR46_READINESS_PANEL.eyebrow.ar}
          </span>
        </h3>
        <p className="text-sm text-ink-soft leading-snug max-w-3xl">
          {V2_IR46_READINESS_PANEL.intro.en}
        </p>
        <p
          lang="ar"
          dir="rtl"
          className="text-sm text-ink-soft leading-snug max-w-3xl [unicode-bidi:isolate]"
        >
          {V2_IR46_READINESS_PANEL.intro.ar}
        </p>
      </header>
      <ul className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {V2_IR46_READINESS_PANEL.states.map((state) => (
          <li
            key={state.id}
            data-testid={`ir46-readiness-${state.id}`}
            className={`${toneClass(state.tone)} ps-3 pe-3 py-2 flex flex-col gap-1 min-w-0`}
          >
            <p className="text-[11px] uppercase tracking-wider text-ink-mute font-mono">
              {state.tone}
            </p>
            <p className="text-sm text-ink leading-snug">{state.label_en}</p>
            <p
              lang="ar"
              dir="rtl"
              className="text-[13px] text-ink-mute leading-snug [unicode-bidi:isolate]"
            >
              {state.label_ar}
            </p>
            <p className="mt-1 text-[12px] text-ink-soft leading-relaxed">
              {state.description_en}
            </p>
            <p
              lang="ar"
              dir="rtl"
              className="text-[12px] text-ink-soft leading-relaxed [unicode-bidi:isolate]"
            >
              {state.description_ar}
            </p>
          </li>
        ))}
      </ul>
      <div
        data-testid="ir46-readiness-boundary"
        className="border-s-2 border-ink ps-4 pt-1 space-y-1 max-w-3xl"
      >
        <p className="text-sm text-ink font-medium leading-relaxed">
          {V2_IR46_READINESS_PANEL.boundary.en}
        </p>
        <p
          lang="ar"
          dir="rtl"
          className="text-sm text-ink font-medium leading-relaxed [unicode-bidi:isolate]"
        >
          {V2_IR46_READINESS_PANEL.boundary.ar}
        </p>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------
// (6) 75-Second Executive Preview — compact stepped block + CTA
// -----------------------------------------------------------------
interface ExecutivePreviewCTAProps {
  /** If passed, the CTA button will switch to the named in-page workspace. */
  onOpenWorkspace?: (id: "workflows" | "evidence" | "applications") => void;
}
export function ExecutivePreviewCTA({ onOpenWorkspace }: ExecutivePreviewCTAProps = {}) {
  return (
    <section
      aria-labelledby="ir46-preview-title"
      data-testid="ir46-executive-preview"
      className="bg-white border border-rule px-6 py-5 space-y-4"
    >
      <header className="flex items-start justify-between gap-4 flex-wrap">
        <div className="space-y-1 min-w-0">
          <p
            id="ir46-preview-title"
            className="text-[11px] uppercase tracking-wider text-ink-mute font-mono space-x-1"
          >
            <span>{V2_IR46_EXECUTIVE_PREVIEW.eyebrow.en}</span>
            <span
              lang="ar"
              dir="rtl"
              className="font-sans normal-case tracking-normal [unicode-bidi:isolate]"
            >
              · {V2_IR46_EXECUTIVE_PREVIEW.eyebrow.ar}
            </span>
          </p>
          <p className="text-sm text-ink-soft leading-snug max-w-3xl">
            {V2_IR46_EXECUTIVE_PREVIEW.intro.en}
          </p>
          <p
            lang="ar"
            dir="rtl"
            className="text-sm text-ink-soft leading-snug max-w-3xl [unicode-bidi:isolate]"
          >
            {V2_IR46_EXECUTIVE_PREVIEW.intro.ar}
          </p>
        </div>
        <button
          type="button"
          data-testid="ir46-preview-cta"
          onClick={() => onOpenWorkspace?.("workflows")}
          className="px-3 py-2 text-sm font-medium bg-accent text-white border border-accent hover:bg-ink shrink-0 flex flex-col items-start gap-0.5"
        >
          <span>{V2_IR46_EXECUTIVE_PREVIEW.cta_label.en}</span>
          <span
            lang="ar"
            dir="rtl"
            className="text-[12px] font-normal text-white/80 [unicode-bidi:isolate]"
          >
            {V2_IR46_EXECUTIVE_PREVIEW.cta_label.ar}
          </span>
        </button>
      </header>
      <ol className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {V2_IR46_EXECUTIVE_PREVIEW.steps.map((step, idx) => (
          <li
            key={step.range}
            data-testid={`ir46-preview-step-${idx}`}
            className="bg-paper border border-rule p-3 flex flex-col gap-1 min-w-0"
          >
            <p className="text-[10px] uppercase tracking-wider text-ink-mute font-mono">
              {step.range}
            </p>
            <p className="text-[12px] text-ink leading-snug">
              {step.label_en}
            </p>
            <p
              lang="ar"
              dir="rtl"
              className="text-[12px] text-ink-mute leading-snug [unicode-bidi:isolate]"
            >
              {step.label_ar}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

// -----------------------------------------------------------------
// (5) Buyer Pack Layer — local wrapper that reuses IR-45's content
// via an eyebrow header (per the IR-46 brief). The actual cards are
// rendered by the existing BuyerPackCatalog component — IR-46 does
// not duplicate that data. Page.tsx renders this header just above
// <BuyerPackCatalog />.
// -----------------------------------------------------------------
export function BuyerPackLayerHeader() {
  const L = V2_IR46_SECTION_LABELS;
  return (
    <section
      aria-labelledby="ir46-buyer-pack-header-title"
      data-testid="ir46-buyer-pack-header"
      className="space-y-1"
    >
      <p
        id="ir46-buyer-pack-header-title"
        className="text-[11px] uppercase tracking-wider text-ink-mute font-mono space-x-1"
      >
        <span>{L.buyer_pack_eyebrow.en}</span>
        <span
          lang="ar"
          dir="rtl"
          className="font-sans normal-case tracking-normal [unicode-bidi:isolate]"
        >
          · {L.buyer_pack_eyebrow.ar}
        </span>
      </p>
      <p className="text-sm text-ink-soft leading-snug max-w-3xl">
        {L.buyer_pack_intro.en}
      </p>
      <p
        lang="ar"
        dir="rtl"
        className="text-sm text-ink-soft leading-snug max-w-3xl [unicode-bidi:isolate]"
      >
        {L.buyer_pack_intro.ar}
      </p>
    </section>
  );
}

// -----------------------------------------------------------------
// Analyst-depth disclosure caveat — header copy for the <details>
// element wrapping the deeper mode-driven analyst surface. The
// actual <details>/<summary> is rendered in page.tsx so it can
// wrap heterogeneous content (DynamicModeSwitcher + mode panels).
// -----------------------------------------------------------------
export function AnalystDepthCaveat() {
  const L = V2_IR46_SECTION_LABELS;
  return (
    <div data-testid="ir46-analyst-caveat" className="px-3 py-2 space-y-1">
      <p className="text-[12px] text-ink-soft leading-relaxed">
        {L.analyst_depth_caveat.en}
      </p>
      <p
        lang="ar"
        dir="rtl"
        className="text-[12px] text-ink-soft leading-relaxed [unicode-bidi:isolate]"
      >
        {L.analyst_depth_caveat.ar}
      </p>
    </div>
  );
}
