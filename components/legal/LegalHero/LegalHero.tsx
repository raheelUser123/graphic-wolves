import Link from "next/link";
import styles from "./LegalHero.module.css";

interface LegalHeroProps {
  title: string;
  lastUpdated: string;
}

export default function LegalHero({ title, lastUpdated }: LegalHeroProps) {
  const headingId = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return (
    <section className={styles.section} aria-labelledby={headingId}>
      <div className={styles.content}>
        <div className={styles.breadcrumb}>
          <Link href="/" className={styles.breadcrumbMuted}>
            Home
          </Link>
          <span className={styles.breadcrumbDivider} aria-hidden="true" />
          <span className={styles.breadcrumbActive}>{title}</span>
        </div>

        <h1 id={headingId} className={styles.heading}>
          {title}
        </h1>

        <p className={styles.caption}>Last Updated: {lastUpdated}</p>
      </div>
    </section>
  );
}