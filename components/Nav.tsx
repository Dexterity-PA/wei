"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { nav, site } from "@/lib/site";
import { motion } from "@/lib/animation/motion";
import { useLenis } from "@/components/providers/SmoothScrollProvider";

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Nav() {
  const pathname = usePathname();
  const lenis = useLenis();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLUListElement | null>(null);

  // Close the mobile menu whenever the route changes. Resetting during render
  // when the tracked value changes is the React-recommended pattern and avoids
  // an extra effect pass.
  const [trackedPath, setTrackedPath] = useState(pathname);
  if (pathname !== trackedPath) {
    setTrackedPath(pathname);
    setOpen(false);
  }

  // The hairline and surface only appear once the page has scrolled, so the nav
  // sits flush against the masthead at the top and firms up over content. Plain
  // window scroll works whether or not Lenis is active (it scrolls the real
  // page), and stays correct under reduced motion where Lenis never mounts.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-lock while the mobile menu is open. Stop Lenis when present and also
  // pin the body, so the lock holds under prefers-reduced-motion (Lenis null).
  useEffect(() => {
    if (!open) return;

    lenis?.stop();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      lenis?.start();
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, lenis]);

  // Choreograph the mobile menu links in when the panel opens: a tight rise and
  // fade, item by item. Reduced motion is respected, so links simply appear.
  useEffect(() => {
    if (!open) return;
    const ul = menuRef.current;
    if (!ul) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(ul.children, {
        opacity: 0,
        y: 10,
        duration: motion.duration.fast,
        ease: motion.gsapEase.out,
        stagger: motion.stagger.item,
      });
    }, ul);
    return () => ctx.revert();
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`sticky top-0 border-b backdrop-blur-md transition-[background-color,border-color] duration-[var(--duration-wei-base)] ease-wei-out ${
        solid
          ? "border-wei-line/70 bg-wei-paper/85"
          : "border-transparent bg-wei-paper/0"
      }`}
      style={{ zIndex: "var(--z-wei-nav)" }}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between px-wei-gutter py-4"
      >
        <Link
          href="/"
          className="font-wei-display text-wei-lg font-semibold tracking-tight text-wei-ink"
        >
          {site.shortName}
          <span className="sr-only"> home, {site.name}</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-7 md:flex">
          {nav.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`wei-link text-wei-sm font-medium transition-colors hover:text-wei-emerald-deep ${
                    active ? "text-wei-emerald-deep" : "text-wei-ink/75"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-wei-md text-wei-ink md:hidden"
        >
          <span className="relative block h-4 w-5" aria-hidden="true">
            <span
              className={`absolute left-0 block h-0.5 w-5 bg-current transition-transform duration-200 ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-0.5 w-5 bg-current transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-5 bg-current transition-transform duration-200 ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </nav>

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-wei-line/70 bg-wei-paper md:hidden"
      >
        <ul
          ref={menuRef}
          className="mx-auto flex max-w-6xl flex-col gap-1 px-wei-gutter py-4"
        >
          {nav.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`block rounded-wei-md px-3 py-3 text-wei-base font-medium transition-colors hover:bg-wei-paper-dim ${
                    active ? "text-wei-emerald-deep" : "text-wei-ink"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
