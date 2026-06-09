import type { ElementType, ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "@/components/Reveal";
import { SplitReveal } from "@/components/SplitReveal";
import { motion } from "@/lib/animation/motion";

type Tone = "default" | "ink";

/**
 * Editorial section header on the 12-column grid: a narrow left column holds
 * the mono index + eyebrow in the margin, a wider right column holds the
 * heading and optional intro. This is the repeating structural motif that makes
 * the site read as a designed document rather than stacked centered blocks.
 *
 * Entrance choreography lives here so it is consistent everywhere the header is
 * used: the eyebrow settles first, the heading rises a beat later under the
 * shared per-line mask treatment, then the intro. A string title gets the
 * line-rise; a non-string title falls back to a single quiet reveal.
 */
export function SectionHeader({
  index,
  eyebrow,
  title,
  intro,
  tone = "default",
  headingId,
  as: Heading = "h2",
  className = "",
}: {
  index?: string;
  eyebrow: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
  tone?: Tone;
  headingId?: string;
  as?: ElementType;
  className?: string;
}) {
  const titleColor = tone === "ink" ? "text-wei-paper" : "text-wei-ink";
  const introColor = tone === "ink" ? "text-wei-paper/70" : "text-wei-ink/70";

  return (
    <div className={`grid gap-x-wei-gutter gap-y-6 md:grid-cols-12 ${className}`}>
      <div className="md:col-span-4 lg:col-span-3">
        <Reveal trigger="scroll">
          <Eyebrow index={index} tone={tone}>
            {eyebrow}
          </Eyebrow>
        </Reveal>
      </div>
      <div className="md:col-span-8 md:max-w-3xl">
        {typeof title === "string" ? (
          <SplitReveal
            as={Heading}
            id={headingId}
            trigger="scroll"
            delay={motion.stagger.item}
            className={`text-wei-display ${titleColor}`}
          >
            {title}
          </SplitReveal>
        ) : (
          <Reveal trigger="scroll" delay={motion.stagger.item}>
            <Heading id={headingId} className={`text-wei-display ${titleColor}`}>
              {title}
            </Heading>
          </Reveal>
        )}
        {intro ? (
          <Reveal trigger="scroll" delay={motion.stagger.item * 2}>
            <p className={`mt-5 text-wei-lg ${introColor}`}>{intro}</p>
          </Reveal>
        ) : null}
      </div>
    </div>
  );
}
