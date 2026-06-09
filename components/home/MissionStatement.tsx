import { Reveal } from "@/components/Reveal";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";

export function MissionStatement() {
  return (
    <section className="border-b border-wei-line bg-wei-paper-dim">
      <Container className="py-wei-section">
        <div className="grid gap-x-wei-gutter gap-y-8 md:grid-cols-12">
          <div className="md:col-span-4 lg:col-span-3">
            <Reveal>
              <Eyebrow index="01">Why WEI exists</Eyebrow>
            </Reveal>
          </div>

          <div className="md:col-span-8">
            <Reveal delay={0.06}>
              <h2 className="font-wei-display text-wei-2xl font-medium leading-snug text-wei-ink">
                What you know about money still depends too much on where you grew
                up and who raised you. A student whose family talks about saving,
                credit, and compound interest starts years ahead of a classmate
                who was never in the room for those conversations.
              </h2>
            </Reveal>
            <Reveal delay={0.12} className="mt-6 max-w-2xl border-l border-wei-line-strong pl-5">
              <p className="text-wei-base text-wei-ink/75">
                WEI exists to close that gap. We put clear, practical money
                knowledge in front of the students the system tends to skip, so a
                first paycheck, a budget, or a bank account is never a problem
                they have to solve alone.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
