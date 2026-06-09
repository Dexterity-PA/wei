"use client";

import { useId, useMemo, useState } from "react";
import {
  computePaycheck,
  PAY_FREQUENCY_LABELS,
  STATE_OPTIONS,
  TAX_YEAR,
  standardDeduction,
  type FilingStatus,
  type PayFrequency,
} from "./taxes";
import { BreakdownBar, type Segment } from "./BreakdownBar";
import { AnimatedNumber } from "@/components/AnimatedNumber";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const usd0 = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function num(s: string): number {
  const n = parseFloat(s);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

const labelClass = "block text-wei-sm font-semibold text-wei-ink";
const inputClass =
  "mt-2 block w-full rounded-wei-sm border border-wei-line bg-wei-paper px-4 py-3 text-wei-base text-wei-ink outline-none transition-colors placeholder:text-wei-ink/30 focus-visible:border-wei-emerald-deep";

export function PaycheckTool() {
  const baseId = useId();
  const [grossInput, setGrossInput] = useState("2500");
  const [frequency, setFrequency] = useState<PayFrequency>("biweekly");
  const [status, setStatus] = useState<FilingStatus>("single");
  const [stateCode, setStateCode] = useState("flat-mid");

  const stateOption =
    STATE_OPTIONS.find((s) => s.code === stateCode) ?? STATE_OPTIONS[0];

  const result = useMemo(
    () =>
      computePaycheck({
        perPeriodGross: num(grossInput),
        frequency,
        status,
        stateRate: stateOption.flatRate,
      }),
    [grossInput, frequency, status, stateOption.flatRate],
  );

  const segments: Segment[] = [
    {
      key: "take-home",
      label: "Take-home",
      value: result.perPeriodTakeHome,
      fill: "var(--color-wei-emerald)",
    },
    {
      key: "federal",
      label: "Federal",
      value: result.perPeriodFederal,
      fill: "var(--color-wei-ink)",
    },
    {
      key: "ss",
      label: "Social Security",
      value: result.perPeriodSocialSecurity,
      fill: "var(--color-wei-amber)",
    },
    {
      key: "medicare",
      label: "Medicare",
      value: result.perPeriodMedicare,
      fill: "color-mix(in srgb, var(--color-wei-amber) 55%, var(--color-wei-paper))",
    },
    {
      key: "state",
      label: "State",
      value: result.perPeriodState,
      fill: "color-mix(in srgb, var(--color-wei-ink) 55%, var(--color-wei-paper))",
    },
  ];

  return (
    <div>
      <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
        {/* Inputs */}
        <div className="lg:col-span-5">
          <div className="border border-wei-line bg-wei-paper p-5 sm:p-6">
            <span className="wei-eyebrow text-wei-ink/50">Your pay</span>

            <div className="mt-5 space-y-5">
              <div>
                <label htmlFor={`${baseId}-gross`} className={labelClass}>
                  Gross pay each paycheck ($)
                </label>
                <input
                  id={`${baseId}-gross`}
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  value={grossInput}
                  placeholder="0"
                  onChange={(e) => setGrossInput(e.target.value)}
                  className={`${inputClass} wei-num`}
                />
                <p className="mt-2 text-wei-xs text-wei-ink/55">
                  Pay before any taxes are taken out, for one paycheck.
                </p>
              </div>

              <div>
                <label htmlFor={`${baseId}-freq`} className={labelClass}>
                  How often you are paid
                </label>
                <select
                  id={`${baseId}-freq`}
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value as PayFrequency)}
                  className={inputClass}
                >
                  {(Object.keys(PAY_FREQUENCY_LABELS) as PayFrequency[]).map(
                    (f) => (
                      <option key={f} value={f}>
                        {PAY_FREQUENCY_LABELS[f]}
                      </option>
                    ),
                  )}
                </select>
              </div>

              <div>
                <label htmlFor={`${baseId}-status`} className={labelClass}>
                  Filing status
                </label>
                <select
                  id={`${baseId}-status`}
                  value={status}
                  onChange={(e) => setStatus(e.target.value as FilingStatus)}
                  className={inputClass}
                >
                  <option value="single">Single</option>
                  <option value="mfj">Married filing jointly</option>
                </select>
              </div>

              <div>
                <label htmlFor={`${baseId}-state`} className={labelClass}>
                  State tax (simplified)
                </label>
                <select
                  id={`${baseId}-state`}
                  value={stateCode}
                  onChange={(e) => setStateCode(e.target.value)}
                  className={inputClass}
                >
                  {STATE_OPTIONS.map((s) => (
                    <option key={s.code} value={s.code}>
                      {s.label}
                    </option>
                  ))}
                </select>
                <p className="mt-2 text-wei-xs text-wei-ink/55">
                  {stateOption.note ??
                    "A flat rate stand-in. Most states use brackets and deductions this does not model."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Headline result */}
        <div className="lg:col-span-7">
          <div className="border border-wei-line bg-wei-ink p-6 text-wei-paper sm:p-8">
            <span className="wei-eyebrow text-wei-paper/60">
              Estimated take-home per paycheck
            </span>
            <AnimatedNumber
              as="p"
              className="wei-num mt-3 text-wei-3xl font-semibold text-wei-paper"
              value={result.perPeriodTakeHome}
              format={(n) => usd.format(n)}
            />
            <p className="mt-2 text-wei-sm text-wei-paper/70">
              From{" "}
              <AnimatedNumber
                value={result.perPeriodGross}
                format={(n) => usd.format(n)}
              />{" "}
              gross. That is about{" "}
              <AnimatedNumber
                className="wei-num"
                value={result.annualTakeHome}
                format={(n) => usd0.format(n)}
              />{" "}
              a year after an estimated{" "}
              <span className="wei-num">
                <AnimatedNumber
                  value={result.effectiveRate * 100}
                  format={(n) => `${Math.round(n)}`}
                />
                %
              </span>{" "}
              in taxes.
            </p>

            <div className="wei-hairgrid wei-hairgrid-ink mt-6 grid grid-cols-2">
              <DarkStat
                label="Annual gross"
                value={result.annualGross}
                format={(n) => usd0.format(n)}
              />
              <DarkStat
                label="Annual take-home"
                value={result.annualTakeHome}
                format={(n) => usd0.format(n)}
                accent
              />
            </div>
          </div>

          <div className="mt-6">
            <BreakdownBar
              segments={segments}
              total={result.perPeriodGross}
              formatMoney={(n) => usd.format(n)}
            />
          </div>
        </div>
      </div>

      {/* Line-by-line table */}
      <div className="mt-8 border border-wei-line bg-wei-paper">
        <div className="flex items-center justify-between border-b border-wei-line px-4 py-3">
          <span className="wei-eyebrow text-wei-ink/50">Each line, explained</span>
          <span className="wei-eyebrow text-wei-ink/40">Per paycheck</span>
        </div>
        <div className="divide-y divide-wei-line">
          <LineRow
            name="Federal income tax"
            amount={result.perPeriodFederal}
            format={(n) => usd.format(n)}
            explain={`Tax on your income after the ${TAX_YEAR} standard deduction of ${usd0.format(
              standardDeduction(status),
            )}. Simplified ${TAX_YEAR} brackets are used; your real withholding depends on your W-4 and more.`}
          />
          <LineRow
            name="Social Security"
            amount={result.perPeriodSocialSecurity}
            format={(n) => usd.format(n)}
            explain={`6.2% of pay, up to a yearly wage cap (${usd0.format(
              168600,
            )} for ${TAX_YEAR}). It funds Social Security retirement and disability benefits.`}
          />
          <LineRow
            name="Medicare"
            amount={result.perPeriodMedicare}
            format={(n) => usd.format(n)}
            explain="1.45% of all pay, with no wage cap. It funds Medicare health coverage. (A small extra Medicare tax can apply to high earners and is not included here.)"
          />
          <LineRow
            name="State income tax"
            amount={result.perPeriodState}
            format={(n) => usd.format(n)}
            explain={`A simplified flat ${Math.round(
              stateOption.flatRate * 100,
            )}% stand-in. Real state taxes vary widely and many use brackets and deductions.`}
          />
          <div className="flex items-baseline justify-between gap-4 bg-wei-paper-dim px-4 py-4">
            <span className="font-semibold text-wei-ink">Take-home pay</span>
            <AnimatedNumber
              className="wei-num text-wei-lg font-medium text-wei-emerald-deep"
              value={result.perPeriodTakeHome}
              format={(n) => usd.format(n)}
            />
          </div>
        </div>
      </div>

      <p className="mt-6 text-wei-xs text-wei-ink/55">
        This is an estimate for learning, not tax filing or a guarantee of your
        real paycheck. See the assumptions below.
      </p>
    </div>
  );
}

function DarkStat({
  label,
  value,
  format,
  accent = false,
}: {
  label: string;
  value: number;
  format: (n: number) => string;
  accent?: boolean;
}) {
  return (
    <div className="px-5 py-4">
      <span className="wei-eyebrow block text-wei-paper/55">{label}</span>
      <AnimatedNumber
        className={`wei-num mt-1.5 block text-wei-lg font-medium ${
          accent ? "text-wei-emerald" : "text-wei-paper"
        }`}
        value={value}
        format={format}
      />
    </div>
  );
}

function LineRow({
  name,
  amount,
  format,
  explain,
}: {
  name: string;
  amount: number;
  format: (n: number) => string;
  explain: string;
}) {
  return (
    <div className="px-4 py-4">
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-semibold text-wei-ink">{name}</span>
        <AnimatedNumber
          className="wei-num shrink-0 text-wei-base text-wei-ink"
          value={amount}
          format={format}
        />
      </div>
      <p className="mt-1.5 text-wei-sm text-wei-ink/65">{explain}</p>
    </div>
  );
}
