/* eslint-disable -- Node.js build-time generator script, not app code */
"use strict";

/*
  Shared brand constants and helpers for the WEI downloadable resource files.
  Both the PDF generators (pdfkit) and the XLSX generators (exceljs) read the
  palette and copy rules from here so every file is branded identically.

  Brand rules baked in here, matching the site design system:
    - Palette: ink #0b1f1c, paper #f6f3ec, emerald #1f7a5c / deep #1a6b50,
      amber #d99a3f, hairline #dcd6c8.
    - Numbers and labels are IBM Plex Mono (the signature). Body is IBM Plex Sans.
    - No em dashes anywhere. Education only, never advice.
*/

const path = require("path");

const FONT_DIR = path.join(__dirname, "fonts");

const FONTS = {
  mono: path.join(FONT_DIR, "IBMPlexMono-Regular.ttf"),
  monoMed: path.join(FONT_DIR, "IBMPlexMono-Medium.ttf"),
  monoSemi: path.join(FONT_DIR, "IBMPlexMono-SemiBold.ttf"),
  sans: path.join(FONT_DIR, "IBMPlexSans-var.ttf"),
};

// Hex without the leading # (used to derive both pdfkit and exceljs colors).
const HEX = {
  ink: "0b1f1c",
  inkSoft: "16302b",
  paper: "f6f3ec",
  paperDim: "efeadf",
  emerald: "1f7a5c",
  emeraldDeep: "1a6b50",
  amber: "d99a3f",
  line: "dcd6c8",
  lineStrong: "c8bda7",
  white: "ffffff",
  inkMute: "5b6b66", // ink at lower emphasis, for secondary body copy on paper
};

// pdfkit takes "#rrggbb".
const PDF = Object.fromEntries(Object.entries(HEX).map(([k, v]) => [k, `#${v}`]));
// exceljs takes 8-digit ARGB.
const ARGB = Object.fromEntries(Object.entries(HEX).map(([k, v]) => [k, `FF${v.toUpperCase()}`]));

const OUT_DIR = path.join(__dirname, "..", "..", "public", "resources", "files");

// One shared footer line on every file. No em dashes, education framing.
const EDU_LINE =
  "Educational template, not financial advice. Free to use and share.";
const ORG_LINE = "Wealth Equity Initiative  /  wealthequityinitiative.com";

// US dollar formatting for spreadsheets. Plain accounting-style with a $ and
// two decimals; negatives in parentheses so overspend reads clearly.
const FMT = {
  usd: '$#,##0.00;($#,##0.00)',
  usd0: '$#,##0;($#,##0)',
  pct: '0.0%',
  pct0: '0%',
  num: "#,##0",
};

module.exports = { FONTS, HEX, PDF, ARGB, OUT_DIR, EDU_LINE, ORG_LINE, FMT };