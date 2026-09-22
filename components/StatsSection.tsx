"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./StatsSection.module.css";

gsap.registerPlugin(ScrollTrigger);

const services = [
  "Development",
  "Brand Design",
  "MARKETING",
  "MOBILE APPS",
  "CRM EXPERTS",
  "API DEVELOPMENT",
  "SMM",
  "EMAIL MARKETING",
  "CAMPAIGN CREATOR AND OPTIMIZATION",
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const serviceWrapRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      /* =========================================
         COUNTERS
      ========================================= */

      const counters =
        section.querySelectorAll<HTMLElement>("[data-counter]");

      counters.forEach((counter) => {
        const end = Number(counter.dataset.counter || 0);
        const suffix = counter.dataset.suffix || "";

        const obj = { value: 0 };

        gsap.to(obj, {
          value: end,
          duration: 1.7,
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
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % services.length);
    }, 1800);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const wrap = serviceWrapRef.current;

    if (!wrap) return;

    const items =
      wrap.querySelectorAll<HTMLElement>("[data-service-item]");

    items.forEach((item, index) => {
      const isActive = index === activeIndex;

      gsap.to(item, {
        opacity: isActive ? 1 : 0.24,
        filter: isActive ? "blur(0px)" : "blur(3px)",
        scale: isActive ? 1 : 0.95,
        x: isActive ? 0 : 18,
        color: isActive ? "#ffffff" : "rgba(255,255,255,0.55)",
        duration: 0.85,
        ease: "power3.out",
      });
    });
  }, [activeIndex]);

  return (
    <section
      ref={sectionRef}
      className={styles.statsSection}
    >
      <div className={styles.grid}>
        {/* =====================================
            ANIMATED BLACK BOX
        ===================================== */}

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
              className={styles.serviceStack}
            >
              {services.map((service, index) => {
                const isActive = index === activeIndex;

                return (
                  <div
                    key={service}
                    data-service-item
                    className={`${styles.serviceItem} ${
                      isActive ? styles.serviceActive : ""
                    }`}
                  >
                    <span
                      className={`${styles.serviceArrow} ${
                        isActive ? styles.arrowVisible : ""
                      }`}
                    >
                      →
                    </span>

                    <span>{service}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </article>

        {/* =====================================
            42+
        ===================================== */}

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

        {/* =====================================
            27+
        ===================================== */}

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

        {/* =====================================
            04+
        ===================================== */}

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

        {/* =====================================
            10M+
        ===================================== */}

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