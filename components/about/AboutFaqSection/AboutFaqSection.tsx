"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./AboutFaqSection.module.css";

const faqs = [
  {
    question: "What is the Design Process?",
    answer:
      "We start by understanding your goals, audience, and current challenges. From there, we shape a clear strategy, explore concepts, and refine the chosen direction through design, development, and testing.",
  },
  {
    question: "How Much Does It Cost to Hire a Design Agency?",
    answer:
      "Costs depend on the scope, complexity, and timeline of your project. We tailor each engagement to your needs and share a clear proposal before work begins.",
  },
  {
    question: "What Services Do Design Agencies Offer?",
    answer:
      "Design agencies typically offer a range of services including branding, logo design, web design, user experience (UX) design, print design, and marketing materials. Some agencies may also provide additional services like social media management and content creation.",
  },
  {
    question: "How to Choose a Design Agency?",
    answer:
      "Look for a team whose work, process, and communication fit your goals. Ask about relevant experience, how they measure results, and what collaboration looks like from kickoff to launch.",
  },
];

export default function AboutFaqSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(2);

  useEffect(() => {
    const section = sectionRef.current;
    const loop = section?.querySelector<SVGPathElement>("svg path");
    if (!section || !loop) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      loop.style.strokeDashoffset = "0";
      return;
    }

    const drawLoopOnScroll = () => {
      const start = window.innerHeight * 0.88;
      const end = window.innerHeight * 0.35;
      const progress = Math.min(
        1,
        Math.max(0, (start - section.getBoundingClientRect().top) / (start - end)),
      );

      loop.style.strokeDashoffset = String(1 - progress);
    };

    drawLoopOnScroll();
    window.addEventListener("scroll", drawLoopOnScroll, { passive: true });
    window.addEventListener("lenis-scroll", drawLoopOnScroll);
    window.addEventListener("resize", drawLoopOnScroll);

    return () => {
      window.removeEventListener("scroll", drawLoopOnScroll);
      window.removeEventListener("lenis-scroll", drawLoopOnScroll);
      window.removeEventListener("resize", drawLoopOnScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.faqSection}
      aria-labelledby="about-faq-heading"
    >
      <span className={styles.purpleMark} aria-hidden="true" />

      <div className={styles.inner}>
        <h2 id="about-faq-heading" className={styles.heading}>
          <span>Frequently</span>
          <span className={styles.askWord}>
            Ask
            <svg className={styles.askLoop} viewBox="0 0 170 92" aria-hidden="true">
              <path pathLength="1" d="M151 45C147 18 120 8 81 12 44 15 14 27 12 47 10 66 39 79 79 78c39-1 68-12 73-33 4-17-20-32-50-35-34-4-71 8-82 26" />
            </svg>
          </span>
          <span>ed Questions</span>
          <span className={styles.thumbMark} aria-hidden="true" />
        </h2>

        <div className={styles.accordion}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const answerId = `about-faq-answer-${index}`;

            return (
              <article className={styles.faqItem} key={faq.question}>
                <h3 className={styles.questionHeading}>
                  <button
                    className={styles.questionButton}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <span>{faq.question}</span>
                    <span className={styles.toggleIcon} aria-hidden="true">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                </h3>
                <div
                  id={answerId}
                  className={`${styles.answer} ${isOpen ? styles.answerOpen : ""}`}
                  aria-hidden={!isOpen}
                >
                  <div className={styles.answerInner}>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}