"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion } from "@/lib/animation/motion";
import { prefersReducedMotion } from "@/lib/animation/reduced-motion";

/*
  The compounding gap. The single mission-carrying graphic on the site.

  Two students start at the same place. One learns how money works early and
  keeps compounding that head start; the other never gets the chance and barely
  moves. The widening band between the two lines IS the WEI thesis: a small head
  start, compounded, pulls one student far ahead of another who never saw it.

  Built as a real instrument, not clip art: mono labels, tabular numbers,
  emerald line on paper, and a choreographed draw on mount. The plotted geometry
  reveals left to right behind a single clip edge while the readout counts the
  years and the gap multiple in lockstep, so the marker rides the drawing tip
  and the numbers settle exactly as the gap finishes opening. Degrades to a
  static but still-meaningful chart under reduced motion or no JS, and stays
  fully scrubbable by pointer and keyboard afterward.
*/

// useLayoutEffect on the client so the readout reset to year 0 happens before
// paint (no flash of the final value); useEffect on the server.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Plot geometry (unitless SVG user space).
const W = 540;
const H = 380;
const PAD = { top: 24, right: 20, bottom: 40, left: 40 };
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;

const YEARS = 10; // horizontal span
const Y_MIN = 95;
const Y_MAX = 240;

// Both students indexed to 100 at year 0. "early" compounds at ~9%/yr; the
// student with no access barely moves at ~2%/yr. Illustrative, not a claim.
const early = (t: number) => 100 * Math.pow(1.09, t);
const noAccess = (t: number) => 100 * Math.pow(1.02, t);

const xPx = (t: number) => PAD.left + (t / YEARS) * PLOT_W;
const yPx = (v: number) =>
  PAD.top + (1 - (v - Y_MIN) / (Y_MAX - Y_MIN)) * PLOT_H;

// Sample both curves once. Pure constants, so server and client render identically.
const SAMPLES = Array.from({ length: 41 }, (_, i) => (i / 40) * YEARS);
const earlyPts = SAMPLES.map((t) => ({ x: xPx(t), y: yPx(early(t)) }));
const noAccessPts = SAMPLES.map((t) => ({ x: xPx(t), y: yPx(noAccess(t)) }));

const toLine = (pts: { x: number; y: number }[]) =>
  pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");

const earlyPath = toLine(earlyPts);
const noAccessPath = toLine(noAccessPts);
// The gap band: forward along the early line, back along the no-access line.
const gapArea = `${toLine(earlyPts)} ${noAccessPts
  .slice()
  .reverse()
  .map((p) => `L${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
  .join(" ")} Z`;

const X_TICKS = [0, 5, 10];

export function OpportunityGapChart() {
  const id = useId();
  const rootRef = useRef<SVGSVGElement | null>(null);
  const revealRef = useRef<SVGRectElement | null>(null);

  // Default marker at the end of the span: the widest gap tells the story and
  // is the correct static state for SSR, no-JS, and reduced motion.
  const [year, setYear] = useState(YEARS);
  const multiple = (early(year) / noAccess(year)).toFixed(1);

  // Choreographed draw on mount. Reduced-motion safe: the curves and readout are
  // already at their final state, so skipping the animation leaves a finished,
  // meaningful chart in place.
  useIsomorphicLayoutEffect(() => {
    const svg = rootRef.current;
    const reveal = revealRef.current;
    if (!svg || !reveal) return;

    if (prefersReducedMotion()) return;

    // Reset to the start of the story before paint: nothing drawn, year 0.
    setYear(0);
    gsap.set(reveal, { attr: { width: 0 } });

    const ctx = gsap.context(() => {
      const counter = { t: 0 };
      gsap
        .timeline({
          defaults: { duration: motion.duration.slow + 0.4, ease: motion.gsapEase.out },
        })
        // The clip edge sweeps left to right: both lines extend and the gap
        // band fills together, one gesture.
        .to(reveal, { attr: { width: PLOT_W } }, 0)
        // The readout counts the years and the marker rides the drawing tip.
        .to(
          counter,
          { t: YEARS, onUpdate: () => setYear(counter.t) },
          0,
        );
    }, svg);

    return () => ctx.revert();
  }, []);

  // Map a pointer position to the nearest half-year and move the marker.
  const onPointer = (event: React.PointerEvent<SVGSVGElement>) => {
    const svg = rootRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const localX = ((event.clientX - rect.left) / rect.width) * W;
    const t = ((localX - PAD.left) / PLOT_W) * YEARS;
    const snapped = Math.min(YEARS, Math.max(0, Math.round(t * 2) / 2));
    setYear(snapped);
  };

  const onKey = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      setYear((y) => Math.max(0, y - 0.5));
      event.preventDefault();
    } else if (event.key === "ArrowRight") {
      setYear((y) => Math.min(YEARS, y + 0.5));
      event.preventDefault();
    }
  };

  const markerX = xPx(year);

  return (
    <figure className="m-0">
      <div className="border border-wei-line bg-wei-paper">
        {/* Readout header */}
        <div className="flex items-stretch justify-between border-b border-wei-line">
          <div className="px-4 py-3">
            <span className="wei-eyebrow text-wei-ink/50">The compounding gap</span>
          </div>
          <div className="flex divide-x divide-wei-line border-l border-wei-line">
            <Readout label="Year" value={year % 1 === 0 ? `${year}` : year.toFixed(1)} />
            <Readout label="Gap" value={`${multiple}×`} accent />
          </div>
        </div>

        <svg
          ref={rootRef}
          viewBox={`0 0 ${W} ${H}`}
          className="block w-full touch-none"
          role="group"
          tabIndex={0}
          aria-label="Interactive chart: a student who learns about money early compounds ahead of a classmate who never gets the chance. Use left and right arrow keys to move through the years."
          onPointerMove={onPointer}
          onPointerDown={onPointer}
          onKeyDown={onKey}
        >
          <defs>
            {/* The reveal edge. Width is full by default (static render) and is
                driven from 0 by the mount timeline when motion is allowed. */}
            <clipPath id={`${id}-reveal`}>
              <rect ref={revealRef} x={PAD.left} y={0} width={PLOT_W} height={H} />
            </clipPath>
          </defs>

          {/* Horizontal gridlines (always visible, not part of the draw) */}
          {[0, 0.25, 0.5, 0.75, 1].map((f) => {
            const gy = PAD.top + f * PLOT_H;
            return (
              <line
                key={f}
                x1={PAD.left}
                x2={W - PAD.right}
                y1={gy}
                y2={gy}
                stroke="var(--color-wei-line)"
                strokeWidth={1}
                opacity={0.6}
              />
            );
          })}

          {/* Plotted geometry: gap band, no-access line, early line. Revealed
              left to right behind the clip edge as one gesture. */}
          <g clipPath={`url(#${id}-reveal)`}>
            <path d={gapArea} fill="var(--color-wei-emerald)" opacity={0.1} />
            <path
              d={noAccessPath}
              fill="none"
              stroke="var(--color-wei-ink)"
              strokeOpacity={0.35}
              strokeWidth={1.75}
              strokeDasharray="2 4"
              strokeLinecap="round"
            />
            <path
              d={earlyPath}
              fill="none"
              stroke="var(--color-wei-emerald)"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>

          {/* Scrub marker. Rides the drawing tip during the entrance, then
              follows the pointer or arrow keys. */}
          <line
            x1={markerX}
            x2={markerX}
            y1={PAD.top}
            y2={H - PAD.bottom}
            stroke="var(--color-wei-ink)"
            strokeOpacity={0.45}
            strokeWidth={1}
          />
          <circle cx={markerX} cy={yPx(early(year))} r={4.5} fill="var(--color-wei-emerald)" />
          <circle
            cx={markerX}
            cy={yPx(noAccess(year))}
            r={3.5}
            fill="var(--color-wei-paper)"
            stroke="var(--color-wei-ink)"
            strokeOpacity={0.5}
            strokeWidth={1.5}
          />

          {/* X axis ticks */}
          {X_TICKS.map((t) => (
            <text
              key={t}
              x={xPx(t)}
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

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-wei-line px-4 py-3">
          <LegendItem swatch="emerald" label="Learned early" />
          <LegendItem swatch="dashed" label="Never got the chance" />
          <span className="wei-eyebrow ml-auto text-wei-ink/40">Illustrative</span>
        </div>
      </div>

      <figcaption className="sr-only">
        A line chart comparing two students who start at the same point. By year{" "}
        {YEARS}, the student who learned to handle money early sits about{" "}
        {(early(YEARS) / noAccess(YEARS)).toFixed(1)} times further along than a
        classmate who never got the chance. The widening band between them is the
        opportunity gap WEI exists to close.
      </figcaption>
    </figure>
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
  label: string;
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
