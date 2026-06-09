/**
 * The twelve schools WEI has reached that we can name with confidence. This is a
 * representative sample, not the full list of every school the work has touched.
 * Positions are approximate regional placements for a stylized map, not precise
 * coordinates, and should not be read as exact locations.
 *
 * Pins cluster in coastal northeast Andhra Pradesh (Srikakulam, Vizianagaram),
 * interior Telangana (Khammam), and one in the far south at Nagercoil, Tamil
 * Nadu. The lon/lat values are only used to place dots on the stylized outline.
 */

export type School = {
  /** Sequence number matching the on-page list. */
  n: number;
  name: string;
  /** Human-readable location line, set in the mono label. */
  location: string;
  /** Grouping label used by the region legend. */
  region: string;
  /** Approximate longitude for stylized placement only. */
  lon: number;
  /** Approximate latitude for stylized placement only. */
  lat: number;
};

export const schools: School[] = [
  {
    n: 1,
    name: "Shanthi Nilayam",
    location: "Paruthivilai, Erumbukadu, Nagercoil, Tamil Nadu",
    region: "Nagercoil, Tamil Nadu",
    lon: 77.43,
    lat: 8.18,
  },
  {
    n: 2,
    name: "ZPHS Vaddivada",
    location: "Srikakulam, Andhra Pradesh",
    region: "Srikakulam, Andhra Pradesh",
    lon: 83.78,
    lat: 18.3,
  },
  {
    n: 3,
    name: "NPHS L.N. Peta",
    location: "Srikakulam, Andhra Pradesh",
    region: "Srikakulam, Andhra Pradesh",
    lon: 83.62,
    lat: 18.16,
  },
  {
    n: 4,
    name: "ZPHS Nimmathorlawada",
    location: "Amadalavalasa, Srikakulam, Andhra Pradesh",
    region: "Srikakulam, Andhra Pradesh",
    lon: 83.92,
    lat: 18.42,
  },
  {
    n: 5,
    name: "ZPHS Chinamandava",
    location: "Chinthakani Mandal, Khammam, Telangana",
    region: "Khammam, Telangana",
    lon: 80.45,
    lat: 17.25,
  },
  {
    n: 6,
    name: "ZPHS Patharlapalli",
    location: "Srikakulam, Andhra Pradesh",
    region: "Srikakulam, Andhra Pradesh",
    lon: 83.7,
    lat: 18.52,
  },
  {
    n: 7,
    name: "ZPHS Lingagudam",
    location: "Penuballi, Khammam, Telangana",
    region: "Khammam, Telangana",
    lon: 80.7,
    lat: 17.05,
  },
  {
    n: 8,
    name: "ZPHS Kondagumpam",
    location: "Nallimarla, Vizianagaram, Andhra Pradesh",
    region: "Vizianagaram, Andhra Pradesh",
    lon: 83.3,
    lat: 18.05,
  },
  {
    n: 9,
    name: "ZPHS Sarubujjilli",
    location: "Amadalavalasa, Srikakulam, Andhra Pradesh",
    region: "Srikakulam, Andhra Pradesh",
    lon: 84.0,
    lat: 18.3,
  },
  {
    n: 10,
    name: "ZPHS Dusipeta",
    location: "Srikakulam, Andhra Pradesh",
    region: "Srikakulam, Andhra Pradesh",
    lon: 83.55,
    lat: 18.38,
  },
  {
    n: 11,
    name: "ZPHS BRC Puram",
    location: "Sompeta, Vizianagaram, Andhra Pradesh",
    region: "Vizianagaram, Andhra Pradesh",
    lon: 84.55,
    lat: 18.95,
  },
  {
    n: 12,
    name: "ZPHS Ranasthalam",
    location: "Srikakulam, Andhra Pradesh",
    region: "Srikakulam, Andhra Pradesh",
    lon: 83.55,
    lat: 18.1,
  },
];

/**
 * Stylized India outline as a clockwise list of approximate [lon, lat] vertices,
 * traced from the north of Kashmir down both coasts to the southern tip and back
 * up through Gujarat. Low resolution on purpose: this is a brand silhouette, not
 * a survey boundary.
 */
export const indiaOutline: [number, number][] = [
  [75.0, 36.5],
  [78.5, 33.5],
  [80.5, 30.5],
  [83.5, 29.0],
  [85.8, 28.0],
  [88.0, 27.2],
  [89.5, 27.4],
  [92.0, 27.8],
  [95.2, 27.0],
  [97.3, 28.0],
  [96.8, 27.3],
  [96.2, 25.0],
  [94.6, 24.0],
  [93.3, 22.2],
  [92.0, 23.7],
  [91.0, 23.2],
  [89.1, 22.0],
  [87.0, 21.5],
  [85.0, 19.8],
  [83.5, 18.3],
  [82.3, 16.9],
  [80.8, 15.8],
  [80.3, 13.3],
  [79.9, 11.5],
  [79.2, 9.6],
  [78.1, 8.6],
  [77.5, 8.05],
  [76.5, 8.9],
  [75.9, 10.8],
  [74.8, 13.0],
  [74.1, 15.4],
  [73.1, 17.6],
  [72.8, 19.0],
  [72.7, 20.8],
  [72.0, 21.6],
  [70.4, 20.9],
  [69.0, 22.3],
  [68.2, 23.6],
  [68.8, 24.3],
  [70.6, 27.9],
  [72.5, 29.0],
  [74.0, 31.0],
  [74.6, 32.6],
];

/** Projection bounds for the stylized map, in degrees. */
export const MAP = {
  lonMin: 67,
  lonMax: 98,
  latMin: 6,
  latMax: 37.5,
  width: 600,
  height: 660,
  margin: 28,
} as const;

/** Project an approximate [lon, lat] into the stylized SVG coordinate space. */
export function project(lon: number, lat: number): [number, number] {
  const innerW = MAP.width - MAP.margin * 2;
  const innerH = MAP.height - MAP.margin * 2;
  const x = MAP.margin + ((lon - MAP.lonMin) / (MAP.lonMax - MAP.lonMin)) * innerW;
  const y = MAP.margin + ((MAP.latMax - lat) / (MAP.latMax - MAP.latMin)) * innerH;
  return [x, y];
}
