"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./AgencyIntroSection.module.css";

gsap.registerPlugin(ScrollTrigger);

const paragraphLines = [
  <>
    <strong>We started young and set up</strong> a new type of agency without all the
    layers of hierarchy and bureaucracy, just collaboration and talent. Nine years on,
  </>,

  <>
    we bring exactly that to every project. A close-knit, multi-disciplinary
  </>,

  <>
    team under one roof that ties strategy, design, motion, development,
  </>,

  <>
    and UX together.
  </>,
];

export default function AgencyIntroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const paragraphRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const paragraph = paragraphRef.current;

    if (!section || !paragraph) return;

    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLElement>(
        "[data-agency-line]"
      );

      /* =========================================
         INITIAL STATE

         Paragraph visible hai, lekin faded.
      ========================================= */

      gsap.set(lines, {
        color: "rgba(17,17,17,0.22)",
        opacity: 0.48,
        y: 5,
      });

      /* =========================================
         LINE-BY-LINE WATER / OPACITY WAVE
      ========================================= */

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,

          start: "top 72%",
          end: "bottom 52%",

          scrub: 1.35,

          invalidateOnRefresh: true,

          // temporary debug:
          // markers: true,
        },
      });

      lines.forEach((line, index) => {
        /*
          Har next line thodi der baad.
          Letter splitting nahi hai.
        */

        tl.to(
          line,
          {
            color: "rgba(17,17,17,0.94)",

            opacity: 1,

            y: 0,

            duration: 0.34,

            ease: "power2.out",
          },
          index * 0.14
        );
      });

      /*
        Optional tiny settle.
        Isse wave zyada natural lagti hai.
      */

      tl.to(
        lines,
        {
          color: "#111111",

          duration: 0.18,

          stagger: 0.035,

          ease: "none",
        },
        0.52
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
        {/* =====================================
            LEFT HEADING — STATIC
        ===================================== */}

        <h2 className={styles.heading}>
          Branding, strategy, and web
          design processes are
          different at Your Creative —
        </h2>

        {/* =====================================
            RIGHT PARAGRAPH
        ===================================== */}

        <div
          ref={paragraphRef}
          className={styles.paragraph}
        >
          {paragraphLines.map((line, index) => (
            <span
              key={index}
              data-agency-line
              className={styles.paragraphLine}
            >
              {line}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}