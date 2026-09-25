"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollSideShadow() {
  const shadowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const shadow = shadowRef.current;

    if (!shadow) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        shadow,
        {
          width: "0px",
          opacity: 0,
        },
        {
          width: "260px",
          opacity: 1,

          ease: "none",

          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5,
            invalidateOnRefresh: true,
          },
        }
      );
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={shadowRef}
      className="scroll-side-shadow"
      aria-hidden="true"
    />
  );
}