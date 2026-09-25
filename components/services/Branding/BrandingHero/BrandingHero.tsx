"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";

import Link from "next/link";
import gsap from "gsap";

import styles from "./BrandingHero.module.css";

const images = [
  "/images/services/branding/hero/1.webp",
  "/images/services/branding/hero/2.webp",
  "/images/services/branding/hero/3.webp",
  "/images/services/branding/hero/4.webp",
  "/images/services/branding/hero/5.webp",
  "/images/services/branding/hero/6.webp",
  "/images/services/branding/hero/7.webp",
];

// IMAGES WORKED

export default function BrandingHero() {
  const sectionRef =
    useRef<HTMLElement>(null);

  const trailRef =
    useRef<HTMLDivElement>(null);

  const indexRef =
    useRef(0);

  const lastPoint =
    useRef({
      x: 0,
      y: 0,
    });

  const lastSpawnTime =
    useRef(0);

  /* =========================================
     INTRO
  ========================================= */

  useLayoutEffect(() => {
    const section =
      sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        `.${styles.breadcrumb}`,
        {
          y: 16,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,

          duration: 0.7,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        `.${styles.heading}`,
        {
          y: 40,
          opacity: 0,
          filter: "blur(5px)",
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",

          duration: 1,
          delay: 0.08,

          ease: "power4.out",
        }
      );

      gsap.fromTo(
        `.${styles.caption}`,
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,

          duration: 0.8,
          delay: 0.24,

          ease: "power3.out",
        }
      );
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  /* =========================================
     CURSOR IMAGE TRAIL
  ========================================= */

  useEffect(() => {
    const section =
      sectionRef.current;

    const trail =
      trailRef.current;

    if (!section || !trail) return;

    const items =
      Array.from(
        trail.querySelectorAll<HTMLElement>(
          "[data-trail-image]"
        )
      );

    /*
      Everything invisible initially.
    */

    gsap.set(items, {
      opacity: 0,
      scale: 0.86,
      xPercent: -50,
      yPercent: -50,
      pointerEvents: "none",
    });

    const spawn = (
      x: number,
      y: number
    ) => {
      const now =
        performance.now();

      /*
        Prevent ridiculous amount of spawning.
      */

      if (
        now -
          lastSpawnTime.current <
        80
      ) {
        return;
      }

      const dx =
        x -
        lastPoint.current.x;

      const dy =
        y -
        lastPoint.current.y;

      const distance =
        Math.hypot(
          dx,
          dy
        );

      /*
        Need enough mouse movement before
        next image appears.
      */

      if (distance < 55) {
        return;
      }

      lastSpawnTime.current =
        now;

      lastPoint.current = {
        x,
        y,
      };

      const index =
        indexRef.current %
        items.length;

      indexRef.current += 1;

      const item =
        items[index];

      const rect =
        section.getBoundingClientRect();

      const localX =
        x - rect.left;

      const localY =
        y - rect.top;

      /*
        Different slight rotation per card.
      */

      const rotations = [
        -7,
        5,
        -3,
        7,
        -5,
        4,
        -2,
      ];

      const rotation =
        rotations[index] ?? 0;

      gsap.killTweensOf(
        item
      );

      gsap.set(item, {
        x: localX,
        y: localY + 22,

        rotation:
          rotation,

        zIndex:
          10 +
          indexRef.current,
      });

      /*
        Image appears from slightly below.
      */

      gsap.fromTo(
        item,
        {
          opacity: 0,

          scale: 0.86,

          y:
            localY +
            45,

          filter:
            "blur(6px)",
        },
        {
          opacity: 1,

          scale: 1,

          y: localY,

          filter:
            "blur(0px)",

          duration: 0.55,

          ease:
            "power3.out",
        }
      );

      /*
        Hold for a bit, then fade away.
      */

      gsap.to(item, {
        opacity: 0,

        scale: 0.94,

        y:
          localY -
          16,

        filter:
          "blur(3px)",

        duration: 0.65,

        delay: 1.35,

        ease:
          "power2.inOut",
      });
    };

    const handleMouseMove = (
      event: MouseEvent
    ) => {
      const target =
        event.target as HTMLElement;

      /*
        IMPORTANT:
        Header / menu / buttons / links etc
        won't spawn images.

        We only allow spawning inside the
        dedicated interactive field.
      */

      if (
        target.closest(
          "[data-no-branding-trail]"
        )
      ) {
        return;
      }

      const interactionArea =
        target.closest(
          "[data-branding-trail-area]"
        );

      if (!interactionArea) {
        return;
      }

      spawn(
        event.clientX,
        event.clientY
      );
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove,
      {
        passive: true,
      }
    );

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      gsap.killTweensOf(
        items
      );
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={
        styles.section
      }
    >
      {/* =====================================
          SAFE HEADER SPACE

          Images yahan spawn nahi hongi.
      ===================================== */}

      <div
        className={
          styles.headerSafeArea
        }
        data-no-branding-trail
      />

      {/* =====================================
          INTERACTIVE AREA
      ===================================== */}

      <div
        className={
          styles.heroContent
        }
        data-branding-trail-area
      >
        {/* =================================
            BREADCRUMB
        ================================= */}

        <div
          className={
            styles.breadcrumb
          }
          data-no-branding-trail
        >
          <Link
            href="/services"
            className={
              styles.breadcrumbMuted
            }
          >
            Our Services
          </Link>

          <span
            className={
              styles.breadcrumbDivider
            }
          />

          <span
            className={
              styles.breadcrumbActive
            }
          >
            Branding &amp;
            Identity
          </span>
        </div>

        {/* =================================
            HEADING
        ================================= */}

        <h1
          className={
            styles.heading
          }
        >
          We design clarity we
          <br />

          build{" "}
          <span
            className={
              styles.growth
            }
          >
            growth.
          </span>
        </h1>

        {/* =================================
            CAPTION
        ================================= */}

        <p
          className={
            styles.caption
          }
        >
          GraphicWolves is a
          creative agency focused
          on strategy, design, and
          digital
          <br />
          experiences that help
          brands grow with
          intention.
        </p>
      </div>

      {/* =====================================
          IMAGE TRAIL
      ===================================== */}

      <div
        ref={trailRef}
        className={
          styles.trailLayer
        }
        aria-hidden="true"
      >
        {images.map(
          (
            image,
            index
          ) => (
            <div
              key={
                image
              }
              data-trail-image
              className={
                styles.trailImage
              }
            >
              <img
                src={image}
                alt=""
                draggable={false}
              />
            </div>
          )
        )}
      </div>
    </section>
  );
}