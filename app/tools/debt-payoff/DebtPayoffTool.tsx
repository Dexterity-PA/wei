"use client";

import { useId, useMemo, useState } from "react";
import {
  simulatePayoff,
  debtsThatNeverShrink,
  type DebtInput,
  type StrategyResult,
} from "./amortize";
import { PayoffChart } from "./PayoffChart";

type DebtRow = {
  id: string;
  name: string;
  balance: string;
  apr: string;
  minPayment: string;
};

let counter = 0;
function newRow(name: string, balance = "", apr = "", minPayment = ""): DebtRow {
  counter += 1;
  return { id: `debt-${counter}`, name, balance, apr, minPayment };
}

const INITIAL: DebtRow[] = [
  newRow("Credit card", "5000", "22.99", "100"),
  newRow("Store card", "1500", "26.99", "40"),
  newRow("Car loan", "8000", "6.5", "180"),
];

const usd0 = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
function num(s: string): number {
  const n = parseFloat(s);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

function monthsToText(months: number): string {
  if (months <= 0) return "0 months";
  const y = Math.floor(months / 12);
  const m = months % 12;
  const parts: string[] = [];
  if (y > 0) parts.push(`${y} ${y === 1 ? "year" : "years"}`);
  if (m > 0) parts.push(`${m} ${m === 1 ? "month" : "months"}`);
  return parts.join(", ");
}

const labelClass = "block text-wei-xs font-semibold text-wei-ink/70";
const inputClass =
  "mt-1.5 block w-full rounded-wei-sm border border-wei-line bg-wei-paper px-3 py-2 text-wei-base text-wei-ink outline-none transition-colors placeholder:text-wei-ink/30 focus-visible:border-wei-emerald-deep";

export function DebtPayoffTool() {
  const baseId = useId();
  const [rows, setRows] = useState<DebtRow[]>(INITIAL);
  const [extra, setExtra] = useState("150");

  const debts: DebtInput[] = useMemo(
    () =>
      rows
        .map((r) => ({
          id: r.id,
          name: r.name.trim() || "Debt",
          balance: num(r.balance),
          apr: num(r.apr),
          minPayment: num(r.minPayment),
        }))
        .filter((d) => d.balance > 0),
    [rows],
  );

  const extraMonthly = num(extra);

  const neverShrink = useMemo(() => debtsThatNeverShrink(debts), [debts]);

  const { avalanche, snowball } = useMemo<{
    avalanche: StrategyResult | null;
    snowball: StrategyResult | null;
  }>(() => {
    if (debts.length === 0 || neverShrink.length > 0) {
      return { avalanche: null, snowball: null };
    }
    return {
      avalanche: simulatePayoff(debts, extraMonthly, "avalanche"),
      snowball: simulatePayoff(debts, extraMonthly, "snowball"),
    };
  }, [debts, extraMonthly, neverShrink.length]);

  function update(id: string, field: keyof DebtRow, value: string) {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)),
    );
  }
  function addRow() {
    setRows((prev) => [...prev, newRow("")]);
  }
  function removeRow(id: string) {
    setRows((prev) => (prev.length > 1 ? prev.filter((r) => r.id !== id) : prev));
  }

  const interestSaved =
    avalanche && snowball
      ? Math.abs(avalanche.totalInterest - snowball.totalInterest)
      : 0;
  const avalancheCheaper =
    avalanche && snowball
      ? avalanche.totalInterest <= snowball.totalInterest
      : true;

  return (
    <div>
      {/* Inputs */}
      <div className="border border-wei-line bg-wei-paper">
        <div className="flex items-center justify-between border-b border-wei-line px-4 py-3">
          <span className="wei-eyebrow text-wei-ink/50">Your debts</span>
          <span className="wei-eyebrow text-wei-ink/40">
            {debts.length} {debts.length === 1 ? "debt" : "debts"}
          </span>
        </div>

        <div className="divide-y divide-wei-line">
          {rows.map((row, i) => (
            <div
              key={row.id}
              className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-12 sm:items-end"
            >
              <div className="sm:col-span-4">
                <label htmlFor={`${baseId}-${row.id}-name`} className={labelClass}>
                  Name
                </label>
                <input
                  id={`${baseId}-${row.id}-name`}
                  type="text"
                  value={row.name}
                  maxLength={40}
                  placeholder={`Debt ${i + 1}`}
                  onChange={(e) => update(row.id, "name", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div className="sm:col-span-3">
                <label htmlFor={`${baseId}-${row.id}-bal`} className={labelClass}>
                  Balance ($)
                </label>
                <input
                  id={`${baseId}-${row.id}-bal`}
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  value={row.balance}
                  placeholder="0"
                  onChange={(e) => update(row.id, "balance", e.target.value)}
                  className={`${inputClass} wei-num`}
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor={`${baseId}-${row.id}-apr`} className={labelClass}>
                  APR (%)
                </label>
                <input
                  id={`${baseId}-${row.id}-apr`}
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  value={row.apr}
                  placeholder="0"
                  onChange={(e) => update(row.id, "apr", e.target.value)}
                  className={`${inputClass} wei-num`}
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor={`${baseId}-${row.id}-min`} className={labelClass}>
                  Min/mo ($)
                </label>
                <input
                  id={`${baseId}-${row.id}-min`}
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  value={row.minPayment}
                  placeholder="0"
                  onChange={(e) => update(row.id, "minPayment", e.target.value)}
                  className={`${inputClass} wei-num`}
                />
              </div>
              <div className="sm:col-span-1 sm:pb-1">
                <button
                  type="button"
                  onClick={() => removeRow(row.id)}
                  disabled={rows.length <= 1}
                  aria-label={`Remove ${row.name.trim() || `debt ${i + 1}`}`}
                  className="wei-eyebrow w-full rounded-wei-sm border border-wei-line px-2 py-2 text-wei-ink/60 transition-colors hover:border-wei-amber hover:text-wei-amber disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-wei-line px-4 py-3">
          <button
            type="button"
            onClick={addRow}
            className="wei-eyebrow rounded-wei-pill border border-wei-emerald px-4 py-2 text-wei-emerald-deep transition-colors hover:bg-wei-emerald hover:text-wei-paper"
          >
            + Add debt
          </button>
          <div className="flex items-end gap-3">
            <label htmlFor={`${baseId}-extra`} className={labelClass}>
              Extra per month ($)
            </label>
            <input
              id={`${baseId}-extra`}
              type="number"
              inputMode="decimal"
              min="0"
              step="any"
              value={extra}
              placeholder="0"
              onChange={(e) => setExtra(e.target.value)}
              className={`${inputClass} wei-num w-32`}
            />
          </div>
        </div>
      </div>

      {/* Warning when a minimum cannot cover interest */}
      {neverShrink.length > 0 ? (
        <div
          role="status"
          className="mt-6 rounded-wei-md border border-wei-amber/60 bg-wei-amber/10 px-5 py-4 text-wei-sm text-wei-ink"
        >
          <p className="font-semibold">
            One or more minimum payments are too small to cover the monthly
            interest.
          </p>
          <p className="mt-2 text-wei-ink/80">
            For {listNames(neverShrink)}, the minimum payment does not cover even
            one month of interest at the balance entered, so the balance would
            grow rather than shrink. Raise the minimum payment (or lower the
            balance or APR) to see a payoff comparison.
          </p>
        </div>
      ) : null}

      {/* Results */}
      {avalanche && snowball ? (
        <div className="mt-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <StrategyCard
              title="Avalanche"
              subtitle="Highest interest rate first"
              result={avalanche}
              accent="emerald"
              monthsToText={monthsToText}
            />
            <StrategyCard
              title="Snowball"
              subtitle="Smallest balance first"
              result={snowball}
              accent="amber"
              monthsToText={monthsToText}
            />
          </div>

          {/* Takeaway */}
          <div className="mt-6 border border-wei-line border-l-2 border-l-wei-emerald bg-wei-paper-dim px-5 py-4 text-wei-sm text-wei-ink/85">
            {interestSaved < 1 ? (
              <p>
                With these numbers, both methods cost about the same in interest.
                The snowball method clears whole debts sooner, which some people
                find easier to stay motivated with.
              </p>
            ) : (
              <p>
                With these numbers, the{" "}
                <span className="font-semibold text-wei-ink">
                  {avalancheCheaper ? "avalanche" : "snowball"}
                </span>{" "}
                method pays about{" "}
                <span className="wei-num font-semibold text-wei-emerald-deep">
                  {usd0.format(interestSaved)}
                </span>{" "}
                less in interest. The snowball method may still suit you if
                clearing a whole debt sooner helps you keep going.
              </p>
            )}
          </div>

          <div className="mt-8">
            <PayoffChart
              avalanche={avalanche.balanceSeries}
              snowball={snowball.balanceSeries}
              formatMoney={(n) => usd0.format(n)}
            />
          </div>
        </div>
      ) : neverShrink.length === 0 && debts.length === 0 ? (
        <p className="mt-8 text-wei-sm text-wei-ink/60">
          Add at least one debt with a balance above zero to see the comparison.
        </p>
      ) : null}

      <p className="mt-6 text-wei-xs text-wei-ink/55">
        All amounts shown are illustrative estimates. See the assumptions below.
      </p>
    </div>
  );
}

function listNames(names: string[]): string {
  if (names.length === 1) return `"${names[0]}"`;
  if (names.length === 2) return `"${names[0]}" and "${names[1]}"`;
  return (
    names.slice(0, -1).map((n) => `"${n}"`).join(", ") +
    `, and "${names[names.length - 1]}"`
  );
}

function StrategyCard({
  title,
  subtitle,
  result,
  accent,
  monthsToText,
}: {
  title: string;
  subtitle: string;
  result: StrategyResult;
  accent: "emerald" | "amber";
  monthsToText: (m: number) => string;
}) {
  const accentText =
    accent === "emerald" ? "text-wei-emerald-deep" : "text-wei-amber";
  return (
    <div className="border border-wei-line bg-wei-paper">
      <div className="flex items-baseline justify-between border-b border-wei-line px-5 py-4">
        <div>
          <h3 className="font-wei-display text-wei-xl font-semibold text-wei-ink">
            {title}
          </h3>
          <p className="wei-eyebrow mt-1 text-wei-ink/50">{subtitle}</p>
        </div>
        <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full ${accent === "emerald" ? "bg-wei-emerald" : "bg-wei-amber"}`} />
      </div>

      <div className="wei-hairgrid grid grid-cols-2">
        <Stat label="Time to debt-free" value={monthsToText(result.months)} />
        <Stat
          label="Total interest"
          value={usd0.format(result.totalInterest)}
          accentClass={accentText}
        />
        <Stat label="Total paid" value={usd0.format(result.totalPaid)} />
        <Stat
          label="Debts cleared"
          value={`${result.order.length}`}
        />
      </div>

      <div className="border-t border-wei-line px-5 py-4">
        <p className="wei-eyebrow text-wei-ink/45">Payoff order</p>
        <ol className="mt-3 space-y-2">
          {result.order.map((step, i) => (
            <li
              key={`${step.name}-${i}`}
              className="flex items-baseline justify-between gap-3 text-wei-sm"
            >
              <span className="text-wei-ink">
                <span className="wei-num mr-2 text-wei-ink/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {step.name}
              </span>
              <span className="wei-num shrink-0 text-wei-ink/55">
                month {step.monthCleared}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  accentClass = "text-wei-ink",
}: {
  label: string;
  value: string;
  accentClass?: string;
}) {
  return (
    <div className="px-5 py-4">
      <span className="wei-eyebrow block text-wei-ink/45">{label}</span>
      <span className={`wei-num mt-1.5 block text-wei-lg font-medium ${accentClass}`}>
        {value}
      </span>
    </div>
  );
}
