import { Reveal } from "@/components/Reveal";

export function MissionStatement() {
  return (
    <section className="border-b border-wei-line bg-wei-paper-dim">
      <div className="mx-auto max-w-6xl px-wei-gutter py-wei-section">
        <div className="max-w-3xl">
          <Reveal as="h2" className="text-wei-sm font-semibold uppercase tracking-[0.18em] text-wei-emerald-deep">
            Why WEI exists
          </Reveal>

          <Reveal delay={0.06} className="mt-7">
            <p className="font-wei-display text-wei-2xl font-medium leading-snug text-wei-ink">
              What you know about money still depends too much on where you grew
              up and who raised you. A student whose family talks about saving,
              credit, and compound interest starts years ahead of a classmate who
              was never in the room for those conversations. WEI exists to close
              that gap. We put clear, practical money knowledge in front of the
              students the system tends to skip, so a first paycheck, a budget, or
              a bank account is never a problem they have to solve alone.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
