import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { CompoundInterestVisualizer } from "./CompoundInterestVisualizer";

export const metadata: Metadata = {
  title: "Compound interest visualizer",
  description:
    "See how a starting amount and a monthly contribution can grow over time. Plain-language, education only, with the math and assumptions shown.",
};

export default function CompoundInterestPage() {
  return (
    <Container as="section" className="py-wei-section-lg">
      <PageHero
        eyebrow="Tools"
        title="See how money can grow over time."
        intro="Compound growth means the growth on your money starts earning its own growth. Set a starting amount, what you add each month, a yearly rate, and how long you leave it. The chart shows the balance climbing, split into what you put in and what the growth adds."
      />

      <Reveal trigger="scroll" className="mt-14">
        <CompoundInterestVisualizer />
      </Reveal>

      {/* Explainer */}
      <div className="mt-20">
        <SectionHeader
          index="01"
          eyebrow="How to read it"
          title="What the chart is showing you."
          intro="The emerald line is your total balance at each point in time. The shaded area below the dashed line is the money you actually put in. The emerald band between the dashed line and the top line is growth: the part you did not deposit yourself."
        />
        <div className="wei-hairgrid mt-10 grid grid-cols-1 sm:grid-cols-3">
          <Explain
            term="Starting amount"
            body="The money you begin with today, before adding anything."
          />
          <Explain
            term="Monthly contribution"
            body="A fixed amount added at the end of every month for the whole period."
          />
          <Explain
            term="Compounding"
            body="Growth is added to the balance each month, so next month the growth is calculated on a slightly larger number."
          />
        </div>
      </div>

      {/* Assumptions + illustrative note */}
      <div className="mt-16 rounded-wei-md border border-wei-line bg-wei-paper-dim px-5 py-6 sm:px-7 sm:py-8">
        <span className="wei-eyebrow text-wei-emerald-deep">
          Illustrative estimate
        </span>
        <p className="mt-4 max-w-3xl text-wei-base text-wei-ink/75">
          This is a learning tool, not a prediction and not financial advice.
          Real returns move up and down, are not a fixed yearly number, and can
          be negative in some years. Use it to build intuition for how time and
          regular contributions interact, not to plan exact dollar outcomes.
        </p>
        <ul className="mt-6 grid max-w-3xl gap-3 text-wei-sm text-wei-ink/70">
          <Assumption>
            Growth is compounded monthly, using the annual rate divided by 12.
          </Assumption>
          <Assumption>
            Contributions are added at the end of each month.
          </Assumption>
          <Assumption>
            The rate is held constant for the whole period. No taxes, fees, or
            inflation are modeled.
          </Assumption>
          <Assumption>
            Figures are rounded for display. &ldquo;Growth earned&rdquo; is the
            final balance minus everything you put in.
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
