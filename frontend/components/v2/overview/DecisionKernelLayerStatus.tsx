"use client";

import { LAYER_CARDS } from "@/lib/v2/overview/data";

interface Props {
  selectedLayer: string | null;
  onLayer: (id: string | null) => void;
}

const STATUS_LABEL: Record<string, string> = {
  active_candidate_runtime: "Active candidate runtime",
  foundation_ready: "Foundation ready",
  locked_future_gate: "Locked · future gate",
};

const STATUS_DOT: Record<string, string> = {
  active_candidate_runtime: "bg-risk-low",
  foundation_ready: "bg-amber-muted",
  locked_future_gate: "bg-risk-high",
};

export function DecisionKernelLayerStatus({ selectedLayer, onLayer }: Props) {
  const groups: Array<["active_candidate_runtime" | "foundation_ready" | "locked_future_gate", string]> = [
    ["active_candidate_runtime", "Active candidate runtime"],
    ["foundation_ready", "Foundation ready"],
    ["locked_future_gate", "Locked · future gate"],
  ];
  return (
    <section
      aria-labelledby="kernel-title"
      className="bg-white border border-rule"
    >
      <header className="px-4 py-3 border-b border-rule">
        <h2 id="kernel-title" className="font-serif text-lg text-ink">
          Decision Kernel layer status
        </h2>
        <p className="mt-0.5 text-[11px] text-ink-mute font-mono">
          17 layers · advisory · candidate · click for details
        </p>
      </header>
      <div className="p-4 space-y-4">
        {groups.map(([status, title]) => {
          const layers = LAYER_CARDS.filter((l) => l.status === status);
          return (
            <div key={status}>
              <p className="text-[11px] uppercase tracking-wider text-ink-mute font-mono mb-2">
                {title} · {layers.length}
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {layers.map((l) => {
                  const active = selectedLayer === l.layer_id;
                  return (
                    <li key={l.layer_id}>
                      <button
                        type="button"
                        onClick={() => onLayer(active ? null : l.layer_id)}
                        className={[
                          "w-full text-start px-3 py-2 border text-sm transition-colors",
                          active
                            ? "border-accent bg-accent-soft text-accent"
                            : "border-rule bg-paper text-ink-soft hover:bg-panel hover:text-ink",
                        ].join(" ")}
                      >
                        <span className="flex items-center gap-2">
                          <span className={["inline-block w-2 h-2 rounded-full", STATUS_DOT[l.status]].join(" ")} />
                          <span className="font-medium text-ink">{l.layer_name}</span>
                        </span>
                        <span className="mt-1 block text-[11px] text-ink-mute font-mono">
                          {l.layer_id} · {STATUS_LABEL[l.status]}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
