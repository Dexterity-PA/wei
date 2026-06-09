import { Reveal } from "@/components/Reveal";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";

/**
 * Opening statement for the Impact page. Anchors the page in the mission and in
 * an honest account of where WEI actually started, before the schools map makes
 * the reach concrete. Paper surface, large display headline.
 */
export function ImpactHero() {
  return (
    <Container as="section" className="pt-wei-section-lg pb-wei-section">
      <div className="max-w-4xl">
        <Reveal>
          <Eyebrow>Where WEI started</Eyebrow>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="mt-6 text-wei-display font-semibold text-wei-ink">
            Financial knowledge should not depend on the zip code you were born
            into.
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-wei-lg text-wei-ink/70">
            The Wealth Equity Initiative did not start as a website. It started in
            classrooms, in a handful of schools where no one had walked students
            through how a bank account, a paycheck, or interest actually works.
            This page is an honest look at that ground-level reach, the part of
            the work you cannot see from a homepage.
          </p>
        </Reveal>
      </div>
    </Container>
  );
}
