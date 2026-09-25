"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ExpertiseSection.module.css";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    src: "/images/expertise/card-1.svg",
    alt: "Adobe expertise",
  },
  {
    src: "/images/expertise/card-2.svg",
    alt: "Framer expertise",
  },
  {
    src: "/images/expertise/card-3.svg",
    alt: "Trello expertise",
  },
  {
    src: "/images/expertise/card-4.svg",
    alt: "Webflow expertise",
  },
  {
    src: "/images/expertise/card-5.svg",
    alt: "Photoshop expertise",
  },
  {
    src: "/images/expertise/card-6.svg",
    alt: "OpenAI expertise",
  },
  {
    src: "/images/expertise/card-7.svg",
    alt: "Behance expertise",
  },
  {
    src: "/images/expertise/card-8.svg",
    alt: "Illustrator expertise",
  },
  {
    src: "/images/expertise/card-9.svg",
    alt: "Slack expertise",
  },
  {
    src: "/images/expertise/card-10.svg",
    alt: "Figma expertise",
  },
];

export default function ExpertiseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const rotorRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const rotor = rotorRef.current;
    const center = centerRef.current;

    if (!section || !rotor || !center) return;

    const ctx = gsap.context(() => {
      const items =
        gsap.utils.toArray<HTMLElement>("[data-expertise-card]");

      /* =========================================
         PERFECT CIRCLE RADIUS
      ========================================= */

     const getRadius = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  if (width >= 1600) {
    return Math.min(320, height * 0.35);
  }

  if (width >= 1200) {
    return Math.min(295, height * 0.33);
  }

  if (width >= 768) {
    return Math.min(225, height * 0.29);
  }

  return Math.min(140, height * 0.24);
};

      /* =========================================
         PUT ICONS ON PERFECT CIRCLE
      ========================================= */

     const setCirclePositions = () => {
  const radius = getRadius();

  items.forEach((item, index) => {
    const angle = -90 - index * (360 / items.length);
    const radians = (angle * Math.PI) / 180;

    gsap.set(item, {
      x: Math.cos(radians) * radius,
      y: Math.sin(radians) * radius,
      rotation: 0,
      scale: 0.82,
      opacity: 0,
      transformOrigin: "50% 50%",
    });
  });
};

      setCirclePositions();

      /* =========================================
         CENTER TEXT INITIAL STATE
      ========================================= */

      gsap.set(center, {
        opacity: 0.18,
      });

      gsap.set(rotor, {
        rotation: 0,
        transformOrigin: "0 0",
      });

      /* =========================================
         SCROLL REVEAL
      ========================================= */

      const revealTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,

          start: "top top",

          end: "+=950",

          scrub: 1.1,

          pin: true,

          anticipatePin: 1,

          invalidateOnRefresh: true,
        },
      });

      /* Heading first */

      revealTimeline.to(
        center,
        {
          opacity: 1,

          duration: 0.18,

          ease: "none",
        },
        0
      );

      /* =========================================
         ICONS APPEAR ANTI-CLOCKWISE
      ========================================= */

      items.forEach((item, index) => {
        revealTimeline.to(
          item,
          {
            opacity: 1,

            scale: 1,

            duration: 0.14,

            ease: "power2.out",
          },

          0.10 + index * 0.075
        );
      });

      /* =========================================
         AUTO ROTATE WHEN FULLY VISIBLE
      ========================================= */

      const autoRotation = gsap.to(rotor, {
        rotation: -360,

        duration: 30,

        repeat: -1,

        ease: "none",

        paused: true,
      });

      const rotationTrigger = ScrollTrigger.create({
        trigger: section,

        start: "top top",

        end: "+=950",

        onUpdate(self) {
          /*
           * Full ring reveal hone ke baad
           * rotation start hogi.
           */

          if (self.progress >= 0.94) {
            if (autoRotation.paused()) {
              autoRotation.play();
            }
          } else {
            if (!autoRotation.paused()) {
              autoRotation.pause();
            }
          }
        },

        onLeaveBack() {
          autoRotation.pause();

          gsap.set(rotor, {
            rotation: 0,
          });
        },
      });

      /* =========================================
         KEEP EVERY ICON UPRIGHT
      ========================================= */

      const keepIconsStraight = () => {
        const rotorRotation =
          Number(
            gsap.getProperty(
              rotor,
              "rotation"
            )
          ) || 0;

        items.forEach((item) => {
          gsap.set(item, {
            rotation: -rotorRotation,
          });
        });
      };

      gsap.ticker.add(keepIconsStraight);

      /* =========================================
         RESIZE
      ========================================= */

      const handleResize = () => {
        const radius = getRadius();

        items.forEach((item, index) => {
          const angle =
            -90 -
            index * (360 / items.length);

          const radians =
            (angle * Math.PI) / 180;

          gsap.set(item, {
            x:
              Math.cos(radians) * radius,

            y:
              Math.sin(radians) * radius,
          });
        });

        ScrollTrigger.refresh();
      };

      window.addEventListener(
        "resize",
        handleResize
      );

      return () => {
        window.removeEventListener(
          "resize",
          handleResize
        );

        gsap.ticker.remove(
          keepIconsStraight
        );

        autoRotation.kill();

        rotationTrigger.kill();
      };
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.expertiseSection}
    >
      <div className={styles.stage}>
        {/* =====================================
            RING
        ===================================== */}

        <div className={styles.ringAnchor}>
          <div
            ref={rotorRef}
            className={styles.rotor}
          >
            {cards.map(
              (card, index) => (
                <div
                  key={card.src}
                  className={styles.card}
                  data-expertise-card
                  style={{
                    zIndex:
                      cards.length - index,
                  }}
                >
                  <img
                    src={card.src}
                    alt={card.alt}
                  />
                </div>
              )
            )}
          </div>
        </div>

        {/* =====================================
            CENTER TEXT
        ===================================== */}

        <div
          ref={centerRef}
          className={styles.centerContent}
        >
          <h2 className={styles.heading}>
            <span>Our</span>

            <em>Expertise</em>
          </h2>

          <p className={styles.caption}>
            if it lives on a screen,
            we design it, build it,
            <br />
            and make it sell.
          </p>
        </div>
      </div>
    </section>
  );
}