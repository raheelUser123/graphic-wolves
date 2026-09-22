"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,

      smoothWheel: true,

      wheelMultiplier: 0.85,

      touchMultiplier: 1,
    });

    /*
     * Keep GSAP ScrollTrigger synced
     * with Lenis smooth scrolling.
     */
    const handleScroll = () => {
      ScrollTrigger.update();
    };

    lenis.on("scroll", handleScroll);

    let animationFrame: number;

    const raf = (time: number) => {
      lenis.raf(time);

      animationFrame = requestAnimationFrame(raf);
    };

    animationFrame = requestAnimationFrame(raf);

    /*
     * Refresh ScrollTrigger after layout is ready.
     */
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(animationFrame);

      lenis.off("scroll", handleScroll);

      lenis.destroy();
    };
  }, []);

  return null;
}