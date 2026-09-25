"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./ProjectsIntroSection.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsIntroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const videoWrap = videoWrapRef.current;
    const heading = headingRef.current;
    const bottom = bottomRef.current;

    if (!section || !videoWrap || !heading || !bottom) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        videoWrap,
        {
          y: 70,
          opacity: 0,
          scale: 0.96,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,

          duration: 1.15,
          ease: "power4.out",

          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        heading,
        {
          y: 45,
          opacity: 0,
          filter: "blur(5px)",
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",

          duration: 1,
          ease: "power3.out",

          scrollTrigger: {
            trigger: section,
            start: "top 72%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        bottom,
        {
          y: 45,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,

          duration: 1,
          delay: 0.08,
          ease: "power3.out",

          scrollTrigger: {
            trigger: section,
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
        }
      );

      /* subtle video parallax */

      gsap.to(videoWrap, {
        y: -24,

        ease: "none",

        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="projects-intro-heading"
    >
      <div className={styles.inner}>
        {/* =====================================
            LEFT VIDEO
        ===================================== */}

        <div
          ref={videoWrapRef}
          className={styles.videoWrap}
        >
          <video
            className={styles.video}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source
              src="/videos/projects/project-showreel.mp4"
              type="video/mp4"
            />
          </video>
        </div>

        {/* =====================================
            RIGHT CONTENT
        ===================================== */}

        <div className={styles.content}>
          <h2
            ref={headingRef}
            id="projects-intro-heading"
            className={styles.heading}
          >
            A decade of projects where
        
            design and strategy meet
          
            purpose.
          </h2>

          <div
            ref={bottomRef}
            className={styles.bottomContent}
          >
            <p className={styles.caption}>
              Guided by our impact sectors we bring specialised
              insights to each partnership allowing us to scale
              initiatives, tackle complex problems, and inspire
              communities.
            </p>

            <Link
              href="/projects"
              className={styles.button}
            >
              <span>Projects</span>

              <span
                className={styles.arrow}
                aria-hidden="true"
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}