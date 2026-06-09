import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { ModuleCard } from "@/components/learn/ModuleCard";
import { learnModules } from "@/lib/learn";

export const metadata: Metadata = {
  title: "Learn",
  description:
    "Short, mobile-first financial-literacy modules with a quick self-check quiz at the end. Built for students, in plain language.",
};

export default function LearnPage() {
  return (
    <section className="mx-auto max-w-6xl px-wei-gutter py-wei-section-lg">
      <Reveal>
        <p className="text-wei-sm font-semibold uppercase tracking-[0.18em] text-wei-emerald-deep">
          Learn
        </p>
      </Reveal>

      <Reveal delay={0.05}>
        <h1 className="mt-4 font-wei-display text-wei-3xl font-semibold text-wei-ink">
          Short lessons that build real money skills.
        </h1>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mt-5 max-w-2xl text-wei-lg text-wei-ink/80">
          Each module takes only a few minutes, reads easily on a phone, and
          ends with a quick quiz so you can check what stuck. Start anywhere.
        </p>
      </Reveal>

      <Reveal delay={0.15} className="mt-12">
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {learnModules.map((module) => (
            <li key={module.slug} className="h-full">
              <ModuleCard module={module} />
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={0.2} className="mt-12">
        <p className="text-wei-sm text-wei-ink/55">
          More modules are on the way. Want the full picture today? Browse the{" "}
          <Link
            href="/glossary"
            className="font-medium text-wei-emerald-deep underline decoration-wei-line underline-offset-2 hover:decoration-wei-emerald-deep"
          >
            glossary
          </Link>
          .
        </p>
      </Reveal>
    </section>
  );
}
