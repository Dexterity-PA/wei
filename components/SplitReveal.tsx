"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  type ElementType,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "@/lib/animation/motion";
import { prefersReducedMotion } from "@/lib/animation/reduced-motion";

gsap.registerPlugin(ScrollTrigger);

// useLayoutEffect on the client so the heading is hidden and split before the
// browser paints (no flash of the full static heading); useEffect on the server
// to avoid the SSR warning.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type SplitRevealProps = {
  /**
   * The heading text. Must be a plain string so it can be measured and split
   * into visual lines. Server-renders as-is, which is the correct, accessible,
   * reduced-motion, and no-JS baseline.
   */
  children: string;
  /** Element to render. Defaults to an h2. */
  as?: ElementType;
  /**
   * "mount" plays as soon as the element mounts (above-the-fold headlines).
   * "scroll" waits until the heading enters the viewport (section headings).
   */
  trigger?: "mount" | "scroll";
  /** Delay before a mount-triggered reveal starts, in seconds. */
  delay?: number;
  className?: string;
  id?: string;
};

/**
 * The single sitewide headline treatment: each wrapped line rises into place
 * from behind an overflow-hidden mask, lines staggered a tight beat apart. One
 * gesture, applied consistently, so the whole site reads as composed by one
 * hand.
 *
 * Robustness contract:
 *  - SSR / no-JS / reduced-motion: the plain heading text renders and stays put.
 *  - Hydration-safe: server and first client render are byte-identical; the
 *    split happens only in a layout effect after hydration.
 *  - No flash: the heading is hidden synchronously before paint, then split and
 *    revealed, so the full static text is never shown then yanked away.
 *  - Responsive-safe: once the rise completes the original markup is restored,
 *    so the heading reflows normally on later resizes.
 */
export function SplitReveal({
  children,
  as: Tag = "h2",
  trigger = "scroll",
  delay = 0,
  className,
  id,
}: SplitRevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reduced motion: leave the server-rendered heading exactly as it is.
    if (prefersReducedMotion()) return;

    const originalHTML = el.innerHTML;
    // Hide before paint so the full heading never flashes before the split.
    gsap.set(el, { autoAlpha: 0 });

    let cancelled = false;
    let ctx: gsap.Context | null = null;

    const restore = () => {
      const node = ref.current;
      if (!node) return;
      node.innerHTML = originalHTML;
      gsap.set(node, { clearProps: "opacity,visibility" });
    };

    // Guard so the font gate below can only ever start the reveal once, even
    // when the timeout and document.fonts.ready resolve in the same tick.
    let started = false;
    const run = () => {
      if (started) return;
      started = true;
      const node = ref.current;
      if (cancelled || !node) return;

      // 1) Lay every word out as an inline-block so we can read its line box.
      const words = (node.textContent ?? "").trim().split(/\s+/);
      node.textContent = "";
      const wordSpans = words.map((word) => {
        const span = document.createElement("span");
        span.textContent = word;
        span.style.display = "inline-block";
        node.appendChild(span);
        node.appendChild(document.createTextNode(" "));
        return span;
      });

      // 2) Group words sharing an offsetTop into visual lines.
      const lines: string[][] = [];
      let lineTop: number | null = null;
      for (const span of wordSpans) {
        if (lineTop === null || Math.abs(span.offsetTop - lineTop) > 1) {
          lines.push([]);
          lineTop = span.offsetTop;
        }
        lines[lines.length - 1].push(span.textContent ?? "");
      }

      // 3) Rebuild as masked lines. The mask is padded and pulled back by an
      //    equal negative margin so descenders are never clipped at rest while
      //    the line's layout height stays identical.
      node.textContent = "";
      const inners = lines.map((line) => {
        const mask = document.createElement("span");
        mask.style.display = "block";
        mask.style.overflow = "hidden";
        mask.style.paddingBottom = "0.12em";
        mask.style.marginBottom = "-0.12em";
        const inner = document.createElement("span");
        inner.style.display = "block";
        inner.style.willChange = "transform";
        inner.textContent = line.join(" ");
        mask.appendChild(inner);
        node.appendChild(mask);
        return inner;
      });

      ctx = gsap.context(() => {
        gsap.set(inners, { yPercent: 118, opacity: 0 });
        gsap.set(node, { autoAlpha: 1 });
        gsap.to(inners, {
          yPercent: 0,
          opacity: 1,
          duration: motion.headline.duration,
          ease: motion.gsapEase.out,
          stagger: motion.headline.stagger,
          // Applies after the trigger fires in both modes, so a heading can sit
          // a beat behind its eyebrow within a sequenced section.
          delay,
          // Drop the will-change hint and restore plain, reflowable markup.
          onComplete: restore,
          scrollTrigger:
            trigger === "scroll"
              ? { trigger: node, start: "top 85%", once: true }
              : undefined,
        });
      }, node);
    };

    // Measuring before the display webfont swaps in would group lines by the
    // fallback metrics. Wait for fonts when we can; the heading is already
    // hidden, so the brief wait costs no visible flash. But if font loading
    // stalls, document.fonts.ready may never resolve and the heading would be
    // left hidden forever, so race the wait against a short timeout. Whichever
    // wins, run() fires (and its run-once guard ignores the loser). mount mode
    // still reveals immediately after this gate, never via a scroll trigger.
    if (typeof document !== "undefined" && document.fonts?.ready) {
      const FONT_TIMEOUT_MS = 1000;
      const timeout = new Promise<void>((resolve) => {
        window.setTimeout(resolve, FONT_TIMEOUT_MS);
      });
      Promise.race([document.fonts.ready, timeout]).then(run);
    } else {
      run();
    }

    return () => {
      cancelled = true;
      if (ctx) ctx.revert();
      restore();
    };
  }, [children, trigger, delay]);

  return (
    <Tag ref={ref} id={id} className={className}>
      {children as ReactNode}
    </Tag>
  );
}
