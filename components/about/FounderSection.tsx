import { Reveal } from "@/components/Reveal";

/**
 * Origin story. Credible and grounded: who started WEI and why it being
 * student-built is the point, not a footnote. Paper-dim panel sets it apart
 * from the surrounding white sections without another full dark band.
 */
export function FounderSection() {
  return (
    <section className="border-y border-wei-line bg-wei-paper-dim">
      <div className="mx-auto grid max-w-6xl gap-10 px-wei-gutter py-wei-section md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <div>
          <Reveal>
            <p className="text-wei-sm font-semibold uppercase tracking-[0.18em] text-wei-emerald-deep">
              Origin
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 font-wei-display text-wei-2xl font-semibold text-wei-ink text-balance">
              Built by a student who kept seeing the same gap.
            </h2>
          </Reveal>
        </div>

        <div className="max-w-2xl space-y-5 text-wei-base text-wei-ink/80">
          <Reveal delay={0.1}>
            <p>
              WEI was founded by Praneeth Annapureddy, a student who kept running
              into the same thing: classmates who were sharp in every subject the
              school graded, and who had never been shown how a credit card
              statement or a tax form works.
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
    </section>
  );
}
