import type { Metadata } from "next";
import { ImpactHero } from "@/components/impact/ImpactHero";
import { SchoolsSection } from "@/components/impact/SchoolsSection";
import { MissionImpact } from "@/components/impact/MissionImpact";
import { ImpactCta } from "@/components/impact/ImpactCta";

export const metadata: Metadata = {
  title: "Impact",
  description:
    "Where the Wealth Equity Initiative started: a representative sample of the schools WEI has reached, plotted on an accurate map of India, and an honest account of what that reach means.",
};

export default function ImpactPage() {
  return (
    <>
      <ImpactHero />
      <SchoolsSection />
      <MissionImpact />
      <ImpactCta />
    </>
  );
}
