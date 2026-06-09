"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "@/lib/animation/motion";

gsap.registerPlugin(ScrollTrigger);

type RevealTrigger = "mount" | "scroll";

type RevealProps = {
  children: ReactNode;
  /**
   * "mount" animates in as soon as the element mounts. "scroll" waits for the
   * element to enter the viewport.
   *
   * Default is "mount" on purpose. A scroll trigger on content that already
   * sits below the fold (tall pages) can leave the element stuck at opacity 0
   * if the start position is never crossed. Tall pages should keep the default.
   * Only opt into "scroll" for content you are confident scrolls into view.
   */
  trigger?: RevealTrigger;
  /** Delay before the animation starts, in seconds. */
  delay?: number;
  /** Vertical travel distance for the rise, in pixels. */
  y?: number;
  /** Animate only once (scroll trigger). */
  once?: boolean;
  className?: string;
  /** Element tag to render. Defaults to a div. */
  as?: keyof React.JSX.IntrinsicElements;
};

export function Reveal({
  children,
  trigger = "mount",
  delay = 0,
  y = 12,
  once = true,
  className,
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Under reduced motion, snap to the final visible state with no animation.
    if (prefersReduced) {
      gsap.set(el, { opacity: 1, y: 0, clearProps: "transform" });
      return;
    }

    const ctx = gsap.context(() => {
      const to: gsap.TweenVars = {
        opacity: 1,
        y: 0,
        duration: motion.duration.base,
        ease: motion.gsapEase.out,
        delay,
      };

      if (trigger === "scroll") {
        gsap.to(el, {
          ...to,
          scrollTrigger: { trigger: el, start: "top 85%", once },
        });
      } else {
        gsap.to(el, to);
      }
    }, el);

    return () => ctx.revert();
  }, [trigger, delay, y, once]);

  // Initial hidden state is rendered identically on server and client to avoid
  // any hydration mismatch. GSAP takes over from this exact state on mount.
  const initialStyle: CSSProperties = {
    opacity: 0,
    transform: `translateY(${y}px)`,
    willChange: "opacity, transform",
  };

  const Tag = as as React.ElementType;

  return (
    <Tag ref={ref} className={className} style={initialStyle}>
      {children}
    </Tag>
  );
}
