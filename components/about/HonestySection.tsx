import { Reveal } from "@/components/Reveal";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";

/**
 * What WEI is not. States the education-only boundary plainly. This does the
 * legal duty, but it is framed as an intentional value, not fine print, so it
 * gets a deliberate callout with an emerald edge rather than a footer note.
 */
export function HonestySection() {
  return (
    <Container as="section" className="py-wei-section">
      <Reveal>
        <div className="max-w-3xl border border-wei-line border-l-2 border-l-wei-emerald bg-wei-paper px-7 py-8 md:px-10 md:py-10">
          <Eyebrow index="05">Where we draw the line</Eyebrow>
          <h2 className="mt-5 font-wei-display text-wei-2xl font-semibold text-balance text-wei-ink">
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
              useful, and more honest, than handing them an answer and asking them
              to trust it.
            </p>
          </div>
        </div>
      </Reveal>
    </Container>
  );
}
