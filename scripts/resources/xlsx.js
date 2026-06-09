/* eslint-disable -- Node.js build-time generator script, not app code */
"use strict";

/*
  Branded XLSX primitives on exceljs. Every workbook carries the WEI masthead
  rows, gridlines off, a restrained emerald/ink/paper palette, IBM Plex Mono for
  numbers (falls back gracefully if the font is not installed), real working
  formulas, and an education-only footer note. Input cells are tinted so a
  student knows exactly where to type; computed cells hold live formulas.
*/

const ExcelJS = require("exceljs");
const { ARGB, FMT, EDU_LINE, ORG_LINE } = require("./lib");

const SANS = "IBM Plex Sans";
const MONO = "IBM Plex Mono";

const fill = (argb) => ({ type: "pattern", pattern: "solid", fgColor: { argb } });
const side = (argb, style = "thin") => ({ style, color: { argb } });
const HAIR = () => ({ top: side(ARGB.line, "hair"), left: side(ARGB.line, "hair"),
  bottom: side(ARGB.line, "hair"), right: side(ARGB.line, "hair") });

function newWorkbook() {
  const wb = new ExcelJS.Workbook();
  wb.creator = "Wealth Equity Initiative";
  wb.company = "Wealth Equity Initiative";
  wb.created = new Date(2026, 0, 1);
  return wb;
}

// Masthead across `cols` columns. Returns the next free row index.
function masthead(ws, { title, subtitle, category, cols }) {
  ws.views = [{ showGridLines: false }];
  const last = colLetter(cols);

  // Band row. Fill every cell with ink (no merge) so the wordmark sits left and
  // the category label sits right-aligned in the final column.
  for (let c = 1; c <= cols; c++) ws.getCell(1, c).fill = fill(ARGB.ink);
  const band = ws.getCell("A1");
  band.value = {
    richText: [
      { text: "WEI   ", font: { name: MONO, size: 13, bold: true, color: { argb: ARGB.paper } } },
      { text: "WEALTH EQUITY INITIATIVE", font: { name: MONO, size: 9, color: { argb: ARGB.paper } } },
    ],
  };
  band.alignment = { vertical: "middle", horizontal: "left", indent: 1 };
  ws.getRow(1).height = 30;

  // category, right side of band
  if (category) {
    const catCell = ws.getCell(`${last}1`);
    catCell.value = category.toUpperCase();
    catCell.font = { name: MONO, size: 9, bold: true, color: { argb: ARGB.amber } };
    catCell.alignment = { vertical: "middle", horizontal: "right", indent: 1 };
  }

  // Title row
  ws.mergeCells(`A2:${last}2`);
  const t = ws.getCell("A2");
  t.value = title;
  t.font = { name: SANS, size: 18, bold: true, color: { argb: ARGB.ink } };
  t.alignment = { vertical: "middle", horizontal: "left", indent: 1 };
  ws.getRow(2).height = 30;

  let row = 3;
  if (subtitle) {
    ws.mergeCells(`A3:${last}3`);
    const s = ws.getCell("A3");
    s.value = subtitle;
    s.font = { name: SANS, size: 10, color: { argb: ARGB.inkMute } };
    s.alignment = { vertical: "middle", horizontal: "left", indent: 1, wrapText: true };
    ws.getRow(3).height = 26;
    row = 4;
  }
  // emerald rule (thin colored row)
  ws.mergeCells(`A${row}:${last}${row}`);
  ws.getCell(`A${row}`).border = { bottom: side(ARGB.emerald, "medium") };
  ws.getRow(row).height = 6;
  return row + 2;
}

function colLetter(n) {
  let s = "";
  while (n > 0) {
    const m = (n - 1) % 26;
    s = String.fromCharCode(65 + m) + s;
    n = Math.floor((n - 1) / 26);
  }
  return s;
}

// Section eyebrow row: mono uppercase emerald with a bottom hairline.
function section(ws, row, index, label, cols) {
  const last = colLetter(cols);
  ws.mergeCells(`A${row}:${last}${row}`);
  const c = ws.getCell(`A${row}`);
  c.value = `${index} / ${label.toUpperCase()}`;
  c.font = { name: MONO, size: 9, bold: true, color: { argb: ARGB.emeraldDeep } };
  c.alignment = { vertical: "middle", horizontal: "left" };
  c.border = { bottom: side(ARGB.line) };
  ws.getRow(row).height = 22;
  return row + 1;
}

// Column header row (ink band, paper text). headers: [{label, align}]
function headerRow(ws, row, cols0, headers) {
  headers.forEach((h, i) => {
    const c = ws.getCell(row, cols0 + i);
    c.value = h.label;
    c.font = { name: MONO, size: 9, bold: true, color: { argb: ARGB.paper } };
    c.fill = fill(ARGB.ink);
    c.alignment = { vertical: "middle", horizontal: h.align || "left", indent: h.align ? 0 : 1 };
  });
  ws.getRow(row).height = 22;
  return row + 1;
}

// Style a cell as a labelled input (tinted, bordered, mono if numeric).
function input(cell, { numFmt, money } = {}) {
  cell.fill = fill("FFFCFBF6");
  cell.border = HAIR();
  cell.font = { name: money || numFmt ? MONO : SANS, size: 10, color: { argb: ARGB.ink } };
  cell.alignment = { vertical: "middle", horizontal: money || numFmt ? "right" : "left", indent: 1 };
  if (money) cell.numFmt = FMT.usd;
  else if (numFmt) cell.numFmt = numFmt;
  return cell;
}

// Style a label cell (left, sans).
function label(cell, { bold = false } = {}) {
  cell.font = { name: SANS, size: 10, bold, color: { argb: ARGB.ink } };
  cell.alignment = { vertical: "middle", horizontal: "left", indent: 1 };
  return cell;
}

// Style a computed cell (mono, emerald-deep, money format by default).
function computed(cell, { money = true, numFmt, strong = false } = {}) {
  cell.font = { name: MONO, size: 10, bold: strong, color: { argb: strong ? ARGB.ink : ARGB.emeraldDeep } };
  cell.alignment = { vertical: "middle", horizontal: "right", indent: 1 };
  if (money) cell.numFmt = FMT.usd;
  else if (numFmt) cell.numFmt = numFmt;
  cell.fill = fill(ARGB.paperDim);
  cell.border = HAIR();
  return cell;
}

// Total / emphasis row band.
function totalCell(cell, { money = true, numFmt } = {}) {
  cell.fill = fill(ARGB.inkSoft);
  cell.font = { name: MONO, size: 10, bold: true, color: { argb: ARGB.paper } };
  cell.alignment = { vertical: "middle", horizontal: "right", indent: 1 };
  if (money) cell.numFmt = FMT.usd;
  else if (numFmt) cell.numFmt = numFmt;
  return cell;
}

function totalLabel(cell) {
  cell.fill = fill(ARGB.inkSoft);
  cell.font = { name: MONO, size: 10, bold: true, color: { argb: ARGB.paper } };
  cell.alignment = { vertical: "middle", horizontal: "left", indent: 1 };
  return cell;
}

// Footer note rows.
function footer(ws, row, cols) {
  const last = colLetter(cols);
  ws.mergeCells(`A${row}:${last}${row}`);
  ws.getCell(`A${row}`).border = { top: side(ARGB.line) };
  ws.getRow(row).height = 4;
  ws.mergeCells(`A${row + 1}:${last}${row + 1}`);
  const e = ws.getCell(`A${row + 1}`);
  e.value = EDU_LINE + "   " + ORG_LINE;
  e.font = { name: MONO, size: 8, italic: true, color: { argb: ARGB.inkMute } };
  e.alignment = { horizontal: "left", indent: 1 };
  return row + 2;
}

module.exports = {
  ExcelJS, newWorkbook, masthead, section, headerRow, input, label, computed,
  totalCell, totalLabel, footer, colLetter, fill, side, HAIR, SANS, MONO,
};