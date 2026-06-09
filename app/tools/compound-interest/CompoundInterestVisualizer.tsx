"use client";

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { AnimatedNumber } from "@/components/AnimatedNumber";

/*
  Compound interest visualizer.

  Inputs: starting principal, monthly contribution, annual rate %, years.
  Math: monthly compounding (12 periods per year). The balance after n months is
  the future value of a lump sum plus the future value of a series of equal
  deposits made at the end of each month.

    i = annualRate / 100 / 12      (monthly rate)
    n = years * 12                 (number of months)
    balance(n) = P * (1 + i)^n + PMT * ((1 + i)^n - 1) / i

  When i = 0 the series collapses to simple addition: P + PMT * n.

  The chart mirrors the home OpportunityGapChart: a bordered card, a mono readout
  header, an inline SVG with gridlines and axis ticks, a gsap draw-in skipped
  under reduced motion, an sr-only figcaption, and an "Illustrative" legend tag.
  It shows the running balance as a stacked band: the lower band is the money you
  put in (contributions) and the upper band is the growth on top of it.
*/

// Plot geometry (unitless SVG user space). Mirrors the hero chart proportions.
const W = 560;
const H = 360;
const PAD = { top: 20, right: 16, bottom: 40, left: 56 };
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;

type Point = { x: number; y: number };

function balanceAt(
  principal: number,
  monthly: number,
  annualRate: number,
  months: number,
): number {
  const i = annualRate / 100 / 12;
  if (i === 0) return principal + monthly * months;
  const g = Math.pow(1 + i, months);
  return principal * g + monthly * ((g - 1) / i);
}

function contributedAt(
  principal: number,
  monthly: number,
  months: number,
): number {
  return principal + monthly * months;
}

const usd = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

const usdCents = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const toLine = (pts: Point[]) =>
  pts
    .map((p, idx) => `${idx === 0 ? "M" : "L"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");

function niceCeil(value: number): number {
  // Round a max value up to a clean axis bound (1, 2, 2.5, 5 x 10^k).
  if (value <= 0) return 1;
  const pow = Math.pow(10, Math.floor(Math.log10(value)));
  const frac = value / pow;
  let nice: number;
  if (frac <= 1) nice = 1;
  else if (frac <= 2) nice = 2;
  else if (frac <= 2.5) nice = 2.5;
  else if (frac <= 5) nice = 5;
  else nice = 10;
  return nice * pow;
}

export function CompoundInterestVisualizer() {
  const id = useId();
  const svgRef = useRef<SVGSVGElement | null>(null);
  const balanceLineRef = useRef<SVGPathElement | null>(null);

  const [principal, setPrincipal] = useState(500);
  const [monthly, setMonthly] = useState(150);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(10);

  const totalMonths = Math.max(1, Math.round(years * 12));

  // Sample once per year for the plot points (year 0 through `years`).
  const series = useMemo(() => {
    const steps = Math.max(1, Math.round(years));
    const pts: {
      month: number;
      balance: number;
      contributed: number;
    }[] = [];
    for (let s = 0; s <= steps; s++) {
      const month = Math.round((s / steps) * totalMonths);
      pts.push({
        month,
        balance: balanceAt(principal, monthly, rate, month),
        contributed: contributedAt(principal, monthly, month),
      });
    }
    return pts;
  }, [principal, monthly, rate, years, totalMonths]);

  const finalBalance = balanceAt(principal, monthly, rate, totalMonths);
  const totalContributed = contributedAt(principal, monthly, totalMonths);
  const interestEarned = Math.max(0, finalBalance - totalContributed);

  const yMax = niceCeil(finalBalance);

  const xPx = (month: number) => PAD.left + (month / totalMonths) * PLOT_W;
  const yPx = (value: number) =>
    PAD.top + (1 - value / yMax) * PLOT_H;

  const balancePts = series.map((d) => ({ x: xPx(d.month), y: yPx(d.balance) }));
  const contribPts = series.map((d) => ({
    x: xPx(d.month),
    y: yPx(d.contributed),
  }));

  const balancePath = toLine(balancePts);
  const contribPath = toLine(contribPts);

  // Growth band: forward along the balance line, back along the contributed line.
  const baselineY = yPx(0);
  const growthBand = `${balancePath} ${contribPts
    .slice()
    .reverse()
    .map((p) => `L${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ")} Z`;
  // Contributions band: from the contributed line down to the baseline.
  const contribBand = `${contribPath} L${xPx(totalMonths).toFixed(1)} ${baselineY.toFixed(
    1,
  )} L${PAD.left.toFixed(1)} ${baselineY.toFixed(1)} Z`;

  // Y axis ticks at 0, 50%, 100% of the axis bound.
  const yTicks = [0, 0.5, 1].map((f) => ({ f, value: yMax * f }));
  const xTicks = useMemo(() => {
    const steps = Math.max(1, Math.round(years));
    const out: { month: number; label: string }[] = [];
    const tickYears =
      steps <= 6 ? steps : steps <= 12 ? Math.round(steps / 2) : 5;
    for (let k = 0; k <= tickYears; k++) {
      const yr = Math.round((k / tickYears) * steps);
      out.push({ month: yr * 12, label: `${yr}` });
    }
    // De-duplicate months that round to the same year.
    return out.filter(
      (t, idx, arr) => arr.findIndex((o) => o.month === t.month) === idx,
    );
  }, [years]);

  // Draw-in on mount, re-run when inputs change. Reduced-motion safe: the path
  // is already rendered, so skipping the tween leaves the finished curve.
  useEffect(() => {
    const line = balanceLineRef.current;
    const svg = svgRef.current;
    if (!line || !svg) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const length = line.getTotalLength();
      gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
      gsap.set(`#${CSS.escape(id)}-bands`, { opacity: 0 });
      gsap
        .timeline({ defaults: { ease: "power2.out" } })
        .to(line, { strokeDashoffset: 0, duration: 1.1 })
        .to(`#${CSS.escape(id)}-bands`, { opacity: 1, duration: 0.6 }, 0.2);
    }, svg);
    return () => ctx.revert();
  }, [id, balancePath]);

  return (
    <div className="grid gap-x-wei-gutter gap-y-10 lg:grid-cols-12">
      {/* Inputs */}
      <form
        className="lg:col-span-5"
        onSubmit={(event) => event.preventDefault()}
        aria-label="Compound interest inputs"
      >
        <div className="wei-hairgrid grid grid-cols-1">
          <NumberField
            label="Starting amount"
            prefix="$"
            value={principal}
            min={0}
            max={1_000_000}
            step={50}
            onChange={setPrincipal}
            hint="What you start with today."
          />
          <NumberField
            label="Monthly contribution"
            prefix="$"
            value={monthly}
            min={0}
            max={100_000}
            step={25}
            onChange={setMonthly}
            hint="Added at the end of each month."
          />
          <NumberField
            label="Annual rate"
            suffix="%"
            value={rate}
            min={0}
            max={30}
            step={0.5}
            onChange={setRate}
            hint="The yearly growth rate you want to model."
          />
          <NumberField
            label="Years"
            suffix="yr"
            value={years}
            min={1}
            max={50}
            step={1}
            onChange={(v) => setYears(Math.max(1, Math.round(v)))}
            hint="How long the money keeps growing."
          />
        </div>

        {/* Outputs */}
        <dl className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-wei-md border border-wei-line bg-wei-line">
          <Stat
            label="Final balance"
            value={finalBalance}
            format={usdCents}
            accent
          />
          <div className="grid grid-cols-2 gap-px bg-wei-line">
            <Stat label="You put in" value={totalContributed} format={usd} small />
            <Stat label="Growth earned" value={interestEarned} format={usd} small />
          </div>
        </dl>
      </form>

      {/* Chart */}
      <div className="lg:col-span-7">
        <figure className="m-0">
          <div className="border border-wei-line bg-wei-paper">
            <div className="flex flex-wrap items-stretch justify-between border-b border-wei-line">
              <div className="px-4 py-3">
                <span className="wei-eyebrow text-wei-ink/50">
                  Balance over time
                </span>
              </div>
              <div className="flex divide-x divide-wei-line border-l border-wei-line">
                <Readout label="Years" value={`${Math.round(years)}`} />
                <Readout label="Balance" value={usd(finalBalance)} accent />
              </div>
            </div>

            <svg
              ref={svgRef}
              viewBox={`0 0 ${W} ${H}`}
              className="block w-full"
              role="img"
              aria-label={`Area chart of a starting amount of ${usd(
                principal,
              )} plus ${usd(
                monthly,
              )} added each month, growing at ${rate} percent a year for ${Math.round(
                years,
              )} years to about ${usd(finalBalance)}.`}
            >
              {/* Horizontal gridlines + y tick labels */}
              {yTicks.map((t) => {
                const gy = yPx(t.value);
                return (
                  <g key={t.f}>
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
                      {usd(t.value)}
                    </text>
                  </g>
                );
              })}

              {/* Bands fade in after the line draws. */}
              <g id={`${id}-bands`}>
                <path
                  d={contribBand}
                  fill="var(--color-wei-ink)"
                  opacity={0.08}
                />
                <path
                  d={growthBand}
                  fill="var(--color-wei-emerald)"
                  opacity={0.16}
                />
                {/* Contributions boundary line */}
                <path
                  d={contribPath}
                  fill="none"
                  stroke="var(--color-wei-ink)"
                  strokeOpacity={0.35}
                  strokeWidth={1.5}
                  strokeDasharray="2 4"
                  strokeLinecap="round"
                />
              </g>

              {/* Balance line draws in on mount. */}
              <path
                ref={balanceLineRef}
                d={balancePath}
                fill="none"
                stroke="var(--color-wei-emerald)"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* End marker */}
              <circle
                cx={xPx(totalMonths)}
                cy={yPx(finalBalance)}
                r={4.5}
                fill="var(--color-wei-emerald)"
              />

              {/* X axis ticks */}
              {xTicks.map((t) => (
                <text
                  key={t.month}
                  x={xPx(t.month)}
                  y={H - PAD.bottom + 22}
                  textAnchor="middle"
                  className="wei-num"
                  fontSize={11}
                  fill="var(--color-wei-ink)"
                  fillOpacity={0.5}
                >
                  {t.month === 0 ? "YR 0" : `YR ${t.label}`}
                </text>
              ))}
            </svg>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-wei-line px-4 py-3">
              <LegendItem swatch="emerald" label="Total balance" />
              <LegendItem swatch="dashed" label="What you put in" />
              <span className="wei-eyebrow ml-auto text-wei-ink/40">
                Illustrative
              </span>
            </div>
          </div>

          <figcaption className="sr-only">
            An area chart showing a starting amount of {usd(principal)} with{" "}
            {usd(monthly)} added each month, modeled at {rate} percent a year
            compounded monthly. After {Math.round(years)} years the balance is
            about {usd(finalBalance)}, of which {usd(totalContributed)} is money
            you put in and {usd(interestEarned)} is growth on top of it.
          </figcaption>
        </figure>
      </div>
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
      <label
        htmlFor={fieldId}
        className="wei-eyebrow block text-wei-ink/55"
      >
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

function Stat({
  label,
  value,
  format,
  accent = false,
  small = false,
}: {
  label: string;
  value: number;
  format: (n: number) => string;
  accent?: boolean;
  small?: boolean;
}) {
  return (
    <div className="bg-wei-paper px-4 py-4">
      <span className="wei-eyebrow block text-wei-ink/50">{label}</span>
      <AnimatedNumber
        value={value}
        format={format}
        className={`wei-num mt-2 block font-medium ${
          small ? "text-wei-lg" : "text-wei-3xl"
        } ${accent ? "text-wei-emerald-deep" : "text-wei-ink"}`}
      />
    </div>
  );
}

function Readout({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="px-4 py-2 text-right">
      <span className="wei-eyebrow block text-wei-ink/45">{label}</span>
      <span
        className={`wei-num mt-1 block text-wei-lg font-medium ${
          accent ? "text-wei-emerald-deep" : "text-wei-ink"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function LegendItem({
  swatch,
  label,
}: {
  swatch: "emerald" | "dashed";
  label: ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-2">
      {swatch === "emerald" ? (
        <span aria-hidden="true" className="h-0.5 w-6 bg-wei-emerald" />
      ) : (
        <span
          aria-hidden="true"
          className="h-0 w-6 border-t-2 border-dashed border-wei-ink/40"
        />
      )}
      <span className="wei-eyebrow text-wei-ink/60">{label}</span>
    </span>
  );
}
