import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who we are and why financial equity matters. The Wealth Equity Initiative is a student-founded nonprofit teaching financial literacy to underserved students.",
};

export default function AboutPage() {
  return (
    <PlaceholderPage
      title="About"
      lead="The Wealth Equity Initiative is a student-founded nonprofit. We teach financial literacy to students who have been left out of the conversation, and we have already reached more than 5,000 students across 40 plus schools."
    />
  );
}
