import { Reveal } from "@/components/Reveal";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { CtaLink } from "@/components/home/CtaLink";

/**
 * Closing call to action for the Partners page. Routes schools and educators to
 * /contact, where the educator path can be chosen. Emerald band to end on the
 * brand color.
 */
export function PartnersCta() {
  return (
    <section className="bg-wei-emerald text-wei-paper">
      <Container className="py-wei-section-lg">
        <div className="grid gap-x-wei-gutter gap-y-6 md:grid-cols-12">
          <div className="md:col-span-3">
            <Reveal>
              <Eyebrow index="05" tone="ink">
                Get started
              </Eyebrow>
            </Reveal>
          </div>
          <div className="md:col-span-9 md:max-w-2xl">
            <Reveal>
              <h2 className="text-wei-3xl font-semibold text-balance text-wei-paper">
                Let us bring it to your students.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-wei-lg text-wei-paper/85">
                Reach out through the contact page and choose the educator path.
                Tell us about your school, and we will work out what a session or a
                series could look like for your classroom.
              </p>
            </Reveal>
            <Reveal delay={0.15} className="mt-8">
              <CtaLink href="/contact" tone="dark">
                Contact the team
              </CtaLink>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
