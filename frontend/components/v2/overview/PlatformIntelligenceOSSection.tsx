"use client";

// IR-44C — Intelligence OS UI Positioning Layer.
// A calm institutional section that expresses the three operating
// schools behind the platform: Operating Ontology · Geospatial
// Evidence Intelligence · Workflow Template System. No vendor name
// in any visible string. No surveillance vocabulary. No enforcement vocabulary.
// No official-GIS or official-municipal-integration claim.
// Bilingual labels live in `lib/v2/data/bilingualBusinessLabels.ts`.
//
// Visual posture: institutional white. Bg-paper section frame, white
// inner cards, ink-on-white type, mono eyebrow, serif heading. Logical
// Tailwind spacing only (ms-*/me-*/ps-*/pe-*). Arabic spans rendered
// with lang="ar" dir="rtl" so bidi isolation is preserved.

import { V2_IR44C_INTELLIGENCE_OS as L } from "@/lib/v2/data/bilingualBusinessLabels";

export function PlatformIntelligenceOSSection() {
  return (
    <section
      aria-labelledby="ir44c-intelligence-os-title"
      data-testid="ir44c-intelligence-os-section"
      className="bg-paper border border-rule"
    >
      <div className="px-6 pt-5 pb-6 space-y-6">
        {/* Eyebrow + title */}
        <header className="space-y-1">
          <p className="text-[11px] uppercase tracking-wider text-ink-mute font-mono">
            <span>{L.section_eyebrow.en}</span>{" "}
            <span
              lang="ar"
              dir="rtl"
              className="font-sans normal-case tracking-normal [unicode-bidi:isolate]"
            >
              · {L.section_eyebrow.ar}
            </span>
          </p>
          <h2
            id="ir44c-intelligence-os-title"
            className="font-serif text-xl md:text-2xl text-ink leading-tight"
          >
            {L.section_title.en}{" "}
            <span
              lang="ar"
              dir="rtl"
              className="font-serif text-base text-ink-mute [unicode-bidi:isolate]"
            >
              · {L.section_title.ar}
            </span>
          </h2>
        </header>

        {/* Buyer value sentence */}
        <div
          data-testid="ir44c-buyer-value"
          className="border-s-2 border-rule ps-4 max-w-3xl space-y-2"
        >
          <p className="text-sm text-ink-soft leading-relaxed">
            {L.buyer_value_sentence.en}
          </p>
          <p
            lang="ar"
            dir="rtl"
            className="text-sm text-ink-soft leading-relaxed [unicode-bidi:isolate]"
          >
            {L.buyer_value_sentence.ar}
          </p>
          {/* IR-44C-R3 — second small line, operational framing for the
              four institutional audiences. Mono caption so it complements
              (does not compete with) the buyer-value sentence above. */}
          <p
            data-testid="ir44c-r3-buyer-clarity"
            className="text-[12px] text-ink-mute font-mono leading-relaxed pt-1 flex flex-wrap items-baseline gap-x-2 gap-y-1"
          >
            <span>{L.buyer_value_clarity.en}</span>
            <span
              lang="ar"
              dir="rtl"
              className="font-sans normal-case tracking-normal [unicode-bidi:isolate]"
            >
              · {L.buyer_value_clarity.ar}
            </span>
          </p>
        </div>

        {/* Three cards: Operating Ontology · Geospatial Evidence · Workflow Template */}
        <div
          data-testid="ir44c-three-cards"
          className="grid grid-cols-1 md:grid-cols-3 gap-3"
        >
          <PositioningCard
            testid="ir44c-card-ontology"
            indexLabel="01"
            titleEn={L.card_ontology_title.en}
            titleAr={L.card_ontology_title.ar}
            summaryEn={L.card_ontology_summary.en}
            summaryAr={L.card_ontology_summary.ar}
          />
          <PositioningCard
            testid="ir44c-card-geospatial"
            indexLabel="02"
            titleEn={L.card_geospatial_title.en}
            titleAr={L.card_geospatial_title.ar}
            summaryEn={L.card_geospatial_summary.en}
            summaryAr={L.card_geospatial_summary.ar}
          />
          <PositioningCard
            testid="ir44c-card-workflow"
            indexLabel="03"
            titleEn={L.card_workflow_title.en}
            titleAr={L.card_workflow_title.ar}
            summaryEn={L.card_workflow_summary.en}
            summaryAr={L.card_workflow_summary.ar}
          />
        </div>

        {/* Surfaces note: executive / analyst / future */}
        <div data-testid="ir44c-surfaces-note" className="space-y-2">
          <h3 className="font-serif text-base text-ink leading-tight">
            {L.surfaces_heading.en}{" "}
            <span
              lang="ar"
              dir="rtl"
              className="font-serif text-sm text-ink-mute [unicode-bidi:isolate]"
            >
              · {L.surfaces_heading.ar}
            </span>
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
            <SurfaceTier
              testid="ir44c-surface-executive"
              tone="ink"
              labelEn={L.surface_executive_label.en}
              labelAr={L.surface_executive_label.ar}
              descEn={L.surface_executive_desc.en}
              descAr={L.surface_executive_desc.ar}
            />
            <SurfaceTier
              testid="ir44c-surface-analyst"
              tone="paper"
              labelEn={L.surface_analyst_label.en}
              labelAr={L.surface_analyst_label.ar}
              descEn={L.surface_analyst_desc.en}
              descAr={L.surface_analyst_desc.ar}
            />
            <SurfaceTier
              testid="ir44c-surface-future"
              tone="reserved"
              labelEn={L.surface_future_label.en}
              labelAr={L.surface_future_label.ar}
              descEn={L.surface_future_desc.en}
              descAr={L.surface_future_desc.ar}
            />
          </ul>
        </div>

        {/* What this is / what this is not */}
        <div
          data-testid="ir44c-is-isnot"
          className="grid grid-cols-1 md:grid-cols-2 gap-3"
        >
          <IsBlock
            testid="ir44c-is-block"
            kind="is"
            headingEn={L.what_this_is_heading.en}
            headingAr={L.what_this_is_heading.ar}
            bulletsEn={L.what_this_is_bullets.en}
            bulletsAr={L.what_this_is_bullets.ar}
          />
          <IsBlock
            testid="ir44c-isnot-block"
            kind="isnot"
            headingEn={L.what_this_is_not_heading.en}
            headingAr={L.what_this_is_not_heading.ar}
            bulletsEn={L.what_this_is_not_bullets.en}
            bulletsAr={L.what_this_is_not_bullets.ar}
          />
        </div>
      </div>
    </section>
  );
}

interface CardProps {
  testid: string;
  indexLabel: string;
  titleEn: string;
  titleAr: string;
  summaryEn: string;
  summaryAr: string;
}

function PositioningCard({
  testid,
  indexLabel,
  titleEn,
  titleAr,
  summaryEn,
  summaryAr,
}: CardProps) {
  return (
    <article
      data-testid={testid}
      className="bg-white border border-rule p-4 flex flex-col gap-2 min-w-0"
    >
      <p className="text-[10px] uppercase tracking-wider text-ink-mute font-mono">
        {indexLabel}
      </p>
      <h4 className="font-serif text-base text-ink leading-tight">
        {titleEn}
      </h4>
      <p
        lang="ar"
        dir="rtl"
        className="font-serif text-sm text-ink-mute leading-tight [unicode-bidi:isolate]"
      >
        {titleAr}
      </p>
      <p className="mt-1 text-[13px] text-ink-soft leading-relaxed">
        {summaryEn}
      </p>
      <p
        lang="ar"
        dir="rtl"
        className="text-[13px] text-ink-soft leading-relaxed [unicode-bidi:isolate]"
      >
        {summaryAr}
      </p>
    </article>
  );
}

interface SurfaceTierProps {
  testid: string;
  tone: "ink" | "paper" | "reserved";
  labelEn: string;
  labelAr: string;
  descEn: string;
  descAr: string;
}

function SurfaceTier({
  testid,
  tone,
  labelEn,
  labelAr,
  descEn,
  descAr,
}: SurfaceTierProps) {
  const toneClass =
    tone === "ink"
      ? "border-s-2 border-ink bg-white"
      : tone === "paper"
      ? "border-s-2 border-rule bg-white"
      : "border-s-2 border-rule bg-panel";
  const toneTag =
    tone === "ink"
      ? "executive · ink"
      : tone === "paper"
      ? "analyst · paper"
      : "future · reserved";
  return (
    <li
      data-testid={testid}
      className={`${toneClass} ps-3 pe-3 py-2 flex flex-col gap-1 min-w-0`}
    >
      <p className="text-[10px] uppercase tracking-wider text-ink-mute font-mono">
        {toneTag}
      </p>
      <p className="text-sm text-ink leading-snug">{labelEn}</p>
      <p
        lang="ar"
        dir="rtl"
        className="text-[13px] text-ink-mute leading-snug [unicode-bidi:isolate]"
      >
        {labelAr}
      </p>
      <p className="mt-1 text-[12px] text-ink-soft leading-relaxed">
        {descEn}
      </p>
      <p
        lang="ar"
        dir="rtl"
        className="text-[12px] text-ink-soft leading-relaxed [unicode-bidi:isolate]"
      >
        {descAr}
      </p>
    </li>
  );
}

interface IsBlockProps {
  testid: string;
  kind: "is" | "isnot";
  headingEn: string;
  headingAr: string;
  bulletsEn: readonly string[];
  bulletsAr: readonly string[];
}

function IsBlock({
  testid,
  kind,
  headingEn,
  headingAr,
  bulletsEn,
  bulletsAr,
}: IsBlockProps) {
  const headingTone =
    kind === "is" ? "text-ink" : "text-ink-soft";
  return (
    <div
      data-testid={testid}
      className="bg-white border border-rule p-4 flex flex-col gap-2 min-w-0"
    >
      <h4 className={`font-serif text-base leading-tight ${headingTone}`}>
        {headingEn}{" "}
        <span
          lang="ar"
          dir="rtl"
          className="font-serif text-sm text-ink-mute [unicode-bidi:isolate]"
        >
          · {headingAr}
        </span>
      </h4>
      <ul className="space-y-2 text-[13px] text-ink-soft leading-relaxed">
        {bulletsEn.map((b, i) => (
          <li key={`en-${i}`} className="flex gap-2">
            <span aria-hidden="true" className="text-ink-mute font-mono">
              —
            </span>
            <span className="flex-1 min-w-0 space-y-1">
              <span className="block">{b}</span>
              <span
                lang="ar"
                dir="rtl"
                className="block text-[12px] text-ink-mute [unicode-bidi:isolate]"
              >
                {bulletsAr[i] ?? ""}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
