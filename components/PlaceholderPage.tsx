import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";

type PlaceholderPageProps = {
  title: string;
  lead: string;
  children?: ReactNode;
};

/**
 * Minimal scaffold for routes whose full content arrives in a later phase, so
 * the nav never 404s. Uses the shared page hero and the mount reveal.
 */
export function PlaceholderPage({ title, lead, children }: PlaceholderPageProps) {
  return (
    <Container as="section" className="py-wei-section-lg">
      <PageHero eyebrow={title} title={title} intro={lead} />
      {children ? (
        <Reveal delay={0.15} className="mt-10">
          {children}
        </Reveal>
      ) : (
        <Reveal delay={0.15}>
          <div className="mt-10 flex items-center gap-3 border-t border-wei-line pt-6">
            <span className="wei-eyebrow text-wei-emerald-deep">In build</span>
            <span className="text-wei-sm text-wei-ink/60">
              This section is being built. Check back soon.
            </span>
          </div>
        </Reveal>
      )}
    </Container>
  );
}
