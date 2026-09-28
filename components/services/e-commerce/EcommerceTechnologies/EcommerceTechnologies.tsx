"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./EcommerceTechnologies.module.css";

gsap.registerPlugin(ScrollTrigger);

const technologies = [
  {
    id: "woocommerce",
    title: "WooCommerce Stores Built to Sell.",
    caption:
      "We build fast, flexible WooCommerce stores with seamless shopping experiences, smart product management, and a checkout designed to turn visitors into customers.",
    details:
      "From store setup and custom design to payments, shipping, and integrations, we shape WooCommerce around the way your business sells.",
    image: "/images/services/ecommerce/technologies/woo.svg",
    alt: "WooCommerce store illustration",
  },
  {
    id: "shopify",
    title: "A Shopify Store That Sells While You Sleep.",
    caption:
      "From custom storefronts to smooth shopping journeys, we build Shopify experiences that look great, perform fast, and make buying effortless.",
    details:
      "We build custom themes, connect the right apps, and optimize every step from product discovery through checkout.",
    image: "/images/services/ecommerce/technologies/shopify.svg",
    alt: "Shopify storefront illustration",
  },
];

export default function EcommerceTechnologies() {
  const sectionRef = useRef<HTMLElement>(null);
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const heading = section.querySelector<HTMLElement>("[data-tech-heading]");
      const caption = section.querySelector<HTMLElement>("[data-tech-caption]");
      const cards = gsap.utils.toArray<HTMLElement>("[data-tech-card]", section);

      gsap.set(heading, { y: 32, opacity: 0, filter: "blur(4px)" });
      gsap.set(caption, { y: 16, opacity: 0 });
      gsap.set(cards, { y: 46, opacity: 0 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 76%",
          toggleActions: "play none none reverse",
        },
      });

      timeline.to(heading, {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "power3.out",
      });
      timeline.to(
        caption,
        { y: 0, opacity: 1, duration: 0.65, ease: "power3.out" },
        "-=0.48"
      );
      timeline.to(
        cards,
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.16,
          ease: "power3.out",
        },
        "-=0.22"
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="ecommerce-technologies-heading"
    >
      <div className={styles.inner}>
        <h2
          id="ecommerce-technologies-heading"
          data-tech-heading
          className={styles.heading}
        >
          <span className={styles.headingBold}>Tools&amp;</span>
          <span className={styles.headingItalic}>Technologies</span>
        </h2>

        <p data-tech-caption className={styles.caption}>
          The platforms and technology behind better shopping experiences.
        </p>

        <div className={styles.grid}>
          {technologies.map((technology) => (
            <article key={technology.id} data-tech-card className={styles.card}>
              <div className={styles.imageFrame}>
                <img src={technology.image} alt={technology.alt} />
              </div>
              <div className={styles.cardContent}>
                <h3>{technology.title}</h3>
                <p>{technology.caption}</p>
                <button
                  type="button"
                  className={styles.readMore}
                  aria-expanded={Boolean(expandedCards[technology.id])}
                  aria-controls={`${technology.id}-details`}
                  onClick={() =>
                    setExpandedCards((current) => ({
                      ...current,
                      [technology.id]: !current[technology.id],
                    }))
                  }
                >
                  {expandedCards[technology.id] ? "Read less" : "Read more..."}
                  <span aria-hidden="true">{expandedCards[technology.id] ? "−" : "+"}</span>
                </button>
                <div
                  id={`${technology.id}-details`}
                  className={`${styles.moreDetails} ${expandedCards[technology.id] ? styles.expanded : ""}`}
                  aria-hidden={!expandedCards[technology.id]}
                >
                  <p>{technology.details}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}