"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./EcommerceHero.module.css";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    image: "/images/services/ecommerce/hero-images/1.webp",
    alt: "E-commerce project preview",
  },
  {
    image: "/images/services/ecommerce/hero-images/2.webp",
    alt: "E-commerce website project preview",
  },
  {
    image: "/images/services/ecommerce/hero-images/3.webp",
    alt: "Product website project preview",
  },
  {
    image: "/images/services/ecommerce/hero-images/4.webp",
    alt: "Online shopping experience preview",
  },
  {
    image: "/images/services/ecommerce/hero-images/5.webp",
    alt: "E-commerce storefront preview",
  },
  {
    image: "/images/services/ecommerce/hero-images/6.webp",
    alt: "Retail website project preview",
  },
  {
    image: "/images/services/ecommerce/hero-images/7.webp",
    alt: "Retail website project preview",
  },
  {
    image: "/images/services/ecommerce/hero-images/8.webp",
    alt: "Retail website project preview",
  },
];

const rotations = [-3, 2.5, -2, 3, -2.5, 1.5];

export default function EcommerceHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;

    if (!section || !stage) return;

    const cards = gsap.utils.toArray<HTMLElement>("[data-ecommerce-card]", section);
    const breadcrumb = section.querySelector<HTMLElement>("[data-ecommerce-breadcrumb]");
    const heading = section.querySelector<HTMLElement>("[data-ecommerce-heading]");
    const caption = section.querySelector<HTMLElement>("[data-ecommerce-caption]");
    const textElements = [breadcrumb, heading, caption].filter(
      (element): element is HTMLElement => element !== null
    );
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const setCardsToStack = () => {
        const stageBounds = stage.getBoundingClientRect();
        const centerX = stageBounds.width / 2;
        const centerY = stageBounds.height / 2;

        cards.forEach((card, index) => {
          const bounds = card.getBoundingClientRect();
          const offset = index - (cards.length - 1) / 2;

          gsap.set(card, {
            x: centerX - (bounds.left - stageBounds.left + bounds.width / 2) + offset * 2,
            y: centerY - (bounds.top - stageBounds.top + bounds.height / 2) + offset * 2,
            rotation: 0,
            scale: index === 0 ? 1.5 : 1,
            zIndex: cards.length - index,
          });
        });
      };

      if (reducedMotion) {
        gsap.set(cards, { x: 0, y: 0, rotation: (index) => rotations[index], scale: 1 });
        gsap.set(textElements, { opacity: 1, y: 0 });
        return;
      }

      setCardsToStack();
      gsap.set(textElements, { opacity: 0, y: 14 });

      const spread = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      cards.forEach((card, index) => {
        spread.to(
          card,
          {
            x: 0,
            y: 0,
            rotation: rotations[index],
            scale: 1,
            duration: 1,
            ease: "power2.out",
          },
          0
        );
      });

      const revealInSteps = (element: HTMLElement | null, startAt: number) => {
        if (!element) return;

        [0.45, 0.67, 0.89, 1].forEach((opacity, index) => {
          spread.to(
            element,
            {
              opacity,
              ...(index === 3 ? { y: 0 } : {}),
              duration: 0.1,
              ease: "none",
            },
            startAt + index * 0.12
          );
        });
      };

      revealInSteps(breadcrumb, 0.3);
      revealInSteps(heading, 0.38);
      revealInSteps(caption, 0.46);

      ScrollTrigger.refresh();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.frame}>
        <div ref={stageRef} className={styles.imageStage} aria-hidden="true">
          {projects.map((project, index) => (
            <div
              key={project.image}
              data-ecommerce-card
              className={`${styles.projectCard} ${styles[`card${index + 1}`]}`}
            >
              <img src={project.image} alt={project.alt} />
            </div>
          ))}
        </div>

        <div className={styles.content}>
          <div data-ecommerce-breadcrumb className={styles.breadcrumb}>
            <Link href="/services" className={styles.breadcrumbMuted}>
              Our Services
            </Link>
            <span className={styles.breadcrumbDivider} />
            <span className={styles.breadcrumbActive}>E-Commerce Services</span>
          </div>

          <h1 data-ecommerce-heading className={styles.heading}>
            Where Great Design
            <br />
            Meets <span className={styles.highlight}>Better Sales.</span>
          </h1>

          <p data-ecommerce-caption className={styles.caption}>
            Bold design. Smooth shopping. Faster checkouts. We build high-performing
            <br className={styles.desktopBreak} />
            stores that turn inspiration into customers and scale with your business.
          </p>
        </div>
      </div>
    </section>
  );
}