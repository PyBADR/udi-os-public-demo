"use client";

// IR-42A-V2-DECISION-INTELLIGENCE-OS-UI-RESTRUCTURE — Overview use-case
// strip. 3 executive use-case cards (Municipal Review · Investor /
// Development Readiness · Insurance & Real Estate Risk Context) that
// give a first-screen visitor concrete answers to "who is this for".
// All wording remains advisory · candidate · reference-only.

import type { WorkspaceId } from "./LeftNavRail";

interface UseCase {
  id: string;
  title: string;
  audience: string;
  blurb: string;
  surfaces: string[];
  forbidden: string;
  open_in_workspace: WorkspaceId;
}

const CASES: UseCase[] = [
  {
    id: "UC01",
    title: "Municipal Review",
    audience: "municipal director · governance reviewer · GIS reviewer",
    blurb: "Reviewer-anchored evidence-to-decision surface for per-zone readiness, source-family governance, and per-action signoff queue.",
    surfaces: ["Riyadh Evidence Map", "Governance Console", "Next Human Action panel"],
    forbidden: "no enforcement · no automated decision · no official municipal boundary",
    open_in_workspace: "governance",
  },
  {
    id: "UC02",
    title: "Investor / Development Readiness",
    audience: "Bader Alabddan (owner reviewer) · investor reviewer · business reviewer",
    blurb: "Candidate-only readiness band context per Riyadh zone with per-source provenance and constitutional caveats.",
    surfaces: ["Overview hero map", "Readiness Bands panel", "Applications · Solution Gallery"],
    forbidden: "no return-of-investment framing · no investment recommendation · no price prediction · no outcome guarantee",
    open_in_workspace: "applications",
  },
  {
    id: "UC03",
    title: "Insurance & Real Estate Risk Context",
    audience: "insurance reviewer · risk officer · real-estate analyst",
    blurb: "Advisory exposure and market-signal reference using REGA + governance overlay; no underwriting or pricing decision is produced.",
    surfaces: ["Workflow Studio · WF-INS family", "Workflow Studio · WF-RETAIL family", "Right Decision Trace"],
    forbidden: "no underwriting decision · no pricing decision · no automated claim decision",
    open_in_workspace: "workflows",
  },
];

interface Props {
  onOpenSurface: (id: WorkspaceId) => void;
}

export function ExecutiveUseCaseCards({ onOpenSurface }: Props) {
  return (
    <section
      aria-labelledby="executive-use-cases-title"
      className="bg-white border border-rule"
    >
      <header className="px-4 py-3 border-b border-rule">
        <p className="text-[10px] uppercase tracking-wider text-ink-mute font-mono">
          Executive use cases · who this is for
        </p>
        <h2 id="executive-use-cases-title" className="mt-1 font-serif text-base text-ink leading-tight">
          3 candidate stakeholder framings · advisory only
        </h2>
      </header>
      <ul className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3">
        {CASES.map((c) => (
          <li key={c.id}>
            <article className="h-full p-3 border border-rule bg-paper flex flex-col">
              <p className="text-[10px] uppercase tracking-wider text-ink-mute font-mono">{c.id}</p>
              <p className="mt-1 font-serif text-base text-ink leading-tight">{c.title}</p>
              <p className="mt-1 text-[11px] text-ink-mute font-mono leading-snug">
                audience: {c.audience}
              </p>
              <p className="mt-2 text-[11px] text-ink-soft leading-snug flex-1">{c.blurb}</p>
              <p className="mt-2 text-[10px] text-ink-mute font-mono leading-snug">
                surfaces: {c.surfaces.join(" · ")}
              </p>
              <p className="mt-1 text-[10px] text-ink-mute italic leading-snug">
                forbidden: {c.forbidden}
              </p>
              <button
                type="button"
                onClick={() => onOpenSurface(c.open_in_workspace)}
                className="mt-2 self-start text-[11px] text-accent hover:underline"
              >
                Open relevant workspace →
              </button>
            </article>
          </li>
        ))}
      </ul>
      <p className="px-4 py-2 border-t border-rule text-[10px] text-ink-mute font-mono">
        advisory only · candidate only · municipal review remains the sole producer of consequential conclusions
      </p>
    </section>
  );
}
