import type { Metadata } from 'next';
import Header from '@/components/layout/Header/Header';
import FooterSection from '@/components/layout/Footer/FooterSection';
import BlogHero from '@/components/blog/BlogHero/BlogHero';
import CategorySection from '@/components/blog/CategorySection/CategorySection';
import BlogGrid from '@/components/blog/BlogGrid/BlogGrid';
import { getPosts, getPostsByCategory } from '@/lib/wordpress/posts';
import { getCategories } from '@/lib/wordpress/categories';
import type { WordPressPost } from '@/lib/wordpress/types';
import styles from './blog.module.css';

export const metadata: Metadata = {
  title: 'Blog | Graphic Wolves',
  description:
    'Discover articles and tutorials on branding, web development, and e-commerce by Graphic Wolves.',
  openGraph: {
    title: 'Blog | Graphic Wolves',
    description:
      'Discover articles and tutorials on branding, web development, and e-commerce by Graphic Wolves.',
    type: 'website',
  },
  alternates: { canonical: '/blog' },
};

export default async function BlogPage() {
  const [postsResult, categories] = await Promise.all([
    getPosts(1, 7),
    getCategories(),
  ]);

  const activeCategories = categories.filter((c) => c.count > 0).slice(0, 4);

  const categoryPostsEntries = await Promise.all(
    activeCategories.map(async (cat) => {
      const result = await getPostsByCategory(cat.id, 1, 3);
      return [cat.id, result.data] as [number, WordPressPost[]];
    })
  );
  const postsByCategory = Object.fromEntries(categoryPostsEntries);

  return (
    <main className={styles.main}>
      <Header />
      <BlogHero />
      {activeCategories.length > 0 && (
        <CategorySection
          categories={activeCategories}
          postsByCategory={postsByCategory}
          allRecentPosts={postsResult.data}
        />
      )}
      <div className={styles.gridWrap}>
        <BlogGrid
          initialPosts={postsResult.data}
          totalPages={postsResult.totalPages}
        />
      </div>
      <FooterSection />
    </main>
  );
}
