import styles from "./AboutStorySection.module.css";

export default function AboutStorySection() {
  return (
    <section className={styles.storySection} aria-label="About Graphic Wolves">
      <div className={styles.cards}>
        <article className={`${styles.card} ${styles.historyCard}`}>
          <div>
            <p className={styles.subhead}>ESTD 2019</p>
            <h2 className={styles.heading}>Graphic Wolves was founded with a simple belief.</h2>
          </div>
          <p className={styles.caption}>
            As digital systems grew more interconnected and data-driven, organizations needed more
            than individual solutions. They needed platforms and operating models that could evolve
            over time.
          </p>
        </article>

        <article className={`${styles.card} ${styles.missionCard}`}>
          <div>
            <p className={styles.subhead}>Our Mission</p>
            <h2 className={styles.heading}>We’re here to help leaders build systems that last.</h2>
          </div>
          <p className={styles.caption}>
            For over 8 years, we have partnered with enterprises, SMBs, and product-led businesses
            to solve complex challenges through software engineering.
          </p>
        </article>
      </div>
    </section>
  );
}