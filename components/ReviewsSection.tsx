"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ReviewsSection.module.css";

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  {
    quote:
      "they nailed our brand on the first go. it felt less like a project and more like they actually got us. rare.",
    name: "Ángela Danius",
    role: "Creative Director",
    bg: "#EDFFC5",
    x: "7%",
    lane: "left",
  },
  {
    quote:
      "the whole process was genuinely fun. clear updates, sharp ideas, and a brand we're proud to show off everywhere.",
    name: "Georges Drolin",
    role: "Los Canales Chile",
    bg: "#D2DDFF",
    x: "54%",
    lane: "center",
  },
  {
    quote:
      "your new site loads fast, looks unreal, and doubled our demo bookings. worth every penny.",
    name: "Aleena Ulum",
    role: "Art Director",
    bg: "#EDFFC5",
    x: "78%",
    lane: "right",
  },
  {
    quote:
      "our store went from clunky to converting. checkout is smooth and sales have not looked back since launch.",
    name: "Nicolás del Pino",
    role: "CIT",
    bg: "#FBE6FF",
    x: "18%",
    lane: "left",
  },
  {
    quote:
      "easy to work with, big on detail, and always a step ahead. we keep coming back for the next build.",
    name: "Ahmed Hamad",
    role: "Founder",
    bg: "#F2F2F2",
    x: "72%",
    lane: "right",
  },
  {
    quote:
      "the whole process was genuinely fun. clear updates, sharp ideas, and a brand we're proud to show off everywhere.",
    name: "Georges Drolin",
    role: "Los Canales Chile",
    bg: "#D2DDFF",
    x: "8%",
    lane: "left",
  },
  {
    quote:
      "easy to work with, big on detail, and always a step ahead. we keep coming back for the next build.",
    name: "Ahmed Hamad",
    role: "Founder",
    bg: "#F2F2F2",
    x: "43%",
    lane: "center",
  },
];

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(Math.max(value, min), max);

export default function ReviewsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const introRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const youngCircleRef = useRef<SVGPathElement>(null);
  const underlineRef = useRef<SVGPathElement>(null);

  const stickyWrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const otherSayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const intro = introRef.current;
    const heading = headingRef.current;
    const stickyWrap = stickyWrapRef.current;
    const stage = stageRef.current;
    const otherSay = otherSayRef.current;

    if (
      !section ||
      !intro ||
      !heading ||
      !stickyWrap ||
      !stage ||
      !otherSay
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      const cards =
        gsap.utils.toArray<HTMLElement>(
          "[data-review-card]"
        );

      /* =========================================
         CIRCLE PREP
      ========================================= */

      if (youngCircleRef.current) {
        const length =
          youngCircleRef.current.getTotalLength();

        gsap.set(youngCircleRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
      }

      /* =========================================
         SWIRL PREP
      ========================================= */

      if (underlineRef.current) {
        const length =
          underlineRef.current.getTotalLength();

        gsap.set(underlineRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
      }

      /* =========================================
         INTRO HEADING
      ========================================= */

      gsap.set(heading, {
        y: 70,
        opacity: 0,
      });

      const headingTl = gsap.timeline({
        scrollTrigger: {
          trigger: intro,
          start: "top 78%",
          end: "center 42%",
          scrub: 1,
        },
      });

      headingTl.to(heading, {
        y: 0,
        opacity: 1,
        duration: 0.55,
        ease: "power3.out",
      });

      if (youngCircleRef.current) {
        headingTl.to(
          youngCircleRef.current,
          {
            strokeDashoffset: 0,
            duration: 0.3,
            ease: "power2.inOut",
          },
          0.3
        );
      }

      if (underlineRef.current) {
        headingTl.to(
          underlineRef.current,
          {
            strokeDashoffset: 0,
            duration: 0.35,
            ease: "power2.inOut",
          },
          0.48
        );
      }

      /* =========================================
         OTHER SAY
      ========================================= */

      gsap.set(otherSay, {
        opacity: 0,
        y: 22,
      });

      gsap.to(otherSay, {
        opacity: 1,
        y: 0,

        ease: "none",

        scrollTrigger: {
          trigger: stickyWrap,
          start: "top 75%",
          end: "top 35%",
          scrub: 1,
        },
      });

      /* =========================================
         TESTIMONIAL INITIAL STATE
      ========================================= */

      cards.forEach((card, index) => {
        gsap.set(card, {
          y: window.innerHeight * 0.72,

          opacity: 0,

          scale: 0.96,

          rotate:
            index % 2 === 0
              ? -1.4
              : 1.4,
        });
      });

      /* =========================================
         MAIN SCROLL CONTROLLER

         NO GSAP PIN.
         CSS STICKY HANDLES STICKINESS.
      ========================================= */

      ScrollTrigger.create({
        trigger: stickyWrap,

        start: "top top",

        end: "bottom bottom",

        scrub: true,

        invalidateOnRefresh: true,

        onUpdate: (self) => {
          const masterProgress =
            self.progress;

          cards.forEach(
            (card, index) => {
              /*
                Each testimonial gets its own
                small delayed window.
              */

              const stagger = 0.095;

              const cardStart =
                index * stagger;

              const cardDuration =
                0.46;

              const localProgress =
                clamp(
                  (
                    masterProgress -
                    cardStart
                  ) /
                    cardDuration
                );

              /*
                Smooth easing manually.
              */

              const smooth =
                localProgress *
                localProgress *
                (
                  3 -
                  2 *
                    localProgress
                );

              /*
                Vertical:

                0     = below screen
                0.5   = visible / center
                1     = above screen
              */

              const viewportHeight =
                window.innerHeight;

              const startY =
                viewportHeight *
                0.72;

              const endY =
                -viewportHeight *
                0.82;

              const y =
                startY +
                (
                  endY -
                  startY
                ) *
                  smooth;

              /* =============================
                 LEFT / CENTER / RIGHT FLOAT
              ============================= */

              const lane =
                card.dataset.lane;

              let xWave = 0;

              /*
                Small curved movement rather
                than straight vertical.
              */

              const wave =
                Math.sin(
                  localProgress *
                    Math.PI
                );

              if (lane === "left") {
                xWave =
                  wave * 38;
              }

              if (lane === "center") {
                xWave =
                  Math.sin(
                    localProgress *
                      Math.PI *
                      2
                  ) * 24;
              }

              if (lane === "right") {
                xWave =
                  wave * -38;
              }

              /* =============================
                 OPACITY

                 fade in -> full -> fade out
              ============================= */

              let opacity = 1;

              if (
                localProgress <
                0.15
              ) {
                opacity =
                  localProgress /
                  0.15;
              }

              if (
                localProgress >
                0.82
              ) {
                opacity =
                  1 -
                  (
                    localProgress -
                    0.82
                  ) /
                    0.18;
              }

              opacity =
                clamp(opacity);

              /* =============================
                 SCALE
              ============================= */

              const scale =
                0.96 +
                Math.sin(
                  localProgress *
                    Math.PI
                ) *
                  0.04;

              /* =============================
                 ROTATE
              ============================= */

              const baseRotate =
                index % 2 === 0
                  ? -1.2
                  : 1.2;

              const rotate =
                baseRotate +
                Math.sin(
                  localProgress *
                    Math.PI
                ) *
                  (
                    index % 2 ===
                    0
                      ? 1
                      : -1
                  );

              gsap.set(card, {
                y,
                x: xWave,

                opacity,

                scale,

                rotate,
              });
            }
          );
        },
      });

      ScrollTrigger.refresh();
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={
        styles.reviewsSection
      }
      aria-labelledby="reviews-main-heading"
    >
      {/* =====================================
          PURPLE SHADOW
      ===================================== */}

      <div
        className={
          styles.purpleShadow
        }
        aria-hidden="true"
      />

      {/* =====================================
          SECTION 1 — HEADING
      ===================================== */}

      <div
        ref={introRef}
        className={
          styles.introSection
        }
      >
        <h2
          ref={headingRef}
          id="reviews-main-heading"
          className={
            styles.mainHeading
          }
        >
          <span>
            we are a{" "}
          </span>

          {/* YOUNG */}

          <span
            className={
              styles.youngWrap
            }
          >
            <em>
              young,
            </em>

            <svg
              className={
                styles.youngCircle
              }
              viewBox="0 0 290 120"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                ref={
                  youngCircleRef
                }
                d="
                  M12 66
                  C28 16 241 6 276 50
                  C302 82 262 104 151 106
                  C65 108 12 91 12 66
                "
              />
            </svg>
          </span>

          <span>
            {" "}
            future-proof
          </span>

          <br />

          <span>
            team of 42 digitally
            native
          </span>

          <br />

          {/* UNDERKINDER */}

          <span
            className={
              styles.underWrap
            }
          >
            <em>
              underkinder.
            </em>

            <svg
              className={
                styles.underLine
              }
              viewBox="0 0 560 48"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                ref={
                  underlineRef
                }
                d="
                  M5 27

                  C92 18 165 14 238 20

                  C284 24 316 30 350 27

                  C371 25 381 20 365 18

                  C347 16 330 21 347 25

                  C386 33 449 27 555 22
                "
              />
            </svg>
          </span>

          <span>
            {" "}
            not to brag!
          </span>

          <img
            src="/images/reviews/thumb-sticker.svg"
            alt=""
            className={
              styles.headingSticker
            }
          />
        </h2>
      </div>

      {/* =====================================
          SECTION 2 — REVIEWS
      ===================================== */}

      <div
        ref={stickyWrapRef}
        className={
          styles.stickyWrap
        }
      >
        <div
          ref={stageRef}
          className={
            styles.reviewsStage
          }
        >
          {/* OTHER SAY */}

          <div
            ref={otherSayRef}
            className={
              styles.otherSay
            }
          >
            [ Other say ]
          </div>

          {/* =================================
              MARQUEE
          ================================= */}

          <div
            className={
              styles.marquee
            }
            aria-hidden="true"
          >
            <div
              className={
                styles.marqueeTrack
              }
            >
              <span>
                REVIEWS
              </span>
              <span>
                REVIEWS
              </span>
              <span>
                REVIEWS
              </span>
              <span>
                REVIEWS
              </span>
              <span>
                REVIEWS
              </span>
              <span>
                REVIEWS
              </span>

              <span>
                REVIEWS
              </span>
              <span>
                REVIEWS
              </span>
              <span>
                REVIEWS
              </span>
              <span>
                REVIEWS
              </span>
              <span>
                REVIEWS
              </span>
              <span>
                REVIEWS
              </span>
            </div>
          </div>

          {/* =================================
              TESTIMONIALS
          ================================= */}

          <div
            className={
              styles.cardsLayer
            }
          >
            {reviews.map(
              (
                review,
                index
              ) => (
                <article
                  key={`${review.name}-${index}`}
                  data-review-card
                  data-lane={
                    review.lane
                  }
                  className={
                    styles.reviewCard
                  }
                  style={{
                    left:
                      review.x,

                    background:
                      review.bg,
                  }}
                >
                  <p
                    className={
                      styles.quote
                    }
                  >
                    “
                    {
                      review.quote
                    }
                    ”
                  </p>

                  <div
                    className={
                      styles.divider
                    }
                  />

                  <div
                    className={
                      styles.personInfo
                    }
                  >
                    <div
                      className={
                        styles.nameRow
                      }
                    >
                      <span
                        className={
                          styles.name
                        }
                      >
                        {
                          review.name
                        }
                      </span>

                      <img
                        src="/images/reviews/verified-badge.svg"
                        alt=""
                        className={
                          styles.verified
                        }
                      />
                    </div>

                    <span
                      className={
                        styles.role
                      }
                    >
                      {
                        review.role
                      }
                    </span>
                  </div>
                </article>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}