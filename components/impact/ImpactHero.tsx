import { Reveal } from "@/components/Reveal";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { stats } from "@/lib/site";

/**
 * Opening statement for the Impact page. Anchors the page in the mission and in
 * an honest account of where WEI actually started, then leads with weight: the
 * two verified figures (the only statistics permitted on the site) set large in
 * tabular mono and framed as the current footprint, with more ahead.
 */
export function ImpactHero() {
  return (
    <Container as="section" className="pt-wei-section-lg pb-wei-section">
      <div className="max-w-4xl">
        <Reveal>
          <Eyebrow index="01">Where WEI started</Eyebrow>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="mt-6 text-wei-display font-semibold text-wei-ink">
            Financial knowledge should not depend on the household or zip code you
            were born into.
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-wei-lg text-wei-ink/70">
            The Wealth Equity Initiative did not start as a website. It started in
            classrooms, in a handful of schools where no one had walked students
            through how a bank account, a paycheck, or interest actually works.
            This page is an honest look at that ground-level reach, the part of the
            work you cannot see from a homepage.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.15} className="mt-12 lg:mt-16">
        <dl className="wei-hairgrid grid grid-cols-1 sm:grid-cols-2">
          {stats.map((stat) => (
            <div key={stat.label} className="px-6 py-8 sm:px-7 sm:py-10">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="wei-num block text-wei-display font-semibold leading-none text-wei-ink">
                  {stat.value}
                </span>
                <span className="mt-4 block text-wei-sm text-wei-ink/65">{stat.label}</span>
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 max-w-2xl text-wei-base text-wei-ink/60">
          These are the figures we stand behind today, the current footprint of
          the work. They describe where WEI has reached so far, with more schools
          and more regions ahead.
        </p>
      </Reveal>
    </Container>
  );
}
