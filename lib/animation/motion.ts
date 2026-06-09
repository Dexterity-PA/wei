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

/**
 * Stagger offsets in seconds. The whole site uses one cadence so every
 * sequenced entrance reads as part of a single system rather than ad-hoc
 * delays. `line` is the tight beat between rising headline lines; `item` is
 * the slightly looser beat between sequenced blocks (eyebrow, headline,
 * subcopy, supporting). Kept inside the brief's 40-80ms window.
 */
export const stagger = {
  line: 0.06,
  item: 0.08,
} as const;

/**
 * Travel distances in pixels for the fade-and-rise entrance. Short on purpose
 * (the brief calls for 8-16px): motion that nudges, never throws. `line` is the
 * extra travel a masked headline line covers beneath its clip.
 */
export const distance = {
  sm: 8,
  base: 12,
  lg: 16,
} as const;

/** Durations for the headline line-rise, tuned a touch quicker than `base`. */
export const headline = {
  duration: 0.7,
  stagger: stagger.line,
} as const;

export const motion = {
  duration,
  durationMs,
  easeCss,
  easeArray,
  gsapEase,
  stagger,
  distance,
  headline,
} as const;

export type MotionTokens = typeof motion;
