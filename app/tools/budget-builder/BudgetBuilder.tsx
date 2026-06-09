"use client";

import { useId, useMemo, useState } from "react";

/*
  Budget builder.

  Start from a 50/30/20 frame (needs / wants / savings) but fully editable: add,
  rename, or remove categories, and edit either a percentage or a dollar amount.
  Income and the two edit modes stay in sync:

    amount = percent / 100 * income
    percent = income > 0 ? amount / income * 100 : 0

  Outputs: per-category breakdown, total allocated, what is left over (or how far
  over), and a single stacked bar. The tool flags when allocations exceed 100%
  of income. Student income is normal here: part-time pay and allowance are fine
  starting points.
*/

type EditMode = "percent" | "dollar";

type Category = {
  id: string;
  name: string;
  // Stored as a dollar amount. Percent is derived from income for display.
  amount: number;
};

let counter = 0;
const nextId = () => `cat-${counter++}`;

const DEFAULT_INCOME = 1200;

// 50/30/20 starting frame, expressed as amounts against the default income so
// the initial render is deterministic.
const makeDefaults = (income: number): Category[] => [
  { id: nextId(), name: "Needs (rent, food, transit)", amount: income * 0.5 },
  { id: nextId(), name: "Wants (fun, eating out)", amount: income * 0.3 },
  { id: nextId(), name: "Savings", amount: income * 0.2 },
];

const usd = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

const pct = (n: number) =>
  `${n.toLocaleString("en-US", { maximumFractionDigits: 1 })}%`;

// A small set of distinct fills for the stacked bar. Emerald leads; the rest are
// tints of the palette so the bar stays on-brand and restrained.
const BAR_FILLS = [
  "var(--color-wei-emerald)",
  "var(--color-wei-amber)",
  "var(--color-wei-emerald-deep)",
  "var(--color-wei-ink-soft)",
  "#7aa698",
  "#c08a3a",
];

export function BudgetBuilder() {
  const [income, setIncome] = useState(DEFAULT_INCOME);
  const [mode, setMode] = useState<EditMode>("percent");
  const [categories, setCategories] = useState<Category[]>(() =>
    makeDefaults(DEFAULT_INCOME),
  );

  const totalAllocated = useMemo(
    () => categories.reduce((sum, c) => sum + c.amount, 0),
    [categories],
  );
  const remaining = income - totalAllocated;
  const totalPercent = income > 0 ? (totalAllocated / income) * 100 : 0;
  const over = totalAllocated > income + 0.005;

  const updateAmount = (id: string, amount: number) =>
    setCategories((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, amount: Math.max(0, amount) } : c,
      ),
    );

  const updatePercent = (id: string, percent: number) =>
    updateAmount(id, (Math.max(0, percent) / 100) * income);

  const updateName = (id: string, name: string) =>
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, name } : c)),
    );

  const removeCategory = (id: string) =>
    setCategories((prev) => prev.filter((c) => c.id !== id));

  const addCategory = () =>
    setCategories((prev) => [
      ...prev,
      { id: nextId(), name: "New category", amount: 0 },
    ]);

  const resetFrame = () => setCategories(makeDefaults(income));

  return (
    <div className="grid gap-x-wei-gutter gap-y-10 lg:grid-cols-12">
      {/* Left: income + categories */}
      <div className="lg:col-span-7">
        <div className="wei-hairgrid grid grid-cols-1 sm:grid-cols-2">
          <IncomeField income={income} onChange={setIncome} />
          <ModeToggle mode={mode} onChange={setMode} />
        </div>

        <ul className="mt-8 flex flex-col gap-3">
          {categories.map((c, idx) => {
            const percent =
              income > 0 ? (c.amount / income) * 100 : 0;
            return (
              <CategoryRow
                key={c.id}
                index={idx}
                name={c.name}
                amount={c.amount}
                percent={percent}
                mode={mode}
                fill={BAR_FILLS[idx % BAR_FILLS.length]}
                onName={(v) => updateName(c.id, v)}
                onAmount={(v) => updateAmount(c.id, v)}
                onPercent={(v) => updatePercent(c.id, v)}
                onRemove={
                  categories.length > 1
                    ? () => removeCategory(c.id)
                    : undefined
                }
              />
            );
          })}
        </ul>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={addCategory}
            className="wei-eyebrow rounded-wei-sm border border-wei-line-strong px-4 py-2.5 text-wei-emerald-deep transition-colors hover:bg-wei-paper-dim"
          >
            + Add category
          </button>
          <button
            type="button"
            onClick={resetFrame}
            className="wei-eyebrow rounded-wei-sm border border-wei-line px-4 py-2.5 text-wei-ink/60 transition-colors hover:bg-wei-paper-dim"
          >
            Reset to 50 / 30 / 20
          </button>
        </div>
      </div>

      {/* Right: summary + bar */}
      <div className="lg:col-span-5">
        <div className="border border-wei-line bg-wei-paper">
          <div className="border-b border-wei-line px-4 py-3">
            <span className="wei-eyebrow text-wei-ink/50">Your budget</span>
          </div>

          {/* Stacked bar */}
          <div className="px-4 py-5">
            <StackedBar
              income={income}
              categories={categories}
              totalAllocated={totalAllocated}
            />
          </div>

          <dl className="wei-hairgrid grid grid-cols-2">
            <SummaryCell label="Income" value={usd(income)} />
            <SummaryCell
              label="Allocated"
              value={usd(totalAllocated)}
              sub={pct(totalPercent)}
            />
            <SummaryCell
              label={over ? "Over budget" : "Left to allocate"}
              value={usd(Math.abs(remaining))}
              tone={over ? "warn" : remaining > 0.5 ? "default" : "good"}
              span
            />
          </dl>

          {over ? (
            <p
              role="status"
              className="border-t border-wei-line bg-wei-amber/15 px-4 py-3 text-wei-sm text-wei-ink/80"
            >
              Your categories add up to {pct(totalPercent)} of your income. That
              is more than you bring in. Trim a category or raise income to get
              back to 100% or less.
            </p>
          ) : remaining > 0.5 ? (
            <p className="border-t border-wei-line px-4 py-3 text-wei-sm text-wei-ink/65">
              You have {usd(remaining)} not yet assigned. Giving every dollar a
              job, including saving, is one way to stay in control.
            </p>
          ) : (
            <p className="border-t border-wei-line px-4 py-3 text-wei-sm text-wei-emerald-deep">
              Every dollar is assigned. Nice and balanced.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function StackedBar({
  income,
  categories,
  totalAllocated,
}: {
  income: number;
  categories: Category[];
  totalAllocated: number;
}) {
  // The bar is scaled to the larger of income or total allocated so that going
  // over budget visibly overflows the income marker rather than clipping.
  const scaleMax = Math.max(income, totalAllocated, 1);
  const incomeMarker = (income / scaleMax) * 100;

  return (
    <div>
      <div
        className="relative h-7 w-full overflow-hidden rounded-wei-sm bg-wei-paper-dim"
        role="img"
        aria-label={`Stacked bar of allocations totaling ${usd(
          totalAllocated,
        )} against income of ${usd(income)}.`}
      >
        <div className="flex h-full w-full">
          {categories.map((c, idx) => {
            const w = (c.amount / scaleMax) * 100;
            if (w <= 0) return null;
            return (
              <div
                key={c.id}
                style={{
                  width: `${w}%`,
                  backgroundColor: BAR_FILLS[idx % BAR_FILLS.length],
                }}
                className="h-full border-r border-wei-paper/40 last:border-r-0"
                title={`${c.name}: ${usd(c.amount)}`}
              />
            );
          })}
        </div>
        {/* Income marker: where 100% of income sits on the scale. */}
        {totalAllocated > income + 0.005 ? (
          <span
            aria-hidden="true"
            className="absolute inset-y-0 w-px bg-wei-ink"
            style={{ left: `${incomeMarker}%` }}
          />
        ) : null}
      </div>
      <p className="mt-2 wei-eyebrow text-wei-ink/40">
        {totalAllocated > income + 0.005
          ? "Vertical line marks 100% of income"
          : "Share of income"}
      </p>
    </div>
  );
}

function CategoryRow({
  index,
  name,
  amount,
  percent,
  mode,
  fill,
  onName,
  onAmount,
  onPercent,
  onRemove,
}: {
  index: number;
  name: string;
  amount: number;
  percent: number;
  mode: EditMode;
  fill: string;
  onName: (v: string) => void;
  onAmount: (v: number) => void;
  onPercent: (v: number) => void;
  onRemove?: () => void;
}) {
  const nameId = useId();
  const valueId = useId();
  return (
    <li className="rounded-wei-md border border-wei-line bg-wei-paper px-4 py-3">
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="h-3 w-3 flex-none rounded-wei-sm"
          style={{ backgroundColor: fill }}
        />
        <label htmlFor={nameId} className="sr-only">
          Category {index + 1} name
        </label>
        <input
          id={nameId}
          type="text"
          value={name}
          onChange={(e) => onName(e.target.value)}
          className="min-w-0 flex-1 bg-transparent text-wei-base font-medium text-wei-ink outline-none"
        />
        {onRemove ? (
          <button
            type="button"
            onClick={onRemove}
            aria-label={`Remove ${name}`}
            className="wei-eyebrow flex-none rounded-wei-sm px-2 py-1 text-wei-ink/40 transition-colors hover:bg-wei-paper-dim hover:text-wei-ink/70"
          >
            Remove
          </button>
        ) : null}
      </div>

      <div className="mt-2 flex items-center gap-3 pl-6">
        <label htmlFor={valueId} className="wei-eyebrow text-wei-ink/45">
          {mode === "percent" ? "Percent" : "Dollars"}
        </label>
        <div className="flex items-baseline gap-1">
          {mode === "dollar" ? (
            <span className="wei-num text-wei-base text-wei-ink/45">$</span>
          ) : null}
          <input
            id={valueId}
            type="number"
            inputMode="decimal"
            min={0}
            step={mode === "percent" ? 1 : 10}
            value={
              mode === "percent"
                ? Number(percent.toFixed(1))
                : Math.round(amount)
            }
            onChange={(e) => {
              const raw = e.target.valueAsNumber;
              const safe = Number.isNaN(raw) ? 0 : raw;
              if (mode === "percent") onPercent(safe);
              else onAmount(safe);
            }}
            className="wei-num w-24 bg-transparent text-wei-lg font-medium text-wei-ink outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          {mode === "percent" ? (
            <span className="wei-num text-wei-base text-wei-ink/45">%</span>
          ) : null}
        </div>
        <span className="wei-num ml-auto text-wei-sm text-wei-ink/45">
          {mode === "percent" ? usd(amount) : pct(percent)}
        </span>
      </div>
    </li>
  );
}

function IncomeField({
  income,
  onChange,
}: {
  income: number;
  onChange: (v: number) => void;
}) {
  const id = useId();
  return (
    <div className="bg-wei-paper px-4 py-4">
      <label htmlFor={id} className="wei-eyebrow block text-wei-ink/55">
        Monthly income
      </label>
      <div className="mt-2 flex items-baseline gap-1.5">
        <span className="wei-num text-wei-lg text-wei-ink/45">$</span>
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={0}
          step={50}
          value={Math.round(income)}
          onChange={(e) => {
            const raw = e.target.valueAsNumber;
            onChange(Number.isNaN(raw) ? 0 : Math.max(0, raw));
          }}
          className="wei-num w-full min-w-0 bg-transparent text-wei-2xl font-medium text-wei-ink outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
      </div>
      <p className="mt-2 text-wei-xs text-wei-ink/55">
        Part-time pay or allowance is fine. Use what you get in a typical month.
      </p>
    </div>
  );
}

function ModeToggle({
  mode,
  onChange,
}: {
  mode: EditMode;
  onChange: (m: EditMode) => void;
}) {
  return (
    <div className="bg-wei-paper px-4 py-4">
      <span className="wei-eyebrow block text-wei-ink/55">Edit by</span>
      <div
        role="group"
        aria-label="Edit categories by percent or dollars"
        className="mt-2 inline-flex rounded-wei-sm border border-wei-line"
      >
        {(["percent", "dollar"] as const).map((m) => (
          <button
            key={m}
            type="button"
            aria-pressed={mode === m}
            onClick={() => onChange(m)}
            className={`wei-eyebrow px-4 py-2.5 transition-colors ${
              mode === m
                ? "bg-wei-ink text-wei-paper"
                : "text-wei-ink/55 hover:bg-wei-paper-dim"
            }`}
          >
            {m === "percent" ? "Percent" : "Dollars"}
          </button>
        ))}
      </div>
      <p className="mt-2 text-wei-xs text-wei-ink/55">
        Switch any time. The other value updates to match.
      </p>
    </div>
  );
}

function SummaryCell({
  label,
  value,
  sub,
  tone = "default",
  span = false,
}: {
  label: string;
  value: string;
  sub?: string;
  tone?: "default" | "warn" | "good";
  span?: boolean;
}) {
  const valueColor =
    tone === "warn"
      ? "text-wei-amber"
      : tone === "good"
        ? "text-wei-emerald-deep"
        : "text-wei-ink";
  return (
    <div className={`bg-wei-paper px-4 py-4 ${span ? "col-span-2" : ""}`}>
      <span className="wei-eyebrow block text-wei-ink/50">{label}</span>
      <span className={`wei-num mt-2 block text-wei-2xl font-medium ${valueColor}`}>
        {value}
      </span>
      {sub ? (
        <span className="wei-num mt-1 block text-wei-sm text-wei-ink/45">
          {sub}
        </span>
      ) : null}
    </div>
  );
}
