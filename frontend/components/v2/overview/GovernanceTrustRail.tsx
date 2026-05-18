"use client";

import { useState } from "react";
import { GOVERNANCE_ALWAYS_VISIBLE, GOVERNANCE_ONE_CLICK } from "@/lib/v2/overview/data";

export function GovernanceTrustRail() {
  const [open, setOpen] = useState(false);
  return (
    <section
      aria-labelledby="governance-title"
      className="bg-panel border border-rule"
    >
      <header className="px-4 py-3 border-b border-rule flex items-center justify-between">
        <div>
          <h2 id="governance-title" className="font-serif text-lg text-ink">
            Governance trust rail
          </h2>
          <p className="mt-0.5 text-[11px] text-ink-mute font-mono">
            advisory · candidate · constitutional posture
          </p>
        </div>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="text-xs text-accent hover:underline"
        >
          {open ? "Hide" : "Show"} forbidden-claims
        </button>
      </header>
      <ul className="divide-y divide-rule">
        {GOVERNANCE_ALWAYS_VISIBLE.map((line) => (
          <li key={line} className="px-4 py-2 text-sm text-ink-soft">
            · {line}
          </li>
        ))}
      </ul>
      {open && (
        <ul className="divide-y divide-rule bg-paper">
          {GOVERNANCE_ONE_CLICK.map((line) => (
            <li key={line} className="px-4 py-2 text-[11px] text-ink-mute font-mono">
              · {line}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
