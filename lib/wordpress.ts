const WP_API_URL = process.env.WORDPRESS_API_URL || 'https://quagua.com/wp-json/wp/v2';

export interface WPPost {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  slug: string;
  date: string;
  categories: number[];
  _embedded?: { 'wp:featuredmedia'?: Array<{ source_url: string }> };
}

export async function getPosts(perPage = 10, category?: number): Promise<WPPost[]> {
  try {
    let url = `${WP_API_URL}/posts?_embed&per_page=${perPage}`;
    if (category) url += `&categories=${category}`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json();
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  try {
    const res = await fetch(`${WP_API_URL}/posts?slug=${slug}&_embed`, { next: { revalidate: 60 } });
    const posts = await res.json();
    return posts[0] || null;
  } catch {
    return null;
  }
}
