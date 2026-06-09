import { Reveal } from "@/components/Reveal";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";

/**
 * Origin story. Credible and grounded: who started WEI and why it being
 * student-built is the point, not a footnote. Paper-dim band sets it apart from
 * the surrounding paper sections without another full dark band.
 */
export function FounderSection() {
  return (
    <section className="border-y border-wei-line bg-wei-paper-dim">
      <Container className="py-wei-section">
        <div className="grid gap-x-wei-gutter gap-y-8 md:grid-cols-12">
          <div className="md:col-span-5 lg:col-span-4">
            <Reveal>
              <Eyebrow index="04">Origin</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 font-wei-display text-wei-2xl font-semibold text-balance text-wei-ink">
                Built by a student who kept seeing the same gap.
              </h2>
            </Reveal>
          </div>

          <div className="space-y-5 text-wei-base text-wei-ink/80 md:col-span-7 md:max-w-2xl">
            <Reveal delay={0.1}>
              <p>
                WEI was founded by Praneeth Annapureddy, a student who kept
                running into the same thing: classmates who were sharp in every
                subject the school graded, and who had never been shown how a
                credit card statement or a tax form works.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p>
                The reason a student built this is the same reason it works. The
                distance between the person explaining money and the person
                learning it is short, so nothing in the material assumes a
                vocabulary or a head start that students do not have. It is the
                resource he wished someone had handed him, written for the people
                who need it for the same reasons.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
