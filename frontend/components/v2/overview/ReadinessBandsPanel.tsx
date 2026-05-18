"use client";

import { ALLOWED_BANDS, FORBIDDEN_BANDS, BAND_COUNTS } from "@/lib/v2/overview/data";

interface Props {
  selectedBand: string | null;
  onBand: (b: string | null) => void;
}

const BAND_DESCRIPTION: Record<string, string> = {
  review_pending: "Reviewer attention recommended · advisory only.",
  candidate_ready_for_reference: "Candidate band ready for advisory reference · Gate 5 required for any UI binding · NOT a decision.",
  governance_limited: "Governance reviewer ratification required.",
  insufficient_evidence: "Additional evidence needed · review source coverage and metadata.",
  blocked_from_decision_use: "Do not use for any decision-support pathway.",
};

export function ReadinessBandsPanel({ selectedBand, onBand }: Props) {
  return (
    <section
      aria-labelledby="bands-title"
      className="bg-white border border-rule"
    >
      <header className="px-4 py-3 border-b border-rule">
        <h2 id="bands-title" className="font-serif text-lg text-ink">
          Readiness bands (candidate-only · advisory)
        </h2>
        <p className="mt-0.5 text-[11px] text-ink-mute font-mono">
          allowed set: 5 bands · forbidden set explicitly listed below
        </p>
      </header>
      <ul className="divide-y divide-rule">
        {ALLOWED_BANDS.map((b) => {
          const count = BAND_COUNTS[b] || 0;
          const active = selectedBand === b;
          return (
            <li key={b}>
              <button
                type="button"
                onClick={() => onBand(active ? null : b)}
                className={[
                  "w-full text-start px-4 py-3 transition-colors",
                  active
                    ? "bg-accent-soft text-accent"
                    : "text-ink-soft hover:bg-paper hover:text-ink",
                ].join(" ")}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-ink">{b}</span>
                  <span className="font-mono text-sm tabular-nums">{count}</span>
                </div>
                <p className="mt-1 text-[11px] text-ink-mute">
                  {BAND_DESCRIPTION[b] || ""}
                </p>
              </button>
            </li>
          );
        })}
      </ul>
      <div className="px-4 py-3 border-t border-rule bg-paper">
        <p className="text-[11px] uppercase tracking-wider text-ink-mute font-mono mb-1">
          Forbidden bands · constitutionally not emitted
        </p>
        <p className="text-[11px] text-ink-mute font-mono">
          {FORBIDDEN_BANDS.join(" · ")}
        </p>
      </div>
    </section>
  );
}
