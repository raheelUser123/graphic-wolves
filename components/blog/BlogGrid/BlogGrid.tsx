'use client';

import { useRef, useState, useTransition } from 'react';
import Link from 'next/link';
import BlogCard from '@/components/blog/BlogCard/BlogCard';
import type { WordPressPost } from '@/lib/wordpress/types';
import styles from './BlogGrid.module.css';

interface BlogGridProps {
  initialPosts: WordPressPost[];
  totalPages: number;
  categoryId?: number;
}

const POSTS_PER_PAGE = 5;

async function fetchPosts(
  page: number,
  categoryId?: number
): Promise<WordPressPost[]> {
  const params = new URLSearchParams({
    page: String(page),
    per_page: String(POSTS_PER_PAGE),
    _embed: '1',
  });
  if (categoryId) params.set('categories', String(categoryId));

  const baseUrl =
    process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
    'https://lightsalmon-swallow-827714.hostingersite.com/wp-json/wp/v2';
  const res = await fetch(`${baseUrl}/posts?${params.toString()}`);
  if (!res.ok) return [];
  return res.json();
}

export default function BlogGrid({ initialPosts, totalPages, categoryId }: BlogGridProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [posts, setPosts] = useState<WordPressPost[]>(initialPosts);
  const [page, setPage] = useState(1);
  const [cache, setCache] = useState<Record<number, WordPressPost[]>>({
    1: initialPosts,
  });
  const [isPending, startTransition] = useTransition();

  const goToPage = (nextPage: number) => {
    if (nextPage === page || nextPage < 1 || nextPage > totalPages) return;

    // Already visited this page — switch instantly from the in-memory cache.
    if (cache[nextPage]) {
      setPosts(cache[nextPage]);
      setPage(nextPage);
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    startTransition(async () => {
      const nextPosts = await fetchPosts(nextPage, categoryId);
      if (nextPosts.length === 0) return;
      setCache((prev) => ({ ...prev, [nextPage]: nextPosts }));
      setPosts(nextPosts);
      setPage(nextPage);
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
    <section ref={sectionRef} className={styles.section}>
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

      {/* REST GRID (4 posts) */}
      {restPosts.length > 0 && (
        <div className={styles.grid}>
          {restPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <nav className={styles.pagination} aria-label="Blog pagination">
          <button
            type="button"
            className={styles.pageArrow}
            onClick={() => goToPage(page - 1)}
            disabled={isPending || page === 1}
            aria-label="Previous page"
          >
            ←
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) =>
            n === page ? (
              <span key={n} className={styles.pageNumberActive} aria-current="page">
                {n}
              </span>
            ) : (
              <button
                key={n}
                type="button"
                className={styles.pageNumber}
                onClick={() => goToPage(n)}
                disabled={isPending}
                aria-label={`Page ${n}`}
              >
                {n}
              </button>
            )
          )}

          <button
            type="button"
            className={styles.pageArrow}
            onClick={() => goToPage(page + 1)}
            disabled={isPending || page === totalPages}
            aria-label="Next page"
          >
            →
          </button>
        </nav>
      )}
    </section>
  );
}
