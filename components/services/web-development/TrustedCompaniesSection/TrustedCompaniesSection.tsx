"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./TrustedCompaniesSection.module.css";

gsap.registerPlugin(ScrollTrigger);

const companies = [
  {
    name: "Epic Journey",
    logo: "/images/services/web-development/clients/epic-journey.svg",
  },
  {
    name: "ProcessLab",
    logo: "/images/services/web-development/clients/processlab.svg",
  },
  {
    name: "Le Sherwood",
    logo: "/images/services/web-development/clients/le-sherwood.svg",
  },
  {
    name: "Casa Cinta",
    logo: "/images/services/web-development/clients/casa-cinta.svg",
  },

  {
    name: "Brian Williams",
    logo: "/images/services/web-development/clients/brian-williams.svg",
  },
  {
    name: "Hey Buddy",
    logo: "/images/services/web-development/clients/hey-buddy.svg",
  },
  {
    name: "DermaLyft",
    logo: "/images/services/web-development/clients/dermalyft.svg",
  },
  {
    name: "ThermoLab",
    logo: "/images/services/web-development/clients/thermolab.svg",
  },

  {
    name: "Le Sherwood",
    logo: "/images/services/web-development/clients/le-sherwood.svg",
  },
  {
    name: "Epic Journey",
    logo: "/images/services/web-development/clients/epic-journey.svg",
  },
  {
    name: "Casa Cinta",
    logo: "/images/services/web-development/clients/casa-cinta.svg",
  },
  {
    name: "ProcessLab",
    logo: "/images/services/web-development/clients/processlab.svg",
  },

  {
    name: "DermaLyft",
    logo: "/images/services/web-development/clients/dermalyft.svg",
  },
  {
    name: "ThermoLab",
    logo: "/images/services/web-development/clients/thermolab.svg",
  },
  {
    name: "Brian Williams",
    logo: "/images/services/web-development/clients/brian-williams.svg",
  },
  {
    name: "Hey Buddy",
    logo: "/images/services/web-development/clients/hey-buddy.svg",
  },
];

export default function TrustedCompaniesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const heading =
        section.querySelector<HTMLElement>(
          "[data-trusted-heading]"
        );

      const horizontalLines =
        gsap.utils.toArray<HTMLElement>(
          "[data-grid-line-horizontal]"
        );

      const verticalLines =
        gsap.utils.toArray<HTMLElement>(
          "[data-grid-line-vertical]"
        );

      const logos =
        gsap.utils.toArray<HTMLElement>(
          "[data-company-logo]"
        );

      const decor =
        section.querySelector<HTMLElement>(
          "[data-trusted-decor]"
        );

      /* =========================================
         INITIAL STATE
      ========================================= */

      gsap.set(heading, {
        y: 25,
        opacity: 0,
        filter: "blur(4px)",
      });

      gsap.set(horizontalLines, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      gsap.set(verticalLines, {
        scaleY: 0,
        transformOrigin: "center top",
      });

      gsap.set(logos, {
        opacity: 0,
        y: 10,
        scale: 0.96,
        filter: "blur(5px)",
      });

      if (decor) {
        gsap.set(decor, {
          opacity: 0,
          x: -55,
          y: 40,
          rotate: -6,
          scale: 0.9,
        });
      }

      /* =========================================
         MASTER SCROLL TIMELINE
      ========================================= */

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,

          start: "top 78%",
          end: "top 20%",

          scrub: 1.1,

          invalidateOnRefresh: true,
        },
      });

      /* heading */

      tl.to(
        heading,
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",

          duration: 0.2,

          ease: "power3.out",
        },
        0
      );

      /* horizontal lines */

      tl.to(
        horizontalLines,
        {
          scaleX: 1,

          stagger: 0.05,

          duration: 0.28,

          ease: "power2.inOut",
        },
        0.08
      );

      /* vertical lines */

      tl.to(
        verticalLines,
        {
          scaleY: 1,

          stagger: 0.05,

          duration: 0.28,

          ease: "power2.inOut",
        },
        0.14
      );

      /* logos */

      tl.to(
        logos,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",

          stagger: {
            each: 0.025,
            from: "start",
          },

          duration: 0.18,

          ease: "power3.out",
        },
        0.32
      );

      /* purple decor */

      if (decor) {
        tl.to(
          decor,
          {
            opacity: 1,

            x: 0,
            y: 0,

            rotate: 0,

            scale: 1,

            duration: 0.24,

            ease: "power4.out",
          },
          0.48
        );
      }

      /* =========================================
         DECOR SCROLL DRIFT
      ========================================= */

      if (decor) {
        gsap.to(decor, {
          y: -30,
          rotate: 2,

          ease: "none",

          scrollTrigger: {
            trigger: section,

            start: "top bottom",
            end: "bottom top",

            scrub: 1.2,
          },
        });
      }

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
      aria-labelledby="trusted-companies-heading"
    >
      <div className={styles.inner}>
        {/* =====================================
            HEADING
        ===================================== */}

        <div className={styles.headingColumn}>
          <h2
            id="trusted-companies-heading"
            data-trusted-heading
            className={styles.heading}
          >
            Trusted by 50+ Companies
          </h2>
        </div>

        {/* =====================================
            GRID
        ===================================== */}

        <div className={styles.gridWrap}>
          {/* horizontal lines */}

          <span
            data-grid-line-horizontal
            className={`${styles.horizontalLine} ${styles.h1}`}
          />

          <span
            data-grid-line-horizontal
            className={`${styles.horizontalLine} ${styles.h2}`}
          />

          <span
            data-grid-line-horizontal
            className={`${styles.horizontalLine} ${styles.h3}`}
          />

          <span
            data-grid-line-horizontal
            className={`${styles.horizontalLine} ${styles.h4}`}
          />

          <span
            data-grid-line-horizontal
            className={`${styles.horizontalLine} ${styles.h5}`}
          />

          {/* vertical lines */}

          <span
            data-grid-line-vertical
            className={`${styles.verticalLine} ${styles.v1}`}
          />

          <span
            data-grid-line-vertical
            className={`${styles.verticalLine} ${styles.v2}`}
          />

          <span
            data-grid-line-vertical
            className={`${styles.verticalLine} ${styles.v3}`}
          />

          <span
            data-grid-line-vertical
            className={`${styles.verticalLine} ${styles.v4}`}
          />

          <span
            data-grid-line-vertical
            className={`${styles.verticalLine} ${styles.v5}`}
          />

          <div className={styles.grid}>
            {companies.map((company, index) => (
              <div
                key={`${company.name}-${index}`}
                data-company-logo
                className={styles.logoCell}
              >
                <img
                  src={company.logo}
                  alt={company.name}
                  className={styles.logo}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* =====================================
          PURPLE OVERLAPPING DECOR
      ===================================== */}

      <div
        data-trusted-decor
        className={styles.decor}
        aria-hidden="true"
      >
        <img
          src="/images/services/web-development/clients/purple-decor.svg"
          alt=""
        />
      </div>
    </section>
  );
}