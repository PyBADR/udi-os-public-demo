"use client";

// IR-40A-V2-DYNAMIC-PLATFORM-SHELL-BUILD — Data Observatory.
// 8 evidence categories rendered as candidate substrate cards. Counts
// are derived from the static adapter (data.ts) where applicable; for
// categories that have no live token count today the card displays
// "0 tokens · category reserved" without inventing data.

import { SOURCE_FAMILY_COUNTS, DATA_SIZE_MEASURES } from "@/lib/v2/overview/data";

interface CategoryCard {
  id: string;
  title: string;
  source_family_hint: string;
  count: number;
  status: "candidate" | "reserved";
  caveat: string;
}

function buildCategories(): CategoryCard[] {
  return [
    { id: "demographics",     title: "Demographics",          source_family_hint: "GASTAT · macro context",        count: SOURCE_FAMILY_COUNTS.GASTAT,        status: "candidate", caveat: "national statistic context · no per-zone derivation without reviewer signoff" },
    { id: "environmental",    title: "Environmental",         source_family_hint: "category reserved",              count: 0,                                   status: "reserved",  caveat: "no NDVI · no spectral-index · multispectral substrate not authorized" },
    { id: "poi",              title: "POI · Points of Interest", source_family_hint: "SaudiOpenData · public context", count: SOURCE_FAMILY_COUNTS.SaudiOpenData, status: "candidate", caveat: "open data context only · no official integration claim" },
    { id: "geography",        title: "Geography",             source_family_hint: "Balady · municipal reference",  count: SOURCE_FAMILY_COUNTS.Balady,        status: "candidate", caveat: "conceptual zones only · no official Riyadh municipal boundary" },
    { id: "municipal",        title: "Municipal Services",    source_family_hint: "Balady · municipal reference",  count: SOURCE_FAMILY_COUNTS.Balady,        status: "candidate", caveat: "reference context only · no enforcement · no automated inspection" },
    { id: "real_estate",      title: "Real Estate",           source_family_hint: "REGA · economic context",       count: SOURCE_FAMILY_COUNTS.REGA,          status: "candidate", caveat: "market signal context · no investment recommendation · no price prediction" },
    { id: "satellite",        title: "Satellite Evidence",    source_family_hint: "category reserved",              count: 0,                                   status: "reserved",  caveat: "no NDVI · no automated change detection · future gate required" },
    { id: "governance_refs",  title: "Governance References", source_family_hint: "constitutional reference",       count: DATA_SIZE_MEASURES.tokens_with_source_row_reference, status: "candidate", caveat: "every reviewed token carries a source row reference · advisory only" },
  ];
}

interface Props {
  selectedCategory: string | null;
  onCategory: (id: string | null) => void;
}

export function DataObservatorySection({ selectedCategory, onCategory }: Props) {
  const categories = buildCategories();
  return (
    <section
      aria-labelledby="observatory-title"
      className="bg-white border border-rule"
    >
      <header className="px-4 py-3 border-b border-rule flex items-baseline justify-between">
        <div>
          <h2 id="observatory-title" className="font-serif text-lg text-ink">
            Data Observatory · 8 categories
          </h2>
          <p className="mt-0.5 text-[11px] text-ink-mute font-mono">
            Candidate evidence substrate · advisory only · no production claim
          </p>
        </div>
        {selectedCategory && (
          <button
            type="button"
            onClick={() => onCategory(null)}
            className="text-xs text-accent hover:underline"
          >
            Clear
          </button>
        )}
      </header>
      <ul className="grid gap-2 p-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((c) => {
          const active = c.id === selectedCategory;
          return (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => onCategory(active ? null : c.id)}
                aria-pressed={active}
                className={[
                  "w-full text-start p-3 border bg-paper transition-colors",
                  active ? "border-accent ring-1 ring-accent/40" : "border-rule hover:border-accent/60",
                ].join(" ")}
              >
                <p className="text-[10px] uppercase tracking-wider text-ink-mute font-mono">
                  {c.source_family_hint}
                </p>
                <p className="mt-1 font-serif text-base text-ink leading-tight">
                  {c.title}
                </p>
                <p className="mt-1 font-mono text-xs text-ink tabular-nums">
                  {c.count} tokens · {c.status === "candidate" ? "candidate" : "category reserved"}
                </p>
                <p className="mt-2 text-[10px] text-ink-mute leading-snug">
                  {c.caveat}
                </p>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
