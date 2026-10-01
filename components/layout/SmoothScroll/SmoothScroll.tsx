"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import type Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number>(0);

  /* =========================================
     CREATE LENIS ONCE
  ========================================= */
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse), (max-width: 767px)").matches) {
      return;
    }

    // Do not let the browser restore an old page scroll position when
    // navigating back from another App Router route.
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    let disposed = false;
    let lenis: Lenis | null = null;
    let scrollHandler: (() => void) | null = null;

    const startLenis = async () => {
      const { default: LenisClass } = await import("lenis");
      if (disposed) return;

      lenis = new LenisClass({
        duration: 1.25,
        smoothWheel: true,
        wheelMultiplier: 0.85,
        touchMultiplier: 1,
      });

      lenisRef.current = lenis;

      scrollHandler = () => {
        ScrollTrigger.update();
        window.dispatchEvent(new Event("lenis-scroll"));
      };

      lenis.on("scroll", scrollHandler);

      const raf = (time: number) => {
        lenis?.raf(time);
        rafRef.current = requestAnimationFrame(raf);
      };

      rafRef.current = requestAnimationFrame(raf);
    };

    void startLenis().catch((error: unknown) => {
      console.error("Unable to initialize smooth scrolling:", error);
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(rafRef.current);
      if (lenis && scrollHandler) {
        lenis.off("scroll", scrollHandler);
      }
      lenis?.destroy();
      lenisRef.current = null;
      window.history.scrollRestoration = previousRestoration;
    };
  }, []);

  /* =========================================
     ROUTE CHANGE RESET

     Important: keep Lenis alive. Only reset its scroll position and
     refresh ScrollTrigger after the new route has mounted.
  ========================================= */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const lenis = lenisRef.current;

    // Immediately clear the previous route position.
    window.scrollTo(0, 0);
    lenis?.scrollTo(0, {
      immediate: true,
      force: true,
    });

    ScrollTrigger.clearScrollMemory("manual");
    ScrollTrigger.update();

    let frame1 = 0;
    let frame2 = 0;
    let timer = 0;

    frame1 = requestAnimationFrame(() => {
      frame2 = requestAnimationFrame(() => {
        // New route DOM + GSAP effects are mounted by now.
        window.scrollTo(0, 0);
        lenis?.scrollTo(0, {
          immediate: true,
          force: true,
        });

        ScrollTrigger.refresh(true);
        ScrollTrigger.update();
      });
    });

    // Images/fonts can still slightly change layout after navigation.
    timer = window.setTimeout(() => {
      ScrollTrigger.refresh(true);
      ScrollTrigger.update();
    }, 450);

    return () => {
      cancelAnimationFrame(frame1);
      cancelAnimationFrame(frame2);
      window.clearTimeout(timer);
    };
  }, [pathname]);

  return null;
}
