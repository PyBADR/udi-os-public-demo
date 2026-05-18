"use client";

// IR-41A-V2-RIYADH-EVIDENCE-MAP-BINDING — Top-level Map Surface.
// Orchestrates the upgraded conceptual map, source-layer rail,
// evidence metadata drawer, before/after evidence strip, governance
// limitation strip, status legend, and a map-local Decision Trace
// panel that updates as the user selects a zone or source layer.
//
// All selection is pure UI state. No fetch, no API, no GIS runtime,
// no spectral computation, no change detection, no automated decision.

import { useState } from "react";
import {
  RIYADH_CONCEPTUAL_ZONES,
  RIYADH_MAP_LIMITATIONS,
  RIYADH_MAP_STATUS_LEGEND,
  MAP_SCOPES,
  findSourceLayerById,
  findZoneById,
  type MapScopeId,
} from "@/lib/v2/overview/riyadhMapConfig";
import { RiyadhConceptualMap } from "./RiyadhConceptualMap";
import { MapSourceLayerRail } from "./MapSourceLayerRail";
import { EvidenceMetadataDrawer } from "./EvidenceMetadataDrawer";
import { BeforeAfterEvidenceTiles } from "./BeforeAfterEvidenceTiles";
// IR-42B-V2 additions
import { RiyadhZoneMetadataPanel } from "./RiyadhZoneMetadataPanel";
import { KuwaitBaselineCard } from "./KuwaitBaselineCard";
// IR-42B-V2-R4 — dominant visual evidence canvas (large image + Before/After/Split + layer chips)
import { RiyadhSatelliteEvidenceViewer } from "./RiyadhSatelliteEvidenceViewer";

interface Props {
  selectedZone: string | null;
  onZone: (id: string | null) => void;
  selectedLayerId: string | null;
  onLayer: (id: string | null) => void;
}

export function RiyadhEvidenceMapSurface({
  selectedZone,
  onZone,
  selectedLayerId,
  onLayer,
}: Props) {
  const [selectedTileSlot, setSelectedTileSlot] = useState<string | null>(null);
  // IR-42B-V2 — Map scope (GCC · Saudi · Riyadh · Kuwait baseline)
  const [mapScope, setMapScope] = useState<MapScopeId>("riyadh");
  const zone = findZoneById(selectedZone);
  const layer = findSourceLayerById(selectedLayerId);

  // The Riyadh map is the active pilot surface · always rendered for
  // riyadh / saudi / gcc scopes. The Kuwait Baseline card surfaces only
  // when the visitor explicitly opens the Kuwait scope (preserved · not
  // dominant). Selected zone id ("north", "west", …) AND selected Kuwait
  // baseline id ("KW-007", "KW-SOUTH-SURRA") both flow through the same
  // platform-level `selectedZone` slot so the right Decision Trace and
  // the new RiyadhZoneMetadataPanel respond to either uniformly.
  const handleBaselineSelect = (id: string | null) => onZone(id);

  return (
    <section
      aria-labelledby="riyadh-evidence-map-title"
      className="bg-white border border-rule"
    >
      {/* IR-42B-V2-R7 — header compressed to one line + scope control inline */}
      <header className="px-3 py-1.5 border-b border-rule flex items-center justify-between gap-2 flex-wrap">
        <h2
          id="riyadh-evidence-map-title"
          className="font-serif text-sm text-ink leading-tight flex items-baseline gap-2"
        >
          BDII · Map Operating Surface
          <span className="text-[10px] text-ink-mute font-mono">· {RIYADH_CONCEPTUAL_ZONES.length} zones · {MAP_SCOPES.length} scope tiers · USGS reference imagery · advisory only</span>
        </h2>
        {/* compact scope pill row inline · per-tab descriptions hidden */}
        <ul role="tablist" aria-label="Map scope" className="flex flex-wrap gap-1 text-[10px] font-mono">
          {MAP_SCOPES.map((s) => {
            const isActive = s.id === mapScope;
            return (
              <li key={s.id}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setMapScope(s.id)}
                  title={s.description}
                  className={[
                    "px-1.5 py-0.5 border whitespace-nowrap",
                    isActive
                      ? "border-accent text-accent bg-accent-soft"
                      : "border-rule text-ink-mute bg-paper hover:border-accent/60",
                  ].join(" ")}
                >
                  {s.short_label}
                </button>
              </li>
            );
          })}
        </ul>
      </header>

      {/* Workspace: layers rail | map + before/after | metadata + trace */}
      {/* IR-42B-V2-R7 — FLATTENED to single column. The outer platform shell
          already provides left nav rail + right Decision Trace at lg+ / xl+ so
          the nested 3-column grid inside this surface was unnecessary and
          squeezed the canvas to ~197 px wide. Now: viewer is FULL WIDTH
          dominant; layer rail · metadata drawer · Kuwait baseline · map-local
          trace stack BELOW as accessible-but-secondary panels. */}
      <div className="space-y-3 p-3">
        {/* IR-42B-V2-R4 — DOMINANT visual evidence canvas at the top · full width */}
        <RiyadhSatelliteEvidenceViewer selectedZoneId={selectedZone} onZone={onZone} />

        {/* IR-42B-V2-R7 — supplementary panels now in a 2-column row at lg+,
            stacked single-column at narrow. All de-prioritized below the canvas. */}
        <div className="grid gap-3 lg:grid-cols-2">
          <RiyadhZoneMetadataPanel selectedZoneIdOrRiyId={selectedZone} />
          <EvidenceMetadataDrawer
            selectedZoneId={selectedZone}
            selectedLayerId={selectedLayerId}
          />
        </div>

        {/* Source-layer rail and status legend · de-prioritized to bottom · stacked at lg+ */}
        <div className="grid gap-3 lg:grid-cols-2">
          <MapSourceLayerRail
            selectedLayerId={selectedLayerId}
            onLayer={onLayer}
            orientation="vertical"
          />
          <StatusLegend />
        </div>

        {/* Kuwait baseline · only when scope is open · preserved · not dominant */}
        {mapScope === "kuwait_baseline" && (
          <KuwaitBaselineCard
            selectedBaselineId={selectedZone}
            onSelectBaseline={handleBaselineSelect}
          />
        )}

        {/* Map-local Decision Trace · accessible but secondary */}
        <MapLocalTracePanel
          zone={zone}
          layer={layer}
          selectedTileSlot={selectedTileSlot}
          onTileSlot={setSelectedTileSlot}
        />

        {/* IR-42B-V2-R7 — RiyadhConceptualMap (3×3 square zone cards) COLLAPSED
            by default in a <details> disclosure · component preserved on disk */}
        <details className="bg-white border border-rule">
          <summary className="px-4 py-2 text-[11px] font-mono text-ink-mute cursor-pointer hover:bg-paper">
            Conceptual zone reference · 3×3 grid · advisory only · click to expand
          </summary>
          <div className="border-t border-rule">
            <RiyadhConceptualMap selectedZone={selectedZone} onZone={onZone} />
          </div>
        </details>

        {/* BeforeAfterEvidenceTiles thumbnail strip also collapsed (canvas
            already shows before/after for the selected zone) */}
        <details className="bg-white border border-rule">
          <summary className="px-4 py-2 text-[11px] font-mono text-ink-mute cursor-pointer hover:bg-paper">
            Before / After thumbnail strip · 5 zones overview · click to expand
          </summary>
          <div className="border-t border-rule">
            <BeforeAfterEvidenceTiles selectedZoneId={selectedZone} />
          </div>
        </details>
      </div>

      {/* Limitation strip */}
      <ul className="grid gap-1 p-4 border-t border-rule sm:grid-cols-2 xl:grid-cols-3 bg-paper">
        {RIYADH_MAP_LIMITATIONS.map((l) => (
          <li
            key={l}
            className="text-[10px] text-ink-mute font-mono leading-snug border-s ps-2 border-amber-muted"
          >
            {l}
          </li>
        ))}
      </ul>
    </section>
  );
}

function StatusLegend() {
  return (
    <section
      aria-labelledby="riyadh-map-legend-title"
      className="bg-white border border-rule"
    >
      <header className="px-3 py-2 border-b border-rule">
        <p
          id="riyadh-map-legend-title"
          className="text-[10px] uppercase tracking-wider text-ink-mute font-mono"
        >
          Map legend
        </p>
      </header>
      <ul className="divide-y divide-rule">
        {RIYADH_MAP_STATUS_LEGEND.map((e) => (
          <li key={e.key} className="px-3 py-2 flex items-center gap-2">
            <span
              aria-hidden="true"
              className={["inline-block w-3 h-3 border border-rule", e.swatchClass].join(" ")}
            />
            <div className="min-w-0">
              <p className="text-[11px] text-ink leading-tight">{e.label}</p>
              <p className="text-[10px] text-ink-mute font-mono leading-snug truncate">
                {e.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

const TILE_SLOTS = ["before", "after", "metadata", "governance_note", "reviewer_status"] as const;

function MapLocalTracePanel({
  zone,
  layer,
  selectedTileSlot,
  onTileSlot,
}: {
  zone: ReturnType<typeof findZoneById>;
  layer: ReturnType<typeof findSourceLayerById>;
  selectedTileSlot: string | null;
  onTileSlot: (s: string | null) => void;
}) {
  return (
    <aside
      aria-labelledby="map-trace-title"
      className="bg-white border border-rule"
    >
      <header className="px-3 py-2 border-b border-rule">
        <p className="text-[10px] uppercase tracking-wider text-ink-mute font-mono">
          Map · Decision Trace (local)
        </p>
        <h3
          id="map-trace-title"
          className="mt-0.5 font-serif text-sm text-ink leading-tight"
        >
          {zone ? zone.label : "No zone"} {layer && (
            <span className="ms-1 text-[11px] text-ink-mute font-mono">· {layer.label}</span>
          )}
        </h3>
      </header>
      <div className="px-3 py-2 space-y-2 text-[11px] text-ink-soft">
        {zone ? (
          <>
            <p>
              <span className="text-ink-mute">why it matters: </span>
              Conceptual {zone.role.replace(/_/g, " ")} framing · advisory only · candidate-only.
            </p>
            <p>
              <span className="text-ink-mute">evidence used: </span>
              {zone.sourceFamilies.slice(0, 3).join(" · ")}
              {zone.sourceFamilies.length > 3 ? " · …" : ""}
            </p>
            <p>
              <span className="text-ink-mute">governance limitation: </span>
              <span className="italic">{zone.limitationNote}</span>
            </p>
            <p>
              <span className="text-ink-mute">readiness posture: </span>
              <span className="font-mono">{zone.readinessPosture.replace(/_/g, " ")}</span>
            </p>
            <p>
              <span className="text-ink-mute">next human action: </span>
              {zone.nextHumanAction}
            </p>
          </>
        ) : (
          <p className="text-ink-mute italic">
            Click a zone on the map to populate the per-zone trace.
          </p>
        )}
        {layer && (
          <p className="border-t border-rule pt-2 mt-2">
            <span className="text-ink-mute">selected layer: </span>
            {layer.label} · {layer.evidenceRole}
          </p>
        )}
      </div>
      <div className="px-3 py-2 border-t border-rule">
        <p className="text-[10px] uppercase tracking-wider text-ink-mute font-mono">
          Evidence tile slots
        </p>
        <ul className="mt-1 flex flex-wrap gap-1">
          {TILE_SLOTS.map((s) => {
            const active = s === selectedTileSlot;
            return (
              <li key={s}>
                <button
                  type="button"
                  onClick={() => onTileSlot(active ? null : s)}
                  aria-pressed={active}
                  className={[
                    "px-1.5 py-0.5 border text-[10px] font-mono transition-colors",
                    active
                      ? "border-accent text-accent bg-accent-soft"
                      : "border-rule text-ink-mute bg-paper hover:border-accent/60",
                  ].join(" ")}
                >
                  {s.replace(/_/g, " ")}
                </button>
              </li>
            );
          })}
        </ul>
        {selectedTileSlot && (
          <p className="mt-2 text-[10px] text-ink-mute font-mono">
            Selected slot: {selectedTileSlot.replace(/_/g, " ")} · advisory · no execution
          </p>
        )}
      </div>
    </aside>
  );
}
