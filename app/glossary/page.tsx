import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export const metadata: Metadata = {
  title: "Glossary",
  description:
    "Plain-language definitions of money and banking terms, so the language of finance is never a barrier.",
};

export default function GlossaryPage() {
  return (
    <PlaceholderPage
      title="Glossary"
      lead="Plain-language definitions of the money and banking terms you meet in real life, so the language of finance is never a barrier to understanding it."
    />
  );
}
