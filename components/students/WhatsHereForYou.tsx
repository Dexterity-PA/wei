import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";

type Offering = {
  index: string;
  title: string;
  body: string;
  href: string;
  cta: string;
};

const offerings: Offering[] = [
  {
    index: "01",
    title: "Free tools",
    body: "Calculators and planners for the decisions you actually face: build a budget, set a savings goal, see what borrowing really costs. No logins, no fees.",
    href: "/tools",
    cta: "Open the tools",
  },
  {
    index: "02",
    title: "Lessons",
    body: "Short lessons built for your phone, each with a quick quiz to check what stuck. Five minutes, something real to keep. Start anywhere that looks useful.",
    href: "/learn",
    cta: "Browse lessons",
  },
  {
    index: "03",
    title: "Glossary",
    body: "Plain-language definitions for the money and banking words that get thrown around like everyone already knows them. Look one up the moment it trips you.",
    href: "/glossary",
    cta: "Open the glossary",
  },
  {
    index: "04",
    title: "Downloadable resources",
    body: "Guides and worksheets you can save, print, and keep. Useful when you want something on paper, or something to come back to later.",
    href: "/resources",
    cta: "Get the resources",
  },
];

/**
 * The four things waiting for a student, each a full-card link into its section.
 * Hairline-bordered grid so the cards share edges and read as one designed
 * index rather than four floating tiles.
 */
export function WhatsHereForYou() {
  return (
    <section
      id="whats-here"
      className="scroll-mt-24 border-y border-wei-line bg-wei-paper"
    >
      <Container className="py-wei-section">
        <Reveal>
          <SectionHeader
            index="01"
            eyebrow="What's here for you"
            title="Everything here is free, and built for you."
            intro="Four ways in. None of them ask anything of you up front. Take whichever one matches what is on your mind right now."
          />
        </Reveal>

        <div className="wei-hairgrid mt-12 grid grid-cols-1 sm:grid-cols-2">
          {offerings.map((item, index) => (
            <Reveal key={item.title} delay={0.1 + index * 0.06}>
              <Link
                href={item.href}
                className="group flex h-full flex-col p-7 transition-colors duration-[var(--duration-wei-fast)] ease-wei-out hover:bg-wei-paper-dim/60"
              >
                <span className="wei-num text-wei-sm text-wei-ink/35">
                  {item.index}
                </span>
                <h3 className="mt-5 font-wei-display text-wei-xl font-semibold text-wei-ink">
                  {item.title}
                </h3>
                <p className="mt-3 text-wei-sm text-wei-ink/75">{item.body}</p>
                <span className="wei-eyebrow mt-7 inline-flex items-center gap-1.5 text-wei-emerald-deep">
                  {item.cta}
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
