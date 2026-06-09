# Resource file generators

These scripts generate the real, branded, downloadable templates served from
`public/resources/files/`. They are build-time tooling, not part of the Next.js
app, so their dependencies are intentionally **not** added to the project
`package.json`.

## Regenerate the files

```bash
# from the repo root, install the generator-only deps without saving them
npm install --no-save exceljs pdfkit
node scripts/resources/build.js
```

Output: 8 PDFs and 7 XLSX workbooks in `public/resources/files/`.

## Verify every formula

The XLSX files carry real formulas (`calcProperties.fullCalcOnLoad` is set so
Excel and LibreOffice recompute on open). `verify.py` injects a sample scenario
into each workbook, recomputes it with an **independent** engine (the `formulas`
package, not exceljs), and asserts the outputs against values worked out by hand.

```bash
pip install formulas openpyxl
python3 scripts/resources/verify.py   # prints PASS/FAIL per check, exits non-zero on any failure
```

All 43 checks currently pass, covering SUM, RANK (avalanche/snowball ordering),
SUMIF, ROUNDUP, percentage, and net-price math.

## Files

- `lib.js`  shared brand palette, fonts, dollar formats, education footer line
- `pdf.js`  branded pdfkit primitives (masthead, fillable fields, tables, callout)
- `xlsx.js` branded exceljs primitives (masthead, sections, input/computed cells)
- `build.js` one generator per resource; the source of truth for every formula
- `verify.py` independent formula verification
- `fonts/`  IBM Plex Mono + IBM Plex Sans TTFs (SIL OFL), embedded in the PDFs

No em dashes appear in any generated file. Every file carries the line
"Educational template, not financial advice."
