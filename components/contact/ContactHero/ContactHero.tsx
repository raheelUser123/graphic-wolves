import Link from "next/link";
import styles from "./ContactHero.module.css";

export default function ContactHero() {
  return (
    <section className={styles.section} aria-labelledby="contact-heading">
      <div className={styles.content}>
        <div className={styles.breadcrumb}>
          <Link href="/services" className={styles.breadcrumbMuted}>
            Our Services
          </Link>
          <span className={styles.breadcrumbDivider} aria-hidden="true" />
          <span className={styles.breadcrumbActive}>Contact Us</span>
        </div>

        <h1 id="contact-heading" className={styles.heading}>
          We design clarity we
          <br />
          build <span className={styles.growth}>growth.</span>
        </h1>

        <p className={styles.caption}>
          GraphicWolves is a creative agency focused on strategy, design, and digital
          <br className={styles.desktopBreak} />
          experiences that help brands grow with intention.
        </p>
      </div>
    </section>
  );
}
