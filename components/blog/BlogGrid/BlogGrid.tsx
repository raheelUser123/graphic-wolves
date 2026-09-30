'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import BlogCard from '@/components/blog/BlogCard/BlogCard';
import type { WordPressPost } from '@/lib/wordpress/types';
import styles from './BlogGrid.module.css';

interface BlogGridProps {
  initialPosts: WordPressPost[];
  totalPages: number;
  categoryId?: number;
}

async function fetchMorePosts(
  page: number,
  categoryId?: number
): Promise<WordPressPost[]> {
  const params = new URLSearchParams({
    page: String(page),
    per_page: '6',
    _embed: '1',
  });
  if (categoryId) params.set('categories', String(categoryId));

  const baseUrl =
    process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
    'https://crownbehavioralclinic.com/wp-json/wp/v2';
  const res = await fetch(`${baseUrl}/posts?${params.toString()}`);
  if (!res.ok) return [];
  return res.json();
}

export default function BlogGrid({ initialPosts, totalPages, categoryId }: BlogGridProps) {
  const [posts, setPosts] = useState<WordPressPost[]>(initialPosts);
  const [page, setPage] = useState(1);
  const [isPending, startTransition] = useTransition();

  const hasMore = page < totalPages;

  const loadMore = () => {
    const nextPage = page + 1;
    startTransition(async () => {
      const more = await fetchMorePosts(nextPage, categoryId);
      setPosts((prev) => [...prev, ...more]);
      setPage(nextPage);
    });
  };

  if (posts.length === 0) {
    return (
      <section className={styles.section}>
        <div className={styles.empty}>
          <p>No articles found.</p>
          <Link href="/blog" className={styles.emptyLink}>
            Back to all articles
          </Link>
        </div>
      </section>
    );
  }

  const [firstPost, ...restPosts] = posts;

  return (
    <section className={styles.section}>
      {/* TOP ROW: Purple CTA + first large post */}
      <div className={styles.topRow}>
        <div className={styles.ctaCard}>
          <p className={styles.ctaHeading}>
            We Love
            <br />
            what we do
          </p>
          <Link href="/our-work" className={styles.ctaBtn}>
            more details
            <span className={styles.ctaBtnArrow} aria-hidden="true">→</span>
          </Link>
        </div>
        <BlogCard post={firstPost} variant="large" />
      </div>

      {/* REST GRID */}
      {restPosts.length > 0 && (
        <div className={styles.grid}>
          {restPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {/* LOAD MORE */}
      {hasMore && (
        <div className={styles.loadMoreWrap}>
          <button
            onClick={loadMore}
            disabled={isPending}
            className={styles.loadMore}
            aria-label="Load more articles"
          >
            {isPending ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </section>
  );
}
