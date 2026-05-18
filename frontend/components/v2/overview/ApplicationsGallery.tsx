"use client";

// IR-40A-V2-DYNAMIC-PLATFORM-SHELL-BUILD — Applications gallery.
// 8 candidate application surfaces presented as cards. Each card is a
// quiet "open this surface" affordance that maps to an internal
// workspace transition (no external route, no /v2/* leakage). The
// gallery deliberately communicates that the platform is a host for
// many candidate views, not a single report.

import type { WorkspaceId } from "./LeftNavRail";

interface AppCard {
  id: string;
  title: string;
  blurb: string;
  surface: WorkspaceId | "stay";
  status: "candidate" | "future_gate";
  forbidden: string;
}

const APPS: AppCard[] = [
  { id: "APP01", title: "Riyadh Evidence Surface",       blurb: "Conceptual zone map · per-source family routing",         surface: "map",         status: "candidate",   forbidden: "no official boundary" },
  { id: "APP02", title: "GCC Region Overview",           blurb: "Wave 1 product · Wave 2 commercial-mapping-only",        surface: "overview",    status: "candidate",   forbidden: "no live Wave 2 product" },
  { id: "APP03", title: "Insurance Exposure Lens",       blurb: "Advisory exposure framing · candidate-only",              surface: "stay",        status: "future_gate", forbidden: "no underwriting · no risk model" },
  { id: "APP04", title: "Municipality Readiness Pilot",  blurb: "Per-zone readiness band candidate · advisory",            surface: "overview",    status: "candidate",   forbidden: "no enforcement · no automated inspection" },
  { id: "APP05", title: "Buyer Briefing Pack",           blurb: "Pilot framing · candidate buyer relevance",               surface: "stay",        status: "future_gate", forbidden: "no confirmed buyer pain without recorded interview" },
  { id: "APP06", title: "Governance Review Console",     blurb: "Per-source posture · constitutional caveats",             surface: "governance",  status: "candidate",   forbidden: "no softening of advisory-only notice" },
  { id: "APP07", title: "Evidence Pack Builder",         blurb: "Per-token assembly view · reviewer queue",                surface: "evidence",    status: "candidate",   forbidden: "no automated curation" },
  { id: "APP08", title: "Scenario Gate Preview",         blurb: "Eligibility framing · why-locked detail",                 surface: "stay",        status: "future_gate", forbidden: "no simulation output · no growth prediction" },
];

interface Props {
  onOpenSurface: (id: WorkspaceId) => void;
  selectedApp: string | null;
  onApp: (id: string | null) => void;
}

export function ApplicationsGallery({ onOpenSurface, selectedApp, onApp }: Props) {
  return (
    <section
      aria-labelledby="apps-title"
      className="bg-white border border-rule"
    >
      <header className="px-4 py-3 border-b border-rule flex items-baseline justify-between">
        <div>
          <h2 id="apps-title" className="font-serif text-lg text-ink">
            Applications · 8 candidate surfaces
          </h2>
          <p className="mt-0.5 text-[11px] text-ink-mute font-mono">
            Single integrated platform · every surface stays on /v2/overview · no /v2/* leakage
          </p>
        </div>
        {selectedApp && (
          <button
            type="button"
            onClick={() => onApp(null)}
            className="text-xs text-accent hover:underline"
          >
            Clear
          </button>
        )}
      </header>
      <ul className="grid gap-3 p-4 sm:grid-cols-2 xl:grid-cols-4">
        {APPS.map((a) => {
          const live = a.status === "candidate";
          const isSel = a.id === selectedApp;
          return (
            <li key={a.id}>
              <article className={[
                "h-full p-3 border bg-paper flex flex-col gap-2",
                isSel ? "border-accent ring-1 ring-accent/40" : "border-rule",
              ].join(" ")}>
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-[10px] uppercase tracking-wider text-ink-mute font-mono">
                    {a.id}
                  </p>
                  <span className={[
                    "px-1.5 py-0.5 border text-[10px] font-mono",
                    live
                      ? "border-accent text-accent bg-accent-soft"
                      : "border-risk-high text-risk-high bg-risk-high/[0.04]",
                  ].join(" ")}>
                    {live ? "candidate" : "BLOCKED · future gate"}
                  </span>
                </div>
                <p className="font-serif text-sm text-ink leading-tight">{a.title}</p>
                <p className="text-[11px] text-ink-mute leading-snug flex-1">{a.blurb}</p>
                <p className="text-[10px] text-ink-mute font-mono">
                  forbidden: {a.forbidden}
                </p>
                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => onApp(isSel ? null : a.id)}
                    className="text-[11px] text-accent hover:underline"
                  >
                    {isSel ? "Selected" : "Inspect"}
                  </button>
                  {live && a.surface !== "stay" && (
                    <button
                      type="button"
                      onClick={() => onOpenSurface(a.surface as WorkspaceId)}
                      className="text-[11px] text-accent hover:underline"
                    >
                      Open surface →
                    </button>
                  )}
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
