import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { GlossaryBrowser } from "@/components/glossary/GlossaryBrowser";

export const metadata: Metadata = {
  title: "Glossary",
  description:
    "Plain-language definitions of money and banking terms, so the language of finance is never a barrier to understanding it.",
};

export default function GlossaryPage() {
  return (
    <section className="mx-auto max-w-5xl px-wei-gutter py-wei-section-lg">
      <Reveal>
        <p className="text-wei-sm font-semibold uppercase tracking-[0.18em] text-wei-emerald-deep">
          Glossary
        </p>
      </Reveal>

      <Reveal delay={0.05}>
        <h1 className="mt-5 font-wei-display text-wei-3xl font-semibold text-wei-ink">
          The language of money, in plain English.
        </h1>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mt-5 max-w-2xl text-wei-lg text-wei-ink/80">
          Every term here is written for a student meeting it for the first
          time. Search for a word, filter by topic, or jump straight to a letter.
        </p>
      </Reveal>

      <Reveal delay={0.15}>
        <GlossaryBrowser />
      </Reveal>
    </section>
  );
}
