import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary";
type Tone = "light" | "dark";

type CtaLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  /** "light" for paper backgrounds, "dark" for ink backgrounds. */
  tone?: Tone;
  /** Show a trailing arrow. Defaults on for primary, off for secondary. */
  arrow?: boolean;
  className?: string;
};

const base =
  "group inline-flex items-center justify-center gap-2 rounded-wei-pill px-6 py-3 text-wei-sm font-semibold transition-colors duration-[var(--duration-wei-fast)] ease-wei-out";

const styles: Record<Tone, Record<Variant, string>> = {
  light: {
    primary: "bg-wei-emerald text-wei-paper hover:bg-wei-emerald-deep",
    secondary:
      "border border-wei-ink/15 text-wei-ink hover:border-wei-ink/35 hover:bg-wei-paper-dim",
  },
  dark: {
    primary: "bg-wei-paper text-wei-ink hover:bg-wei-paper-dim",
    secondary:
      "border border-wei-paper/25 text-wei-paper hover:border-wei-paper/60 hover:bg-wei-paper/10",
  },
};

export function CtaLink({
  href,
  children,
  variant = "primary",
  tone = "light",
  arrow,
  className = "",
}: CtaLinkProps) {
  const showArrow = arrow ?? variant === "primary";

  return (
    <Link href={href} className={`${base} ${styles[tone][variant]} ${className}`}>
      {children}
      {showArrow ? (
        <span
          aria-hidden="true"
          className="transition-transform duration-[var(--duration-wei-fast)] ease-wei-out group-hover:translate-x-0.5"
        >
          &rarr;
        </span>
      ) : null}
    </Link>
  );
}
