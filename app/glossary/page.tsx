import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { GlossaryExplorer } from "@/components/glossary/GlossaryExplorer";
import { glossaryCount } from "@/lib/glossary";

export const metadata: Metadata = {
  title: "Glossary",
  description:
    "A plain-language financial glossary. Clear definitions of money, banking, credit, and college-aid terms, written for students with no background.",
};

export default function GlossaryPage() {
  return (
    <section className="mx-auto max-w-6xl px-wei-gutter py-wei-section-lg">
      <Reveal>
        <p className="text-wei-sm font-semibold uppercase tracking-[0.18em] text-wei-emerald-deep">
          Glossary
        </p>
      </Reveal>

      <Reveal delay={0.05}>
        <h1 className="mt-4 font-wei-display text-wei-3xl font-semibold text-wei-ink">
          The language of money, in plain English.
        </h1>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mt-5 max-w-2xl text-wei-lg text-wei-ink/80">
          {glossaryCount} terms across banking, credit, budgeting, investing,
          taxes, and more. Each one is defined for someone seeing it for the
          first time, so the words are never the thing standing in your way.
        </p>
      </Reveal>

      <Reveal delay={0.15} className="mt-10">
        <GlossaryExplorer />
      </Reveal>
    </section>
  );
}
