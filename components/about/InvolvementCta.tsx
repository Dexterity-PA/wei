import { Reveal } from "@/components/Reveal";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { CtaLink } from "@/components/home/CtaLink";

/**
 * Closing call to action. Routes interested people to /contact. Emerald band to
 * end the page on the brand color rather than another paper block.
 */
export function InvolvementCta() {
  return (
    <section className="bg-wei-emerald text-wei-paper">
      <Container className="py-wei-section-lg">
        <div className="grid gap-x-wei-gutter gap-y-6 md:grid-cols-12">
          <div className="md:col-span-3">
            <Reveal>
              <Eyebrow index="06" tone="ink">
                Get involved
              </Eyebrow>
            </Reveal>
          </div>
          <div className="md:col-span-9 md:max-w-2xl">
            <Reveal>
              <h2 className="text-wei-3xl font-semibold text-balance text-wei-paper">
                Help us close the gap.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-wei-lg text-wei-paper/85">
                Whether you want to bring WEI to a school, lend your time, or
                simply learn more about the work, we would like to hear from you.
              </p>
            </Reveal>
            <Reveal delay={0.15} className="mt-8">
              <CtaLink href="/contact" tone="dark">
                Get in touch
              </CtaLink>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
