"use client";

// IR-41A-V2-RIYADH-EVIDENCE-MAP-BINDING — Evidence metadata drawer.
// Renders the metadata of the currently selected (zone, source layer)
// pair. Pure UI display; no fetch, no mutation, no reviewer signoff
// emitted from this surface.

import {
  RIYADH_METADATA_FIELDS,
  findSourceLayerById,
  findZoneById,
} from "@/lib/v2/overview/riyadhMapConfig";

interface Props {
  selectedZoneId: string | null;
  selectedLayerId: string | null;
}

export function EvidenceMetadataDrawer({ selectedZoneId, selectedLayerId }: Props) {
  const zone = findZoneById(selectedZoneId);
  const source = findSourceLayerById(selectedLayerId);

  return (
    <aside
      aria-labelledby="evidence-metadata-title"
      className="bg-white border border-rule"
    >
      <header className="px-3 py-2 border-b border-rule">
        <p className="text-[10px] uppercase tracking-wider text-ink-mute font-mono">
          Evidence metadata · drawer
        </p>
        <h3
          id="evidence-metadata-title"
          className="mt-0.5 font-serif text-sm text-ink leading-tight"
        >
          {zone ? zone.label : "Select a zone"}
          {source && (
            <span className="ms-2 text-[11px] text-ink-mute font-mono">
              · {source.label}
            </span>
          )}
        </h3>
      </header>

      {!zone && !source ? (
        <p className="px-3 py-3 text-[11px] text-ink-mute italic">
          Click a zone on the map or a source-layer chip to see its metadata, reviewer status, and governance limitation here.
        </p>
      ) : (
        <dl className="divide-y divide-rule">
          {/* Zone fields */}
          {zone && (
            <>
              <Field label="Zone ID"           value={zone.id} mono />
              <Field label="Zone role"         value={zone.role.replace(/_/g, " ")} mono />
              <Field label="Evidence posture"  value={zone.evidencePosture.replace(/_/g, " ")} mono />
              <Field label="Readiness posture" value={zone.readinessPosture.replace(/_/g, " ")} mono />
              <Field label="Source families">
                <ul className="space-y-0.5">
                  {zone.sourceFamilies.map((sf) => (
                    <li key={sf} className="text-[11px] text-ink-soft">· {sf}</li>
                  ))}
                </ul>
              </Field>
              {zone.missingEvidence.length > 0 && (
                <Field label="Missing evidence">
                  <ul className="space-y-0.5">
                    {zone.missingEvidence.map((m) => (
                      <li key={m} className="text-[11px] text-ink-mute border-s ps-2 border-amber-muted">
                        {m}
                      </li>
                    ))}
                  </ul>
                </Field>
              )}
              <Field label="Next human action" value={zone.nextHumanAction} />
              <Field label="Governance limitation" value={zone.limitationNote} muted />
            </>
          )}
          {/* Source-layer fields */}
          {source && (
            <>
              <Field label="Selected source layer" value={source.label} />
              <Field label="Evidence role"        value={source.evidenceRole} />
              <Field label="Allowed use">
                <ul className="space-y-0.5">
                  {source.allowedUse.map((u) => (
                    <li key={u} className="text-[11px] text-ink-soft">· {u}</li>
                  ))}
                </ul>
              </Field>
              <Field label="Forbidden use">
                <ul className="space-y-0.5">
                  {source.forbiddenUse.map((u) => (
                    <li key={u} className="text-[11px] text-ink-mute border-s ps-2 border-amber-muted">
                      {u}
                    </li>
                  ))}
                </ul>
              </Field>
              <Field label="Source limitation" value={source.limitationNote} muted />
            </>
          )}
        </dl>
      )}

      <footer className="px-3 py-2 border-t border-rule">
        <p className="text-[10px] uppercase tracking-wider text-ink-mute font-mono">
          Metadata schema
        </p>
        <p className="mt-1 text-[10px] text-ink-mute font-mono leading-snug">
          {RIYADH_METADATA_FIELDS.map((f) => f.key).join(" · ")}
        </p>
        <p className="mt-1 text-[10px] text-ink-mute italic">
          Advisory only · reviewer-anchored · municipal review is the sole producer of consequential conclusions
        </p>
      </footer>
    </aside>
  );
}

function Field({
  label,
  value,
  children,
  mono,
  muted,
}: {
  label: string;
  value?: string;
  children?: React.ReactNode;
  mono?: boolean;
  muted?: boolean;
}) {
  return (
    <div className="px-3 py-2 grid grid-cols-[8rem_minmax(0,1fr)] gap-2">
      <dt className="text-[10px] uppercase tracking-wider text-ink-mute font-mono">
        {label}
      </dt>
      <dd
        className={[
          "text-[12px] leading-snug",
          mono ? "font-mono" : "",
          muted ? "text-ink-mute italic" : "text-ink-soft",
        ].join(" ")}
      >
        {children ?? value}
      </dd>
    </div>
  );
}
