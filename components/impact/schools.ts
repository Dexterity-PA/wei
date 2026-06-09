/**
 * The twelve schools WEI can name with confidence. This is a representative
 * sample, never the full list of every school the work has reached.
 *
 * The lon/lat values are the source coordinates used by the offline map
 * generator (.tmp-geo/generate.mjs) to pre-project each pin onto the accurate
 * India outline. They are approximate placements for an illustrative map, not
 * exact survey points. The projected screen coordinates live in india-geo.ts,
 * keyed to these schools by `n`.
 *
 * Pins cluster in coastal northeast Andhra Pradesh (Srikakulam, Vizianagaram)
 * and interior Telangana (Khammam), with one school in the far south at
 * Nagercoil, Tamil Nadu.
 */

export type School = {
  /** Sequence number matching the on-page list and the map index markers. */
  n: number;
  name: string;
  /** Full human-readable location line, set in the mono label. */
  location: string;
  /** Short region grouping with its present-day state. */
  region: string;
  /** Approximate longitude, source coordinate for the map generator only. */
  lon: number;
  /** Approximate latitude, source coordinate for the map generator only. */
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
 * Region groupings in display order, used by the map legend. Counts are derived
 * from the data, never hard-coded, so they stay honest if the sample changes.
 */
export const regions = [
  "Srikakulam, Andhra Pradesh",
  "Vizianagaram, Andhra Pradesh",
  "Khammam, Telangana",
  "Nagercoil, Tamil Nadu",
] as const;
