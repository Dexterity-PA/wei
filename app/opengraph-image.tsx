import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { site } from "@/lib/site";

export const alt = "Wealth Equity Initiative";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

// Site-wide default card: the mission line as the hero, used for the home page
// and any route without its own opengraph-image.
export default function Image() {
  return renderOgCard({ title: site.mission });
}
