import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { contactEmail } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of use",
  description:
    "The plain terms for using WEI: free educational resources, provided as-is. Our lessons and tools are education, not financial, legal, or tax advice.",
};

/**
 * One legal section on the editorial 12-column grid: a mono index label in the
 * left margin, heading and prose in the wider right column. Local to this page.
 */
function Section({
  index,
  label,
  title,
  children,
}: {
  index: string;
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="grid gap-x-wei-gutter gap-y-4 border-t border-wei-line pt-8 md:grid-cols-12 md:pt-10">
      <div className="md:col-span-4 lg:col-span-3">
        <Eyebrow index={index}>{label}</Eyebrow>
      </div>
      <div className="space-y-4 text-wei-base text-wei-ink/80 md:col-span-8 md:max-w-2xl">
        <h2 className="text-wei-2xl font-semibold text-wei-ink">{title}</h2>
        {children}
      </div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <Container as="section" className="py-wei-section-lg">
      <PageHero
        eyebrow="Terms"
        title="Free educational resources, provided as-is."
        intro="These are the plain terms for using the WEI website and its tools. The short version: everything here is free education, not financial, legal, or tax advice."
      />

      <Reveal delay={0.15}>
        <div className="mt-12 space-y-10 md:mt-16 md:space-y-14">
          <Section
            index="01"
            label="The boundary"
            title="Education, not advice"
          >
            <p>
              This is the part that matters most. WEI provides financial
              education. Our lessons, glossary, calculators, and other tools are
              illustrative and built for learning. They are not financial, legal,
              or tax advice, and using them does not create any kind of advisor or
              client relationship between you and WEI.
            </p>
            <p>
              For decisions about your own money, taxes, or legal situation, talk
              to a qualified professional who can look at your specific
              circumstances. Our tools can help you learn the concepts and ask
              better questions; they cannot stand in for personal advice.
            </p>
          </Section>

          <Section
            index="02"
            label="Accuracy"
            title="No guarantee of accuracy"
          >
            <p>
              We work hard to keep our content correct and current, but we cannot
              guarantee that it is accurate or complete for every situation.
              Numbers produced by calculators are estimates based on the inputs and
              assumptions shown on screen, not predictions of what will happen.
            </p>
          </Section>

          <Section
            index="03"
            label="Your decisions"
            title="Use at your own discretion"
          >
            <p>
              You are welcome to read, learn from, and use these tools for your own
              education. Any decisions you make are your own. To the extent the law
              allows, WEI is not responsible for outcomes that result from using
              the site or relying on its content.
            </p>
          </Section>

          <Section
            index="04"
            label="The service"
            title="The site is provided as-is"
          >
            <p>
              The site and its tools are offered for free, as-is and as-available,
              without warranties of any kind. We may add, change, or remove content
              and features as the project grows, and parts of the site may be
              unavailable from time to time.
            </p>
          </Section>

          <Section index="05" label="Who we are" title="A student-led initiative">
            <p>
              WEI is a student-led nonprofit initiative. We are not a bank, a
              broker, a registered investment adviser, or a law or tax firm, and
              nothing on this site should be read as a service from one. We say
              this plainly so there is no confusion about what we offer: free
              education, made in the open.
            </p>
          </Section>

          <Section index="06" label="Questions" title="Get in touch">
            <p>
              If anything here is unclear, email us at{" "}
              <a
                href={`mailto:${contactEmail}`}
                className="text-wei-emerald-deep underline underline-offset-4 transition-colors hover:text-wei-emerald"
              >
                {contactEmail}
              </a>
              . For how we handle your information, see our{" "}
              <Link
                href="/privacy"
                className="text-wei-emerald-deep underline underline-offset-4 transition-colors hover:text-wei-emerald"
              >
                Privacy page
              </Link>{" "}
              and our{" "}
              <Link
                href="/trust"
                className="text-wei-emerald-deep underline underline-offset-4 transition-colors hover:text-wei-emerald"
              >
                Trust page
              </Link>
              .
            </p>
          </Section>

          <p className="wei-eyebrow border-t border-wei-line pt-6 text-wei-ink/40">
            Last updated June 2026
          </p>
        </div>
      </Reveal>
    </Container>
  );
}
