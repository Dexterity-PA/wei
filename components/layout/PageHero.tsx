import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import { SplitReveal } from "@/components/SplitReveal";
import { Eyebrow } from "./Eyebrow";
import { motion } from "@/lib/animation/motion";

/**
 * The masthead for inner pages (Learn, Glossary, Contact, Tools, module detail).
 * Mono eyebrow over a large left-weighted title and a quiet intro, on the shared
 * editorial rhythm.
 *
 * It sits above the fold, so the entrance plays on mount: the eyebrow settles,
 * the title rises a beat later under the shared per-line mask treatment, then
 * the intro. A string title gets the line-rise; a non-string title falls back
 * to a single quiet reveal.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  children,
  className = "",
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <header className={className}>
      <Reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
      </Reveal>
      {typeof title === "string" ? (
        <SplitReveal
          as="h1"
          trigger="mount"
          delay={motion.stagger.item}
          className="mt-6 text-wei-3xl font-semibold text-wei-ink"
        >
          {title}
        </SplitReveal>
      ) : (
        <Reveal delay={motion.stagger.item}>
          <h1 className="mt-6 text-wei-3xl font-semibold text-wei-ink">{title}</h1>
        </Reveal>
      )}
      {intro ? (
        <Reveal delay={motion.stagger.item * 2}>
          <p className="mt-5 max-w-2xl text-wei-lg text-wei-ink/70">{intro}</p>
        </Reveal>
      ) : null}
      {children}
    </header>
  );
}
