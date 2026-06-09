import { Reveal } from "@/components/Reveal";

/**
 * The problem WEI is responding to. Honest and specific about who the literacy
 * gap falls hardest on, without lecturing. Editorial two-column layout on wide
 * screens: heading on the left, the argument on the right.
 */
export function ProblemSection() {
  return (
    <section className="border-t border-wei-line bg-wei-paper-dim">
      <div className="mx-auto grid max-w-6xl gap-10 px-wei-gutter py-wei-section md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <div>
          <Reveal>
            <p className="text-wei-sm font-semibold uppercase tracking-[0.18em] text-wei-emerald-deep">
              The problem
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 font-wei-display text-wei-2xl font-semibold text-wei-ink text-balance">
              The gap is real, and it is not evenly shared.
            </h2>
          </Reveal>
        </div>

        <div className="max-w-2xl space-y-5 text-wei-base text-wei-ink/80">
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
              The result is a quiet, compounding disadvantage. It rarely shows up
              on a report card, but it follows students into every financial
              decision they make as adults.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
