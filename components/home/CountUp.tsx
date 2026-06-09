"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "@/lib/animation/motion";
import { prefersReducedMotion } from "@/lib/animation/reduced-motion";

gsap.registerPlugin(ScrollTrigger);

// useLayoutEffect on the client (runs before paint, so the reset to 0 never
// flashes), useEffect on the server to avoid the SSR warning.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type CountUpProps = {
  /** Final value to count to. */
  target: number;
  /** Text appended after the number, e.g. "+". */
  suffix?: string;
  /** Animation length in seconds. */
  durationSeconds?: number;
  className?: string;
};

export function CountUp({
  target,
  suffix = "",
  durationSeconds = 1.6,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null);

  const format = (n: number) =>
    `${Math.round(n).toLocaleString("en-US")}${suffix}`;

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reduced motion: leave the final value (already server-rendered) in place.
    if (prefersReducedMotion()) return;

    const counter = { value: 0 };
    el.textContent = format(0);

    const ctx = gsap.context(() => {
      // ScrollTrigger here rides the same GSAP ticker that drives Lenis, so no
      // second RAF loop is introduced. The band sits below the fold, so a
      // scroll start is the right trigger.
      gsap.to(counter, {
        value: target,
        duration: durationSeconds,
        ease: motion.gsapEase.out,
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
        onUpdate: () => {
          el.textContent = format(counter.value);
        },
      });
    }, el);

    return () => ctx.revert();
  }, [target, suffix, durationSeconds]);

  // Server and first client render show the final value: correct for no-JS,
  // SEO, and reduced motion. The layout effect resets to 0 before paint when
  // motion is allowed.
  return (
    <span ref={ref} className={className}>
      {format(target)}
    </span>
  );
}
