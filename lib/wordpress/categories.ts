import { wpFetch } from './api';
import type { WordPressCategory } from './types';

export async function getCategories(): Promise<WordPressCategory[]> {
  const { data } = await wpFetch<WordPressCategory[]>('/categories', {
    params: { per_page: 100 },
    revalidate: 3600,
  });
  return data;
}

export async function getCategoryBySlug(
  slug: string
): Promise<WordPressCategory | null> {
  const { data } = await wpFetch<WordPressCategory[]>('/categories', {
    params: { slug },
    revalidate: 3600,
  });
  return data[0] ?? null;
}
