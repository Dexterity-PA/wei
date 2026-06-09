import { Reveal } from "@/components/Reveal";

export function FounderNote() {
  return (
    <section className="border-b border-wei-line bg-wei-paper">
      <div className="mx-auto max-w-6xl px-wei-gutter py-wei-section">
        <div className="max-w-2xl">
          <Reveal as="h2" className="text-wei-sm font-semibold uppercase tracking-[0.18em] text-wei-emerald-deep">
            A note from the founder
          </Reveal>

          <Reveal delay={0.06} className="mt-7">
            <div className="space-y-5 text-wei-lg text-wei-ink/85">
              <p>
                I started WEI because I kept noticing the same thing. Classmates
                were leaving high school able to factor a polynomial but unsure
                how a credit card actually works, or what happens to a paycheck
                before it reaches them.
              </p>
              <p>
                That gap is not anyone&rsquo;s fault, and it is fixable. So we are
                building the resource I wish all of us had: honest, free, and made
                by students who still remember what it feels like to not know.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.14} className="mt-8 flex items-center gap-4">
            <span
              aria-hidden="true"
              className="flex h-11 w-11 items-center justify-center rounded-wei-pill bg-wei-emerald/12 font-wei-display text-wei-base font-semibold text-wei-emerald-deep"
            >
              PA
            </span>
            <span className="block">
              <span className="block font-wei-display text-wei-base font-semibold text-wei-ink">
                Praneeth Annapureddy
              </span>
              <span className="block text-wei-sm text-wei-ink/60">
                Founder, student
              </span>
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
