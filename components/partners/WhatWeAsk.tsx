import { Reveal } from "@/components/Reveal";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";

const asks = [
  "A point of contact at the school who can help us plan around your calendar.",
  "Time with students, whether that is one session or a recurring slot.",
  "Room to tailor the material to your classroom and the level your students start from.",
];

/**
 * What is asked of a partner school, kept short and honest, paired with a plain
 * statement that WEI is student-led and still growing. The education-only
 * boundary is restated as an intentional value, not buried fine print.
 */
export function WhatWeAsk() {
  return (
    <Container as="section" className="py-wei-section-lg">
      <div className="grid gap-x-wei-gutter gap-y-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Reveal>
            <Eyebrow index="03">What we ask</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 text-wei-3xl font-semibold text-wei-ink">
              Not much, and nothing financial.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="mt-8 border-t border-wei-line">
              {asks.map((ask, i) => (
                <li
                  key={i}
                  className="flex items-start gap-4 border-b border-wei-line py-4"
                >
                  <span aria-hidden="true" className="wei-num pt-1 text-wei-sm text-wei-emerald-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-wei-base text-wei-ink/80">{ask}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="md:col-span-7 md:pl-wei-gutter">
          <Reveal delay={0.1}>
            <div className="border border-wei-line border-l-2 border-l-wei-emerald bg-wei-paper px-7 py-8 md:px-10 md:py-10">
              <Eyebrow index="04">Honest about where we are</Eyebrow>
              <h3 className="mt-5 text-wei-2xl font-wei-display font-semibold text-balance text-wei-ink">
                Student-led, growing, and clear about the line.
              </h3>
              <div className="mt-5 space-y-5 text-wei-base text-wei-ink/80">
                <p>
                  WEI is run by students. That means we are honest about the scale
                  we work at and the pace we can grow. We would rather set
                  expectations plainly than overpromise to win a partnership.
                </p>
                <p>
                  It also means being clear about what we do: WEI provides
                  financial education, not regulated financial guidance. We teach
                  students how the tools and terms work so they can reason through
                  their own decisions. We do not tell anyone what to do with their
                  money, and we are not a substitute for a licensed professional.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Container>
  );
}
