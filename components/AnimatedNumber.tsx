"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  type ElementType,
} from "react";
import gsap from "gsap";
import { motion } from "@/lib/animation/motion";
import { prefersReducedMotion } from "@/lib/animation/reduced-motion";

// useLayoutEffect on the client so a settle starts from the last painted value
// without a flash; useEffect on the server to avoid the SSR warning.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const defaultFormat = (n: number) => Math.round(n).toLocaleString("en-US");

type AnimatedNumberProps = {
  /** The current numeric value. When it changes, the display settles to it. */
  value: number;
  /** Formats the number for display, e.g. a currency or percent formatter. */
  format?: (n: number) => string;
  /**
   * Settle duration in seconds. Short and mechanical by default so the
   * cosmetic count-up never lingers on a wrong transient figure.
   */
  durationSeconds?: number;
  className?: string;
  /** Element tag to render. Defaults to a span. */
  as?: ElementType;
};

/**
 * A tabular mono readout that ticks from its previous value to the next one
 * whenever the value changes, so tool outputs settle mechanically rather than
 * snapping. Pair with the `wei-num` class for tabular figures.
 *
 * Contract that keeps tools responsive:
 *  - The value is never gated: the component renders the exact current value on
 *    the server and on first paint, and updates instantly under reduced motion.
 *  - It does not animate on mount, only on change, so first compute is immediate.
 *  - The tween writes textContent directly (no React re-render per frame).
 */
export function AnimatedNumber({
  value,
  format = defaultFormat,
  durationSeconds = 0.32,
  className,
  as: Tag = "span",
}: AnimatedNumberProps) {
  const ref = useRef<HTMLElement | null>(null);
  // The last value we have settled to; seeded with the initial value so the
  // first render does not animate.
  const displayed = useRef(value);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const from = displayed.current;
    displayed.current = value;

    if (from === value) {
      el.textContent = format(value);
      return;
    }

    if (prefersReducedMotion()) {
      el.textContent = format(value);
      return;
    }

    const counter = { v: from };
    const tween = gsap.to(counter, {
      v: value,
      duration: durationSeconds,
      ease: motion.gsapEase.out,
      onUpdate: () => {
        el.textContent = format(counter.v);
      },
      onComplete: () => {
        el.textContent = format(value);
      },
    });

    return () => {
      tween.kill();
    };
    // format/duration are stable in practice; the value drives each settle.
  }, [value]);

  return (
    <Tag ref={ref} className={className}>
      {format(value)}
    </Tag>
  );
}
