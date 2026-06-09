import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { ModuleCard } from "@/components/learn/ModuleCard";
import { learnModules } from "@/lib/learn";

export const metadata: Metadata = {
  title: "Learn",
  description:
    "Short, mobile-first lessons that build financial literacy step by step, each with a quick quiz to check what stuck.",
};

export default function LearnPage() {
  return (
    <section className="mx-auto max-w-5xl px-wei-gutter py-wei-section-lg">
      <Reveal>
        <p className="text-wei-sm font-semibold uppercase tracking-[0.18em] text-wei-emerald-deep">
          Learn
        </p>
      </Reveal>

      <Reveal delay={0.05}>
        <h1 className="mt-5 font-wei-display text-wei-3xl font-semibold text-wei-ink">
          Short lessons that build real money skills.
        </h1>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mt-5 max-w-2xl text-wei-lg text-wei-ink/80">
          Each module is a quick read built for your phone, with a short quiz at
          the end to check what stuck. Start anywhere that looks useful.
        </p>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {learnModules.map((mod) => (
            <ModuleCard key={mod.slug} module={mod} />
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <p className="mt-8 text-wei-sm text-wei-ink/60">
          More modules are on the way. New lessons land here as they are written.
        </p>
      </Reveal>
    </section>
  );
}
