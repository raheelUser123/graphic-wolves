"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./OurWorkHero.module.css";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { image: "/images/featured/top-left-vertical/1.webp", alt: "Brand website project" },
  { image: "/images/featured/top-left-horizontal/1.webp", alt: "Digital product project" },
  { image: "/images/featured/top-right/1.webp", alt: "E-commerce project" },
  { image: "/images/featured/middle-top/1.webp", alt: "Web development project" },
  { image: "/images/featured/middle-bottom/1.webp", alt: "Website design project" },
  { image: "/images/featured/bottom-left/1.webp", alt: "Brand identity project" },
  { image: "/images/featured/bottom-right-top/1.webp", alt: "Online store project" },
  { image: "/images/featured/bottom-right-bottom/1.webp", alt: "Mobile experience project" },
];

const rotations = [-3, 2.5, -2, 3, -2.5, 1.5, -2, 2.5];

export default function OurWorkHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;

    const cards = gsap.utils.toArray<HTMLElement>("[data-work-card]", section);
    const textElements = [
      section.querySelector<HTMLElement>("[data-work-breadcrumb]"),
      section.querySelector<HTMLElement>("[data-work-heading]"),
      section.querySelector<HTMLElement>("[data-work-caption]"),
    ].filter((element): element is HTMLElement => element !== null);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const context = gsap.context(() => {
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
          0,
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
            startAt + index * 0.12,
          );
        });
      };

      revealInSteps(section.querySelector<HTMLElement>("[data-work-breadcrumb]"), 0.3);
      revealInSteps(section.querySelector<HTMLElement>("[data-work-heading]"), 0.38);
      revealInSteps(section.querySelector<HTMLElement>("[data-work-caption]"), 0.46);

      ScrollTrigger.refresh();
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="our-work-heading">
      <div className={styles.frame}>
        <video className={styles.backgroundVideo} autoPlay muted loop playsInline preload="metadata" aria-hidden="true">
          <source src="/bg-video/bg-video.mp4" type="video/mp4" />
        </video>
        <div className={styles.videoTint} aria-hidden="true" />

        <div ref={stageRef} className={styles.imageStage} aria-hidden="true">
          {projects.map((project, index) => (
            <div
              key={project.image}
              data-work-card
              className={`${styles.projectCard} ${styles[`card${index + 1}`]}`}
            >
              <img src={project.image} alt={project.alt} draggable={false} />
            </div>
          ))}
        </div>

        <div className={styles.content}>
          <nav data-work-breadcrumb className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/" className={styles.breadcrumbMuted}>Home</Link>
            <span className={styles.breadcrumbDivider} aria-hidden="true" />
            <span className={styles.breadcrumbActive} aria-current="page">Our Work</span>
          </nav>

          <h1 id="our-work-heading" data-work-heading className={styles.heading}>
            Selected works that
            <br />
            deliver <span className={styles.highlight}>results</span>
          </h1>

          <p data-work-caption className={styles.caption}>
            Our clients face crucial problems that need solving.
            <br className={styles.desktopBreak} />
            They want to make a difference and so do we.
          </p>
        </div>
      </div>
    </section>
  );
}