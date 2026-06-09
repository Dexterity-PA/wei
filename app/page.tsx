import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { MissionStatement } from "@/components/home/MissionStatement";
import { ImpactStats } from "@/components/home/ImpactStats";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { ToolkitPreview } from "@/components/home/ToolkitPreview";
import { FounderNote } from "@/components/home/FounderNote";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata: Metadata = {
  // Home keeps the bare site name (no "%s | ..." template), and is the one
  // route that owns the root canonical.
  title: "Wealth Equity Initiative",
  description:
    "A student-founded nonprofit teaching free, plain-language financial literacy, with a toolkit of everyday money calculators and short lessons for students.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <MissionStatement />
      <ImpactStats />
      <WhatWeDo />
      <ToolkitPreview />
      <FounderNote />
      <FinalCta />
    </>
  );
}
