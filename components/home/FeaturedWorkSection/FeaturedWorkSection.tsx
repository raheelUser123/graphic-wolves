"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./FeaturedWorkSection.module.css";

gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   IMAGE ARRAYS
========================================================= */

const workImages = {
  topLeftVertical: [
    "/images/featured/top-left-vertical/1.webp",
    "/images/featured/top-left-vertical/1.webp",
    "/images/featured/top-left-vertical/1.webp",
  ],

  topLeftHorizontal: [
    "/images/featured/top-left-horizontal/1.webp",
    "/images/featured/top-left-horizontal/1.webp",
    "/images/featured/top-left-horizontal/1.webp",
  ],

  topRight: [
    "/images/featured/top-right/1.webp",
    "/images/featured/top-right/1.webp",
    "/images/featured/top-right/1.webp",
  ],

  middleTop: [
    "/images/featured/middle-top/1.webp",
    "/images/featured/middle-top/1.webp",
    "/images/featured/middle-top/1.webp",
  ],

  middleBottom: [
    "/images/featured/middle-bottom/1.webp",
    "/images/featured/middle-bottom/1.webp",
    "/images/featured/middle-bottom/1.webp",
  ],

  bottomLeft: [
    "/images/featured/bottom-left/1.webp",
    "/images/featured/bottom-left/1.webp",
    "/images/featured/bottom-left/1.webp",
  ],

  bottomRightTop: [
    "/images/featured/bottom-right-top/1.webp",
    "/images/featured/bottom-right-top/1.webp",
    "/images/featured/bottom-right-top/1.webp",
  ],

  bottomRightBottom: [
    "/images/featured/bottom-right-bottom/1.webp",
    "/images/featured/bottom-right-bottom/1.webp",
    "/images/featured/bottom-right-bottom/1.webp",
  ],
};

/* =========================================================
   IMAGE CYCLER
========================================================= */

function CycleImage({
  images,
  interval = 3500,
}: {
  images: string[];
  interval?: number;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = window.setInterval(() => {
      setActive((current) => {
        return (current + 1) % images.length;
      });
    }, interval);

    return () => {
      window.clearInterval(timer);
    };
  }, [images, interval]);

  return (
    <div className={styles.cycleInner}>
      {images.map((src, index) => (
        <img
          key={`${src}-${index}`}
          src={src}
          alt=""
          draggable={false}
          className={`${styles.cycleImage} ${
            active === index
              ? styles.activeImage
              : ""
          }`}
        />
      ))}
    </div>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function FeaturedWorkSection() {
  const sectionRef =
    useRef<HTMLElement>(null);

  const headingRef =
    useRef<HTMLHeadingElement>(null);

  const headingLineRef =
    useRef<SVGPathElement>(null);

  const middleSwirlRef =
    useRef<SVGSVGElement>(null);

  const middleLineRef =
    useRef<SVGPathElement>(null);

  const bottomSwirlRef =
    useRef<SVGSVGElement>(null);

  const bottomLineRef =
    useRef<SVGPathElement>(null);

  /* =======================================================
     TADA LOOP
  ======================================================= */

  const startTada = (
    badge: HTMLElement,
    index: number
  ) => {
    if (
      badge.dataset.tadaStarted ===
      "true"
    ) {
      return;
    }

    badge.dataset.tadaStarted =
      "true";

    gsap
      .timeline({
        repeat: -1,

        repeatDelay:
          2.8 +
          index * 0.55,
      })

      .to(badge, {
        scale: 1.07,
        rotation: -5,
        duration: 0.11,
        ease: "power2.out",
      })

      .to(badge, {
        scale: 1.1,
        rotation: 5,
        duration: 0.1,
      })

      .to(badge, {
        scale: 1.04,
        rotation: -3,
        duration: 0.1,
      })

      .to(badge, {
        scale: 1,
        rotation: 0,
        duration: 0.22,
        ease: "power2.out",
      });
  };

  useLayoutEffect(() => {
    const section =
      sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const cards =
        gsap.utils.toArray<HTMLElement>(
          "[data-feature-card]"
        );

      const badges =
        gsap.utils.toArray<HTMLElement>(
          "[data-feature-badge]"
        );

      const vectors =
        gsap.utils.toArray<HTMLElement>(
          "[data-feature-vector]"
        );

      /* =====================================================
         TRUE SVG DRAW FUNCTION
      ===================================================== */

      const createScrollDraw = (
        path: SVGPathElement | null,
        trigger: Element | null,
        start: string,
        end: string
      ) => {
        if (!path || !trigger) return;

        const length =
          path.getTotalLength();

        /*
          Hide complete stroke initially.
        */

        path.style.strokeDasharray =
          `${length} ${length}`;

        path.style.strokeDashoffset =
          `${length}`;

        const setProgress = (
          progress: number
        ) => {
          const offset =
            length *
            (1 - progress);

          path.style.strokeDashoffset =
            `${offset}`;
        };

        ScrollTrigger.create({
          trigger,

          start,
          end,

          scrub: true,

          invalidateOnRefresh: true,

          onUpdate: (self) => {
            setProgress(
              self.progress
            );
          },

          onRefresh: (self) => {
            setProgress(
              self.progress
            );
          },
        });
      };

      /* =====================================================
         WORK UNDERLINE DRAW
      ===================================================== */

      createScrollDraw(
        headingLineRef.current,
        headingRef.current,
        "top 82%",
        "top 38%"
      );

      /* =====================================================
         BRANDING LONG SWIRL DRAW
      ===================================================== */

      createScrollDraw(
        middleLineRef.current,
        middleSwirlRef.current,
        "top 92%",
        "top 42%"
      );

      /* =====================================================
         BOTTOM MINI SWIRL DRAW
      ===================================================== */

      createScrollDraw(
        bottomLineRef.current,
        bottomSwirlRef.current,
        "top 92%",
        "top 55%"
      );

      /* =====================================================
         SECTION OVERLAP
      ===================================================== */

      gsap.fromTo(
        section,
        {
          y: 110,

          borderRadius:
            "48px 48px 0 0",
        },
        {
          y: 0,

          borderRadius: "0px",

          ease: "none",

          scrollTrigger: {
            trigger: section,

            start:
              "top bottom",

            end:
              "top 28%",

            scrub: 1,

            invalidateOnRefresh:
              true,
          },
        }
      );

      /* =====================================================
         HEADING
      ===================================================== */

      if (
        headingRef.current
      ) {
        gsap.fromTo(
          headingRef.current,
          {
            opacity: 0,
            y: 70,
          },
          {
            opacity: 1,
            y: 0,

            ease:
              "power3.out",

            scrollTrigger: {
              trigger:
                headingRef.current,

              start:
                "top 90%",

              end:
                "top 52%",

              scrub: 1,
            },
          }
        );
      }

      /* =====================================================
         CARDS
      ===================================================== */

      cards.forEach(
        (card, index) => {
          gsap.fromTo(
            card,
            {
              opacity: 0,

              y: 85,

              scale: 0.95,
            },
            {
              opacity: 1,

              y: 0,

              scale: 1,

              ease:
                "power3.out",

              scrollTrigger: {
                trigger: card,

                start:
                  "top 96%",

                end:
                  "top 72%",

                scrub:
                  0.8 +
                  index * 0.035,

                invalidateOnRefresh:
                  true,
              },
            }
          );
        }
      );

      /* =====================================================
         VECTORS POP
      ===================================================== */

      vectors.forEach(
        (vector, index) => {
          gsap.fromTo(
            vector,
            {
              opacity: 0,

              scale: 0,

              rotation:
                index % 2 === 0
                  ? -10
                  : 10,
            },
            {
              opacity: 1,

              scale: 1,

              rotation: 0,

              ease:
                "back.out(2.4)",

              scrollTrigger: {
                trigger: vector,

                start:
                  "top 90%",

                end:
                  "top 67%",

                scrub: 0.8,

                invalidateOnRefresh:
                  true,
              },
            }
          );
        }
      );

      /* =====================================================
         BADGES POP + TADA
      ===================================================== */

      badges.forEach(
        (badge, index) => {
          gsap.fromTo(
            badge,
            {
              opacity: 0,

              scale: 0,

              rotation:
                index % 2 === 0
                  ? -12
                  : 12,
            },
            {
              opacity: 1,

              scale: 1,

              rotation: 0,

              ease:
                "back.out(2.8)",

              scrollTrigger: {
                trigger: badge,

                start:
                  "top 92%",

                end:
                  "top 68%",

                scrub: 0.8,

                invalidateOnRefresh:
                  true,

                onLeave: () => {
                  startTada(
                    badge,
                    index
                  );
                },
              },
            }
          );
        }
      );

      /* =====================================================
         SUBTLE IMAGE PARALLAX
      ===================================================== */

      cards.forEach(
        (card, index) => {
          gsap.to(card, {
            y:
              index % 2 === 0
                ? -30
                : -48,

            ease: "none",

            scrollTrigger: {
              trigger: section,

              start:
                "top 22%",

              end:
                "bottom top",

              scrub: 1.25,
            },
          });
        }
      );

      /* =====================================================
         REFRESH
      ===================================================== */

      requestAnimationFrame(
        () => {
          ScrollTrigger.refresh();
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
      className={
        styles.featuredSection
      }
      aria-labelledby="featured-heading"
    >
      <div
        className={
          styles.inner
        }
      >
        {/* =================================================
            HEADING
        ================================================= */}

        <h2
          ref={headingRef}
          id="featured-heading"
          className={
            styles.mainHeading
          }
        >
          <span>
            Featured
          </span>

          <span
            className={
              styles.work
            }
          >
            WORK

            <svg
              className={
                styles.headingLine
              }
              viewBox="0 0 340 42"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                ref={
                  headingLineRef
                }
                d="
                  M4 25
                  C72 19 122 14 170 18
                  C201 21 215 25 192 27
                  C174 29 164 24 184 22
                  C224 19 269 20 336 24
                "
              />
            </svg>
          </span>
        </h2>

        {/* =================================================
            TOP LEFT VERTICAL
        ================================================= */}

        <div
          data-feature-card
          className={
            styles.topLeftVertical
          }
        >
          <CycleImage
            images={
              workImages
                .topLeftVertical
            }
            interval={3200}
          />
        </div>

        {/* =================================================
            TOP LEFT HORIZONTAL
        ================================================= */}

        <div
          data-feature-card
          className={
            styles.topLeftHorizontal
          }
        >
          <CycleImage
            images={
              workImages
                .topLeftHorizontal
            }
            interval={3700}
          />
        </div>

        {/* BRANDING */}

        <img
          data-feature-badge
          src="/images/featured/badges/branding.svg"
          alt="Branding"
          className={`${styles.badge} ${styles.brandingBadge}`}
        />

        {/* =================================================
            BRANDING LONG SWIRL
        ================================================= */}

        <svg
          ref={
            middleSwirlRef
          }
          className={
            styles.middleSwirl
          }
          viewBox="0 0 120 250"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            ref={
              middleLineRef
            }
            d="
              M12 5
              C54 15 84 44 82 78
              C80 106 59 124 40 114
              C23 105 30 83 46 79
              C73 73 99 99 100 135
              C102 176 84 216 58 243
            "
          />
        </svg>

        {/* =================================================
            TOP RIGHT GREEN
        ================================================= */}

        <img
          data-feature-vector
          src="/images/featured/vectors/green-shape.svg"
          alt=""
          className={
            styles.greenShape
          }
        />

        {/* TOP RIGHT IMAGE */}

        <div
          data-feature-card
          className={
            styles.topRight
          }
        >
          <CycleImage
            images={
              workImages.topRight
            }
            interval={4100}
          />
        </div>

        {/* ECOMMERCE */}

        <img
          data-feature-badge
          src="/images/featured/badges/ecommerce.svg"
          alt="E-Commerce"
          className={`${styles.badge} ${styles.ecommerceBadge}`}
        />

        {/* =================================================
            MIDDLE TOP
        ================================================= */}

        <div
          data-feature-card
          className={
            styles.middleTop
          }
        >
          <CycleImage
            images={
              workImages.middleTop
            }
            interval={3600}
          />
        </div>

        {/* =================================================
            MIDDLE BOTTOM
        ================================================= */}

        <div
          data-feature-card
          className={
            styles.middleBottom
          }
        >
          <CycleImage
            images={
              workImages.middleBottom
            }
            interval={4300}
          />
        </div>

        {/* GREEN SMALL */}

        <img
          data-feature-vector
          src="/images/featured/vectors/green-small.svg"
          alt=""
          className={
            styles.greenSmall
          }
        />

        {/* =================================================
            BOTTOM LEFT PURPLE
        ================================================= */}

        <img
          data-feature-vector
          src="/images/featured/vectors/purple-shape.svg"
          alt=""
          className={
            styles.purpleShape
          }
        />

        {/* BOTTOM LEFT IMAGE */}

        <div
          data-feature-card
          className={
            styles.bottomLeft
          }
        >
          <CycleImage
            images={
              workImages.bottomLeft
            }
            interval={3850}
          />
        </div>

        {/* WEB DEV */}

        <img
          data-feature-badge
          src="/images/featured/badges/webdev.svg"
          alt="Web Development"
          className={`${styles.badge} ${styles.webdevBadge}`}
        />

        {/* =================================================
            BOTTOM RIGHT TOP
        ================================================= */}

        <div
          data-feature-card
          className={
            styles.bottomRightTop
          }
        >
          <CycleImage
            images={
              workImages
                .bottomRightTop
            }
            interval={4000}
          />
        </div>

        {/* =================================================
            BOTTOM MINI SWIRL
        ================================================= */}

        <svg
          ref={
            bottomSwirlRef
          }
          className={
            styles.bottomSwirl
          }
          viewBox="0 0 120 90"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            ref={
              bottomLineRef
            }
            d="
              M4 76
              C18 58 32 58 40 71
              C39 49 53 42 62 60
              C64 39 78 27 88 47
              C87 27 97 16 115 9
            "
          />
        </svg>

        {/* =================================================
            BOTTOM RIGHT BOTTOM
        ================================================= */}

        <div
          data-feature-card
          className={
            styles.bottomRightBottom
          }
        >
          <CycleImage
            images={
              workImages
                .bottomRightBottom
            }
            interval={4550}
          />
        </div>
      </div>
    </section>
  );
}