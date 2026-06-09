import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/Reveal";
import { DebtPayoffTool } from "./DebtPayoffTool";

export const metadata: Metadata = {
  title: "Debt payoff: avalanche vs snowball",
  description:
    "A plain-language calculator that compares two common ways to pay off debt side by side: the avalanche method (highest interest rate first) and the snowball method (smallest balance first). Education, not advice.",
};

export default function DebtPayoffPage() {
  return (
    <Container as="section" className="py-wei-section-lg">
      <PageHero
        eyebrow="Tools"
        title="Avalanche vs snowball: two ways to pay off debt."
        intro="List what you owe, add any extra you can put toward debt each month, and see two common payoff strategies compared side by side. This is a learning tool, not financial advice."
      />

      <Reveal delay={0.1} className="mt-12">
        <DebtPayoffTool />
      </Reveal>

      <div className="mt-16 grid gap-x-wei-gutter gap-y-10 md:grid-cols-12">
        <div className="md:col-span-4 lg:col-span-3">
          <span className="wei-eyebrow text-wei-emerald-deep">How to read this</span>
        </div>
        <div className="md:col-span-8 md:max-w-3xl space-y-5 text-wei-base text-wei-ink/80">
          <p>
            Both strategies pay every debt its minimum each month. The difference
            is where the extra money goes. The{" "}
            <span className="font-semibold text-wei-ink">avalanche</span> method
            sends the extra to the debt with the highest interest rate (APR)
            first, which usually means paying the least interest overall. The{" "}
            <span className="font-semibold text-wei-ink">snowball</span> method
            sends the extra to the smallest balance first, so you clear whole
            debts sooner, which some people find easier to stick with.
          </p>
          <p>
            When one debt is paid off, the money that was going to it rolls onto
            the next debt in line. That rolling payment is why the last debts
            disappear quickly once the first ones are gone.
          </p>
          <p>
            <span className="font-semibold text-wei-ink">APR</span> (annual
            percentage rate) is the yearly cost of borrowing, shown as a percent.
            A <span className="font-semibold text-wei-ink">minimum payment</span>{" "}
            is the smallest amount a lender lets you pay each month to stay in
            good standing.
          </p>
        </div>
      </div>

      <div className="mt-12 grid gap-x-wei-gutter gap-y-6 md:grid-cols-12">
        <div className="md:col-span-4 lg:col-span-3">
          <span className="wei-eyebrow text-wei-ink/50">Assumptions</span>
        </div>
        <div className="md:col-span-8 md:max-w-3xl">
          <div className="border border-wei-line bg-wei-paper-dim p-6 text-wei-sm text-wei-ink/75">
            <p className="font-semibold text-wei-ink">
              Illustrative estimate. Your real numbers will differ.
            </p>
            <ul className="mt-4 space-y-2 list-disc pl-5">
              <li>
                Interest is added once per month using a monthly rate of APR
                divided by 12. Real lenders may compound daily, so totals can
                vary.
              </li>
              <li>
                Balances, rates, minimum payments, and your extra amount are
                assumed to stay the same the whole time.
              </li>
              <li>
                No new charges, fees, late penalties, or promotional rates are
                included.
              </li>
              <li>
                If a minimum payment is too small to cover a month of interest,
                that debt would never go down on its own. The tool flags this
                instead of guessing.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Container>
  );
}
