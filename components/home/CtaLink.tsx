"use client";

import Link from "next/link";
import { useEffect, useRef, type PointerEvent, type ReactNode } from "react";
import gsap from "gsap";

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

// How far the button leans toward the pointer, and the hard cap on that lean.
const MAGNET_STRENGTH = 0.25;
const MAGNET_CAP = 6;

export function CtaLink({
  href,
  children,
  variant = "primary",
  tone = "light",
  arrow,
  className = "",
}: CtaLinkProps) {
  const showArrow = arrow ?? variant === "primary";
  const ref = useRef<HTMLAnchorElement | null>(null);
  const xTo = useRef<((value: number) => void) | null>(null);
  const yTo = useRef<((value: number) => void) | null>(null);

  // The magnetic pull is reserved for the primary CTA and only on fine pointers
  // with motion allowed. quickTo gives a smooth, interruptible follow with no
  // per-event tween churn. Everything degrades to a plain link otherwise.
  const magnetic = variant === "primary";
  useEffect(() => {
    if (!magnetic) return;
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      xTo.current = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
      yTo.current = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });
    }, el);

    return () => {
      ctx.revert();
      xTo.current = null;
      yTo.current = null;
    };
  }, [magnetic]);

  const onMove = (event: PointerEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el || !xTo.current || !yTo.current) return;
    const rect = el.getBoundingClientRect();
    const relX = event.clientX - (rect.left + rect.width / 2);
    const relY = event.clientY - (rect.top + rect.height / 2);
    const clamp = (n: number) => Math.max(-MAGNET_CAP, Math.min(MAGNET_CAP, n));
    xTo.current(clamp(relX * MAGNET_STRENGTH));
    yTo.current(clamp(relY * MAGNET_STRENGTH));
  };

  const onLeave = () => {
    xTo.current?.(0);
    yTo.current?.(0);
  };

  return (
    <Link
      ref={ref}
      href={href}
      onPointerMove={magnetic ? onMove : undefined}
      onPointerLeave={magnetic ? onLeave : undefined}
      className={`${base} ${styles[tone][variant]} ${className}`}
    >
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
