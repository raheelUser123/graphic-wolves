import Link from 'next/link';
import styles from './BlogHero.module.css';

interface BlogHeroProps {
  categoryName?: string;
}

export default function BlogHero({ categoryName }: BlogHeroProps) {
  return (
    <section className={styles.hero}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/" className={styles.breadcrumbLink}>Home</Link>
        <span className={styles.breadcrumbSep} aria-hidden="true">|</span>
        {categoryName ? (
          <>
            <Link href="/blog" className={styles.breadcrumbLink}>Blogs</Link>
            <span className={styles.breadcrumbSep} aria-hidden="true">|</span>
            <span className={styles.breadcrumbCurrent}>{categoryName}</span>
          </>
        ) : (
          <span className={styles.breadcrumbCurrent}>Blogs</span>
        )}
      </nav>

      <h1 className={styles.heading}>
        {categoryName
          ? <><span>Articles in </span><span className={styles.accent}>{categoryName}</span></>
          : <>Discover Articles and Tutorials to help you<br />Build Better.</>}
      </h1>
    </section>
  );
}
