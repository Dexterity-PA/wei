import { Reveal } from "@/components/Reveal";
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
    <section className="bg-wei-ink text-wei-paper">
      <div className="mx-auto max-w-6xl px-wei-gutter py-wei-section">
        <Reveal as="h2" className="text-wei-sm font-semibold uppercase tracking-[0.18em] text-wei-amber">
          The work so far
        </Reveal>

        <Reveal delay={0.06} className="mt-4 max-w-2xl">
          <p className="text-wei-lg text-wei-paper/75">
            Two figures, both verified. Everything else is the work still ahead
            of us.
          </p>
        </Reveal>

        <dl className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-wei-lg border border-wei-paper/15 bg-wei-paper/15 sm:grid-cols-2">
          {stats.map((stat, index) => {
            const { target, suffix } = parseStat(stat.value);
            return (
              <Reveal
                key={stat.label}
                delay={0.1 + index * 0.08}
                className="bg-wei-ink px-8 py-10"
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-wei-display text-wei-display font-semibold leading-none text-wei-paper">
                    <CountUp target={target} suffix={suffix} />
                  </span>
                  <span className="mt-3 block text-wei-base text-wei-paper/70">
                    {stat.label}
                  </span>
                </dd>
              </Reveal>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
