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
    image:
      "/images/services/branding/featured/appcues.webp",
    href: "/projects/appcues",
  },
  {
    title: "ThermoLab",
    date: "2025",
    image:
      "/images/services/branding/featured/thermolab.webp",
    href: "/projects/thermolab",
  },
  {
    title: "Casa Cinta",
    date: "2025",
    image:
      "/images/services/branding/featured/casa-cinta.webp",
    href: "/projects/casa-cinta",
  },
  {
    title: "Branding",
    date: "2025",
    image:
      "/images/services/branding/featured/branding.webp",
    href: "/projects/branding",
  },
];

export default function BrandingFeaturedWork() {
  const sectionRef =
    useRef<HTMLElement>(null);

  const swirlPathRef =
    useRef<SVGPathElement>(null);

  useLayoutEffect(() => {
    const section =
      sectionRef.current;

    const path =
      swirlPathRef.current;

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
         HEADING
      ========================================= */

      if (heading) {
        gsap.fromTo(
          heading,
          {
            y: 45,
            opacity: 0,
            filter: "blur(5px)",
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

      if (path) {
        const length =
          path.getTotalLength();

        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        gsap.to(path, {
          strokeDashoffset: 0,

          ease: "none",

          scrollTrigger: {
            trigger: section,
            start: "top 68%",
            end: "top 38%",
            scrub: 1.1,
          },
        });
      }

      /* =========================================
         CARDS FADE UP
      ========================================= */

      gsap.fromTo(
        cards,
        {
          y: 80,
          opacity: 0,
          scale: 0.96,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,

          duration: 1,

          stagger: 0.14,

          ease: "power4.out",

          scrollTrigger: {
            trigger: section,
            start: "top 67%",
            toggleActions:
              "play none none reverse",
          },
        }
      );
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="branding-featured-heading"
    >
      <div className={styles.inner}>
        {/* =====================================
            HEADING
        ===================================== */}

        <h2
          id="branding-featured-heading"
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
              viewBox="0 0 330 36"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                ref={swirlPathRef}
                d="
                  M4 23
                  C62 20 112 17 158 19
                  C189 20 221 17 255 18
                  C277 19 298 21 325 20
                  C283 21 251 21 219 23
                  C194 25 168 28 146 27
                  C132 27 129 24 145 22
                "
              />
            </svg>
          </span>
        </h2>

        {/* =====================================
            PROJECTS
        ===================================== */}

        <div className={styles.projects}>
          {projects.map((project) => (
            <Link
              key={project.title}
              href={project.href}
              data-featured-card
              className={styles.card}
            >
              {/* IMAGE */}

              <div className={styles.imageWrap}>
                <img
                  src={project.image}
                  alt={project.title}
                  className={styles.image}
                />
              </div>

              {/* HOVER INFO */}

              <div className={styles.info}>
                <span className={styles.projectTitle}>
                  {project.title}
                </span>

                <span className={styles.projectDate}>
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