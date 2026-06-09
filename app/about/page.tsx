import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { ProblemSection } from "@/components/about/ProblemSection";
import { MissionSection } from "@/components/about/MissionSection";
import { WhatWeDoSection } from "@/components/about/WhatWeDoSection";
import { FounderSection } from "@/components/about/FounderSection";
import { HonestySection } from "@/components/about/HonestySection";
import { InvolvementCta } from "@/components/about/InvolvementCta";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why the Wealth Equity Initiative exists. A student-founded nonprofit teaching free, plain-language financial literacy to students who would not otherwise get it.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <ProblemSection />
      <MissionSection />
      <WhatWeDoSection />
      <FounderSection />
      <HonestySection />
      <InvolvementCta />
    </>
  );
}
