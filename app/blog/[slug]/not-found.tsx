import Link from 'next/link';
import Header from '@/components/layout/Header/Header';
import styles from './notFound.module.css';

export default function PostNotFound() {
  return (
    <main className={styles.main}>
      <Header />
      <div className={styles.content}>
        <p className={styles.label}>404</p>
        <h1 className={styles.heading}>Post Not Found</h1>
        <p className={styles.text}>
          The article you&apos;re looking for doesn&apos;t exist or may have been removed.
        </p>
        <Link href="/blog" className={styles.btn}>
          ← Back to Blog
        </Link>
      </div>
    </main>
  );
}
