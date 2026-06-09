import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { tools as allTools } from "@/lib/tools";
import { CtaLink } from "./CtaLink";

// Three featured tools, one per category, sourced from the registry so the
// names and copy never drift from the live toolkit.
const featuredSlugs = ["budget-builder", "debt-payoff", "compound-interest"];

const tools = featuredSlugs.map((slug, i) => {
  const tool = allTools.find((t) => t.slug === slug);
  if (!tool) {
    throw new Error(`ToolkitPreview: unknown tool slug "${slug}"`);
  }
  return { ...tool, index: String(i + 1).padStart(2, "0") };
});

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

        {/* A clean index into the live toolkit. No invented numbers. */}
        <div className="mt-12 border-y border-wei-line">
          {tools.map((tool, index) => (
            <Reveal
              key={tool.slug}
              delay={0.1 + index * 0.06}
              className={index > 0 ? "border-t border-wei-line" : ""}
            >
              <Link
                href={`/tools/${tool.slug}`}
                className="group grid grid-cols-1 items-baseline gap-x-wei-gutter gap-y-2 py-6 sm:grid-cols-12"
              >
                <div className="flex items-baseline gap-4 sm:col-span-5">
                  <span className="wei-num text-wei-sm text-wei-ink/35">
                    {tool.index}
                  </span>
                  <h3 className="font-wei-display text-wei-lg font-semibold text-wei-ink transition-colors group-hover:text-wei-emerald-deep">
                    {tool.name}
                  </h3>
                </div>
                <p className="text-wei-sm text-wei-ink/70 sm:col-span-5">
                  {tool.blurb}
                </p>
                <div className="sm:col-span-2 sm:text-right">
                  <span className="wei-eyebrow text-wei-ink/35 transition-colors group-hover:text-wei-emerald-deep">
                    Open
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.28} className="mt-6">
          <p className="text-wei-xs text-wei-ink/55">
            Three of nine. See the full toolkit for debt, credit, paychecks, and
            more.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
