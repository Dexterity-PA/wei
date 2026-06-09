import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/Reveal";
import { PaycheckTool } from "./PaycheckTool";
import { TAX_YEAR } from "./taxes";

export const metadata: Metadata = {
  title: "Paycheck breakdown",
  description:
    "A plain-language estimate of what is taken out of a paycheck: federal income tax, Social Security, Medicare, and a simplified state line, each explained. An estimate for learning, not tax filing.",
};

export default function PaycheckBreakdownPage() {
  return (
    <Container as="section" className="py-wei-section-lg">
      <PageHero
        eyebrow="Tools"
        title="Why your paycheck is smaller than your pay."
        intro="Enter your gross pay and a few basics to see an estimated take-home amount, with each tax line broken out and explained in plain language. This is an estimate for learning, not tax filing."
      />

      <Reveal delay={0.1} className="mt-12">
        <PaycheckTool />
      </Reveal>

      <div className="mt-16 grid gap-x-wei-gutter gap-y-10 md:grid-cols-12">
        <div className="md:col-span-4 lg:col-span-3">
          <span className="wei-eyebrow text-wei-emerald-deep">How to read this</span>
        </div>
        <div className="md:col-span-8 md:max-w-3xl space-y-5 text-wei-base text-wei-ink/80">
          <p>
            <span className="font-semibold text-wei-ink">Gross pay</span> is what
            you earn before anything is taken out.{" "}
            <span className="font-semibold text-wei-ink">Take-home pay</span> (also
            called net pay) is what actually lands in your account after taxes.
          </p>
          <p>
            The biggest pieces taken out are usually federal income tax and FICA.{" "}
            <span className="font-semibold text-wei-ink">FICA</span> is two
            payroll taxes together: Social Security (6.2% up to a yearly wage cap)
            and Medicare (1.45% of all pay). Many people also owe state income
            tax, which this tool models as a single simplified flat rate.
          </p>
          <p>
            Your real paycheck also depends on things this tool does not include,
            like money you set aside before tax for retirement or health
            insurance, tax credits, and how you filled out your W-4. Treat the
            number here as a ballpark.
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
              Simplified estimate for the {TAX_YEAR} tax year. Not tax filing.
            </p>
            <ul className="mt-4 space-y-2 list-disc pl-5">
              <li>
                Federal income tax uses simplified {TAX_YEAR} IRS brackets and the{" "}
                {TAX_YEAR} standard deduction, applied to your annual gross. It
                does not model your W-4 allowances, other income, or credits.
              </li>
              <li>
                Social Security is 6.2% up to the {TAX_YEAR} wage base of $168,600;
                Medicare is 1.45% of all pay. The extra Medicare tax on high
                earners is not included.
              </li>
              <li>
                State income tax is a single flat-rate stand-in from a short
                labeled list, not any real state tax code. Most states use
                brackets, deductions, and sometimes local taxes this does not
                model.
              </li>
              <li>
                Pre-tax retirement and health deductions, tax credits, and local
                or city taxes are left out. Your real paycheck will differ.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Container>
  );
}
