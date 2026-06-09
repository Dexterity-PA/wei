import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getModule, getModuleSlugs } from "@/lib/learn";

export const alt = "A lesson from Wealth Equity Initiative";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

// Pre-render a card for every known module at build time.
export function generateStaticParams() {
  return getModuleSlugs().map((slug) => ({ slug }));
}

// Dynamic card built from the module title.
export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const mod = getModule(slug);
  return renderOgCard({ title: mod?.title ?? "Learn", eyebrow: "Learn" });
}
