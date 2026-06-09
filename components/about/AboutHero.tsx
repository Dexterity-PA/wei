import { Reveal } from "@/components/Reveal";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";

/**
 * Opening statement for the About page. Makes the case for why WEI exists
 * before any history or detail. Paper surface, large display headline.
 */
export function AboutHero() {
  return (
    <Container as="section" className="pt-wei-section-lg pb-wei-section">
      <div className="max-w-4xl">
        <Reveal>
          <Eyebrow>Why WEI exists</Eyebrow>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="mt-6 text-wei-display font-semibold text-wei-ink">
            Financial literacy should not depend on who your parents are.
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-wei-lg text-wei-ink/70">
            The Wealth Equity Initiative is a student-founded nonprofit teaching
            financial literacy to students who would not otherwise get it. We
            start from a simple assumption: that no one at home has already
            explained how a paycheck, a bank account, or a loan actually works.
          </p>
        </Reveal>
      </div>
    </Container>
  );
}
