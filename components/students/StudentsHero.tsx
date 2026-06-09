import { Reveal } from "@/components/Reveal";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { CtaLink } from "@/components/home/CtaLink";

/**
 * Opening statement for the student landing page. Speaks straight to a student,
 * warm and plain, and anchors the page in the mission before any of the tools.
 * Paper surface, large display headline, on the shared editorial rhythm.
 */
export function StudentsHero() {
  return (
    <Container as="section" className="pt-wei-section-lg pb-wei-section">
      <div className="max-w-4xl">
        <Reveal>
          <Eyebrow>For students</Eyebrow>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="mt-6 text-wei-display font-semibold text-wei-ink">
            Start here. Money makes more sense than it looks.
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-wei-lg text-wei-ink/70">
            You do not need a finance background, a perfect grade, or anyone at
            home who already gets this. Everything WEI builds is free, plain, and
            made for students like you. Pick something below and start where you
            are.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-9 flex flex-wrap items-center gap-3">
          <CtaLink href="#whats-here">See what is here</CtaLink>
          <CtaLink href="/tools" variant="secondary">
            Try a tool
          </CtaLink>
        </Reveal>
      </div>
    </Container>
  );
}
