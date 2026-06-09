"use client";

import { useEffect, useId, useRef } from "react";
import gsap from "gsap";

/*
  Two stacked bars side by side. Left bar is the full sticker price. Right bar
  is what covers it: gift aid (the part that disappears), family contribution,
  and loans. Making the gap between sticker and net price visible is the lesson.

  Mirrors the chart language: bordered card, mono labels, token fills, gsap
  draw-in skipped under reduced motion, sr-only figcaption, illustrative tag.
*/

const W = 540;
const H = 300;
const PAD = { top: 16, right: 16, bottom: 36, left: 16 };
const PLOT_H = H - PAD.top - PAD.bottom;
const BAR_W = 120;

export function StickerGapChart({
  sticker,
  giftAid,
  familyContribution,
  loans,
  formatMoney,
}: {
  sticker: number;
  giftAid: number;
  familyContribution: number;
  loans: number;
  formatMoney: (n: number) => string;
}) {
  const id = useId();
  const groupRef = useRef<SVGGElement | null>(null);

  const coverTotal = giftAid + familyContribution + loans;
  const max = Math.max(sticker, coverTotal, 1);
  const h = (v: number) => (v / max) * PLOT_H;
  const yTop = (v: number) => PAD.top + (PLOT_H - h(v));

  const leftX = W * 0.27 - BAR_W / 2;
  const rightX = W * 0.73 - BAR_W / 2;

  // Right bar stacked: gift aid (bottom), family contribution, loans (top).
  const segs = [
    { key: "gift", value: giftAid, fill: "var(--color-wei-emerald)", label: "Gift aid" },
    {
      key: "family",
      value: familyContribution,
      fill: "color-mix(in srgb, var(--color-wei-ink) 55%, var(--color-wei-paper))",
      label: "Family / savings",
    },
    { key: "loans", value: loans, fill: "var(--color-wei-amber)", label: "Loans" },
  ];

  // Build stacked rects from the bottom up.
  let accBottom = PAD.top + PLOT_H;
  const stacked = segs.map((s) => {
    const segH = h(s.value);
    const y = accBottom - segH;
    accBottom = y;
    return { ...s, y, segH };
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
        { scaleY: 0, transformOrigin: "50% 100%" },
        { scaleY: 1, duration: 0.9, ease: "power2.out" },
      );
    }, g);
    return () => ctx.revert();
  }, [sticker, giftAid, familyContribution, loans]);

  return (
    <figure className="m-0">
      <div className="border border-wei-line bg-wei-paper">
        <div className="flex items-center justify-between border-b border-wei-line px-4 py-3">
          <span className="wei-eyebrow text-wei-ink/50">Sticker price vs what pays for it</span>
        </div>

        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="block w-full"
          role="img"
          aria-labelledby={`${id}-cap`}
        >
          <g ref={groupRef}>
            {/* Left: sticker price bar */}
            <rect
              x={leftX}
              y={yTop(sticker)}
              width={BAR_W}
              height={h(sticker)}
              fill="color-mix(in srgb, var(--color-wei-ink) 14%, var(--color-wei-paper))"
              stroke="var(--color-wei-line-strong)"
              strokeWidth={1}
            />
            {/* Right: stacked coverage bar */}
            {stacked.map((s) =>
              s.segH > 0 ? (
                <rect
                  key={s.key}
                  x={rightX}
                  y={s.y}
                  width={BAR_W}
                  height={s.segH}
                  fill={s.fill}
                />
              ) : null,
            )}
          </g>

          {/* Bar labels (outside the animated group so they stay put) */}
          <text
            x={leftX + BAR_W / 2}
            y={H - PAD.bottom + 22}
            textAnchor="middle"
            className="wei-eyebrow"
            fontSize={11}
            fill="var(--color-wei-ink)"
            fillOpacity={0.6}
          >
            STICKER
          </text>
          <text
            x={rightX + BAR_W / 2}
            y={H - PAD.bottom + 22}
            textAnchor="middle"
            className="wei-eyebrow"
            fontSize={11}
            fill="var(--color-wei-ink)"
            fillOpacity={0.6}
          >
            COVERAGE
          </text>
        </svg>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-wei-line px-4 py-3">
          {segs.map((s) => (
            <span key={s.key} className="inline-flex items-center gap-2">
              <span
                aria-hidden="true"
                className="h-2.5 w-2.5 rounded-sm"
                style={{ backgroundColor: s.fill }}
              />
              <span className="wei-eyebrow text-wei-ink/60">{s.label}</span>
            </span>
          ))}
          <span className="wei-eyebrow ml-auto text-wei-ink/40">Illustrative</span>
        </div>
      </div>

      <figcaption id={`${id}-cap`} className="sr-only">
        Two bars compared. The left bar is the sticker price of{" "}
        {formatMoney(sticker)}. The right bar shows what pays for it: gift aid{" "}
        {formatMoney(giftAid)}, family or savings {formatMoney(familyContribution)},
        and loans {formatMoney(loans)}. Gift aid is the part of the sticker price
        you do not pay.
      </figcaption>
    </figure>
  );
}
