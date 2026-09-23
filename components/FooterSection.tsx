"use client";

import {
  FormEvent,
  useLayoutEffect,
  useRef,
} from "react";

import Link from "next/link";
import gsap from "gsap";

import styles from "./FooterSection.module.css";

/* =========================================================
   MENU
========================================================= */

const menuItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Services",
    href: "/services",
  },
  {
    label: "Projects",
    href: "/projects",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

/* =========================================================
   SOCIALS
========================================================= */

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    icon: "/images/footer/linkedin.svg",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    icon: "/images/footer/instagram.svg",
  },
  {
    label: "Meta",
    href: "https://www.facebook.com/",
    icon: "/images/footer/meta.svg",
  },
];

/* =========================================================
   HELPERS
========================================================= */

const clamp = (
  value: number,
  min = 0,
  max = 1
) => {
  return Math.min(
    max,
    Math.max(min, value)
  );
};

const mapProgress = (
  progress: number,
  start: number,
  end: number
) => {
  if (start === end) {
    return 0;
  }

  return clamp(
    (progress - start) /
      (end - start)
  );
};

const easeOutCubic = (
  value: number
) => {
  return (
    1 -
    Math.pow(
      1 - value,
      3
    )
  );
};

const easeInOutCubic = (
  value: number
) => {
  return value < 0.5
    ? 4 *
        value *
        value *
        value
    : 1 -
        Math.pow(
          -2 * value + 2,
          3
        ) /
          2;
};

/* =========================================================
   COMPONENT
========================================================= */

export default function FooterSection() {
  const sectionRef =
    useRef<HTMLElement>(null);

  const leftRef =
    useRef<HTMLSpanElement>(null);

  const rightRef =
    useRef<HTMLSpanElement>(null);

  const meetingLogoRef =
    useRef<HTMLAnchorElement>(null);

  const footerCardRef =
    useRef<HTMLDivElement>(null);

  const swirlPathRef =
    useRef<SVGPathElement>(null);

  useLayoutEffect(() => {
    const section =
      sectionRef.current;

    const left =
      leftRef.current;

    const right =
      rightRef.current;

    const meetingLogo =
      meetingLogoRef.current;

    const footerCard =
      footerCardRef.current;

    const swirlPath =
      swirlPathRef.current;

    if (
      !section ||
      !left ||
      !right ||
      !meetingLogo ||
      !footerCard ||
      !swirlPath
    ) {
      return;
    }

    const revealItems =
      Array.from(
        footerCard.querySelectorAll<HTMLElement>(
          "[data-footer-reveal]"
        )
      );

    let rafId = 0;

    let smoothProgress = 0;

    /* =====================================================
       INITIAL HEADING
       Start pe bilkul normal/readable
    ===================================================== */

    gsap.set(left, {
      x: 0,
      opacity: 1,
    });

    gsap.set(right, {
      x: 0,
      opacity: 1,
    });

    /* =====================================================
       MEETING LOGO
    ===================================================== */

    gsap.set(
      meetingLogo,
      {
        scale: 0,

        opacity: 0,

        rotation: -7,

        filter:
          "blur(7px)",
      }
    );

    /* =====================================================
       SWIRL DRAW SETUP
    ===================================================== */

    const swirlLength =
      swirlPath.getTotalLength();

    gsap.set(
      swirlPath,
      {
        strokeDasharray:
          swirlLength,

        strokeDashoffset:
          swirlLength,
      }
    );

    /* =====================================================
       WHITE CARD
       Background pehle khulega
    ===================================================== */

    gsap.set(
      footerCard,
      {
        scaleX: 0.02,

        scaleY: 0.97,

        opacity: 0,

        y: 70,

        transformOrigin:
          "center center",
      }
    );

    /* =====================================================
       FOOTER CONTENT
       Background ke baad reveal
    ===================================================== */

    gsap.set(
      revealItems,
      {
        y: 26,

        opacity: 0,

        filter:
          "blur(5px)",
      }
    );

    /* =====================================================
       SCROLL LOOP
    ===================================================== */

    const render = () => {
      const rect =
        section.getBoundingClientRect();

      const viewportHeight =
        window.innerHeight;

      const scrollDistance =
        Math.max(
          section.offsetHeight -
            viewportHeight,
          1
        );

      const rawProgress =
        clamp(
          -rect.top /
            scrollDistance
        );

      /* =====================================
         SMOOTH / LERP
      ===================================== */

      smoothProgress +=
        (
          rawProgress -
          smoothProgress
        ) * 0.055;

      const progress =
        smoothProgress;

      /* =====================================
         1. HEADING SPLITS
      ===================================== */

      const headingProgress =
        easeInOutCubic(
          mapProgress(
            progress,
            0.02,
            0.30
          )
        );

      /*
        Start:
        x = 0

        Final:
        left moves left
        right moves right
      */

      const splitDistance =
        118;

      gsap.set(
        left,
        {
          x:
            -splitDistance *
            headingProgress,
        }
      );

      gsap.set(
        right,
        {
          x:
            splitDistance *
            headingProgress,
        }
      );

      /* =====================================
         2. MEETING LOGO POP
      ===================================== */

      const logoLocal =
        mapProgress(
          progress,
          0.09,
          0.34
        );

      const logoProgress =
        easeOutCubic(
          logoLocal
        );

      /*
        Slight overshoot
      */

      let logoScale =
        logoProgress;

      if (
        logoLocal >
          0.72 &&
        logoLocal < 1
      ) {
        const overshoot =
          (
            logoLocal -
            0.72
          ) /
          0.28;

        logoScale =
          1 +
          Math.sin(
            overshoot *
              Math.PI
          ) *
            0.045;
      }

      gsap.set(
        meetingLogo,
        {
          scale:
            logoScale,

          opacity:
            logoProgress,

          rotation:
            -7 *
            (
              1 -
              logoProgress
            ),

          filter:
            `blur(${
              7 *
              (
                1 -
                logoProgress
              )
            }px)`,
        }
      );

      /* =====================================
         3. SWIRL LINE DRAW
      ===================================== */

      const swirlProgress =
        easeOutCubic(
          mapProgress(
            progress,
            0.18,
            0.42
          )
        );

      gsap.set(
        swirlPath,
        {
          strokeDashoffset:
            swirlLength *
            (
              1 -
              swirlProgress
            ),
        }
      );

      /* =====================================
         4. WHITE CARD OPENS
      ===================================== */

      const cardProgress =
        easeInOutCubic(
          mapProgress(
            progress,
            0.33,
            0.60
          )
        );

      gsap.set(
        footerCard,
        {
          scaleX:
            0.02 +
            cardProgress *
              0.98,

          scaleY:
            0.97 +
            cardProgress *
              0.03,

          y:
            70 *
            (
              1 -
              cardProgress
            ),

          opacity:
            mapProgress(
              progress,
              0.33,
              0.41
            ),
        }
      );

      /* =====================================
         5. CONTENT REVEAL
         Background complete hone ke baad
      ===================================== */

      revealItems.forEach(
        (
          item,
          index
        ) => {
          const start =
            0.61 +
            index *
              0.025;

          const end =
            start +
            0.13;

          const local =
            easeOutCubic(
              mapProgress(
                progress,
                start,
                end
              )
            );

          gsap.set(
            item,
            {
              y:
                26 *
                (
                  1 -
                  local
                ),

              opacity:
                local,

              filter:
                `blur(${
                  5 *
                  (
                    1 -
                    local
                  )
                }px)`,
            }
          );
        }
      );

      /* =====================================
         6. LOGO SMALL FLOAT
      ===================================== */

      const floatProgress =
        easeOutCubic(
          mapProgress(
            progress,
            0.78,
            1
          )
        );

      gsap.set(
        meetingLogo,
        {
          y:
            -7 *
            floatProgress,
        }
      );

      rafId =
        requestAnimationFrame(
          render
        );
    };

    rafId =
      requestAnimationFrame(
        render
      );

    return () => {
      cancelAnimationFrame(
        rafId
      );
    };
  }, []);

  /* =========================================================
     NEWSLETTER
  ========================================================= */

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    /*
      Newsletter integration yahan add kar sakte ho.
    */
  };

  return (
    <footer
      ref={sectionRef}
      className={
        styles.footerSection
      }
    >
      <div
        className={
          styles.stickyStage
        }
      >
        {/* =================================================
            CTA AREA
        ================================================= */}

        <div
          className={
            styles.ctaArea
          }
        >
          <div
            className={
              styles.ctaHeading
            }
          >
            {/* LEFT */}

            <span
              ref={leftRef}
              className={
                styles.ctaMain
              }
            >
              call us
            </span>

            {/* CENTER LOGO */}

            <a
              ref={
                meetingLogoRef
              }
              href="/contact"
              className={
                styles.meetingLogo
              }
              aria-label="Book a meeting"
            >
              <img
                src="/images/footer/meeting-logo.svg"
                alt="Book a Meeting"
                draggable={false}
              />
            </a>

            {/* RIGHT */}

            <span
              ref={rightRef}
              className={
                styles.ctaItalicWrap
              }
            >
              <span
                className={
                  styles.ctaItalic
                }
              >
                if you need
              </span>

              {/* SWIRL */}

              <svg
                className={
                  styles.swirlSvg
                }
                viewBox="0 0 375 17"
                fill="none"
                aria-hidden="true"
              >
                <path
                  ref={
                    swirlPathRef
                  }
                  d="M0.649915 16.9998C31.5624 16.164 62.3362 11.0745 93.0474 7.42132C111.139 5.26442 129.263 3.38776 147.431 2.22173C149.731 2.0716 152.031 1.93481 154.331 1.81136C156.322 1.70127 159.508 1.95149 160.945 1.31092C158.971 2.21672 156.68 2.59205 154.608 3.12252C149.239 4.49373 143.802 5.67977 138.459 7.24615C136.484 7.75526 134.553 8.45347 132.686 9.33301C131.965 9.70334 130.659 10.3639 130.677 11.4649C130.713 13.2314 134.53 13.3565 135.599 13.4666C144.267 14.5176 153.185 13.9671 161.876 13.6418C193.84 12.5208 225.764 10.1387 257.705 8.46723C276.052 7.50138 294.399 6.17522 312.773 7.13607C329.778 8.02185 346.72 10.3089 363.742 10.5991C367.282 10.6592 370.821 10.5991 374.357 10.3839"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>

        {/* =================================================
            WHITE FOOTER CARD
        ================================================= */}

        <div
          ref={
            footerCardRef
          }
          className={
            styles.footerCard
          }
        >
          {/* =============================================
              TOP GRID
          ============================================= */}

          <div
            className={
              styles.footerGrid
            }
          >
            {/* BRAND */}

            <div
              className={
                styles.brandColumn
              }
              data-footer-reveal
            >
              <img
                src="/images/footer/graphic-wolves-logo.svg"
                alt="Graphic Wolves"
                className={
                  styles.footerLogo
                }
                draggable={false}
              />

              <p
                className={
                  styles.brandCaption
                }
              >
                we&apos;re a pack
                of brand, web
                development, and
                e-commerce nerds
                who love building
                sites and stores
                that actually grow
                the business behind
                them
              </p>
            </div>

            {/* MENU */}

            <nav
              className={
                styles.menuColumn
              }
              data-footer-reveal
              aria-label="Footer navigation"
            >
              {menuItems.map(
                (item) => (
                  <Link
                    key={
                      item.label
                    }
                    href={
                      item.href
                    }
                    className={
                      styles.menuLink
                    }
                  >
                    {
                      item.label
                    }
                  </Link>
                )
              )}
            </nav>

            {/* NEWSLETTER */}

            <div
              className={
                styles.newsletterColumn
              }
              data-footer-reveal
            >
              <p
                className={
                  styles.newsletterCaption
                }
              >
                keep in touch —
                every so often we
                drop insights,
                fresh work, and the
                occasional bad pun.
                no spam, promise.
              </p>

              <form
                className={
                  styles.newsletterForm
                }
                onSubmit={
                  handleSubmit
                }
              >
                <input
                  type="email"
                  placeholder="Email Address"
                  aria-label="Email Address"
                  required
                />

                <button
                  type="submit"
                >
                  <span>
                    Join
                  </span>

                  <span
                    className={
                      styles.joinArrow
                    }
                  >
                    →
                  </span>
                </button>
              </form>
            </div>
          </div>

          {/* =============================================
              BOTTOM
          ============================================= */}

          <div
            className={
              styles.bottomArea
            }
            data-footer-reveal
          >
            <div
              className={
                styles.bottomDivider
              }
            />

            <div
              className={
                styles.bottomRow
              }
            >
              <div
                className={
                  styles.bottomLeft
                }
              >
                {/* SOCIAL ICONS */}

                <div
                  className={
                    styles.socials
                  }
                >
                  {socials.map(
                    (
                      social
                    ) => (
                      <a
                        key={
                          social.label
                        }
                        href={
                          social.href
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className={
                          styles.socialLink
                        }
                        aria-label={
                          social.label
                        }
                      >
                        <img
                          src={
                            social.icon
                          }
                          alt=""
                          draggable={false}
                        />
                      </a>
                    )
                  )}
                </div>

                {/* COPYRIGHT */}

                <p
                  className={
                    styles.copyright
                  }
                >
                  Graphicwolves™
                  2026, All Rights
                  Reserved
                </p>
              </div>

              {/* DESIGNED BY */}

              <p
                className={
                  styles.designedBy
                }
              >
                Designed by
                ActiveSolution for
                BYQ.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}