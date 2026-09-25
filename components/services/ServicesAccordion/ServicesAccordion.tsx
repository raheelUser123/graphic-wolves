"use client";

import {
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./ServicesAccordion.module.css";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Branding & Identity",
    caption:
      "We craft product-focused visual identities that attract high-quality leads. By blending visual clarity with business strategy, our approach ensures design isn't just beautiful — it drives measurable growth.",
    image:
      "/images/main-services-page/services-list/branding.webp",
    href: "/services/branding",
  },

  {
    title: "Web Development",
    caption:
      "Fast, polished, conversion-focused websites built with clean code, strong UX, thoughtful interaction and scalable architecture.",
    image:
      "/images/main-services-page/services-list/web-development.webp",
    href: "/services/web-development",
  },

  {
    title: "E-Commerce Services",
    caption:
      "High-converting e-commerce experiences designed around product discovery, frictionless checkout and long-term customer retention.",
    image:
      "/images/main-services-page/services-list/ecommerce.webp",
    href: "/services/e-commerce",
  },

  {
    title: "Mobile Apps",
    caption:
      "Purpose-built mobile experiences with intuitive interfaces, strong performance and polished interaction across devices.",
    image:
      "/images/main-services-page/services-list/ecommerce.webp",
    href: "/services/mobile-apps",
  },

  {
    title: "API Development",
    caption:
      "Reliable APIs and integrations designed to connect products, platforms and business workflows without unnecessary complexity.",
    image:
      "/images/main-services-page/services-list/branding.webp",
    href: "/services/api-development",
  },
];

export default function ServicesAccordion() {
  const sectionRef =
    useRef<HTMLElement>(null);

  /*
    null = initially sab closed.

    Agar Branding default open chahiye:
    useState<number | null>(0)
  */
  const [openIndex, setOpenIndex] =
    useState<number | null>(null);

  /*
    Hover sirf visual image reveal ke liye.
  */
  const [hoverIndex, setHoverIndex] =
    useState<number | null>(null);

  /* =========================================
     ENTRANCE ANIMATION
  ========================================= */

  useLayoutEffect(() => {
    const section =
      sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const rows =
        gsap.utils.toArray<HTMLElement>(
          "[data-service-row]"
        );

      gsap.fromTo(
        rows,
        {
          y: 55,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,

          duration: 0.9,

          stagger: 0.08,

          ease: "power3.out",

          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions:
              "play none none reverse",
          },
        }
      );
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  /* =========================================
     CLICK

     Ek time pe sirf ek permanent open.
  ========================================= */

  const toggleService = (
    index: number
  ) => {
    setOpenIndex(
      current =>
        current === index
          ? null
          : index
    );
  };

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="services-list-title"
    >
      <div className={styles.inner}>
        {/* =====================================
            LEFT LABEL
        ===================================== */}

        <div
          id="services-list-title"
          className={styles.label}
        >
          Services
        </div>

        {/* =====================================
            SERVICES
        ===================================== */}

        <div className={styles.list}>
          {services.map(
            (service, index) => {
              const isOpen =
                openIndex === index;

              const isHovered =
                hoverIndex === index;

              /*
                IMAGE SHOW CONDITION:

                hover OR permanently opened
              */

              const isImageVisible =
                isOpen || isHovered;

              return (
                <article
                  key={service.title}
                  data-service-row
                  className={`${styles.row} ${
                    isOpen
                      ? styles.open
                      : ""
                  } ${
                    isImageVisible
                      ? styles.imageVisible
                      : ""
                  }`}
                  onMouseEnter={() => {
                    setHoverIndex(index);
                  }}
                  onMouseLeave={() => {
                    setHoverIndex(null);
                  }}
                >
                  {/* =========================
                      IMAGE
                  ========================= */}

                  <div
                    className={
                      styles.backgroundImage
                    }
                    style={{
                      backgroundImage:
                        `url("${service.image}")`,
                    }}
                    aria-hidden="true"
                  />

                  {/* =========================
                      DARK IMAGE OVERLAY
                  ========================= */}

                  <div
                    className={
                      styles.imageOverlay
                    }
                    aria-hidden="true"
                  />

                  {/* =========================
                      ROW HEADER
                  ========================= */}

                  <div
                    className={
                      styles.rowTop
                    }
                  >
                    <Link
                      href={service.href}
                      className={
                        styles.serviceTitle
                      }
                    >
                      {service.title}
                    </Link>

                    <button
                      type="button"
                      className={`${styles.plusButton} ${
                        isOpen
                          ? styles.plusOpen
                          : ""
                      }`}
                      aria-expanded={isOpen}
                      aria-label={
                        isOpen
                          ? `Close ${service.title}`
                          : `Open ${service.title}`
                      }
                      onClick={() =>
                        toggleService(
                          index
                        )
                      }
                    >
                      <span>+</span>
                    </button>
                  </div>

                  {/* =========================
                      CAPTION
                  ========================= */}

                  <div
                    className={
                      styles.captionOuter
                    }
                  >
                    <div
                      className={
                        styles.captionInner
                      }
                    >
                      <p
                        className={
                          styles.caption
                        }
                      >
                        {
                          service.caption
                        }
                      </p>
                    </div>
                  </div>
                </article>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}