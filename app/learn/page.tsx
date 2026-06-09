import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { ModuleCard } from "@/components/learn/ModuleCard";
import { learnModules } from "@/lib/learn";

export const metadata: Metadata = {
  title: "Learn",
  description:
    "Short, mobile-first lessons that build financial literacy step by step, each with a quick quiz to check what stuck.",
};

export default function LearnPage() {
  return (
    <Container as="section" className="py-wei-section-lg">
      <PageHero
        eyebrow="Learn"
        title="Short lessons that build real money skills."
        intro="Each module is a quick read built for your phone, with a short quiz at the end to check what stuck. Start anywhere that looks useful."
      />

      <Reveal delay={0.15}>
        <div className="wei-hairgrid mt-12 grid grid-cols-1 sm:grid-cols-2">
          {learnModules.map((mod) => (
            <ModuleCard key={mod.slug} module={mod} />
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <p className="mt-6 text-wei-sm text-wei-ink/60">
          More modules are on the way. New lessons land here as they are written.
        </p>
      </Reveal>
    </Container>
  );
}
