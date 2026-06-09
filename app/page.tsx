import { Reveal } from "@/components/Reveal";
import { site, stats } from "@/lib/site";

export default function HomePage() {
  return (
    <section className="mx-auto max-w-6xl px-wei-gutter py-wei-section-lg">
      <div className="max-w-3xl">
        <Reveal>
          <p className="text-wei-sm font-semibold uppercase tracking-[0.18em] text-wei-emerald-deep">
            {site.shortName}
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="mt-5 font-wei-display text-wei-display font-semibold text-wei-ink">
            Financial knowledge is a first step toward equity.
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-wei-lg text-wei-ink/80">
            {site.mission} We are a student-founded nonprofit building
            plain-language guides and everyday money tools for students across
            the country.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.15}>
        <dl className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-wei-lg border border-wei-line bg-wei-line shadow-wei-soft sm:grid-cols-2">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-wei-paper px-7 py-8">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block font-wei-display text-wei-3xl font-semibold text-wei-emerald-deep">
                  {stat.value}
                </span>
                <span className="mt-1 block text-wei-base text-wei-ink/70">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
