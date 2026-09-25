"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./HorizontalWords.module.css";

gsap.registerPlugin(ScrollTrigger);

const TEXT = "We wanna be where the people are";

const createLetterMotion = (index: number) => {
  const xPattern = [
    -8, 20, -14, 28, -18, 24, -12, 32,
    -21, 27, -16, 22, -25, 30, -13, 26,
    -20, 34, -17, 23, -19, 29, -14, 25,
    -22, 31, -18, 24, -26, 28, -15, 33,
  ];

  const yPattern = [
    -135, 82, -108, 125, -72, 97, -130, 68,
    115, -91, 58, -122, 140, -69, 103, -81,
    128, -110, 72, 136, -94, 54, -138, 88,
    111, -76, 142, -99, 64, -126, 79, 119,
  ];

  const rotationPattern = [
    -18, 11, 16, -21, 18, -13, 25, -15,
    20, -23, 9, 17, -20, 23, -14, 16,
    -26, 12, 19, -15, 24, -20, 13, -17,
    22, -10, 16, -24, 19, -15, 26, -19,
  ];

  return {
    x: xPattern[index % xPattern.length],
    y: yPattern[index % yPattern.length],
    rotation: rotationPattern[index % rotationPattern.length],
  };
};

export default function HorizontalWords() {
  const pathname = usePathname();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const letters = useMemo(() => {
    return TEXT.split("").map((character, index) => ({
      character,
      index,
    }));
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) return;

    // Kill a stale instance first. This is important when coming back to
    // the home page through Next.js client-side navigation.
    ScrollTrigger.getById("horizontal-words")?.kill(true);

    const ctx = gsap.context(() => {
      const letterEls =
        gsap.utils.toArray<HTMLElement>("[data-flying-letter]");

      const stickers =
        gsap.utils.toArray<HTMLElement>("[data-scroll-sticker]");

      const arrowPaths =
        gsap.utils.toArray<SVGPathElement>("[data-arrow-path]");

      /* =========================================
         INITIAL LETTER SCATTER
      ========================================= */

      letterEls.forEach((letter, index) => {
        const motion = createLetterMotion(index);

        gsap.set(letter, {
          xPercent: motion.x,
          yPercent: motion.y,
          rotation: motion.rotation,
          transformOrigin: "50% 50%",
          willChange: "transform",
        });
      });

      /* =========================================
         STICKERS INITIAL STATE
      ========================================= */

      gsap.set(stickers, {
        scale: 0,
        transformOrigin: "50% 50%",
      });

      /* =========================================
         ARROWS INITIAL STATE
      ========================================= */

      arrowPaths.forEach((path) => {
        const length = path.getTotalLength();

        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
      });

      /* =========================================
         MAIN TIMELINE
      ========================================= */

      const timeline = gsap.timeline({
        scrollTrigger: {
          id: "horizontal-words",
          trigger: section,
          start: "top top",
          end: "+=440%",
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: 1,
        },
      });

      /* =========================================
         TRACK MOVEMENT
      ========================================= */

      timeline.fromTo(
  track,
  {
    xPercent: 58,
  },
  {
    xPercent: -57,
    duration: 8.2,
    ease: "none",
  },
  0
);

      /* =========================================
         LETTERS SETTLE
      ========================================= */

     /* =========================================
   LETTERS ASSEMBLE ONE-BY-ONE
========================================= */

letterEls.forEach((letter, index) => {
  const startTime = 0.15 + index * 0.20;

  timeline.to(
    letter,
    {
      xPercent: 0,
      yPercent: 0,
      rotation: 0,

      duration: 1.45,

      ease: "power2.out",
    },
    startTime
  );
});

      /* =========================================
         WATCH STICKER
      ========================================= */

     timeline.fromTo(
  "[data-sticker='watch']",
  {
    scale: 0,
    yPercent: 55,
    rotation: 18,
  },
  {
    scale: 1,
    yPercent: 0,
    rotation: -4,
    duration: 0.7,
    ease: "back.out(1.7)",
  },
  0.8
);

timeline.to(
  "[data-arrow='main'] [data-arrow-path]",
  {
    strokeDashoffset: 0,
    duration: 0.9,
    ease: "none",
  },
  1.25
);

timeline.fromTo(
  "[data-sticker='cursor']",
  {
    scale: 0,
    yPercent: -110,
    rotation: 18,
  },
  {
    scale: 1,
    yPercent: 0,
    rotation: -8,
    duration: 0.7,
    ease: "back.out(1.7)",
  },
  2
);

timeline.to(
  "[data-sticker='watch']",
  {
    scale: 0,
    rotation: -24,
    duration: 0.45,
    ease: "power2.in",
  },
  2.8
);

timeline.fromTo(
  "[data-sticker='phone']",
  {
    scale: 0,
    yPercent: 60,
    rotation: 12,
  },
  {
    scale: 1,
    yPercent: 0,
    rotation: 5,
    duration: 0.7,
    ease: "back.out(1.7)",
  },
  3.2
);

timeline.to(
  "[data-sticker='cursor']",
  {
    scale: 0,
    rotation: 25,
    duration: 0.45,
    ease: "power2.in",
  },
  4
);

timeline.to(
  "[data-arrow='end'] [data-arrow-path]",
  {
    strokeDashoffset: 0,
    duration: 1.15,
    ease: "none",
  },
  6.65
);

timeline.to(
  "[data-sticker='phone']",
  {
    scale: 0,
    rotation: 18,
    duration: 0.5,
    ease: "power2.in",
  },
  5.5
);

timeline.to({}, { duration: 0.4 });

      // Refresh only after the new route has painted. Calling refresh
      // synchronously during App Router navigation can calculate the pin
      // against the previous route layout.
      const frame = requestAnimationFrame(() => {
        ScrollTrigger.refresh(true);
        ScrollTrigger.update();
      });

      const timer = window.setTimeout(() => {
        ScrollTrigger.refresh(true);
        ScrollTrigger.update();
      }, 250);

      return () => {
        cancelAnimationFrame(frame);
        window.clearTimeout(timer);
      };
    }, section);

    return () => {
      ScrollTrigger.getById("horizontal-words")?.kill(true);
      ctx.revert();
    };
  }, [pathname]);

  let actualLetterIndex = 0;

  return (
    <section
      ref={sectionRef}
      className={styles.horizontalWords}
      aria-labelledby="horizontalWordsTitle"
    >
      <div className={styles.stage}>
        <div
          ref={trackRef}
          className={styles.track}
        >
          <h2
            id="horizontalWordsTitle"
            className={styles.heading}
            aria-label={TEXT}
          >
            {letters.map(({ character, index }) => {
              if (character === " ") {
                return (
                  <span
                    key={index}
                    className={styles.space}
                    aria-hidden="true"
                  >
                    {" "}
                  </span>
                );
              }

              const currentLetterIndex = actualLetterIndex;
              actualLetterIndex += 1;

              return (
                <span
                  key={index}
                  className={styles.letter}
                  data-flying-letter
                  data-letter-index={currentLetterIndex}
                  aria-hidden="true"
                >
                  {character}
                </span>
              );
            })}
          </h2>

          {/* FINAL ARROW AFTER TEXT */}

          <div className={styles.finalArrowWrap}>
            <svg
              className={styles.finalArrow}
              viewBox="0 0 140 127"
              fill="none"
              data-arrow="end"
              aria-hidden="true"
            >
              <path
                data-arrow-path
                d="M2.03125 2.42188C100.469 2.42188 130.156 52.4219 118.437 125.078L99.6875 107.891"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <path
                data-arrow-path
                d="M2.03125 2.42188C100.469 2.42188 130.156 52.4219 118.438 125.078L137.969 110.234"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* WATCH */}

          <div
            className={`${styles.sticker} ${styles.watchSticker}`}
            data-scroll-sticker
            data-sticker="watch"
          >
            <img
              src="/images/horizontal/watch.svg"
              alt=""
              aria-hidden="true"
            />
          </div>

          {/* CURSOR */}

          <div
            className={`${styles.sticker} ${styles.cursorSticker}`}
            data-scroll-sticker
            data-sticker="cursor"
          >
            <img
              src="/images/horizontal/cursor.svg"
              alt=""
              aria-hidden="true"
            />
          </div>

          {/* PHONE */}

          <div
            className={`${styles.sticker} ${styles.phoneSticker}`}
            data-scroll-sticker
            data-sticker="phone"
          >
            <img
              src="/images/horizontal/phone.svg"
              alt=""
              aria-hidden="true"
            />
          </div>

          {/* MAIN ARROW */}

          <svg
            className={`${styles.arrow} ${styles.mainArrow}`}
            viewBox="0 0 386 127"
            fill="none"
            data-arrow="main"
            aria-hidden="true"
          >
            <path
              data-arrow-path
              d="M2 123C9 35.9999 84.5 17 124 25.9999C217.764 47.3635 207 115 177.5 123C105.777 142.45 110.737 1.99991 232.5 2C310.5 2.00006 366.5 79 376 118L356.5 105.5"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              data-arrow-path
              d="M2 123C9 35.9999 84.5 17 124 25.9999C217.764 47.3635 207 115 177.5 123C105.777 142.45 110.737 1.99991 232.5 2C310.5 2.00006 366.5 79 376 118L384 97"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* CAPTION */}

        <div className={styles.bottomText}>
          <p>
            wherever your audience scrolls, taps, or shops, we make sure your brand is already there looking sharp.
          </p>
        </div>
      </div>
    </section>
  );
}