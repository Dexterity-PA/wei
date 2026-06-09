/**
 * Offline generator for components/impact/india-geo.ts.
 *
 * Fetches a standard public-domain India state GeoJSON (GADM India states, via
 * geohacker/india), derives the national outline + interior state borders,
 * projects everything (full-India view + a zoomed coastal-Andhra-Pradesh inset)
 * with d3-geo, decimates the projected paths with Douglas-Peucker for crisp,
 * compact hairline paths, and writes static SVG path data + projected pin
 * coordinates. No runtime map dependency is added: the output is plain strings
 * and numbers, and this script is never imported by the app.
 *
 * Run from the project root with build-time-only deps (kept out of
 * package.json so nothing ships to the client):
 *
 *   npm install --no-save topojson-server topojson-client d3-geo
 *   node scripts/generate-india-geo.mjs
 *
 * Re-run only if the source geometry or the pin set in
 * components/impact/schools.ts changes (keep PINS below in sync).
 *
 * Source geometry: geohacker/india (GADM India states, a standard widely-used
 *   boundary file). https://github.com/geohacker/india
 * Far-offshore island UTs (Andaman & Nicobar, Lakshadweep) are dropped so the
 *   projection frames the mainland, where every school sits. The dataset
 *   predates the 2014 Telangana split, so the Andhra Pradesh polygon still
 *   includes the Telangana region; pins are placed by coordinate and labeled
 *   with their present-day state in the page copy. The boundary is used as
 *   published and is not editorialized.
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { topology } from "topojson-server";
import { merge, mesh } from "topojson-client";
import { geoMercator, geoArea } from "d3-geo";

const SOURCE_URL =
  "https://raw.githubusercontent.com/geohacker/india/master/state/india_state.geojson";
const OUT_PATH = join(dirname(fileURLToPath(import.meta.url)), "../components/impact/india-geo.ts");

// School pins (lon/lat). Keep in sync with components/impact/schools.ts.
const PINS = [
  { n: 1, lon: 77.43, lat: 8.18 },
  { n: 2, lon: 83.78, lat: 18.3 },
  { n: 3, lon: 83.62, lat: 18.16 },
  { n: 4, lon: 83.92, lat: 18.42 },
  { n: 5, lon: 80.45, lat: 17.25 },
  { n: 6, lon: 83.7, lat: 18.52 },
  { n: 7, lon: 80.7, lat: 17.05 },
  { n: 8, lon: 83.3, lat: 18.05 },
  { n: 9, lon: 84.0, lat: 18.3 },
  { n: 10, lon: 83.55, lat: 18.38 },
  { n: 11, lon: 84.55, lat: 18.95 },
  { n: 12, lon: 83.55, lat: 18.1 },
];

const INSET_BBOX = { lonMin: 79.7, lonMax: 85.1, latMin: 16.5, latMax: 19.5 };
const INSET_STATES = new Set(["Andhra Pradesh", "Orissa"]);
const DROP_STATES = new Set(["Andaman and Nicobar", "Lakshadweep"]);

const MAIN = { width: 560, height: 640, margin: 16 };
const INSET = { width: 384, height: 300, margin: 8 };

const MIN_POLY_AREA = 5e-5; // steradians; drop offshore islets
const EPS_MAIN = 0.5; // Douglas-Peucker tolerance, px
const EPS_INSET = 0.4;

// --- Douglas-Peucker on projected [x,y] points -------------------------------
function douglasPeucker(pts, eps) {
  if (pts.length <= 2) return pts;
  let maxD = 0;
  let idx = 0;
  const [ax, ay] = pts[0];
  const [bx, by] = pts[pts.length - 1];
  const dx = bx - ax;
  const dy = by - ay;
  const len = Math.hypot(dx, dy) || 1;
  for (let i = 1; i < pts.length - 1; i++) {
    const [px, py] = pts[i];
    const d = Math.abs((px - ax) * dy - (py - ay) * dx) / len;
    if (d > maxD) {
      maxD = d;
      idx = i;
    }
  }
  if (maxD <= eps) return [pts[0], pts[pts.length - 1]];
  return douglasPeucker(pts.slice(0, idx + 1), eps).slice(0, -1).concat(douglasPeucker(pts.slice(idx), eps));
}

// A closed ring's first and last points coincide, so a single DP pass
// degenerates (zero-length baseline). Split at the vertex farthest from the
// start, then DP each half.
function douglasPeuckerClosed(pts, eps) {
  if (pts.length <= 4) return pts;
  const [ax, ay] = pts[0];
  let far = 0;
  let maxD = -1;
  for (let i = 1; i < pts.length - 1; i++) {
    const d = Math.hypot(pts[i][0] - ax, pts[i][1] - ay);
    if (d > maxD) {
      maxD = d;
      far = i;
    }
  }
  return douglasPeucker(pts.slice(0, far + 1), eps).slice(0, -1).concat(douglasPeucker(pts.slice(far), eps));
}

const fmt = (v) => (Number.isInteger(v) ? String(v) : v.toFixed(1));

function ringToPath(coords, proj, eps, close) {
  let pts = coords.map((c) => proj(c)).filter((p) => p && Number.isFinite(p[0]));
  if (pts.length < 2) return "";
  pts = close ? douglasPeuckerClosed(pts, eps) : douglasPeucker(pts, eps);
  if (pts.length < 2) return "";
  let d = `M${fmt(pts[0][0])} ${fmt(pts[0][1])}`;
  for (let i = 1; i < pts.length; i++) d += `L${fmt(pts[i][0])} ${fmt(pts[i][1])}`;
  return close ? d + "Z" : d;
}

function projDiag(coords, proj) {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const c of coords) {
    const p = proj(c);
    if (!p) continue;
    if (p[0] < minX) minX = p[0];
    if (p[0] > maxX) maxX = p[0];
    if (p[1] < minY) minY = p[1];
    if (p[1] > maxY) maxY = p[1];
  }
  return Math.hypot(maxX - minX, maxY - minY);
}

function multiPolygonPath(mp, proj, eps, minDiag = 0) {
  const parts = [];
  for (const poly of mp.coordinates) {
    for (const ring of poly) {
      if (minDiag && projDiag(ring, proj) < minDiag) continue;
      const d = ringToPath(ring, proj, eps, true);
      if (d) parts.push(d);
    }
  }
  return parts.join(" ");
}

const multiLinePath = (ml, proj, eps) =>
  ml.coordinates.map((line) => ringToPath(line, proj, eps, false)).filter(Boolean).join(" ");

// --- main --------------------------------------------------------------------
const res = await fetch(SOURCE_URL);
if (!res.ok) throw new Error(`Failed to fetch source geometry: ${res.status} ${SOURCE_URL}`);
const raw = await res.json();
raw.features = raw.features.filter((f) => !DROP_STATES.has(f.properties.NAME_1));

const topo = topology({ s: raw });
const obj = topo.objects.s;

const nationalMP = merge(topo, obj.geometries);
nationalMP.coordinates = nationalMP.coordinates.filter(
  (rings) => geoArea({ type: "Polygon", coordinates: rings }) >= MIN_POLY_AREA,
);
const nationalFeature = { type: "Feature", geometry: nationalMP };
const interiorBorders = mesh(topo, obj, (a, b) => a !== b);

const mainProj = geoMercator().fitExtent(
  [[MAIN.margin, MAIN.margin], [MAIN.width - MAIN.margin, MAIN.height - MAIN.margin]],
  nationalFeature,
);
const indiaOutlinePath = multiPolygonPath(nationalMP, mainProj, EPS_MAIN, 3);
const stateBordersPath = multiLinePath(interiorBorders, mainProj, EPS_MAIN);

// Fit the inset to a MultiPoint of the bbox corners. A hand-built Polygon risks
// spherical winding that d3-geo reads as the globe's complement (collapsing the
// scale); a MultiPoint has no winding, so fitExtent maps the lon/lat box cleanly.
const insetProj = geoMercator().fitExtent(
  [[INSET.margin, INSET.margin], [INSET.width - INSET.margin, INSET.height - INSET.margin]],
  {
    type: "MultiPoint",
    coordinates: [
      [INSET_BBOX.lonMin, INSET_BBOX.latMin],
      [INSET_BBOX.lonMax, INSET_BBOX.latMin],
      [INSET_BBOX.lonMax, INSET_BBOX.latMax],
      [INSET_BBOX.lonMin, INSET_BBOX.latMax],
    ],
  },
);
const insetFC = {
  type: "FeatureCollection",
  features: raw.features.filter((f) => INSET_STATES.has(f.properties.NAME_1)),
};
const insetTopo = topology({ i: insetFC });
const insetLandPath = multiPolygonPath(merge(insetTopo, insetTopo.objects.i.geometries), insetProj, EPS_INSET);
const insetBorderPath = multiLinePath(mesh(insetTopo, insetTopo.objects.i, (a, b) => a !== b), insetProj, EPS_INSET);

const tl = mainProj([INSET_BBOX.lonMin, INSET_BBOX.latMax]);
const br = mainProj([INSET_BBOX.lonMax, INSET_BBOX.latMin]);
const clusterBox = {
  x: +tl[0].toFixed(1), y: +tl[1].toFixed(1),
  w: +(br[0] - tl[0]).toFixed(1), h: +(br[1] - tl[1]).toFixed(1),
};

const inInset = (p) =>
  p.lon >= INSET_BBOX.lonMin && p.lon <= INSET_BBOX.lonMax &&
  p.lat >= INSET_BBOX.latMin && p.lat <= INSET_BBOX.latMax;

const pins = PINS.map((p) => {
  const [mx, my] = mainProj([p.lon, p.lat]);
  const inset = inInset(p);
  const [ix, iy] = inset ? insetProj([p.lon, p.lat]) : [null, null];
  return {
    n: p.n,
    mainX: +mx.toFixed(1), mainY: +my.toFixed(1),
    inInset: inset,
    insetX: ix === null ? null : +ix.toFixed(1),
    insetY: iy === null ? null : +iy.toFixed(1),
  };
});
const clusterPins = pins.filter((p) => p.inInset);
const clusterMarker = {
  x: +(clusterPins.reduce((a, p) => a + p.mainX, 0) / clusterPins.length).toFixed(1),
  y: +(clusterPins.reduce((a, p) => a + p.mainY, 0) / clusterPins.length).toFixed(1),
};

const out = `/**
 * GENERATED FILE. Do not edit by hand. Run scripts/generate-india-geo.mjs.
 *
 * Pre-projected India map geometry and school-pin coordinates for the Impact
 * page. Generated offline from a standard public-domain India state GeoJSON
 * (GADM India states, via geohacker/india), projected with d3-geo geoMercator
 * (fitExtent) for a full-India view and a zoomed coastal-Andhra-Pradesh inset,
 * then decimated with Douglas-Peucker for crisp, compact hairline paths.
 *
 * The national outline is the dissolve (merge) of every state and uses the
 * boundary as published; interior lines are state borders. Far-offshore island
 * UTs are dropped so the mainland frames cleanly, and tiny offshore islets are
 * filtered. The source predates the 2014 Telangana split, so the Andhra Pradesh
 * polygon includes the Telangana region; pins are placed by coordinate and
 * labeled with their present-day state in the page copy. Coordinates are SVG
 * user-space rounded to 0.1px. No runtime map dependency is added.
 */

export type GeoPin = {
  n: number;
  mainX: number;
  mainY: number;
  inInset: boolean;
  insetX: number | null;
  insetY: number | null;
};

/** Full-India view box. */
export const MAIN_VIEW = { width: ${MAIN.width}, height: ${MAIN.height} } as const;

/** Zoomed coastal-AP inset view box. */
export const INSET_VIEW = { width: ${INSET.width}, height: ${INSET.height} } as const;

/** National boundary, full-India projection. */
export const indiaOutlinePath =
  ${JSON.stringify(indiaOutlinePath)};

/** Interior state borders, full-India projection. */
export const stateBordersPath =
  ${JSON.stringify(stateBordersPath)};

/** Andhra Pradesh + Orissa land fill, inset projection. */
export const insetLandPath =
  ${JSON.stringify(insetLandPath)};

/** AP / Orissa border line, inset projection. */
export const insetBorderPath =
  ${JSON.stringify(insetBorderPath)};

/** Cluster footprint rectangle on the full-India map (keys to the inset). */
export const clusterBox = ${JSON.stringify(clusterBox)} as const;

/** Single cluster marker on the full-India map, in main coordinates. */
export const clusterMarker = ${JSON.stringify(clusterMarker)} as const;

/** Projected pin coordinates, keyed to schools by \`n\`. */
export const geoPins: GeoPin[] = ${JSON.stringify(pins, null, 2)};
`;

writeFileSync(OUT_PATH, out);
console.log("wrote", OUT_PATH);
console.log("national polygons kept:", nationalMP.coordinates.length);
console.log("outline chars:", indiaOutlinePath.length, "borders chars:", stateBordersPath.length);
console.log("inset land chars:", insetLandPath.length, "inset border chars:", insetBorderPath.length);
console.log("inset pins:", clusterPins.length, "main-only:", pins.length - clusterPins.length);
