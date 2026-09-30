import styles from './loading.module.css';

export default function BlogLoading() {
  return (
    <div className={styles.loading} aria-label="Loading blog posts">
      <div className={styles.hero}>
        <div className={`${styles.skeleton} ${styles.skeletonBreadcrumb}`} />
        <div className={`${styles.skeleton} ${styles.skeletonHeading}`} />
      </div>
      <div className={styles.grid}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className={`${styles.skeleton} ${styles.skeletonCard}`} />
        ))}
      </div>
    </div>
  );
}
