import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { ContactExperience } from "@/components/contact/ContactExperience";

export const metadata: Metadata = {
  title: "Get involved",
  description:
    "Get involved with the Wealth Equity Initiative. Students can use the tools or bring WEI to their school; schools and educators can partner to reach their students.",
};

export default function ContactPage() {
  return (
    <Container as="section" className="py-wei-section-lg">
      <PageHero
        eyebrow="Get involved"
        title="WEI is student-led, and growing."
        intro="We are a student-founded nonprofit already reaching 5,000+ students across 40+ schools. Whether you want to use the tools, bring WEI to your campus, or partner as a school, there is a place for you here."
        className="max-w-3xl"
      />

      <ContactExperience />
    </Container>
  );
}
