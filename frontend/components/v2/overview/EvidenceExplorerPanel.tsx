"use client";

// IR-40A-V2-DYNAMIC-PLATFORM-SHELL-BUILD — Evidence Explorer.
// Per-token listing rendered from the SOURCE_FAMILY_DETAILS sample
// tokens already present in data.ts. Reviewer-anchored display only;
// no fetch, no mutation, no enforcement framing.

import { useMemo, useState } from "react";
import { SOURCE_FAMILY_DETAILS } from "@/lib/v2/overview/data";

interface Props {
  selectedToken: string | null;
  onToken: (id: string | null) => void;
}

export function EvidenceExplorerPanel({ selectedToken, onToken }: Props) {
  const [familyFilter, setFamilyFilter] = useState<string>("all");
  const families = useMemo(
    () => ["all", ...SOURCE_FAMILY_DETAILS.map((f) => f.source_family)],
    []
  );
  const tokens = useMemo(() => {
    const all = SOURCE_FAMILY_DETAILS.flatMap((f) =>
      (f.sample_tokens || []).map((t) => ({
        ...t,
        source_family: f.source_family,
      }))
    );
    if (familyFilter === "all") return all;
    return all.filter((t) => t.source_family === familyFilter);
  }, [familyFilter]);

  return (
    <section
      aria-labelledby="evidence-explorer-title"
      className="bg-white border border-rule"
    >
      <header className="px-4 py-3 border-b border-rule flex items-baseline justify-between gap-3 flex-wrap">
        <div>
          <h2 id="evidence-explorer-title" className="font-serif text-lg text-ink">
            Evidence Explorer
          </h2>
          <p className="mt-0.5 text-[11px] text-ink-mute font-mono">
            Per-token reference list · candidate · reviewer-signed · sha256-anchored
          </p>
        </div>
        <label className="flex items-center gap-2 text-[11px] text-ink-mute font-mono">
          family:
          <select
            value={familyFilter}
            onChange={(e) => setFamilyFilter(e.target.value)}
            className="border border-rule bg-paper px-2 py-1 text-ink"
          >
            {families.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </label>
      </header>
      <div className="max-h-96 overflow-y-auto">
        <table className="w-full text-[11px] font-mono">
          <thead className="bg-paper border-b border-rule">
            <tr>
              <th className="text-start px-3 py-2 font-medium text-ink-mute">id</th>
              <th className="text-start px-3 py-2 font-medium text-ink-mute">family</th>
              <th className="text-start px-3 py-2 font-medium text-ink-mute">band</th>
              <th className="text-start px-3 py-2 font-medium text-ink-mute">sha256…</th>
              <th className="text-start px-3 py-2 font-medium text-ink-mute hidden lg:table-cell">path</th>
            </tr>
          </thead>
          <tbody>
            {tokens.map((t) => {
              const active = t.id === selectedToken;
              return (
                <tr
                  key={`${t.source_family}-${t.id}`}
                  className={[
                    "border-b border-rule cursor-pointer",
                    active ? "bg-accent-soft" : "hover:bg-paper",
                  ].join(" ")}
                  onClick={() => onToken(active ? null : t.id)}
                >
                  <td className="px-3 py-2 text-ink">{t.id}</td>
                  <td className="px-3 py-2 text-ink-soft">{t.source_family}</td>
                  <td className="px-3 py-2 text-ink-soft">{t.band}</td>
                  <td className="px-3 py-2 text-ink-mute">{t.sha256}…</td>
                  <td className="px-3 py-2 text-ink-mute hidden lg:table-cell truncate max-w-xl">{t.path}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="px-4 py-2 border-t border-rule text-[11px] text-ink-mute font-mono">
        {tokens.length} sample candidate tokens · advisory only · no production claim
      </p>
    </section>
  );
}
