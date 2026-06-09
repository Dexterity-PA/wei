import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";

type Step = {
  index: string;
  title: string;
  body: string;
  href: string;
  cta: string;
};

const steps: Step[] = [
  {
    index: "01",
    title: "Try one tool",
    body: "Pick a calculator that matches something on your mind and run your own numbers. Seeing it with real figures is where it clicks.",
    href: "/tools",
    cta: "Open the tools",
  },
  {
    index: "02",
    title: "Take one lesson",
    body: "Read a short module and take the quiz at the end. It is quick, and you walk away with one thing you did not have before.",
    href: "/learn",
    cta: "Browse lessons",
  },
  {
    index: "03",
    title: "Look up a word",
    body: "Hit a term you do not know? The glossary has it in plain language, no jargon hiding behind more jargon.",
    href: "/glossary",
    cta: "Open the glossary",
  },
  {
    index: "04",
    title: "Keep going",
    body: "Save a resource, share it with a friend, or come back when the next money question shows up. There is no finish line to race to.",
    href: "/resources",
    cta: "Get the resources",
  },
];

/**
 * A simple, encouraging path through the page. Numbered steps on a hairline
 * index list so it reads as a calm sequence, not a checklist with homework
 * energy. Each step links into the section it points at.
 */
export function HowToGetStarted() {
  return (
    <section className="border-b border-wei-line bg-wei-paper-dim">
      <Container className="py-wei-section">
        <Reveal>
          <SectionHeader
            index="02"
            eyebrow="How to start"
            title="A simple way in, one step at a time."
            intro="No order is required and nothing is graded. This is just an easy path if you are not sure where to begin."
          />
        </Reveal>

        <div className="mt-12 border-t border-wei-line">
          {steps.map((step, index) => (
            <Reveal
              key={step.title}
              delay={0.08 + index * 0.06}
              className="border-b border-wei-line"
            >
              <Link
                href={step.href}
                className="group grid grid-cols-1 items-baseline gap-x-wei-gutter gap-y-3 py-7 transition-colors duration-[var(--duration-wei-fast)] ease-wei-out hover:bg-wei-paper/70 sm:grid-cols-12"
              >
                <div className="flex items-baseline gap-4 sm:col-span-4">
                  <span className="wei-num text-wei-sm text-wei-ink/35">
                    {step.index}
                  </span>
                  <h3 className="font-wei-display text-wei-xl font-semibold text-wei-ink">
                    {step.title}
                  </h3>
                </div>
                <p className="text-wei-sm text-wei-ink/75 sm:col-span-6">
                  {step.body}
                </p>
                <span className="wei-eyebrow inline-flex items-center gap-1.5 text-wei-emerald-deep sm:col-span-2 sm:justify-end sm:text-right">
                  {step.cta}
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-[var(--duration-wei-fast)] ease-wei-out group-hover:translate-x-0.5"
                  >
                    &rarr;
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
