import { wpFetch } from './api';
import type { WordPressPost, PaginatedResponse } from './types';

export async function getPosts(
  page = 1,
  perPage = 10
): Promise<PaginatedResponse<WordPressPost>> {
  const { data, headers } = await wpFetch<WordPressPost[]>('/posts', {
    params: { page, per_page: perPage, _embed: true },
  });
  return {
    data,
    total: parseInt(headers.get('X-WP-Total') ?? '0', 10),
    totalPages: parseInt(headers.get('X-WP-TotalPages') ?? '0', 10),
    page,
    perPage,
  };
}

export async function getPostBySlug(
  slug: string
): Promise<WordPressPost | null> {
  const { data } = await wpFetch<WordPressPost[]>('/posts', {
    params: { slug, _embed: true },
  });
  return data[0] ?? null;
}

export async function getPostsByCategory(
  categoryId: number,
  page = 1,
  perPage = 10
): Promise<PaginatedResponse<WordPressPost>> {
  const { data, headers } = await wpFetch<WordPressPost[]>('/posts', {
    params: { categories: categoryId, page, per_page: perPage, _embed: true },
  });
  return {
    data,
    total: parseInt(headers.get('X-WP-Total') ?? '0', 10),
    totalPages: parseInt(headers.get('X-WP-TotalPages') ?? '0', 10),
    page,
    perPage,
  };
}

export async function getRelatedPosts(
  categoryId: number,
  currentPostId: number,
  perPage = 3
): Promise<WordPressPost[]> {
  const { data } = await wpFetch<WordPressPost[]>('/posts', {
    params: {
      categories: categoryId,
      exclude: currentPostId,
      per_page: perPage,
      _embed: true,
    },
  });
  return data;
}
