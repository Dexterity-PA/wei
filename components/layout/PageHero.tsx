import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "./Eyebrow";

/**
 * The masthead for inner pages (Learn, Glossary, Contact, Tools, module detail).
 * Mono eyebrow over a large left-weighted title and a quiet intro, on the shared
 * editorial rhythm. Uses the mount reveal since it sits above the fold.
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
      <Reveal delay={0.05}>
        <h1 className="mt-6 text-wei-3xl font-semibold text-wei-ink">{title}</h1>
      </Reveal>
      {intro ? (
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-2xl text-wei-lg text-wei-ink/70">{intro}</p>
        </Reveal>
      ) : null}
      {children}
    </header>
  );
}
