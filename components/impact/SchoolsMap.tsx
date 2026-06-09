"use client";

import { useEffect, useId, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "@/lib/animation/motion";
import { schools } from "./schools";
import {
  MAIN_VIEW,
  INSET_VIEW,
  indiaOutlinePath,
  stateBordersPath,
  insetLandPath,
  insetBorderPath,
  clusterBox,
  geoPins,
} from "./india-geo";

gsap.registerPlugin(ScrollTrigger);

// useLayoutEffect on the client so pins are hidden before paint (no flash of
// the fully-resolved map); useEffect on the server to avoid the SSR warning.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * The supporting map for the Impact section. It is decorative: the schools list
 * is the accessible control, and this map mirrors its selection for sighted
 * users (aria-hidden). Two panels:
 *
 *   - A full-India panel built from real GADM geometry (accurate national
 *     boundary + state borders, pre-projected to static paths in india-geo.ts).
 *     It carries the lone southern pin (Nagercoil) and a boxed detail region.
 *   - A zoomed coastal-Andhra-Pradesh inset. The eleven clustered schools sit
 *     so tightly that bare dots would merge, so each pin is tied by a hairline
 *     leader to an evenly spaced index marker on the left or right rail. No two
 *     markers can overlap, and the indices cross-reference the numbered list.
 *
 * Showpiece motion: as the map scrolls into view the pins resolve in sequence
 * grouped by region (a quiet scale-and-fade, leaders fading with their dots),
 * which reads as the work landing region by region. Tied to scroll position via
 * ScrollTrigger so it reverses cleanly when scrolled back past. Nothing depends
 * on motion: everything renders in place under reduced motion and no JS, and
 * only the selected state changes color and weight.
 */

type SchoolPin = (typeof geoPins)[number] & {
  name: string;
  location: string;
  region: string;
};

const byN = new Map(schools.map((s) => [s.n, s]));
const pins: SchoolPin[] = geoPins.map((g) => {
  const s = byN.get(g.n)!;
  return { ...g, name: s.name, location: s.location, region: s.region };
});

const clusterPins = pins.filter((p) => p.inInset);
const southPin = pins.find((p) => !p.inInset)!;

// Deterministic leader-marker layout for the inset. West pins (Khammam) hang off
// the left rail, the coastal Andhra group off the right rail, each sorted by
// latitude into evenly spaced slots so the index markers never collide.
const RAIL = {
  top: 30,
  bottom: INSET_VIEW.height - 22,
  leftX: 15,
  rightX: INSET_VIEW.width - 15,
  split: 160,
};

type Chip = SchoolPin & { chipX: number; chipY: number; side: "left" | "right" };

function layoutChips(): Chip[] {
  const place = (arr: SchoolPin[], x: number, side: "left" | "right"): Chip[] =>
    arr
      .slice()
      .sort((a, b) => a.insetY! - b.insetY!)
      .map((p, i, a) => ({
        ...p,
        chipX: x,
        chipY:
          a.length === 1
            ? (RAIL.top + RAIL.bottom) / 2
            : RAIL.top + (i * (RAIL.bottom - RAIL.top)) / (a.length - 1),
        side,
      }));
  return [
    ...place(clusterPins.filter((p) => p.insetX! < RAIL.split), RAIL.leftX, "left"),
    ...place(clusterPins.filter((p) => p.insetX! >= RAIL.split), RAIL.rightX, "right"),
  ];
}

const chips = layoutChips();
const pad2 = (n: number) => String(n).padStart(2, "0");

// Region groups in first-appearance order; a pin's group index sets how late in
// the entrance it resolves, so the map fills one region at a time.
const regionOrder = (() => {
  const seen: string[] = [];
  for (const s of schools) if (!seen.includes(s.region)) seen.push(s.region);
  return seen;
})();
const regionIndex = (region: string) => Math.max(0, regionOrder.indexOf(region));

type MapProps = {
  selected: number | null;
  onSelect: (n: number | null) => void;
};

export function SchoolsMap({ selected, onSelect }: MapProps) {
  const uid = useId();
  const rootRef = useRef<HTMLElement | null>(null);
  const active = pins.find((p) => p.n === selected) ?? null;

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const groups = gsap.utils.toArray<SVGGElement>("g[data-pin]", root);
    const leaders = gsap.utils.toArray<SVGLineElement>("line[data-pin]", root);
    if (!groups.length) return;

    const byRegion = (_i: number, el: Element) =>
      Number((el as HTMLElement).dataset.region ?? 0) * 0.18;

    const ctx = gsap.context(() => {
      // Hidden before paint; dots scale up around their own centre, leaders just
      // fade. No clearProps, so a scroll-back reverses the whole sequence.
      gsap.set(groups, { opacity: 0, scale: 0.85, transformOrigin: "center" });
      gsap.set(leaders, { opacity: 0 });
      const tl = gsap.timeline({
        defaults: { duration: motion.duration.base, ease: motion.gsapEase.emphasis },
        scrollTrigger: {
          trigger: root,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
      tl.to(groups, { opacity: 1, scale: 1, stagger: byRegion }, 0);
      tl.to(leaders, { opacity: 1, stagger: byRegion }, 0.1);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <figure
      ref={rootRef}
      className="m-0 border border-wei-line bg-wei-paper"
      aria-hidden="true"
    >
      {/* Readout header, echoing the instrument panels used elsewhere on the site. */}
      <div className="flex items-stretch justify-between border-b border-wei-line">
        <div className="px-4 py-3">
          <span className="wei-eyebrow text-wei-ink/50">Where the work lands</span>
        </div>
        <div className="flex min-w-0 items-center border-l border-wei-line px-4 py-2">
          {active ? (
            <span className="flex min-w-0 items-baseline gap-2">
              <span className="wei-num shrink-0 text-wei-sm text-wei-emerald-deep">{pad2(active.n)}</span>
              <span className="truncate text-wei-sm font-medium text-wei-ink">{active.name}</span>
            </span>
          ) : (
            <span className="wei-eyebrow text-wei-ink/40">India</span>
          )}
        </div>
      </div>

      <div className="grid gap-px bg-wei-line sm:grid-cols-2">
        {/* Full-India panel */}
        <div className="bg-wei-paper p-3 sm:p-4">
          <svg
            viewBox={`0 0 ${MAIN_VIEW.width} ${MAIN_VIEW.height}`}
            className="mx-auto block h-auto w-full max-w-[22rem]"
            role="presentation"
          >
            <path
              d={indiaOutlinePath}
              fill="var(--color-wei-paper-dim)"
              stroke="var(--color-wei-ink)"
              strokeWidth={1.1}
              strokeLinejoin="round"
            />
            <path
              d={stateBordersPath}
              fill="none"
              stroke="var(--color-wei-line-strong)"
              strokeWidth={0.7}
              strokeLinejoin="round"
            />

            {/* Detail-region box, keyed to the inset */}
            <rect
              x={clusterBox.x}
              y={clusterBox.y}
              width={clusterBox.w}
              height={clusterBox.h}
              fill="none"
              stroke="var(--color-wei-emerald)"
              strokeWidth={1.25}
              opacity={0.85}
            />
            <text
              x={clusterBox.x + clusterBox.w + 8}
              y={clusterBox.y + clusterBox.h - 2}
              className="wei-num"
              fontSize={13}
              fill="var(--color-wei-emerald-deep)"
            >
              Detail
            </text>

            {/* Lone southern pin (Nagercoil) */}
            <g data-pin="" data-region={regionIndex(southPin.region)}>
              <Pin
                x={southPin.mainX}
                y={southPin.mainY}
                active={selected === southPin.n}
                dim={selected !== null && selected !== southPin.n}
                r={4.5}
                onClick={() => onSelect(selected === southPin.n ? null : southPin.n)}
              />
            </g>
            {selected === southPin.n ? (
              <g>
                <line
                  x1={southPin.mainX}
                  y1={southPin.mainY}
                  x2={southPin.mainX - 14}
                  y2={southPin.mainY + 24}
                  stroke="var(--color-wei-emerald)"
                  strokeWidth={1}
                />
                <text
                  x={southPin.mainX - 16}
                  y={southPin.mainY + 28}
                  textAnchor="end"
                  className="wei-num"
                  fontSize={13}
                  fill="var(--color-wei-emerald-deep)"
                >
                  {pad2(southPin.n)} Nagercoil
                </text>
              </g>
            ) : null}
          </svg>
        </div>

        {/* Zoomed coastal-AP inset with leader-line index markers */}
        <div className="bg-wei-paper p-3 sm:p-4">
          <svg
            viewBox={`0 0 ${INSET_VIEW.width} ${INSET_VIEW.height}`}
            className="block h-auto w-full"
            role="presentation"
          >
            <clipPath id={`${uid}-clip`}>
              <rect x={0} y={0} width={INSET_VIEW.width} height={INSET_VIEW.height} />
            </clipPath>
            <g clipPath={`url(#${uid}-clip)`}>
              <path
                d={insetLandPath}
                fill="var(--color-wei-paper-dim)"
                stroke="var(--color-wei-ink)"
                strokeWidth={1}
                strokeLinejoin="round"
              />
              <path
                d={insetBorderPath}
                fill="none"
                stroke="var(--color-wei-line-strong)"
                strokeWidth={0.9}
                strokeDasharray="4 3"
              />
            </g>

            {/* Leaders first, so markers and dots sit on top */}
            {chips.map((c) => {
              const isActive = c.n === selected;
              const anchorX = c.side === "left" ? c.chipX + 12 : c.chipX - 12;
              return (
                <line
                  key={`l-${c.n}`}
                  data-pin=""
                  data-region={regionIndex(c.region)}
                  x1={c.insetX!}
                  y1={c.insetY!}
                  x2={anchorX}
                  y2={c.chipY}
                  stroke={isActive ? "var(--color-wei-emerald)" : "var(--color-wei-line-strong)"}
                  strokeWidth={isActive ? 1.25 : 0.75}
                />
              );
            })}

            {chips.map((c) => {
              const isActive = c.n === selected;
              const dim = selected !== null && !isActive;
              return (
                <g
                  key={`p-${c.n}`}
                  data-pin=""
                  data-region={regionIndex(c.region)}
                  className="cursor-pointer"
                  onClick={() => onSelect(isActive ? null : c.n)}
                >
                  {/* generous invisible hit target */}
                  <circle cx={c.insetX!} cy={c.insetY!} r={12} fill="transparent" />
                  <Pin x={c.insetX!} y={c.insetY!} active={isActive} dim={dim} r={3.75} />
                  <text
                    x={c.chipX}
                    y={c.chipY}
                    dy="0.34em"
                    textAnchor={c.side === "left" ? "start" : "end"}
                    className="wei-num"
                    fontSize={14}
                    fontWeight={isActive ? 600 : 400}
                    fill="var(--color-wei-ink)"
                    fillOpacity={isActive ? 1 : dim ? 0.32 : 0.7}
                    style={isActive ? { fill: "var(--color-wei-emerald-deep)" } : undefined}
                  >
                    {pad2(c.n)}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      <figcaption className="flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-wei-line px-4 py-3">
        <span className="wei-eyebrow text-wei-ink/55">Coastal Andhra Pradesh detail, right</span>
        <span className="wei-eyebrow ml-auto text-wei-ink/40">Boundaries: GADM India</span>
      </figcaption>
    </figure>
  );
}

function Pin({
  x,
  y,
  active,
  dim,
  r,
  onClick,
}: {
  x: number;
  y: number;
  active: boolean;
  dim: boolean;
  r: number;
  onClick?: () => void;
}) {
  return (
    <g onClick={onClick} className={onClick ? "cursor-pointer" : undefined}>
      {active ? (
        <circle cx={x} cy={y} r={r + 6} fill="none" stroke="var(--color-wei-emerald)" strokeWidth={1.25} opacity={0.5} />
      ) : null}
      <circle
        cx={x}
        cy={y}
        r={active ? r + 1.5 : r}
        fill={dim ? "var(--color-wei-ink)" : "var(--color-wei-emerald)"}
        fillOpacity={dim ? 0.3 : 1}
        stroke="var(--color-wei-paper)"
        strokeWidth={1.5}
      />
    </g>
  );
}
