import { Reveal } from "@/components/Reveal";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";

/**
 * The mission: what WEI is doing about the problem. Rendered as a full-bleed
 * dark band for emphasis, the emotional center of the page. The dark anchor and
 * the large heading carry the weight; color stays restrained.
 */
export function MissionSection() {
  return (
    <section className="bg-wei-ink text-wei-paper">
      <Container className="py-wei-section-lg">
        <div className="grid gap-x-wei-gutter gap-y-6 md:grid-cols-12">
          <div className="md:col-span-3">
            <Reveal>
              <Eyebrow index="02" tone="ink">
                Our mission
              </Eyebrow>
            </Reveal>
          </div>
          <div className="md:col-span-9 md:max-w-3xl">
            <Reveal>
              <h2 className="text-wei-3xl font-semibold text-balance text-wei-paper">
                Close the gap, for free, at a scale a single classroom cannot
                reach.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-2xl text-wei-lg text-wei-paper/75">
                WEI exists to put financial literacy within reach of every
                student, whatever their zip code or family background. Two choices
                keep that possible. The material is free, and it is built to
                travel past the limits of any one teacher or room. Because the
                people writing it are students themselves, the explanations stay
                close to how students actually think about money.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
