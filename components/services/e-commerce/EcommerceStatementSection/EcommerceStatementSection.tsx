"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./EcommerceStatementSection.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function EcommerceStatementSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const iconRef = useRef<HTMLImageElement>(null);
  const coreSectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const icon = iconRef.current;
    const coreSection = coreSectionRef.current;

    if (!section || !icon || !coreSection) return;

    const ctx = gsap.context(() => {
      const lines =
        gsap.utils.toArray<HTMLElement>(
          "[data-brand-line]"
        );

      /* =========================================
         INITIAL TEXT
      ========================================= */

      gsap.set(lines, {
        color: "rgba(17, 17, 17, 0.28)",
        opacity: 0.72,
      });

      /* =========================================
         INITIAL ICON
      ========================================= */

      gsap.set(icon, {
        opacity: 0,
        scale: 0.15,
        rotation: -18,
        y: 18,
        filter: "blur(7px)",
        transformOrigin: "center center",
      });

      /* =========================================
         MASTER SCROLL TIMELINE
      ========================================= */

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,

          start: "top 72%",
          end: "bottom 42%",

          scrub: 1.4,

          invalidateOnRefresh: true,

          // debug:
          // markers: true,
        },
      });

      /* =========================================
         LINE 1
      ========================================= */

      tl.to(
        lines[0],
        {
          color: "#111111",
          opacity: 1,
          duration: 0.34,
          ease: "none",
        },
        0
      );

      /* =========================================
         LINE 2
         Starts before line 1 fully finishes
      ========================================= */

      tl.to(
        lines[1],
        {
          color: "#111111",
          opacity: 1,
          duration: 0.36,
          ease: "none",
        },
        0.15
      );

      /* =========================================
         LINE 3
      ========================================= */

      tl.to(
        lines[2],
        {
          color: "#111111",
          opacity: 1,
          duration: 0.38,
          ease: "none",
        },
        0.30
      );

      /* =========================================
         LINE 4
      ========================================= */

      tl.to(
        lines[3],
        {
          color: "#111111",
          opacity: 1,
          duration: 0.4,
          ease: "none",
        },
        0.43
      );

      /* =========================================
         ICON POP
      ========================================= */

      tl.to(
        icon,
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          y: 0,
          filter: "blur(0px)",

          duration: 0.32,

          ease: "back.out(1.7)",
        },
        0.63
      );

      /* =========================================
         SMALL ICON SETTLE
      ========================================= */

      tl.to(
        icon,
        {
          scale: 1.06,

          duration: 0.1,

          ease: "sine.out",
        },
        0.87
      );

      tl.to(
        icon,
        {
          scale: 1,

          duration: 0.1,

          ease: "sine.inOut",
        },
        0.96
      );

      const serviceCards = coreSection.querySelectorAll<HTMLElement>("[data-core-card]");

      gsap.fromTo(
        serviceCards,
        { opacity: 0, y: 38 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: coreSection,
            start: "top 78%",
            end: "top 35%",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        }
      );

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className={styles.section}
      >
        <div className={styles.inner}>
          <h2 className={styles.heading}>
            <span data-brand-line className={styles.line}>
              We combine premium
            </span>
            <span data-brand-line className={styles.line}>
              quality with strategic
            </span>
            <span data-brand-line className={styles.line}>
              scalability to elevate your
            </span>
            <span data-brand-line className={`${styles.line} ${styles.lastLine}`}>
              <span>brand</span>
              <img
                ref={iconRef}
                src="/images/services/branding/brand-icon.svg"
                alt=""
                className={styles.icon}
                aria-hidden="true"
              />
            </span>
          </h2>
        </div>
      </section>

      <section
        ref={coreSectionRef}
        className={styles.coreSection}
        aria-labelledby="ecommerce-core-heading"
      >
        <img
          className={styles.orangeIcon}
          src="/images/services/ecommerce/Vector.svg"
          alt=""
          aria-hidden="true"
        />

        <div className={styles.corePanel}>
          <h2 id="ecommerce-core-heading" className={styles.coreHeading}>
            Strengthen your product with
            <br />
            our core E-commerce Development
          </h2>

          <div className={styles.serviceGrid}>
            <article data-core-card className={styles.serviceCard}>
              <h3>Shopify store setup</h3>
              <p>End-to-end store setup including products, collections, payments, taxes, and shipping.</p>
            </article>
            <article data-core-card className={styles.serviceCard}>
              <h3>Custom theme development</h3>
              <p>Fully custom Shopify themes built for performance, branding, and conversion.</p>
            </article>
            <article data-core-card className={styles.serviceCard}>
              <h3>Shopify app development</h3>
              <p>Custom apps tailored to unique business workflows and ecommerce needs.</p>
            </article>
            <article data-core-card className={styles.serviceCard}>
              <h3>Shopify plus solutions</h3>
              <p>Enterprise-grade Shopify Plus development for high-volume stores.</p>
            </article>
            <article data-core-card className={styles.serviceCard}>
              <h3>Ecommerce integrations</h3>
              <p>CRM, ERP, marketing, analytics, and fulfillment system integrations.</p>
            </article>
            <article data-core-card className={styles.serviceCard}>
              <h3>Performance &amp; CRO</h3>
              <p>Speed optimization, UX improvements, and conversion rate optimization.</p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}