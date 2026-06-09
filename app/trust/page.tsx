import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { contactEmail } from "@/lib/site";

export const metadata: Metadata = {
  title: "Trust",
  description:
    "What WEI is and isn't: free, student-led financial education, never regulated or fiduciary advice. We don't sell your data and we don't make money off you.",
};

function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="text-wei-emerald-deep underline underline-offset-4 transition-colors hover:text-wei-emerald"
    >
      {children}
    </Link>
  );
}

const isItems = [
  "A student-led nonprofit initiative",
  "A free financial education resource",
  "Plain-language lessons, a glossary, and everyday money tools",
  "Built to help, and transparent by default",
];

const isNotItems = [
  "A financial, legal, or tax adviser",
  "A product that sells or rents your data",
  "A business that makes money off you",
  "A replacement for professional guidance",
];

const promises = [
  {
    index: "01",
    label: "We teach, we don't advise",
    body: (
      <>
        Everything we make is education. For a decision about your own money,
        taxes, or legal situation, see a qualified professional. The details are
        in our <InlineLink href="/terms">Terms of use</InlineLink>.
      </>
    ),
  },
  {
    index: "02",
    label: "We don't sell your data",
    body: (
      <>
        We never sell or rent your information, and we don't hand it to
        advertisers or data brokers. The full picture is in our{" "}
        <InlineLink href="/privacy">Privacy page</InlineLink>.
      </>
    ),
  },
  {
    index: "03",
    label: "We don't make money off you",
    body: (
      <>
        WEI is free. There are no ads, no upsells, and no hidden fees. You are not
        the product here.
      </>
    ),
  },
  {
    index: "04",
    label: "We keep it simple and honest",
    body: (
      <>
        We collect only what you send us through the contact form, and only so we
        can reply. Nothing more, nothing tucked away in fine print.
      </>
    ),
  },
];

export default function TrustPage() {
  return (
    <Container as="section" className="py-wei-section-lg">
      <PageHero
        eyebrow="Trust"
        title="How we handle your information."
        intro="WEI exists to make financial education open to everyone. Here is what we are, what we are not, and the promises behind how we treat you and your information."
      />

      <Reveal delay={0.15}>
        <div className="mt-12 grid gap-x-wei-gutter gap-y-6 md:mt-16 md:grid-cols-12">
          <div className="md:col-span-4 lg:col-span-3">
            <Eyebrow index="01">In plain terms</Eyebrow>
          </div>
          <div className="wei-hairgrid grid grid-cols-1 sm:grid-cols-2 md:col-span-8">
            <div className="space-y-4 p-6 sm:p-7">
              <h2 className="wei-eyebrow text-wei-emerald-deep">What WEI is</h2>
              <ul className="space-y-3 text-wei-base text-wei-ink/80">
                {isItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="space-y-4 p-6 sm:p-7">
              <h2 className="wei-eyebrow text-wei-ink/45">What WEI isn't</h2>
              <ul className="space-y-3 text-wei-base text-wei-ink/80">
                {isNotItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="mt-12 grid gap-x-wei-gutter gap-y-8 border-t border-wei-line pt-8 md:mt-16 md:grid-cols-12 md:pt-10">
          <div className="md:col-span-4 lg:col-span-3">
            <Eyebrow index="02">Our promises</Eyebrow>
            <h2 className="mt-6 text-wei-2xl font-semibold text-wei-ink">
              The boundary, stated as values.
            </h2>
          </div>
          <dl className="wei-hairgrid grid grid-cols-1 sm:grid-cols-2 md:col-span-8">
            {promises.map((promise) => (
              <div key={promise.index} className="space-y-3 p-6 sm:p-7">
                <dt className="flex items-baseline gap-3">
                  <span aria-hidden="true" className="wei-num text-wei-sm text-wei-ink/40">
                    {promise.index}
                  </span>
                  <span className="text-wei-lg font-semibold text-wei-ink">
                    {promise.label}
                  </span>
                </dt>
                <dd className="text-wei-base text-wei-ink/80">{promise.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>

      <Reveal delay={0.25}>
        <div className="mt-12 grid gap-x-wei-gutter gap-y-4 border-t border-wei-line pt-8 md:mt-16 md:grid-cols-12 md:pt-10">
          <div className="md:col-span-4 lg:col-span-3">
            <Eyebrow index="03">Built in the open</Eyebrow>
          </div>
          <div className="space-y-4 text-wei-base text-wei-ink/80 md:col-span-8 md:max-w-2xl">
            <h2 className="text-wei-2xl font-semibold text-wei-ink">
              Questions are welcome.
            </h2>
            <p>
              We are students building this in the open, and we would rather you
              ask than wonder. If you ever want to know how something works, or you
              want your information removed, email us at{" "}
              <a
                href={`mailto:${contactEmail}`}
                className="text-wei-emerald-deep underline underline-offset-4 transition-colors hover:text-wei-emerald"
              >
                {contactEmail}
              </a>
              .
            </p>
            <p>
              For the specifics, read our{" "}
              <InlineLink href="/privacy">Privacy page</InlineLink> and our{" "}
              <InlineLink href="/terms">Terms of use</InlineLink>.
            </p>
          </div>
        </div>
      </Reveal>
    </Container>
  );
}
