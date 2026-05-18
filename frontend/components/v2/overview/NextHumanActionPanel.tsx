"use client";

import { NHA_CARDS } from "@/lib/v2/overview/data";

interface Props {
  selectedLayer: string | null;
}

export function NextHumanActionPanel({ selectedLayer }: Props) {
  const cards = selectedLayer
    ? NHA_CARDS.filter((c) => c.layer_id === selectedLayer)
    : NHA_CARDS.slice(0, 6);
  return (
    <section
      aria-labelledby="nha-title"
      className="bg-white border border-rule"
    >
      <header className="px-4 py-3 border-b border-rule">
        <h2 id="nha-title" className="font-serif text-lg text-ink">
          Next human action
        </h2>
        <p className="mt-0.5 text-[11px] text-ink-mute font-mono">
          advisory recommendation · never auto-triggered · every reviewer signs in their own identity
        </p>
      </header>
      <ul className="divide-y divide-rule">
        {cards.map((c) => (
          <li key={c.layer_id} className="px-4 py-3">
            <p className="flex items-center justify-between gap-3">
              <span className="font-medium text-ink">{c.layer}</span>
              <span className="text-[10px] text-ink-mute font-mono">{c.layer_id}</span>
            </p>
            <p className="mt-1 text-sm text-ink-soft">{c.action}</p>
            <p className="mt-1 text-[11px] text-ink-mute font-mono">
              who: {c.who_acts}
            </p>
          </li>
        ))}
      </ul>
      {!selectedLayer && (
        <p className="px-4 py-2 border-t border-rule text-[11px] text-ink-mute font-mono">
          Showing first 6 of {NHA_CARDS.length} · click a kernel layer to filter.
        </p>
      )}
    </section>
  );
}
