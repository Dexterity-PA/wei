import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { CtaLink } from "@/components/home/CtaLink";
import { FaqList } from "@/components/faq/FaqList";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about the Wealth Equity Initiative: what it is, that it is free and student-led, that it teaches financial education rather than regulated guidance, how to use the tools, and how to bring WEI to a school.",
};

export default function FaqPage() {
  return (
    <>
      <Container as="section" className="pt-wei-section-lg">
        <PageHero
          eyebrow="FAQ"
          title="Plain answers to fair questions."
          intro="What WEI is, who it is for, how the tools work, and where we draw the line. If your question is not here, the contact page is open."
        />
      </Container>

      <FaqList />

      <Container as="section" className="pb-wei-section-lg">
        <Reveal>
          <div className="flex flex-col gap-5 border border-wei-line border-l-2 border-l-wei-emerald bg-wei-paper px-7 py-8 sm:flex-row sm:items-center sm:justify-between md:px-10">
            <p className="max-w-xl text-wei-lg text-wei-ink/80">
              Still have a question we did not answer here?
            </p>
            <CtaLink href="/contact">Ask the team</CtaLink>
          </div>
        </Reveal>
      </Container>
    </>
  );
}
