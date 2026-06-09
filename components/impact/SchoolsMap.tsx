"use client";

import { useId, useMemo, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { MAP, indiaOutline, project, schools } from "./schools";

/**
 * The signature element of the Impact page: a stylized, minimal silhouette of
 * India with the twelve named schools plotted by region. The silhouette is a
 * brand shape, not a survey map, and the copy frames the twelve as a
 * representative sample rather than the full reach.
 *
 * Interaction is driven from the labeled list, which is the accessible control.
 * The SVG pins mirror the selection for pointer users and are marked decorative.
 * Nothing here depends on motion: pins render in place and only the selected
 * state changes, so it reads correctly under prefers-reduced-motion.
 */
export function SchoolsMap() {
  const [selected, setSelected] = useState<number | null>(null);
  const headingId = useId();

  // The outline path is static; build it once.
  const outlinePath = useMemo(() => {
    const d = indiaOutline
      .map(([lon, lat], i) => {
        const [x, y] = project(lon, lat);
        return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(" ");
    return `${d} Z`;
  }, []);

  const points = useMemo(
    () =>
      schools.map((s) => {
        const [x, y] = project(s.lon, s.lat);
        return { ...s, x, y };
      }),
    [],
  );

  const active = points.find((p) => p.n === selected) ?? null;

  return (
    <section className="border-t border-wei-line bg-wei-paper-dim">
      <Container className="py-wei-section-lg">
        <div className="grid gap-x-wei-gutter gap-y-6 md:grid-cols-12">
          <div className="md:col-span-4 lg:col-span-3">
            <Reveal>
              <Eyebrow index="02">Where the work lands</Eyebrow>
            </Reveal>
          </div>
          <div className="md:col-span-8 md:max-w-2xl">
            <Reveal>
              <h2 id={headingId} className="text-wei-display font-semibold text-wei-ink">
                Twelve schools we can name.
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-5 text-wei-lg text-wei-ink/70">
                A representative sample of the schools WEI has reached, not the
                full list. The program began in India, clustered across coastal
                Andhra Pradesh and Telangana with one school in the far south at
                Nagercoil. The map is a stylized illustration, so positions are
                approximate by region rather than exact.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-12 grid gap-x-wei-gutter gap-y-10 lg:grid-cols-12">
          {/* The stylized map */}
          <Reveal className="lg:col-span-7">
            <figure className="border border-wei-line bg-wei-paper p-4 sm:p-6">
              <svg
                viewBox={`0 0 ${MAP.width} ${MAP.height}`}
                className="block h-auto w-full"
                role="img"
                aria-labelledby={`${headingId}-svg`}
              >
                <title id={`${headingId}-svg`}>
                  Stylized outline of India with twelve school locations marked,
                  clustered in coastal Andhra Pradesh and Telangana with one in
                  southern Tamil Nadu.
                </title>

                <path
                  d={outlinePath}
                  fill="var(--color-wei-paper-dim)"
                  stroke="var(--color-wei-line-strong)"
                  strokeWidth={1.5}
                  strokeLinejoin="round"
                />

                {points.map((p) => {
                  const isActive = p.n === selected;
                  return (
                    <g
                      key={p.n}
                      aria-hidden="true"
                      className="cursor-pointer"
                      onClick={() => setSelected(isActive ? null : p.n)}
                    >
                      {/* generous invisible hit target for touch */}
                      <circle cx={p.x} cy={p.y} r={16} fill="transparent" />
                      {isActive ? (
                        <circle
                          cx={p.x}
                          cy={p.y}
                          r={13}
                          fill="none"
                          stroke="var(--color-wei-emerald)"
                          strokeWidth={1.5}
                          opacity={0.5}
                        />
                      ) : null}
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r={isActive ? 6 : 4.5}
                        fill="var(--color-wei-emerald)"
                        stroke="var(--color-wei-paper)"
                        strokeWidth={1.5}
                      />
                    </g>
                  );
                })}
              </svg>

              <figcaption className="mt-4 flex min-h-[2.5rem] items-center border-t border-wei-line pt-4">
                {active ? (
                  <span className="wei-eyebrow text-wei-emerald-deep">
                    <span aria-hidden="true" className="text-wei-ink/40">
                      {String(active.n).padStart(2, "0")}
                    </span>{" "}
                    {active.name}
                    <span className="ml-2 normal-case tracking-normal text-wei-ink/55">
                      {active.location}
                    </span>
                  </span>
                ) : (
                  <span className="text-wei-sm text-wei-ink/55">
                    Select a school to highlight where it sits.
                  </span>
                )}
              </figcaption>
            </figure>
          </Reveal>

          {/* The selectable list */}
          <Reveal delay={0.08} className="lg:col-span-5">
            <h3 className="wei-eyebrow text-wei-ink/50">The twelve schools</h3>
            <ul className="mt-4 max-h-[30rem] divide-y divide-wei-line overflow-y-auto border-y border-wei-line">
              {points.map((p) => {
                const isActive = p.n === selected;
                return (
                  <li key={p.n}>
                    <button
                      type="button"
                      onClick={() => setSelected(isActive ? null : p.n)}
                      aria-pressed={isActive}
                      className={`flex w-full items-baseline gap-3 px-1 py-3 text-left transition-colors duration-[var(--duration-wei-fast)] ease-wei-out ${
                        isActive ? "bg-wei-paper-dim" : "hover:bg-wei-paper-dim/60"
                      }`}
                    >
                      <span
                        className={`wei-num shrink-0 text-wei-sm ${
                          isActive ? "text-wei-emerald-deep" : "text-wei-ink/40"
                        }`}
                      >
                        {String(p.n).padStart(2, "0")}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-wei-base font-medium text-wei-ink">
                          {p.name}
                        </span>
                        <span className="mt-0.5 block text-wei-xs text-wei-ink/55">
                          {p.location}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <p className="mt-4 text-wei-xs text-wei-ink/50">
              India is where WEI began. The mission is global; this toolkit is one
              instance of it, with more schools and regions ahead.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
