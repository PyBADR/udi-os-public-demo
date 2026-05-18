"use client";

// IR-42B-V2-R4-SATELLITE-MAP-VISUAL-SURFACE
//
// Dominant visual evidence canvas for the Riyadh Evidence Operating
// Surface. Renders the actual curated USGS reference imagery for the
// selected zone, with a Before / After / Split toggle, a zone selector
// (Core · North · South · East · West), and 6 layer chips. Pure UI
// state. No live GIS, no automated change detection, no NDVI, no
// surveillance, no enforcement, no claims prediction, no underwriting
// automation, no production GIS, no automated decision — reference
// imagery only · human-reviewed · advisory.

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  RIY_ZONE_EVIDENCE_ASSETS,
  findRiyZoneEvidenceAsset,
  type RiyZoneEvidenceAsset,
} from "@/lib/v2/data/riyadhEvidencePackBinding";
import { findArabicZoneName, V2_BILINGUAL_LABELS } from "@/lib/v2/data/bilingualBusinessLabels";

type ViewMode = "before" | "after" | "split";

interface LayerChip {
  id: "usgs" | "concept_zones" | "evidence_markers" | "readiness_overlay" | "governance_caveats" | "before_after";
  label: string;
  // when false, the visual overlay for this chip is suppressed (chip stays clickable)
  default_on: boolean;
}

const LAYER_CHIPS: LayerChip[] = [
  { id: "usgs",               label: "USGS Reference",       default_on: true  },
  { id: "concept_zones",      label: "Conceptual Zones",     default_on: true  },
  { id: "evidence_markers",   label: "Evidence Markers",     default_on: true  },
  { id: "readiness_overlay",  label: "Readiness Overlay",    default_on: true  },
  { id: "governance_caveats", label: "Governance Caveats",   default_on: true  },
  { id: "before_after",       label: "Before / After",       default_on: true  },
];

interface Props {
  selectedZoneId: string | null;        // accepts "core" / "RIY-CORE" / null
  onZone: (id: string | null) => void;
}

// Zone-selector buttons map to the lower-case zone keys used elsewhere
// in the platform so platform-level Decision Trace + RiyadhConceptualMap
// + EvidenceMetadataDrawer + RiyadhZoneMetadataPanel all stay in sync.
const ZONE_BUTTONS: Array<{ id: string; label: string }> = [
  { id: "core",  label: "Core"  },
  { id: "north", label: "North" },
  { id: "south", label: "South" },
  { id: "east",  label: "East"  },
  { id: "west",  label: "West"  },
];

const READINESS_COLOR: Record<string, string> = {
  A: "bg-accent/40",
  B: "bg-amber-muted/40",
  C: "bg-risk-medium/40",
  D: "bg-risk-high/40",
};

export function RiyadhSatelliteEvidenceViewer({ selectedZoneId, onZone }: Props) {
  const [view, setView] = useState<ViewMode>("after");
  const [layerOn, setLayerOn] = useState<Record<LayerChip["id"], boolean>>(
    () => Object.fromEntries(LAYER_CHIPS.map((c) => [c.id, c.default_on])) as Record<LayerChip["id"], boolean>,
  );

  const meta: RiyZoneEvidenceAsset | null = useMemo(
    () => findRiyZoneEvidenceAsset(selectedZoneId),
    [selectedZoneId],
  );

  const arabicZoneName = meta ? findArabicZoneName(meta.zone_id) : null;
  const readinessBandPrefix = (() => {
    // RIY_ZONE_EVIDENCE_ASSETS does not carry the formal "A — …" / "B — …"
    // string; that lives on ZoneOperatingMetadata. We fall back to a
    // status-based color tint so the readiness overlay chip still has
    // a visible effect when ON.
    if (!meta) return null;
    if (meta.evidence_status === "candidate") return "A";
    if (meta.evidence_status === "candidate_partial") return "B";
    if (meta.evidence_status === "reviewer_required") return "C";
    return null;
  })();

  // Defensive fallback: if the visitor opens the viewer without a zone
  // selected, default the visible image to RIY-CORE so the canvas is
  // never empty. The platform-level `selectedZoneId` is NOT mutated
  // unless the user clicks a zone button.
  const displayMeta = meta ?? RIY_ZONE_EVIDENCE_ASSETS[0];

  return (
    <section
      aria-labelledby="riyadh-satellite-evidence-viewer-title"
      className="bg-white border border-rule"
    >
      {/* IR-42B-V2-R7 — header collapsed to one inline line so the canvas
          becomes the first visual element inside the viewer. Before/After/Split
          + zone selector + layer chips moved BELOW the canvas. */}
      <header className="px-3 py-1.5 border-b border-rule flex items-baseline justify-between gap-2 flex-wrap">
        <h3
          id="riyadh-satellite-evidence-viewer-title"
          className="font-serif text-sm text-ink leading-tight flex items-baseline gap-2 flex-wrap"
        >
          BDII · Visual Evidence Canvas
          <span className="text-[11px] text-ink-mute font-mono">· {displayMeta.zone_name}</span>
          {arabicZoneName && (
            <span lang="ar" dir="rtl" className="text-[11px] text-ink-mute font-sans normal-case tracking-normal [unicode-bidi:isolate]">· {arabicZoneName}</span>
          )}
          <span className="text-[10px] text-ink-mute font-mono">· {displayMeta.zone_id} · USGS reference</span>
        </h3>
        {/* Before / After / Split toggle inline */}
        <div role="tablist" aria-label="View toggle" className="flex border border-rule bg-paper text-[10px] font-mono">
          {(["before", "after", "split"] as const).map((m) => (
            <button
              key={m}
              type="button"
              role="tab"
              aria-selected={view === m}
              onClick={() => setView(m)}
              className={[
                "px-1.5 py-0.5 transition-colors border-e last:border-e-0 border-rule",
                view === m ? "bg-accent-soft text-accent" : "text-ink-mute hover:text-ink",
              ].join(" ")}
            >
              {m === "before" ? "Before" : m === "after" ? "After" : "Split"}
            </button>
          ))}
        </div>
      </header>

      {/* IR-42B-V2-R7 — CANVAS IS NOW THE FIRST VISUAL ELEMENT after the
          one-line header. Zone selector + layer chips moved BELOW the canvas. */}
      {/* Large visual evidence canvas */}
      <div className="relative bg-paper">
        {/* IR-42B-V2-R4 hardening: explicit min-height ladder so the
            canvas always has visible space regardless of `aspect-ratio`
            CSS support. Background-image inline style is a defensive
            fallback that shows the same USGS frame even if next/image
            fails to hydrate in the visitor's browser. */}
        <div
          className="relative w-full bg-no-repeat bg-cover bg-center min-h-[16rem] sm:min-h-[18rem] md:min-h-[20rem] lg:min-h-[22rem] xl:min-h-[24rem]"
          style={{
            aspectRatio: "16 / 9",
            backgroundImage: `url("${view === "before" ? displayMeta.before_asset_public_path : displayMeta.after_asset_public_path}")`,
          }}
        >
          {view === "before" && (
            <Image
              src={displayMeta.before_asset_public_path}
              alt={`${displayMeta.zone_name} — Before (USGS-derived reference imagery · t0)`}
              fill
              sizes="(max-width: 1280px) 100vw, 60vw"
              className="object-cover"
              unoptimized
              priority
            />
          )}
          {view === "after" && (
            <Image
              src={displayMeta.after_asset_public_path}
              alt={`${displayMeta.zone_name} — After (USGS-derived reference imagery · t1)`}
              fill
              sizes="(max-width: 1280px) 100vw, 60vw"
              className="object-cover"
              unoptimized
              priority
            />
          )}
          {view === "split" && (
            <div className="absolute inset-0 grid grid-cols-2 gap-0">
              <div className="relative border-e border-white/80">
                <Image
                  src={displayMeta.before_asset_public_path}
                  alt={`${displayMeta.zone_name} — Before (USGS-derived reference imagery · t0)`}
                  fill
                  sizes="(max-width: 1280px) 50vw, 30vw"
                  className="object-cover"
                  unoptimized
                />
                <span className="absolute top-2 start-2 px-1.5 py-0.5 bg-white/90 border border-rule text-[10px] font-mono text-ink-soft">
                  Before · t0
                </span>
              </div>
              <div className="relative">
                <Image
                  src={displayMeta.after_asset_public_path}
                  alt={`${displayMeta.zone_name} — After (USGS-derived reference imagery · t1)`}
                  fill
                  sizes="(max-width: 1280px) 50vw, 30vw"
                  className="object-cover"
                  unoptimized
                />
                <span className="absolute top-2 start-2 px-1.5 py-0.5 bg-white/90 border border-rule text-[10px] font-mono text-ink-soft">
                  After · t1
                </span>
              </div>
            </div>
          )}

          {/* Optional overlays (chip-toggleable cosmetic layers) */}
          {layerOn.evidence_markers && view !== "split" && (
            <span className="absolute top-2 start-2 px-1.5 py-0.5 bg-white/90 border border-rule text-[10px] font-mono text-ink-soft">
              {view === "before" ? "Before · t0" : "After · t1"} · USGS reference
            </span>
          )}
          {layerOn.concept_zones && (
            <span className="absolute bottom-2 start-2 px-1.5 py-0.5 bg-white/90 border border-rule text-[10px] font-mono text-ink-mute">
              {displayMeta.zone_id} · conceptual review zone · no official boundary
            </span>
          )}
          {layerOn.readiness_overlay && readinessBandPrefix && (
            <span
              className={[
                "absolute top-2 end-2 px-1.5 py-0.5 border border-rule text-[10px] font-mono text-ink",
                READINESS_COLOR[readinessBandPrefix] ?? "bg-white/80",
              ].join(" ")}
            >
              Readiness band · {readinessBandPrefix} · {displayMeta.evidence_status.replace(/_/g, " ")}
            </span>
          )}
          {/* IR-43A-R2 — drop font-mono from the wrapper so Arabic span
              inherits the institutional sans family; English stays mono. */}
          {layerOn.governance_caveats && (
            <div className="absolute bottom-2 end-2 px-1.5 py-0.5 bg-white/90 border border-rule text-[10px] text-ink-mute leading-snug text-end max-w-[60%]">
              <span className="font-mono">{V2_BILINGUAL_LABELS.governance_advisory_only.en}</span> ·{" "}
              <span lang="ar" dir="rtl" className="font-sans normal-case tracking-normal [unicode-bidi:isolate]">{V2_BILINGUAL_LABELS.governance_advisory_only.ar}</span>
              <span className="font-mono">{" "}· {V2_BILINGUAL_LABELS.evidence_reference_imagery.en}</span>
            </div>
          )}
        </div>
        {/* Asset path strip */}
        <p className="px-3 py-1 text-[10px] text-ink-mute font-mono border-t border-rule break-all">
          asset: {view === "before" ? displayMeta.before_asset_public_path : view === "after" ? displayMeta.after_asset_public_path : `${displayMeta.before_asset_public_path}  +  ${displayMeta.after_asset_public_path}`}
        </p>
      </div>

      {/* IR-42B-V2-R7 — Zone selector + Layer chips combined BELOW the canvas */}
      <nav
        aria-label="Riyadh zone selector + layer toggles"
        className="border-t border-rule px-3 py-2 bg-paper flex flex-wrap items-center gap-x-3 gap-y-1"
      >
        <span className="text-[10px] uppercase tracking-wider text-ink-mute font-mono">Zones:</span>
        {ZONE_BUTTONS.map((z) => {
          const active = selectedZoneId === z.id || (`RIY-${z.id.toUpperCase()}` === selectedZoneId);
          return (
            <button
              key={z.id}
              type="button"
              onClick={() => onZone(active ? null : z.id)}
              aria-pressed={active}
              className={[
                "px-1.5 py-0.5 border text-[10px] font-mono transition-colors whitespace-nowrap",
                active
                  ? "border-accent text-accent bg-white"
                  : "border-rule text-ink-soft bg-white hover:border-accent/60",
              ].join(" ")}
            >
              {z.label}
              <span lang="ar" dir="rtl" className="ms-1 text-ink-mute font-sans normal-case tracking-normal [unicode-bidi:isolate]">· {findArabicZoneName(z.id) ?? ""}</span>
            </button>
          );
        })}
        <span className="text-[10px] uppercase tracking-wider text-ink-mute font-mono ms-2">Layers:</span>
        {LAYER_CHIPS.map((c) => {
          const on = layerOn[c.id];
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                if (c.id === "before_after") {
                  setView((v) => (v === "before" ? "after" : v === "after" ? "split" : "before"));
                  return;
                }
                setLayerOn((prev) => ({ ...prev, [c.id]: !prev[c.id] }));
              }}
              aria-pressed={c.id === "before_after" ? false : on}
              title="reference imagery only · no automated change detection"
              className={[
                "px-1.5 py-0.5 border text-[10px] font-mono transition-colors",
                c.id === "before_after"
                  ? "border-accent text-accent bg-accent-soft"
                  : on
                    ? "border-accent text-accent bg-accent-soft"
                    : "border-rule text-ink-mute bg-paper hover:border-accent/40",
              ].join(" ")}
            >
              {c.label}
              {c.id === "before_after" && <span className="ms-1 text-ink-mute">· {view}</span>}
            </button>
          );
        })}
      </nav>

      {/* Governance caveat strip · always visible */}
      <ul className="grid gap-1 px-4 py-2 border-t border-rule sm:grid-cols-2 xl:grid-cols-3 bg-paper">
        {[
          "Reference imagery only · no live GIS · no production GIS",
          "Conceptual zones only · no official Riyadh municipal boundary",
          "No automated change detection · no NDVI · no spectral-index",
          "No surveillance · no individual identification",
          "No enforcement · no automated decision · no claims prediction",
          "Advisory only · human-reviewed · municipal review is the sole producer",
        ].map((line) => (
          <li
            key={line}
            className="text-[10px] text-ink-mute font-mono leading-snug border-s ps-2 border-amber-muted"
          >
            {line}
          </li>
        ))}
      </ul>
    </section>
  );
}
