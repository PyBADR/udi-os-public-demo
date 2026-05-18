"use client";

// IR-42B-V2-MAP-OPERATING-HIERARCHY-AND-ZONE-METADATA — Map scope
// segmented control. Renders the 4-scope hierarchy as a tab strip:
//   GCC Region · Saudi Focus · Riyadh Zones · Kuwait Baseline
//
// Selection is local UI state in the parent (RiyadhEvidenceMapSurface).
// No route change. No backend call. The control surfaces the active
// posture of each scope (active_pilot · active_focus · regional_context
// · baseline_reference) so the visitor reads the strategic story:
// Riyadh is the active pilot · Kuwait is preserved as baseline only.

import { MAP_SCOPES, type MapScopeId, type MapScope } from "@/lib/v2/overview/riyadhMapConfig";

interface Props {
  active: MapScopeId;
  onChange: (id: MapScopeId) => void;
}

const POSTURE_CHIP: Record<MapScope["posture"], string> = {
  active_pilot:        "border-accent text-accent bg-accent-soft",
  active_focus:        "border-accent/60 text-accent bg-white",
  regional_context:    "border-rule text-ink-mute bg-paper",
  baseline_reference:  "border-amber-muted text-amber-muted bg-amber-muted/[0.04]",
};

const POSTURE_LABEL: Record<MapScope["posture"], string> = {
  active_pilot:       "active pilot",
  active_focus:       "active focus",
  regional_context:   "regional context",
  baseline_reference: "baseline reference",
};

export function MapScopeSegmentedControl({ active, onChange }: Props) {
  return (
    <nav
      aria-label="Map operating scope"
      className="bg-white border border-rule"
    >
      <header className="px-3 py-2 border-b border-rule">
        <p className="text-[10px] uppercase tracking-wider text-ink-mute font-mono">
          Map Operating Hierarchy · GCC Region → Saudi Arabia → Riyadh Zones → Kuwait Baseline
        </p>
      </header>
      <ul role="tablist" className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-rule border-b border-rule">
        {MAP_SCOPES.map((s) => {
          const isActive = s.id === active;
          return (
            <li key={s.id} role="presentation" className="min-w-0">
              <button
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onChange(s.id)}
                className={[
                  "w-full text-start px-3 py-2 transition-colors",
                  isActive ? "bg-accent-soft" : "bg-white hover:bg-paper",
                ].join(" ")}
              >
                <div className="flex items-baseline justify-between gap-2">
                  <p
                    className={[
                      "font-serif text-sm leading-tight",
                      isActive ? "text-accent" : "text-ink",
                    ].join(" ")}
                  >
                    {s.label}
                  </p>
                  <span
                    className={[
                      "px-1.5 py-0.5 border text-[10px] font-mono whitespace-nowrap",
                      POSTURE_CHIP[s.posture],
                    ].join(" ")}
                  >
                    {POSTURE_LABEL[s.posture]}
                  </span>
                </div>
                <p className="mt-1 text-[10px] text-ink-mute leading-snug line-clamp-2">
                  {s.description}
                </p>
              </button>
            </li>
          );
        })}
      </ul>
      <p className="px-3 py-2 text-[10px] text-ink-mute font-mono leading-snug">
        Riyadh is the active pilot surface · Kuwait is preserved as a baseline reference case · GCC and Saudi are regional / macro context layers · advisory only · no official boundary · no live GIS
      </p>
    </nav>
  );
}
