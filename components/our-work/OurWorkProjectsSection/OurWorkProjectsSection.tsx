"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./OurWorkProjectsSection.module.css";

const projects = [
  {
    name: "Appcues",
    category: "Website Development",
    image: "/images/featured/top-left-horizontal/1.webp",
    href: "/services/web-development",
  },
  {
    name: "MyAtomos",
    category: "Website Development",
    image: "/images/featured/top-left-vertical/1.webp",
    href: "/services/web-development",
  },
  {
    name: "AlphaChain",
    category: "Branding Design",
    image: "/images/featured/top-right/1.webp",
    href: "/services/branding",
  },
  {
    name: "AlphaChain",
    category: "Branding Design",
    image: "/images/featured/middle-top/1.webp",
    href: "/services/branding",
  },
  {
    name: "AgentBounty",
    category: "Branding Design",
    image: "/images/featured/middle-bottom/1.webp",
    href: "/services/branding",
  },
  {
    name: "Appcues",
    category: "Website Development",
    image: "/images/featured/bottom-left/1.webp",
    href: "/services/web-development",
  },
  {
    name: "Twirl",
    category: "E-Commerce Development",
    image: "/images/featured/bottom-right-top/1.webp",
    href: "/services/e-commerce",
  },
  {
    name: "TheThermoLab",
    category: "E-Commerce Development",
    image: "/images/featured/bottom-right-bottom/1.webp",
    href: "/services/e-commerce",
  },
];

function ProjectRow({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className={styles.rowViewport}>
      <div className={`${styles.track} ${reverse ? styles.trackReverse : ""}`}>
        {[0, 1].map((copy) => (
          <div className={styles.group} key={copy} aria-hidden={copy === 1}>
            {projects.map((project, index) => (
              <a
                className={styles.project}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={copy === 1 ? -1 : undefined}
                key={`${project.name}-${project.image}-${index}`}
              >
                <span className={styles.imageWrap}>
                  <img src={project.image} alt="" loading="lazy" draggable={false} />
                </span>
                <span className={styles.projectTitle}>
                  <span className={styles.projectName}>{project.name}</span>
                  <span className={styles.projectCategory}> | {project.category}</span>
                </span>
              </a>
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