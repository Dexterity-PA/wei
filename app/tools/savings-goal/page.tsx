import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { SavingsGoalPlanner } from "./SavingsGoalPlanner";

export const metadata: Metadata = {
  title: "Savings goal planner",
  description:
    "Set a savings goal and either a monthly amount or a target date. The planner solves for whichever you leave open. Education only.",
};

export default function SavingsGoalPage() {
  return (
    <Container as="section" className="py-wei-section-lg">
      <PageHero
        eyebrow="Tools"
        title="Plan the path to a savings goal."
        intro="Pick something you are saving for and how much it costs. Then either say how much you can set aside each month and see how long it takes, or pick a date and see the monthly amount it would take to get there."
      />

      <Reveal trigger="scroll" className="mt-14">
        <SavingsGoalPlanner />
      </Reveal>

      {/* Explainer */}
      <div className="mt-20">
        <SectionHeader
          index="01"
          eyebrow="How it works"
          title="Solve for whichever part you do not know."
          intro="Most goals come with one fixed piece and one open piece. You either know how much you can save and want the timeline, or you know the deadline and want the monthly number. Switch between the two to compare."
        />
        <div className="wei-hairgrid mt-10 grid grid-cols-1 sm:grid-cols-2">
          <Explain
            term="Time to goal"
            body="You enter a monthly amount; the planner counts how many months of saving it takes to reach the goal, then shows it as years and months."
          />
          <Explain
            term="Monthly needed"
            body="You enter a number of months; the planner works out the steady monthly amount that reaches the goal in exactly that time."
          />
        </div>
      </div>

      {/* Assumptions + illustrative note */}
      <div className="mt-16 rounded-wei-md border border-wei-line bg-wei-paper-dim px-5 py-6 sm:px-7 sm:py-8">
        <span className="wei-eyebrow text-wei-emerald-deep">
          Illustrative estimate
        </span>
        <p className="mt-4 max-w-3xl text-wei-base text-wei-ink/75">
          This is a learning tool, not financial advice. The plain version is
          just arithmetic: what you still need divided by what you save, or the
          reverse. Turning on interest models a steady yearly rate, which real
          accounts rarely hold exactly.
        </p>
        <ul className="mt-6 grid max-w-3xl gap-3 text-wei-sm text-wei-ink/70">
          <Assumption>
            Without interest: months equals the amount still needed divided by
            your monthly contribution, rounded up to a whole month.
          </Assumption>
          <Assumption>
            With interest on: growth is compounded monthly using the annual rate
            divided by 12, and contributions are added at the end of each month.
          </Assumption>
          <Assumption>
            Contributions are assumed to be the same every month. No deposits or
            fees beyond what you enter are modeled.
          </Assumption>
          <Assumption>
            If a monthly amount can never reach the goal, the planner says so
            instead of showing a misleading number.
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
