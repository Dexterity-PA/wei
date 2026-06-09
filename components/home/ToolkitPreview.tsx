import { Reveal } from "@/components/Reveal";
import { CtaLink } from "./CtaLink";

type ToolTease = {
  name: string;
  blurb: string;
  /** A faux readout that hints at the tool without inventing real numbers. */
  preview: ReadonlyArray<{ label: string; value: string }>;
};

const tools: ToolTease[] = [
  {
    name: "Budget builder",
    blurb: "Map what comes in against what goes out, in minutes.",
    preview: [
      { label: "Income", value: "$0" },
      { label: "Needs", value: "$0" },
      { label: "Left to save", value: "$0" },
    ],
  },
  {
    name: "Savings goal",
    blurb: "Set a target and see how small amounts add up over time.",
    preview: [
      { label: "Goal", value: "$0" },
      { label: "Per week", value: "$0" },
      { label: "On track by", value: "--" },
    ],
  },
  {
    name: "Cost of borrowing",
    blurb: "See what a loan really costs once interest is counted.",
    preview: [
      { label: "Borrowed", value: "$0" },
      { label: "Rate", value: "0%" },
      { label: "True cost", value: "$0" },
    ],
  },
];

export function ToolkitPreview() {
  return (
    <section className="border-b border-wei-line bg-wei-paper-dim">
      <div className="mx-auto max-w-6xl px-wei-gutter py-wei-section">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Reveal as="h2" className="text-wei-sm font-semibold uppercase tracking-[0.18em] text-wei-emerald-deep">
              The toolkit
            </Reveal>
            <Reveal delay={0.06} className="mt-5">
              <p className="font-wei-display text-wei-2xl font-medium text-wei-ink">
                Plain tools for real money decisions, free for any student to
                use.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <CtaLink href="/tools">Open the toolkit</CtaLink>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {tools.map((tool, index) => (
            <Reveal
              key={tool.name}
              delay={0.1 + index * 0.08}
              className="flex flex-col rounded-wei-lg border border-wei-line bg-wei-paper p-6 shadow-wei-soft"
            >
              <h3 className="font-wei-display text-wei-lg font-semibold text-wei-ink">
                {tool.name}
              </h3>
              <p className="mt-2 text-wei-sm text-wei-ink/70">{tool.blurb}</p>

              {/* Faux readout. Decorative preview of the tool, not live data. */}
              <dl
                aria-hidden="true"
                className="mt-6 space-y-2 rounded-wei-md border border-wei-line bg-wei-paper-dim/60 p-4"
              >
                {tool.preview.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between text-wei-xs"
                  >
                    <dt className="text-wei-ink/55">{row.label}</dt>
                    <dd className="font-medium tabular-nums text-wei-ink/70">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3} className="mt-8">
          <p className="text-wei-xs text-wei-ink/55">
            A preview of what is coming. The full toolkit lands soon.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
