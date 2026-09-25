"use client";

import styles from "./DevelopersLoveSection.module.css";

export default function DevelopersLoveSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        {/* ================================
            LEFT - WEBSITE PREVIEW
        ================================= */}

        <div className={styles.previewArea}>
          {/* Decorative background */}
          <div
            className={styles.previewBackground}
            aria-hidden="true"
          />

          {/* Image viewport */}
          <div className={styles.imageViewport}>
            <img
              src="/images/services/web-development/developers/website-preview.webp"
              alt="Website preview"
              className={styles.websiteImage}
            />
          </div>
        </div>


        {/* ================================
            RIGHT - CONTENT
        ================================= */}

        <div className={styles.content}>

          <h2 className={styles.heading}>
            Your Developers will love it.
          </h2>

          <p className={styles.caption}>
            Prospect is built to anticipate developer workflows,
            from environment setup to deployment automation. We
            learn how you work, then remove the friction before it
            starts.
          </p>


          {/* ================================
              FEATURES
          ================================= */}

          <div className={styles.features}>

            {/* Feature 01 */}
            <div className={styles.feature}>

              <div className={styles.icon}>
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <rect
                    x="3"
                    y="3"
                    width="7"
                    height="7"
                    rx="1.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />

                  <rect
                    x="18"
                    y="18"
                    width="7"
                    height="7"
                    rx="1.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />

                  <rect
                    x="18"
                    y="3"
                    width="7"
                    height="7"
                    rx="1.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />

                  <path
                    d="M10 6.5H14C16.2 6.5 18 8.3 18 10.5V14"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />

                  <path
                    d="M21.5 10V14C21.5 16.2 19.7 18 17.5 18H10"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />

                  <path
                    d="M7 10V13"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />

                  <path
                    d="M4.5 13H9.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <h3 className={styles.featureHeading}>
                Dev-Centric Tooling
              </h3>

              <p className={styles.featureCaption}>
                A suite of APIs, CLIs, and SDKs that feel native—
                because they are. Fast to integrate, easy to scale,
                and built to get out of your way.
              </p>

            </div>


            {/* Feature 02 */}
            <div className={styles.feature}>

              <div className={styles.icon}>
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M7 12.5C7 8.36 10.36 5 14.5 5C18.64 5 22 8.36 22 12.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />

                  <path
                    d="M9.5 13V11.5C9.5 8.74 11.74 6.5 14.5 6.5C17.26 6.5 19.5 8.74 19.5 11.5V13"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />

                  <path
                    d="M5.5 13V11.5C5.5 6.53 9.53 2.5 14.5 2.5C19.47 2.5 23.5 6.53 23.5 11.5V13"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />

                  <path
                    d="M5.5 13V17C5.5 18.1 6.4 19 7.5 19H9V13H5.5Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />

                  <path
                    d="M23.5 13V17C23.5 18.1 22.6 19 21.5 19H20V13H23.5Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />

                  <path
                    d="M14 22.5H18"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />

                  <path
                    d="M12 20.5C12 21.6 12.9 22.5 14 22.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <h3 className={styles.featureHeading}>
                Intelligent Debugging
              </h3>

              <p className={styles.featureCaption}>
                Prospect surfaces issues before they hit production
                and flags anomalies without noise. Fewer alerts.
                More signal. Smarter builds.
              </p>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}