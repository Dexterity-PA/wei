/* eslint-disable -- Node.js build-time generator script, not app code */
"use strict";

/*
  Branded PDF primitives built on pdfkit. Every resource PDF is US Letter,
  carries the WEI ink masthead, an education-only footer, and uses IBM Plex
  Mono for the heading/label system with IBM Plex Sans for body copy. Several
  worksheets are fillable: input boxes and checkboxes are real AcroForm fields
  so a student can type or tick directly in any PDF reader, or print and write.
*/

const PDFDocument = require("pdfkit");
const { FONTS, PDF, EDU_LINE, ORG_LINE } = require("./lib");

const PAGE = { width: 612, height: 792 }; // US Letter, points
const M = 54; // left/right margin
const CONTENT_W = PAGE.width - M * 2;

// Register the brand faces under stable names.
const F = { mono: "Mono", monoMed: "MonoMed", monoSemi: "MonoSemi", sans: "Sans" };

function createDoc({ title, category, subtitle }) {
  const doc = new PDFDocument({
    size: "LETTER",
    margins: { top: M, bottom: M, left: M, right: M },
    bufferPages: true,
    autoFirstPage: false,
    info: {
      Title: `${title} - Wealth Equity Initiative`,
      Author: "Wealth Equity Initiative",
      Subject: "Free financial literacy template. Educational, not financial advice.",
      Keywords: "financial literacy, budgeting, students, education",
    },
  });
  doc.registerFont(F.mono, FONTS.mono);
  doc.registerFont(F.monoMed, FONTS.monoMed);
  doc.registerFont(F.monoSemi, FONTS.monoSemi);
  doc.registerFont(F.sans, FONTS.sans);
  doc.initForm();
  doc.addPage();
  drawMasthead(doc, { title, category, subtitle });
  return doc;
}

// Top ink band with wordmark + category, then the title and intro on paper.
function drawMasthead(doc, { title, category, subtitle }) {
  const bandH = 58;
  doc.save();
  doc.rect(0, 0, PAGE.width, bandH).fill(PDF.ink);
  // Wordmark
  doc.font(F.monoSemi).fontSize(13).fillColor(PDF.paper);
  doc.text("WEI", M, 21, { lineBreak: false, characterSpacing: 1 });
  doc.font(F.mono).fontSize(7.5).fillColor(PDF.paper);
  doc.text("WEALTH EQUITY INITIATIVE", M + 38, 24, {
    lineBreak: false,
    characterSpacing: 1.4,
  });
  // Category, right aligned, amber
  if (category) {
    doc.font(F.monoMed).fontSize(8).fillColor(PDF.amber);
    doc.text(category.toUpperCase(), PAGE.width - M - 220, 24, {
      width: 220,
      align: "right",
      characterSpacing: 1.6,
      lineBreak: false,
    });
  }
  doc.restore();

  // Title block
  let y = bandH + 30;
  doc.font(F.monoSemi).fontSize(20).fillColor(PDF.ink);
  doc.text(title, M, y, { width: CONTENT_W, lineGap: 1 });
  y = doc.y + 8;
  if (subtitle) {
    doc.font(F.sans).fontSize(9.5).fillColor(PDF.inkMute);
    doc.text(subtitle, M, y, { width: CONTENT_W, lineGap: 2.5 });
    y = doc.y;
  }
  // Emerald rule under the title block
  y += 12;
  doc.save();
  doc.moveTo(M, y).lineTo(PAGE.width - M, y).lineWidth(2).strokeColor(PDF.emerald).stroke();
  doc.restore();
  doc.y = y + 16;
}

// Footer on every page: hairline, education line, org + page number.
function paginate(doc) {
  const range = doc.bufferedPageRange();
  for (let i = range.start; i < range.start + range.count; i++) {
    doc.switchToPage(i);
    const fy = PAGE.height - 38;
    doc.save();
    doc.moveTo(M, fy).lineTo(PAGE.width - M, fy).lineWidth(0.75).strokeColor(PDF.line).stroke();
    doc.font(F.mono).fontSize(7).fillColor(PDF.inkMute);
    doc.text(EDU_LINE, M, fy + 8, { width: CONTENT_W * 0.66, lineBreak: false });
    doc.font(F.mono).fontSize(7).fillColor(PDF.inkMute);
    doc.text(ORG_LINE, PAGE.width - M - 240, fy + 8, {
      width: 240,
      align: "right",
      lineBreak: false,
    });
    doc.restore();
  }
}

// Ensure room for `need` points; add a page (and reset cursor) if short.
function ensure(doc, y, need) {
  if (y + need > PAGE.height - 56) {
    doc.addPage();
    return M + 6;
  }
  return y;
}

// Section eyebrow: mono uppercase, tracked, with an index, over a hairline.
function section(doc, y, index, label) {
  y = ensure(doc, y, 40);
  doc.font(F.mono).fontSize(8).fillColor(PDF.inkMute);
  doc.text(index, M, y, { lineBreak: false, characterSpacing: 1 });
  doc.fillColor(PDF.line).text("/", M + 22, y, { lineBreak: false });
  doc.font(F.monoMed).fillColor(PDF.emeraldDeep);
  doc.text(label.toUpperCase(), M + 32, y, { lineBreak: false, characterSpacing: 1.6 });
  y += 13;
  doc.moveTo(M, y).lineTo(PAGE.width - M, y).lineWidth(0.75).strokeColor(PDF.line).stroke();
  return y + 14;
}

function para(doc, y, text, opts = {}) {
  const size = opts.size || 9.5;
  const width = opts.width || CONTENT_W;
  y = ensure(doc, y, size + 6);
  doc.font(opts.font || F.sans).fontSize(size).fillColor(opts.color || PDF.inkMute);
  doc.text(text, opts.x || M, y, { width, lineGap: opts.lineGap ?? 2.5 });
  return doc.y + (opts.gap ?? 8);
}

// A labelled fillable input box. label left, box right. Returns new y.
function fieldRow(doc, y, label, fieldName, opts = {}) {
  const rowH = 22;
  y = ensure(doc, y, rowH + 4);
  const boxW = opts.boxW || 150;
  const boxX = PAGE.width - M - boxW;
  doc.font(F.sans).fontSize(9.5).fillColor(PDF.ink);
  doc.text(label, M, y + 5, { width: boxX - M - 12, lineBreak: false });
  formBox(doc, fieldName, boxX, y, boxW, rowH, opts);
  return y + rowH + 8;
}

// Draw a fillable text field with a hairline box and optional $ prefix.
function formBox(doc, name, x, y, w, h, opts = {}) {
  doc.save();
  doc.rect(x, y, w, h).lineWidth(0.75).strokeColor(PDF.lineStrong)
    .fillColor(opts.fill || PDF.white).fillAndStroke(opts.fill || PDF.white, PDF.lineStrong);
  doc.restore();
  let fieldX = x + 6;
  let fieldW = w - 12;
  if (opts.dollar) {
    doc.font(F.mono).fontSize(9).fillColor(PDF.inkMute);
    doc.text("$", x + 6, y + 6, { lineBreak: false });
    fieldX = x + 15;
    fieldW = w - 21;
  }
  doc.formText(name, fieldX, y + 4, fieldW, h - 8, {
    align: opts.align || (opts.dollar ? "right" : "left"),
    fontSize: 9,
    backgroundColor: opts.fill || "#ffffff",
    borderColor: "#ffffff",
  });
}

// Checklist item: square checkbox + bold label + optional plain-language note.
function checkItem(doc, y, fieldName, label, note) {
  const need = note ? 34 : 20;
  y = ensure(doc, y, need);
  const box = 11;
  doc.save();
  doc.rect(M, y, box, box).lineWidth(1).strokeColor(PDF.emerald).stroke();
  doc.restore();
  doc.formCheckbox(fieldName, M + 0.5, y + 0.5, box - 1, box - 1, {
    backgroundColor: "#ffffff",
    borderColor: "#ffffff",
  });
  doc.font(F.monoMed).fontSize(9.5).fillColor(PDF.ink);
  doc.text(label, M + box + 12, y - 1, { width: CONTENT_W - box - 12, lineGap: 1.5 });
  let ny = doc.y + 2;
  if (note) {
    doc.font(F.sans).fontSize(8.5).fillColor(PDF.inkMute);
    doc.text(note, M + box + 12, ny, { width: CONTENT_W - box - 12, lineGap: 2 });
    ny = doc.y + 2;
  }
  return ny + 8;
}

/*
  Render a table. columns: [{header, width, align, key, kind}] where kind can be
  'input' (a fillable cell) or 'text' (printed value from row[key]). widths are
  fractions of CONTENT_W (should sum to ~1). rows: array of objects, or count of
  blank input rows when `blankRows` set. Returns new y.
*/
function table(doc, y, columns, rows, opts = {}) {
  const headH = 22;
  const rowH = opts.rowH || 22;
  const totalFrac = columns.reduce((s, c) => s + c.width, 0);
  const colX = [];
  let x = M;
  for (const c of columns) {
    colX.push(x);
    x += (c.width / totalFrac) * CONTENT_W;
  }
  const colW = (c) => (c.width / totalFrac) * CONTENT_W;

  const drawHead = (yy) => {
    doc.save();
    doc.rect(M, yy, CONTENT_W, headH).fill(PDF.ink);
    doc.restore();
    doc.font(F.monoMed).fontSize(7.5).fillColor(PDF.paper);
    columns.forEach((c, i) => {
      doc.text(c.header.toUpperCase(), colX[i] + 7, yy + 7, {
        width: colW(c) - 12,
        align: c.headAlign || c.align || "left",
        characterSpacing: 0.8,
        lineBreak: false,
      });
    });
    return yy + headH;
  };

  y = ensure(doc, y, headH + rowH);
  y = drawHead(y);

  const renderRow = (row, idx) => {
    y = ensure(doc, y, rowH);
    if (y === M + 6) y = drawHead(y); // page broke: repeat header
    // zebra
    if (idx % 2 === 1) {
      doc.save();
      doc.rect(M, y, CONTENT_W, rowH).fill(PDF.paperDim);
      doc.restore();
    }
    columns.forEach((c, i) => {
      const cw = colW(c);
      if (c.kind === "input" || (row && row[c.key] === "__input__")) {
        const fname = `${opts.name || "tbl"}_${c.key}_${idx}`;
        doc.save();
        doc.rect(colX[i] + 3, y + 3, cw - 6, rowH - 6).lineWidth(0.6)
          .strokeColor(PDF.line).stroke();
        doc.restore();
        doc.formText(fname, colX[i] + 6, y + 5, cw - 12, rowH - 10, {
          fontSize: 9,
          align: c.align || "left",
          backgroundColor: "#ffffff",
          borderColor: "#ffffff",
        });
      } else if (row && row[c.key] != null) {
        const isNum = c.align === "right";
        doc.font(isNum ? F.mono : F.sans).fontSize(9)
          .fillColor(c.strong ? PDF.ink : PDF.inkSoft);
        doc.text(String(row[c.key]), colX[i] + 7, y + 6, {
          width: cw - 12,
          align: c.align || "left",
          lineBreak: false,
        });
      }
    });
    // bottom hairline
    doc.moveTo(M, y + rowH).lineTo(M + CONTENT_W, y + rowH)
      .lineWidth(0.5).strokeColor(PDF.line).stroke();
    y += rowH;
  };

  const list = rows != null ? rows : [];
  if (opts.blankRows) {
    for (let i = 0; i < opts.blankRows; i++) renderRow({ __blank: true }, i);
  } else {
    list.forEach((r, i) => renderRow(r, i));
  }

  // vertical column separators across the whole block (light)
  return y + (opts.gap ?? 12);
}

// A small callout strip (emerald-tinted) for the key computed takeaway.
function callout(doc, y, label, valueFieldOrText, opts = {}) {
  const h = 30;
  y = ensure(doc, y, h + 6);
  doc.save();
  doc.rect(M, y, CONTENT_W, h).fillAndStroke(PDF.paperDim, PDF.lineStrong);
  doc.rect(M, y, 4, h).fill(PDF.emerald);
  doc.restore();
  doc.font(F.monoMed).fontSize(8).fillColor(PDF.emeraldDeep);
  doc.text(label.toUpperCase(), M + 14, y + 7, { characterSpacing: 1.2, lineBreak: false });
  doc.font(F.sans).fontSize(8.5).fillColor(PDF.inkMute);
  doc.text(opts.note || "", M + 14, y + 18, { lineBreak: false });
  if (opts.field) {
    formBox(doc, opts.field, PAGE.width - M - 130, y + 5, 124, 20, { dollar: opts.dollar });
  } else if (valueFieldOrText) {
    doc.font(F.monoSemi).fontSize(13).fillColor(PDF.ink);
    doc.text(valueFieldOrText, PAGE.width - M - 160, y + 9, {
      width: 154, align: "right", lineBreak: false,
    });
  }
  return y + h + 12;
}

module.exports = {
  createDoc, paginate, section, para, fieldRow, formBox, checkItem, table,
  callout, ensure, F, PAGE, M, CONTENT_W,
};