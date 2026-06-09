import { Reveal } from "@/components/Reveal";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";

type Offering = {
  index: string;
  title: string;
  body: string;
};

/**
 * Concrete work: the three things WEI actually puts in front of students, then
 * an honest line on the current footprint. The cards share edges in the hairline
 * grid, matching the treatment used across the site.
 */
const offerings: Offering[] = [
  {
    index: "01",
    title: "Tools",
    body: "Free calculators and planners for the decisions students actually face, from a first budget to a paycheck to the true cost of borrowing.",
  },
  {
    index: "02",
    title: "Lessons",
    body: "Plain-language guides and a glossary that take a topic from never heard of it to I can use this, one step at a time.",
  },
  {
    index: "03",
    title: "School partnerships",
    body: "Direct work with teachers and clubs to bring the material into classrooms, where it reaches students who would never go looking for it on their own.",
  },
];

export function WhatWeDoSection() {
  return (
    <Container as="section" className="py-wei-section">
      <Reveal>
        <SectionHeader
          index="03"
          eyebrow="What we do"
          title="Tools, lessons, and the schools to put them in."
        />
      </Reveal>

      <Reveal delay={0.1}>
        <div className="wei-hairgrid mt-12 grid grid-cols-1 md:grid-cols-3">
          {offerings.map((offering) => (
            <div key={offering.title} className="p-7">
              <span className="wei-num text-wei-sm text-wei-ink/35">
                {offering.index}
              </span>
              <h3 className="mt-5 font-wei-display text-wei-lg font-semibold text-wei-ink">
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
          <span className="wei-num font-semibold text-wei-emerald-deep">
            5,000+
          </span>{" "}
          students across{" "}
          <span className="wei-num font-semibold text-wei-emerald-deep">
            40+
          </span>{" "}
          schools. That is where we are now, not where we are stopping.
        </p>
      </Reveal>
    </Container>
  );
}
