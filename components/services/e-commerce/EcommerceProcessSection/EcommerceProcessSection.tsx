"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./EcommerceProcessSection.module.css";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    title: "Discover",
    description:
      "We understand your brand, products, target customers, and growth goals to define the right Shopify strategy.",
    deliverable: "Requirements document, project roadmap",
    duration: "1-2 weeks",
  },
  {
    title: "Strategize",
    description:
      "We map the customer journey, store structure, and technical plan around your products and business goals.",
    deliverable: "Store architecture, feature plan",
    duration: "1 week",
  },
  {
    title: "Design",
    description:
      "We shape a clear, distinctive shopping experience that makes products easy to discover and buy.",
    deliverable: "Storefront designs, responsive prototypes",
    duration: "2-3 weeks",
  },
  {
    title: "Develop",
    description:
      "We build your storefront, configure commerce features, and connect the tools your team relies on.",
    deliverable: "Custom Shopify storefront, integrations",
    duration: "3-5 weeks",
  },
  {
    title: "Test",
    description:
      "We test the full shopping journey across devices, payment methods, and store operations before launch.",
    deliverable: "Quality assurance, launch checklist",
    duration: "1 week",
  },
  {
    title: "Launch",
    description:
      "We launch your store, monitor its performance, and help your team confidently manage what comes next.",
    deliverable: "Live store, handover and support",
    duration: "Ongoing support",
  },
];

export default function EcommerceProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const rows = gsap.utils.toArray<HTMLElement>("[data-process-step]", section);
    const number = section.querySelector<HTMLElement>("[data-process-number]");
    const visual = section.querySelector<HTMLElement>("[data-process-visual]");
    const layers = gsap.utils.toArray<HTMLElement>("[data-layer]", section);

    if (!rows.length || !number || !visual || !layers.length) return;

    let activeIndex = -1;

    const setActiveStep = (index: number) => {
      if (index === activeIndex) return;
      activeIndex = index;

      rows.forEach((row, rowIndex) => {
        const isActive = rowIndex === index;
        row.dataset.active = String(isActive);
        row.setAttribute("aria-current", isActive ? "step" : "false");
      });

      visual.dataset.activeStep = String(index);
      layers.forEach((layer, layerIndex) => {
        layer.dataset.completed = String(layerIndex <= index);
      });

      gsap.fromTo(
        number,
        { opacity: 0.25, y: 8 },
        {
          opacity: 1,
          y: 0,
          duration: 0.32,
          ease: "power2.out",
          overwrite: true,
          onStart: () => {
            number.textContent = String(index + 1).padStart(2, "0");
          },
        }
      );
    };

    const ctx = gsap.context(() => {
      const imageProgress = { value: 0 };

      layers.forEach((layer, index) => {
        const lightImage = layer.querySelector<HTMLImageElement>("img:first-child");
        const darkImage = layer.querySelector<HTMLImageElement>("img:last-child");

        gsap.set(lightImage, { opacity: index === 0 ? 0 : 1 });
        gsap.set(darkImage, { opacity: index === 0 ? 1 : 0 });
      });

      setActiveStep(0);

      const getStepIndex = (progress: number) =>
        Math.max(0, Math.min(steps.length - 1, Math.floor(progress * steps.length)));

      const imageTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      imageTimeline.to(imageProgress, { value: 1, duration: steps.length, ease: "none" }, 0);

      layers.forEach((layer, index) => {
        if (index === 0) return;

        const lightImage = layer.querySelector<HTMLImageElement>("img:first-child");
        const darkImage = layer.querySelector<HTMLImageElement>("img:last-child");
        const startAt = index;

        imageTimeline.to(lightImage, { opacity: 0, duration: 0.5, ease: "none" }, startAt);
        imageTimeline.to(darkImage, { opacity: 1, duration: 0.5, ease: "none" }, startAt);
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          setActiveStep(getStepIndex(self.progress));
        },
        onRefresh: (self) => {
          setActiveStep(getStepIndex(self.progress));
        },
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="process-heading">
      <div className={styles.stickyStage}>
        <div className={styles.inner}>
          <h2 id="process-heading" className={styles.heading}>
            How we develop user-centric
            <br />
            digital solutions
          </h2>

          <div className={styles.processPanel}>
            <div className={styles.visualColumn}>
              <span data-process-number className={styles.number}>
                01
              </span>
              <div data-process-visual className={styles.visual} aria-hidden="true">
                {steps.map((step, index) => (
                  <span key={step.title} className={styles.layer} data-layer={index}>
                    <img
                      className={styles.layerLight}
                      src="/images/services/ecommerce/process-images/light.svg"
                      alt=""
                    />
                    <img
                      className={styles.layerDark}
                      src="/images/services/ecommerce/process-images/dark.png"
                      alt=""
                    />
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.stepList}>
              {steps.map((step, index) => (
                <article
                  key={step.title}
                  data-process-step
                  data-active="false"
                  className={styles.step}
                  aria-current="false"
                >
                  <div className={styles.stepHeading}>
                    <span className={styles.stepNumber}>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{step.title}</h3>
                  </div>
                  <div className={styles.stepDetails}>
                    <p>{step.description}</p>
                    <span><strong>Deliverables:</strong> {step.deliverable}</span>
                    <span><strong>Duration:</strong> {step.duration}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}