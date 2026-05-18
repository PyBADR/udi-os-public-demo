"use client";

// IR-45 — Buyer Lens + Evidence Pack Catalog.
//
// Two stacked sub-sections for /v2/overview's executive story layer:
//
//   - Buyer Lens cards (5) — Municipality / Investor / Insurance /
//     Telecom / Cloud-Advisory partner. Each card answers: cares
//     about · evidence needed · output received.
//
//   - Evidence Pack Catalog (6) — Municipal Readiness, Developer
//     Site Intelligence, Insurance Risk Context, Retail / Footfall,
//     Public Asset value scenarios, Strategic GCC Comparison. Each
//     pack shows: buyer · decision question · evidence used ·
//     output · governance caveat.
//
// All visible strings live in `frontend/lib/v2/data/bilingualBusinessLabels.ts`.
// No vendor name. Advisory-only · human-review-first · evidence-
// linked posture preserved. No production claims, no official-GIS
// claims, no automated-decisioning, no surveillance, no enforcement,
// no return-guarantee framing. Logical Tailwind only.

import {
  V2_IR45_BUYER_LENSES,
  V2_IR45_EVIDENCE_PACK_CATALOG,
  V2_IR45_SECTION_LABELS as L,
} from "@/lib/v2/data/bilingualBusinessLabels";

export function BuyerPackCatalog() {
  return (
    <section
      aria-labelledby="ir45-buyer-pack-title"
      data-testid="ir45-buyer-pack-catalog"
      className="space-y-6"
    >
      <h2 id="ir45-buyer-pack-title" className="sr-only">
        Buyer Lens and Evidence Pack Catalog
      </h2>
      <BuyerLensCards />
      <EvidencePackCatalogSection />
    </section>
  );
}

// -----------------------------------------------------------------
// Buyer Lens Cards (5)
// -----------------------------------------------------------------
function BuyerLensCards() {
  return (
    <section
      aria-labelledby="ir45-buyer-lens-title"
      data-testid="ir45-buyer-lens"
      className="space-y-3"
    >
      <p
        id="ir45-buyer-lens-title"
        className="text-[11px] uppercase tracking-wider text-ink-mute font-mono"
      >
        <span>{L.buyer_eyebrow.en}</span>{" "}
        <span
          lang="ar"
          dir="rtl"
          className="font-sans normal-case tracking-normal [unicode-bidi:isolate]"
        >
          · {L.buyer_eyebrow.ar}
        </span>
      </p>
      <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {V2_IR45_BUYER_LENSES.map((lens, idx) => (
          <li
            key={lens.id}
            data-testid={`ir45-buyer-lens-${lens.id}`}
            className="bg-white border border-rule p-4 flex flex-col gap-2 min-w-0"
          >
            <p className="text-[10px] uppercase tracking-wider text-ink-mute font-mono">
              {String(idx + 1).padStart(2, "0")}
            </p>
            <h4 className="font-serif text-base text-ink leading-tight">
              {lens.title_en}
            </h4>
            <p
              lang="ar"
              dir="rtl"
              className="font-serif text-sm text-ink-mute leading-tight [unicode-bidi:isolate]"
            >
              {lens.title_ar}
            </p>
            <FieldRow
              label_en={L.cares_about.en}
              label_ar={L.cares_about.ar}
              value_en={lens.cares_about_en}
              value_ar={lens.cares_about_ar}
            />
            <FieldRow
              label_en={L.evidence_needed.en}
              label_ar={L.evidence_needed.ar}
              value_en={lens.evidence_needed_en}
              value_ar={lens.evidence_needed_ar}
            />
            <FieldRow
              label_en={L.output_received.en}
              label_ar={L.output_received.ar}
              value_en={lens.output_received_en}
              value_ar={lens.output_received_ar}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

// -----------------------------------------------------------------
// Evidence Pack Catalog (6 packs)
// -----------------------------------------------------------------
function EvidencePackCatalogSection() {
  return (
    <section
      aria-labelledby="ir45-evidence-pack-title"
      data-testid="ir45-evidence-pack-catalog-section"
      className="space-y-3"
    >
      <p
        id="ir45-evidence-pack-title"
        className="text-[11px] uppercase tracking-wider text-ink-mute font-mono"
      >
        <span>{L.pack_eyebrow.en}</span>{" "}
        <span
          lang="ar"
          dir="rtl"
          className="font-sans normal-case tracking-normal [unicode-bidi:isolate]"
        >
          · {L.pack_eyebrow.ar}
        </span>
      </p>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {V2_IR45_EVIDENCE_PACK_CATALOG.map((pack, idx) => (
          <li
            key={pack.id}
            data-testid={`ir45-evidence-pack-${pack.id}`}
            className="bg-white border border-rule p-4 flex flex-col gap-2 min-w-0"
          >
            <p className="text-[10px] uppercase tracking-wider text-ink-mute font-mono">
              {String(idx + 1).padStart(2, "0")}
            </p>
            <h4 className="font-serif text-base text-ink leading-tight">
              {pack.title_en}
            </h4>
            <p
              lang="ar"
              dir="rtl"
              className="font-serif text-sm text-ink-mute leading-tight [unicode-bidi:isolate]"
            >
              {pack.title_ar}
            </p>
            <FieldRow
              label_en={L.pack_buyer.en}
              label_ar={L.pack_buyer.ar}
              value_en={pack.buyer_en}
              value_ar={pack.buyer_ar}
            />
            <FieldRow
              label_en={L.pack_decision.en}
              label_ar={L.pack_decision.ar}
              value_en={pack.decision_question_en}
              value_ar={pack.decision_question_ar}
            />
            <FieldRow
              label_en={L.pack_evidence.en}
              label_ar={L.pack_evidence.ar}
              value_en={pack.evidence_used_en}
              value_ar={pack.evidence_used_ar}
            />
            <FieldRow
              label_en={L.pack_output.en}
              label_ar={L.pack_output.ar}
              value_en={pack.output_en}
              value_ar={pack.output_ar}
            />
            <FieldRow
              label_en={L.pack_governance.en}
              label_ar={L.pack_governance.ar}
              value_en={pack.governance_caveat_en}
              value_ar={pack.governance_caveat_ar}
              caveat
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

// -----------------------------------------------------------------
// Reusable bilingual label + value row.
// -----------------------------------------------------------------
interface FieldRowProps {
  label_en: string;
  label_ar: string;
  value_en: string;
  value_ar: string;
  caveat?: boolean;
}
function FieldRow({
  label_en,
  label_ar,
  value_en,
  value_ar,
  caveat = false,
}: FieldRowProps) {
  return (
    <div
      className={[
        "border-s-2 ps-3 pe-1 py-1 space-y-1",
        caveat ? "border-ink" : "border-rule",
      ].join(" ")}
    >
      <p className="text-[10px] uppercase tracking-wider text-ink-mute font-mono">
        <span>{label_en}</span>{" "}
        <span
          lang="ar"
          dir="rtl"
          className="font-sans normal-case tracking-normal [unicode-bidi:isolate]"
        >
          · {label_ar}
        </span>
      </p>
      <p className="text-[12px] text-ink-soft leading-relaxed">
        {value_en}
      </p>
      <p
        lang="ar"
        dir="rtl"
        className="text-[12px] text-ink-soft leading-relaxed [unicode-bidi:isolate]"
      >
        {value_ar}
      </p>
    </div>
  );
}
