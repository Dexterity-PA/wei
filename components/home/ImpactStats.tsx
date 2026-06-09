import { Reveal } from "@/components/Reveal";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { stats } from "@/lib/site";
import { CountUp } from "./CountUp";

/** Split a stat string like "5,000+" into its number and trailing suffix. */
function parseStat(value: string): { target: number; suffix: string } {
  const match = value.match(/^([\d,]+)(.*)$/);
  if (!match) return { target: 0, suffix: value };
  return { target: Number(match[1].replace(/,/g, "")), suffix: match[2] };
}

export function ImpactStats() {
  return (
    <section className="border-b border-wei-line-ink bg-wei-ink text-wei-paper">
      <Container className="py-wei-section">
        <div className="grid gap-x-wei-gutter gap-y-6 md:grid-cols-12">
          <div className="md:col-span-4 lg:col-span-3">
            <Reveal>
              <Eyebrow index="02" tone="ink">
                The work so far
              </Eyebrow>
            </Reveal>
          </div>
          <div className="md:col-span-8 md:max-w-xl">
            <Reveal delay={0.06}>
              <p className="text-wei-base text-wei-paper/70">
                Two figures, both verified. Everything else is the work still
                ahead of us.
              </p>
            </Reveal>
          </div>
        </div>

        <dl className="wei-hairgrid wei-hairgrid-ink mt-12 grid grid-cols-1 sm:grid-cols-2">
          {stats.map((stat, index) => {
            const { target, suffix } = parseStat(stat.value);
            return (
              <Reveal
                key={stat.label}
                delay={0.1 + index * 0.08}
                className="px-7 py-10"
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <CountUp
                    target={target}
                    suffix={suffix}
                    className="wei-num block text-wei-display font-semibold leading-none text-wei-paper"
                  />
                  <span className="mt-4 block text-wei-sm text-wei-paper/65">
                    {stat.label}
                  </span>
                </dd>
              </Reveal>
            );
          })}
        </dl>
      </Container>
    </section>
  );
}
