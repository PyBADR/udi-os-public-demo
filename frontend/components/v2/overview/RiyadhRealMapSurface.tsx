"use client";

// IR-43A-REAL-MAP-OPERATING-SURFACE
//
// Real interactive MapLibre GL map for /v2/overview. Reads MapTiler key
// from NEXT_PUBLIC_MAPTILER_KEY via the shared frontend/lib/mapConfig
// abstraction (key is never hard-coded here, never printed, never logged).
// If no key is configured, a safe English+Arabic fallback message is
// rendered in place of the basemap. The 5 conceptual Riyadh zones are
// drawn as low-opacity polygon overlays — they are NOT official municipal
// boundaries. Per-zone evidence is read from the existing pack binding
// (RIY_ZONE_EVIDENCE_ASSETS / findRiyZoneEvidenceAsset).
//
// Constitutional posture: advisory only · candidate evidence only ·
// reference imagery · human review remains the sole producer of
// consequential conclusions · no enforcement · no automated decision ·
// no real-time monitoring · no surveillance · no production GIS.

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import maplibregl, { type GeoJSONSource } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

// IR-43A-R5 — register the Mapbox RTL text plugin so the MapTiler basemap
// renders Arabic place-name labels with connected glyph shaping. Module-
// level guard prevents the duplicate-registration error MapLibre throws on
// React re-mounts. Lazy: the plugin URL is fetched only the first time a
// real MapLibre Map is constructed; matches the existing pattern in
// frontend/components/RiyadhInteractiveMapFoundation.tsx so we don't add
// a new dependency or new plugin source.
let rtlTextPluginInitialized = false;
function ensureRtlTextPlugin() {
  if (rtlTextPluginInitialized) return;
  rtlTextPluginInitialized = true;
  try {
    maplibregl.setRTLTextPlugin(
      "https://unpkg.com/@mapbox/mapbox-gl-rtl-text@0.3.0/dist/mapbox-gl-rtl-text.js",
      true,
    );
  } catch {
    // MapLibre throws if the RTL plugin was already registered (e.g. by
    // the legacy CommandMap on a prior route). Safe to ignore that one
    // specific case; the boolean above keeps us from registering twice
    // ourselves.
  }
}

import {
  basemapAvailable,
  getBasemapStyle,
  basemapProviderLabel,
  type Basemap,
} from "@/lib/mapConfig";
import {
  RIY_ZONE_EVIDENCE_ASSETS,
  findRiyZoneEvidenceAsset,
  type RiyZoneId,
} from "@/lib/v2/data/riyadhEvidencePackBinding";

type ZoneBbox = {
  zone_id: RiyZoneId;
  zone_label_en: string;
  zone_label_ar: string;
  center: [number, number];
  bbox: [number, number, number, number]; // [west, south, east, north]
};

// Conceptual bounding boxes (~10–11 km wide) around each Riyadh sub-area
// center already declared in /lib/mapConfig CAMERA_VIEWS. These are
// reference framings only — they are NOT official municipal boundaries
// and must never be presented as such.
const ZONE_BBOXES: ZoneBbox[] = [
  {
    zone_id: "RIY-CORE",
    zone_label_en: "Core Riyadh",
    zone_label_ar: "مركز الرياض",
    center: [46.6753, 24.7136],
    bbox: [46.62, 24.66, 46.73, 24.77],
  },
  {
    zone_id: "RIY-NORTH",
    zone_label_en: "North Riyadh",
    zone_label_ar: "شمال الرياض",
    center: [46.70, 24.85],
    bbox: [46.65, 24.80, 46.75, 24.90],
  },
  {
    zone_id: "RIY-SOUTH",
    zone_label_en: "South Riyadh",
    zone_label_ar: "جنوب الرياض",
    center: [46.72, 24.58],
    bbox: [46.67, 24.53, 46.77, 24.63],
  },
  {
    zone_id: "RIY-EAST",
    zone_label_en: "East Riyadh",
    zone_label_ar: "شرق الرياض",
    center: [46.85, 24.72],
    bbox: [46.80, 24.67, 46.90, 24.77],
  },
  {
    zone_id: "RIY-WEST",
    zone_label_en: "West Riyadh",
    zone_label_ar: "غرب الرياض",
    center: [46.55, 24.72],
    bbox: [46.50, 24.67, 46.60, 24.77],
  },
];

const ZONES_FEATURE_COLLECTION: GeoJSON.FeatureCollection = {
  type: "FeatureCollection",
  features: ZONE_BBOXES.map((z) => ({
    type: "Feature",
    properties: {
      zone_id: z.zone_id,
      zone_label_en: z.zone_label_en,
      zone_label_ar: z.zone_label_ar,
    },
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [z.bbox[0], z.bbox[1]],
          [z.bbox[2], z.bbox[1]],
          [z.bbox[2], z.bbox[3]],
          [z.bbox[0], z.bbox[3]],
          [z.bbox[0], z.bbox[1]],
        ],
      ],
    },
  })),
};

const ZONES_LABEL_COLLECTION: GeoJSON.FeatureCollection = {
  type: "FeatureCollection",
  features: ZONE_BBOXES.map((z) => ({
    type: "Feature",
    properties: {
      zone_label: z.zone_label_en,
    },
    geometry: {
      type: "Point",
      coordinates: z.center,
    },
  })),
};

const ZONES_SOURCE_ID = "riy-conceptual-zones";
const ZONES_LABEL_SOURCE_ID = "riy-conceptual-zone-labels";
const FILL_LAYER_ID = "riy-zone-fill";
const OUTLINE_LAYER_ID = "riy-zone-outline";
const LABEL_LAYER_ID = "riy-zone-label";

const DEFAULT_CENTER: [number, number] = [46.6753, 24.7136];
const DEFAULT_ZOOM = 9.5;

interface Props {
  selectedZone: string | null;
  onZone: (z: string | null) => void;
}

// IR-43A-R2 — Arabic micro-label helper. Resets parent CSS that breaks
// Arabic shaping (uppercase / letter-spacing / monospace), isolates the
// span from surrounding LTR text via unicode-bidi:isolate, and pins to
// a readable sans family so connected glyph forms render correctly.
function ArLabel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      lang="ar"
      dir="rtl"
      className={`font-sans normal-case tracking-normal [unicode-bidi:isolate] ${className}`}
    >
      {children}
    </span>
  );
}

export function RiyadhRealMapSurface({ selectedZone, onZone }: Props) {
  const mapKeyConfigured = useMemo(
    () => typeof process !== "undefined" && !!process.env.NEXT_PUBLIC_MAPTILER_KEY,
    []
  );
  const [basemap, setBasemap] = useState<Basemap>(
    typeof process !== "undefined" && process.env.NEXT_PUBLIC_MAPTILER_KEY
      ? "hybrid"
      : "streets"
  );
  const [mapReady, setMapReady] = useState(false);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Selected zone (typed to the binding's RiyZoneId)
  const selectedRiyZone = useMemo<RiyZoneId | null>(() => {
    if (!selectedZone) return null;
    const upper = selectedZone.toUpperCase();
    const valid: RiyZoneId[] = ["RIY-CORE", "RIY-NORTH", "RIY-SOUTH", "RIY-EAST", "RIY-WEST"];
    return (valid as string[]).includes(upper) ? (upper as RiyZoneId) : null;
  }, [selectedZone]);

  const selectedAsset = useMemo(
    () => findRiyZoneEvidenceAsset(selectedRiyZone),
    [selectedRiyZone]
  );

  // Construct map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    if (!mapKeyConfigured) {
      // Fallback: no key, render no map; safe message rendered separately.
      return;
    }
    // IR-43A-R5 — must be called before the Map constructor so the plugin
    // is installed in time to shape Arabic basemap labels.
    ensureRtlTextPlugin();
    const m = new maplibregl.Map({
      container: containerRef.current,
      style: getBasemapStyle(basemap),
      center: DEFAULT_CENTER,
      zoom: DEFAULT_ZOOM,
      pitch: 0,
      bearing: 0,
      attributionControl: { compact: true },
      cooperativeGestures: false,
    });
    mapRef.current = m;
    m.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), "top-right");
    m.addControl(new maplibregl.ScaleControl({ unit: "metric" }), "bottom-left");
    m.addControl(
      new maplibregl.FullscreenControl({ container: containerRef.current ?? undefined }),
      "top-right"
    );

    m.on("load", () => {
      addZoneOverlays(m);
      setMapReady(true);
    });
    m.on("click", FILL_LAYER_ID, (ev) => {
      const f = ev.features?.[0];
      const id = (f?.properties as { zone_id?: string } | undefined)?.zone_id;
      if (id) onZone(id);
    });
    m.on("mouseenter", FILL_LAYER_ID, () => {
      m.getCanvas().style.cursor = "pointer";
    });
    m.on("mouseleave", FILL_LAYER_ID, () => {
      m.getCanvas().style.cursor = "";
    });

    return () => {
      m.remove();
      mapRef.current = null;
      setMapReady(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapKeyConfigured]);

  // When the basemap changes, swap the style and re-add overlays
  useEffect(() => {
    const m = mapRef.current;
    if (!m || !mapKeyConfigured) return;
    m.setStyle(getBasemapStyle(basemap));
    m.once("styledata", () => {
      if (!m.getSource(ZONES_SOURCE_ID)) addZoneOverlays(m);
      applySelectedZonePaint(m, selectedRiyZone);
    });
  }, [basemap, mapKeyConfigured, selectedRiyZone]);

  // When the selected zone changes, recolor + fly there
  useEffect(() => {
    const m = mapRef.current;
    if (!m || !mapReady) return;
    applySelectedZonePaint(m, selectedRiyZone);
    if (selectedRiyZone) {
      const bbox = ZONE_BBOXES.find((b) => b.zone_id === selectedRiyZone);
      if (bbox) m.flyTo({ center: bbox.center, zoom: 11.5, speed: 1.2, essential: true });
    }
  }, [selectedRiyZone, mapReady]);

  const handleResetView = useCallback(() => {
    const m = mapRef.current;
    if (!m) return;
    m.flyTo({ center: DEFAULT_CENTER, zoom: DEFAULT_ZOOM, pitch: 0, bearing: 0, speed: 1.2, essential: true });
  }, []);

  return (
    <section
      aria-labelledby="riy-real-map-title"
      className="bg-white border border-rule"
      data-testid="riy-real-map-surface"
    >
      <header className="px-3 py-2 border-b border-rule flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-baseline gap-2 flex-wrap">
          <h2 id="riy-real-map-title" className="font-serif text-sm text-ink leading-tight">
            BDII · Riyadh Map Workspace
          </h2>
          <ArLabel className="font-serif text-[12px] text-ink-mute leading-tight">
            · سطح تشغيل أدلة الرياض
          </ArLabel>
          <span className="text-[10px] font-mono text-ink-mute">
            · interactive MapLibre · MapTiler basemap · advisory only
          </span>
        </div>
        <div className="flex items-center gap-1 text-[10px] font-mono">
          {(["hybrid", "satellite", "streets"] as Basemap[]).map((b) => {
            const enabled = basemapAvailable(b);
            const active = b === basemap;
            return (
              <button
                key={b}
                type="button"
                disabled={!enabled}
                onClick={() => enabled && setBasemap(b)}
                className={
                  "px-2 py-1 border " +
                  (active
                    ? "bg-ink text-white border-ink"
                    : enabled
                    ? "bg-white text-ink border-rule hover:bg-paper"
                    : "bg-paper text-ink-mute border-rule cursor-not-allowed opacity-50")
                }
                aria-pressed={active}
                title={enabled ? basemapProviderLabel(b) : `${b} not configured`}
              >
                {b}
              </button>
            );
          })}
          <button
            type="button"
            onClick={handleResetView}
            className="px-2 py-1 border bg-white text-ink border-rule hover:bg-paper ms-1"
            title="Reset to default Riyadh view"
          >
            reset view
          </button>
        </div>
      </header>

      {/* Zone selector pills */}
      <nav
        aria-label="Riyadh conceptual zone selector"
        className="px-3 py-1.5 border-b border-rule bg-paper flex flex-wrap items-center gap-x-2 gap-y-1"
      >
        <span className="text-[10px] uppercase tracking-wider text-ink-mute font-mono">Zones:</span>
        {ZONE_BBOXES.map((z) => {
          const active = z.zone_id === selectedRiyZone;
          return (
            <button
              key={z.zone_id}
              type="button"
              onClick={() => onZone(z.zone_id)}
              className={
                "px-2 py-0.5 text-[11px] border " +
                (active
                  ? "bg-accent text-white border-accent"
                  : "bg-white text-ink border-rule hover:bg-paper")
              }
              aria-pressed={active}
            >
              {z.zone_label_en}
              <ArLabel className="text-[10px] text-ink-mute ms-1">· {z.zone_label_ar}</ArLabel>
            </button>
          );
        })}
        {selectedRiyZone && (
          <button
            type="button"
            onClick={() => onZone(null)}
            className="ms-2 px-2 py-0.5 text-[10px] font-mono border border-rule bg-white text-ink-mute hover:bg-paper"
          >
            clear
          </button>
        )}
      </nav>

      {/* Map stacks above panel — the page already has an xl right aside so
          we never compete with it for horizontal space. This keeps the map
          full-width of whatever column hosts the surface. */}
      <div className="flex flex-col">
        {/* Map column */}
        <div className="relative bg-panel">
          {mapKeyConfigured ? (
            <div
              ref={containerRef}
              data-testid="riy-real-map-canvas"
              className="w-full"
              style={{ minHeight: 520, height: 520 }}
              aria-label="Interactive MapLibre map of Riyadh"
            />
          ) : (
            <div
              data-testid="riy-real-map-fallback"
              className="w-full flex items-center justify-center text-center px-6"
              style={{ minHeight: 520, height: 520 }}
            >
              <div className="max-w-md space-y-2">
                <p className="text-sm text-ink">
                  Map basemap unavailable — <code className="font-mono text-[12px]">NEXT_PUBLIC_MAPTILER_KEY</code> is not configured.
                </p>
                <ArLabel className="block text-sm text-ink-soft">
                  الخريطة غير متاحة — مفتاح <code dir="ltr" className="font-mono text-[12px] [unicode-bidi:isolate]">NEXT_PUBLIC_MAPTILER_KEY</code> غير مُعدّ.
                </ArLabel>
                <p className="text-[11px] text-ink-mute font-mono">
                  Configure the public MapTiler key in <code>frontend/.env.local</code> and reload to render the interactive basemap. All other map controls (zone selector, evidence panel, governance caveat) remain visible below.
                </p>
              </div>
            </div>
          )}

          {/* Always-on advisory caveat strip on top of the map (governance) */}
          {/* IR-43A-R2 — caveat overlay no longer applies font-mono to the
              whole strip; English stays mono (telemetry feel), Arabic gets
              the institutional sans family via ArLabel so glyphs connect. */}
          <div className="absolute inset-x-0 bottom-0 bg-paper/95 border-t border-rule px-3 py-1.5 text-[10px] text-ink-mute flex flex-wrap items-center gap-x-3 gap-y-1 pointer-events-none">
            <span className="font-mono">Conceptual advisory zones only — not official municipal boundaries.</span>
            <ArLabel className="text-[11px]">مناطق استرشادية مفاهيمية — لا تمثل حدوداً بلدية رسمية.</ArLabel>
            <span className="font-mono">· {basemapProviderLabel(basemap)}</span>
            <ArLabel className="text-[11px]">· للاسترشاد فقط</ArLabel>
          </div>
        </div>

        {/* Evidence panel — full-width below the map (always) */}
        <aside
          aria-label="Selected zone evidence panel"
          className="border-t border-rule bg-white p-3 space-y-3 min-w-0"
        >
          {selectedAsset ? (
            <>
              <header className="space-y-0.5">
                {/* IR-43A-R2 — split English meta (mono/upper/tracking) from
                    the Arabic micro-label so the AR span resets to the
                    institutional sans family with connected glyph shaping. */}
                <p className="text-[10px] text-ink-mute">
                  <span className="uppercase tracking-wider font-mono">Selected zone · {selectedAsset.zone_id} · </span>
                  <ArLabel>خاضع للمراجعة البشرية</ArLabel>
                </p>
                <h3 className="font-serif text-base text-ink">{selectedAsset.zone_name}</h3>
                <p className="text-[11px] text-ink-soft">
                  {selectedAsset.source_family} · {selectedAsset.evidence_role}
                </p>
                <p className="text-[10px] font-mono text-ink-mute">
                  evidence_status: {selectedAsset.evidence_status}
                </p>
              </header>

              <div className="grid grid-cols-2 gap-2">
                <figure className="space-y-1">
                  <figcaption className="text-[10px] text-ink-mute">
                    <span className="uppercase tracking-wider font-mono">before</span> · <ArLabel>صور مرجعية</ArLabel>
                  </figcaption>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selectedAsset.before_asset_public_path}
                    alt={`${selectedAsset.zone_name} — before (USGS reference imagery)`}
                    className="w-full border border-rule"
                    loading="lazy"
                  />
                </figure>
                <figure className="space-y-1">
                  <figcaption className="text-[10px] text-ink-mute">
                    <span className="uppercase tracking-wider font-mono">after</span> · <ArLabel>صور مرجعية</ArLabel>
                  </figcaption>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selectedAsset.after_asset_public_path}
                    alt={`${selectedAsset.zone_name} — after (USGS reference imagery)`}
                    className="w-full border border-rule"
                    loading="lazy"
                  />
                </figure>
              </div>

              <div className="text-[11px] text-ink-soft space-y-1">
                <p>
                  <span className="text-ink-mute font-mono text-[10px]">governance_note:</span>{" "}
                  {selectedAsset.governance_note}
                </p>
                <details className="text-[11px]">
                  <summary className="text-ink-mute font-mono text-[10px] cursor-pointer">
                    local_source_path_reference (reference only)
                  </summary>
                  <p className="break-all mt-1 text-[10px] font-mono text-ink-mute">
                    before: {selectedAsset.local_source_path_reference.before}
                  </p>
                  <p className="break-all text-[10px] font-mono text-ink-mute">
                    after: {selectedAsset.local_source_path_reference.after}
                  </p>
                </details>
              </div>

              <div className="grid grid-cols-1 gap-1 text-[11px]">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-ink-mute font-mono">allowed_use</p>
                  <ul className="list-disc ps-4 text-ink-soft">
                    {selectedAsset.allowed_use.map((u) => (
                      <li key={u}>{u}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-ink-mute font-mono">blocked_use</p>
                  <ul className="list-disc ps-4 text-ink-soft">
                    {selectedAsset.blocked_use.map((u) => (
                      <li key={u}>{u}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-ink-mute font-mono">next_human_action</p>
                  <p className="text-ink">{selectedAsset.next_human_action}</p>
                </div>
              </div>
            </>
          ) : (
            <div className="text-[12px] text-ink-soft space-y-2">
              <p className="font-serif text-base text-ink">No zone selected</p>
              <p>
                Click a conceptual zone on the map or use the zone pills above to load the per-zone USGS reference imagery and governance metadata.
              </p>
              <ArLabel className="block text-ink-mute">
                اختر منطقة من الخريطة لعرض الصور المرجعية وملاحظات الحوكمة.
              </ArLabel>
              <ul className="list-disc ps-4 text-ink-mute text-[11px] space-y-0.5">
                {ZONE_BBOXES.map((z) => (
                  <li key={z.zone_id}>
                    {z.zone_label_en} · {z.zone_id}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>

      <footer className="border-t border-rule px-3 py-1.5 text-[10px] font-mono text-ink-mute flex flex-wrap items-center gap-x-3 gap-y-1">
        <span>basemap: {basemapProviderLabel(basemap)}</span>
        <span>· default center: 46.6753, 24.7136 · zoom {DEFAULT_ZOOM}</span>
        <span>· 5 conceptual zones drawn from RIY_ZONE_EVIDENCE_ASSETS</span>
        <span>· reference imagery only · advisory · candidate</span>
        <span>· not production GIS · no automated change detection</span>
      </footer>
    </section>
  );
}

// ---------------------------------------------------------------------------
// MapLibre helpers (kept module-local — not exported)
// ---------------------------------------------------------------------------

function addZoneOverlays(map: maplibregl.Map) {
  if (map.getSource(ZONES_SOURCE_ID)) return;
  map.addSource(ZONES_SOURCE_ID, {
    type: "geojson",
    data: ZONES_FEATURE_COLLECTION,
  });
  map.addSource(ZONES_LABEL_SOURCE_ID, {
    type: "geojson",
    data: ZONES_LABEL_COLLECTION,
  });
  map.addLayer({
    id: FILL_LAYER_ID,
    type: "fill",
    source: ZONES_SOURCE_ID,
    paint: {
      "fill-color": "#1f3a5f",
      "fill-opacity": [
        "case",
        ["boolean", ["feature-state", "selected"], false],
        0.35,
        0.12,
      ],
    },
  });
  map.addLayer({
    id: OUTLINE_LAYER_ID,
    type: "line",
    source: ZONES_SOURCE_ID,
    paint: {
      "line-color": "#1f3a5f",
      "line-width": [
        "case",
        ["boolean", ["feature-state", "selected"], false],
        2.5,
        1,
      ],
      "line-opacity": 0.85,
    },
  });
  map.addLayer({
    id: LABEL_LAYER_ID,
    type: "symbol",
    source: ZONES_LABEL_SOURCE_ID,
    layout: {
      "text-field": ["get", "zone_label"],
      "text-size": 11,
      "text-allow-overlap": false,
    },
    paint: {
      "text-color": "#0A0F1F",
      "text-halo-color": "#FFFFFF",
      "text-halo-width": 1.5,
    },
  });
}

function applySelectedZonePaint(map: maplibregl.Map, selected: RiyZoneId | null) {
  const src = map.getSource(ZONES_SOURCE_ID) as GeoJSONSource | undefined;
  if (!src) return;
  const data: GeoJSON.FeatureCollection = {
    type: "FeatureCollection",
    features: ZONES_FEATURE_COLLECTION.features.map((f, i) => ({
      ...f,
      id: i,
    })),
  };
  src.setData(data);
  // Reset all feature-states then mark the selected one
  ZONES_FEATURE_COLLECTION.features.forEach((_f, i) => {
    map.setFeatureState({ source: ZONES_SOURCE_ID, id: i }, { selected: false });
  });
  if (selected) {
    const idx = ZONE_BBOXES.findIndex((z) => z.zone_id === selected);
    if (idx >= 0) {
      map.setFeatureState({ source: ZONES_SOURCE_ID, id: idx }, { selected: true });
    }
  }
}
