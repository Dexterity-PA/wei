"use client";

import { useEffect, useId, useRef } from "react";
import gsap from "gsap";

/*
  Two balance-over-time lines: avalanche vs snowball. Both start at the same
  total owed and fall to zero. Mirrors OpportunityGapChart conventions: bordered
  card, mono axis ticks, strokes via tokens, gsap draw-in skipped under reduced
  motion, sr-only figcaption, illustrative tag.
*/

const W = 540;
const H = 320;
const PAD = { top: 20, right: 20, bottom: 40, left: 56 };
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;

function buildPath(series: number[], maxMonths: number, maxBal: number) {
  if (series.length < 2 || maxMonths <= 0 || maxBal <= 0) return "";
  return series
    .map((bal, i) => {
      const x = PAD.left + (i / maxMonths) * PLOT_W;
      const y = PAD.top + (1 - bal / maxBal) * PLOT_H;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
}

export function PayoffChart({
  avalanche,
  snowball,
  formatMoney,
}: {
  avalanche: number[];
  snowball: number[];
  formatMoney: (n: number) => string;
}) {
  const id = useId();
  const svgRef = useRef<SVGSVGElement | null>(null);
  const avaRef = useRef<SVGPathElement | null>(null);
  const snowRef = useRef<SVGPathElement | null>(null);

  const maxMonths = Math.max(avalanche.length - 1, snowball.length - 1, 1);
  const startBal = Math.max(avalanche[0] ?? 0, snowball[0] ?? 0, 1);

  const avaPath = buildPath(avalanche, maxMonths, startBal);
  const snowPath = buildPath(snowball, maxMonths, startBal);

  // Y axis ticks at 0, half, full of the starting balance.
  const yTicks = [0, 0.5, 1];
  // X axis ticks: 0, mid, end in months.
  const xTicks = [0, Math.round(maxMonths / 2), maxMonths];

  useEffect(() => {
    const svg = svgRef.current;
    const a = avaRef.current;
    const s = snowRef.current;
    if (!svg || !a || !s) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      [a, s].forEach((line) => {
        const len = line.getTotalLength();
        gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(line, { strokeDashoffset: 0, duration: 1.1, ease: "power2.out" });
      });
    }, svg);
    return () => ctx.revert();
  }, [avaPath, snowPath]);

  return (
    <figure className="m-0">
      <div className="border border-wei-line bg-wei-paper">
        <div className="flex items-center justify-between border-b border-wei-line px-4 py-3">
          <span className="wei-eyebrow text-wei-ink/50">
            What you owe over time
          </span>
        </div>

        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className="block w-full"
          role="img"
          aria-labelledby={`${id}-cap`}
        >
          {/* Gridlines + Y tick labels */}
          {yTicks.map((f) => {
            const gy = PAD.top + (1 - f) * PLOT_H;
            return (
              <g key={f}>
                <line
                  x1={PAD.left}
                  x2={W - PAD.right}
                  y1={gy}
                  y2={gy}
                  stroke="var(--color-wei-line)"
                  strokeWidth={1}
                  opacity={0.7}
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
                  {formatMoney(startBal * f)}
                </text>
              </g>
            );
          })}

          <path
            ref={snowRef}
            d={snowPath}
            fill="none"
            stroke="var(--color-wei-amber)"
            strokeWidth={2.25}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            ref={avaRef}
            d={avaPath}
            fill="none"
            stroke="var(--color-wei-emerald)"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* X axis ticks (months) */}
          {xTicks.map((m, i) => (
            <text
              key={`${m}-${i}`}
              x={PAD.left + (m / maxMonths) * PLOT_W}
              y={H - PAD.bottom + 22}
              textAnchor={i === 0 ? "start" : i === xTicks.length - 1 ? "end" : "middle"}
              className="wei-num"
              fontSize={11}
              fill="var(--color-wei-ink)"
              fillOpacity={0.5}
            >
              {m === 0 ? "MO 0" : `MO ${m}`}
            </text>
          ))}
        </svg>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-wei-line px-4 py-3">
          <span className="inline-flex items-center gap-2">
            <span aria-hidden="true" className="h-0.5 w-6 bg-wei-emerald" />
            <span className="wei-eyebrow text-wei-ink/60">Avalanche</span>
          </span>
          <span className="inline-flex items-center gap-2">
            <span aria-hidden="true" className="h-0.5 w-6 bg-wei-amber" />
            <span className="wei-eyebrow text-wei-ink/60">Snowball</span>
          </span>
          <span className="wei-eyebrow ml-auto text-wei-ink/40">Illustrative</span>
        </div>
      </div>

      <figcaption id={`${id}-cap`} className="sr-only">
        A line chart of total debt remaining over time for two payoff
        strategies. Both start at the same amount owed and fall to zero. The
        avalanche line (highest interest rate first) and the snowball line
        (smallest balance first) are compared month by month.
      </figcaption>
    </figure>
  );
}
