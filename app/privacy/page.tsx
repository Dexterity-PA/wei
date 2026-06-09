import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { contactEmail } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "Plain-language privacy: the only thing we collect is what you send through the contact form, and we never sell or share it. Best-effort transparency from a student-led team.",
};

/**
 * One legal section on the editorial 12-column grid: a mono index label sits in
 * the left margin, the heading and prose sit in the wider right column. Local to
 * this page so the route stays self-contained.
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

function MailLink() {
  return (
    <a
      href={`mailto:${contactEmail}`}
      className="text-wei-emerald-deep underline underline-offset-4 transition-colors hover:text-wei-emerald"
    >
      {contactEmail}
    </a>
  );
}

export default function PrivacyPage() {
  return (
    <Container as="section" className="py-wei-section-lg">
      <PageHero
        eyebrow="Privacy"
        title="What we collect, and what we don't."
        intro="WEI is a student-led nonprofit. This page explains, in plain language, the limited information we collect and how we handle it. It is our best effort at honest transparency, not a corporate legal guarantee."
      />

      <Reveal delay={0.15}>
        <div className="mt-12 space-y-10 md:mt-16 md:space-y-14">
          <Section index="01" label="What we collect" title="Only what you send us">
            <p>
              The only information we actively collect is what you choose to send
              through our contact form: your name, your email address, whether you
              are a student or an educator, your school if you decide to share it,
              and your message. We collect this only when you submit the form.
            </p>
            <p>
              We do not run analytics or visitor tracking on this site. We do not
              use advertising cookies. We do not have a newsletter or mailing
              list, so there is nothing to subscribe to and nothing to unsubscribe
              from.
            </p>
          </Section>

          <Section
            index="02"
            label="How it reaches us"
            title="Delivered to us by email"
          >
            <p>
              When you submit the contact form, your message is delivered to us by
              email through Resend, an email delivery service, and lands in a
              private inbox that we monitor. Resend handles the delivery; we use
              the message only to read what you sent and reply.
            </p>
          </Section>

          <Section
            index="03"
            label="How we use it"
            title="To respond, and nothing else"
          >
            <p>
              We use your information for one purpose: to respond to your message
              and stay in touch about what you asked. That is it.
            </p>
            <p>
              We do not sell your information. We do not share it with advertisers
              or data brokers. We do not use it to build a profile of you.
            </p>
          </Section>

          <Section
            index="04"
            label="How long we keep it"
            title="Only as long as we need it"
          >
            <p>
              We keep contact messages only as long as we need them to respond and
              follow up. We are a small team, so this is handled by people, not an
              automated retention system.
            </p>
          </Section>

          <Section
            index="05"
            label="Deleting your data"
            title="Ask us and it is gone"
          >
            <p>
              You can ask us to delete anything you have sent, at any time. Email{" "}
              <MailLink /> and tell us what to remove. Since we are a small
              student-led team, please allow a little time for us to take care of
              it.
            </p>
          </Section>

          <Section index="06" label="A note on honesty" title="Written by students">
            <p>
              WEI is run by students, not a legal department. We wrote this page to
              be clear and truthful about a simple setup: a contact form,
              delivered by email, read by people who want to help. If our practices
              change, we will update this page.
            </p>
            <p>
              For the bigger picture of how we treat you and your data, see our{" "}
              <Link
                href="/trust"
                className="text-wei-emerald-deep underline underline-offset-4 transition-colors hover:text-wei-emerald"
              >
                Trust page
              </Link>
              . For the terms of using the site, see our{" "}
              <Link
                href="/terms"
                className="text-wei-emerald-deep underline underline-offset-4 transition-colors hover:text-wei-emerald"
              >
                Terms of use
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
