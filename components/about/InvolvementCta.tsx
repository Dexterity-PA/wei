import Link from "next/link";
import { Reveal } from "@/components/Reveal";

/**
 * Closing call to action. Routes interested people to /contact. Emerald band
 * to end the page on the brand color rather than another paper block.
 */
export function InvolvementCta() {
  return (
    <section className="bg-wei-emerald text-wei-paper">
      <div className="mx-auto max-w-6xl px-wei-gutter py-wei-section-lg">
        <div className="max-w-2xl">
          <Reveal>
            <p className="text-wei-sm font-semibold uppercase tracking-[0.18em] text-wei-paper/80">
              Get involved
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 font-wei-display text-wei-3xl font-semibold text-wei-paper text-balance">
              Help us close the gap.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-wei-lg text-wei-paper/85">
              Whether you want to bring WEI to a school, lend your time, or simply
              learn more about the work, we would like to hear from you.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center justify-center rounded-wei-pill bg-wei-paper px-7 py-3 text-wei-base font-semibold text-wei-ink shadow-wei-soft transition-colors hover:bg-wei-amber"
            >
              Get in touch
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
