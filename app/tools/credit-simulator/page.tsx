import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/Reveal";
import { CreditSimulator } from "./CreditSimulator";

export const metadata: Metadata = {
  title: "Credit score simulator",
  description:
    "A directional, educational look at how on-time payments, credit use, hard inquiries, account age, and a missed payment tend to push a credit score up or down. Not a real FICO calculation.",
};

export default function CreditSimulatorPage() {
  return (
    <Container as="section" className="py-wei-section-lg">
      <PageHero
        eyebrow="Tools"
        title="What moves a credit score, and roughly how much."
        intro="A credit score is a number that lenders use to estimate how likely you are to pay back what you borrow. This tool shows the direction each habit tends to push a score, and which habits carry the most weight. It is a teaching model, not a real score."
      />

      <Reveal delay={0.12}>
        <div className="mt-8 border border-wei-amber/50 bg-wei-amber/10 px-5 py-4">
          <p className="text-wei-sm text-wei-ink/85">
            <span className="wei-eyebrow mr-2 text-wei-ink/55">Important</span>
            This is illustrative and directional only. It is not a FICO or
            VantageScore calculation, and the point changes shown are rough
            ranges to teach which factors matter, not predictions of your real
            score.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.16}>
        <div className="mt-10">
          <CreditSimulator />
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="mt-16 grid gap-x-wei-gutter gap-y-10 md:grid-cols-12">
          <div className="md:col-span-4 lg:col-span-3">
            <span className="wei-eyebrow text-wei-emerald-deep">
              How to read this
            </span>
          </div>
          <div className="md:col-span-8 md:max-w-2xl">
            <p className="text-wei-base text-wei-ink/80">
              Start by setting a score you want to explore from. Then move each
              lever and watch the estimated direction change. The bars under
              each lever show roughly how much weight that factor tends to carry
              in a real score, based on the factor categories the major scoring
              companies publish.
            </p>
            <p className="mt-4 text-wei-base text-wei-ink/80">
              The two heaviest levers are paying on time and how much of your
              available credit you are using (called utilization). Those alone
              make up most of a score. A single new hard inquiry, the age of
              your accounts, and especially a recent missed payment matter too,
              but each in a smaller or more specific way.
            </p>
            <p className="mt-4 text-wei-base text-wei-ink/80">
              The why-it-moves notes on the right explain each lever in plain
              language. Read those, not the exact numbers. The habit is the
              lesson.
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.24}>
        <div className="mt-12 border border-wei-line bg-wei-paper-dim p-6 md:p-8">
          <span className="wei-eyebrow text-wei-ink/50">
            Illustrative model / assumptions
          </span>
          <ul className="mt-4 space-y-3 text-wei-sm text-wei-ink/75">
            <li>
              The weights used here mirror the factor categories the major
              scoring companies publish: payment history about 35 percent,
              amounts owed and utilization about 30 percent, length of credit
              history about 15 percent, new credit and inquiries about 10
              percent, and credit mix about 10 percent.
            </li>
            <li>
              Real scoring formulas are private and far more complex. They look
              at your whole credit report, not a handful of sliders, and the
              same change can move two people differently. The point movements
              here are simplified to teach direction and relative weight.
            </li>
            <li>
              A hard inquiry usually has a small, temporary effect that fades
              within about a year. A missed payment of 30 or more days can have
              a large effect and can stay on a report for years. Those patterns
              are reflected directionally, not exactly.
            </li>
            <li>
              Scores are clamped to a typical 300 to 850 range so the readout
              stays realistic.
            </li>
            <li>
              This is financial education, not advice, and not a promise about
              what any lender will see or decide.
            </li>
          </ul>
        </div>
      </Reveal>
    </Container>
  );
}
