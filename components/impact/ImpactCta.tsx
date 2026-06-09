import { Reveal } from "@/components/Reveal";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { CtaLink } from "@/components/home/CtaLink";

/**
 * Closing call to action for the Impact page. Turns the reach story into an
 * invitation to extend it. Emerald band to end on the brand color, routing to
 * /contact where the educator path can be chosen.
 */
export function ImpactCta() {
  return (
    <section className="bg-wei-emerald text-wei-paper">
      <Container className="py-wei-section-lg">
        <div className="grid gap-x-wei-gutter gap-y-6 md:grid-cols-12">
          <div className="md:col-span-3">
            <Reveal>
              <Eyebrow index="04" tone="ink">
                Extend the map
              </Eyebrow>
            </Reveal>
          </div>
          <div className="md:col-span-9 md:max-w-2xl">
            <Reveal>
              <h2 className="text-wei-3xl font-semibold text-balance text-wei-paper">
                Bring WEI to a school we have not reached yet.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-wei-lg text-wei-paper/85">
                If you teach, run a program, or know a school that could use free,
                plain-language financial education, the next pin on this map could
                be yours. Tell us where, and we will take it from there.
              </p>
            </Reveal>
            <Reveal delay={0.15} className="mt-8">
              <CtaLink href="/contact" tone="dark">
                Bring WEI to a school
              </CtaLink>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
