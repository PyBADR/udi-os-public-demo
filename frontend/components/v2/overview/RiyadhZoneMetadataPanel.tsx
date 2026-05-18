"use client";

// IR-42B-V2-MAP-OPERATING-HIERARCHY-AND-ZONE-METADATA — Zone Operating
// Metadata panel. Surfaces the extended ZoneOperatingMetadata fields
// (zone_id · jurisdiction · zone_type · source_family · evidence_status
// · readiness_band · confidence_band · governance_note · linked_workflows
// · next_human_action · buyer_relevance) for the selected Riyadh zone
// OR a Kuwait baseline entry. Pure read-only display.

import {
  findZoneOperatingMetadata,
  type ZoneOperatingMetadata,
} from "@/lib/v2/overview/riyadhMapConfig";
// IR-42B-V2-R3 — bilingual zone microcopy (English primary · Arabic secondary)
import {
  V2_BILINGUAL_LABELS,
  findArabicZoneName,
} from "@/lib/v2/data/bilingualBusinessLabels";

interface Props {
  selectedZoneIdOrRiyId: string | null;   // accepts "north" / "RIY-NORTH" / "KW-007"
}

const EVIDENCE_CHIP: Record<ZoneOperatingMetadata["evidence_status"], string> = {
  candidate:          "border-accent text-accent bg-accent-soft",
  candidate_partial:  "border-amber-muted text-amber-muted bg-amber-muted/[0.04]",
  review_pending:     "border-risk-medium text-risk-medium bg-risk-medium/[0.04]",
};

const CLASSIFICATION_CHIP: Record<ZoneOperatingMetadata["classification"], string> = {
  active_pilot:       "border-accent text-accent bg-accent-soft",
  baseline_reference: "border-amber-muted text-amber-muted bg-amber-muted/[0.04]",
};

export function RiyadhZoneMetadataPanel({ selectedZoneIdOrRiyId }: Props) {
  const meta = findZoneOperatingMetadata(selectedZoneIdOrRiyId);
  const arabicZoneName = meta ? findArabicZoneName(meta.zone_id) : null;
  return (
    <section
      aria-labelledby="zone-metadata-panel-title"
      className="bg-white border border-rule"
    >
      <header className="px-3 py-2 border-b border-rule">
        <p className="text-[10px] uppercase tracking-wider text-ink-mute font-mono">
          Zone Operating Metadata
        </p>
        <h3
          id="zone-metadata-panel-title"
          className="mt-0.5 font-serif text-sm text-ink leading-tight"
        >
          {meta ? meta.zone_name : "Select a zone"}
        </h3>
        {/* IR-42B-V2-R3 — Arabic zone microlabel (RTL · secondary) */}
        {arabicZoneName && (
          <p
            lang="ar"
            dir="rtl"
            className="mt-0.5 font-serif text-[12px] text-ink-mute leading-tight"
          >
            {arabicZoneName}
          </p>
        )}
        {meta && (
          <div className="mt-1 flex flex-wrap items-baseline gap-2">
            <span className="text-[10px] text-ink-mute font-mono">
              {meta.zone_id}
            </span>
            <span
              className={[
                "px-1.5 py-0.5 border text-[10px] font-mono",
                CLASSIFICATION_CHIP[meta.classification],
              ].join(" ")}
            >
              {meta.classification === "active_pilot" ? "active pilot" : "baseline reference"}
            </span>
            <span
              className={[
                "px-1.5 py-0.5 border text-[10px] font-mono",
                EVIDENCE_CHIP[meta.evidence_status],
              ].join(" ")}
            >
              {meta.evidence_status.replace(/_/g, " ")}
            </span>
          </div>
        )}
      </header>

      {!meta ? (
        <p className="px-3 py-3 text-[11px] text-ink-mute italic">
          Click a Riyadh zone on the map or open a Kuwait baseline card to see its full operating metadata, governance note, linked workflows, and next human action.
        </p>
      ) : (
        <dl className="divide-y divide-rule">
          <Field label="Jurisdiction" value={meta.jurisdiction} mono />
          <Field label="Zone type" value={meta.zone_type.replace(/_/g, " ")} mono />
          <Field label="Source family">
            <ul className="space-y-0.5">
              {meta.source_family.map((s) => (
                <li key={s} className="text-[11px] text-ink-soft">· {s}</li>
              ))}
            </ul>
          </Field>
          <Field label="Readiness band" value={meta.readiness_band} />
          <Field label="Confidence band" value={meta.confidence_band} mono />
          <Field label="Linked workflows">
            <ul className="space-y-0.5">
              {meta.linked_workflows.map((w) => (
                <li
                  key={w}
                  className="text-[11px] text-ink-soft border-s ps-2 border-rule"
                >
                  {w}
                </li>
              ))}
            </ul>
          </Field>
          <Field label="Governance note" value={meta.governance_note} muted />
          <Field label={`Next human action · ${V2_BILINGUAL_LABELS.next_human_action.ar}`} value={meta.next_human_action} />
          <Field label="Buyer relevance">
            <ul className="flex flex-wrap gap-1">
              {meta.buyer_relevance.map((b) => (
                <li
                  key={b}
                  className="px-1.5 py-0.5 border border-rule text-[10px] font-mono text-ink-mute bg-paper"
                >
                  {b}
                </li>
              ))}
            </ul>
          </Field>
        </dl>
      )}

      {/* IR-43A-R2 — split mono English from sans Arabic so Arabic glyphs
          connect correctly. */}
      <footer className="px-3 py-2 border-t border-rule">
        <p className="text-[10px] text-ink-mute leading-snug">
          <span className="font-mono">{V2_BILINGUAL_LABELS.governance_advisory_only.en}</span> ·{" "}
          <span lang="ar" dir="rtl" className="font-sans normal-case tracking-normal [unicode-bidi:isolate]">{V2_BILINGUAL_LABELS.governance_advisory_only.ar}</span>
          <span className="font-mono">{" "}· candidate only · municipal review is the sole producer of consequential conclusions · {V2_BILINGUAL_LABELS.boundary_no_official.en}</span> ·{" "}
          <span lang="ar" dir="rtl" className="font-sans normal-case tracking-normal [unicode-bidi:isolate]">{V2_BILINGUAL_LABELS.boundary_no_official.ar}</span>
          <span className="font-mono">{" "}· no live GIS · no automated decision</span>
        </p>
      </footer>
    </section>
  );
}

function Field({
  label,
  value,
  children,
  mono,
  muted,
}: {
  label: string;
  value?: string;
  children?: React.ReactNode;
  mono?: boolean;
  muted?: boolean;
}) {
  return (
    <div className="px-3 py-2 grid grid-cols-[8rem_minmax(0,1fr)] gap-2">
      <dt className="text-[10px] uppercase tracking-wider text-ink-mute font-mono">
        {label}
      </dt>
      <dd
        className={[
          "text-[12px] leading-snug",
          mono ? "font-mono" : "",
          muted ? "text-ink-mute italic" : "text-ink-soft",
        ].join(" ")}
      >
        {children ?? value}
      </dd>
    </div>
  );
}
