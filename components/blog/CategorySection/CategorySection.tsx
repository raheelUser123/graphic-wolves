'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { WordPressPost, WordPressCategory } from '@/lib/wordpress/types';
import { getFeaturedImage } from '@/lib/wordpress/types';
import styles from './CategorySection.module.css';

interface CategorySectionProps {
  categories: WordPressCategory[];
  postsByCategory: Record<number, WordPressPost[]>;
  allRecentPosts: WordPressPost[];
}

export default function CategorySection({
  categories,
  postsByCategory,
  allRecentPosts,
}: CategorySectionProps) {
  const displayCategories = categories.filter((c) => c.count > 0).slice(0, 4);
  const [activeId, setActiveId] = useState<number | null>(
    displayCategories[0]?.id ?? null
  );

  const currentPosts =
    activeId !== null
      ? postsByCategory[activeId] ?? []
      : allRecentPosts;

  const featuredPost = currentPosts[0] ?? null;
  const featuredImage = featuredPost ? getFeaturedImage(featuredPost) : null;
  const activeCategory = displayCategories.find((c) => c.id === activeId) ?? null;

  if (displayCategories.length === 0) return null;

  return (
    <section className={styles.section}>
      {/* TABS */}
      <div className={styles.tabs} role="tablist" aria-label="Blog categories">
        {displayCategories.map((cat) => (
          <button
            key={cat.id}
            role="tab"
            aria-selected={activeId === cat.id}
            className={`${styles.tab} ${activeId === cat.id ? styles.tabActive : ''}`}
            onClick={() => setActiveId(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* FEATURED POST */}
      {featuredPost ? (
        <div className={styles.featured}>
          <div className={styles.featuredContent}>
            {activeCategory && (
              <span className={styles.featuredCategory}>
                {activeCategory.name}
              </span>
            )}
            <h2
              className={styles.featuredHeading}
              dangerouslySetInnerHTML={{ __html: featuredPost.title.rendered }}
            />
            <Link
              href={`/blog/${featuredPost.slug}`}
              className={styles.featuredBtn}
              aria-label={`Read more about ${featuredPost.title.rendered}`}
            >
              more details
              <span className={styles.featuredBtnArrow} aria-hidden="true">→</span>
            </Link>
          </div>

          <Link
            href={`/blog/${featuredPost.slug}`}
            className={styles.featuredImageWrap}
            tabIndex={-1}
            aria-hidden="true"
          >
            {featuredImage ? (
              <Image
                src={featuredImage.source_url}
                alt={featuredImage.alt_text || featuredPost.title.rendered}
                fill
                className={styles.featuredImg}
                sizes="(max-width: 767px) 100vw, 45vw"
                priority
              />
            ) : (
              <div className={styles.featuredImgPlaceholder} aria-hidden="true" />
            )}
          </Link>
        </div>
      ) : (
        <div className={styles.emptyCategory}>
          <p>No posts in this category yet.</p>
        </div>
      )}
    </section>
  );
}
