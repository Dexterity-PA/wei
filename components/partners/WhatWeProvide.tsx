import { Reveal } from "@/components/Reveal";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";

const provisions = [
  {
    label: "Free lessons",
    body: "Short, mobile-first modules that build financial literacy step by step, each written for students meeting these ideas for the first time.",
  },
  {
    label: "Everyday tools",
    body: "Plain calculators and planners that show how the numbers behind a real decision move, so a concept is something a student can see, not just hear.",
  },
  {
    label: "Plain-language curriculum",
    body: "A teachable structure that ties the lessons together, jargon defined as it appears, ready to drop into the time a classroom can give it.",
  },
  {
    label: "A working glossary",
    body: "Plain-language definitions of the money and banking terms students keep running into, so no one gets stuck on a word.",
  },
];

/**
 * What a partner school actually receives. Hairline grid of provisions with mono
 * labels. Everything listed is something WEI already offers on this site; no
 * invented programs or guarantees.
 */
export function WhatWeProvide() {
  return (
    <section className="border-y border-wei-line bg-wei-paper-dim">
      <Container className="py-wei-section-lg">
        <div className="grid gap-x-wei-gutter gap-y-6 md:grid-cols-12">
          <div className="md:col-span-4 lg:col-span-3">
            <Reveal>
              <Eyebrow index="02">What WEI provides</Eyebrow>
            </Reveal>
          </div>
          <div className="md:col-span-8 md:max-w-2xl">
            <Reveal>
              <h2 className="text-wei-display font-semibold text-wei-ink">
                Everything needed to teach, brought to you.
              </h2>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.1}>
          <dl className="wei-hairgrid mt-12 grid grid-cols-1 bg-wei-paper sm:grid-cols-2">
            {provisions.map((item) => (
              <div key={item.label} className="px-7 py-8">
                <dt className="wei-eyebrow text-wei-emerald-deep">{item.label}</dt>
                <dd className="mt-4 text-wei-base text-wei-ink/75">{item.body}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
