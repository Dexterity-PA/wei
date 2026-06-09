import { Reveal } from "@/components/Reveal";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { stats } from "@/lib/site";

/**
 * What the reach adds up to. Sits on the dark ink band and ties the two verified
 * figures (the only statistics permitted on the site) to what they mean for the
 * students behind them. Numbers are set in tabular mono. No invented metrics.
 */
export function MissionImpact() {
  return (
    <section className="bg-wei-ink text-wei-paper">
      <Container className="py-wei-section-lg">
        <div className="grid gap-x-wei-gutter gap-y-6 md:grid-cols-12">
          <div className="md:col-span-4 lg:col-span-3">
            <Reveal>
              <Eyebrow index="03" tone="ink">
                What the reach means
              </Eyebrow>
            </Reveal>
          </div>
          <div className="md:col-span-8 md:max-w-2xl">
            <Reveal>
              <h2 className="text-wei-3xl font-semibold text-balance text-wei-paper">
                Every figure here is a room full of students who now have a place
                to start.
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-5 text-wei-lg text-wei-paper/75">
                The twelve schools on the map are the part we can name. Behind
                them sits a wider body of work, and two figures we are willing to
                stand behind. We do not inflate them, and we do not claim more
                than we have done.
              </p>
            </Reveal>
          </div>
        </div>

        <dl className="wei-hairgrid wei-hairgrid-ink mt-12 grid grid-cols-1 sm:grid-cols-2">
          {stats.map((stat) => (
            <Reveal key={stat.label} className="px-7 py-10">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="wei-num block text-wei-display font-semibold leading-none text-wei-paper">
                  {stat.value}
                </span>
                <span className="mt-4 block text-wei-sm text-wei-paper/65">
                  {stat.label}
                </span>
              </dd>
            </Reveal>
          ))}
        </dl>

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl text-wei-base text-wei-paper/70">
            Reaching a student early changes the questions they are able to ask
            later: before a first paycheck, a first account, a first loan. That is
            the whole point of starting in the classroom rather than waiting for
            someone to go looking for help.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
