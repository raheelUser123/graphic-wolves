"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

import styles from "./WebDevelopmentHero.module.css";

const cards = [
  {
    type: "image",
    image:
      "/images/services/web-development/hero/project-1.webp",
    alt: "Website project preview",
    rotation: -9,
  },

  {
    type: "stat",
    rotation: 6.5,
    color: "blue",
    stat: "+5 Years",
    title: "Brand experience",
    caption: "Experiences that stick",
  },

  {
    type: "image",
    image:
      "/images/services/web-development/hero/project-2.webp",
    alt: "Website project preview",
    rotation: -5.5,
  },

  {
    type: "stat",
    rotation: 5,
    color: "green",
    stat: "+30 Brands",
    title: "Built to Scale",
    caption: "Grow without limits",
  },

  {
    type: "image",
    image:
      "/images/services/web-development/hero/project-3.webp",
    alt: "Website project preview",
    rotation: -4.5,
  },
];

export default function WebDevelopmentHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const breadcrumb =
        section.querySelector<HTMLElement>(
          "[data-web-breadcrumb]"
        );

      const heading =
        section.querySelector<HTMLElement>(
          "[data-web-heading]"
        );

      const caption =
        section.querySelector<HTMLElement>(
          "[data-web-caption]"
        );

      const cards =
        gsap.utils.toArray<HTMLElement>(
          "[data-web-card]"
        );

      /* =========================================
         INTRO
      ========================================= */

      gsap.fromTo(
        breadcrumb,
        {
          opacity: 0,
          y: 15,
        },
        {
          opacity: 1,
          y: 0,

          duration: 0.7,

          ease: "power3.out",
        }
      );

      gsap.fromTo(
        heading,
        {
          opacity: 0,
          y: 38,
          filter: "blur(6px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",

          duration: 1,

          delay: 0.06,

          ease: "power4.out",
        }
      );

      gsap.fromTo(
        caption,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,

          duration: 0.85,

          delay: 0.22,

          ease: "power3.out",
        }
      );

      /* =========================================
         CARD INTRO

         Rotation CSS handle karegi.
         GSAP transform overwrite nahi karega.
      ========================================= */

      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 75,
          scale: 0.94,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,

          duration: 1,

          stagger: 0.07,

          delay: 0.3,

          ease: "power4.out",

          clearProps: "transform",
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
    >
      <div className={styles.content}>
        {/* =====================================
            BREADCRUMB
        ===================================== */}

        <div
          data-web-breadcrumb
          className={styles.breadcrumb}
        >
          <Link
            href="/services"
            className={styles.breadcrumbMuted}
          >
            Our Services
          </Link>

          <span
            className={styles.breadcrumbDivider}
          />

          <span
            className={styles.breadcrumbActive}
          >
            Website Development
          </span>
        </div>

        {/* =====================================
            HEADING
        ===================================== */}

        <h1
          data-web-heading
          className={styles.heading}
        >
          Websites That Stay
          <br />

          Fast as{" "}
          <span className={styles.growth}>
            You Grow.
          </span>
        </h1>

        {/* =====================================
            CAPTION
        ===================================== */}

        <p
          data-web-caption
          className={styles.caption}
        >
          We build websites that stay fast, stable, and reliable as your
          <br />
          business grows, engineered for lasting performance.
        </p>

        {/* =====================================
            CARDS ROW
        ===================================== */}

        <div className={styles.cardsViewport}>
          <div className={styles.cardsRow}>
            {cards.map((card, index) => {
              const rotationClass =
                styles[
                  `rotation${index + 1}` as keyof typeof styles
                ];

              return (
                <article
                  key={index}
                  data-web-card
                  className={`${styles.cardItem} ${rotationClass}`}
                >
                  {card.type === "image" ? (
                    <div className={styles.imageCard}>
                      <img
                        src={card.image}
                        alt={card.alt || ""}
                        className={styles.cardImage}
                      />
                    </div>
                  ) : (
                    <div
                      className={`${styles.statCard} ${
                        card.color === "blue"
                          ? styles.blueCard
                          : styles.greenCard
                      }`}
                    >
                      <div
                        className={
                          styles.statNumber
                        }
                      >
                        {card.stat}
                      </div>

                      <div
                        className={
                          styles.statFooter
                        }
                      >
                        <div
                          className={
                            styles.statTitle
                          }
                        >
                          {card.title}
                        </div>

                        <span
                          className={
                            styles.statDivider
                          }
                        />

                        <div
                          className={
                            styles.statCaption
                          }
                        >
                          {card.caption}
                        </div>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}