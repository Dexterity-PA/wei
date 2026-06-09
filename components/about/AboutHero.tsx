import { Reveal } from "@/components/Reveal";

/**
 * Opening statement for the About page. Makes the case for why WEI exists
 * before any history or detail. Paper surface, large display headline.
 */
export function AboutHero() {
  return (
    <section className="mx-auto max-w-6xl px-wei-gutter pt-wei-section-lg pb-wei-section">
      <div className="max-w-3xl">
        <Reveal>
          <p className="text-wei-sm font-semibold uppercase tracking-[0.18em] text-wei-emerald-deep">
            Why WEI exists
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="mt-5 font-wei-display text-wei-display font-semibold text-wei-ink">
            Financial literacy should not depend on who your parents are.
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-wei-lg text-wei-ink/80">
            The Wealth Equity Initiative is a student-founded nonprofit teaching
            financial literacy to students who would not otherwise get it. We
            start from a simple assumption: that no one at home has already
            explained how a paycheck, a bank account, or a loan actually works.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
