import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { GlossaryBrowser } from "@/components/glossary/GlossaryBrowser";

export const metadata: Metadata = {
  title: "Glossary",
  description:
    "Plain-language definitions of money and banking terms, so the language of finance is never a barrier to understanding it.",
};

export default function GlossaryPage() {
  return (
    <Container as="section" className="py-wei-section-lg">
      <PageHero
        eyebrow="Glossary"
        title="The language of money, in plain English."
        intro="Every term here is written for a student meeting it for the first time. Search for a word, filter by topic, or jump straight to a letter."
      />

      <Reveal delay={0.15}>
        <GlossaryBrowser />
      </Reveal>
    </Container>
  );
}
