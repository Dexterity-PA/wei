/* eslint-disable -- Node.js build-time generator script, not app code */
"use strict";

/*
  Generates every WEI downloadable resource as branded, correct files into
  public/resources/files/. XLSX files carry real working formulas (calcPr
  fullCalcOnLoad is set so Excel and LibreOffice recompute on open). PDFs are
  branded and fillable. Run: node scripts/resources/build.js

  FORMULA NOTES (verified by hand; see VERIFICATION.md):
    - Budget difference  D = planned - actual.  Unallocated = income - total planned.
    - Savings running balance is a recurrence: bal_n = bal_{n-1} + contribution_n,
      bal_1 = starting + contribution_1.  % to goal = bal / target.
    - Debt monthly interest = balance * (APR/100) / 12.  Avalanche order ranks APR
      high to low; snowball ranks balance low to high (RANK ignores blank cells).
    - Emergency target = essentials * months.  Months to reach = ROUNDUP(needed/contribution).
    - College net price = cost of attendance - gift aid.  Gap = net price - resources.
    - Spending summary uses SUMIF(category, name, amount).
*/

const fs = require("fs");
const path = require("path");
const { OUT_DIR } = require("./lib");
const X = require("./xlsx");
const P = require("./pdf");

fs.mkdirSync(OUT_DIR, { recursive: true });
const out = (name) => path.join(OUT_DIR, name);

// ----- small helpers ------------------------------------------------------

function widths(ws, arr) {
  arr.forEach((w, i) => (ws.getColumn(i + 1).width = w));
}
function blankRows(ws, from, to, cols, styler) {
  for (let r = from; r <= to; r++) {
    for (let c = 1; c <= cols; c++) styler(ws.getCell(r, c), r, c);
    ws.getRow(r).height = 20;
  }
}
function savePdf(doc, file) {
  return new Promise((res, rej) => {
    const stream = fs.createWriteStream(file);
    stream.on("finish", res);
    stream.on("error", rej);
    P.paginate(doc);
    doc.pipe(stream);
    doc.end();
  });
}
function finishWb(wb) {
  wb.calcProperties.fullCalcOnLoad = true; // force recompute on open
}

// =========================================================================
// 1. MONTHLY BUDGET WORKSHEET  (50/30/20)
// =========================================================================
async function budget() {
  // ---- XLSX ----
  const wb = X.newWorkbook();
  const ws = wb.addWorksheet("Monthly Budget");
  widths(ws, [34, 16, 16, 18]);
  let r = X.masthead(ws, {
    title: "Monthly Budget Worksheet",
    subtitle: "A 50/30/20 starting point. Enter your take-home pay, then plan and track every dollar. Rename any category to fit your life.",
    category: "Budgeting",
    cols: 4,
  });

  r = X.section(ws, r, "01", "Your monthly income", 4);
  X.label(ws.getCell(r, 1)).value = "Monthly take-home income (after taxes)";
  ws.mergeCells(r, 2, r, 4);
  const incomeRow = r;
  X.input(ws.getCell(r, 2), { money: true });
  r += 2;

  r = X.section(ws, r, "02", "Your 50/30/20 targets", 4);
  r = X.headerRow(ws, r, 1, [{ label: "Guideline" }, { label: "Share", align: "right" }, { label: "Monthly target", align: "right" }, { label: "" }]);
  const targets = [["Needs", 0.5], ["Wants", 0.3], ["Savings and debt payoff", 0.2]];
  for (const [name, share] of targets) {
    X.label(ws.getCell(r, 1)).value = name;
    X.computed(ws.getCell(r, 2), { money: false, numFmt: "0%" }).value = share;
    X.computed(ws.getCell(r, 3)).value = { formula: `B${incomeRow}*${share}` };
    ws.getCell(r, 4).value = null;
    r++;
  }
  r += 1;

  r = X.section(ws, r, "03", "Plan and track your categories", 4);
  r = X.headerRow(ws, r, 1, [{ label: "Category" }, { label: "Planned", align: "right" }, { label: "Actual", align: "right" }, { label: "Difference", align: "right" }]);

  const groups = [
    ["Needs (aim for 50%)", ["Rent or housing", "Utilities", "Groceries", "Transportation", "Insurance", "Phone and internet", "Minimum debt payments"]],
    ["Wants (aim for 30%)", ["Dining out", "Entertainment", "Subscriptions", "Shopping", "Personal care", "Other"]],
    ["Savings and debt payoff (aim for 20%)", ["Emergency fund", "Savings goal", "Extra debt payment", "Investing for the future"]],
  ];
  const subtotalRows = [];
  for (const [groupName, cats] of groups) {
    // group label row
    ws.mergeCells(r, 1, r, 4);
    const g = ws.getCell(r, 1);
    g.value = groupName;
    g.font = { name: X.MONO, size: 9, bold: true, color: { argb: "FF1A6B50" } };
    g.alignment = { horizontal: "left", indent: 1, vertical: "middle" };
    g.fill = X.fill("FFEFEADF");
    ws.getRow(r).height = 20;
    r++;
    const first = r;
    for (const cat of cats) {
      X.input(ws.getCell(r, 1)).value = cat; // editable label
      X.input(ws.getCell(r, 2), { money: true });
      X.input(ws.getCell(r, 3), { money: true });
      X.computed(ws.getCell(r, 4), { money: true }).value = { formula: `IF(AND(B${r}="",C${r}=""),"",N(B${r})-N(C${r}))` };
      r++;
    }
    const last = r - 1;
    // subtotal
    X.totalLabel(ws.getCell(r, 1)).value = "Subtotal";
    X.totalCell(ws.getCell(r, 2)).value = { formula: `SUM(B${first}:B${last})` };
    X.totalCell(ws.getCell(r, 3)).value = { formula: `SUM(C${first}:C${last})` };
    X.totalCell(ws.getCell(r, 4)).value = { formula: `B${r}-C${r}` };
    subtotalRows.push(r);
    r += 2;
  }

  // grand totals + unallocated
  r = X.section(ws, r, "04", "Totals", 4);
  X.label(ws.getCell(r, 1), { bold: true }).value = "Total planned";
  X.computed(ws.getCell(r, 2), { strong: true }).value = { formula: subtotalRows.map((sr) => `B${sr}`).join("+") };
  const totalPlannedRow = r;
  X.label(ws.getCell(r, 3), { bold: true }).value = "Total actual";
  X.computed(ws.getCell(r, 4), { strong: true }).value = { formula: subtotalRows.map((sr) => `C${sr}`).join("+") };
  r += 1;
  X.label(ws.getCell(r, 1), { bold: true }).value = "Left to budget (income minus planned)";
  ws.mergeCells(r, 2, r, 4);
  const lb = ws.getCell(r, 2);
  lb.value = { formula: `B${incomeRow}-B${totalPlannedRow}` };
  lb.numFmt = "$#,##0.00;($#,##0.00)";
  lb.font = { name: X.MONO, size: 12, bold: true, color: { argb: "FF0B1F1C" } };
  lb.alignment = { horizontal: "right", indent: 1, vertical: "middle" };
  lb.fill = X.fill("FFEFEADF");
  lb.border = { top: X.side("FF1F7A5C", "medium"), bottom: X.side("FF1F7A5C", "medium") };
  ws.getRow(r).height = 24;
  r += 2;
  X.footer(ws, r, 4);
  finishWb(wb);
  await wb.xlsx.writeFile(out("wei-monthly-budget-worksheet.xlsx"));

  // ---- PDF ----
  const doc = P.createDoc({
    title: "Monthly Budget Worksheet",
    category: "Budgeting",
    subtitle: "The 50/30/20 method: about 50% of take-home pay to needs, 30% to wants, 20% to savings and paying down debt. Fill it in below, or print and write.",
  });
  let y = doc.y;
  y = P.section(doc, y, "01", "Your monthly income");
  y = P.fieldRow(doc, y, "Monthly take-home income (after taxes)", "income", { dollar: true });
  y = P.para(doc, y, "Your targets: needs about 50%, wants about 30%, savings and debt about 20% of that income.", { gap: 14 });

  y = P.section(doc, y, "02", "Needs (aim for about 50%)");
  y = P.table(doc, y, [
    { header: "Category", key: "c", width: 0.62 },
    { header: "Planned", key: "p", width: 0.19, align: "right", kind: "input" },
    { header: "Actual", key: "a", width: 0.19, align: "right", kind: "input" },
  ], ["Rent or housing", "Utilities", "Groceries", "Transportation", "Insurance", "Phone and internet", "Minimum debt payments"].map((c) => ({ c })), { name: "needs" });

  y = P.section(doc, y, "03", "Wants (aim for about 30%)");
  y = P.table(doc, y, [
    { header: "Category", key: "c", width: 0.62 },
    { header: "Planned", key: "p", width: 0.19, align: "right", kind: "input" },
    { header: "Actual", key: "a", width: 0.19, align: "right", kind: "input" },
  ], ["Dining out", "Entertainment", "Subscriptions", "Shopping", "Personal care", "Other"].map((c) => ({ c })), { name: "wants" });

  y = P.section(doc, y, "04", "Savings and debt payoff (aim for about 20%)");
  y = P.table(doc, y, [
    { header: "Category", key: "c", width: 0.62 },
    { header: "Planned", key: "p", width: 0.19, align: "right", kind: "input" },
    { header: "Actual", key: "a", width: 0.19, align: "right", kind: "input" },
  ], ["Emergency fund", "Savings goal", "Extra debt payment", "Investing for the future"].map((c) => ({ c })), { name: "save" });

  y = P.callout(doc, y, "Left to budget", null, { field: "left_to_budget", dollar: true, note: "Income minus everything you planned. Aim for zero." });
  await savePdf(doc, out("wei-monthly-budget-worksheet.pdf"));
}

// =========================================================================
// 2. SAVINGS GOAL TRACKER
// =========================================================================
async function savings() {
  const wb = X.newWorkbook();
  const ws = wb.addWorksheet("Savings Goal");
  widths(ws, [34, 18, 18, 16]);
  let r = X.masthead(ws, {
    title: "Savings Goal Tracker",
    subtitle: "Name a goal, set a target, and log each contribution. The tracker shows how close you are and how long it will take.",
    category: "Saving",
    cols: 4,
  });

  r = X.section(ws, r, "01", "Your goal", 4);
  X.label(ws.getCell(r, 1)).value = "What you are saving for";
  ws.mergeCells(r, 2, r, 4);
  X.input(ws.getCell(r, 2)).value = null;
  const nameRow = r; r++;
  X.label(ws.getCell(r, 1)).value = "Target amount";
  ws.mergeCells(r, 2, r, 4); X.input(ws.getCell(r, 2), { money: true }); const TARGET = `B${r}`; r++;
  X.label(ws.getCell(r, 1)).value = "Amount you already have saved";
  ws.mergeCells(r, 2, r, 4); X.input(ws.getCell(r, 2), { money: true }); const START = `B${r}`; r++;
  X.label(ws.getCell(r, 1)).value = "Amount you can save each month";
  ws.mergeCells(r, 2, r, 4); X.input(ws.getCell(r, 2), { money: true }); const MONTHLY = `B${r}`; r += 2;

  r = X.section(ws, r, "02", "Your plan", 4);
  X.label(ws.getCell(r, 1)).value = "Amount still needed";
  ws.mergeCells(r, 2, r, 4); X.computed(ws.getCell(r, 2)).value = { formula: `MAX(${TARGET}-${START},0)` }; r++;
  X.label(ws.getCell(r, 1)).value = "Months to reach your goal at this pace";
  ws.mergeCells(r, 2, r, 4); X.computed(ws.getCell(r, 2), { money: false, numFmt: "0" }).value = { formula: `IF(${MONTHLY}>0,ROUNDUP(MAX(${TARGET}-${START},0)/${MONTHLY},0),"")` }; r++;
  X.label(ws.getCell(r, 1)).value = "To finish in 12 months, save each month";
  ws.mergeCells(r, 2, r, 4); X.computed(ws.getCell(r, 2)).value = { formula: `MAX(${TARGET}-${START},0)/12` }; r += 2;

  r = X.section(ws, r, "03", "Contribution log", 4);
  r = X.headerRow(ws, r, 1, [{ label: "Date" }, { label: "Contribution", align: "right" }, { label: "Balance", align: "right" }, { label: "% of goal", align: "right" }]);
  const logFirst = r;
  const LOG = 12;
  for (let i = 0; i < LOG; i++) {
    X.input(ws.getCell(r, 1)).value = null;
    X.input(ws.getCell(r, 2), { money: true });
    // running balance recurrence
    const prev = i === 0 ? START : `C${r - 1}`;
    X.computed(ws.getCell(r, 3)).value = { formula: `IF(B${r}="","",${prev}+B${r})` };
    X.computed(ws.getCell(r, 4), { money: false, numFmt: "0.0%" }).value = { formula: `IF(OR(C${r}="",${TARGET}=0),"",C${r}/${TARGET})` };
    r++;
  }
  const logLast = r - 1;
  X.totalLabel(ws.getCell(r, 1)).value = "Total contributed";
  X.totalCell(ws.getCell(r, 2)).value = { formula: `SUM(B${logFirst}:B${logLast})` };
  X.totalCell(ws.getCell(r, 3)).value = { formula: `${START}+SUM(B${logFirst}:B${logLast})` };
  X.totalCell(ws.getCell(r, 4), { money: false, numFmt: "0.0%" }).value = { formula: `IF(${TARGET}=0,"",(${START}+SUM(B${logFirst}:B${logLast}))/${TARGET})` };
  r += 2;
  X.footer(ws, r, 4);
  finishWb(wb);
  await wb.xlsx.writeFile(out("wei-savings-goal-tracker.xlsx"));

  // PDF
  const doc = P.createDoc({ title: "Savings Goal Tracker", category: "Saving", subtitle: "Set one clear goal, then log every contribution and watch the balance climb." });
  let y = doc.y;
  y = P.section(doc, y, "01", "Your goal");
  y = P.fieldRow(doc, y, "What you are saving for", "goal_name", { boxW: 220 });
  y = P.fieldRow(doc, y, "Target amount", "goal_target", { dollar: true });
  y = P.fieldRow(doc, y, "Amount you already have saved", "goal_start", { dollar: true });
  y = P.fieldRow(doc, y, "Amount you can save each month", "goal_monthly", { dollar: true });
  y = P.para(doc, y, "Months to reach your goal = (target minus what you have) divided by what you save each month, rounded up.", { gap: 14 });
  y = P.section(doc, y, "02", "Contribution log");
  y = P.table(doc, y, [
    { header: "Date", key: "d", width: 0.22, kind: "input" },
    { header: "Contribution", key: "amt", width: 0.26, align: "right", kind: "input" },
    { header: "New balance", key: "bal", width: 0.26, align: "right", kind: "input" },
    { header: "% of goal", key: "pct", width: 0.26, align: "right", kind: "input" },
  ], null, { name: "log", blankRows: 12 });
  await savePdf(doc, out("wei-savings-goal-tracker.pdf"));
}

// =========================================================================
// 3. DEBT PAYOFF PLANNER  (avalanche / snowball)
// =========================================================================
async function debt() {
  const wb = X.newWorkbook();
  const ws = wb.addWorksheet("Debt Payoff");
  widths(ws, [26, 15, 11, 15, 16, 14, 14]);
  let r = X.masthead(ws, {
    title: "Debt Payoff Planner",
    subtitle: "List every debt, then choose a method. Avalanche targets the highest interest rate first to save the most money. Snowball targets the smallest balance first for quicker wins.",
    category: "Debt",
    cols: 7,
  });

  r = X.section(ws, r, "01", "List your debts", 7);
  r = X.headerRow(ws, r, 1, [
    { label: "Debt" }, { label: "Balance", align: "right" }, { label: "APR", align: "right" },
    { label: "Min payment", align: "right" }, { label: "Interest / mo", align: "right" },
    { label: "Avalanche", align: "right" }, { label: "Snowball", align: "right" },
  ]);
  const first = r;
  const ROWS = 8;
  for (let i = 0; i < ROWS; i++) {
    X.input(ws.getCell(r, 1)).value = null;
    X.input(ws.getCell(r, 2), { money: true });
    X.input(ws.getCell(r, 3), { numFmt: '0.0"%"' });
    X.input(ws.getCell(r, 4), { money: true });
    X.computed(ws.getCell(r, 5)).value = { formula: `IF(B${r}="","",B${r}*(C${r}/100)/12)` };
    r++;
  }
  const last = r - 1;
  // ranks reference the whole balance / apr ranges (RANK ignores blanks)
  for (let rr = first; rr <= last; rr++) {
    X.computed(ws.getCell(rr, 6), { money: false, numFmt: "0" }).value = { formula: `IF(C${rr}="","",RANK(C${rr},C$${first}:C$${last},0))` };
    X.computed(ws.getCell(rr, 7), { money: false, numFmt: "0" }).value = { formula: `IF(B${rr}="","",RANK(B${rr},B$${first}:B$${last},1))` };
  }
  X.totalLabel(ws.getCell(r, 1)).value = "Totals";
  X.totalCell(ws.getCell(r, 2)).value = { formula: `SUM(B${first}:B${last})` };
  X.totalCell(ws.getCell(r, 3), { money: false, numFmt: '0.0"%"' }).value = null;
  X.totalCell(ws.getCell(r, 4)).value = { formula: `SUM(D${first}:D${last})` };
  X.totalCell(ws.getCell(r, 5)).value = { formula: `SUM(E${first}:E${last})` };
  X.totalCell(ws.getCell(r, 6)).value = null;
  X.totalCell(ws.getCell(r, 7)).value = null;
  const totalMinRow = r;
  r += 2;

  r = X.section(ws, r, "02", "Add an extra payment", 7);
  X.label(ws.getCell(r, 1)).value = "Extra you can pay each month";
  X.input(ws.getCell(r, 2), { money: true });
  const extraRow = r;
  ws.mergeCells(r, 3, r, 7);
  X.label(ws.getCell(r, 3)).value = "Put this toward your number-one ranked debt first.";
  r++;
  X.label(ws.getCell(r, 1), { bold: true }).value = "Total toward debt each month";
  X.computed(ws.getCell(r, 2), { strong: true }).value = { formula: `D${totalMinRow}+B${extraRow}` };
  ws.mergeCells(r, 3, r, 7);
  X.label(ws.getCell(r, 3)).value = "Minimum payments plus your extra.";
  r += 2;
  X.footer(ws, r, 7);
  finishWb(wb);
  await wb.xlsx.writeFile(out("wei-debt-payoff-planner.xlsx"));

  // PDF
  const doc = P.createDoc({ title: "Debt Payoff Planner", category: "Debt", subtitle: "List your debts, then pick a method and attack one debt at a time while paying the minimum on the rest." });
  let y = doc.y;
  y = P.section(doc, y, "01", "List your debts");
  y = P.table(doc, y, [
    { header: "Debt", key: "n", width: 0.34, kind: "input" },
    { header: "Balance", key: "b", width: 0.22, align: "right", kind: "input" },
    { header: "APR %", key: "r", width: 0.2, align: "right", kind: "input" },
    { header: "Min payment", key: "m", width: 0.24, align: "right", kind: "input" },
  ], null, { name: "debt", blankRows: 8 });
  y = P.section(doc, y, "02", "Choose your method");
  y = P.para(doc, y, "Avalanche: pay extra on the debt with the highest APR first. This costs you the least in interest over time.", { gap: 4 });
  y = P.para(doc, y, "Snowball: pay extra on the smallest balance first. You clear whole debts faster, which keeps you motivated.", { gap: 4 });
  y = P.para(doc, y, "Either way, always pay at least the minimum on every debt so none go to collections.", { gap: 12 });
  y = P.fieldRow(doc, y, "Extra you can pay each month", "debt_extra", { dollar: true });
  await savePdf(doc, out("wei-debt-payoff-planner.pdf"));
}

// =========================================================================
// 4. FIRST-PAYCHECK CHECKLIST  (PDF only)
// =========================================================================
async function paycheck() {
  const doc = P.createDoc({ title: "First Paycheck Checklist", category: "Banking", subtitle: "Got your first paycheck? Work through this once and you will start off on solid footing. Tick each box as you go." });
  let y = doc.y;
  const items = [
    ["01", "Read your pay stub", "Find gross pay (before deductions) and net pay (what you actually get). Note the taxes and any benefits taken out."],
    [null, "Check your tax withholding", "Your W-4 tells your employer how much tax to hold back. If too much or too little comes out, you can update it any time."],
    [null, "Set up direct deposit", "Have your pay sent straight to your bank account. It is faster and safer than a paper check, and often free."],
    ["02", "Open the right accounts", "A checking account for spending and a separate savings account for goals. Look for no monthly fee and no minimum balance."],
    [null, "Start an emergency fund", "Send a small, automatic amount to savings each payday. Even 10 to 20 dollars builds the habit and a cushion."],
    [null, "Sign up for retirement match", "If your job offers a 401(k) match, contribute at least enough to get the full match. It is part of your pay you do not want to skip."],
    ["03", "Give every dollar a job", "Use a simple budget like 50/30/20: needs, wants, savings and debt. Plan it before the money disappears."],
    [null, "Watch the fees", "Avoid overdraft and out-of-network ATM fees. Keep a small buffer in checking so you never go negative."],
    [null, "Keep your pay stubs", "Save digital or paper copies. You will need them for taxes, renting an apartment, or applying for aid."],
  ];
  let n = 0;
  for (const [idx, label, note] of items) {
    if (idx) y = P.section(doc, y, idx, idx === "01" ? "Understand your pay" : idx === "02" ? "Set up your accounts" : "Build the habit");
    y = P.checkItem(doc, y, `chk_${n++}`, label, note);
  }
  await savePdf(doc, out("wei-first-paycheck-checklist.pdf"));
}

// =========================================================================
// 5. BANK ACCOUNT COMPARISON  (PDF + XLSX)
// =========================================================================
async function bank() {
  const wb = X.newWorkbook();
  const ws = wb.addWorksheet("Account Comparison");
  widths(ws, [34, 18, 18, 18]);
  let r = X.masthead(ws, {
    title: "Bank Account Comparison",
    subtitle: "Put up to three accounts side by side. Enter the fees and rates, set the balance you expect to keep, and the sheet estimates a first-year cost or benefit for each.",
    category: "Banking",
    cols: 4,
  });

  r = X.section(ws, r, "01", "The accounts", 4);
  r = X.headerRow(ws, r, 1, [{ label: "Feature" }, { label: "Account 1", align: "right" }, { label: "Account 2", align: "right" }, { label: "Account 3", align: "right" }]);
  const attr = (lbl, kind) => {
    X.label(ws.getCell(r, 1)).value = lbl;
    for (const c of [2, 3, 4]) {
      if (kind === "money") X.input(ws.getCell(r, c), { money: true });
      else if (kind === "apy") X.input(ws.getCell(r, c), { numFmt: '0.00"%"' });
      else X.input(ws.getCell(r, c));
    }
    const row = r; r++; return row;
  };
  attr("Bank or account name", "text");
  attr("Account type (checking / savings)", "text");
  const feeRow = attr("Monthly maintenance fee", "money");
  attr("Minimum balance to waive the fee", "money");
  const apyRow = attr("APY (yearly interest rate)", "apy");
  attr("Out-of-network ATM fee", "money");
  attr("Overdraft fee", "money");
  attr("Minimum opening deposit", "money");
  r += 1;

  r = X.section(ws, r, "02", "Your situation", 4);
  X.label(ws.getCell(r, 1)).value = "Typical balance you expect to keep";
  ws.mergeCells(r, 2, r, 4);
  X.input(ws.getCell(r, 2), { money: true });
  const TB = `B${r}`; r += 2;

  r = X.section(ws, r, "03", "Estimated first year", 4);
  const calcRow = (lbl, fn) => {
    X.label(ws.getCell(r, 1), { bold: true }).value = lbl;
    for (const c of [2, 3, 4]) {
      const col = X.colLetter(c);
      X.computed(ws.getCell(r, c)).value = { formula: fn(col) };
    }
    r++;
  };
  calcRow("Estimated yearly fees (before waivers)", (col) => `IF(${col}${feeRow}="","",${col}${feeRow}*12)`);
  calcRow("Estimated yearly interest earned", (col) => `IF(${col}${apyRow}="","",${TB}*(${col}${apyRow}/100))`);
  calcRow("Net first year (interest minus fees)", (col) => `IF(AND(${col}${feeRow}="",${col}${apyRow}=""),"",${TB}*(N(${col}${apyRow})/100)-N(${col}${feeRow})*12)`);
  r += 1;
  X.footer(ws, r, 4);
  finishWb(wb);
  await wb.xlsx.writeFile(out("wei-bank-account-comparison.xlsx"));

  // PDF
  const doc = P.createDoc({ title: "Bank Account Comparison", category: "Banking", subtitle: "Compare accounts on what actually costs or earns you money: fees, minimums, and interest." });
  let y = doc.y;
  y = P.section(doc, y, "01", "Compare the accounts");
  const rows = ["Bank or account name", "Account type", "Monthly fee", "Min balance to waive fee", "APY (yearly interest)", "Out-of-network ATM fee", "Overdraft fee", "Min opening deposit"];
  y = P.table(doc, y, [
    { header: "Feature", key: "f", width: 0.34 },
    { header: "Account 1", key: "a", width: 0.22, align: "right", kind: "input" },
    { header: "Account 2", key: "b", width: 0.22, align: "right", kind: "input" },
    { header: "Account 3", key: "c", width: 0.22, align: "right", kind: "input" },
  ], rows.map((f) => ({ f })), { name: "bank", rowH: 24 });
  y = P.section(doc, y, "02", "What to look for");
  y = P.para(doc, y, "Lower fees beat a flashy rate for most students. A no-fee account with no minimum is usually the safest pick.", { gap: 4 });
  y = P.para(doc, y, "Yearly interest is roughly your typical balance times the APY. On a small balance even a high APY earns only a little, so do not pay a monthly fee to chase it.", { gap: 12 });
  await savePdf(doc, out("wei-bank-account-comparison.pdf"));
}

// =========================================================================
// 6. EMERGENCY FUND PLANNER  (XLSX + PDF)
// =========================================================================
async function emergency() {
  const wb = X.newWorkbook();
  const ws = wb.addWorksheet("Emergency Fund");
  widths(ws, [40, 20, 20]);
  let r = X.masthead(ws, {
    title: "Emergency Fund Planner",
    subtitle: "An emergency fund covers your essential bills if income stops. Add up what you must pay each month, pick how many months to cover, and track your progress.",
    category: "Saving",
    cols: 3,
  });

  r = X.section(ws, r, "01", "Your essential monthly expenses", 3);
  r = X.headerRow(ws, r, 1, [{ label: "Expense" }, { label: "Monthly amount", align: "right" }, { label: "" }]);
  const eFirst = r;
  for (const e of ["Rent or housing", "Utilities", "Groceries", "Transportation", "Insurance", "Phone and internet", "Minimum debt payments", "Other essentials"]) {
    X.input(ws.getCell(r, 1)).value = e;
    X.input(ws.getCell(r, 2), { money: true });
    ws.getCell(r, 3).value = null;
    r++;
  }
  const eLast = r - 1;
  X.totalLabel(ws.getCell(r, 1)).value = "Essential monthly expenses";
  X.totalCell(ws.getCell(r, 2)).value = { formula: `SUM(B${eFirst}:B${eLast})` };
  X.totalCell(ws.getCell(r, 3)).value = null;
  const ESS = `B${r}`; r += 2;

  r = X.section(ws, r, "02", "Your target", 3);
  X.label(ws.getCell(r, 1)).value = "Three months of essentials";
  X.computed(ws.getCell(r, 2)).value = { formula: `${ESS}*3` }; ws.getCell(r, 3).value = null; r++;
  X.label(ws.getCell(r, 1)).value = "Six months of essentials";
  X.computed(ws.getCell(r, 2)).value = { formula: `${ESS}*6` }; ws.getCell(r, 3).value = null; r++;
  X.label(ws.getCell(r, 1)).value = "Months of coverage you want";
  X.input(ws.getCell(r, 2), { numFmt: "0" }); const MONTHS = `B${r}`; ws.getCell(r, 3).value = null; r++;
  X.label(ws.getCell(r, 1), { bold: true }).value = "Your fund target";
  X.computed(ws.getCell(r, 2), { strong: true }).value = { formula: `${ESS}*N(${MONTHS})` }; const TARGET = `B${r}`; ws.getCell(r, 3).value = null; r += 2;

  r = X.section(ws, r, "03", "Your progress", 3);
  X.label(ws.getCell(r, 1)).value = "Amount saved so far";
  X.input(ws.getCell(r, 2), { money: true }); const SAVED = `B${r}`; ws.getCell(r, 3).value = null; r++;
  X.label(ws.getCell(r, 1)).value = "Amount you can add each month";
  X.input(ws.getCell(r, 2), { money: true }); const MO = `B${r}`; ws.getCell(r, 3).value = null; r++;
  X.label(ws.getCell(r, 1)).value = "Still needed";
  X.computed(ws.getCell(r, 2)).value = { formula: `MAX(${TARGET}-${SAVED},0)` }; ws.getCell(r, 3).value = null; r++;
  X.label(ws.getCell(r, 1)).value = "Months to reach your target";
  X.computed(ws.getCell(r, 2), { money: false, numFmt: "0" }).value = { formula: `IF(${MO}>0,ROUNDUP(MAX(${TARGET}-${SAVED},0)/${MO},0),"")` }; ws.getCell(r, 3).value = null; r++;
  X.label(ws.getCell(r, 1)).value = "Progress";
  X.computed(ws.getCell(r, 2), { money: false, numFmt: "0.0%" }).value = { formula: `IF(${TARGET}>0,MIN(${SAVED}/${TARGET},1),"")` }; ws.getCell(r, 3).value = null; r += 2;
  X.footer(ws, r, 3);
  finishWb(wb);
  await wb.xlsx.writeFile(out("wei-emergency-fund-planner.xlsx"));

  // PDF
  const doc = P.createDoc({ title: "Emergency Fund Planner", category: "Saving", subtitle: "Three to six months of essential expenses is a common goal. Start with one month and build from there." });
  let y = doc.y;
  y = P.section(doc, y, "01", "Your essential monthly expenses");
  y = P.table(doc, y, [
    { header: "Expense", key: "e", width: 0.66 },
    { header: "Monthly amount", key: "m", width: 0.34, align: "right", kind: "input" },
  ], ["Rent or housing", "Utilities", "Groceries", "Transportation", "Insurance", "Phone and internet", "Minimum debt payments", "Other essentials"].map((e) => ({ e })), { name: "ef" });
  y = P.section(doc, y, "02", "Your target");
  y = P.para(doc, y, "Fund target = essential monthly expenses times the number of months you want to cover.", { gap: 10 });
  y = P.fieldRow(doc, y, "Months of coverage you want (3 to 6 is common)", "ef_months", { boxW: 90 });
  y = P.fieldRow(doc, y, "Your fund target", "ef_target", { dollar: true });
  y = P.fieldRow(doc, y, "Amount saved so far", "ef_saved", { dollar: true });
  await savePdf(doc, out("wei-emergency-fund-planner.pdf"));
}

// =========================================================================
// 7. COLLEGE COST / NET-PRICE WORKSHEET  (XLSX + PDF)
// =========================================================================
async function college() {
  const wb = X.newWorkbook();
  const ws = wb.addWorksheet("Net Price");
  widths(ws, [42, 20, 20]);
  let r = X.masthead(ws, {
    title: "College Cost and Net-Price Worksheet",
    subtitle: "Sticker price is not what most students pay. Net price is the full cost of attendance minus grants and scholarships you do not repay. Work it out for one school.",
    category: "College",
    cols: 3,
  });

  r = X.section(ws, r, "01", "Cost of attendance (one year)", 3);
  r = X.headerRow(ws, r, 1, [{ label: "Cost" }, { label: "Amount", align: "right" }, { label: "" }]);
  const cFirst = r;
  for (const c of ["Tuition and fees", "Housing and meals", "Books and supplies", "Transportation", "Personal expenses"]) {
    X.input(ws.getCell(r, 1)).value = c; X.input(ws.getCell(r, 2), { money: true }); ws.getCell(r, 3).value = null; r++;
  }
  const cLast = r - 1;
  X.totalLabel(ws.getCell(r, 1)).value = "Total cost of attendance";
  X.totalCell(ws.getCell(r, 2)).value = { formula: `SUM(B${cFirst}:B${cLast})` };
  X.totalCell(ws.getCell(r, 3)).value = null;
  const COA = `B${r}`; r += 2;

  r = X.section(ws, r, "02", "Gift aid (you do not repay this)", 3);
  r = X.headerRow(ws, r, 1, [{ label: "Gift aid" }, { label: "Amount", align: "right" }, { label: "" }]);
  const gFirst = r;
  for (const g of ["Grants", "Scholarships", "Other gift aid"]) {
    X.input(ws.getCell(r, 1)).value = g; X.input(ws.getCell(r, 2), { money: true }); ws.getCell(r, 3).value = null; r++;
  }
  const gLast = r - 1;
  X.totalLabel(ws.getCell(r, 1)).value = "Total gift aid";
  X.totalCell(ws.getCell(r, 2)).value = { formula: `SUM(B${gFirst}:B${gLast})` };
  X.totalCell(ws.getCell(r, 3)).value = null;
  const GIFT = `B${r}`; r++;
  X.label(ws.getCell(r, 1), { bold: true }).value = "Net price (cost of attendance minus gift aid)";
  X.computed(ws.getCell(r, 2), { strong: true }).value = { formula: `${COA}-${GIFT}` };
  ws.getCell(r, 3).value = null;
  const NET = `B${r}`; r += 2;

  r = X.section(ws, r, "03", "How you will cover the net price", 3);
  r = X.headerRow(ws, r, 1, [{ label: "Resource" }, { label: "Amount", align: "right" }, { label: "" }]);
  const rFirst = r;
  for (const res of ["Family contribution", "Student savings", "Work or work-study earnings", "Federal student loans", "Other"]) {
    X.input(ws.getCell(r, 1)).value = res; X.input(ws.getCell(r, 2), { money: true }); ws.getCell(r, 3).value = null; r++;
  }
  const rLast = r - 1;
  X.totalLabel(ws.getCell(r, 1)).value = "Total resources";
  X.totalCell(ws.getCell(r, 2)).value = { formula: `SUM(B${rFirst}:B${rLast})` };
  X.totalCell(ws.getCell(r, 3)).value = null;
  const RES = `B${r}`; r++;
  X.label(ws.getCell(r, 1), { bold: true }).value = "Remaining gap (net price minus resources)";
  X.computed(ws.getCell(r, 2), { strong: true }).value = { formula: `${NET}-${RES}` };
  ws.getCell(r, 3).value = null; r += 2;

  r = X.section(ws, r, "04", "Four-year estimate", 3);
  X.label(ws.getCell(r, 1)).value = "Net price this year";
  X.computed(ws.getCell(r, 2)).value = { formula: `${NET}` }; ws.getCell(r, 3).value = null; r++;
  X.label(ws.getCell(r, 1)).value = "Rough four-year net price (costs usually rise)";
  X.computed(ws.getCell(r, 2)).value = { formula: `${NET}*4` }; ws.getCell(r, 3).value = null; r += 2;
  X.footer(ws, r, 3);
  finishWb(wb);
  await wb.xlsx.writeFile(out("wei-college-cost-net-price-worksheet.xlsx"));

  // PDF
  const doc = P.createDoc({ title: "College Cost and Net-Price Worksheet", category: "College", subtitle: "Net price, not sticker price, is what you actually pay. This worksheet gets you to that number." });
  let y = doc.y;
  y = P.section(doc, y, "01", "Cost of attendance (one year)");
  y = P.table(doc, y, [{ header: "Cost", key: "c", width: 0.66 }, { header: "Amount", key: "a", width: 0.34, align: "right", kind: "input" }],
    ["Tuition and fees", "Housing and meals", "Books and supplies", "Transportation", "Personal expenses"].map((c) => ({ c })), { name: "coa" });
  y = P.section(doc, y, "02", "Gift aid you do not repay");
  y = P.table(doc, y, [{ header: "Gift aid", key: "c", width: 0.66 }, { header: "Amount", key: "a", width: 0.34, align: "right", kind: "input" }],
    ["Grants", "Scholarships", "Other gift aid"].map((c) => ({ c })), { name: "gift" });
  y = P.callout(doc, y, "Net price = cost of attendance minus gift aid", null, { field: "net_price", dollar: true, note: "This is the number that matters when comparing schools." });
  y = P.section(doc, y, "03", "How you will cover it");
  y = P.table(doc, y, [{ header: "Resource", key: "c", width: 0.66 }, { header: "Amount", key: "a", width: 0.34, align: "right", kind: "input" }],
    ["Family contribution", "Student savings", "Work or work-study earnings", "Federal student loans", "Other"].map((c) => ({ c })), { name: "res" });
  await savePdf(doc, out("wei-college-cost-net-price-worksheet.pdf"));
}

// =========================================================================
// 8. SPENDING TRACKER  (XLSX + PDF)
// =========================================================================
async function spending() {
  const CATS = ["Housing", "Food", "Transportation", "Personal", "Fun", "Savings", "Other"];
  const wb = X.newWorkbook();
  const ws = wb.addWorksheet("Spending Log");
  widths(ws, [16, 34, 18, 14, 16]);
  let r = X.masthead(ws, {
    title: "Spending Tracker",
    subtitle: "Write down what you spend for a few weeks. The category summary adds it up for you so you can see where the money really goes.",
    category: "Budgeting",
    cols: 5,
  });

  r = X.section(ws, r, "01", "Spending log", 5);
  // legend
  ws.mergeCells(r, 1, r, 5);
  const lg = ws.getCell(r, 1);
  lg.value = "Use these categories so the summary adds up:  " + CATS.join(",  ");
  lg.font = { name: X.MONO, size: 8.5, color: { argb: "FF5B6B66" } };
  lg.alignment = { horizontal: "left", indent: 1 };
  ws.getRow(r).height = 18; r++;
  r = X.headerRow(ws, r, 1, [{ label: "Date" }, { label: "Description" }, { label: "Category" }, { label: "Need / Want" }, { label: "Amount", align: "right" }]);
  const lFirst = r;
  const N = 28;
  blankRows(ws, r, r + N - 1, 5, (cell, row, c) => {
    if (c === 5) X.input(cell, { money: true });
    else X.input(cell);
  });
  r += N;
  const lLast = r - 1;
  X.totalLabel(ws.getCell(r, 1)).value = "Total spent";
  ws.mergeCells(r, 1, r, 4);
  X.totalLabel(ws.getCell(r, 1)).value = "Total spent";
  X.totalCell(ws.getCell(r, 5)).value = { formula: `SUM(E${lFirst}:E${lLast})` };
  const TOTAL = `E${r}`; r += 2;

  r = X.section(ws, r, "02", "Summary by category", 5);
  r = X.headerRow(ws, r, 1, [{ label: "Category" }, { label: "Total", align: "right" }, { label: "% of spending", align: "right" }, { label: "" }, { label: "" }]);
  const catRange = `C${lFirst}:C${lLast}`;
  const amtRange = `E${lFirst}:E${lLast}`;
  for (const c of CATS) {
    X.label(ws.getCell(r, 1)).value = c;
    X.computed(ws.getCell(r, 2)).value = { formula: `SUMIF(${catRange},"${c}",${amtRange})` };
    X.computed(ws.getCell(r, 3), { money: false, numFmt: "0.0%" }).value = { formula: `IF(${TOTAL}=0,"",SUMIF(${catRange},"${c}",${amtRange})/${TOTAL})` };
    ws.getCell(r, 4).value = null; ws.getCell(r, 5).value = null;
    r++;
  }
  r += 1;
  r = X.section(ws, r, "03", "Needs vs wants", 5);
  const dRange = `D${lFirst}:D${lLast}`;
  for (const k of ["Need", "Want"]) {
    X.label(ws.getCell(r, 1)).value = `Total ${k.toLowerCase()}s`;
    X.computed(ws.getCell(r, 2)).value = { formula: `SUMIF(${dRange},"${k}",${amtRange})` };
    X.computed(ws.getCell(r, 3), { money: false, numFmt: "0.0%" }).value = { formula: `IF(${TOTAL}=0,"",SUMIF(${dRange},"${k}",${amtRange})/${TOTAL})` };
    ws.getCell(r, 4).value = null; ws.getCell(r, 5).value = null;
    r++;
  }
  r += 1;
  X.footer(ws, r, 5);
  finishWb(wb);
  await wb.xlsx.writeFile(out("wei-spending-tracker.xlsx"));

  // PDF
  const doc = P.createDoc({ title: "Spending Tracker", category: "Budgeting", subtitle: "Track every purchase for a few weeks. Awareness alone usually cuts spending." });
  let y = doc.y;
  y = P.section(doc, y, "01", "Spending log");
  y = P.para(doc, y, "Suggested categories: Housing, Food, Transportation, Personal, Fun, Savings, Other.", { gap: 10 });
  y = P.table(doc, y, [
    { header: "Date", key: "d", width: 0.16, kind: "input" },
    { header: "Description", key: "x", width: 0.34, kind: "input" },
    { header: "Category", key: "c", width: 0.2, kind: "input" },
    { header: "N / W", key: "nw", width: 0.12, kind: "input" },
    { header: "Amount", key: "a", width: 0.18, align: "right", kind: "input" },
  ], null, { name: "spend", blankRows: 22, rowH: 21 });
  await savePdf(doc, out("wei-spending-tracker.pdf"));
}

// ----- run all ------------------------------------------------------------
(async () => {
  const jobs = [
    ["Monthly budget", budget],
    ["Savings goal", savings],
    ["Debt payoff", debt],
    ["First paycheck", paycheck],
    ["Bank comparison", bank],
    ["Emergency fund", emergency],
    ["College net price", college],
    ["Spending tracker", spending],
  ];
  for (const [name, fn] of jobs) {
    await fn();
    console.log("built:", name);
  }
  console.log("\nAll files written to", OUT_DIR);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});