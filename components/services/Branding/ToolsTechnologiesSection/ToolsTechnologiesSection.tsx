"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./ToolsTechnologiesSection.module.css";

gsap.registerPlugin(ScrollTrigger);

const tools = [
  {
    name: "Adobe",
    icon: "/images/services/branding/tools/adobe.svg",
    alt: "Adobe",
  },
  {
    name: "Illustrator",
    icon: "/images/services/branding/tools/illustrator.svg",
    alt: "Illustrator",
  },
  {
    name: "Photoshop",
    icon: "/images/services/branding/tools/photoshop.svg",
    alt: "Photoshop",
  },
  {
    name: "Figma",
    icon: "/images/services/branding/tools/figma.svg",
    alt: "Figma",
  },
  {
    name: "Slack",
    icon: "/images/services/branding/tools/slack.svg",
    alt: "Slack",
  },
  {
    name: "ClaudeAi",
    icon: "/images/services/branding/tools/claude.svg",
    alt: "Claude Ai",
  },
  {
    name: "OpenAI",
    icon: "/images/services/branding/tools/openai.svg",
    alt: "OpenAI",
  },
  {
    name: "Trello",
    icon: "/images/services/branding/tools/trello.svg",
    alt: "Trello",
  },
];

export default function ToolsTechnologiesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const heading =
        section.querySelector<HTMLElement>(
          "[data-tools-heading]"
        );

      const caption =
        section.querySelector<HTMLElement>(
          "[data-tools-caption]"
        );

      const cards =
        gsap.utils.toArray<HTMLElement>(
          "[data-tool-card]"
        );

      const decor =
        section.querySelector<HTMLElement>(
          "[data-tools-decor]"
        );

      /* =========================================
         INITIAL
      ========================================= */

      gsap.set(heading, {
        y: 35,
        opacity: 0,
        filter: "blur(5px)",
      });

      gsap.set(caption, {
        y: 18,
        opacity: 0,
      });

      gsap.set(cards, {
        y: 55,
        opacity: 0,
        scale: 0.94,
      });

      if (decor) {
        gsap.set(decor, {
          x: -70,
          y: 40,
          opacity: 0,
          rotation: -8,
          scale: 0.88,
        });
      }

      /* =========================================
         ENTRANCE TIMELINE
      ========================================= */

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 76%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(heading, {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.9,
        ease: "power3.out",
      });

      tl.to(
        caption,
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
        },
        "-=0.55"
      );

      tl.to(
        cards,
        {
          y: 0,
          opacity: 1,
          scale: 1,

          duration: 0.78,

          stagger: {
            each: 0.08,
            from: "start",
          },

          ease: "power3.out",
        },
        "-=0.35"
      );

      if (decor) {
        tl.to(
          decor,
          {
            x: 0,
            y: 0,
            opacity: 1,
            rotation: 0,
            scale: 1,

            duration: 1,

            ease: "power4.out",
          },
          "-=0.45"
        );
      }

      /* =========================================
         DECOR SUBTLE SCROLL PARALLAX
      ========================================= */

      if (decor) {
        gsap.to(decor, {
          y: -35,
          rotation: 3,

          ease: "none",

          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="tools-heading"
    >
      <div className={styles.inner}>
        {/* =====================================
            HEADING
        ===================================== */}

        <h2
          id="tools-heading"
          data-tools-heading
          className={styles.heading}
        >
          <span className={styles.headingBold}>
            Tools&amp;
          </span>

          <span className={styles.headingItalic}>
            Technologies
          </span>
        </h2>

        {/* =====================================
            CAPTION
        ===================================== */}

        <p
          data-tools-caption
          className={styles.caption}
        >
          if it lives on a screen, we design it, build it,
          <br />
          and make it sell.
        </p>

        {/* =====================================
            CARDS
        ===================================== */}

        <div className={styles.grid}>
          {tools.map((tool) => (
            <article
              key={tool.name}
              data-tool-card
              className={styles.card}
            >
              <img
                src={tool.icon}
                alt={tool.name}
                className={styles.toolIcon}
              />
            </article>
          ))}
        </div>
      </div>

      {/* =====================================
          OVERLAPPING DECOR
      ===================================== */}

      <div
        data-tools-decor
        className={styles.decor}
        aria-hidden="true"
      >
        <img
          src="/images/services/branding/tools/green-decor.svg"
          alt=""
        />
      </div>
    </section>
  );
}