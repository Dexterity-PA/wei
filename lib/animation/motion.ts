/**
 * Motion tokens for JS consumers (GSAP, inline styles).
 * Mirrors the CSS tokens defined in app/globals.css. Keep the two in sync:
 *   --duration-wei-fast/base/slow  ->  durationMs.fast/base/slow
 *   --ease-wei-out/in-out/emphasis ->  easeCss.out/inOut/emphasis
 *
 * GSAP consumes seconds (duration) and named eases (gsapEase). CSS and the Web
 * Animations API consume milliseconds (durationMs) and cubic-bezier strings
 * (easeCss). easeArray gives the raw control points when a library wants them.
 */

export const duration = {
  fast: 0.3,
  base: 0.6,
  slow: 0.9,
} as const;

export const durationMs = {
  fast: 300,
  base: 600,
  slow: 900,
} as const;

export const easeCss = {
  out: "cubic-bezier(0.16, 1, 0.3, 1)",
  inOut: "cubic-bezier(0.65, 0, 0.35, 1)",
  emphasis: "cubic-bezier(0.22, 1, 0.36, 1)",
} as const;

export const easeArray = {
  out: [0.16, 1, 0.3, 1],
  inOut: [0.65, 0, 0.35, 1],
  emphasis: [0.22, 1, 0.36, 1],
} as const;

/** Named GSAP eases that match the intent of the CSS cubic-beziers above. */
export const gsapEase = {
  out: "power3.out",
  inOut: "power2.inOut",
  emphasis: "expo.out",
} as const;

export const motion = {
  duration,
  durationMs,
  easeCss,
  easeArray,
  gsapEase,
} as const;

export type MotionTokens = typeof motion;
