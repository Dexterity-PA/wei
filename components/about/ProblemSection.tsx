import { Reveal } from "@/components/Reveal";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";

/**
 * The problem WEI is responding to. Honest and specific about who the literacy
 * gap falls hardest on, without lecturing. Editorial layout on the 12-column
 * grid: label and heading on the left, the argument on the right.
 */
export function ProblemSection() {
  return (
    <section className="border-t border-wei-line bg-wei-paper-dim">
      <Container className="py-wei-section">
        <div className="grid gap-x-wei-gutter gap-y-8 md:grid-cols-12">
          <div className="md:col-span-5 lg:col-span-4">
            <Reveal>
              <Eyebrow index="01">The problem</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 font-wei-display text-wei-2xl font-semibold text-balance text-wei-ink">
                The gap is real, and it is not evenly shared.
              </h2>
            </Reveal>
          </div>

          <div className="space-y-5 text-wei-base text-wei-ink/80 md:col-span-7 md:max-w-2xl">
            <Reveal delay={0.1}>
              <p>
                Hardly anyone is taught how money works. Most US schools do not
                require a personal finance course to graduate, so the subject gets
                handed off to families to cover on their own.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p>
                For students whose parents can walk them through a budget or a
                credit score, that arrangement works out fine. For students whose
                families are stretched thin, new to the country, or never had the
                chance to learn it themselves, the lesson tends to arrive later and
                cost more: a first overdraft, a high-interest loan, a credit
                history they did not know they were already building.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p>
                The result is a quiet, compounding disadvantage. It rarely shows
                up on a report card, but it follows students into every financial
                decision they make as adults.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
