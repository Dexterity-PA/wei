import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { CtaLink } from "@/components/home/CtaLink";

const backLinks = [
  { href: "/", label: "Home", hint: "Back to the start" },
  { href: "/tools", label: "Tools", hint: "Calculators and planners" },
  { href: "/glossary", label: "Glossary", hint: "Plain-language money terms" },
];

/**
 * Styled 404. Rendered for any unmatched URL across the app, wrapped by the
 * root layout so the nav and footer stay in place. Intentionally static: no
 * mount animation, so it is reduced-motion safe and visible without JavaScript.
 */
export default function NotFound() {
  return (
    <Container as="section" className="py-wei-section-lg">
      <div className="grid gap-x-wei-gutter gap-y-10 md:grid-cols-12 md:items-end">
        <div className="md:col-span-4">
          <Eyebrow>Error 404</Eyebrow>
          <p className="wei-num mt-6 text-[clamp(4.5rem,3rem+9vw,8rem)] font-semibold leading-none text-wei-ink">
            404
          </p>
        </div>

        <div className="md:col-span-8 md:max-w-2xl">
          <h1 className="text-wei-3xl font-semibold text-balance text-wei-ink">
            This page took a wrong turn.
          </h1>
          <p className="mt-5 text-wei-lg text-wei-ink/70">
            The link may be old, or the address might have a small typo. Nothing
            is broken. Here are a few good places to pick back up.
          </p>
          <div className="mt-8">
            <CtaLink href="/">Back to home</CtaLink>
          </div>
        </div>
      </div>

      <nav aria-label="Helpful links" className="wei-hairgrid mt-16 grid grid-cols-1 sm:grid-cols-3">
        {backLinks.map((link, index) => (
          <Link
            key={link.href}
            href={link.href}
            className="group flex flex-col p-7 transition-colors duration-[var(--duration-wei-fast)] ease-wei-out hover:bg-wei-paper-dim/60"
          >
            <span className="wei-num text-wei-sm text-wei-ink/35">
              {`0${index + 1}`}
            </span>
            <span className="mt-5 inline-flex items-center gap-1.5 font-wei-display text-wei-xl font-semibold text-wei-ink">
              {link.label}
              <span
                aria-hidden="true"
                className="text-wei-emerald-deep transition-transform duration-[var(--duration-wei-fast)] ease-wei-out group-hover:translate-x-0.5"
              >
                &rarr;
              </span>
            </span>
            <span className="mt-2 text-wei-sm text-wei-ink/65">{link.hint}</span>
          </Link>
        ))}
      </nav>
    </Container>
  );
}
