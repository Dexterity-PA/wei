"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { AnimatedNumber } from "@/components/AnimatedNumber";

/*
  The cost-of-being-unbanked instrument.

  Left side: a few honest inputs for the recurring fees someone without a bank
  account pays (check cashing, prepaid card, money orders). Right side: the
  yearly total compounded forward as savings, so the gap between "fees paid"
  and "money it could have become" is made visceral. All numbers are tabular
  mono. The growth chart mirrors OpportunityGapChart: bordered card, mono
  readouts, inline SVG, gsap draw-in skipped under reduced motion, sr-only
  figcaption, an Illustrative tag.
*/

// Assumed steady annual return for the savings projection. Stated in the UI.
const RETURN_RATE = 0.05;
const HORIZONS = [1, 5, 10];

// Future value of one deposit of `annual` made at the end of each year for
// `years` years, growing at RETURN_RATE (ordinary annuity).
function futureValue(annual: number, years: number) {
  // Ordinary annuity. RETURN_RATE is a fixed positive constant, so no zero-rate
  // branch is needed.
  return annual * ((Math.pow(1 + RETURN_RATE, years) - 1) / RETURN_RATE);
}

const usd0 = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

const usd2 = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

type Field = {
  key: string;
  label: string;
  help: string;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  prefix?: string;
};

const FIELDS: Field[] = [
  {
    key: "checkAmount",
    label: "Checks cashed per month",
    help: "Total dollar value of paychecks or other checks you cash in a typical month.",
    min: 0,
    max: 6000,
    step: 50,
    prefix: "$",
  },
  {
    key: "checkPct",
    label: "Check-cashing fee",
    help: "Percent of each check the store keeps. Commonly about 1 to 5 percent.",
    min: 0,
    max: 8,
    step: 0.25,
    suffix: "%",
  },
  {
    key: "prepaidMonthly",
    label: "Prepaid card monthly fee",
    help: "Flat monthly fee just to keep a prepaid card. Commonly about $4 to $10.",
    min: 0,
    max: 20,
    step: 0.5,
    prefix: "$",
  },
  {
    key: "reloadFee",
    label: "Fee to reload the card",
    help: "Fee charged each time you add cash to a prepaid card. Often a few dollars.",
    min: 0,
    max: 8,
    step: 0.25,
    prefix: "$",
  },
  {
    key: "reloadsPerMonth",
    label: "Reloads per month",
    help: "How many times a month you add money to the card.",
    min: 0,
    max: 12,
    step: 1,
  },
  {
    key: "moneyOrderFee",
    label: "Money-order fee",
    help: "Fee per money order used to pay a bill. Commonly about $1 to $5 each.",
    min: 0,
    max: 8,
    step: 0.25,
    prefix: "$",
  },
  {
    key: "moneyOrdersPerMonth",
    label: "Money orders per month",
    help: "How many bills you pay with money orders in a typical month.",
    min: 0,
    max: 12,
    step: 1,
  },
];

type State = Record<string, number>;

const INITIAL: State = {
  checkAmount: 2400,
  checkPct: 3,
  prepaidMonthly: 7,
  reloadFee: 3,
  reloadsPerMonth: 2,
  moneyOrderFee: 2,
  moneyOrdersPerMonth: 4,
};

export function UnbankedCalculator() {
  const [s, setS] = useState<State>(INITIAL);

  const set = (key: string, value: number) =>
    setS((prev) => ({ ...prev, [key]: value }));

  const monthly = useMemo(() => {
    const checkFee = s.checkAmount * (s.checkPct / 100);
    const prepaid = s.prepaidMonthly + s.reloadFee * s.reloadsPerMonth;
    const moneyOrders = s.moneyOrderFee * s.moneyOrdersPerMonth;
    return {
      checkFee,
      prepaid,
      moneyOrders,
      total: checkFee + prepaid + moneyOrders,
    };
  }, [s]);

  const annual = monthly.total * 12;

  const projections = HORIZONS.map((y) => ({
    years: y,
    saved: annual * y,
    grown: futureValue(annual, y),
  }));

  return (
    <div className="grid gap-x-wei-gutter gap-y-10 lg:grid-cols-12">
      {/* Inputs */}
      <div className="lg:col-span-5">
        <div className="border border-wei-line bg-wei-paper">
          <div className="border-b border-wei-line px-4 py-3">
            <span className="wei-eyebrow text-wei-ink/50">Your fees</span>
          </div>
          <div className="divide-y divide-wei-line">
            {FIELDS.map((f) => (
              <SliderRow
                key={f.key}
                field={f}
                value={s[f.key]}
                onChange={(v) => set(f.key, v)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Outputs */}
      <div className="lg:col-span-7">
        {/* The headline gap */}
        <div className="border border-wei-line bg-wei-ink p-6 text-wei-paper md:p-8">
          <span className="wei-eyebrow text-wei-paper/55">
            What these fees cost in a year
          </span>
          <AnimatedNumber
            value={annual}
            format={usd0}
            as="p"
            className="wei-num mt-3 text-wei-3xl font-semibold leading-none text-wei-amber"
          />
          <p className="mt-3 text-wei-sm text-wei-paper/70">
            About{" "}
            <AnimatedNumber
              value={monthly.total}
              format={usd2}
              className="wei-num text-wei-paper"
            />{" "}
            a month. A free or low-fee bank account would handle these same
            tasks for close to{" "}
            <span className="wei-num text-wei-paper">$0</span>.
          </p>

          <div className="wei-hairgrid wei-hairgrid-ink mt-6 grid grid-cols-1 sm:grid-cols-3">
            <Breakdown
              label="Check cashing"
              value={monthly.checkFee}
              note="per month"
            />
            <Breakdown
              label="Prepaid card"
              value={monthly.prepaid}
              note="per month"
            />
            <Breakdown
              label="Money orders"
              value={monthly.moneyOrders}
              note="per month"
            />
          </div>
        </div>

        {/* Growth framing */}
        <div className="mt-6">
          <GrowthChart annual={annual} projections={projections} />
        </div>
      </div>
    </div>
  );
}

function SliderRow({
  field,
  value,
  onChange,
}: {
  field: Field;
  value: number;
  onChange: (v: number) => void;
}) {
  const id = useId();
  const display =
    field.suffix === "%"
      ? `${value}%`
      : field.prefix === "$"
        ? usd2(value)
        : `${value}`;

  return (
    <div className="px-4 py-4">
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-wei-sm font-medium text-wei-ink">
          {field.label}
        </label>
        <span className="wei-num shrink-0 text-wei-base font-medium text-wei-emerald-deep">
          {display}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={field.min}
        max={field.max}
        step={field.step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full accent-wei-emerald"
        aria-describedby={`${id}-help`}
      />
      <p id={`${id}-help`} className="mt-2 text-wei-xs text-wei-ink/55">
        {field.help}
      </p>
    </div>
  );
}

function Breakdown({
  label,
  value,
  note,
}: {
  label: string;
  value: number;
  note: string;
}) {
  return (
    <div className="px-4 py-3">
      <span className="wei-eyebrow block text-wei-paper/45">{label}</span>
      <AnimatedNumber
        value={value}
        format={usd2}
        className="wei-num mt-2 block text-wei-lg font-medium text-wei-paper"
      />
      <span className="wei-eyebrow mt-1 block text-wei-paper/35">{note}</span>
    </div>
  );
}

/* ---- Growth chart: yearly fees saved vs. what they could grow into ---- */

const W = 540;
const H = 320;
const PAD = { top: 24, right: 16, bottom: 40, left: 56 };
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;

function GrowthChart({
  annual,
  projections,
}: {
  annual: number;
  projections: { years: number; saved: number; grown: number }[];
}) {
  const rootRef = useRef<SVGSVGElement | null>(null);
  const barsRef = useRef<SVGGElement | null>(null);

  const maxYears = 10;
  // Top of the scale: the largest grown value, with headroom, min floor so an
  // empty input still draws a sensible axis.
  const peak = Math.max(futureValue(annual, maxYears), 1);
  const yMax = niceCeil(peak * 1.1);

  const xBase = (yr: number) => PAD.left + (yr / maxYears) * PLOT_W;
  const yPx = (v: number) => PAD.top + (1 - v / yMax) * PLOT_H;

  // Smooth grown curve across the whole span.
  const samples = Array.from({ length: 41 }, (_, i) => (i / 40) * maxYears);
  const grownPath = samples
    .map((t, i) => {
      const x = xBase(t);
      const y = yPx(futureValue(annual, t));
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");

  // Reduced-motion-safe draw-in of the milestone markers.
  useEffect(() => {
    const svg = rootRef.current;
    const bars = barsRef.current;
    if (!svg || !bars) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;
    const ctx = gsap.context(() => {
      gsap.from(bars.children, {
        opacity: 0,
        y: 12,
        duration: 0.5,
        stagger: 0.12,
        ease: "power2.out",
      });
    }, svg);
    return () => ctx.revert();
  }, [annual, yMax]);

  const ticks = [0, 0.25, 0.5, 0.75, 1];

  return (
    <figure className="m-0">
      <div className="border border-wei-line bg-wei-paper">
        <div className="flex items-stretch justify-between border-b border-wei-line">
          <div className="px-4 py-3">
            <span className="wei-eyebrow text-wei-ink/50">
              If saved instead, at ~5% a year
            </span>
          </div>
        </div>

        <svg
          ref={rootRef}
          viewBox={`0 0 ${W} ${H}`}
          className="block w-full"
          role="img"
          aria-label="Chart showing the yearly fee total saved and compounded at about five percent a year over ten years."
        >
          {/* gridlines + y labels */}
          {ticks.map((f) => {
            const gy = PAD.top + f * PLOT_H;
            const val = yMax * (1 - f);
            return (
              <g key={f}>
                <line
                  x1={PAD.left}
                  x2={W - PAD.right}
                  y1={gy}
                  y2={gy}
                  stroke="var(--color-wei-line)"
                  strokeWidth={1}
                  opacity={0.6}
                />
                <text
                  x={PAD.left - 8}
                  y={gy + 4}
                  textAnchor="end"
                  className="wei-num"
                  fontSize={11}
                  fill="var(--color-wei-ink)"
                  fillOpacity={0.5}
                >
                  {usd0(val)}
                </text>
              </g>
            );
          })}

          {/* grown curve */}
          <path
            d={grownPath}
            fill="none"
            stroke="var(--color-wei-emerald)"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* milestone markers at 1 / 5 / 10 years */}
          <g ref={barsRef}>
            {projections.map((p) => {
              const x = xBase(p.years);
              const y = yPx(p.grown);
              return (
                <g key={p.years}>
                  <line
                    x1={x}
                    x2={x}
                    y1={y}
                    y2={H - PAD.bottom}
                    stroke="var(--color-wei-ink)"
                    strokeOpacity={0.2}
                    strokeWidth={1}
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r={5}
                    fill="var(--color-wei-emerald)"
                  />
                  <text
                    x={x}
                    y={y - 12}
                    textAnchor={p.years === maxYears ? "end" : "middle"}
                    className="wei-num"
                    fontSize={13}
                    fontWeight={600}
                    fill="var(--color-wei-emerald-deep)"
                  >
                    {usd0(p.grown)}
                  </text>
                </g>
              );
            })}
          </g>

          {/* x ticks */}
          {[0, 5, 10].map((t) => (
            <text
              key={t}
              x={xBase(t)}
              y={H - PAD.bottom + 22}
              textAnchor="middle"
              className="wei-num"
              fontSize={12}
              fill="var(--color-wei-ink)"
              fillOpacity={0.5}
            >
              {t === 0 ? "YR 0" : `YR ${t}`}
            </text>
          ))}
        </svg>

        {/* readout row: the three horizons */}
        <div className="wei-hairgrid grid grid-cols-3 border-t border-wei-line">
          {projections.map((p) => (
            <div key={p.years} className="px-4 py-3">
              <span className="wei-eyebrow block text-wei-ink/45">
                {p.years} {p.years === 1 ? "year" : "years"}
              </span>
              <AnimatedNumber
                value={p.grown}
                format={usd0}
                className="wei-num mt-1 block text-wei-base font-medium text-wei-ink"
              />
              <span className="wei-eyebrow mt-1 block text-wei-ink/35">
                paid in {usd0(p.saved)}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-wei-line px-4 py-3">
          <span className="inline-flex items-center gap-2">
            <span aria-hidden className="h-0.5 w-6 bg-wei-emerald" />
            <span className="wei-eyebrow text-wei-ink/60">
              Fees, saved and grown
            </span>
          </span>
          <span className="wei-eyebrow ml-auto text-wei-ink/40">
            Illustrative
          </span>
        </div>
      </div>

      <figcaption className="sr-only">
        A line chart projecting the yearly fee total of {usd0(annual)} as if it
        were saved each year and grew at about five percent a year. After one
        year it is about {usd0(projections[0].grown)}, after five years about{" "}
        {usd0(projections[1].grown)}, and after ten years about{" "}
        {usd0(projections[2].grown)}. This is an illustration of scale, not a
        prediction.
      </figcaption>
    </figure>
  );
}

// Round a number up to a clean axis top (1/2/2.5/5 times a power of ten).
function niceCeil(n: number) {
  if (n <= 0) return 1;
  const pow = Math.pow(10, Math.floor(Math.log10(n)));
  const frac = n / pow;
  const nice = frac <= 1 ? 1 : frac <= 2 ? 2 : frac <= 2.5 ? 2.5 : frac <= 5 ? 5 : 10;
  return nice * pow;
}
