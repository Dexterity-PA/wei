import type { Metadata } from "next";
import { PartnersHero } from "@/components/partners/PartnersHero";
import { WhatPartneringLooksLike } from "@/components/partners/WhatPartneringLooksLike";
import { WhatWeProvide } from "@/components/partners/WhatWeProvide";
import { WhatWeAsk } from "@/components/partners/WhatWeAsk";
import { PartnersCta } from "@/components/partners/PartnersCta";

export const metadata: Metadata = {
  title: "For schools",
  description:
    "Bring the Wealth Equity Initiative to your classroom at no cost. Free lessons, everyday money tools, and a plain-language curriculum for schools and educators. Student-led and education only.",
};

export default function PartnersPage() {
  return (
    <>
      <PartnersHero />
      <WhatPartneringLooksLike />
      <WhatWeProvide />
      <WhatWeAsk />
      <PartnersCta />
    </>
  );
}
