import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/Reveal";
import { UnbankedCalculator } from "./UnbankedCalculator";

export const metadata: Metadata = {
  title: "The cost of being unbanked",
  description:
    "See what check-cashing, prepaid-card, and money-order fees can add up to in a year, and what that same money could grow into if it were saved instead. Educational, not advice.",
};

export default function CostOfUnbankedPage() {
  return (
    <Container as="section" className="py-wei-section-lg">
      <PageHero
        eyebrow="Tools"
        title="The cost of living without a bank account."
        intro="When you cannot get a free or low-fee bank account, small fees on cashing checks, loading prepaid cards, and buying money orders are charged again and again. This tool adds those fees up over a year and shows what that same money could have become if it were saved instead."
      />

      <Reveal delay={0.15}>
        <div className="mt-12">
          <UnbankedCalculator />
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
              Being &quot;unbanked&quot; means not having a checking or savings
              account, so everyday money tasks have to be paid for one at a
              time. A check-cashing store takes a cut of every check. A prepaid
              card often charges to set it up, to reload it, and a monthly fee
              just to keep it. Paying a bill by money order costs a small fee
              each time.
            </p>
            <p className="mt-4 text-wei-base text-wei-ink/80">
              None of those single charges feels large. The point of this tool
              is that they repeat. The big number on the left is roughly what a
              year of those fees adds up to. The chart on the right shows the
              other side of the same coin: if that yearly amount were put into
              a savings or investment account instead, this is the order of
              magnitude it could grow to over 1, 5, and 10 years.
            </p>
            <p className="mt-4 text-wei-base text-wei-ink/80">
              A free or low-fee bank account, the kind many banks and credit
              unions offer with no monthly fee, is what closes this gap. The
              goal here is not to judge anyone. It is to make a hidden cost
              visible.
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.25}>
        <div className="mt-12 border border-wei-line bg-wei-paper-dim p-6 md:p-8">
          <span className="wei-eyebrow text-wei-ink/50">
            Illustrative estimate / assumptions
          </span>
          <ul className="mt-4 space-y-3 text-wei-sm text-wei-ink/75">
            <li>
              These are estimates, not a quote. Real fees vary by store, by
              state, and by the type of check or card.
            </li>
            <li>
              The default fee ranges shown are typical published ranges, not
              tied to any specific store or brand:{" "}
              <span className="text-wei-ink">
                check cashing commonly runs about 1 to 5 percent of the check
              </span>
              ,{" "}
              <span className="text-wei-ink">
                prepaid-card monthly fees commonly run about $4 to $10
              </span>
              , reload fees often run a few dollars each, and{" "}
              <span className="text-wei-ink">
                money orders commonly cost about $1 to $5 each
              </span>
              . You can change every input to match what you actually pay.
            </li>
            <li>
              The growth projection assumes the yearly fee total is saved each
              year and earns a steady{" "}
              <span className="wei-num">5%</span> annual return, compounded
              once a year. Real returns are never steady and are not
              guaranteed. The number is meant to show scale, not to predict an
              account balance.
            </li>
            <li>
              A free or low-fee bank account is assumed to cost roughly{" "}
              <span className="wei-num">$0</span> for these same tasks. Some
              accounts have small or avoidable fees, so treat the gap as a
              close approximation.
            </li>
            <li>
              This is financial education, not advice. It does not recommend any
              specific account, product, or company.
            </li>
          </ul>
        </div>
      </Reveal>
    </Container>
  );
}
