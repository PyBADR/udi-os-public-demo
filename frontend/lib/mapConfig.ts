// Map provider abstraction. The CaseMap component ONLY reads from this module;
// adding a new provider is a single switch case below — no component edits.
//
// Provider precedence at runtime:
//   1. NEXT_PUBLIC_MAP_TILE_URL_TEMPLATE — internal/sovereign tile servers
//      (templated raster, e.g. https://tiles.example.gov/{z}/{x}/{y}.png).
//   2. NEXT_PUBLIC_MAPTILER_KEY — public MapTiler vector style.
//   3. NEXT_PUBLIC_MAPBOX_TOKEN — Mapbox vector style.
//   4. Fallback: OpenStreetMap raster (community tiles, MVP only).
//
// Satellite imagery providers are read from a separate set of env vars so a
// reviewer toggle can swap base ↔ satellite later without touching providers.

import type { StyleSpecification } from "maplibre-gl";

const ATTRIB_OSM = '© OpenStreetMap contributors';

export type MapProvider =
  | { kind: "internal-raster"; urlTemplate: string }
  | { kind: "maptiler"; key: string }
  | { kind: "mapbox"; token: string }
  | { kind: "osm" };

export function activeProvider(): MapProvider {
  const internal = process.env.NEXT_PUBLIC_MAP_TILE_URL_TEMPLATE;
  if (internal && internal.includes("{z}")) {
    return { kind: "internal-raster", urlTemplate: internal };
  }
  const maptiler = process.env.NEXT_PUBLIC_MAPTILER_KEY;
  if (maptiler) return { kind: "maptiler", key: maptiler };
  const mapbox = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  if (mapbox) return { kind: "mapbox", token: mapbox };
  return { kind: "osm" };
}

// Optional satellite overlay/style. Returns null when no satellite-capable
// provider is configured. CaseMap can offer a basemap toggle when this
// returns non-null.
export type SatelliteSource =
  | { kind: "maptiler-satellite"; key: string }
  | { kind: "mapbox-satellite"; token: string }
  | { kind: "internal-raster"; urlTemplate: string }
  | null;

export function satelliteSource(): SatelliteSource {
  const internal = process.env.NEXT_PUBLIC_MAP_SATELLITE_URL_TEMPLATE;
  if (internal && internal.includes("{z}")) {
    return { kind: "internal-raster", urlTemplate: internal };
  }
  const maptiler = process.env.NEXT_PUBLIC_MAPTILER_KEY;
  if (maptiler) return { kind: "maptiler-satellite", key: maptiler };
  const mapbox = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  if (mapbox) return { kind: "mapbox-satellite", token: mapbox };
  return null;
}

function rasterStyle(tileUrl: string, attribution: string, maxzoom = 18): StyleSpecification {
  return {
    version: 8,
    sources: {
      "raster-base": {
        type: "raster",
        tiles: [tileUrl],
        tileSize: 256,
        attribution,
        maxzoom,
      },
    },
    layers: [
      { id: "raster-base", type: "raster", source: "raster-base" },
    ],
    glyphs: undefined,
  } as StyleSpecification;
}

// Returns the base style for the current provider. For MapTiler/Mapbox,
// returns the canonical hosted style URL string instead of a spec object —
// MapLibre accepts either at `new Map({style})`.
export function getBaseStyle(): string | StyleSpecification {
  const p = activeProvider();
  switch (p.kind) {
    case "internal-raster":
      return rasterStyle(p.urlTemplate, "Internal tile server");
    case "maptiler":
      return `https://api.maptiler.com/maps/streets-v2/style.json?key=${encodeURIComponent(p.key)}`;
    case "mapbox":
      return `https://api.mapbox.com/styles/v1/mapbox/streets-v12?access_token=${encodeURIComponent(p.token)}`;
    case "osm":
    default:
      return rasterStyle("https://tile.openstreetmap.org/{z}/{x}/{y}.png", ATTRIB_OSM, 19);
  }
}

// Human-readable label shown in the map footer so reviewers can see which
// provider rendered the tiles (governance trail).
export function providerLabel(): string {
  const p = activeProvider();
  switch (p.kind) {
    case "internal-raster":
      return "Internal tile server";
    case "maptiler":
      return "MapTiler streets";
    case "mapbox":
      return "Mapbox streets";
    case "osm":
    default:
      return "OpenStreetMap (community tiles, MVP fallback)";
  }
}

// True when ANY satellite-capable provider is configured. The CaseMap UI
// uses this to render the Satellite tab as enabled vs disabled.
export function satelliteAvailable(): boolean {
  return satelliteSource() !== null;
}

// Returns a style for the active satellite source. Throws if none is
// configured — callers must check satelliteAvailable() first. Mirrors the
// shape of getBaseStyle() so MapLibre `setStyle()` accepts either.
export function getSatelliteStyle(): string | StyleSpecification {
  const s = satelliteSource();
  if (s === null) {
    throw new Error("satellite source not configured");
  }
  switch (s.kind) {
    case "internal-raster":
      return rasterStyle(s.urlTemplate, "Internal satellite tile server");
    case "maptiler-satellite":
      return `https://api.maptiler.com/maps/satellite/style.json?key=${encodeURIComponent(s.key)}`;
    case "mapbox-satellite":
      return `https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12?access_token=${encodeURIComponent(s.token)}`;
  }
}

export function satelliteProviderLabel(): string {
  const s = satelliteSource();
  if (s === null) return "Satellite layer not configured";
  switch (s.kind) {
    case "internal-raster":
      return "Internal satellite tile server";
    case "maptiler-satellite":
      return "MapTiler satellite";
    case "mapbox-satellite":
      return "Mapbox satellite";
  }
}

// ---------------------------------------------------------------------------
// Phase 16 — basemap enum + named camera views
//
// "streets" = vector or raster street style (always available; OSM fallback)
// "satellite" = pure satellite raster (requires MapTiler / Mapbox / internal)
// "hybrid" = satellite + street-label overlay (vector; MapTiler / Mapbox only)
// ---------------------------------------------------------------------------

export type Basemap = "streets" | "satellite" | "hybrid";

export function basemapAvailable(b: Basemap): boolean {
  switch (b) {
    case "streets":
      return true; // OSM fallback at minimum
    case "satellite":
      return satelliteSource() !== null;
    case "hybrid": {
      const p = activeProvider();
      return p.kind === "maptiler" || p.kind === "mapbox";
    }
  }
}

export function getBasemapStyle(b: Basemap): string | StyleSpecification {
  switch (b) {
    case "streets":
      return getBaseStyle();
    case "satellite":
      if (!basemapAvailable("satellite")) return getBaseStyle();
      return getSatelliteStyle();
    case "hybrid": {
      const p = activeProvider();
      if (p.kind === "maptiler") {
        return `https://api.maptiler.com/maps/hybrid/style.json?key=${encodeURIComponent(p.key)}`;
      }
      if (p.kind === "mapbox") {
        return `https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12?access_token=${encodeURIComponent(p.token)}`;
      }
      return getBaseStyle();
    }
  }
}

export function basemapProviderLabel(b: Basemap): string {
  switch (b) {
    case "streets":
      return providerLabel();
    case "satellite":
      return satelliteProviderLabel();
    case "hybrid":
      return basemapAvailable("hybrid")
        ? `${providerLabel()} hybrid`
        : "Hybrid layer not configured";
  }
}

// Named camera views. Coordinates are [lng, lat] for MapLibre.
// Pitch + bearing chosen for a "command map" feel that escalates with zoom.
// KW-9001 case coordinates come from data/cases.json (lat 29.2789, lng 47.9803).
//
// Phase 2 (Riyadh Safe Scaffolding, Track 1) — added Riyadh camera views.
// Riyadh views are scaffolding only: planned coverage, no rendered evidence.
// Kuwait / Kuwait City / South Surra / KW-9001 views are preserved exactly.
export type CameraViewId =
  | "gcc"
  | "kuwait"
  | "southSurra"
  | "kw9001"
  | "riyadh"
  | "riyadhCore"
  | "riyadhNorth001"
  | "riyadhSouth001"
  | "riyadhEast001"
  | "riyadhWest001";

export const CAMERA_VIEWS: Record<
  CameraViewId,
  { center: [number, number]; zoom: number; pitch: number; bearing: number; speed?: number }
> = {
  gcc:             { center: [46.5, 25.5],       zoom: 5,    pitch: 0,  bearing: 0,  speed: 1.0 },
  kuwait:          { center: [47.97, 29.31],     zoom: 8.5,  pitch: 0,  bearing: 0,  speed: 1.2 },
  southSurra:      { center: [47.98, 29.28],     zoom: 13,   pitch: 30, bearing: 0,  speed: 1.4 },
  kw9001:          { center: [47.9803, 29.2789], zoom: 16,   pitch: 45, bearing: 20, speed: 1.6 },
  riyadh:          { center: [46.71, 24.71],     zoom: 9,    pitch: 0,  bearing: 0,  speed: 1.2 },
  riyadhCore:      { center: [46.6753, 24.7136], zoom: 12,   pitch: 20, bearing: 0,  speed: 1.3 },
  riyadhNorth001:  { center: [46.70, 24.85],     zoom: 12,   pitch: 20, bearing: 0,  speed: 1.3 },
  riyadhSouth001:  { center: [46.72, 24.58],     zoom: 12,   pitch: 20, bearing: 0,  speed: 1.3 },
  riyadhEast001:   { center: [46.85, 24.72],     zoom: 12,   pitch: 20, bearing: 0,  speed: 1.3 },
  riyadhWest001:   { center: [46.55, 24.72],     zoom: 12,   pitch: 20, bearing: 0,  speed: 1.3 },
};

export const INITIAL_CENTER: [number, number] = CAMERA_VIEWS.gcc.center;
export const INITIAL_ZOOM = CAMERA_VIEWS.gcc.zoom;
