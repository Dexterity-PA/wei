import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export const metadata: Metadata = {
  title: "Tools",
  description:
    "Practical calculators and planners for everyday money decisions, built to make financial literacy hands-on.",
};

export default function ToolsPage() {
  return (
    <PlaceholderPage
      title="Tools"
      lead="A growing toolkit of plain-language calculators and planners for everyday money decisions, from budgeting to saving for the things that matter."
    />
  );
}
