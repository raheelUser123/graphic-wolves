"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./CreativeTeamSection.module.css";

gsap.registerPlugin(ScrollTrigger);

const captionText =
  "Learn more about our studio, our culture and most importantly our people";

export default function CreativeTeamSection() {
  const sectionRef =
    useRef<HTMLElement>(null);

  const bgRef =
    useRef<HTMLDivElement>(null);

  const headingRef =
    useRef<HTMLHeadingElement>(null);

  const captionRef =
    useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const section =
      sectionRef.current;

    const bg =
      bgRef.current;

    const heading =
      headingRef.current;

    const caption =
      captionRef.current;

    if (
      !section ||
      !bg ||
      !heading ||
      !caption
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      /* =========================================
         CAPTION LETTER SPLIT
      ========================================= */

      const letters =
        caption.querySelectorAll<HTMLElement>(
          "[data-caption-letter]"
        );

      gsap.set(bg, {
        yPercent: 14,
        scale: 1.08,
      });

      gsap.set(heading, {
        opacity: 0.35,
        y: 36,
        filter: "blur(6px)",
      });

      gsap.set(letters, {
        opacity: 0,
        y: 10,
        filter: "blur(4px)",
      });

      /* =========================================
         MASTER TIMELINE
      ========================================= */

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
          end: "bottom 38%",
          scrub: 1.15,
          invalidateOnRefresh: true,
        },
      });

      /* background enters */

      tl.to(
        bg,
        {
          yPercent: 0,
          scale: 1,
          duration: 0.45,
          ease: "power3.out",
        },
        0
      );

      /* heading becomes strong */

      tl.to(
        heading,
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.32,
          ease: "power3.out",
        },
        0.08
      );

      /* caption types in */

      tl.to(
        letters,
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.018,
          duration: 0.09,
          ease: "power2.out",
        },
        0.28
      );

      /* subtle parallax while leaving */

      gsap.to(bg, {
        yPercent: -8,
        ease: "none",

        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
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
      aria-labelledby="creative-team-heading"
    >
      {/* =====================================
          BACKGROUND
      ===================================== */}

      <div
        ref={bgRef}
        className={styles.background}
        aria-hidden="true"
      />

      <div
        className={styles.overlay}
        aria-hidden="true"
      />

      {/* =====================================
          CONTENT
      ===================================== */}

      <div className={styles.content}>
        <h2
          ref={headingRef}
          id="creative-team-heading"
          className={styles.heading}
        >
          Designers, Developers,
          <br />
          Strategists, Sellers,
          &amp; Storyteller
        </h2>

        <p
          ref={captionRef}
          className={styles.caption}
        >
          {captionText
            .split("")
            .map((char, index) => (
              <span
                key={`${char}-${index}`}
                data-caption-letter
                className={
                  styles.captionLetter
                }
              >
                {char === " "
                  ? "\u00A0"
                  : char}
              </span>
            ))}
        </p>
      </div>
    </section>
  );
}