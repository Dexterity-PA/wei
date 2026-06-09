import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { BudgetBuilder } from "./BudgetBuilder";

export const metadata: Metadata = {
  title: "Budget builder",
  description:
    "Split your monthly income across categories starting from a 50/30/20 frame. Fully editable, student-income friendly, education only.",
};

export default function BudgetBuilderPage() {
  return (
    <Container as="section" className="py-wei-section-lg">
      <PageHero
        eyebrow="Tools"
        title="Give every dollar a job."
        intro="A budget is a plan for where your money goes before it gets there. Start from a common 50/30/20 split, then make it yours: rename categories, add or remove them, and edit either the percent or the dollar amount. It works the same whether income is a paycheck or an allowance."
      />

      <Reveal trigger="scroll" className="mt-14">
        <BudgetBuilder />
      </Reveal>

      {/* Explainer */}
      <div className="mt-20">
        <SectionHeader
          index="01"
          eyebrow="The 50 / 30 / 20 frame"
          title="A starting point, not a rule."
          intro="One common way to split income is half to needs, a third to wants, and the rest to savings. It is a starting frame to react to, not a rule you have to follow. Move the numbers until the plan fits your real life."
        />
        <div className="wei-hairgrid mt-10 grid grid-cols-1 sm:grid-cols-3">
          <Explain
            term="Needs (about 50%)"
            body="Things you have to pay for: rent or board, food, phone, transit to school or work."
          />
          <Explain
            term="Wants (about 30%)"
            body="Things you choose: eating out, streaming, games, going out with friends."
          />
          <Explain
            term="Savings (about 20%)"
            body="Money you set aside: an emergency cushion, a goal you are saving toward, or paying down a balance."
          />
        </div>
      </div>

      {/* Assumptions + illustrative note */}
      <div className="mt-16 rounded-wei-md border border-wei-line bg-wei-paper-dim px-5 py-6 sm:px-7 sm:py-8">
        <span className="wei-eyebrow text-wei-emerald-deep">
          How the numbers work
        </span>
        <p className="mt-4 max-w-3xl text-wei-base text-wei-ink/75">
          This is a learning tool, not financial advice. It does not store
          anything you type. The point is to see your choices add up in real
          time, then adjust until the plan feels right.
        </p>
        <ul className="mt-6 grid max-w-3xl gap-3 text-wei-sm text-wei-ink/70">
          <Assumption>
            Percent and dollars stay linked: a category&rsquo;s percent is its
            dollar amount divided by your income.
          </Assumption>
          <Assumption>
            &ldquo;Left to allocate&rdquo; is income minus everything you have
            assigned. If categories add up to more than your income, the tool
            flags that you are over budget.
          </Assumption>
          <Assumption>
            Everything is monthly. There are no taxes, interest, or fees built
            in. Enter take-home amounts you actually receive.
          </Assumption>
        </ul>
      </div>
    </Container>
  );
}

function Explain({ term, body }: { term: string; body: string }) {
  return (
    <div className="bg-wei-paper px-5 py-6">
      <h3 className="wei-eyebrow text-wei-emerald-deep">{term}</h3>
      <p className="mt-3 text-wei-sm text-wei-ink/70">{body}</p>
    </div>
  );
}

function Assumption({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span aria-hidden="true" className="mt-2 h-px w-4 flex-none bg-wei-line-strong" />
      <span>{children}</span>
    </li>
  );
}
