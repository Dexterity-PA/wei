import { Reveal } from "@/components/Reveal";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { CtaLink } from "@/components/home/CtaLink";

/**
 * Opening statement for the Partners page, aimed at schools and educators. Leads
 * with the offer in plain terms and an immediate route to contact. Education
 * framing only, no service or outcome claims.
 */
export function PartnersHero() {
  return (
    <Container as="section" className="pt-wei-section-lg pb-wei-section">
      <div className="max-w-4xl">
        <Reveal>
          <Eyebrow>For schools and educators</Eyebrow>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="mt-6 text-wei-display font-semibold text-wei-ink">
            Bring financial literacy to your classroom, at no cost.
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-wei-lg text-wei-ink/70">
            WEI partners with schools and educators to teach students how money
            actually works, in plain language, for free. We bring the lessons,
            the tools, and the structure. You bring the students. There is nothing
            to buy and nothing to install.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-8">
          <CtaLink href="/contact">Start a conversation</CtaLink>
        </Reveal>
      </div>
    </Container>
  );
}
