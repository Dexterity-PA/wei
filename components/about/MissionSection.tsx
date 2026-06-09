import { Reveal } from "@/components/Reveal";

/**
 * The mission: what WEI is doing about the problem. Rendered as a full-bleed
 * dark band for emphasis, the emotional center of the page. Amber eyebrow is
 * the one deliberate accent here; body text sits on ink at paper opacity.
 */
export function MissionSection() {
  return (
    <section className="bg-wei-ink text-wei-paper">
      <div className="mx-auto max-w-6xl px-wei-gutter py-wei-section-lg">
        <div className="max-w-3xl">
          <Reveal>
            <p className="text-wei-sm font-semibold uppercase tracking-[0.18em] text-wei-amber">
              Our mission
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 font-wei-display text-wei-3xl font-semibold text-wei-paper text-balance">
              Close the gap, for free, at a scale a single classroom cannot
              reach.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-wei-lg text-wei-paper/80">
              WEI exists to put financial literacy within reach of every student,
              whatever their zip code or family background. Two choices keep that
              possible. The material is free, and it is built to travel past the
              limits of any one teacher or room. Because the people writing it are
              students themselves, the explanations stay close to how students
              actually think about money.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
