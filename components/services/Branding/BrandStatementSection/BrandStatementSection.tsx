"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./BrandStatementSection.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function BrandStatementSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const iconRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const icon = iconRef.current;

    if (!section || !icon) return;

    const ctx = gsap.context(() => {
      const lines =
        gsap.utils.toArray<HTMLElement>(
          "[data-brand-line]"
        );

      /* =========================================
         INITIAL TEXT
      ========================================= */

      gsap.set(lines, {
        color: "rgba(17, 17, 17, 0.28)",
        opacity: 0.72,
      });

      /* =========================================
         INITIAL ICON
      ========================================= */

      gsap.set(icon, {
        opacity: 0,
        scale: 0.15,
        rotation: -18,
        y: 18,
        filter: "blur(7px)",
        transformOrigin: "center center",
      });

      /* =========================================
         MASTER SCROLL TIMELINE
      ========================================= */

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,

          start: "top 72%",
          end: "bottom 42%",

          scrub: 1.4,

          invalidateOnRefresh: true,

          // debug:
          // markers: true,
        },
      });

      /* =========================================
         LINE 1
      ========================================= */

      tl.to(
        lines[0],
        {
          color: "#111111",
          opacity: 1,
          duration: 0.34,
          ease: "none",
        },
        0
      );

      /* =========================================
         LINE 2
         Starts before line 1 fully finishes
      ========================================= */

      tl.to(
        lines[1],
        {
          color: "#111111",
          opacity: 1,
          duration: 0.36,
          ease: "none",
        },
        0.15
      );

      /* =========================================
         LINE 3
      ========================================= */

      tl.to(
        lines[2],
        {
          color: "#111111",
          opacity: 1,
          duration: 0.38,
          ease: "none",
        },
        0.30
      );

      /* =========================================
         LINE 4
      ========================================= */

      tl.to(
        lines[3],
        {
          color: "#111111",
          opacity: 1,
          duration: 0.4,
          ease: "none",
        },
        0.43
      );

      /* =========================================
         ICON POP
      ========================================= */

      tl.to(
        icon,
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          y: 0,
          filter: "blur(0px)",

          duration: 0.32,

          ease: "back.out(1.7)",
        },
        0.63
      );

      /* =========================================
         SMALL ICON SETTLE
      ========================================= */

      tl.to(
        icon,
        {
          scale: 1.06,

          duration: 0.1,

          ease: "sine.out",
        },
        0.87
      );

      tl.to(
        icon,
        {
          scale: 1,

          duration: 0.1,

          ease: "sine.inOut",
        },
        0.96
      );

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
    >
      <div className={styles.inner}>
        <h2 className={styles.heading}>
          <span
            data-brand-line
            className={styles.line}
          >
            We combine premium
          </span>

          <span
            data-brand-line
            className={styles.line}
          >
            quality with strategic 
          </span>

          <span
            data-brand-line
            className={styles.line}
          >
            scalability to elevate your
          </span>

          <span
            data-brand-line
            className={`${styles.line} ${styles.lastLine}`}
          >
            <span>brand</span>

            <img
              ref={iconRef}
              src="/images/services/branding/brand-icon.svg"
              alt=""
              className={styles.icon}
              aria-hidden="true"
            />
          </span>
        </h2>
      </div>
    </section>
  );
}