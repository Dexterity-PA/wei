import { Reveal } from "@/components/Reveal";

/**
 * What WEI is not. States the education-only boundary plainly. This does the
 * legal duty, but it is framed as an intentional value, not fine print, so it
 * gets a deliberate callout with an emerald edge rather than a footer note.
 */
export function HonestySection() {
  return (
    <section className="mx-auto max-w-6xl px-wei-gutter py-wei-section">
      <Reveal>
        <div className="max-w-3xl rounded-wei-lg border border-wei-line border-l-4 border-l-wei-emerald bg-wei-paper px-7 py-8 shadow-wei-soft md:px-10 md:py-10">
          <p className="text-wei-sm font-semibold uppercase tracking-[0.18em] text-wei-emerald-deep">
            Where we draw the line
          </p>
          <h2 className="mt-4 font-wei-display text-wei-2xl font-semibold text-wei-ink text-balance">
            We teach. We do not stand in for a professional.
          </h2>
          <div className="mt-5 space-y-5 text-wei-base text-wei-ink/80">
            <p>
              One thing matters enough to say plainly: WEI provides financial
              education, not regulated financial guidance. We explain how the
              tools work and what the terms mean, so students can reason through
              their own decisions with their eyes open.
            </p>
            <p>
              We do not tell any individual what to do with their money, and we
              are not a substitute for a licensed professional. We hold that line
              on purpose. Teaching people to think clearly about money is more
              useful, and more honest, than handing them an answer and asking
              them to trust it.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
