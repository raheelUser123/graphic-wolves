"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./FutureSection.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function FutureSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      /* =========================================
         SWIRL / UNDERLINE DRAW
      ========================================= */

      const underlinePath =
        section.querySelector<SVGPathElement>("[data-future-line]");

      if (underlinePath) {
        const length = underlinePath.getTotalLength();

        gsap.set(underlinePath, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        gsap.to(underlinePath, {
          strokeDashoffset: 0,
          ease: "none",

          scrollTrigger: {
            trigger: ".future-heading-trigger",
            start: "center 63%",
            end: "center 43%",
            scrub: 0.55,
          },
        });
      }

      /* =========================================
         HEADING STICKER POP + HIDE
      ========================================= */

      const headingSticker =
        section.querySelector<HTMLElement>("[data-heading-sticker]");

      if (headingSticker) {
        gsap.set(headingSticker, {
          scale: 0,
          rotation: -18,
          opacity: 0,
          transformOrigin: "50% 50%",
        });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: ".future-heading-trigger",
              start: "center 68%",
              end: "center 25%",
              scrub: 0.45,
            },
          })

          .to(headingSticker, {
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 0.34,
            ease: "back.out(2)",
          })

          .to(
            headingSticker,
            {
              scale: 1.05,
              duration: 0.24,
              ease: "sine.inOut",
            },
            0.34
          )

          .to(
            headingSticker,
            {
              scale: 0,
              rotation: 12,
              opacity: 0,
              duration: 0.34,
              ease: "power2.in",
            },
            0.72
          );
      }

      /* =========================================
         FLOAT / PIN / SMOOTH HOVER
      ========================================= */

      const zones =
        section.querySelectorAll<HTMLElement>("[data-float-zone]");

      const cleanups: (() => void)[] = [];

      zones.forEach((zone, index) => {
        const item =
          zone.querySelector<HTMLElement>("[data-float-item]");

        if (!item) return;

        const strength = Number(item.dataset.strength || 1);
        const isTag = item.dataset.floatType === "tag";

        let startMouseX = 0;
        let startMouseY = 0;

        let lastMouseX = 0;
        let lastMouseY = 0;

        let targetX = 0;
        let targetY = 0;

        /*
         * Controlled travel range
         */
        const maxX = isTag ? 150 : 115;
        const maxY = isTag ? 105 : 85;

        const maxRotation = isTag ? 8 : 6;

        /*
         * Softer follow
         */
        const xTo = gsap.quickTo(item, "x", {
          duration: 0.36,
          ease: "power3.out",
        });

        const yTo = gsap.quickTo(item, "y", {
          duration: 0.38,
          ease: "power3.out",
        });

        const rotationTo = gsap.quickTo(item, "rotation", {
          duration: 0.42,
          ease: "power3.out",
        });

        const scaleXTo = gsap.quickTo(item, "scaleX", {
          duration: 0.4,
          ease: "power3.out",
        });

        const scaleYTo = gsap.quickTo(item, "scaleY", {
          duration: 0.4,
          ease: "power3.out",
        });

        const handleEnter = (event: PointerEvent) => {
          startMouseX = event.clientX;
          startMouseY = event.clientY;

          lastMouseX = event.clientX;
          lastMouseY = event.clientY;

          targetX = 0;
          targetY = 0;
        };

        const handleMove = (event: PointerEvent) => {
          const totalDeltaX =
            event.clientX - startMouseX;

          const totalDeltaY =
            event.clientY - startMouseY;

          const velocityX =
            event.clientX - lastMouseX;

          const velocityY =
            event.clientY - lastMouseY;

          lastMouseX = event.clientX;
          lastMouseY = event.clientY;

          /*
           * Less aggressive travel
           */
          targetX =
            totalDeltaX * 0.72 * strength +
            velocityX * 1.35 * strength;

          targetY =
            totalDeltaY * 0.72 * strength +
            velocityY * 1.2 * strength;

          targetX = gsap.utils.clamp(
            -maxX,
            maxX,
            targetX
          );

          targetY = gsap.utils.clamp(
            -maxY,
            maxY,
            targetY
          );

          /*
           * Softer rotation
           */
          const rotation =
            velocityX * 0.14 * strength +
            totalDeltaX * 0.012;

          /*
           * SUBTLE STRETCH
           */
          const speedX = Math.min(
            Math.abs(velocityX),
            24
          );

          const speedY = Math.min(
            Math.abs(velocityY),
            24
          );

          const stretchX =
            1 +
            speedX * 0.003 +
            Math.abs(totalDeltaX) * 0.00018;

          const stretchY =
            1 +
            speedY * 0.003 +
            Math.abs(totalDeltaY) * 0.00018;

          if (speedX > speedY) {
            scaleXTo(
              Math.min(
                isTag ? 1.1 : 1.07,
                stretchX
              )
            );

            scaleYTo(
              Math.max(
                0.97,
                1 - speedX * 0.001
              )
            );
          } else {
            scaleYTo(
              Math.min(
                isTag ? 1.09 : 1.06,
                stretchY
              )
            );

            scaleXTo(
              Math.max(
                0.975,
                1 - speedY * 0.0008
              )
            );
          }

          xTo(targetX);
          yTo(targetY);

          rotationTo(
            gsap.utils.clamp(
              -maxRotation,
              maxRotation,
              rotation
            )
          );
        };

        const handleLeave = () => {
          /*
           * Very small overshoot
           */
          gsap.to(item, {
            x: targetX * 1.03,
            y: targetY * 1.03,

            scaleX: 1.02,
            scaleY: 0.99,

            duration: 0.16,

            ease: "power2.out",

            overwrite: true,

            onComplete: () => {
              gsap.to(item, {
                x: 0,
                y: 0,

                rotation: 0,

                scaleX: 1,
                scaleY: 1,

                duration: 1.25,

                ease: "elastic.out(1, 0.5)",

                overwrite: true,
              });
            },
          });

          targetX = 0;
          targetY = 0;
        };

        zone.addEventListener(
          "pointerenter",
          handleEnter
        );

        zone.addEventListener(
          "pointermove",
          handleMove
        );

        zone.addEventListener(
          "pointerleave",
          handleLeave
        );

        cleanups.push(() => {
          zone.removeEventListener(
            "pointerenter",
            handleEnter
          );

          zone.removeEventListener(
            "pointermove",
            handleMove
          );

          zone.removeEventListener(
            "pointerleave",
            handleLeave
          );
        });
      });

      return () => {
        cleanups.forEach((cleanup) =>
          cleanup()
        );
      };
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
  <section
    ref={sectionRef}
    className={styles.futureSection}
  >
    {/* LEFT PURPLE GLOW */}
    <div
      className={styles.leftGlow}
      aria-hidden="true"
    >
      <img
        src="/images/future/ellipse-3.png"
        alt=""
      />
    </div>

    <div className={styles.container}>
      {/* =====================================
          HEADING
      ===================================== */}

      <div
        className={`${styles.headingWrap} future-heading-trigger`}
      >
          <h2 className={styles.heading}>
            <span>an agency built</span>

            <span
              className={styles.headingSecond}
            >
              for the future

              <img
                src="/images/future/heading-sticker.svg"
                alt=""
                aria-hidden="true"
                className={styles.headingSticker}
                data-heading-sticker
              />
            </span>

            <span
              className={styles.scriptText}
            >
              from Zero to Hero.
            </span>
          </h2>

          <svg
            className={styles.underline}
            viewBox="0 0 634 28"
            fill="none"
            aria-hidden="true"
          >
            <path
              data-future-line
              d="M2 26C41.0237 23.1556 79.9927 19.9419 118.634 15.5521C169.106 9.98633 227.314 2.42393 275.206 2C280.46 2.57436 264.768 4.99488 262.462 5.55556C257.837 6.43078 252.529 7.47009 247.317 8.59146C239.594 10.3556 212.496 15.8393 226.932 19.8051C239.594 22.6359 263.663 21.9521 280.978 21.3504C314.817 19.9829 349.311 16.7419 383.204 14.7863C465.931 9.5077 549.191 10.547 632 14.1436"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* =====================================
            CARDS AREA
        ===================================== */}

        <div className={styles.cardsArea}>
          <img
            src="/images/future/bg-vector.svg"
            alt=""
            aria-hidden="true"
            className={styles.backgroundVector}
          />

          {/* CARD 1 */}

          <div
            className={`${styles.cardShell} ${styles.cardOneShell}`}
            data-float-zone
          >
            <div
              className={styles.card}
              data-float-item
              data-float-type="card"
              data-strength="1"
            >
              <img
                src="/images/future/card-1.webp"
                alt="Graphic Wolves branding project"
              />
            </div>
          </div>

          {/* CARD 2 */}

          <div
            className={`${styles.cardShell} ${styles.cardTwoShell}`}
            data-float-zone
          >
            <div
              className={styles.card}
              data-float-item
              data-float-type="card"
              data-strength="1.05"
            >
              <img
                src="/images/future/card-2.webp"
                alt="Graphic Wolves e-commerce project"
              />
            </div>
          </div>

          {/* CARD 3 */}

          <div
            className={`${styles.cardShell} ${styles.cardThreeShell}`}
            data-float-zone
          >
            <div
              className={styles.card}
              data-float-item
              data-float-type="card"
              data-strength="0.95"
            >
              <img
                src="/images/future/card-3.webp"
                alt="Graphic Wolves creative digital project"
              />
            </div>
          </div>

          {/* CARD 4 */}

          <div
            className={`${styles.cardShell} ${styles.cardFourShell}`}
            data-float-zone
          >
            <div
              className={styles.card}
              data-float-item
              data-float-type="card"
              data-strength="1.08"
            >
              <img
                src="/images/future/card-4.webp"
                alt="Graphic Wolves development project"
              />
            </div>
          </div>

          {/* TAG 1 */}

          <div
            className={`${styles.tagShell} ${styles.brandingTagShell}`}
            data-float-zone
          >
            <div
              className={`${styles.tag} ${styles.brandingTag}`}
              data-float-item
              data-float-type="tag"
              data-strength="1.35"
            >
              Branding
            </div>
          </div>

          {/* TAG 2 */}

          <div
            className={`${styles.tagShell} ${styles.ecommerceTagShell}`}
            data-float-zone
          >
            <div
              className={`${styles.tag} ${styles.ecommerceTag}`}
              data-float-item
              data-float-type="tag"
              data-strength="1.45"
            >
              e-commerce
            </div>
          </div>

          {/* TAG 3 */}

          <div
            className={`${styles.tagShell} ${styles.developmentTagShell}`}
            data-float-zone
          >
            <div
              className={`${styles.tag} ${styles.developmentTag}`}
              data-float-item
              data-float-type="tag"
              data-strength="1.4"
            >
              Development
            </div>
          </div>
        </div>

        {/* =====================================
            CAPTION
        ===================================== */}

        <div className={styles.description}>
          <p>
            A tight crew of brand, web, and e-commerce builders
            who move fast, sweat the details, and have way too
            much fun doing it.
          </p>
        </div>
      </div>
    </section>
  );
}