"use client";

import { SOURCE_FAMILY_DETAILS } from "@/lib/v2/overview/data";

interface Props {
  selectedSource: string | null;
  onSource: (sf: string | null) => void;
}

export function EvidenceLineagePanel({ selectedSource, onSource }: Props) {
  return (
    <section
      aria-labelledby="lineage-title"
      className="bg-white border border-rule"
    >
      <header className="px-4 py-3 border-b border-rule">
        <h2 id="lineage-title" className="font-serif text-lg text-ink">
          Evidence lineage · source families
        </h2>
        <p className="mt-0.5 text-[11px] text-ink-mute font-mono">
          inventory-anchored · no verified provenance without reviewer signoff
        </p>
      </header>
      <ul className="divide-y divide-rule">
        {SOURCE_FAMILY_DETAILS.map((sf) => {
          const active = selectedSource === sf.source_family;
          return (
            <li key={sf.source_family}>
              <button
                type="button"
                onClick={() => onSource(active ? null : sf.source_family)}
                className={[
                  "w-full text-start px-4 py-3 transition-colors",
                  active
                    ? "bg-accent-soft text-accent"
                    : sf.excluded
                      ? "bg-paper text-ink-mute"
                      : "text-ink-soft hover:bg-paper hover:text-ink",
                ].join(" ")}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-medium text-ink">
                      {sf.source_family}
                      {sf.excluded && (
                        <span className="ms-2 text-[10px] uppercase tracking-wider text-ink-mute font-mono">
                          excluded · pending
                        </span>
                      )}
                    </p>
                    <p className="mt-0.5 text-[11px] text-ink-mute">
                      → {sf.layer}
                    </p>
                  </div>
                  <span className="font-mono text-sm tabular-nums">
                    {sf.token_count}
                  </span>
                </div>
                {!sf.excluded && sf.governance_status && (
                  <p className="mt-1 text-[10px] text-ink-mute font-mono">
                    governance: {sf.governance_status}
                  </p>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
