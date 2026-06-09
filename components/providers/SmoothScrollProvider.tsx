"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * The active Lenis instance is published through a stable ref held in context.
 * Reading the ref avoids a cascading re-render when the instance is created in
 * the mount effect. ref.current is null on the server, null under
 * prefers-reduced-motion (Lenis is never created), and null until the mount
 * effect runs on the client. Consumers must handle null.
 */
const LenisRefContext = createContext<RefObject<Lenis | null>>({
  current: null,
});

/** Access the active Lenis instance, or null when smooth scroll is inactive. */
export function useLenis(): Lenis | null {
  return useContext(LenisRefContext).current;
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Fully skip smooth scroll when the user prefers reduced motion. Native
    // scrolling stays in control and no extra RAF loop is started.
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    // autoRaf:false is critical. Lenis must NOT run its own requestAnimationFrame
    // loop, because we drive it from the GSAP ticker below. One shared RAF loop
    // keeps Lenis and every ScrollTrigger on the same clock so they never fight.
    const instance = new Lenis({
      autoRaf: false,
      lerp: 0.1,
      smoothWheel: true,
    });

    instance.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => {
      // GSAP ticker time is in seconds; Lenis.raf expects milliseconds.
      instance.raf(time * 1000);
    };

    gsap.ticker.add(onTick);
    // Disable lag smoothing so a stalled frame does not desync Lenis.
    gsap.ticker.lagSmoothing(0);

    lenisRef.current = instance;

    return () => {
      gsap.ticker.remove(onTick);
      instance.off("scroll", ScrollTrigger.update);
      instance.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisRefContext.Provider value={lenisRef}>
      {children}
    </LenisRefContext.Provider>
  );
}
