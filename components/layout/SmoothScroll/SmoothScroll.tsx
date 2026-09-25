"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
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

    // Do not let the browser restore an old page scroll position when
    // navigating back from another App Router route.
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    const lenis = new Lenis({
      duration: 1.25,
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1,
    });

    lenisRef.current = lenis;

    const handleScroll = () => {
      ScrollTrigger.update();
    };

    lenis.on("scroll", handleScroll);

    const raf = (time: number) => {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };

    rafRef.current = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafRef.current);
      lenis.off("scroll", handleScroll);
      lenis.destroy();
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
