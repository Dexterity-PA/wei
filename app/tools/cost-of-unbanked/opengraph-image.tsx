import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "The cost of being unbanked | Wealth Equity Initiative";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgCard({ title: "The cost of being unbanked", eyebrow: "Tools" });
}
