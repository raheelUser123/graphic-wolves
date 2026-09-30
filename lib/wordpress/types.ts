export interface WordPressRenderedContent {
  rendered: string;
  protected?: boolean;
}

export interface WordPressImageSize {
  file: string;
  width: number;
  height: number;
  mime_type: string;
  source_url: string;
}

export interface WordPressImage {
  id: number;
  date: string;
  slug: string;
  type: string;
  link: string;
  title: WordPressRenderedContent;
  author: number;
  source_url: string;
  alt_text: string;
  media_type: string;
  mime_type: string;
  media_details: {
    width: number;
    height: number;
    file: string;
    sizes: {
      thumbnail?: WordPressImageSize;
      medium?: WordPressImageSize;
      medium_large?: WordPressImageSize;
      large?: WordPressImageSize;
      full?: WordPressImageSize;
      [key: string]: WordPressImageSize | undefined;
    };
  };
}

export interface WordPressAuthor {
  id: number;
  name: string;
  url: string;
  description: string;
  link: string;
  slug: string;
  avatar_urls: {
    '24'?: string;
    '48'?: string;
    '96'?: string;
    [size: string]: string | undefined;
  };
}

export interface WordPressCategory {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  parent: number;
}

export interface WordPressTag {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
}

export interface WordPressPost {
  id: number;
  date: string;
  date_gmt: string;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: WordPressRenderedContent;
  content: WordPressRenderedContent;
  excerpt: WordPressRenderedContent;
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  sticky: boolean;
  categories: number[];
  tags: number[];
  _embedded?: {
    author?: WordPressAuthor[];
    'wp:featuredmedia'?: WordPressImage[];
    'wp:term'?: Array<WordPressCategory[] | WordPressTag[]>;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  totalPages: number;
  page: number;
  perPage: number;
}

/* Helpers */
export function getFeaturedImage(post: WordPressPost): WordPressImage | null {
  return post._embedded?.['wp:featuredmedia']?.[0] ?? null;
}

export function getPostAuthor(post: WordPressPost): WordPressAuthor | null {
  return post._embedded?.author?.[0] ?? null;
}

export function getPostCategories(post: WordPressPost): WordPressCategory[] {
  const terms = post._embedded?.['wp:term'];
  if (!terms) return [];
  return (terms[0] as WordPressCategory[]) ?? [];
}

export function estimateReadTime(content: string): number {
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Ensures every non-empty <h2>/<h3> heading in a post's rendered HTML has an
 * `id` attribute so the Table of Contents can deep-link to it.
 *
 * IMPORTANT: the counter logic mirrors TableOfContents.extractHeadings() so the
 * ids generated here are exactly the ids the TOC links to. Headings that
 * already have an id are left untouched, and empty headings are skipped.
 */
export function ensureHeadingIds(html: string): string {
  const regex = /<(h[23])([^>]*)>(.*?)<\/h[23]>/gi;
  let counter = 0;
  return html.replace(regex, (full, tag, attrs, inner) => {
    const text = inner.replace(/<[^>]*>/g, '').trim();
    if (!text) return full;
    const hasId = /\bid\s*=\s*["'][^"']+["']/i.test(attrs);
    if (!hasId) {
      attrs = `${attrs} id="heading-${counter}"`;
    }
    counter++;
    return `<${tag}${attrs}>${inner}</${tag}>`;
  });
}
