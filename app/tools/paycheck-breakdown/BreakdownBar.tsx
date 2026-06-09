"use client";

import { useEffect, useId, useRef } from "react";
import gsap from "gsap";

/*
  A single horizontal stacked bar: take-home plus each tax line as segments of
  one paycheck. Mirrors the chart language: bordered card, mono labels, token
  strokes/fills, gsap draw-in skipped under reduced motion, sr-only figcaption,
  illustrative tag. Reflows at narrow widths because the bar is full-width SVG
  and the legend wraps.
*/

export type Segment = {
  key: string;
  label: string;
  value: number;
  fill: string; // CSS color value
};

const W = 540;
const H = 56;

export function BreakdownBar({
  segments,
  total,
  formatMoney,
}: {
  segments: Segment[];
  total: number;
  formatMoney: (n: number) => string;
}) {
  const id = useId();
  const groupRef = useRef<SVGGElement | null>(null);

  const visible = segments.filter((s) => s.value > 0);
  const denom = total > 0 ? total : 1;

  // Precompute x offsets.
  let acc = 0;
  const rects = visible.map((s) => {
    const x = (acc / denom) * W;
    const w = (s.value / denom) * W;
    acc += s.value;
    return { ...s, x, w };
  });

  useEffect(() => {
    const g = groupRef.current;
    if (!g) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        g,
        { scaleX: 0, transformOrigin: "0 50%" },
        { scaleX: 1, duration: 1, ease: "power2.out" },
      );
    }, g);
    return () => ctx.revert();
  }, [rects.map((r) => r.w.toFixed(1)).join(",")]);

  return (
    <figure className="m-0">
      <div className="border border-wei-line bg-wei-paper">
        <div className="flex items-center justify-between border-b border-wei-line px-4 py-3">
          <span className="wei-eyebrow text-wei-ink/50">Where each dollar goes</span>
        </div>

        <div className="px-4 py-5">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="block w-full"
            preserveAspectRatio="none"
            role="img"
            aria-labelledby={`${id}-cap`}
          >
            <g ref={groupRef}>
              {rects.map((r) => (
                <rect
                  key={r.key}
                  x={r.x}
                  y={0}
                  width={Math.max(0, r.w - 1)}
                  height={H}
                  fill={r.fill}
                />
              ))}
            </g>
          </svg>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-wei-line px-4 py-3">
          {visible.map((s) => (
            <span key={s.key} className="inline-flex items-center gap-2">
              <span
                aria-hidden="true"
                className="h-2.5 w-2.5 rounded-sm"
                style={{ backgroundColor: s.fill }}
              />
              <span className="wei-eyebrow text-wei-ink/60">
                {s.label}{" "}
                <span className="wei-num text-wei-ink/40">
                  {total > 0 ? Math.round((s.value / total) * 100) : 0}%
                </span>
              </span>
            </span>
          ))}
          <span className="wei-eyebrow ml-auto text-wei-ink/40">Estimate</span>
        </div>
      </div>

      <figcaption id={`${id}-cap`} className="sr-only">
        A stacked bar showing how one paycheck of {formatMoney(total)} splits
        into take-home pay and each estimated tax line:{" "}
        {visible
          .map((s) => `${s.label} ${formatMoney(s.value)}`)
          .join(", ")}
        .
      </figcaption>
    </figure>
  );
}
