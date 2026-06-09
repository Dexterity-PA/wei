import { Reveal } from "@/components/Reveal";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";

const steps = [
  {
    n: "01",
    title: "You reach out",
    body: "Tell us about your school and your students through the contact page. A class, a club, a single session, or a recurring slot all work. We start from what you actually have.",
  },
  {
    n: "02",
    title: "We shape it to your students",
    body: "We take the lessons and tools and fit them to your time, your age group, and the level your students are starting from. You do not have to build a financial literacy unit from scratch.",
  },
  {
    n: "03",
    title: "We bring the material",
    body: "Free lessons, the everyday money tools, and a plain-language curriculum, ready to teach. The goal is for a student to leave able to reason about a paycheck, an account, or a loan.",
  },
  {
    n: "04",
    title: "We keep growing it with you",
    body: "We are student-led and still expanding what we offer. We would rather stay in touch and improve the fit over time than hand over a packet and disappear.",
  },
];

/**
 * The how-it-works section for partner schools, as a numbered sequence on the
 * hairline grid. Mono step indices carry the structure. No fabricated metrics or
 * outcomes, only what the process actually is.
 */
export function WhatPartneringLooksLike() {
  return (
    <Container as="section" className="py-wei-section-lg">
      <SectionHeader
        index="01"
        eyebrow="How it works"
        title="What partnering looks like."
        intro="Four steps, no cost, and nothing asked of a school that a classroom does not already have."
      />

      <Reveal delay={0.1}>
        <ol className="wei-hairgrid mt-12 grid grid-cols-1 sm:grid-cols-2">
          {steps.map((step) => (
            <li key={step.n} className="px-7 py-8">
              <span className="wei-num block text-wei-2xl font-semibold leading-none text-wei-emerald-deep">
                {step.n}
              </span>
              <h3 className="mt-5 text-wei-xl font-wei-display font-semibold text-wei-ink">
                {step.title}
              </h3>
              <p className="mt-3 text-wei-base text-wei-ink/75">{step.body}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </Container>
  );
}
