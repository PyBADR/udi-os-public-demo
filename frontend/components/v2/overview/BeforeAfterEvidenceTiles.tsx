"use client";

// IR-41A-V2-RIYADH-EVIDENCE-MAP-BINDING — Before/After evidence strip.
// Now bound to the per-zone USGS placeholder frames present locally
// under frontend/public/v2/evidence/riyadh/before-after/. The frames
// are USGS-derived visual references only — no NDVI, no spectral
// index, no automated change detection is performed. If no frame is
// available, the slot renders a "pending local asset binding" tile.
//
// The component can render in two modes:
//   · standalone strip mode (no `selectedZoneId`): shows a quiet 5-zone
//     overview strip (one row, all zones), each as before/after pair.
//   · zone-focused mode (`selectedZoneId` set): shows a single focused
//     before/after card for the selected zone plus a metadata block,
//     source-family chips, and a reviewer-status chip.

import Image from "next/image";
import {
  RIYADH_CONCEPTUAL_ZONES,
  RIYADH_EVIDENCE_TILES,
  findZoneById,
  type RiyadhZone,
} from "@/lib/v2/overview/riyadhMapConfig";

interface Props {
  selectedZoneId?: string | null;
}

export function BeforeAfterEvidenceTiles({ selectedZoneId = null }: Props) {
  const focused = findZoneById(selectedZoneId);

  return (
    <section
      aria-labelledby="before-after-title"
      className="bg-white border border-rule"
    >
      <header className="px-4 py-3 border-b border-rule flex items-baseline justify-between gap-3 flex-wrap">
        <div>
          <h2 id="before-after-title" className="font-serif text-lg text-ink">
            Before / After visual reference · USGS-derived
          </h2>
          <p className="mt-0.5 text-[11px] text-ink-mute font-mono">
            Visual reference only · no NDVI · no spectral-index · no automated change detection · no surveillance · no enforcement
          </p>
        </div>
        {focused && (
          <span className="px-2 py-0.5 border border-accent bg-accent-soft text-accent text-[10px] font-mono">
            focused: {focused.label}
          </span>
        )}
      </header>

      {focused ? (
        <FocusedZoneStrip zone={focused} />
      ) : (
        <ul className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {RIYADH_CONCEPTUAL_ZONES.map((z) => (
            <li key={z.id}>
              <ZoneCard zone={z} compact />
            </li>
          ))}
        </ul>
      )}

      <footer className="px-4 py-2 border-t border-rule text-[11px] text-ink-mute font-mono">
        {RIYADH_EVIDENCE_TILES.map((t) => t.label).join(" · ")}
      </footer>
    </section>
  );
}

function FocusedZoneStrip({ zone }: { zone: RiyadhZone }) {
  const beforeTile = RIYADH_EVIDENCE_TILES.find((t) => t.slot === "before")!;
  const afterTile  = RIYADH_EVIDENCE_TILES.find((t) => t.slot === "after")!;
  return (
    <div className="p-4 grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
      <div className="grid grid-cols-2 gap-2">
        <FrameTile label={beforeTile.label} helper={beforeTile.helperText} url={zone.beforeAssetUrl} alt={`Before reference frame for ${zone.label} (USGS-derived placeholder)`} />
        <FrameTile label={afterTile.label}  helper={afterTile.helperText}  url={zone.afterAssetUrl}  alt={`After reference frame for ${zone.label} (USGS-derived placeholder)`} />
      </div>
      <aside className="space-y-2 text-[11px]">
        <SlotBlock label="Metadata">
          <p className="text-ink-soft">
            zone: <span className="font-mono">{zone.id}</span> · role: <span className="font-mono">{zone.role.replace(/_/g, " ")}</span>
          </p>
          <p className="text-ink-soft">
            evidence posture: <span className="font-mono">{zone.evidencePosture.replace(/_/g, " ")}</span>
          </p>
        </SlotBlock>
        <SlotBlock label="Source">
          <ul className="text-ink-soft space-y-0.5">
            {zone.sourceFamilies.map((s) => (
              <li key={s}>· {s}</li>
            ))}
          </ul>
        </SlotBlock>
        <SlotBlock label="Reviewer status">
          <p className="text-ink-soft">{zone.nextHumanAction}</p>
        </SlotBlock>
        <SlotBlock label="Limitation note">
          <p className="text-ink-mute italic">{zone.limitationNote}</p>
        </SlotBlock>
      </aside>
    </div>
  );
}

function ZoneCard({ zone, compact }: { zone: RiyadhZone; compact?: boolean }) {
  return (
    <article className="border border-rule bg-paper">
      <div className="px-3 py-2 border-b border-rule">
        <p className="font-serif text-sm text-ink leading-tight">
          {zone.label}
          <span className="ms-2 text-[10px] text-ink-mute font-mono">{zone.arabicLabel}</span>
        </p>
        <p className="text-[10px] text-ink-mute font-mono">
          {zone.role.replace(/_/g, " ")}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-1 p-2">
        <FrameTile label="Before" helper="t0" url={zone.beforeAssetUrl} alt={`${zone.label} before (USGS-derived placeholder)`} compact={compact} />
        <FrameTile label="After"  helper="t1" url={zone.afterAssetUrl}  alt={`${zone.label} after (USGS-derived placeholder)`}  compact={compact} />
      </div>
      <p className="px-3 pb-2 text-[10px] text-ink-mute leading-snug">
        {zone.limitationNote}
      </p>
    </article>
  );
}

function FrameTile({
  label,
  helper,
  url,
  alt,
  compact,
}: {
  label: string;
  helper: string;
  url: string | null;
  alt: string;
  compact?: boolean;
}) {
  return (
    <figure className="border border-rule bg-panel relative overflow-hidden">
      <div className={["relative w-full", compact ? "aspect-square" : "aspect-[4/3]"].join(" ")}>
        {url ? (
          // Next/Image with `unoptimized` so the local PNG is served verbatim
          // (no transformation pipeline · no spectral computation).
          <Image
            src={url}
            alt={alt}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover opacity-95"
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-[10px] text-ink-mute font-mono text-center px-2">
              pending local asset binding
            </p>
          </div>
        )}
        <span className="absolute top-1 start-1 px-1 py-0.5 bg-white/90 border border-rule text-[9px] font-mono text-ink-soft">
          {label} · {helper}
        </span>
      </div>
      <figcaption className="px-2 py-1 text-[9px] text-ink-mute font-mono border-t border-rule">
        visual reference only · USGS-derived placeholder
      </figcaption>
    </figure>
  );
}

function SlotBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border border-rule bg-paper p-2">
      <p className="text-[9px] uppercase tracking-wider text-ink-mute font-mono">
        {label}
      </p>
      <div className="mt-1">{children}</div>
    </div>
  );
}
