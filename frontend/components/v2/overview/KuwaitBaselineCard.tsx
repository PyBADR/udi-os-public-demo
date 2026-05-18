"use client";

// IR-42B-V2-MAP-OPERATING-HIERARCHY-AND-ZONE-METADATA — Kuwait Baseline
// Reference card. Surfaces the 2 Kuwait baseline reference entries
// (KW-SOUTH-SURRA + KW-007) as a small distinct panel — visually
// preserved but NOT allowed to dominate the V2 story. Clicking a row
// surfaces the same RiyadhZoneMetadataPanel via the parent selection
// state (the same `selectedZone` slot is reused for KW-* IDs).

import { KUWAIT_BASELINE_METADATA } from "@/lib/v2/overview/riyadhMapConfig";

interface Props {
  selectedBaselineId: string | null;
  onSelectBaseline: (id: string | null) => void;
}

export function KuwaitBaselineCard({ selectedBaselineId, onSelectBaseline }: Props) {
  return (
    <section
      aria-labelledby="kuwait-baseline-title"
      className="bg-white border border-rule"
    >
      <header className="px-3 py-2 border-b border-rule">
        <p className="text-[10px] uppercase tracking-wider text-ink-mute font-mono">
          Kuwait Baseline Reference Case
        </p>
        <h3
          id="kuwait-baseline-title"
          className="mt-0.5 font-serif text-sm text-ink leading-tight"
        >
          Preserved historical comparison · not active pilot
        </h3>
      </header>
      <ul className="divide-y divide-rule">
        {KUWAIT_BASELINE_METADATA.map((m) => {
          const active = m.zone_id === selectedBaselineId;
          return (
            <li key={m.zone_id}>
              <button
                type="button"
                onClick={() => onSelectBaseline(active ? null : m.zone_id)}
                aria-pressed={active}
                className={[
                  "w-full text-start px-3 py-2 transition-colors",
                  active ? "bg-accent-soft" : "hover:bg-paper",
                ].join(" ")}
              >
                <div className="flex items-baseline justify-between gap-2">
                  <p className="font-serif text-sm text-ink leading-tight">
                    {m.zone_name}
                  </p>
                  <span className="px-1.5 py-0.5 border border-amber-muted text-amber-muted bg-amber-muted/[0.04] text-[10px] font-mono">
                    baseline reference
                  </span>
                </div>
                <p className="mt-1 text-[10px] text-ink-mute font-mono">
                  {m.zone_id} · {m.jurisdiction}
                </p>
                <p className="mt-1 text-[11px] text-ink-soft leading-snug line-clamp-2">
                  {m.governance_note}
                </p>
              </button>
            </li>
          );
        })}
      </ul>
      <p className="px-3 py-2 border-t border-rule text-[10px] text-ink-mute font-mono leading-snug">
        Kuwait baseline is preserved as a comparison anchor only · NOT the active pilot · advisory · no official boundary
      </p>
    </section>
  );
}
