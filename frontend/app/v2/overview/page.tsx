"use client";

// IR-40A-V2-DYNAMIC-PLATFORM-SHELL-BUILD — /v2/overview Dynamic
// Decision Intelligence Platform Shell. A single integrated executive
// platform · 9 workspace surfaces routed in-page · 9 mode transitions
// preserved inside the Overview surface · 11+ analytic sections ·
// reviewer-anchored · candidate-only · advisory.
//
// Inspired by the workspace posture of Palantir Foundry / CARTO /
// UrbanLogiq — none of their branding, components, themes, copy, or
// proprietary assets are referenced. No screenshots, no logos, no
// vendor SDK. Visual language remains the GCC institutional design
// system (paper · panel · ink · accent navy + amber-muted).
//
// Allowed scope: frontend/app/v2/overview/page.tsx ·
// frontend/components/v2/overview/*.tsx · frontend/lib/v2/overview/data.ts
// (last untouched in this sprint).
//
// Forbidden: backend · DB · SQL · PostgreSQL · PostGIS · ETL rerun ·
// score recalculation · ML / DL / physics / simulation activation ·
// dependency change · global CSS edit · commit / push / PR / merge /
// deploy · Palantir / CARTO / UrbanLogiq branding copying.
//
// Validation: npm run build must pass · /v2/overview must load ·
// no TS errors · no banned claims · no other /v2/* route referenced ·
// all 9 locked engines remain BLOCKED · advisory caveats remain visible.

import { useState } from "react";
import { LeftNavRail, type WorkspaceId } from "@/components/v2/overview/LeftNavRail";
import { TopHeader } from "@/components/v2/overview/TopHeader";
import { ExecutiveHero, ExecutiveMetricStrip } from "@/components/v2/overview/ExecutiveHero";
import { DynamicModeSwitcher } from "@/components/v2/overview/DynamicModeSwitcher";
// IR-41C-V2-OVERVIEW-MAP-HERO-PROMOTION: the lighter RiyadhConceptualMap
// is no longer rendered inside the Overview workspace — the richer
// RiyadhEvidenceMapSurface is promoted to the hero slot to avoid
// duplicate-map confusion. The lighter component is preserved on
// disk for any future compact-surface use.
import { RiyadhEvidenceMapSurface } from "@/components/v2/overview/RiyadhEvidenceMapSurface";
// IR-43A-REAL-MAP-OPERATING-SURFACE — real interactive MapLibre + MapTiler
// map promoted to the first product fold under the compact ExecutiveHero.
// The existing RiyadhEvidenceMapSurface (USGS reference canvas + collapsed
// 3x3 conceptual cards + before/after thumbnail strip) is preserved as
// secondary evidence directly below.
import { RiyadhRealMapSurface } from "@/components/v2/overview/RiyadhRealMapSurface";
import { DataSizeReadinessStrip } from "@/components/v2/overview/DataSizeReadinessStrip";
import { DecisionKernelLayerStatus } from "@/components/v2/overview/DecisionKernelLayerStatus";
import { MathematicalIntelligencePanel } from "@/components/v2/overview/MathematicalIntelligencePanel";
import { ReadinessBandsPanel } from "@/components/v2/overview/ReadinessBandsPanel";
import { EvidenceLineagePanel } from "@/components/v2/overview/EvidenceLineagePanel";
import { GovernanceTrustRail } from "@/components/v2/overview/GovernanceTrustRail";
import { LockedFutureEnginesRail } from "@/components/v2/overview/LockedFutureEnginesRail";
import { NextHumanActionPanel } from "@/components/v2/overview/NextHumanActionPanel";
import { RightExplanationPanel } from "@/components/v2/overview/RightExplanationPanel";
import { WorkflowCanvas } from "@/components/v2/overview/WorkflowCanvas";
import { BeforeAfterEvidenceTiles } from "@/components/v2/overview/BeforeAfterEvidenceTiles";
import { DataObservatorySection } from "@/components/v2/overview/DataObservatorySection";
import { ConnectionsPanel } from "@/components/v2/overview/ConnectionsPanel";
import { ApplicationsGallery } from "@/components/v2/overview/ApplicationsGallery";
import { DeveloperOntologyLayer } from "@/components/v2/overview/DeveloperOntologyLayer";
import { EvidenceExplorerPanel } from "@/components/v2/overview/EvidenceExplorerPanel";
import { DecisionIntelligenceStack } from "@/components/v2/overview/DecisionIntelligenceStack";
import { ExecutiveUseCaseCards } from "@/components/v2/overview/ExecutiveUseCaseCards";
// IR-44C — Intelligence OS UI Positioning Layer · /v2/overview section
import { PlatformIntelligenceOSSection } from "@/components/v2/overview/PlatformIntelligenceOSSection";
// IR-44C-R2 — small bilingual nav clarity caption rendered just above the
// IR-44C positioning section. One short line, EN + AR, no hero overwrite.
import { V2_IR44C_R2_NAV_CLARITY } from "@/lib/v2/data/bilingualBusinessLabels";
// IR-45 — Executive 30-Second Story + Buyer Pack Layer · /v2/overview top sections.
// Renders the Saudi/Riyadh executive narrative, decision journey, status strip,
// 75-second briefing, intelligence layers, buyer lens cards, and the evidence
// pack catalog above the IR-44C OS positioning section.
// IR-45R2 — split into Header (rendered ABOVE the Riyadh map for first-fold
// 30-second comprehension) and Detail (rendered AFTER the map + metric strip).
import { ExecutiveStoryHeader, ExecutiveStoryDetail } from "@/components/v2/overview/ExecutiveStoryLayer";
import { BuyerPackCatalog } from "@/components/v2/overview/BuyerPackCatalog";
// IR-46 — Overview Product Intelligence Compression Layer · six executive
// clusters surfaced above the analyst-depth surfaces. Long technical
// content (mode panels, kernel layer status, locked-engine grid, etc.)
// is preserved but tucked into a collapsible analyst-depth <details>.
import {
  ExecutiveIntelligenceStrip,
  ProductIntelligenceFlow,
  UrbanSignalFusionLayer,
  DecisionReadinessPanel,
  ExecutivePreviewCTA,
  BuyerPackLayerHeader,
  AnalystDepthCaveat,
} from "@/components/v2/overview/OverviewProductIntelligence";
import { V2_IR46_SECTION_LABELS, V2_IR47_OVERVIEW_TEASER } from "@/lib/v2/data/bilingualBusinessLabels";
import Link from "next/link";
import { FormulaEngineWorkspace } from "@/components/v2/overview/FormulaEngineWorkspace";
import {
  WorkflowConfigurationLayer,
  type WorkflowSelection,
} from "@/components/v2/overview/WorkflowConfigurationLayer";
import type {
  EngineFactor,
  WorkedExample,
} from "@/lib/v2/overview/decisionFormulaEngineConfig";
import { MODES, type ModeId } from "@/lib/v2/overview/data";
// IR-42B-V2-R3 — bilingual business-label layer (English primary · Arabic secondary)
import {
  V2_BILINGUAL_LABELS,
  V2_MAP_BUSINESS_LINE,
} from "@/lib/v2/data/bilingualBusinessLabels";

export const dynamic = "force-dynamic";

export default function Page() {
  const [workspace, setWorkspace] = useState<WorkspaceId>("overview");
  const [mode, setMode] = useState<ModeId>("M01");
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [selectedFormula, setSelectedFormula] = useState<string | null>(null);
  const [selectedBand, setSelectedBand] = useState<string | null>(null);
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedConnection, setSelectedConnection] = useState<string | null>(null);
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [selectedObject, setSelectedObject] = useState<string | null>(null);
  const [selectedToken, setSelectedToken] = useState<string | null>(null);
  const [workflowSelection, setWorkflowSelection] = useState<WorkflowSelection>({
    familyId: null,
    templateId: null,
  });
  const [selectedMapSourceLayerId, setSelectedMapSourceLayerId] = useState<string | null>(null);
  // IR-42A-R3 — Decision Formula Engine selection lifted to platform state
  const [selectedDecisionFactor, setSelectedDecisionFactor] = useState<EngineFactor | null>(null);
  const [selectedWorkedExample, setSelectedWorkedExample] = useState<WorkedExample | null>(null);

  const modeInfo = MODES.find((m) => m.mode_id === mode);

  return (
    <main className="bg-paper min-h-screen text-ink">
      <div className="grid grid-cols-1 lg:grid-cols-[16rem_minmax(0,1fr)] min-h-screen">
        {/* Left navigation rail (workspace) */}
        <div className="hidden lg:block">
          <LeftNavRail active={workspace} onSelect={setWorkspace} />
        </div>

        {/* Body */}
        <div className="flex flex-col min-w-0">
          <TopHeader
            active={workspace}
            modeId={mode}
            modeName={modeInfo?.mode_name ?? ""}
          />

          {/* Mobile workspace switcher (lg:hidden) */}
          <div className="lg:hidden border-b border-rule bg-white px-4 py-2 overflow-x-auto">
            <label className="text-[11px] text-ink-mute font-mono">
              workspace:{" "}
              <select
                value={workspace}
                onChange={(e) => setWorkspace(e.target.value as WorkspaceId)}
                className="border border-rule bg-paper px-2 py-1 text-ink ms-2"
              >
                <option value="overview">Overview</option>
                <option value="map">Map Surface</option>
                <option value="workflows">Workflow Engine</option>
                <option value="formula">Formula Engine</option>
                <option value="evidence">Evidence Explorer</option>
                <option value="observatory">Data Observatory</option>
                <option value="connections">Connections</option>
                <option value="applications">Applications</option>
                <option value="developer">Operating Ontology</option>
                <option value="governance">Governance</option>
              </select>
            </label>
          </div>

          {/* Workspace body grid: central area + sticky right trace panel */}
          <div className="flex-1 grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_22rem]">
            <section className="min-w-0 px-4 py-4 space-y-6">
              {workspace === "overview" && (
                <OverviewSurface
                  mode={mode}
                  setMode={setMode}
                  selectedZone={selectedZone}
                  setSelectedZone={setSelectedZone}
                  selectedFormula={selectedFormula}
                  setSelectedFormula={setSelectedFormula}
                  selectedBand={selectedBand}
                  setSelectedBand={setSelectedBand}
                  selectedSource={selectedSource}
                  setSelectedSource={setSelectedSource}
                  selectedLayer={selectedLayer}
                  setSelectedLayer={setSelectedLayer}
                  selectedMapSourceLayerId={selectedMapSourceLayerId}
                  setSelectedMapSourceLayerId={setSelectedMapSourceLayerId}
                  onPrimaryCta={setWorkspace}
                  onSecondaryCta={setWorkspace}
                />
              )}

              {workspace === "map" && (
                <>
                  <RiyadhEvidenceMapSurface
                    selectedZone={selectedZone}
                    onZone={setSelectedZone}
                    selectedLayerId={selectedMapSourceLayerId}
                    onLayer={setSelectedMapSourceLayerId}
                  />
                  <EvidenceLineagePanel selectedSource={selectedSource} onSource={setSelectedSource} />
                </>
              )}

              {workspace === "workflows" && (
                <>
                  <WorkflowCanvas selectedNode={selectedNode} onNode={setSelectedNode} />
                  <WorkflowConfigurationLayer
                    selection={workflowSelection}
                    onSelect={setWorkflowSelection}
                  />
                  <DecisionKernelLayerStatus selectedLayer={selectedLayer} onLayer={setSelectedLayer} />
                  <NextHumanActionPanel selectedLayer={selectedLayer} />
                </>
              )}

              {workspace === "formula" && (
                <FormulaEngineWorkspace
                  selectedFormula={selectedFormula}
                  onFormula={setSelectedFormula}
                  onSelectDecisionFactor={setSelectedDecisionFactor}
                  onSelectWorkedExample={setSelectedWorkedExample}
                />
              )}

              {workspace === "evidence" && (
                <>
                  <EvidenceExplorerStub
                    selectedToken={selectedToken}
                    setSelectedToken={setSelectedToken}
                  />
                  <EvidenceLineagePanel selectedSource={selectedSource} onSource={setSelectedSource} />
                </>
              )}

              {workspace === "observatory" && (
                <>
                  <DataObservatorySection
                    selectedCategory={selectedCategory}
                    onCategory={setSelectedCategory}
                  />
                  <DataSizeReadinessStrip />
                  <ReadinessBandsPanel selectedBand={selectedBand} onBand={setSelectedBand} />
                </>
              )}

              {workspace === "connections" && (
                <>
                  <ConnectionsPanel
                    selectedConnection={selectedConnection}
                    onConnection={setSelectedConnection}
                  />
                  <LockedFutureEnginesRail />
                </>
              )}

              {workspace === "applications" && (
                <ApplicationsGallery
                  onOpenSurface={setWorkspace}
                  selectedApp={selectedApp}
                  onApp={setSelectedApp}
                />
              )}

              {workspace === "developer" && (
                <DeveloperOntologyLayer
                  selectedObject={selectedObject}
                  onObject={setSelectedObject}
                  onSelectDecisionFactor={setSelectedDecisionFactor}
                  onSelectWorkedExample={setSelectedWorkedExample}
                />
              )}

              {workspace === "governance" && (
                <>
                  <GovernanceTrustRail />
                  <EvidenceLineagePanel selectedSource={selectedSource} onSource={setSelectedSource} />
                  <LockedFutureEnginesRail />
                </>
              )}
            </section>

            {/* Right trace panel — sticky on xl+ */}
            <aside className="xl:border-s xl:border-rule bg-paper">
              <div className="xl:sticky xl:top-0 xl:max-h-screen xl:overflow-y-auto p-4 space-y-4">
                <RightExplanationPanel
                  mode={mode}
                  selectedSource={selectedSource}
                  selectedZone={selectedZone}
                  selectedFormula={selectedFormula}
                  selectedBand={selectedBand}
                  selectedLayer={selectedLayer}
                  selectedWorkflowFamily={workflowSelection.familyId}
                  selectedWorkflowTemplate={workflowSelection.templateId}
                  selectedMapZoneId={selectedZone}
                  selectedMapSourceLayerId={selectedMapSourceLayerId}
                  selectedDecisionFactor={selectedDecisionFactor}
                  selectedWorkedExample={selectedWorkedExample}
                />
                <DecisionTraceContextCard
                  workspace={workspace}
                  selectedNode={selectedNode}
                  selectedCategory={selectedCategory}
                  selectedConnection={selectedConnection}
                  selectedApp={selectedApp}
                  selectedObject={selectedObject}
                  selectedToken={selectedToken}
                  workflowFamilyId={workflowSelection.familyId}
                  workflowTemplateId={workflowSelection.templateId}
                />
              </div>
            </aside>
          </div>

          <footer className="border-t border-rule bg-white py-4">
            <div className="px-6 text-[11px] text-ink-mute font-mono flex flex-wrap gap-x-4 gap-y-1">
              <span>· P0 build · IR-43A-REAL-MAP-OPERATING-SURFACE</span>
              <span>· advisory only · candidate only · not production ready</span>
              <span>· /v2/overview · single integrated platform surface</span>
              <span>· no prediction · not a financial-performance claim · no investment recommendation · not a compliance authority</span>
              <span>· no NDVI · no automated change detection · no live DB · no ML</span>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}

interface OverviewProps {
  mode: ModeId;
  setMode: (m: ModeId) => void;
  selectedZone: string | null;
  setSelectedZone: (s: string | null) => void;
  selectedFormula: string | null;
  setSelectedFormula: (s: string | null) => void;
  selectedBand: string | null;
  setSelectedBand: (s: string | null) => void;
  selectedSource: string | null;
  setSelectedSource: (s: string | null) => void;
  selectedLayer: string | null;
  setSelectedLayer: (s: string | null) => void;
  selectedMapSourceLayerId: string | null;
  setSelectedMapSourceLayerId: (s: string | null) => void;
  onPrimaryCta: (w: WorkspaceId) => void;
  onSecondaryCta: (w: WorkspaceId) => void;
}

// IR-41C-V2-OVERVIEW-MAP-HERO-PROMOTION — Overview composition.
// The rich RiyadhEvidenceMapSurface is promoted to the Overview hero
// slot directly under ExecutiveHero, so the first visitor experience
// communicates Riyadh-first geospatial evidence intelligence — not a
// governance report. The lighter RiyadhConceptualMap is removed from
// the per-mode kitchen-sink stack to avoid duplicate-map confusion;
// the same component remains available for other surfaces that may
// want a compact map in the future. The Map Surface workspace
// continues to render the same RiyadhEvidenceMapSurface; the visitor
// can also click the secondary CTA in ExecutiveHero ("Open Riyadh
// Evidence Surface") to switch into the dedicated Map workspace for
// a fuller map-focused view.
function OverviewSurface(p: OverviewProps) {
  const { mode, setMode } = p;
  return (
    <>
      {/* IR-42B-V2-R7 — compact hero (no lede, no chips, no engine line) so the
          map dominates the first fold. Metrics moved BELOW the map via
          ExecutiveMetricStrip; engine BLOCKED line moves into the footer area. */}
      <ExecutiveHero onPrimary={p.onPrimaryCta} onSecondary={p.onSecondaryCta} compact />

      {/* IR-46 — Executive Intelligence Strip (cluster 1). Title:
          "GCC Urban Decision Intelligence OS". 4 advisory metrics:
          Signals Ingested · Evidence Objects · Readiness Paths · Buyer Packs.
          Replaces the older ExecutiveMetricStrip in the executive-first read;
          the analyst metric strip is preserved inside the Analyst depth
          <details> section below. */}
      <ExecutiveIntelligenceStrip />

      {/* IR-45R2 — Executive Story Header (hero + 30-second journey + status
          strip). Kept above the map for first-fold 30-second comprehension. */}
      <ExecutiveStoryHeader />

      {/* IR-46 — Product Intelligence Flow (cluster 2). 5-step flow:
          Urban Signals → Evidence Layer → Mathematical Core → Decision
          Readiness → Buyer Pack. This is the new heart of the page. */}
      <ProductIntelligenceFlow />

      {/* IR-46 — Urban Signal Fusion Layer (cluster 3). 5 compact cards
          (Population & Mobility, Real Estate & Economy, Municipal & Planning,
          Infrastructure & Telecom, Insurance & Risk) with platform meaning
          and safe status labels. */}
      <UrbanSignalFusionLayer />

      {/* IR-42B-V2-R7 — MAP-FIRST FIX (R7): one-line bilingual title + compact
          3-chip caveat strip; full bilingual business line + 10-bullet caveat
          strip moved INSIDE the map surface as a small footer. */}
      <section
        aria-labelledby="riyadh-evidence-operating-surface-title"
        className="space-y-2"
      >
        <header className="flex items-baseline justify-between gap-3 flex-wrap">
          <div className="flex items-baseline gap-3 flex-wrap">
            <h2
              id="riyadh-evidence-operating-surface-title"
              className="font-serif text-xl text-ink leading-tight"
            >
              {V2_BILINGUAL_LABELS.map_operating_surface.en}
            </h2>
            <span lang="ar" dir="rtl" className="font-serif text-base text-ink-mute leading-tight">
              · {V2_BILINGUAL_LABELS.map_operating_surface.ar}
            </span>
          </div>
          {/* IR-43A-R2 — chips drop font-mono from the parent so Arabic spans
              don't inherit a monospace family that breaks glyph shaping.
              English keeps the monospace telemetry feel via an inner span. */}
          <ul className="flex flex-wrap gap-1 text-[10px]">
            <li className="px-1.5 py-0.5 border border-rule bg-paper text-ink-mute">
              <span className="font-mono">{V2_BILINGUAL_LABELS.governance_advisory_only.en}</span> ·{" "}
              <span lang="ar" dir="rtl" className="font-sans normal-case tracking-normal [unicode-bidi:isolate]">{V2_BILINGUAL_LABELS.governance_advisory_only.ar}</span>
            </li>
            <li className="px-1.5 py-0.5 border border-rule bg-paper text-ink-mute">
              <span className="font-mono">{V2_BILINGUAL_LABELS.evidence_reference_imagery.en}</span> ·{" "}
              <span lang="ar" dir="rtl" className="font-sans normal-case tracking-normal [unicode-bidi:isolate]">{V2_BILINGUAL_LABELS.evidence_reference_imagery.ar}</span>
            </li>
            <li className="px-1.5 py-0.5 border border-rule bg-paper text-ink-mute">
              <span className="font-mono">{V2_BILINGUAL_LABELS.boundary_no_official.en}</span> ·{" "}
              <span lang="ar" dir="rtl" className="font-sans normal-case tracking-normal [unicode-bidi:isolate]">{V2_BILINGUAL_LABELS.boundary_no_official.ar}</span>
            </li>
          </ul>
        </header>
        {/* IR-43A — REAL MapLibre + MapTiler map mounted FIRST (above the
            existing USGS reference canvas), so a visitor sees an actual
            interactive map workspace. Shared selectedZone state means the
            existing reference canvas below auto-follows zone selection. */}
        <RiyadhRealMapSurface
          selectedZone={p.selectedZone}
          onZone={p.setSelectedZone}
        />
        <RiyadhEvidenceMapSurface
          selectedZone={p.selectedZone}
          onZone={p.setSelectedZone}
          selectedLayerId={p.selectedMapSourceLayerId}
          onLayer={p.setSelectedMapSourceLayerId}
        />
      </section>

      {/* IR-46 — Decision Readiness Panel (cluster 4). 5 readiness states
          (Ready for Reference, Review Pending, Governance Limited,
          Insufficient Evidence, Blocked from Decision Use) plus the
          constitutional boundary line ("Advisory only · Municipal review
          remains the source of consequential decision"). */}
      <DecisionReadinessPanel />

      {/* IR-46 — Buyer Pack Layer (cluster 5). Compact bilingual header,
          then the existing IR-45 BuyerPackCatalog (5 buyer cards). */}
      <BuyerPackLayerHeader />
      <BuyerPackCatalog />

      {/* IR-46 — 75-Second Executive Preview (cluster 6). Compact CTA
          opening the Workflow Engine workspace plus 5 time-stamped lines
          (0-10s … 55-75s). */}
      <ExecutivePreviewCTA onOpenWorkspace={p.onPrimaryCta} />

      {/* IR-44C-R2 — small bilingual nav-clarity caption. One short
          line distinguishing executive navigation from the workspace
          rail. Does not overwrite hero copy. */}
      <p
        data-testid="ir44c-r2-nav-clarity"
        className="text-[12px] text-ink-mute font-mono leading-relaxed flex flex-wrap items-baseline gap-x-2 gap-y-1"
      >
        <span>{V2_IR44C_R2_NAV_CLARITY.en}</span>
        <span
          lang="ar"
          dir="rtl"
          className="font-sans normal-case tracking-normal [unicode-bidi:isolate]"
        >
          · {V2_IR44C_R2_NAV_CLARITY.ar}
        </span>
      </p>

      {/* IR-44C — Platform Intelligence OS positioning section · 3 cards,
          surface tiers, what-this-is / what-this-is-not. Preserved as
          part of the executive-first read so the OS framing remains visible
          before the analyst-depth collapse. */}
      <PlatformIntelligenceOSSection />

      {/* IR-47 — Partner Intelligence Backbone teaser. Compact bilingual
          card with a single CTA opening the dedicated /v2/partner-backbone
          page. Advisory architecture mapping only — no active cloud
          integration claim. Kept compact so the IR-46 six-cluster read
          remains the dominant first impression. */}
      <PartnerBackboneTeaser />

      {/* IR-46 — Analyst depth · collapsible secondary surface. All
          analyst-heavy mode-driven panels, the original ExecutiveMetricStrip,
          ExecutiveStoryDetail (75-second briefing + 9-layer intelligence
          summary), DecisionIntelligenceStack, ExecutiveUseCaseCards, the
          DynamicModeSwitcher with its mode panels, the data-size readiness
          strip, and the locked-future-engines rail are preserved here but
          moved out of the executive first read. The boundary above
          (advisory only · municipal review) remains in force for every
          surface below. */}
      <details
        data-testid="ir46-analyst-depth"
        className="bg-white border border-rule"
      >
        <summary
          className="cursor-pointer select-none px-4 py-3 border-b border-rule text-[12px] font-mono text-ink-soft leading-relaxed flex flex-wrap items-baseline gap-x-2 gap-y-1"
          data-testid="ir46-analyst-depth-summary"
        >
          <span>{V2_IR46_SECTION_LABELS.analyst_depth_label.en}</span>
          <span
            lang="ar"
            dir="rtl"
            className="font-sans normal-case tracking-normal [unicode-bidi:isolate]"
          >
            · {V2_IR46_SECTION_LABELS.analyst_depth_label.ar}
          </span>
        </summary>
        <div className="px-4 py-4 space-y-6">
          <AnalystDepthCaveat />

          {/* IR-42B-V2-R7 — original metric strip preserved as analyst detail */}
          <ExecutiveMetricStrip />

          {/* IR-45R2 — 75-second briefing + 9-layer intelligence summary */}
          <ExecutiveStoryDetail />

          {/* IR-42A-V2 — Decision Intelligence Stack strip */}
          <DecisionIntelligenceStack />

          {/* IR-42A-V2 — 3 executive use-case cards */}
          <ExecutiveUseCaseCards onOpenSurface={p.onPrimaryCta} />

          <div className="grid gap-6 lg:grid-cols-[12rem_minmax(0,1fr)]">
            <aside>
              <DynamicModeSwitcher mode={mode} onChange={setMode} />
            </aside>
            <div className="space-y-6 min-w-0">
              {(mode === "M01" || mode === "M04") && (
                <MathematicalIntelligencePanel
                  selectedFormula={p.selectedFormula}
                  onFormula={p.setSelectedFormula}
                />
              )}

              {(mode === "M01" || mode === "M04") && (
                <ReadinessBandsPanel
                  selectedBand={p.selectedBand}
                  onBand={p.setSelectedBand}
                />
              )}

              {(mode === "M01" || mode === "M03" || mode === "M07" || mode === "M09") && (
                <EvidenceLineagePanel
                  selectedSource={p.selectedSource}
                  onSource={p.setSelectedSource}
                />
              )}

              {(mode === "M01" || mode === "M04" || mode === "M07") && (
                <DecisionKernelLayerStatus
                  selectedLayer={p.selectedLayer}
                  onLayer={p.setSelectedLayer}
                />
              )}

              {(mode === "M01" || mode === "M06") && (
                <NextHumanActionPanel selectedLayer={p.selectedLayer} />
              )}
            </div>
          </div>

          <DataSizeReadinessStrip />
          <LockedFutureEnginesRail />
        </div>
      </details>
    </>
  );
}

function EvidenceExplorerStub({
  selectedToken,
  setSelectedToken,
}: {
  selectedToken: string | null;
  setSelectedToken: (s: string | null) => void;
}) {
  return <EvidenceExplorerPanel selectedToken={selectedToken} onToken={setSelectedToken} />;
}

interface TraceProps {
  workspace: WorkspaceId;
  selectedNode: string | null;
  selectedCategory: string | null;
  selectedConnection: string | null;
  selectedApp: string | null;
  selectedObject: string | null;
  selectedToken: string | null;
  workflowFamilyId: string | null;
  workflowTemplateId: string | null;
}

function DecisionTraceContextCard(p: TraceProps) {
  const rows: Array<{ k: string; v: string | null }> = [
    { k: "workspace",       v: p.workspace },
    { k: "node",            v: p.selectedNode },
    { k: "category",        v: p.selectedCategory },
    { k: "connection",      v: p.selectedConnection },
    { k: "app",             v: p.selectedApp },
    { k: "object",          v: p.selectedObject },
    { k: "token",           v: p.selectedToken },
    { k: "workflowFamily",  v: p.workflowFamilyId },
    { k: "workflowTemplate",v: p.workflowTemplateId },
  ].filter((r) => r.v != null);
  return (
    <section
      aria-labelledby="trace-ctx-title"
      className="bg-white border border-rule"
    >
      <header className="px-4 py-2 border-b border-rule">
        <p className="text-[10px] uppercase tracking-wider text-ink-mute font-mono">
          Decision trace · workspace context
        </p>
        <h2 id="trace-ctx-title" className="font-serif text-sm text-ink mt-0.5">
          {p.workspace}
        </h2>
      </header>
      <div className="px-4 py-3 text-[11px] font-mono space-y-1">
        {rows.length === 0 ? (
          <p className="text-ink-mute italic">
            Select a workflow node, observatory category, connection, application, ontology object, or token to see its context here.
          </p>
        ) : (
          rows.map((r) => (
            <p key={r.k} className="text-ink-soft">
              <span className="text-ink-mute">{r.k}:</span> {r.v}
            </p>
          ))
        )}
      </div>
      <p className="px-4 py-2 border-t border-rule text-[10px] text-ink-mute font-mono">
        advisory · candidate · municipal review remains the sole producer of consequential conclusions
      </p>
    </section>
  );
}

// IR-47 — Partner Intelligence Backbone teaser. Compact card with a
// bilingual title + body + single CTA opening the dedicated
// /v2/partner-backbone route. Advisory architecture mapping only.
function PartnerBackboneTeaser() {
  const t = V2_IR47_OVERVIEW_TEASER;
  return (
    <section
      aria-labelledby="ir47-overview-teaser-title"
      data-testid="ir47-overview-teaser"
      className="bg-white border border-rule px-6 py-4 space-y-2"
    >
      <p className="text-[11px] uppercase tracking-wider text-ink-mute font-mono space-x-1">
        <span>{t.eyebrow.en}</span>
        <span
          lang="ar"
          dir="rtl"
          className="font-sans normal-case tracking-normal [unicode-bidi:isolate]"
        >
          · {t.eyebrow.ar}
        </span>
      </p>
      <h2
        id="ir47-overview-teaser-title"
        className="font-serif text-lg text-ink leading-tight"
      >
        {t.title.en}{" "}
        <span
          lang="ar"
          dir="rtl"
          className="text-ink-mute text-base [unicode-bidi:isolate]"
        >
          · {t.title.ar}
        </span>
      </h2>
      <p className="text-[13px] text-ink-soft leading-snug max-w-3xl">
        {t.body.en}
      </p>
      <p
        lang="ar"
        dir="rtl"
        className="text-[13px] text-ink-soft leading-snug max-w-3xl [unicode-bidi:isolate]"
      >
        {t.body.ar}
      </p>
      <div className="pt-1">
        <Link
          href="/v2/partner-backbone"
          data-testid="ir47-overview-teaser-cta"
          className="inline-flex items-baseline gap-2 px-3 py-1.5 border border-rule bg-paper text-sm text-ink hover:bg-white transition-colors"
        >
          <span>{t.cta.en}</span>
          <span
            lang="ar"
            dir="rtl"
            className="text-ink-mute text-[12px] [unicode-bidi:isolate]"
          >
            · {t.cta.ar}
          </span>
        </Link>
      </div>
    </section>
  );
}
