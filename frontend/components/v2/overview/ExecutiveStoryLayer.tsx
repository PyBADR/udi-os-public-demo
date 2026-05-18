"use client";

// IR-45 — Executive 30-Second Story + Buyer Pack Layer.
//
// Top-of-page executive story for /v2/overview. Composes five sub-
// sections in institutional white surface:
//
//   1. Hero          — eyebrow · title · subtitle · bilingual definition
//   2. Journey strip — 8-step Saudi-anchored decision journey
//   3. Status strip  — Riyadh / Saudi Coverage / Kuwait / GCC posture
//   4. 75-Second Executive Briefing
//   5. Intelligence Layers summary (7 active + 2 gated future)
//
// All visible strings live in `frontend/lib/v2/data/bilingualBusinessLabels.ts`.
// No vendor name. No production claims, no official-GIS claims, no
// automated-decisioning, no surveillance, no enforcement, no return-
// guarantee framing. Advanced ML, simulation, and physics-informed
// modeling are rendered as gated future capabilities only. Logical
// Tailwind only (border-s-*, ps-*, pe-*).

import {
  V2_IR45_HERO,
  V2_IR45_DECISION_JOURNEY,
  V2_IR45_STATUS_STRIP,
  V2_IR45_EXECUTIVE_BRIEFING,
  V2_IR45_INTELLIGENCE_LAYERS,
  V2_IR45_SECTION_LABELS as L,
} from "@/lib/v2/data/bilingualBusinessLabels";

// IR-45 — full layer (retained for backwards compatibility; not used by
// /v2/overview after IR-45R2). Renders all 5 sub-sections in one section.
export function ExecutiveStoryLayer() {
  return (
    <section
      aria-labelledby="ir45-executive-story-title"
      data-testid="ir45-executive-story-layer"
      className="space-y-6"
    >
      <Hero />
      <DecisionJourneyStrip />
      <StatusStrip />
      <ExecutiveBriefingBlock />
      <IntelligenceLayersSummary />
    </section>
  );
}

// IR-45R2 — Header band: rendered ABOVE the Riyadh map operating surface
// so the 30-second executive story arrives in the first fold. Wraps the
// hero, the 8-step decision journey, and the 4-item market posture strip.
export function ExecutiveStoryHeader() {
  return (
    <section
      aria-labelledby="ir45-executive-story-title"
      data-testid="ir45-executive-story-header"
      className="space-y-6"
    >
      <Hero />
      <DecisionJourneyStrip />
      <StatusStrip />
    </section>
  );
}

// IR-45R2 — Detail band: rendered AFTER the Riyadh map operating surface
// and the metric strip. Wraps the 75-second executive briefing and the
// 9-item intelligence-layers summary.
export function ExecutiveStoryDetail() {
  return (
    <section
      aria-label="Executive story detail"
      data-testid="ir45-executive-story-detail"
      className="space-y-6"
    >
      <ExecutiveBriefingBlock />
      <IntelligenceLayersSummary />
    </section>
  );
}

// -----------------------------------------------------------------
// 1. Hero — eyebrow · title · subtitle · bilingual definition
// -----------------------------------------------------------------
function Hero() {
  return (
    <header
      data-testid="ir45-hero"
      className="bg-paper border border-rule px-6 py-6 space-y-3"
    >
      <p className="text-[11px] uppercase tracking-wider text-ink-mute font-mono">
        <span>{V2_IR45_HERO.eyebrow.en}</span>{" "}
        <span
          lang="ar"
          dir="rtl"
          className="font-sans normal-case tracking-normal [unicode-bidi:isolate]"
        >
          · {V2_IR45_HERO.eyebrow.ar}
        </span>
      </p>
      <h2
        id="ir45-executive-story-title"
        className="font-serif text-2xl md:text-3xl text-ink leading-tight"
      >
        {V2_IR45_HERO.title.en}{" "}
        <span
          lang="ar"
          dir="rtl"
          className="font-serif text-lg md:text-xl text-ink-mute [unicode-bidi:isolate]"
        >
          · {V2_IR45_HERO.title.ar}
        </span>
      </h2>
      <p className="text-sm md:text-base text-ink-soft leading-snug max-w-3xl">
        {V2_IR45_HERO.subtitle.en}
      </p>
      <p
        lang="ar"
        dir="rtl"
        className="text-sm md:text-base text-ink-soft leading-snug max-w-3xl [unicode-bidi:isolate]"
      >
        {V2_IR45_HERO.subtitle.ar}
      </p>
      <div
        data-testid="ir45-hero-definition"
        className="border-s-2 border-rule ps-4 max-w-3xl space-y-2 pt-1"
      >
        <p className="text-sm text-ink-soft leading-relaxed">
          {V2_IR45_HERO.definition.en}
        </p>
        <p
          lang="ar"
          dir="rtl"
          className="text-sm text-ink-soft leading-relaxed [unicode-bidi:isolate]"
        >
          {V2_IR45_HERO.definition.ar}
        </p>
      </div>
    </header>
  );
}

// -----------------------------------------------------------------
// 2. Decision Journey Strip — 8 steps with arrow separators
// -----------------------------------------------------------------
function DecisionJourneyStrip() {
  return (
    <section
      aria-labelledby="ir45-journey-title"
      data-testid="ir45-journey-strip"
      className="bg-white border border-rule px-6 py-4 space-y-3"
    >
      <p
        id="ir45-journey-title"
        className="text-[11px] uppercase tracking-wider text-ink-mute font-mono"
      >
        <span>{L.journey_eyebrow.en}</span>{" "}
        <span
          lang="ar"
          dir="rtl"
          className="font-sans normal-case tracking-normal [unicode-bidi:isolate]"
        >
          · {L.journey_eyebrow.ar}
        </span>
      </p>
      <ol className="flex flex-wrap items-baseline gap-x-2 gap-y-2 text-[13px] text-ink-soft">
        {V2_IR45_DECISION_JOURNEY.map((step, idx) => (
          <li
            key={step.id}
            data-testid={`ir45-journey-step-${step.id}`}
            className="inline-flex items-baseline gap-2"
          >
            {idx > 0 && (
              <span aria-hidden="true" className="text-ink-mute font-mono">
                →
              </span>
            )}
            <span className="inline-flex items-baseline gap-1.5">
              <span className="text-ink">{step.en}</span>
              <span
                lang="ar"
                dir="rtl"
                className="text-ink-mute [unicode-bidi:isolate]"
              >
                · {step.ar}
              </span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

// -----------------------------------------------------------------
// 3. Status Strip — Riyadh / Saudi Coverage / Kuwait / GCC
// -----------------------------------------------------------------
function StatusStrip() {
  const toneClass = (tone: "active" | "staged" | "reference" | "context") => {
    switch (tone) {
      case "active":
        return "border-s-2 border-ink bg-white";
      case "staged":
        return "border-s-2 border-rule bg-panel";
      case "reference":
        return "border-s-2 border-rule bg-white";
      case "context":
        return "border-s-2 border-rule bg-white";
    }
  };
  return (
    <section
      aria-labelledby="ir45-status-title"
      data-testid="ir45-status-strip"
      className="space-y-2"
    >
      <p
        id="ir45-status-title"
        className="text-[11px] uppercase tracking-wider text-ink-mute font-mono"
      >
        <span>{L.status_eyebrow.en}</span>{" "}
        <span
          lang="ar"
          dir="rtl"
          className="font-sans normal-case tracking-normal [unicode-bidi:isolate]"
        >
          · {L.status_eyebrow.ar}
        </span>
      </p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {V2_IR45_STATUS_STRIP.map((item) => (
          <li
            key={item.id}
            data-testid={`ir45-status-${item.id}`}
            className={`${toneClass(item.tone)} ps-3 pe-3 py-2 flex flex-col gap-1 min-w-0`}
          >
            <p className="text-[10px] uppercase tracking-wider text-ink-mute font-mono">
              {item.tone === "active"
                ? "active · ink"
                : item.tone === "staged"
                ? "staged · phase 2"
                : item.tone === "reference"
                ? "baseline · reference"
                : "context · regional"}
            </p>
            <p className="text-sm text-ink leading-snug">
              {item.label_en}
            </p>
            <p
              lang="ar"
              dir="rtl"
              className="text-[13px] text-ink-mute leading-snug [unicode-bidi:isolate]"
            >
              {item.label_ar}
            </p>
            <p className="mt-1 text-[12px] text-ink-soft leading-relaxed">
              {item.status_en}
            </p>
            <p
              lang="ar"
              dir="rtl"
              className="text-[12px] text-ink-soft leading-relaxed [unicode-bidi:isolate]"
            >
              {item.status_ar}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

// -----------------------------------------------------------------
// 4. 75-Second Executive Briefing
// -----------------------------------------------------------------
function ExecutiveBriefingBlock() {
  return (
    <section
      aria-labelledby="ir45-briefing-title"
      data-testid="ir45-executive-briefing"
      className="bg-white border border-rule px-6 py-5 space-y-4"
    >
      <h3
        id="ir45-briefing-title"
        className="font-serif text-lg md:text-xl text-ink leading-tight"
      >
        {V2_IR45_EXECUTIVE_BRIEFING.title.en}{" "}
        <span
          lang="ar"
          dir="rtl"
          className="font-serif text-base text-ink-mute [unicode-bidi:isolate]"
        >
          · {V2_IR45_EXECUTIVE_BRIEFING.title.ar}
        </span>
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 max-w-5xl">
        <div className="space-y-3 min-w-0">
          {V2_IR45_EXECUTIVE_BRIEFING.body_en.map((p, i) => (
            <p
              key={`en-${i}`}
              className="text-[13px] text-ink-soft leading-relaxed"
            >
              {p}
            </p>
          ))}
        </div>
        <div
          lang="ar"
          dir="rtl"
          className="space-y-3 min-w-0 [unicode-bidi:isolate]"
        >
          {V2_IR45_EXECUTIVE_BRIEFING.body_ar.map((p, i) => (
            <p
              key={`ar-${i}`}
              className="text-[13px] text-ink-soft leading-relaxed"
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------
// 5. Intelligence Layers Summary — 7 active + 2 gated future
// -----------------------------------------------------------------
function IntelligenceLayersSummary() {
  return (
    <section
      aria-labelledby="ir45-intelligence-title"
      data-testid="ir45-intelligence-layers"
      className="space-y-3"
    >
      <p
        id="ir45-intelligence-title"
        className="text-[11px] uppercase tracking-wider text-ink-mute font-mono"
      >
        <span>{L.intelligence_eyebrow.en}</span>{" "}
        <span
          lang="ar"
          dir="rtl"
          className="font-sans normal-case tracking-normal [unicode-bidi:isolate]"
        >
          · {L.intelligence_eyebrow.ar}
        </span>
      </p>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {V2_IR45_INTELLIGENCE_LAYERS.map((layer) => (
          <li
            key={layer.id}
            data-testid={`ir45-intelligence-${layer.id}`}
            className={[
              "border p-4 flex flex-col gap-1 min-w-0",
              layer.gated
                ? "bg-panel border-rule"
                : "bg-white border-rule",
            ].join(" ")}
          >
            <div className="flex items-baseline justify-between gap-2 flex-wrap">
              <h4 className="font-serif text-base text-ink leading-tight">
                {layer.title_en}
              </h4>
              {layer.gated && (
                <span className="text-[10px] uppercase tracking-wider text-ink-mute font-mono">
                  · {L.gated_badge.en}
                </span>
              )}
            </div>
            <p
              lang="ar"
              dir="rtl"
              className="font-serif text-sm text-ink-mute leading-tight [unicode-bidi:isolate]"
            >
              {layer.title_ar}
              {layer.gated && (
                <span className="ms-2 font-mono text-[10px] uppercase tracking-wider text-ink-mute">
                  · {L.gated_badge.ar}
                </span>
              )}
            </p>
            <p className="mt-1 text-[12px] text-ink-soft leading-relaxed">
              {layer.summary_en}
            </p>
            <p
              lang="ar"
              dir="rtl"
              className="text-[12px] text-ink-soft leading-relaxed [unicode-bidi:isolate]"
            >
              {layer.summary_ar}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
