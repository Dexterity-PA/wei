import { Hero } from "@/components/home/Hero";
import { MissionStatement } from "@/components/home/MissionStatement";
import { ImpactStats } from "@/components/home/ImpactStats";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { ToolkitPreview } from "@/components/home/ToolkitPreview";
import { FounderNote } from "@/components/home/FounderNote";
import { FinalCta } from "@/components/home/FinalCta";

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
