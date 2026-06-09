import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";

type PlaceholderPageProps = {
  title: string;
  lead: string;
  children?: ReactNode;
};

/**
 * Minimal scaffold for Phase 0 routes so the nav never 404s. Real content for
 * each section arrives in a later phase. Uses the mount reveal by default.
 */
export function PlaceholderPage({ title, lead, children }: PlaceholderPageProps) {
  return (
    <section className="mx-auto max-w-6xl px-wei-gutter py-wei-section-lg">
      <Reveal>
        <h1 className="font-wei-display text-wei-3xl font-semibold text-wei-ink">
          {title}
        </h1>
      </Reveal>
      <Reveal delay={0.05}>
        <p className="mt-5 max-w-2xl text-wei-lg text-wei-ink/80">{lead}</p>
      </Reveal>
      {children ? (
        <Reveal delay={0.1}>
          <div className="mt-8">{children}</div>
        </Reveal>
      ) : (
        <Reveal delay={0.1}>
          <p className="mt-8 text-wei-sm text-wei-ink/60">
            This section is being built. Check back soon.
          </p>
        </Reveal>
      )}
    </section>
  );
}
