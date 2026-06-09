import { Reveal } from "@/components/Reveal";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { CtaLink } from "./CtaLink";

type ToolTease = {
  index: string;
  name: string;
  blurb: string;
};

const tools: ToolTease[] = [
  {
    index: "01",
    name: "Budget builder",
    blurb: "Map what comes in against what goes out, in minutes.",
  },
  {
    index: "02",
    name: "Savings goal",
    blurb: "Set a target and see how small amounts add up over time.",
  },
  {
    index: "03",
    name: "Cost of borrowing",
    blurb: "See what a loan really costs once interest is counted.",
  },
];

export function ToolkitPreview() {
  return (
    <section className="border-b border-wei-line bg-wei-paper-dim">
      <Container className="py-wei-section">
        <div className="grid items-end gap-x-wei-gutter gap-y-6 md:grid-cols-12">
          <div className="md:col-span-8">
            <Reveal>
              <Eyebrow index="04">The toolkit</Eyebrow>
            </Reveal>
            <Reveal delay={0.06} className="mt-5">
              <h2 className="font-wei-display text-wei-2xl font-medium text-wei-ink">
                Plain tools for real money decisions, free for any student to use.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.12} className="md:col-span-4 md:flex md:justify-end">
            <CtaLink href="/tools">Open the toolkit</CtaLink>
          </Reveal>
        </div>

        {/* A clean index of what is coming. No invented numbers. */}
        <div className="mt-12 border-y border-wei-line">
          {tools.map((tool, index) => (
            <Reveal
              key={tool.name}
              delay={0.1 + index * 0.06}
              className={`grid grid-cols-1 items-baseline gap-x-wei-gutter gap-y-2 py-6 sm:grid-cols-12 ${
                index > 0 ? "border-t border-wei-line" : ""
              }`}
            >
              <div className="flex items-baseline gap-4 sm:col-span-5">
                <span className="wei-num text-wei-sm text-wei-ink/35">
                  {tool.index}
                </span>
                <h3 className="font-wei-display text-wei-lg font-semibold text-wei-ink">
                  {tool.name}
                </h3>
              </div>
              <p className="text-wei-sm text-wei-ink/70 sm:col-span-5">
                {tool.blurb}
              </p>
              <div className="sm:col-span-2 sm:text-right">
                <span className="wei-eyebrow text-wei-ink/40">In build</span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.28} className="mt-6">
          <p className="text-wei-xs text-wei-ink/55">
            A preview of what is coming. The full toolkit lands soon.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
