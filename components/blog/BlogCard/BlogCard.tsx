import Link from 'next/link';
import Image from 'next/image';
import type { WordPressPost } from '@/lib/wordpress/types';
import { getFeaturedImage, getPostCategories, formatDate } from '@/lib/wordpress/types';
import styles from './BlogCard.module.css';

interface BlogCardProps {
  post: WordPressPost;
  variant?: 'default' | 'large';
}

export default function BlogCard({ post, variant = 'default' }: BlogCardProps) {
  const image = getFeaturedImage(post);
  const categories = getPostCategories(post);

  const excerpt = post.excerpt.rendered
    .replace(/<[^>]*>/g, '')
    .replace(/\[&hellip;\]/g, '...')
    .trim()
    .slice(0, 120);

  return (
    <article className={`${styles.card} ${variant === 'large' ? styles.large : ''}`}>
      <Link href={`/blog/${post.slug}`} className={styles.imageWrap} tabIndex={-1} aria-hidden="true">
        {image ? (
          <Image
            src={image.source_url}
            alt={image.alt_text || post.title.rendered}
            fill
            className={styles.image}
            sizes="(max-width: 767px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className={styles.imagePlaceholder} aria-hidden="true" />
        )}
      </Link>
      <div className={styles.body}>
        {categories.length > 0 && (
          <div className={styles.categories}>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/blog/category/${category.slug}`}
                className={styles.category}
              >
                {category.name}
              </Link>
            ))}
          </div>
        )}
        <h3 className={styles.title}>
          <Link href={`/blog/${post.slug}`} className={styles.titleLink}>
            <span dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
          </Link>
        </h3>
        {excerpt && <p className={styles.excerpt}>{excerpt}</p>}
        <time className={styles.date} dateTime={post.date}>
          {formatDate(post.date)}
        </time>
      </div>
    </article>
  );
}
