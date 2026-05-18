"use client";

// IR-42A-V2-DECISION-INTELLIGENCE-OS-UI-RESTRUCTURE — Overview stack
// strip. Renders the 7-stage Decision Intelligence stack as a quiet
// horizontal strip so the first-screen visitor can read the platform's
// composition at a glance:
//   Evidence Registry → Data Science → Mathematical Core →
//   Formula Engine → Readiness Bands → Governance → Next Human Action
//
// Read-only · configuration only · no live data binding.

interface StackStage {
  id: string;
  label: string;
  layer: string;
  caveat: string;
}

const STAGES: StackStage[] = [
  { id: "ST01", label: "Evidence Registry",  layer: "Evidence Infrastructure",          caveat: "reviewer-anchored · sha256 · candidate" },
  { id: "ST02", label: "Data Science Layer", layer: "Data Science Intelligence",        caveat: "foundation_ready · NO ML active" },
  { id: "ST03", label: "Mathematical Core",  layer: "Mathematical Core (MC-A..MC-J)",   caveat: "rule-based · advisory · candidate" },
  { id: "ST04", label: "Formula Engine",     layer: "Decision Formula & Relationship",  caveat: "evidence × graph × MC × DS × MM-E × gov × workflow × human" },
  { id: "ST05", label: "Readiness Bands",    layer: "5 allowed bands · advisory",       caveat: "not production · not prediction" },
  { id: "ST06", label: "Governance",         layer: "constitutional posture",            caveat: "always visible · widening requires amendment" },
  { id: "ST07", label: "Next Human Action",  layer: "17 NHA cards · per kernel layer",   caveat: "municipal review is the sole producer" },
];

export function DecisionIntelligenceStack() {
  return (
    <section
      aria-labelledby="di-stack-title"
      className="bg-white border border-rule"
    >
      <header className="px-4 py-3 border-b border-rule">
        <p className="text-[10px] uppercase tracking-wider text-ink-mute font-mono">
          Decision Intelligence Stack · GCC Urban Decision Intelligence OS
        </p>
        <h2 id="di-stack-title" className="mt-1 font-serif text-base text-ink leading-tight">
          Evidence → Data Science → Mathematical Core → Formula Engine → Readiness Bands → Governance → Next Human Action
        </h2>
      </header>
      <ol className="grid gap-2 p-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
        {STAGES.map((s, idx) => (
          <li key={s.id} className="border border-rule bg-paper p-2 flex flex-col">
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-[10px] uppercase tracking-wider text-ink-mute font-mono">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span className="text-[10px] text-ink-mute font-mono">{s.id}</span>
            </div>
            <p className="mt-1 font-serif text-sm text-ink leading-tight">{s.label}</p>
            <p className="mt-1 text-[10px] text-ink-mute font-mono leading-snug">{s.layer}</p>
            <p className="mt-1 text-[10px] text-ink-mute leading-snug">{s.caveat}</p>
          </li>
        ))}
      </ol>
      <p className="px-4 py-2 border-t border-rule text-[10px] text-ink-mute font-mono">
        advisory · candidate · municipal review remains the sole producer of consequential conclusions
      </p>
    </section>
  );
}
