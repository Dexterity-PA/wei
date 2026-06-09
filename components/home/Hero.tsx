import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";
import { CtaLink } from "./CtaLink";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-wei-line bg-wei-paper">
      {/* Soft editorial wash behind the headline. Decorative only. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_55%_at_18%_0%,color-mix(in_srgb,var(--color-wei-emerald)_12%,transparent),transparent_70%)]"
      />
      <div className="mx-auto max-w-6xl px-wei-gutter py-wei-section-lg">
        <div className="max-w-3xl">
          <Reveal as="p" className="flex items-center gap-3">
            <span className="h-px w-8 bg-wei-emerald-deep" aria-hidden="true" />
            <span className="text-wei-sm font-semibold uppercase tracking-[0.18em] text-wei-emerald-deep">
              {site.name}
            </span>
          </Reveal>

          <Reveal as="h1" delay={0.05} className="mt-6">
            <span className="font-wei-display text-wei-display font-semibold text-wei-ink">
              Money knowledge belongs to every student, not just a lucky few.
            </span>
          </Reveal>

          <Reveal as="p" delay={0.12} className="mt-7 max-w-2xl">
            <span className="block text-wei-lg text-wei-ink/80">
              The Wealth Equity Initiative is a student-founded nonprofit bringing
              practical financial literacy to the classrooms that have gone
              without it. Free tools, plain-language lessons, built by students
              for students.
            </span>
          </Reveal>

          <Reveal delay={0.18} className="mt-10 flex flex-wrap items-center gap-4">
            <CtaLink href="/tools">Explore the toolkit</CtaLink>
            <CtaLink href="/about" variant="secondary">
              Why we exist
            </CtaLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
