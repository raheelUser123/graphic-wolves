"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ServicesSection.module.css";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Web Development",
    description:
      "fast, scroll-stopping websites built to convert, coded clean and tuned for the speeds google quietly rewards from first pixel to final deploy",
    href: "/services/web-development",
    shellClass: styles.webShell,
    cardClass: styles.webCard,
    icon: "/images/services/web-pencil.svg",
  },
  {
    title: "E-Commerce",
    description:
      "online stores designed to sell, with smooth product pages and a checkout people don't rage quit. we turn browsers into buyers and one-time carts into loyal customers",
    href: "/services/e-commerce",
    shellClass: styles.ecommerceShell,
    cardClass: styles.ecommerceCard,
    icon: "/images/services/ecommerce-shop.svg",
  },
  {
    title: "Branding & Identity",
    description:
      "Logos, colors, and brand systems with a personality people remember long after they scroll past. we shape how your brand looks, sounds, and feels",
    href: "/services/branding",
    shellClass: styles.brandingShell,
    cardClass: styles.brandingCard,
    icon: "/images/services/branding-pencil.svg",
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cardsWrap = cardsWrapRef.current;

    if (!section || !heading || !cardsWrap) return;

    const ctx = gsap.context(() => {
      const shells =
        gsap.utils.toArray<HTMLElement>("[data-service-shell]");

      /* =========================================
         INITIAL STATES
      ========================================= */

      gsap.set(section, {
        yPercent: 16,
        borderRadius: "48px 48px 0px 0px",
      });

      gsap.set(heading, {
        y: 70,
        autoAlpha: 0,
      });

      gsap.set(shells, {
        y: 120,
        autoAlpha: 0,
        scale: 0.94,
      });

      /* =========================================
         SECTION COVER / PARALLAX TIMELINE

         1. Black section covers Expertise
         2. Heading appears
         3. Cards appear
      ========================================= */

      const intro = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 100%",
          end: "top 22%",
          scrub: 1.15,
          invalidateOnRefresh: true,
        },
      });

      intro.to(
        section,
        {
          yPercent: 0,
          borderRadius: "0px",
          ease: "none",
          duration: 1,
        },
        0
      );

      intro.to(
        heading,
        {
          y: 0,
          autoAlpha: 1,
          ease: "power3.out",
          duration: 0.42,
        },
        0.52
      );

      intro.to(
        shells,
        {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          stagger: 0.07,
          ease: "power3.out",
          duration: 0.48,
        },
        0.66
      );

      /* =========================================
         SUBTLE CARD PARALLAX AFTER ENTER
      ========================================= */

      shells.forEach((shell, index) => {
        const movement =
          index === 0 ? -22 : index === 1 ? 12 : -16;

        gsap.to(shell, {
          y: movement,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 10%",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  /* =========================================
     DIRECTIONAL FLOAT HOVER
  ========================================= */

  const handleMouseMove = (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    const card = event.currentTarget;

    const rect = card.getBoundingClientRect();

    const x =
      event.clientX - (rect.left + rect.width / 2);

    const y =
      event.clientY - (rect.top + rect.height / 2);

    const nx = x / (rect.width / 2);
    const ny = y / (rect.height / 2);

    gsap.to(card, {
      x: nx * 24,
      y: ny * 20,
      rotateZ: nx * 1.8,
      duration: 0.55,
      ease: "power3.out",
      overwrite: "auto",
    });

    const icon =
      card.querySelector<HTMLElement>("[data-service-icon]");

    if (icon) {
      gsap.to(icon, {
        x: nx * 22,
        y: ny * 18,
        rotateZ: nx * 5,
        duration: 0.6,
        ease: "power3.out",
        overwrite: "auto",
      });
    }
  };

  const handleMouseLeave = (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    const card = event.currentTarget;

    gsap.to(card, {
      x: 0,
      y: 0,
      rotateZ: 0,
      duration: 0.85,
      ease: "elastic.out(1, 0.5)",
      overwrite: "auto",
    });

    const icon =
      card.querySelector<HTMLElement>("[data-service-icon]");

    if (icon) {
      gsap.to(icon, {
        x: 0,
        y: 0,
        rotateZ: 0,
        duration: 0.9,
        ease: "elastic.out(1, 0.48)",
        overwrite: "auto",
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className={styles.servicesSection}
      aria-labelledby="services-heading"
    >
      <div className={styles.inner}>
        <h2
          ref={headingRef}
          id="services-heading"
          className={styles.mainHeading}
        >
          Services
        </h2>

        <div
          ref={cardsWrapRef}
          className={styles.cardsWrap}
        >
          {services.map((service) => (
            <div
              key={service.title}
              data-service-shell
              className={`${styles.cardShell} ${service.shellClass}`}
            >
              <Link
                href={service.href}
                className={`${styles.serviceCard} ${service.cardClass}`}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>
                    {service.title}
                  </h3>

                  <div className={styles.cardDivider} />

                  <p className={styles.cardCaption}>
                    {service.description}
                  </p>
                </div>

                <div
                  className={styles.cardIcon}
                  data-service-icon
                  aria-hidden="true"
                >
                  <img
                    src={service.icon}
                    alt=""
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}