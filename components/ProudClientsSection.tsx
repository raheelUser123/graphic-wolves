"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./ProudClientsSection.module.css";

const clients = [
  {
    src: "/images/clients/thermolab1.svg",
    href: "https://thethermolab1.com/",
    className: "logo1",
    rotation: 10,
    alt: "ThermoLab",
  },
  {
    src: "/images/clients/heybubby.svg",
    href: "https://www.heybuddy.io/",
    className: "logo2",
    rotation: -2,
    alt: "Hey Buddy",
  },
  {
    src: "/images/clients/dermalyft1.svg",
    href: "https://dermalyft.com/",
    className: "logo3",
    rotation: -8,
    alt: "DermaLyft",
  },
  {
    src: "/images/clients/casa-cnt.svg",
    href: "https://casacinta.com/",
    className: "logo4",
    rotation: -11,
    alt: "Casa Cinta",
  },
  {
    src: "/images/clients/dermalyft2.svg",
    href: "https://dermalyft.com/",
    className: "logo5",
    rotation: 10,
    alt: "DermaLyft",
  },
  {
    src: "/images/clients/heybubby.svg",
    href: "https://www.heybuddy.io/",
    className: "logo6",
    rotation: 0,
    alt: "Hey Buddy",
  },
  {
    src: "/images/clients/dermalyft3.svg",
    href: "https://dermalyft.com/",
    className: "logo7",
    rotation: 9,
    alt: "DermaLyft",
  },
  {
    src: "/images/clients/brian-williams.svg",
    href: "https://example.com/",
    className: "logo8",
    rotation: -10,
    alt: "Brian Williams",
  },
  {
    src: "/images/clients/thermolab2.svg",
    href: "https://thethermolab2.com/",
    className: "logo9",
    rotation: 10,
    alt: "ThermoLab",
  },
];

/* =========================================================
   HELPERS
========================================================= */

const clamp = (
  value: number,
  min = 0,
  max = 1
) => {
  return Math.min(
    max,
    Math.max(min, value)
  );
};

const mapProgress = (
  progress: number,
  start: number,
  end: number
) => {
  if (start === end) return 0;

  return clamp(
    (progress - start) /
      (end - start)
  );
};

const easeOutCubic = (
  value: number
) => {
  return (
    1 -
    Math.pow(
      1 - value,
      3
    )
  );
};

/* =========================================================
   COMPONENT
========================================================= */

export default function ProudClientsSection() {
  const sectionRef =
    useRef<HTMLElement>(null);

  const headingRef =
    useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const section =
      sectionRef.current;

    const heading =
      headingRef.current;

    if (
      !section ||
      !heading
    ) {
      return;
    }

    /* =====================================================
       GET ELEMENTS
    ===================================================== */

    const words =
      Array.from(
        section.querySelectorAll<HTMLElement>(
          "[data-proud-word]"
        )
      );

    const logos =
      Array.from(
        section.querySelectorAll<HTMLElement>(
          "[data-client-logo]"
        )
      );

    let rafId = 0;

    /*
      Smoothed scroll value.
    */

    let smoothProgress = 0;

    /* =====================================================
       INITIAL WORD STATE
    ===================================================== */

    words.forEach(
      (word) => {
        gsap.set(word, {
          yPercent: 115,

          opacity: 0,

          rotation: 1.5,

          filter:
            "blur(8px)",
        });
      }
    );

    /* =====================================================
       INITIAL LOGO STATE
    ===================================================== */

    logos.forEach(
      (logo, index) => {
        const finalRotation =
          Number(
            logo.dataset.rotation ||
              0
          );

        gsap.set(
          logo,
          {
            /*
              Controlled distance.
              Last item bhi normal distance se enter hoga.
            */

            y:
              190 +
              index * 8,

            x:
              index % 2 === 0
                ? -22
                : 22,

            opacity: 0,

            scale: 0.86,

            rotation:
              finalRotation +
              (
                index % 2 === 0
                  ? -7
                  : 7
              ),

            filter:
              "blur(8px)",
          }
        );
      }
    );

    /* =====================================================
       HEADING INITIAL COLOR
    ===================================================== */

    gsap.set(
      heading,
      {
        color: "#7a7a7a",
      }
    );

    /* =====================================================
       RENDER LOOP
    ===================================================== */

    const render = () => {
      const rect =
        section.getBoundingClientRect();

      const viewportHeight =
        window.innerHeight;

      /*
        Sticky stage ke andar kitna actual
        scroll available hai.
      */

      const scrollDistance =
        Math.max(
          section.offsetHeight -
            viewportHeight,
          1
        );

      /* =====================================
         RAW PROGRESS
      ===================================== */

      const rawProgress =
        clamp(
          -rect.top /
            scrollDistance
        );

      /* =====================================
         SMOOTH / LERP

         0.055:
         slow + premium feeling.

         Increase = faster.
         Decrease = smoother/slower.
      ===================================== */

      smoothProgress +=
        (
          rawProgress -
          smoothProgress
        ) * 0.055;

      const progress =
        smoothProgress;

      /* =====================================
         HEADING WORD ANIMATION
      ===================================== */

      words.forEach(
        (
          word,
          index
        ) => {
          const start =
            0.015 +
            index * 0.032;

          const end =
            start + 0.15;

          const local =
            mapProgress(
              progress,
              start,
              end
            );

          const eased =
            easeOutCubic(
              local
            );

          gsap.set(
            word,
            {
              yPercent:
                115 *
                (
                  1 -
                  eased
                ),

              opacity:
                eased,

              rotation:
                1.5 *
                (
                  1 -
                  eased
                ),

              filter:
                `blur(${
                  8 *
                  (
                    1 -
                    eased
                  )
                }px)`,
            }
          );
        }
      );

      /* =====================================
         HEADING GREY → BLACK
      ===================================== */

      const headingDark =
        easeOutCubic(
          mapProgress(
            progress,
            0.08,
            0.38
          )
        );

      const grey =
        Math.round(
          122 -
            headingDark *
              122
        );

      heading.style.color =
        `rgb(${grey}, ${grey}, ${grey})`;

      /* =====================================
         LOGO ENTRANCE
      ===================================== */

      logos.forEach(
        (
          logo,
          index
        ) => {
          const finalRotation =
            Number(
              logo.dataset.rotation ||
                0
            );

          /*
            All logos comfortably enter before
            animation finishes.

            Last logo capped.
          */

          const start =
            Math.min(
              0.18 +
                index *
                  0.032,
              0.44
            );

          const end =
            start +
            0.22;

          const local =
            mapProgress(
              progress,
              start,
              end
            );

          const eased =
            easeOutCubic(
              local
            );

          /* =================================
             START TRANSFORM
          ================================= */

          const initialY =
            190 +
            index * 8;

          const initialX =
            index % 2 === 0
              ? -22
              : 22;

          const initialRotation =
            finalRotation +
            (
              index % 2 === 0
                ? -7
                : 7
            );

          /* =================================
             FLOAT AFTER SETTLING
          ================================= */

          const drift =
            easeOutCubic(
              mapProgress(
                progress,
                0.70,
                1
              )
            );

          const direction =
            index % 2 === 0
              ? 1
              : -1;

          /*
            Different drift per item.
          */

          const driftY =
            direction *
            (
              10 +
              (
                index %
                3
              ) *
                5
            ) *
            drift;

          const driftX =
            direction *
            (
              5 +
              (
                index %
                2
              ) *
                4
            ) *
            drift;

          const driftRotation =
            direction *
            (
              1.8 +
              (
                index %
                3
              ) *
                0.4
            ) *
            drift;

          /* =================================
             APPLY TRANSFORM
          ================================= */

          gsap.set(
            logo,
            {
              y:
                initialY *
                  (
                    1 -
                    eased
                  ) +
                driftY,

              x:
                initialX *
                  (
                    1 -
                    eased
                  ) +
                driftX,

              opacity:
                eased,

              scale:
                0.86 +
                eased *
                  0.14,

              rotation:
                initialRotation +
                (
                  finalRotation -
                  initialRotation
                ) *
                  eased +
                driftRotation,

              filter:
                `blur(${
                  8 *
                  (
                    1 -
                    eased
                  )
                }px)`,
            }
          );
        }
      );

      rafId =
        requestAnimationFrame(
          render
        );
    };

    /* =====================================================
       START LOOP
    ===================================================== */

    rafId =
      requestAnimationFrame(
        render
      );

    /* =====================================================
       CLEANUP
    ===================================================== */

    return () => {
      cancelAnimationFrame(
        rafId
      );
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={
        styles.proudSection
      }
      aria-labelledby="proud-heading"
    >
      <div
        className={
          styles.stickyStage
        }
      >
        {/* =====================================
            LOGOS
        ===================================== */}

        <div
          className={
            styles.logosLayer
          }
        >
          {clients.map(
            (
              client,
              index
            ) => (
              <a
                key={`${client.src}-${index}`}
                href={
                  client.href
                }
                target="_blank"
                rel="noopener noreferrer"
                data-client-logo
                data-rotation={
                  client.rotation
                }
                className={`${styles.clientLogo} ${
                  styles[
                    client.className as keyof typeof styles
                  ]
                }`}
                aria-label={`Visit ${client.alt}`}
              >
                <img
                  src={
                    client.src
                  }
                  alt={
                    client.alt
                  }
                  draggable={false}
                />
              </a>
            )
          )}
        </div>

        {/* =====================================
            HEADING
        ===================================== */}

        <h2
          ref={headingRef}
          id="proud-heading"
          className={
            styles.heading
          }
        >
          {/* ROW 1 */}

          <span
            className={
              styles.headingLine
            }
          >
            <span
              className={
                styles.wordMask
              }
            >
              <span
                data-proud-word
                className={
                  styles.word
                }
              >
                Proud
              </span>
            </span>

            <span
              className={
                styles.wordMask
              }
            >
              <span
                data-proud-word
                className={
                  styles.word
                }
              >
                to
              </span>
            </span>

            <span
              className={
                styles.wordMask
              }
            >
              <span
                data-proud-word
                className={
                  styles.word
                }
              >
                have
              </span>
            </span>
          </span>

          {/* ROW 2 */}

          <span
            className={
              styles.headingLine
            }
          >
            <span
              className={
                styles.wordMask
              }
            >
              <span
                data-proud-word
                className={
                  styles.word
                }
              >
                worked
              </span>
            </span>

            <span
              className={`${styles.wordMask} ${styles.withMask}`}
            >
              <span
                data-proud-word
                className={
                  styles.withWord
                }
              >
                with
              </span>
            </span>
          </span>
        </h2>
      </div>
    </section>
  );
}