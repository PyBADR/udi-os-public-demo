"use client";

// IR-40A-V2-DYNAMIC-PLATFORM-SHELL-BUILD — Top header bar.
// Project chip · governance posture pills · workspace breadcrumb ·
// reviewer-anchored note. Visual command-style search affordance is
// disabled (no backend); the affordance exists only to communicate the
// platform's identity as an executive workspace, not as a report page.

import { NAV_ITEMS, type WorkspaceId } from "./LeftNavRail";

interface Props {
  active: WorkspaceId;
  modeId: string;
  modeName: string;
}

export function TopHeader({ active, modeId, modeName }: Props) {
  const item = NAV_ITEMS.find((n) => n.id === active);
  return (
    <header
      aria-label="Workspace header"
      className="bg-white border-b border-rule px-4 py-2 flex items-center gap-4 flex-wrap"
    >
      <div className="flex items-baseline gap-2 min-w-0">
        <span className="text-[10px] uppercase tracking-wider text-ink-mute font-mono">
          GCC · Riyadh
        </span>
        <span className="text-ink-mute">·</span>
        <span className="font-serif text-sm text-ink truncate">
          {item?.label ?? "Overview"}
        </span>
        <span className="text-[10px] text-ink-mute font-mono">
          · {modeId} {modeName}
        </span>
      </div>
      <div className="flex-1" />
      <ul className="flex items-center gap-1 flex-wrap text-[10px] font-mono">
        <li className="px-2 py-0.5 border border-rule bg-paper text-ink-mute">
          Advisory only
        </li>
        <li className="px-2 py-0.5 border border-rule bg-paper text-ink-mute">
          Candidate-only
        </li>
        <li className="px-2 py-0.5 border border-rule bg-paper text-ink-mute">
          Reference only
        </li>
        <li className="px-2 py-0.5 border border-rule bg-paper text-ink-mute">
          Not production-ready
        </li>
        <li className="px-2 py-0.5 border border-rule bg-paper text-ink-mute">
          Municipal review is the sole producer
        </li>
      </ul>
      <div
        aria-disabled="true"
        className="hidden md:flex items-center gap-2 px-2 py-1 border border-rule bg-paper text-[11px] text-ink-mute font-mono cursor-not-allowed"
        title="Command palette · visual affordance only · no backend"
      >
        <span className="opacity-70">⌘K</span>
        <span>search · disabled in P0</span>
      </div>
      <div className="text-[10px] text-ink-mute font-mono leading-tight">
        <p>Owner Reviewer</p>
        <p className="text-ink">Bader Alabddan</p>
        <p>Deevo Analytics</p>
      </div>
    </header>
  );
}
