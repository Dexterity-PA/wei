import type { Metadata } from "next";
import { ImpactHero } from "@/components/impact/ImpactHero";
import { SchoolsMap } from "@/components/impact/SchoolsMap";
import { MissionImpact } from "@/components/impact/MissionImpact";
import { ImpactCta } from "@/components/impact/ImpactCta";

export const metadata: Metadata = {
  title: "Impact",
  description:
    "Where the Wealth Equity Initiative started: a representative sample of the schools WEI has reached, plotted on a stylized map, and an honest account of what that reach means.",
};

export default function ImpactPage() {
  return (
    <>
      <ImpactHero />
      <SchoolsMap />
      <MissionImpact />
      <ImpactCta />
    </>
  );
}
