"use client";

import { useId, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { SchoolsMap } from "./SchoolsMap";
import { schools, regions } from "./schools";

/**
 * The centerpiece of the Impact page. The twelve named schools are the hero,
 * set as a large editorial list with a mono index, the school name in display
 * type, and a quiet mono location. The accurate India map supports the list:
 * selecting, hovering, or keyboard-focusing a school highlights its pin, and
 * the map mirrors the selection back through the readout header.
 *
 * The list is the accessible control (real buttons, focusable, selectable by
 * keyboard); the map is decorative and aria-hidden. Region counts are derived
 * from the data so the framing stays honest if the sample ever changes.
 */
export function SchoolsSection() {
  const [selected, setSelected] = useState<number | null>(null);
  const headingId = useId();

  const regionCounts = regions
    .map((region) => ({ region, count: schools.filter((s) => s.region === region).length }))
    .filter((r) => r.count > 0);

  return (
    <section aria-labelledby={headingId} className="border-t border-wei-line bg-wei-paper">
      <Container className="py-wei-section-lg">
        <div className="grid gap-x-wei-gutter gap-y-6 md:grid-cols-12">
          <div className="md:col-span-4 lg:col-span-3">
            <Reveal>
              <Eyebrow index="02">A representative sample</Eyebrow>
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
                These are twelve of the schools WEI has taught in, the ones we can
                name with confidence. They are a representative sample of a wider
                footprint, not the whole of it. Most sit along the coast of
                northeast Andhra Pradesh, a few inland in Telangana, and one at the
                southern tip of the country.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-12 grid gap-x-wei-gutter gap-y-12 lg:grid-cols-12">
          {/* The schools list: the visual hero */}
          <div className="lg:col-span-7">
            <h3 className="wei-eyebrow flex items-baseline justify-between border-b border-wei-line pb-3 text-wei-ink/50">
              <span>The twelve schools</span>
              <span aria-hidden="true" className="text-wei-ink/35">
                01&ndash;12
              </span>
            </h3>
            <ul className="divide-y divide-wei-line">
              {schools.map((s) => {
                const isActive = s.n === selected;
                return (
                  <li key={s.n}>
                    <button
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setSelected(isActive ? null : s.n)}
                      onMouseEnter={() => setSelected(s.n)}
                      onFocus={() => setSelected(s.n)}
                      className={`group relative flex w-full items-baseline gap-4 py-5 pl-4 pr-2 text-left transition-colors duration-[var(--duration-wei-fast)] ease-wei-out sm:gap-6 sm:pl-6 ${
                        isActive ? "bg-wei-paper-dim" : "hover:bg-wei-paper-dim/60"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`absolute inset-y-0 left-0 w-0.5 transition-colors duration-[var(--duration-wei-fast)] ${
                          isActive ? "bg-wei-emerald" : "bg-transparent"
                        }`}
                      />
                      <span
                        className={`wei-num shrink-0 text-wei-lg ${
                          isActive ? "text-wei-emerald-deep" : "text-wei-ink/40"
                        }`}
                      >
                        {String(s.n).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-wei-display text-wei-xl font-semibold leading-tight text-wei-ink">
                          {s.name}
                        </span>
                        <span className="mt-1.5 block text-wei-xs text-wei-ink/55">{s.location}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <p className="mt-6 max-w-xl text-wei-xs text-wei-ink/50">
              India is where WEI began. The mission is not bound to one map: it is
              that financial knowledge should not depend on the household or zip
              code a student was born into, wherever that student lives.
            </p>
          </div>

          {/* The supporting map */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <Reveal>
                <SchoolsMap selected={selected} onSelect={setSelected} />
              </Reveal>

              <dl className="wei-hairgrid mt-px grid grid-cols-2 border-x border-b border-wei-line">
                {regionCounts.map(({ region, count }) => (
                  <div key={region} className="px-4 py-3">
                    <dt className="text-wei-xs text-wei-ink/60">{region}</dt>
                    <dd className="wei-num mt-1 text-wei-base font-medium text-wei-ink">
                      {count} {count === 1 ? "school" : "schools"}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-wei-xs text-wei-ink/45">
                The outline and state borders are drawn from real India geometry.
                Pin positions are approximate, placed by region rather than as
                exact addresses.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
