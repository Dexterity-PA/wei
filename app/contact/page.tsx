import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/PlaceholderPage";
import { contactEmail } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach the Wealth Equity Initiative team about partnerships, schools, and getting involved.",
};

export default function ContactPage() {
  return (
    <PlaceholderPage
      title="Contact"
      lead="Want to bring WEI to your school, partner with us, or get involved? We would love to hear from you."
    >
      <a
        href={`mailto:${contactEmail}`}
        className="inline-flex items-center rounded-wei-pill bg-wei-emerald px-6 py-3 text-wei-sm font-semibold text-wei-paper shadow-wei-soft transition-colors hover:bg-wei-emerald-deep"
      >
        {contactEmail}
      </a>
    </PlaceholderPage>
  );
}
