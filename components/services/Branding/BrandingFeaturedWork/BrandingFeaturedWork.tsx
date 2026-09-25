"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./BrandingFeaturedWork.module.css";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Appcues",
    date: "2025",
    image: "/images/services/branding/featured/appcues.webp",
    href: "/projects/appcues",
    className: "project1",
  },

  {
    title: "ThermoLab",
    date: "2025",
    image: "/images/services/branding/featured/thermolab.webp",
    href: "/projects/thermolab",
    className: "project2",
  },

  {
    title: "Appcues | Logo Branding",
    date: "2025",
    image: "/images/services/branding/featured/casa-cinta.webp",
    href: "/projects/appcues-branding",
    className: "project3",
  },

  {
    title: "Casa Cinta",
    date: "2025",
    image: "/images/services/branding/featured/branding.webp",
    href: "/projects/casa-cinta",
    className: "project4",
  },
];

export default function BrandingFeaturedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const swirlRef = useRef<SVGPathElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const swirl = swirlRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const heading =
        section.querySelector<HTMLElement>(
          "[data-featured-heading]"
        );

      const cards =
        gsap.utils.toArray<HTMLElement>(
          "[data-featured-card]"
        );

      /* =========================================
         HEADING ENTRANCE
      ========================================= */

      if (heading) {
        gsap.fromTo(
          heading,
          {
            y: 48,
            opacity: 0,
            filter: "blur(6px)",
          },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",

            duration: 1,
            ease: "power4.out",

            scrollTrigger: {
              trigger: section,
              start: "top 78%",
              toggleActions:
                "play none none reverse",
            },
          }
        );
      }

      /* =========================================
         SWIRL DRAW
      ========================================= */

      if (swirl) {
        const length =
          swirl.getTotalLength();

        gsap.set(swirl, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        gsap.to(swirl, {
          strokeDashoffset: 0,

          ease: "none",

          scrollTrigger: {
            trigger: section,

            start: "top 72%",
            end: "top 42%",

            scrub: 1.15,

            invalidateOnRefresh: true,
          },
        });
      }

      /* =========================================
         PROJECTS FADE UP
      ========================================= */

      gsap.fromTo(
        cards,
        {
          y: 90,
          opacity: 0,
          scale: 0.965,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,

          duration: 1.05,

          stagger: 0.13,

          ease: "power4.out",

          scrollTrigger: {
            trigger: section,

            start: "top 64%",

            toggleActions:
              "play none none reverse",
          },
        }
      );

      /* =========================================
         VERY SUBTLE PARALLAX
      ========================================= */

      cards.forEach((card, index) => {
        gsap.to(card, {
          y:
            index % 2 === 0
              ? -18
              : -10,

          ease: "none",

          scrollTrigger: {
            trigger: section,

            start: "top bottom",
            end: "bottom top",

            scrub: 1.3,
          },
        });
      });

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
      aria-labelledby="branding-featured-title"
    >
      <div className={styles.inner}>
        {/* =====================================
            HEADING
        ===================================== */}

        <h2
          id="branding-featured-title"
          data-featured-heading
          className={styles.heading}
        >
          <span className={styles.featured}>
            Featured
          </span>

          <span className={styles.workWrap}>
            <span className={styles.work}>
              WORK
            </span>

            <svg
              className={styles.swirl}
              viewBox="0 0 360 42"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                ref={swirlRef}
                d="
                  M4 27
                  C52 24 102 21 150 22
                  C190 23 222 20 256 21
                  C286 22 315 25 352 23
                  C310 24 275 24 240 27
                  C210 29 180 33 154 31
                  C136 30 134 26 153 24
                "
              />
            </svg>
          </span>
        </h2>

        {/* =====================================
            PROJECT GRID
        ===================================== */}

        <div className={styles.projectsGrid}>
          {projects.map((project) => (
            <Link
              key={project.title}
              href={project.href}
              data-featured-card
              className={`${styles.card} ${
                styles[
                  project.className as keyof typeof styles
                ]
              }`}
            >
              <div className={styles.imageWrap}>
                <img
                  src={project.image}
                  alt={project.title}
                  className={styles.image}
                />
              </div>

              {/* =================================
                  HOVER INFO OVERLAY
              ================================= */}

              <div className={styles.info}>
                <span
                  className={styles.projectTitle}
                >
                  {project.title}
                </span>

                <span
                  className={styles.projectDate}
                >
                  {project.date}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}