const WP_API_URL =
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
  'https://lightsalmon-swallow-827714.hostingersite.com/wp-json/wp/v2';

export class WordPressAPIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public endpoint?: string
  ) {
    super(message);
    this.name = 'WordPressAPIError';
  }
}

interface FetchOptions {
  params?: Record<string, string | number | boolean>;
  revalidate?: number | false;
}

export async function wpFetch<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<{ data: T; headers: Headers }> {
  const { params, revalidate = 60 } = options;

  const url = new URL(`${WP_API_URL}${endpoint}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, String(value));
    });
  }

  try {
    const response = await fetch(url.toString(), {
      next: { revalidate },
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new WordPressAPIError(
        `WordPress API error: ${response.status} ${response.statusText}`,
        response.status,
        endpoint
      );
    }

    const data = (await response.json()) as T;
    return { data, headers: response.headers };
  } catch (error) {
    if (error instanceof WordPressAPIError) throw error;
    throw new WordPressAPIError(
      `Failed to fetch: ${error instanceof Error ? error.message : 'Unknown error'}`,
      undefined,
      endpoint
    );
  }
}
