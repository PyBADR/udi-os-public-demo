"use client";

// IR-40A-V2-DYNAMIC-PLATFORM-SHELL-BUILD — Connections panel.
// 1 active connection (local evidence pack via static adapter) and
// 5 future-gated connection slots (DB, ML, MCP, Playwright, third-party
// imagery). Communicates the platform's connector posture without
// implying any live integration that does not exist.

interface ConnectionRow {
  id: string;
  name: string;
  kind: "active" | "future_gate";
  caveat: string;
  gate?: string;
}

const ROWS: ConnectionRow[] = [
  { id: "C01", name: "Local Evidence Pack",          kind: "active",      caveat: "RIY-Riyadh-Evidence-Pack · SHA-256 anchored · reviewer-signed" },
  { id: "C02", name: "Static JSON Adapter",          kind: "active",      caveat: "deterministic snapshot from gate3 / mc_run outputs · no fetch · no mutation" },
  { id: "C03", name: "PostgreSQL / PostGIS",         kind: "future_gate", gate: "future DB gate (E14 prereq)", caveat: "NO live DB · file-based today · BLOCKED · value=0" },
  { id: "C04", name: "ML / DL pipeline",             kind: "future_gate", gate: "future ML gate (E15 · E16 · E17)", caveat: "no model · no inference · BLOCKED · value=0" },
  { id: "C05", name: "Simulation runtime",           kind: "future_gate", gate: "future Simulation gate (E13)",     caveat: "scenario eligibility framing only · no simulated outcome · BLOCKED" },
  { id: "C06", name: "Physics / Geometry runtime",   kind: "future_gate", gate: "future Physics gate (E14)",        caveat: "no propagation · no capacity prediction · BLOCKED" },
];

interface Props {
  selectedConnection: string | null;
  onConnection: (id: string | null) => void;
}

export function ConnectionsPanel({ selectedConnection, onConnection }: Props) {
  return (
    <section
      aria-labelledby="connections-title"
      className="bg-white border border-rule"
    >
      <header className="px-4 py-3 border-b border-rule flex items-baseline justify-between">
        <div>
          <h2 id="connections-title" className="font-serif text-lg text-ink">
            Connections
          </h2>
          <p className="mt-0.5 text-[11px] text-ink-mute font-mono">
            2 active (local) · 4 future-gated · no third-party imagery vendor
          </p>
        </div>
        {selectedConnection && (
          <button
            type="button"
            onClick={() => onConnection(null)}
            className="text-xs text-accent hover:underline"
          >
            Clear
          </button>
        )}
      </header>
      <ul className="divide-y divide-rule">
        {ROWS.map((r) => {
          const active = r.id === selectedConnection;
          const isLive = r.kind === "active";
          return (
            <li key={r.id}>
              <button
                type="button"
                onClick={() => onConnection(active ? null : r.id)}
                aria-pressed={active}
                className={[
                  "w-full text-start px-4 py-3 transition-colors",
                  active ? "bg-accent-soft" : "hover:bg-paper",
                ].join(" ")}
              >
                <div className="flex items-baseline justify-between gap-3 flex-wrap">
                  <p className="font-serif text-sm text-ink">{r.name}</p>
                  <span className={[
                    "px-1.5 py-0.5 border text-[10px] font-mono",
                    isLive
                      ? "border-accent text-accent bg-accent-soft"
                      : "border-risk-high text-risk-high bg-risk-high/[0.04]",
                  ].join(" ")}>
                    {isLive ? "active · candidate" : "BLOCKED · future gate"}
                  </span>
                </div>
                {r.gate && (
                  <p className="mt-1 text-[10px] text-ink-mute font-mono">
                    gate: {r.gate}
                  </p>
                )}
                <p className="mt-1 text-[11px] text-ink-mute leading-snug">
                  {r.caveat}
                </p>
              </button>
            </li>
          );
        })}
      </ul>
      <p className="px-4 py-2 border-t border-rule text-[11px] text-ink-mute font-mono">
        No MCP · no Playwright · no Figma · no vendor imagery · no DB · no ML today
      </p>
    </section>
  );
}
