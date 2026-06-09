import { Reveal } from "@/components/Reveal";
import { SplitReveal } from "@/components/SplitReveal";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { site } from "@/lib/site";
import { motion } from "@/lib/animation/motion";
import { CtaLink } from "./CtaLink";
import { OpportunityGapChart } from "./OpportunityGapChart";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-wei-line bg-wei-paper">
      {/* Restrained editorial wash behind the headline. Decorative only. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(55%_50%_at_12%_-5%,color-mix(in_srgb,var(--color-wei-emerald)_9%,transparent),transparent_68%)]"
      />
      {/* Hero keeps its own tighter vertical rhythm (not the shared section-lg)
          so the full split — headline + subcopy + CTAs alongside the chart —
          fits within one desktop viewport down to 800px tall. */}
      <Container className="pt-[clamp(2.25rem,1.5rem+1.8vw,2.75rem)] pb-wei-section">
        <div className="grid items-center gap-x-wei-gutter gap-y-14 lg:grid-cols-12">
          {/* Left-weighted headline column */}
          <div className="lg:col-span-6">
            <Reveal as="div" className="flex items-center gap-3">
              <span className="h-px w-8 bg-wei-emerald-deep" aria-hidden="true" />
              <Eyebrow>{site.name}</Eyebrow>
            </Reveal>

            <SplitReveal
              as="h1"
              trigger="mount"
              delay={motion.stagger.item}
              className="mt-7 text-wei-hero font-semibold text-wei-ink"
            >
              Money knowledge belongs to every student, not just a lucky few.
            </SplitReveal>

            <Reveal as="p" delay={motion.stagger.item * 3} className="mt-7 max-w-xl">
              <span className="block text-wei-base text-wei-ink/75">
                The Wealth Equity Initiative is a student-founded nonprofit
                bringing practical financial literacy to the classrooms that have
                gone without it. Free tools, plain-language lessons, built by
                students for students.
              </span>
            </Reveal>

            <Reveal
              delay={motion.stagger.item * 4}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <CtaLink href="/tools">Explore the toolkit</CtaLink>
              <CtaLink href="/about" variant="secondary">
                Why we exist
              </CtaLink>
            </Reveal>
          </div>

          {/* Mission-carrying graphic */}
          <Reveal delay={0.1} className="lg:col-span-6">
            <OpportunityGapChart />
            <p className="mt-4 max-w-md text-wei-sm text-wei-ink/60">
              The same starting line, ten years apart. A student who learns how
              money works early keeps pulling ahead of one who never got the
              chance. Closing that gap is the whole point.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
