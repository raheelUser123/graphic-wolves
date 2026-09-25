"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./StatsSection.module.css";

gsap.registerPlugin(ScrollTrigger);

const services = [
  "Web Development",
  "Brand & Design",
  "App Development",
  "CRM Development",
  "API Development",
  "(SMM)",
  "Email Marketing",
  "Campaign Creation",
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const serviceWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const serviceWrap = serviceWrapRef.current;

    if (!section || !serviceWrap) return;

    const ctx = gsap.context(() => {
      /* ===============================
         COUNTERS
      =============================== */

      const counters =
        section.querySelectorAll<HTMLElement>("[data-counter]");

      counters.forEach((counter) => {
        const end = Number(counter.dataset.counter || 0);
        const suffix = counter.dataset.suffix || "";

        const obj = { value: 0 };

        gsap.to(obj, {
          value: end,
          duration: 1.6,
          ease: "power2.out",

          scrollTrigger: {
            trigger: section,
            start: "top 72%",
            once: true,
          },

          onUpdate: () => {
            counter.textContent =
              Math.floor(obj.value).toLocaleString() + suffix;
          },
        });
      });

      /* ===============================
         SERVICE ROTATION
      =============================== */

      const items =
        gsap.utils.toArray<HTMLElement>(
          serviceWrap.querySelectorAll("[data-service-item]")
        );

      const positions = [
  {
    y: -150,
    x: 30,
    rotate: -8,
    opacity: 0.18,
    blur: 6,
    scale: 0.88,
  },
  {
    y: -95,
    x: 12,
    rotate: 6,
    opacity: 0.24,
    blur: 5,
    scale: 0.92,
  },
  {
    y: -48,
    x: 24,
    rotate: -4,
    opacity: 0.32,
    blur: 4,
    scale: 0.95,
  },

  /* ACTIVE CENTER */
  {
    y: 0,
    x: 0,
    rotate: 0,
    opacity: 1,
    blur: 0,
    scale: 1,
  },

  {
    y: 55,
    x: 18,
    rotate: 5,
    opacity: 0.30,
    blur: 4,
    scale: 0.95,
  },
  {
    y: 105,
    x: 5,
    rotate: -7,
    opacity: 0.22,
    blur: 5,
    scale: 0.91,
  },
  {
    y: 155,
    x: 28,
    rotate: 7,
    opacity: 0.16,
    blur: 7,
    scale: 0.87,
  },
];

      let active = 0;

      const renderServices = (animate = true) => {
        items.forEach((item, index) => {
          let relative = index - active;

          /*
            Circular list
          */
          if (relative > items.length / 2) {
            relative -= items.length;
          }

          if (relative < -items.length / 2) {
            relative += items.length;
          }

          /*
            active = center
            negative = above
            positive = below
          */

          const mappedIndex = relative + 3;

          /*
            Far away items stay almost invisible
          */
          if (
            mappedIndex < 0 ||
            mappedIndex >= positions.length
          ) {
            gsap.set(item, {
              opacity: 0,
              visibility: "hidden",
            });

            return;
          }

          const pos = positions[mappedIndex];
          const isActive = relative === 0;

          gsap.set(item, {
            visibility: "visible",
            zIndex: isActive ? 10 : 1,
          });

          const animation = {
            x: pos.x,
            y: pos.y,
            rotation: pos.rotate,
            opacity: pos.opacity,
            scale: pos.scale,
            filter: `blur(${pos.blur}px)`,

            color: isActive
              ? "#ffffff"
              : "rgba(255,255,255,0.40)",

            duration: animate ? 1.15 : 0,

            ease: "power3.inOut",
          };

          gsap.to(item, animation);

          const arrow =
            item.querySelector<HTMLElement>("[data-service-arrow]");

          if (arrow) {
            gsap.to(arrow, {
              opacity: isActive ? 1 : 0,
              x: isActive ? 0 : -10,
              width: isActive ? 44 : 0,

              duration: animate ? 0.7 : 0,

              ease: "power3.out",
            });
          }
        });
      };

      renderServices(false);

      let interval: number | undefined;

      const startRotation = () => {
        if (interval) return;

        interval = window.setInterval(() => {
          active = (active + 1) % items.length;

          renderServices(true);
        }, 1100);
      };

      ScrollTrigger.create({
        trigger: section,
        start: "top 80%",

        once: true,

        onEnter: () => {
          startRotation();
        },
      });

      return () => {
        if (interval) {
          window.clearInterval(interval);
        }
      };
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.statsSection}
    >
      <div className={styles.grid}>
        {/* BLACK CARD */}

        <article
          className={`${styles.card} ${styles.blackCard}`}
        >
          <div className={styles.blackInner}>
            <div className={styles.videoTitle}>
              <span className={styles.videoDot}>•</span>

              <span className={styles.videoTitleBold}>
                Number
              </span>

              <span className={styles.videoTitleItalic}>
                Facts
              </span>
            </div>

            <div
              ref={serviceWrapRef}
              className={styles.serviceStage}
            >
              {services.map((service) => (
                <div
                  key={service}
                  className={styles.serviceItem}
                  data-service-item
                >
                  <span
                    className={styles.serviceArrow}
                    data-service-arrow
                  >
                    →
                  </span>

                  <span className={styles.serviceText}>
                    {service}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </article>

        {/* 42+ */}

        <article
          className={`${styles.card} ${styles.purpleCard}`}
        >
          <div
            className={styles.number}
            data-counter="42"
            data-suffix="+"
          >
            0+
          </div>

          <div className={styles.cardFooter}>
            Brands Transformed
          </div>
        </article>

        {/* 27+ */}

        <article
          className={`${styles.card} ${styles.greyTopCard}`}
        >
          <div
            className={styles.number}
            data-counter="27"
            data-suffix="+"
          >
            0+
          </div>

          <div className={styles.cardFooter}>
            Website Design &amp; Develop
          </div>
        </article>

        {/* 04+ */}

        <article
          className={`${styles.card} ${styles.greyBottomCard}`}
        >
          <div
            className={styles.number}
            data-counter="4"
            data-suffix="+"
          >
            0+
          </div>

          <div className={styles.cardFooter}>
            Industries served &amp; growing
          </div>
        </article>

        {/* 10M+ */}

        <article
          className={`${styles.card} ${styles.greenCard}`}
        >
          <div
            className={styles.number}
            data-counter="10"
            data-suffix="M+"
          >
            0M+
          </div>

          <div className={styles.cardFooterNoBorder}>
            Humans reached through our campaigns
          </div>
        </article>
      </div>
    </section>
  );
}