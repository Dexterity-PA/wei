import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { ContactExperience } from "@/components/contact/ContactExperience";

export const metadata: Metadata = {
  title: "Get involved",
  description:
    "Get involved with the Wealth Equity Initiative. Students can use the tools or bring WEI to their school; schools and educators can partner to reach their students.",
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-4xl px-wei-gutter py-wei-section-lg">
      <div className="max-w-3xl">
        <Reveal>
          <p className="text-wei-sm font-semibold uppercase tracking-[0.18em] text-wei-emerald-deep">
            Get involved
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="mt-5 font-wei-display text-wei-3xl font-semibold text-wei-ink">
            WEI is student-led, and growing.
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-6 text-wei-lg text-wei-ink/80">
            We are a student-founded nonprofit already reaching 5,000+ students
            across 40+ schools. Whether you want to use the tools, bring WEI to
            your campus, or partner as a school, there is a place for you here.
          </p>
        </Reveal>
      </div>

      <ContactExperience />
    </section>
  );
}
