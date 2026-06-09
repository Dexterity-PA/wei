import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/Reveal";
import { PaycheckGuide } from "./PaycheckGuide";

export const metadata: Metadata = {
  title: "Your first paycheck",
  description:
    "A short, plain-language walkthrough for your first job: how to read a pay stub, what gross and net mean, W-4 basics, and a simple way to split your money. Educational, encouraging, no jargon.",
};

export default function FirstPaycheckPage() {
  return (
    <Container as="section" className="py-wei-section-lg">
      <PageHero
        eyebrow="Tools"
        title="Your first paycheck, step by step."
        intro="A first job comes with a few new words and a few small decisions. This is a short, friendly walkthrough: what the lines on a pay stub mean, why your take-home pay is smaller than the number you were told, the basics of the W-4 form, and a simple way to decide where your money goes."
      />

      <Reveal delay={0.15}>
        <div className="mt-12">
          <PaycheckGuide />
        </div>
      </Reveal>

      <Reveal delay={0.22}>
        <div className="mt-12 border border-wei-line bg-wei-paper-dim p-6 md:p-8">
          <span className="wei-eyebrow text-wei-ink/50">
            Good to know / assumptions
          </span>
          <ul className="mt-4 space-y-3 text-wei-sm text-wei-ink/75">
            <li>
              The pay-stub example uses round, made-up numbers to show how the
              lines fit together. Your real stub will look different, and the
              exact deductions depend on your pay, your state, and your choices.
            </li>
            <li>
              The split tool is a starting idea, not a rule. A common beginner
              split is most of your pay to spending and living costs, a slice to
              saving, and a small slice to give if that matters to you. Adjust it
              to your own situation.
            </li>
            <li>
              The W-4 is a real federal form you fill out when you start a job.
              The notes here describe it in plain language and are not tax
              advice. The official instructions on the form itself are the
              source to follow.
            </li>
            <li>
              This is financial education, not advice, and it does not recommend
              any specific bank, account, or company.
            </li>
          </ul>
        </div>
      </Reveal>
    </Container>
  );
}
