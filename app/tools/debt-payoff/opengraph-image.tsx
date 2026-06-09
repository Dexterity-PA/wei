import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Debt payoff: avalanche vs snowball | Wealth Equity Initiative";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgCard({ title: "Debt payoff: avalanche vs snowball", eyebrow: "Tools" });
}
