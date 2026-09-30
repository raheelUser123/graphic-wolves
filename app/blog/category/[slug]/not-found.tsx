import Link from 'next/link';
import Header from '@/components/layout/Header/Header';
import styles from './catNotFound.module.css';

export default function CategoryNotFound() {
  return (
    <main className={styles.main}>
      <Header />
      <div className={styles.content}>
        <p className={styles.label}>404</p>
        <h1 className={styles.heading}>Category Not Found</h1>
        <p className={styles.text}>
          This category doesn&apos;t exist or has no articles yet.
        </p>
        <Link href="/blog" className={styles.btn}>
          ← Back to Blog
        </Link>
      </div>
    </main>
  );
}
