import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { getToolsByCategory, toolCategories, tools } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Tools",
  description:
    "Nine plain-language calculators and planners for everyday money decisions, from budgeting and saving to debt, credit, and the real cost of college.",
};

export default function ToolsPage() {
  // Continuous 01..09 index across the whole toolkit, in registry order.
  const indexOf = new Map(
    tools.map((tool, i) => [tool.slug, String(i + 1).padStart(2, "0")]),
  );

  return (
    <Container as="section" className="py-wei-section-lg">
      <PageHero
        eyebrow="Tools"
        title="A toolkit for real money decisions."
        intro="Nine plain-language calculators and planners, free for any student to use. Each one shows how the math works so you can read your own situation. They teach, they do not tell you what to do."
      />

      <div className="mt-14 space-y-12">
        {toolCategories.map((category, groupIndex) => {
          const groupTools = getToolsByCategory(category);
          return (
            <Reveal key={category} delay={0.12 + groupIndex * 0.05}>
              <section className="grid gap-x-wei-gutter gap-y-5 md:grid-cols-12">
                <div className="md:col-span-3">
                  <Eyebrow index={String(groupIndex + 1).padStart(2, "0")}>
                    {category}
                  </Eyebrow>
                </div>

                <ul className="border-t border-wei-line md:col-span-9">
                  {groupTools.map((tool) => (
                    <li key={tool.slug} className="border-b border-wei-line">
                      <Link
                        href={`/tools/${tool.slug}`}
                        className="group grid grid-cols-1 items-baseline gap-x-wei-gutter gap-y-1 py-5 sm:grid-cols-12"
                      >
                        <div className="flex items-baseline gap-4 sm:col-span-5">
                          <span className="wei-num text-wei-sm text-wei-ink/35">
                            {indexOf.get(tool.slug)}
                          </span>
                          <h2 className="font-wei-display text-wei-lg font-semibold text-wei-ink transition-colors group-hover:text-wei-emerald-deep">
                            {tool.name}
                          </h2>
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
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.3} className="mt-12">
        <p className="border-t border-wei-line pt-6 text-wei-xs text-wei-ink/55">
          Every tool here is a teaching aid. The numbers are illustrative and
          meant to show how the math works, not to tell you what to do with your
          money.
        </p>
      </Reveal>
    </Container>
  );
}
