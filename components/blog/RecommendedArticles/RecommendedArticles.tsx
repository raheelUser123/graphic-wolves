import Link from 'next/link';
import BlogCard from '@/components/blog/BlogCard/BlogCard';
import type { WordPressPost } from '@/lib/wordpress/types';
import styles from './RecommendedArticles.module.css';

interface RecommendedArticlesProps {
  posts: WordPressPost[];
}

export default function RecommendedArticles({ posts }: RecommendedArticlesProps) {
  if (posts.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.heading}>Recommended Articles</h2>
        <p className={styles.subheading}>Stay Informed with the Latest Guides and News.</p>
        <Link href="/blog" className={styles.viewAllBtn}>
          View All Blogs
        </Link>
      </div>

      <div className={styles.grid}>
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
