import { Reveal } from "@/components/Reveal";

type Offering = {
  title: string;
  body: string;
};

/**
 * Concrete work: the three things WEI actually puts in front of students, then
 * an honest line on the current footprint. The card grid reuses the hairline
 * divider treatment from the home stats grid for visual continuity.
 */
const offerings: Offering[] = [
  {
    title: "Tools",
    body: "Free calculators and planners for the decisions students actually face, from a first budget to a paycheck to the true cost of borrowing.",
  },
  {
    title: "Lessons",
    body: "Plain-language guides and a glossary that take a topic from never heard of it to I can use this, one step at a time.",
  },
  {
    title: "School partnerships",
    body: "Direct work with teachers and clubs to bring the material into classrooms, where it reaches students who would never go looking for it on their own.",
  },
];

export function WhatWeDoSection() {
  return (
    <section className="mx-auto max-w-6xl px-wei-gutter py-wei-section">
      <div className="max-w-3xl">
        <Reveal>
          <p className="text-wei-sm font-semibold uppercase tracking-[0.18em] text-wei-emerald-deep">
            What we do
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-4 font-wei-display text-wei-2xl font-semibold text-wei-ink text-balance">
            Tools, lessons, and the schools to put them in.
          </h2>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-wei-lg border border-wei-line bg-wei-line shadow-wei-soft md:grid-cols-3">
          {offerings.map((offering) => (
            <div key={offering.title} className="bg-wei-paper px-7 py-8">
              <h3 className="font-wei-display text-wei-lg font-semibold text-wei-ink">
                {offering.title}
              </h3>
              <p className="mt-3 text-wei-base text-wei-ink/75">
                {offering.body}
              </p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <p className="mt-8 max-w-2xl text-wei-base text-wei-ink/80">
          Today that work reaches more than{" "}
          <span className="font-semibold text-wei-emerald-deep">
            5,000+ students
          </span>{" "}
          across{" "}
          <span className="font-semibold text-wei-emerald-deep">
            40+ schools
          </span>
          . That is where we are now, not where we are stopping.
        </p>
      </Reveal>
    </section>
  );
}
