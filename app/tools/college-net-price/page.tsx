import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/Reveal";
import { NetPriceTool } from "./NetPriceTool";

export const metadata: Metadata = {
  title: "College net-price reality",
  description:
    "See the gap between a college's sticker price and what you actually pay after grants and scholarships, plus a rough shape of repaying any loans. Education, not advice.",
};

export default function CollegeNetPricePage() {
  return (
    <Container as="section" className="py-wei-section-lg">
      <PageHero
        eyebrow="Tools"
        title="The sticker price is not the real price."
        intro="The big number on a college's website is rarely what students pay. Enter the sticker price and the aid in the picture to see the real net price, and a rough shape of what repaying any loans could look like."
      />

      <Reveal delay={0.1} className="mt-12">
        <NetPriceTool />
      </Reveal>

      <div className="mt-16 grid gap-x-wei-gutter gap-y-10 md:grid-cols-12">
        <div className="md:col-span-4 lg:col-span-3">
          <span className="wei-eyebrow text-wei-emerald-deep">How to read this</span>
        </div>
        <div className="md:col-span-8 md:max-w-3xl space-y-5 text-wei-base text-wei-ink/80">
          <p>
            <span className="font-semibold text-wei-ink">Sticker price</span> is
            the published cost of attending: tuition and fees plus room and board.
            Very few students pay it in full.
          </p>
          <p>
            <span className="font-semibold text-wei-ink">Gift aid</span> is grants
            and scholarships you do not repay. Subtract it from the sticker price
            and you get the{" "}
            <span className="font-semibold text-wei-ink">net price</span>, the
            amount you actually have to cover. That is the number worth comparing
            between schools.
          </p>
          <p>
            What the net price is not covered by gift aid usually comes from family
            contribution, savings, and{" "}
            <span className="font-semibold text-wei-ink">loans</span>, which you
            repay later with interest. The repayment shape below shows roughly what
            paying back the loans could feel like month to month.
          </p>
        </div>
      </div>

      <div className="mt-12 grid gap-x-wei-gutter gap-y-6 md:grid-cols-12">
        <div className="md:col-span-4 lg:col-span-3">
          <span className="wei-eyebrow text-wei-ink/50">Assumptions</span>
        </div>
        <div className="md:col-span-8 md:max-w-3xl">
          <div className="border border-wei-line bg-wei-paper-dim p-6 text-wei-sm text-wei-ink/75">
            <p className="font-semibold text-wei-ink">
              Illustrative estimate. Real costs and aid vary widely.
            </p>
            <ul className="mt-4 space-y-2 list-disc pl-5">
              <li>
                Net price is simply the sticker price minus gift aid for one year.
                Aid often changes year to year, so a four-year total is not just
                this number times four.
              </li>
              <li>
                The loan repayment shape uses the standard fixed-payment formula
                for the amount borrowed over a 10-year term at a fixed 6.53% rate,
                shown as a rough illustration. Real student loan rates and terms
                differ, and federal and private loans work differently.
              </li>
              <li>
                The repayment figures cover only the loan amount you enter for one
                year. Borrowing each year for a full degree would multiply them.
              </li>
              <li>
                This tool does not estimate your actual aid eligibility. Each
                school publishes a net price calculator for that.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Container>
  );
}
