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
                <img
                  src="/images/services/web-development/trustedicons/TreeStructure.svg"
                  alt="Dev-centric tooling"
                  width="28"
                  height="28"
                />
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
                <img
                  src="/images/services/web-development/trustedicons/FingerprintSimple.svg"
                  alt="Intelligent debugging"
                  width="28"
                  height="28"
                />
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