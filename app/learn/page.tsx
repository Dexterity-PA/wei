import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export const metadata: Metadata = {
  title: "Learn",
  description:
    "Guides and lessons that build financial literacy step by step, written in plain language for students.",
};

export default function LearnPage() {
  return (
    <PlaceholderPage
      title="Learn"
      lead="Step-by-step guides and lessons that build financial literacy from the ground up, written in plain language and grounded in everyday life."
    />
  );
}
