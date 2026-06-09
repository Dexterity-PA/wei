"use client";

/**
 * Single source of truth for the reduced-motion preference check used by every
 * JS-driven (GSAP) animation on the site. The CSS blanket rule in globals.css
 * only zeroes CSS transition/animation durations; it does NOT neutralize GSAP
 * tweens that set inline opacity/transform. Every GSAP reveal path must call
 * this and, when true, jump straight to the final visible state with no tween.
 *
 * SSR-safe: returns false on the server (no window), matching the visible,
 * final-state markup we always render server-side.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
