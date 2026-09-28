import Link from "next/link";
import styles from "./AboutHero.module.css";

export default function AboutHero() {
  return (
    <section className={styles.aboutHero} aria-labelledby="about-heading">
      <div className={styles.content}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/" className={styles.breadcrumbLink}>
            Home
          </Link>
          <span className={styles.breadcrumbDivider} aria-hidden="true" />
          <span aria-current="page">About Us</span>
        </nav>

        <h1 id="about-heading" className={styles.heading}>
          <span className={styles.firstLine}>We design &amp; Develop systems</span>
          <span className={styles.secondLine}>
            for lasting <span className={styles.italic}>business value</span>
          </span>
        </h1>
      </div>
    </section>
  );
}