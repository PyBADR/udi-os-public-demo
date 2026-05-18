"use client";

import { MODES, type ModeId } from "@/lib/v2/overview/data";

interface Props {
  mode: ModeId;
  onChange: (m: ModeId) => void;
}

export function DynamicModeSwitcher({ mode, onChange }: Props) {
  return (
    <nav
      aria-label="Dynamic surface modes"
      className="bg-white border border-rule"
    >
      <div className="px-3 py-2 border-b border-rule">
        <p className="text-[11px] uppercase tracking-wider text-ink-mute font-mono">
          Dynamic surface · 9 modes
        </p>
      </div>
      <ul className="divide-y divide-rule">
        {MODES.map((m) => {
          const active = m.mode_id === mode;
          return (
            <li key={m.mode_id}>
              <button
                type="button"
                onClick={() => onChange(m.mode_id as ModeId)}
                aria-pressed={active}
                className={[
                  "w-full text-start px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-accent-soft text-accent border-s-2 border-accent"
                    : "text-ink-soft hover:bg-paper hover:text-ink",
                ].join(" ")}
              >
                <span className="block font-medium">{m.mode_name}</span>
                <span className="mt-0.5 block text-[11px] text-ink-mute font-mono">
                  {m.mode_id}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <p className="px-3 py-2 text-[11px] text-ink-mute border-t border-rule">
        URL stays /v2/overview. Mode changes update the central surface
        and the right explanation panel.
      </p>
    </nav>
  );
}
