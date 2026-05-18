"use client";

import { LOCKED_ENGINES } from "@/lib/v2/overview/data";

export function LockedFutureEnginesRail() {
  return (
    <section
      aria-labelledby="locked-title"
      className="bg-white border border-rule"
    >
      <header className="px-4 py-3 border-b border-rule">
        <h2 id="locked-title" className="font-serif text-lg text-ink">
          Locked future engines
        </h2>
        <p className="mt-0.5 text-[11px] text-ink-mute font-mono">
          ML · Physics · Simulation · production deployment · DB / PostgreSQL · before/after validation — per-capability future gates required
        </p>
      </header>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-x divide-y sm:divide-y-0 divide-rule">
        {LOCKED_ENGINES.map((e) => (
          <li key={e.engine_id} className="px-4 py-3">
            <p className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-risk-high" aria-hidden />
              <span className="font-medium text-ink">{e.engine_id}</span>
              <span className="text-[10px] text-ink-mute font-mono">
                {e.readiness} · value=0
              </span>
            </p>
            <p className="mt-1 text-sm text-ink-soft">{e.name}</p>
            {e.blockers && e.blockers.length > 0 && (
              <p className="mt-1 text-[11px] text-ink-mute font-mono">
                blocker: {e.blockers[0]}
              </p>
            )}
          </li>
        ))}
      </ul>
      <p className="px-4 py-2 border-t border-rule text-[11px] text-ink-mute font-mono">
        no activation affordance · future gate authorization required per capability
      </p>
    </section>
  );
}
