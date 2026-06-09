"use client";

import { useId, useMemo, useState } from "react";

/*
  Savings goal planner.

  You enter a target amount and what you have saved now, then choose what to
  solve for:

    Mode "months": you give a monthly contribution; the tool finds how many
    months it takes to reach the goal.
    Mode "monthly": you give a number of months (a target date); the tool finds
    the monthly contribution needed.

  Optional simple growth (an annual rate compounded monthly) can be turned on.
  Kept honest: it is modeled the same way as the compound interest tool, the
  same monthly compounding, and it is off by default so the plain case is clear.

  Formulas (i = annualRate/100/12, need = target - current):
    No growth, solve months:   months = ceil(need / monthly)
    No growth, solve monthly:  monthly = need / months
    With growth, solve months: months = ceil( ln((target + monthly/i)/(current + monthly/i)) / ln(1+i) )
    With growth, solve monthly: monthly = (target - current*(1+i)^months) / (((1+i)^months - 1)/i)

  Verified against an iterative month-by-month loop before shipping.
*/

type Mode = "months" | "monthly";

const usd = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

const usdCents = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

function monthsLabel(months: number): string {
  if (!Number.isFinite(months)) return "Never at this rate";
  const yrs = Math.floor(months / 12);
  const rem = months % 12;
  const parts: string[] = [];
  if (yrs > 0) parts.push(`${yrs} yr`);
  if (rem > 0 || yrs === 0) parts.push(`${rem} mo`);
  return parts.join(" ");
}

function solveMonths(
  target: number,
  current: number,
  monthly: number,
  annualRate: number,
): number {
  const need = target - current;
  if (need <= 0) return 0;
  if (monthly <= 0) return Infinity;
  const i = annualRate / 100 / 12;
  if (i === 0) return Math.ceil(need / monthly);
  const num = target + monthly / i;
  const den = current + monthly / i;
  if (num <= 0 || den <= 0) return Infinity;
  const n = Math.log(num / den) / Math.log(1 + i);
  if (!Number.isFinite(n) || n < 0) return Infinity;
  return Math.ceil(n);
}

function solveMonthly(
  target: number,
  current: number,
  months: number,
  annualRate: number,
): number {
  const need = target - current;
  if (need <= 0) return 0;
  if (months <= 0) return Infinity;
  const i = annualRate / 100 / 12;
  if (i === 0) return need / months;
  const g = Math.pow(1 + i, months);
  return (target - current * g) / ((g - 1) / i);
}

export function SavingsGoalPlanner() {
  const [target, setTarget] = useState(1500);
  const [current, setCurrent] = useState(300);
  const [mode, setMode] = useState<Mode>("months");
  const [monthly, setMonthly] = useState(100);
  const [months, setMonths] = useState(12);
  const [useGrowth, setUseGrowth] = useState(false);
  const [rate, setRate] = useState(4);

  const effectiveRate = useGrowth ? rate : 0;
  const need = Math.max(0, target - current);
  const alreadyMet = current >= target;

  const solvedMonths = useMemo(
    () => solveMonths(target, current, monthly, effectiveRate),
    [target, current, monthly, effectiveRate],
  );
  const solvedMonthly = useMemo(
    () => solveMonthly(target, current, months, effectiveRate),
    [target, current, months, effectiveRate],
  );

  // Progress toward the goal from what is already saved.
  const progress =
    target > 0 ? Math.min(100, (current / target) * 100) : 0;

  const unreachable = mode === "months" && !Number.isFinite(solvedMonths);
  // A negative required monthly means current savings already grow to the goal.
  const monthlyNotNeeded = mode === "monthly" && solvedMonthly <= 0;

  return (
    <div className="grid gap-x-wei-gutter gap-y-10 lg:grid-cols-12">
      {/* Inputs */}
      <form
        className="lg:col-span-5"
        onSubmit={(e) => e.preventDefault()}
        aria-label="Savings goal inputs"
      >
        <div className="wei-hairgrid grid grid-cols-1 sm:grid-cols-2">
          <NumberField
            label="Goal amount"
            prefix="$"
            value={target}
            min={0}
            max={10_000_000}
            step={50}
            onChange={setTarget}
          />
          <NumberField
            label="Saved so far"
            prefix="$"
            value={current}
            min={0}
            max={10_000_000}
            step={50}
            onChange={setCurrent}
          />
        </div>

        {/* Solve-for toggle */}
        <fieldset className="mt-8">
          <legend className="wei-eyebrow text-wei-ink/55">Solve for</legend>
          <div
            role="group"
            className="mt-3 inline-flex rounded-wei-sm border border-wei-line"
          >
            {(
              [
                ["months", "Time to goal"],
                ["monthly", "Monthly needed"],
              ] as const
            ).map(([m, label]) => (
              <button
                key={m}
                type="button"
                aria-pressed={mode === m}
                onClick={() => setMode(m)}
                className={`wei-eyebrow px-4 py-2.5 transition-colors ${
                  mode === m
                    ? "bg-wei-ink text-wei-paper"
                    : "text-wei-ink/55 hover:bg-wei-paper-dim"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </fieldset>

        {/* The input for the side you are NOT solving for. */}
        <div className="mt-6 wei-hairgrid grid grid-cols-1">
          {mode === "months" ? (
            <NumberField
              label="You can save each month"
              prefix="$"
              value={monthly}
              min={0}
              max={1_000_000}
              step={10}
              onChange={setMonthly}
              hint="The tool finds how long it takes to reach your goal."
            />
          ) : (
            <NumberField
              label="Reach it in"
              suffix="mo"
              value={months}
              min={1}
              max={1200}
              step={1}
              onChange={(v) => setMonths(Math.max(1, Math.round(v)))}
              hint="The tool finds the monthly amount that gets you there."
            />
          )}
        </div>

        {/* Optional simple growth */}
        <div className="mt-6 rounded-wei-md border border-wei-line bg-wei-paper px-4 py-4">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={useGrowth}
              onChange={(e) => setUseGrowth(e.target.checked)}
              className="h-4 w-4 accent-wei-emerald-deep"
            />
            <span className="wei-eyebrow text-wei-ink/70">
              Add interest on savings
            </span>
          </label>
          {useGrowth ? (
            <div className="mt-4 flex items-baseline gap-1.5">
              <span className="wei-eyebrow mr-2 text-wei-ink/45">
                Annual rate
              </span>
              <input
                type="number"
                inputMode="decimal"
                min={0}
                max={20}
                step={0.25}
                value={rate}
                onChange={(e) => {
                  const raw = e.target.valueAsNumber;
                  setRate(Number.isNaN(raw) ? 0 : Math.min(20, Math.max(0, raw)));
                }}
                className="wei-num w-20 bg-transparent text-wei-lg font-medium text-wei-ink outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <span className="wei-num text-wei-base text-wei-ink/45">%</span>
            </div>
          ) : (
            <p className="mt-2 text-wei-xs text-wei-ink/55">
              Leave off for a plain plan. Turn on to model a steady yearly rate,
              compounded monthly.
            </p>
          )}
        </div>
      </form>

      {/* Result + progress */}
      <div className="lg:col-span-7">
        <div className="border border-wei-line bg-wei-paper">
          <div className="border-b border-wei-line px-4 py-3">
            <span className="wei-eyebrow text-wei-ink/50">Your plan</span>
          </div>

          {/* Headline result */}
          <div className="px-5 py-6 sm:px-6">
            {alreadyMet ? (
              <Result
                label="Goal reached"
                value="Done"
                note={`You already have ${usd(current)}, which meets your ${usd(
                  target,
                )} goal.`}
              />
            ) : mode === "months" ? (
              unreachable ? (
                <Result
                  label="Time to goal"
                  value="Out of reach"
                  tone="warn"
                  note="At this monthly amount the goal is not reached. Raise what you save each month."
                />
              ) : (
                <Result
                  label="Time to goal"
                  value={monthsLabel(solvedMonths)}
                  note={`Saving ${usd(monthly)} a month${
                    useGrowth ? ` at ${rate}% a year` : ""
                  }, that is ${solvedMonths} ${
                    solvedMonths === 1 ? "month" : "months"
                  } from now.`}
                />
              )
            ) : monthlyNotNeeded ? (
              <Result
                label="Monthly needed"
                value={usd(0)}
                tone="good"
                note="Your current savings already grow to the goal in that time. No new contributions required."
              />
            ) : (
              <Result
                label="Monthly needed"
                value={usdCents(solvedMonthly)}
                note={`Save this each month for ${months} ${
                  months === 1 ? "month" : "months"
                }${useGrowth ? ` at ${rate}% a year` : ""} to reach ${usd(
                  target,
                )}.`}
              />
            )}
          </div>

          {/* Progress visual */}
          <div className="border-t border-wei-line px-5 py-6 sm:px-6">
            <div className="flex items-baseline justify-between">
              <span className="wei-eyebrow text-wei-ink/50">
                Saved so far
              </span>
              <span className="wei-num text-wei-sm text-wei-ink/60">
                {usd(current)} of {usd(target)}
              </span>
            </div>
            <div
              className="mt-3 h-7 w-full overflow-hidden rounded-wei-sm bg-wei-paper-dim"
              role="img"
              aria-label={`Progress bar: ${usd(current)} saved of a ${usd(
                target,
              )} goal, about ${Math.round(progress)} percent.`}
            >
              <div
                className="flex h-full items-center bg-wei-emerald transition-[width] duration-500 ease-wei-out motion-reduce:transition-none"
                style={{ width: `${progress}%` }}
              >
                {progress >= 18 ? (
                  <span className="wei-num px-2 text-wei-xs font-medium text-wei-paper">
                    {Math.round(progress)}%
                  </span>
                ) : null}
              </div>
            </div>
            <div className="mt-3 wei-hairgrid grid grid-cols-3">
              <MiniStat label="Goal" value={usd(target)} />
              <MiniStat label="Saved" value={usd(current)} />
              <MiniStat
                label="Still to go"
                value={usd(need)}
                accent={need > 0}
              />
            </div>
          </div>
        </div>

        <p className="mt-3 wei-eyebrow text-right text-wei-ink/40">
          Illustrative estimate
        </p>
      </div>
    </div>
  );
}

function Result({
  label,
  value,
  note,
  tone = "default",
}: {
  label: string;
  value: string;
  note: string;
  tone?: "default" | "warn" | "good";
}) {
  const valueColor =
    tone === "warn"
      ? "text-wei-amber"
      : tone === "good"
        ? "text-wei-emerald-deep"
        : "text-wei-ink";
  return (
    <div>
      <span className="wei-eyebrow block text-wei-ink/50">{label}</span>
      <p
        className={`wei-num mt-2 text-wei-3xl font-medium ${valueColor}`}
      >
        {value}
      </p>
      <p className="mt-3 max-w-md text-wei-sm text-wei-ink/65">{note}</p>
    </div>
  );
}

function MiniStat({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="bg-wei-paper px-3 py-3">
      <span className="wei-eyebrow block text-wei-ink/45">{label}</span>
      <span
        className={`wei-num mt-1.5 block text-wei-lg font-medium ${
          accent ? "text-wei-emerald-deep" : "text-wei-ink"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
  min,
  max,
  step,
  prefix,
  suffix,
  hint,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
  hint?: string;
}) {
  const fieldId = useId();
  const hintId = `${fieldId}-hint`;
  return (
    <div className="bg-wei-paper px-4 py-4">
      <label htmlFor={fieldId} className="wei-eyebrow block text-wei-ink/55">
        {label}
      </label>
      <div className="mt-2 flex items-baseline gap-1.5">
        {prefix ? (
          <span className="wei-num text-wei-lg text-wei-ink/45">{prefix}</span>
        ) : null}
        <input
          id={fieldId}
          type="number"
          inputMode="decimal"
          value={Number.isFinite(value) ? value : ""}
          min={min}
          max={max}
          step={step}
          aria-describedby={hint ? hintId : undefined}
          onChange={(event) => {
            const raw = event.target.valueAsNumber;
            if (Number.isNaN(raw)) {
              onChange(0);
              return;
            }
            onChange(Math.min(max, Math.max(min, raw)));
          }}
          className="wei-num w-full min-w-0 bg-transparent text-wei-2xl font-medium text-wei-ink outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        {suffix ? (
          <span className="wei-num text-wei-lg text-wei-ink/45">{suffix}</span>
        ) : null}
      </div>
      {hint ? (
        <p id={hintId} className="mt-2 text-wei-xs text-wei-ink/55">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
