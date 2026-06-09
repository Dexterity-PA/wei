"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import gsap from "gsap";

/*
  Directional credit-score teaching model.

  This is NOT a FICO calculation. Each lever contributes a bounded, signed
  delta to a starting score, sized so the relative magnitudes echo the public
  factor weights (payment history > utilization > history length > inquiries >
  mix). The output is clamped to 300-850 and always framed as a range and a
  direction. The score dial is a small hand-built SVG arc that degrades to a
  static arc under reduced motion. Every numeric readout uses .wei-num.
*/

const MIN = 300;
const MAX = 850;

// Public factor weights, used both for the weight bars and to scale deltas.
const WEIGHTS = {
  payment: 35,
  utilization: 30,
  history: 15,
  newCredit: 10,
  mix: 10,
};

const clamp = (n: number) => Math.max(MIN, Math.min(MAX, Math.round(n)));

type Levers = {
  start: number;
  onTimePct: number; // share of payments made on time
  utilization: number; // percent of available credit used
  ageYears: number; // average age of accounts
  hardInquiry: boolean; // one new hard inquiry
  missedPayment: boolean; // a recent 30+ day missed payment
};

const INITIAL: Levers = {
  start: 680,
  onTimePct: 100,
  utilization: 30,
  ageYears: 4,
  hardInquiry: false,
  missedPayment: false,
};

type Contribution = {
  key: string;
  label: string;
  weight: number;
  delta: number;
  why: string;
};

function evaluate(l: Levers): { score: number; parts: Contribution[] } {
  // Payment history (heaviest). 100% on-time is neutral-to-positive; lower
  // on-time share pulls down hard.
  const paymentDelta =
    l.onTimePct >= 100 ? 8 : -((100 - l.onTimePct) * 1.1);
  const paymentWhy =
    l.onTimePct >= 100
      ? "Every payment on time is the single strongest thing you can do. It is the heaviest factor in a score."
      : "Late payments hit the heaviest factor. Even a few missed due dates pull a score down sharply.";

  // Utilization (second heaviest). Sweet spot is low. Above ~30% starts to
  // hurt; very high use hurts a lot. Very low use is slightly positive.
  let utilDelta: number;
  let utilWhy: string;
  if (l.utilization <= 10) {
    utilDelta = 12;
    utilWhy =
      "Using only a small slice of your available credit looks low-risk. Keeping use under about 10 percent tends to help most.";
  } else if (l.utilization <= 30) {
    utilDelta = 4;
    utilWhy =
      "Using under about 30 percent of your available credit is a common rule of thumb and is treated as healthy.";
  } else if (l.utilization <= 50) {
    utilDelta = -10;
    utilWhy =
      "Using 30 to 50 percent of your credit starts to look stretched and weighs on the second-heaviest factor.";
  } else {
    utilDelta = -22 - (l.utilization - 50) * 0.25;
    utilWhy =
      "Using more than half of your available credit signals strain and pulls down the second-heaviest factor.";
  }

  // Length of history. Older average age helps a little; very new credit is a
  // mild drag.
  const historyDelta = Math.max(-12, Math.min(12, (l.ageYears - 3) * 2.5));
  const historyWhy =
    l.ageYears >= 3
      ? "A longer track record gives a score more to go on, which helps modestly. Keeping old accounts open builds this over time."
      : "A short history means there is less to judge, which is a mild drag. This one mostly fixes itself with time.";

  // New credit / hard inquiry. Small, temporary.
  const inquiryDelta = l.hardInquiry ? -6 : 0;
  const inquiryWhy = l.hardInquiry
    ? "One new hard inquiry usually costs a few points and fades within about a year. Many in a short span look riskier."
    : "No recent hard inquiries. Applying for new credit triggers a small, temporary dip, so space out applications.";

  // A discrete recent missed payment. Large and specific. Modeled as part of
  // the payment-history factor but surfaced as its own lever for clarity.
  const missedDelta = l.missedPayment ? -70 : 0;
  const missedWhy = l.missedPayment
    ? "A payment 30 or more days late is one of the most damaging single events, and it can stay on a report for years."
    : "No recent missed payment on record, which protects the heaviest factor.";

  const parts: Contribution[] = [
    {
      key: "payment",
      label: "On-time payments",
      weight: WEIGHTS.payment,
      delta: paymentDelta,
      why: paymentWhy,
    },
    {
      key: "utilization",
      label: "Credit utilization",
      weight: WEIGHTS.utilization,
      delta: utilDelta,
      why: utilWhy,
    },
    {
      key: "history",
      label: "Age of credit",
      weight: WEIGHTS.history,
      delta: historyDelta,
      why: historyWhy,
    },
    {
      key: "newCredit",
      label: "New hard inquiry",
      weight: WEIGHTS.newCredit,
      delta: inquiryDelta,
      why: inquiryWhy,
    },
    {
      key: "missed",
      label: "Recent missed payment",
      weight: WEIGHTS.payment,
      delta: missedDelta,
      why: missedWhy,
    },
  ];

  const raw = l.start + parts.reduce((sum, p) => sum + p.delta, 0);
  return { score: clamp(raw), parts };
}

function band(score: number) {
  if (score >= 800) return "Exceptional";
  if (score >= 740) return "Very good";
  if (score >= 670) return "Good";
  if (score >= 580) return "Fair";
  return "Poor";
}

export function CreditSimulator() {
  const [l, setL] = useState<Levers>(INITIAL);
  const set = <K extends keyof Levers>(key: K, value: Levers[K]) =>
    setL((prev) => ({ ...prev, [key]: value }));

  const { score, parts } = useMemo(() => evaluate(l), [l]);
  const totalDelta = score - clamp(l.start);
  const direction =
    totalDelta > 1 ? "up" : totalDelta < -1 ? "down" : "flat";

  return (
    <div className="grid gap-x-wei-gutter gap-y-10 lg:grid-cols-12">
      {/* Levers */}
      <div className="lg:col-span-5">
        <div className="border border-wei-line bg-wei-paper">
          <div className="border-b border-wei-line px-4 py-3">
            <span className="wei-eyebrow text-wei-ink/50">Levers</span>
          </div>
          <div className="divide-y divide-wei-line">
            <RangeLever
              label="Starting score"
              value={l.start}
              min={MIN}
              max={MAX}
              step={5}
              display={`${l.start}`}
              weightLabel="where you begin"
              onChange={(v) => set("start", v)}
            />
            <RangeLever
              label="Payments made on time"
              value={l.onTimePct}
              min={70}
              max={100}
              step={1}
              display={`${l.onTimePct}%`}
              weightLabel={`~${WEIGHTS.payment}% of a score`}
              weightPct={WEIGHTS.payment}
              onChange={(v) => set("onTimePct", v)}
            />
            <RangeLever
              label="Credit utilization"
              value={l.utilization}
              min={0}
              max={100}
              step={1}
              display={`${l.utilization}%`}
              weightLabel={`~${WEIGHTS.utilization}% of a score`}
              weightPct={WEIGHTS.utilization}
              onChange={(v) => set("utilization", v)}
            />
            <RangeLever
              label="Average age of accounts"
              value={l.ageYears}
              min={0}
              max={20}
              step={1}
              display={`${l.ageYears} yr`}
              weightLabel={`~${WEIGHTS.history}% of a score`}
              weightPct={WEIGHTS.history}
              onChange={(v) => set("ageYears", v)}
            />
            <ToggleLever
              label="Add one new hard inquiry"
              checked={l.hardInquiry}
              weightLabel={`~${WEIGHTS.newCredit}% of a score`}
              weightPct={WEIGHTS.newCredit}
              onChange={(v) => set("hardInquiry", v)}
            />
            <ToggleLever
              label="A recent missed payment (30+ days)"
              checked={l.missedPayment}
              weightLabel="part of payment history"
              weightPct={WEIGHTS.payment}
              onChange={(v) => set("missedPayment", v)}
            />
          </div>
        </div>
      </div>

      {/* Output */}
      <div className="lg:col-span-7">
        <div className="border border-wei-line bg-wei-paper">
          <div className="border-b border-wei-line px-4 py-3">
            <span className="wei-eyebrow text-wei-ink/50">
              Estimated direction
            </span>
          </div>
          <div className="grid items-center gap-x-wei-gutter gap-y-6 p-6 sm:grid-cols-2 md:p-8">
            <ScoreDial score={score} />
            <div>
              <span className="wei-eyebrow block text-wei-ink/45">
                Illustrative score
              </span>
              <p className="wei-num mt-2 text-wei-3xl font-semibold leading-none text-wei-ink">
                ~{score}
              </p>
              <p className="mt-2 text-wei-sm text-wei-ink/70">{band(score)}</p>
              <div className="mt-4 inline-flex items-center gap-2">
                <DirectionTag direction={direction} delta={totalDelta} />
              </div>
              <p className="mt-3 text-wei-xs text-wei-ink/55">
                Versus your starting score. Treat this as a rough direction, not
                an exact number.
              </p>
            </div>
          </div>
        </div>

        {/* Why each lever moves it */}
        <div className="mt-6 border border-wei-line bg-wei-paper">
          <div className="border-b border-wei-line px-4 py-3">
            <span className="wei-eyebrow text-wei-ink/50">
              Why each lever moves it
            </span>
          </div>
          <ul className="divide-y divide-wei-line">
            {parts.map((p) => (
              <WhyRow key={p.key} part={p} />
            ))}
          </ul>
          <div className="flex items-center border-t border-wei-line px-4 py-3">
            <span className="wei-eyebrow ml-auto text-wei-ink/40">
              Illustrative / directional only
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function RangeLever({
  label,
  value,
  min,
  max,
  step,
  display,
  weightLabel,
  weightPct,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  weightLabel: string;
  weightPct?: number;
  onChange: (v: number) => void;
}) {
  const id = useId();
  return (
    <div className="px-4 py-4">
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-wei-sm font-medium text-wei-ink">
          {label}
        </label>
        <span className="wei-num shrink-0 text-wei-base font-medium text-wei-emerald-deep">
          {display}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full accent-wei-emerald"
      />
      <WeightHint label={weightLabel} pct={weightPct} />
    </div>
  );
}

function ToggleLever({
  label,
  checked,
  weightLabel,
  weightPct,
  onChange,
}: {
  label: string;
  checked: boolean;
  weightLabel: string;
  weightPct?: number;
  onChange: (v: boolean) => void;
}) {
  const id = useId();
  return (
    <div className="px-4 py-4">
      <label htmlFor={id} className="flex items-center justify-between gap-3">
        <span className="text-wei-sm font-medium text-wei-ink">{label}</span>
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="h-5 w-5 shrink-0 accent-wei-emerald"
        />
      </label>
      <WeightHint label={weightLabel} pct={weightPct} />
    </div>
  );
}

function WeightHint({ label, pct }: { label: string; pct?: number }) {
  return (
    <div className="mt-3 flex items-center gap-3">
      {pct !== undefined ? (
        <span
          aria-hidden
          className="h-1 w-16 shrink-0 overflow-hidden rounded-wei-sm bg-wei-line"
        >
          <span
            className="block h-full bg-wei-emerald"
            style={{ width: `${pct}%` }}
          />
        </span>
      ) : null}
      <span className="wei-eyebrow text-wei-ink/40">{label}</span>
    </div>
  );
}

function DirectionTag({
  direction,
  delta,
}: {
  direction: "up" | "down" | "flat";
  delta: number;
}) {
  if (direction === "flat") {
    return (
      <span className="wei-eyebrow inline-flex items-center gap-2 border border-wei-line px-3 py-1.5 text-wei-ink/60">
        About the same
      </span>
    );
  }
  const up = direction === "up";
  return (
    <span
      className={`wei-eyebrow inline-flex items-center gap-2 border px-3 py-1.5 ${
        up
          ? "border-wei-emerald/40 text-wei-emerald-deep"
          : "border-wei-amber/50 text-wei-ink"
      }`}
    >
      <span aria-hidden>{up ? "↑" : "↓"}</span>
      {up ? "Tends up" : "Tends down"} about {Math.abs(delta)} pts
    </span>
  );
}

function WhyRow({ part }: { part: Contribution }) {
  const dir =
    part.delta > 0.5 ? "up" : part.delta < -0.5 ? "down" : "flat";
  const tone =
    dir === "up"
      ? "text-wei-emerald-deep"
      : dir === "down"
        ? "text-wei-ink"
        : "text-wei-ink/45";
  const sign = part.delta > 0 ? "+" : "";
  return (
    <li className="px-4 py-4">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-wei-sm font-medium text-wei-ink">
          {part.label}
        </span>
        <span className={`wei-num shrink-0 text-wei-sm font-medium ${tone}`}>
          {dir === "flat" ? "no change" : `${sign}${Math.round(part.delta)} pts`}
        </span>
      </div>
      <p className="mt-2 text-wei-xs text-wei-ink/65">{part.why}</p>
    </li>
  );
}

/* ---- Score dial: a small hand-built SVG arc, reduced-motion safe ---- */

const DIAL = 168;
const R = 64;
const CX = DIAL / 2;
const CY = DIAL / 2;
// Sweep from 135deg to 405deg (270deg arc).
const START = 135;
const SWEEP = 270;

function polar(angleDeg: number) {
  const a = (angleDeg * Math.PI) / 180;
  return { x: CX + R * Math.cos(a), y: CY + R * Math.sin(a) };
}

function arcPath(fromDeg: number, toDeg: number) {
  const start = polar(fromDeg);
  const end = polar(toDeg);
  const large = toDeg - fromDeg > 180 ? 1 : 0;
  return `M${start.x.toFixed(2)} ${start.y.toFixed(2)} A${R} ${R} 0 ${large} 1 ${end.x.toFixed(2)} ${end.y.toFixed(2)}`;
}

function ScoreDial({ score }: { score: number }) {
  const id = useId();
  const fillRef = useRef<SVGPathElement | null>(null);
  const frac = (score - MIN) / (MAX - MIN);
  const fillEndDeg = START + SWEEP * frac;

  useEffect(() => {
    const path = fillRef.current;
    if (!path) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;
    const ctx = gsap.context(() => {
      const len = path.getTotalLength();
      gsap.fromTo(
        path,
        { strokeDasharray: len, strokeDashoffset: len },
        { strokeDashoffset: 0, duration: 0.7, ease: "power2.out" },
      );
    });
    return () => ctx.revert();
  }, [score]);

  // Color the fill by band.
  const stroke =
    score >= 740
      ? "var(--color-wei-emerald)"
      : score >= 670
        ? "var(--color-wei-emerald-deep)"
        : "var(--color-wei-amber)";

  return (
    <svg
      viewBox={`0 0 ${DIAL} ${DIAL}`}
      className="mx-auto block w-40 max-w-full sm:mx-0"
      role="img"
      aria-label={`Estimated score of about ${score} out of ${MAX}, on a ${MIN} to ${MAX} scale. Illustrative only.`}
    >
      {/* track */}
      <path
        d={arcPath(START, START + SWEEP)}
        fill="none"
        stroke="var(--color-wei-line)"
        strokeWidth={10}
        strokeLinecap="round"
      />
      {/* fill */}
      <path
        key={id}
        ref={fillRef}
        d={arcPath(START, fillEndDeg)}
        fill="none"
        stroke={stroke}
        strokeWidth={10}
        strokeLinecap="round"
      />
      <text
        x={CX}
        y={CY - 2}
        textAnchor="middle"
        className="wei-num"
        fontSize={28}
        fontWeight={600}
        fill="var(--color-wei-ink)"
      >
        {score}
      </text>
      <text
        x={CX}
        y={CY + 18}
        textAnchor="middle"
        className="wei-eyebrow"
        fontSize={9}
        fill="var(--color-wei-ink)"
        fillOpacity={0.45}
        letterSpacing="1.5"
      >
        EST
      </text>
    </svg>
  );
}
