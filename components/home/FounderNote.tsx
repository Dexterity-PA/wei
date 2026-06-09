import { Reveal } from "@/components/Reveal";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";

export function FounderNote() {
  return (
    <section className="border-b border-wei-line bg-wei-paper">
      <Container className="py-wei-section">
        <div className="grid gap-x-wei-gutter gap-y-8 md:grid-cols-12">
          <div className="md:col-span-4 lg:col-span-3">
            <Reveal>
              <Eyebrow index="05">A note from the founder</Eyebrow>
            </Reveal>
          </div>

          <div className="md:col-span-8 md:max-w-2xl">
            <Reveal>
              <div className="space-y-5 font-wei-display text-wei-xl font-medium leading-snug text-wei-ink/90">
                <p>
                  I started WEI because I kept noticing the same thing. Classmates
                  were leaving high school able to factor a polynomial but unsure
                  how a credit card actually works, or what happens to a paycheck
                  before it reaches them.
                </p>
                <p>
                  That gap is not anyone&rsquo;s fault, and it is fixable. So we
                  are building the resource I wish all of us had: honest, free,
                  and made by students who still remember what it feels like to
                  not know.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="mt-8 flex items-center gap-4 border-t border-wei-line pt-6">
              <span
                aria-hidden="true"
                className="flex h-11 w-11 items-center justify-center border border-wei-line-strong wei-num text-wei-sm font-semibold text-wei-emerald-deep"
              >
                PA
              </span>
              <span className="block">
                <span className="block font-wei-display text-wei-base font-semibold text-wei-ink">
                  Praneeth Annapureddy
                </span>
                <span className="wei-eyebrow mt-1 block text-wei-ink/55">
                  Founder, student
                </span>
              </span>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
