"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { caseStudies } from "@/components/case-studies/data";
import styles from "./OurWorkProjectsSection.module.css";

const projects = caseStudies.map((study) => ({
  name: study.title,
  image:
    study.heroMedia.type === "image"
      ? study.heroMedia.src
      : study.heroMedia.poster,
  href: `/our-work/${study.slug}`,
}));

function ProjectRow({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className={styles.rowViewport}>
      <div className={`${styles.track} ${reverse ? styles.trackReverse : ""}`}>
        {[0, 1].map((copy) => (
          <div className={styles.group} key={copy} aria-hidden={copy === 1}>
            {projects.map((project, index) => (
              <Link
                className={styles.project}
                href={project.href}
                tabIndex={copy === 1 ? -1 : undefined}
                key={`${project.name}-${project.image}-${index}`}
              >
                <span className={styles.imageWrap}>
                  <img src={project.image} alt="" loading="lazy" draggable={false} />
                </span>
                <span className={styles.projectTitle}>
                  <span className={styles.projectName}>{project.name}</span>
                </span>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function OurWorkProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const revealOnScroll = () => {
      if (section.getBoundingClientRect().top <= window.innerHeight * 0.82) {
        setIsVisible(true);
        window.removeEventListener("scroll", revealOnScroll);
        window.removeEventListener("lenis-scroll", revealOnScroll);
        window.removeEventListener("resize", revealOnScroll);
      }
    };

    revealOnScroll();
    window.addEventListener("scroll", revealOnScroll, { passive: true });
    window.addEventListener("lenis-scroll", revealOnScroll);
    window.addEventListener("resize", revealOnScroll);

    return () => {
      window.removeEventListener("scroll", revealOnScroll);
      window.removeEventListener("lenis-scroll", revealOnScroll);
      window.removeEventListener("resize", revealOnScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} aria-label="Selected work projects">
      <div className={`${styles.content} ${isVisible ? styles.visible : ""}`}>
        <ProjectRow />
        <ProjectRow reverse />
      </div>
    </section>
  );
}