"use client";

// IR-41A-V2-RIYADH-EVIDENCE-MAP-BINDING — Source-layer rail.
// Renders the 6 source layers (USGS · Balady · GASTAT · SaudiOpenData ·
// REGA · Governance Notes) as a vertical/horizontal toggle list.
// Selection is pure UI state; the rail does not fetch or activate any
// real GIS layer.

import { RIYADH_SOURCE_LAYERS, type SourceLayerStatus } from "@/lib/v2/overview/riyadhMapConfig";

const STATUS_CHIP: Record<SourceLayerStatus, string> = {
  active_candidate_layer: "border-accent text-accent bg-accent-soft",
  reference_only:         "border-rule text-ink-mute bg-paper",
  future_gated:           "border-risk-high text-risk-high bg-risk-high/[0.04]",
};

const STATUS_LABEL: Record<SourceLayerStatus, string> = {
  active_candidate_layer: "active · candidate",
  reference_only:         "reference only",
  future_gated:           "future-gated · BLOCKED",
};

interface Props {
  selectedLayerId: string | null;
  onLayer: (id: string | null) => void;
  orientation?: "vertical" | "horizontal";
}

export function MapSourceLayerRail({ selectedLayerId, onLayer, orientation = "vertical" }: Props) {
  const isVertical = orientation === "vertical";
  return (
    <nav
      aria-label="Riyadh source layers"
      className={[
        "bg-white border border-rule",
        isVertical ? "" : "overflow-x-auto",
      ].join(" ")}
    >
      <header className="px-3 py-2 border-b border-rule">
        <p className="text-[10px] uppercase tracking-wider text-ink-mute font-mono">
          Source layers · {RIYADH_SOURCE_LAYERS.length}
        </p>
      </header>
      <ul
        className={[
          isVertical ? "divide-y divide-rule" : "flex gap-1 p-1 min-w-max",
        ].join(" ")}
      >
        {RIYADH_SOURCE_LAYERS.map((s) => {
          const active = s.id === selectedLayerId;
          return (
            <li key={s.id} className={isVertical ? "" : "min-w-[12rem]"}>
              <button
                type="button"
                onClick={() => onLayer(active ? null : s.id)}
                aria-pressed={active}
                className={[
                  "w-full text-start px-3 py-2 transition-colors",
                  isVertical ? "" : "border border-rule",
                  active
                    ? "bg-accent-soft text-accent border-s-2 border-accent"
                    : "text-ink-soft hover:bg-paper hover:text-ink border-s-2 border-transparent",
                ].join(" ")}
              >
                <p className="font-serif text-sm leading-tight">{s.label}</p>
                <p className="mt-0.5 text-[10px] text-ink-mute font-mono">
                  {s.type.replace(/_/g, " ")}
                </p>
                <span
                  className={[
                    "mt-1 inline-block px-1.5 py-0.5 border text-[10px] font-mono",
                    STATUS_CHIP[s.status],
                  ].join(" ")}
                >
                  {STATUS_LABEL[s.status]}
                </span>
                <p className="mt-1 text-[10px] text-ink-mute leading-snug line-clamp-2">
                  {s.evidenceRole}
                </p>
              </button>
            </li>
          );
        })}
      </ul>
      <p className="px-3 py-2 border-t border-rule text-[10px] text-ink-mute font-mono">
        Toggling a source layer updates the metadata drawer and the right Decision Trace
      </p>
    </nav>
  );
}
