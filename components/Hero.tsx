"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Header from "./Header";
import styles from "./Hero.module.css";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const loaderLogoRef = useRef<HTMLImageElement>(null);
  const leftEyeRef = useRef<HTMLSpanElement>(null);
  const rightEyeRef = useRef<HTMLSpanElement>(null);
  const circleRef = useRef<SVGPathElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>(`.${styles.wordInner}`);
      const eyeGroup = document.querySelector(`.${styles.eyes}`);
      const header = document.querySelector(`.${styles.hero} header`);
      const video = document.querySelector(`.${styles.video}`);

      gsap.set(words, {
        yPercent: 118,
        rotate: 1.25,
        opacity: 0,
        filter: "blur(8px)",
      });

      if (eyeGroup) {
        gsap.set(eyeGroup, {
          yPercent: 90,
          scale: 0.92,
          opacity: 0,
          filter: "blur(5px)",
        });
      }

      if (header) {
        gsap.set(header, { y: -14, opacity: 0 });
      }

      if (video) {
        gsap.set(video, { scale: 1.04 });
      }

      gsap.set(`.${styles.services}`, { y: 12, opacity: 0 });

      if (circleRef.current) {
        const length = circleRef.current.getTotalLength();
        gsap.set(circleRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
      }

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      if (loaderRef.current && loaderLogoRef.current) {
        gsap.set(loaderRef.current, { yPercent: 0 });
        gsap.set(loaderLogoRef.current, { opacity: 0, scale: 0.92, y: 8 });

        tl.to(loaderLogoRef.current, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        })
          .to(loaderLogoRef.current, {
            scale: 1.035,
            duration: 0.8,
            ease: "sine.inOut",
          })
          .to(loaderLogoRef.current, {
            opacity: 0,
            y: -8,
            duration: 0.3,
            ease: "power2.in",
          })
          .to(loaderRef.current, {
            yPercent: -112,
            duration: 1.05,
            ease: "power4.inOut",
          });
      }

      if (header) {
        tl.to(
          header,
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.48"
        );
      }

      if (video) {
        tl.to(
          video,
          {
            scale: 1,
            duration: 1.8,
            ease: "power3.out",
          },
          "-=0.8"
        );
      }

      tl.to(
        words,
        {
          yPercent: 0,
          rotate: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.18,
          stagger: 0.11,
          ease: "power4.out",
        },
        "-=1.15"
      );

      if (eyeGroup) {
        tl.to(
          eyeGroup,
          {
            yPercent: 0,
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.95,
            ease: "power4.out",
          },
          "-=0.82"
        );
      }

      if (circleRef.current) {
        tl.to(
          circleRef.current,
          {
            strokeDashoffset: 0,
            duration: 1.45,
            ease: "power2.inOut",
          },
          "-=0.34"
        );
      }

      tl.to(
        `.${styles.services}`,
        { y: 0, opacity: 1, duration: 0.72, ease: "power3.out" },
        "-=0.92"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const updateEye = (eye: HTMLSpanElement | null, mouseX: number, mouseY: number) => {
      if (!eye) return;

      const pupil = eye.querySelector<HTMLElement>(`.${styles.pupil}`);
      if (!pupil) return;

      const rect = eye.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = mouseX - centerX;
      const dy = mouseY - centerY;
      const angle = Math.atan2(dy, dx);
      const strength = Math.min(Math.hypot(dx, dy) / 240, 1);

      const x = Math.cos(angle) * rect.width * 0.11 * strength;
      const y = Math.sin(angle) * rect.height * 0.13 * strength;

      gsap.to(pupil, {
        x,
        y,
        duration: 0.26,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    const onMouseMove = (event: MouseEvent) => {
      updateEye(leftEyeRef.current, event.clientX, event.clientY);
      updateEye(rightEyeRef.current, event.clientX, event.clientY);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <section ref={sectionRef} className={styles.hero} aria-labelledby="home-hero-heading">
      <div ref={loaderRef} className={styles.loader} aria-hidden="true">
        <div className={styles.loaderInner}>
          <img
            ref={loaderLogoRef}
            src="/images/graphic-logo.svg"
            alt=""
            className={styles.loaderLogo}
          />
        </div>
      </div>

      <video
        className={styles.video}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="Graphic Wolves creative studio background showreel"
      >
        <source src="/bg-video/bg-video.mp4" type="video/mp4" />
      </video>

      <div className={styles.videoTint} aria-hidden="true" />
      <Header />

      <div className={styles.heroContent}>
        <h1 id="home-hero-heading" className={styles.heading}>
          <span className={styles.line}>
            <span className={styles.wordMask}><span className={styles.wordInner}>One</span></span>
            <span className={`${styles.wordMask} ${styles.team}`}><span className={styles.wordInner}>team</span></span>

            <span className={styles.eyesMask} aria-label="eyes">
              <span className={styles.eyes} aria-hidden="true">
                <span ref={leftEyeRef} className={styles.eye}><span className={styles.pupil} /></span>
                <span ref={rightEyeRef} className={styles.eye}><span className={styles.pupil} /></span>
              </span>
            </span>

            <span className={styles.wordMask}><span className={styles.wordInner}>for</span></span>
            <span className={styles.wordMask}><span className={styles.wordInner}>the</span></span>
            <span className={styles.wordMask}><span className={styles.wordInner}>Brand</span></span>
          </span>

          <span className={styles.line}>
            <span className={styles.wordMask}><span className={styles.wordInner}>the</span></span>

            <span className={styles.circleWrap}>
              <span className={styles.wordMask}><span className={styles.wordInner}>Build &amp; Bizz.</span></span>
              <svg className={styles.circleSvg} viewBox="0 0 608 100" preserveAspectRatio="none" aria-hidden="true">
                <path
                  ref={circleRef}
                  className={styles.circleStroke}
                  d="M322.902 98.9997C232.515 99.0422 140.637 94.7899 58.0275 80.853C31.532 76.3775 2.92086 69.1167 1.08733 58.1139C-0.222339 50.1514 13.3981 42.965 28.5701 37.4583C61.2714 25.5944 103.362 18.1423 146.239 12.7206C228.606 2.3131 316.878 -1.23755 403.155 2.36627C456.307 4.58809 509.519 9.62707 555.338 20.109C581.41 26.0728 606.777 35.279 606.999 46.8453C607.12 53.7659 597.831 60.3569 584.835 65.1939C571.839 70.0309 555.398 73.3158 538.675 76.0266C463.097 88.252 379.057 89.8891 297.011 91.3668"
                />
              </svg>
            </span>
          </span>
        </h1>
      </div>

      <div className={styles.services} aria-label="Services">
        <span>Branding</span><span className={styles.plus}>+</span>
        <span>Development</span><span className={styles.plus}>+</span>
        <span>E-Commerce</span>
      </div>
    </section>
  );
}
