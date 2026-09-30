import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header/Header';
import FooterSection from '@/components/layout/Footer/FooterSection';
import BlogHero from '@/components/blog/BlogHero/BlogHero';
import BlogGrid from '@/components/blog/BlogGrid/BlogGrid';
import { getCategoryBySlug } from '@/lib/wordpress/categories';
import { getPostsByCategory } from '@/lib/wordpress/posts';
import styles from './category.module.css';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) return { title: 'Category Not Found | Graphic Wolves' };

  return {
    title: `${category.name} Articles | Graphic Wolves Blog`,
    description:
      category.description ||
      `Browse all articles in the ${category.name} category on Graphic Wolves Blog.`,
    openGraph: {
      title: `${category.name} Articles | Graphic Wolves Blog`,
      type: 'website',
    },
    alternates: { canonical: `/blog/category/${slug}` },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) notFound();

  const postsResult = await getPostsByCategory(category.id, 1, 6);

  return (
    <main className={styles.main}>
      <Header />
      <BlogHero categoryName={category.name} />
      <div className={styles.gridWrap}>
        <BlogGrid
          initialPosts={postsResult.data}
          totalPages={postsResult.totalPages}
          categoryId={category.id}
        />
      </div>
      <FooterSection />
    </main>
  );
}
