import localBlogData from "../data/blog_all_content.json";

const API_URL = process.env.WORDPRESS_API_URL || 'https://blog.maajankiwebtech.com/wp-json/wp/v2';

export interface WPPost {
  id: number;
  date: string;
  modified?: string;
  slug: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  author: number;
  featured_media: number;
  categories: number[];
  tags: number[];
  _embedded?: {
    author?: Array<{
      id: number;
      name: string;
      slug?: string;
      description?: string;
      avatar_urls?: Record<string, string>;
    }>;
    'wp:featuredmedia'?: Array<{
      id: number;
      source_url: string;
      alt_text?: string;
      media_details?: {
        width: number;
        height: number;
        sizes?: Record<string, { source_url: string; width: number; height: number }>;
      };
    }>;
    'wp:term'?: Array<
      Array<{
        id: number;
        name: string;
        slug: string;
        taxonomy: string;
      }>
    >;
  };
  yoast_head_json?: any;
  seo?: {
    seoTitle?: string;
    seoDescription?: string;
    keywords?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    ogUrl?: string;
    twitterCard?: string;
    twitterTitle?: string;
    twitterDescription?: string;
    twitterImage?: string;
    robots?: string;
  };
}

export interface WPPage {
  id: number;
  date: string;
  slug: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt?: {
    rendered: string;
  };
  yoast_head_json?: any;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text?: string;
    }>;
  };
}

export interface WPCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
  description: string;
}

export interface WPTag {
  id: number;
  name: string;
  slug: string;
  count: number;
}

// Local Fallback Helpers
function mapLocalToWPPost(localPost: any): WPPost {
  return {
    id: localPost.id,
    date: localPost.date,
    slug: localPost.slug,
    link: localPost.url,
    title: { rendered: localPost.title },
    content: { rendered: localPost.content },
    excerpt: { rendered: `<p>${localPost.excerpt}</p>` },
    author: localPost.author?.id || 1,
    featured_media: localPost.featuredImage?.id || 0,
    categories: localPost.categories.map((c: any) => c.id),
    tags: localPost.tags.map((t: any) => t.id),
    _embedded: {
      author: localPost.author ? [{
        id: localPost.author.id,
        name: localPost.author.name,
      }] : undefined,
      'wp:featuredmedia': localPost.featuredImage ? [{
        id: localPost.featuredImage.id,
        source_url: localPost.featuredImage.sourceUrl,
        alt_text: localPost.featuredImage.altText,
        media_details: {
          width: localPost.featuredImage.width || 800,
          height: localPost.featuredImage.height || 600
        }
      }] : undefined,
      'wp:term': [
        localPost.categories.map((c: any) => ({ id: c.id, name: c.name, slug: c.slug, taxonomy: 'category' })),
        localPost.tags.map((t: any) => ({ id: t.id, name: t.name, slug: t.slug, taxonomy: 'post_tag' }))
      ]
    },
    seo: localPost.seo
  };
}

function injectLocalSEO(post: WPPost): WPPost {
  const localPost = (localBlogData as any[]).find((p) => p.id === post.id || p.slug === post.slug);
  if (localPost && localPost.seo) {
    return {
      ...post,
      seo: localPost.seo
    };
  }
  return post;
}

function getLocalCategories(): WPCategory[] {
  const catsMap = new Map<number, WPCategory>();
  (localBlogData as any[]).forEach((post) => {
    post.categories.forEach((cat: any) => {
      if (!catsMap.has(cat.id)) {
        catsMap.set(cat.id, {
          id: cat.id,
          name: cat.name,
          slug: cat.slug,
          count: 1,
          description: ""
        });
      } else {
        const existing = catsMap.get(cat.id)!;
        existing.count++;
      }
    });
  });
  return Array.from(catsMap.values());
}

function getLocalTags(): WPTag[] {
  const tagsMap = new Map<number, WPTag>();
  (localBlogData as any[]).forEach((post) => {
    post.tags.forEach((tag: any) => {
      if (!tagsMap.has(tag.id)) {
        tagsMap.set(tag.id, {
          id: tag.id,
          name: tag.name,
          slug: tag.slug,
          count: 1
        });
      } else {
        const existing = tagsMap.get(tag.id)!;
        existing.count++;
      }
    });
  });
  return Array.from(tagsMap.values());
}

// Fetch helper with error handling and caching (ISR)
async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  
  // Set default revalidation time to 1 hour (3600 seconds)
  const defaultHeaders = { 'Content-Type': 'application/json' };
  const mergedOptions: RequestInit = {
    signal: AbortSignal.timeout(8000),
    ...options,
    headers: { ...defaultHeaders, ...options.headers },
    next: { revalidate: 3600, ...(options.next || {}) },
  };

  try {
    const res = await fetch(url, mergedOptions);
    if (!res.ok) {
      throw new Error(`WordPress API error: ${res.status} ${res.statusText} for URL: ${url}`);
    }
    return await res.json() as T;
  } catch (error) {
    console.error(`Failed to fetch from WordPress API:`, error);
    throw error;
  }
}

/**
 * Get posts list
 */
export async function getPosts(params: {
  page?: number;
  perPage?: number;
  category?: number;
  tag?: number;
  search?: string;
  author?: number;
} = {}): Promise<WPPost[]> {
  const query = new URLSearchParams();
  query.append('_embed', 'true'); // Crucial: includes media, author, categories directly
  
  if (params.page) query.append('page', params.page.toString());
  if (params.perPage) query.append('per_page', params.perPage.toString());
  if (params.category) query.append('categories', params.category.toString());
  if (params.tag) query.append('tags', params.tag.toString());
  if (params.search) query.append('search', params.search);
  if (params.author) query.append('author', params.author.toString());

  const endpoint = `/posts?${query.toString()}`;
  try {
    const posts = await fetchAPI<WPPost[]>(endpoint);
    return posts.map(injectLocalSEO);
  } catch (error) {
    console.warn("WordPress API getPosts failed, falling back to local content:", error);
    let localPosts = (localBlogData as any[]).map(mapLocalToWPPost);
    if (params.category) {
      localPosts = localPosts.filter(p => p.categories.includes(params.category!));
    }
    if (params.tag) {
      localPosts = localPosts.filter(p => p.tags.includes(params.tag!));
    }
    if (params.search) {
      const searchLower = params.search.toLowerCase();
      localPosts = localPosts.filter(p => 
        p.title.rendered.toLowerCase().includes(searchLower) || 
        p.content.rendered.toLowerCase().includes(searchLower)
      );
    }
    if (params.author) {
      localPosts = localPosts.filter(p => p.author === params.author);
    }
    
    const page = params.page || 1;
    const perPage = params.perPage || 10;
    const start = (page - 1) * perPage;
    return localPosts.slice(start, start + perPage);
  }
}

/**
 * Get a single post by slug
 */
export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  const endpoint = `/posts?slug=${encodeURIComponent(slug)}&_embed=true`;
  try {
    const posts = await fetchAPI<WPPost[]>(endpoint);
    return posts.length > 0 ? injectLocalSEO(posts[0]) : null;
  } catch (error) {
    console.warn(`WordPress API getPostBySlug failed for slug "${slug}", falling back to local content:`, error);
    const localPost = (localBlogData as any[]).find(p => p.slug === slug);
    return localPost ? mapLocalToWPPost(localPost) : null;
  }
}

/**
 * Get all categories
 */
export async function getCategories(params: { perPage?: number } = {}): Promise<WPCategory[]> {
  const query = new URLSearchParams();
  if (params.perPage) query.append('per_page', params.perPage.toString());
  
  const endpoint = `/categories?${query.toString()}`;
  try {
    return await fetchAPI<WPCategory[]>(endpoint);
  } catch (error) {
    console.warn("WordPress API getCategories failed, falling back to local categories:", error);
    const localCats = getLocalCategories();
    return params.perPage ? localCats.slice(0, params.perPage) : localCats;
  }
}

export interface WPUser {
  id: number;
  name: string;
  url: string;
  description: string;
  slug: string;
  avatar_urls?: Record<string, string>;
}

export interface WPComment {
  id: number;
  post: number;
  parent: number;
  author_name: string;
  author_avatar_urls?: Record<string, string>;
  date: string;
  content: {
    rendered: string;
  };
}

/**
 * Get all tags
 */
export async function getTags(params: { perPage?: number } = {}): Promise<WPTag[]> {
  const query = new URLSearchParams();
  if (params.perPage) query.append('per_page', params.perPage.toString());
  
  const endpoint = `/tags?${query.toString()}`;
  try {
    return await fetchAPI<WPTag[]>(endpoint);
  } catch (error) {
    console.warn("WordPress API getTags failed, falling back to local tags:", error);
    const localTags = getLocalTags();
    return params.perPage ? localTags.slice(0, params.perPage) : localTags;
  }
}

/**
 * Get user by ID
 */
export async function getUser(id: number): Promise<WPUser> {
  try {
    return await fetchAPI<WPUser>(`/users/${id}`);
  } catch (error) {
    console.warn(`WordPress API getUser failed for id ${id}, falling back to local:`, error);
    const localPost = (localBlogData as any[]).find(p => p.author?.id === id);
    if (localPost && localPost.author) {
      return {
        id: localPost.author.id,
        name: localPost.author.name,
        url: "",
        description: "",
        slug: localPost.author.slug
      };
    }
    return {
      id,
      name: "Author",
      url: "",
      description: "",
      slug: "author"
    };
  }
}

/**
 * Get comments for a post
 */
export async function getComments(postId: number): Promise<WPComment[]> {
  return fetchAPI<WPComment[]>(`/comments?post=${postId}&per_page=100`, {
    next: { revalidate: 60 } // Caching comments for 60 seconds
  });
}

/**
 * Create a new comment
 */
export async function createComment(postId: number, name: string, email: string, content: string): Promise<WPComment> {
  return fetchAPI<WPComment>(`/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      post: postId,
      author_name: name,
      author_email: email,
      content: content,
    }),
    next: { revalidate: 0 } // No cache for submission
  });
}

/**
 * Get category by slug
 */
export async function getCategoryBySlug(slug: string): Promise<WPCategory | null> {
  try {
    const categories = await fetchAPI<WPCategory[]>(`/categories?slug=${encodeURIComponent(slug)}`);
    return categories.length > 0 ? categories[0] : null;
  } catch (error) {
    console.error(`Error fetching category for slug "${slug}":`, error);
    return null;
  }
}

/**
 * Get tag by slug
 */
export async function getTagBySlug(slug: string): Promise<WPTag | null> {
  try {
    const tags = await fetchAPI<WPTag[]>(`/tags?slug=${encodeURIComponent(slug)}`);
    return tags.length > 0 ? tags[0] : null;
  } catch (error) {
    console.error(`Error fetching tag for slug "${slug}":`, error);
    return null;
  }
}

/**
 * Get user by slug
 */
export async function getUserBySlug(slug: string): Promise<WPUser | null> {
  try {
    const users = await fetchAPI<WPUser[]>(`/users?slug=${encodeURIComponent(slug)}`);
    return users.length > 0 ? users[0] : null;
  } catch (error) {
    console.error(`Error fetching user for slug "${slug}":`, error);
    return null;
  }
}

/**
 * Utility function to clean and decode HTML entities in WordPress text (titles, excerpts)
 */
export function cleanHtmlText(htmlStr: string): string {
  if (!htmlStr) return "";
  return htmlStr
    .replace(/<[^>]*>?/gm, "")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&#8230;/g, "…")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ")
    .trim();
}

/**
 * Fetch API returning response data + response headers (for X-WP-TotalPages)
 */
async function fetchAPIWithHeaders<T>(endpoint: string, options: RequestInit = {}): Promise<{ data: T; headers: Headers }> {
  const API_BASE = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://blog.maajankiwebtech.com/wp-json/wp/v2';
  const url = `${API_BASE}${endpoint}`;
  const defaultHeaders = { 'Content-Type': 'application/json' };
  const mergedOptions: RequestInit = {
    signal: AbortSignal.timeout(8000),
    ...options,
    headers: { ...defaultHeaders, ...options.headers },
    next: { revalidate: 3600, ...(options.next || {}) },
  };

  const res = await fetch(url, mergedOptions);
  if (!res.ok) {
    throw new Error(`WordPress API error: ${res.status} ${res.statusText} for URL: ${url}`);
  }
  const data = await res.json() as T;
  return { data, headers: res.headers };
}

/**
 * Get posts with pagination metadata (totalPages and totalPosts)
 */
export async function getPostsWithTotal(params: {
  page?: number;
  perPage?: number;
  category?: number;
  tag?: number;
  search?: string;
  author?: number;
} = {}): Promise<{ posts: WPPost[]; totalPages: number; totalPosts: number }> {
  const query = new URLSearchParams();
  query.append('_embed', 'true');
  
  if (params.page) query.append('page', params.page.toString());
  if (params.perPage) query.append('per_page', params.perPage.toString());
  if (params.category) query.append('categories', params.category.toString());
  if (params.tag) query.append('tags', params.tag.toString());
  if (params.search) query.append('search', params.search);
  if (params.author) query.append('author', params.author.toString());

  const endpoint = `/posts?${query.toString()}`;
  try {
    const { data, headers } = await fetchAPIWithHeaders<WPPost[]>(endpoint);
    const totalPages = parseInt(headers.get('x-wp-totalpages') || '1', 10);
    const totalPosts = parseInt(headers.get('x-wp-total') || data.length.toString(), 10);
    return {
      posts: data.map(injectLocalSEO),
      totalPages,
      totalPosts,
    };
  } catch (error) {
    console.warn("WordPress API getPostsWithTotal failed, falling back to getPosts:", error);
    const posts = await getPosts(params);
    return {
      posts,
      totalPages: 1,
      totalPosts: posts.length,
    };
  }
}

/**
 * Get static WP Page by slug
 */
export async function getPageBySlug(slug: string): Promise<WPPage | null> {
  const endpoint = `/pages?slug=${encodeURIComponent(slug)}&_embed=true`;
  try {
    const pages = await fetchAPI<WPPage[]>(endpoint);
    return pages.length > 0 ? pages[0] : null;
  } catch (error) {
    console.warn(`WordPress API getPageBySlug failed for slug "${slug}":`, error);
    return null;
  }
}

/**
 * Get posts by Date (Year and Month)
 */
export async function getPostsByDate(year: number, month: number, page: number = 1, perPage: number = 10): Promise<{ posts: WPPost[]; totalPages: number; totalPosts: number }> {
  const startDate = new Date(year, month - 1, 1).toISOString();
  const endDate = new Date(year, month, 0, 23, 59, 59).toISOString();
  
  const query = new URLSearchParams();
  query.append('_embed', 'true');
  query.append('after', startDate);
  query.append('before', endDate);
  query.append('page', page.toString());
  query.append('per_page', perPage.toString());

  const endpoint = `/posts?${query.toString()}`;
  try {
    const { data, headers } = await fetchAPIWithHeaders<WPPost[]>(endpoint);
    const totalPages = parseInt(headers.get('x-wp-totalpages') || '1', 10);
    const totalPosts = parseInt(headers.get('x-wp-total') || data.length.toString(), 10);
    return {
      posts: data.map(injectLocalSEO),
      totalPages,
      totalPosts,
    };
  } catch (error) {
    console.warn(`getPostsByDate failed for ${year}/${month}:`, error);
    return { posts: [], totalPages: 0, totalPosts: 0 };
  }
}

/**
 * Generate Article Schema.org JSON-LD for SEO
 */
export function generateArticleJsonLd(post: WPPost, siteUrl: string = 'https://blog.maajankiwebtech.com') {
  const authorName = post._embedded?.author?.[0]?.name || "Maa Janki Team";
  const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || `${siteUrl}/og-image.png`;
  const cleanTitle = cleanHtmlText(post.title.rendered);
  const cleanDescription = cleanHtmlText(post.excerpt?.rendered || "");

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: cleanTitle,
    description: cleanDescription,
    image: [featuredMedia],
    datePublished: post.date,
    dateModified: post.modified || post.date,
    author: {
      '@type': 'Person',
      name: authorName,
      url: `${siteUrl}/author/${post._embedded?.author?.[0]?.slug || 'team'}`,
      sameAs: [
        'https://github.com/AshishKmj',
        'https://www.instagram.com/kumarashishweb/',
      ],
    },
    publisher: {
      '@type': 'Organization',
      name: 'Maajanki WebTech Digital Agency',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
        width: 200,
        height: 60,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/${post.slug}`,
    },
  };
}

/**
 * Generate FAQPage Schema.org JSON-LD
 */
export function generateFaqJsonLd(faqs: Array<{ question: string; answer: string }>) {
  if (!faqs || faqs.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

import localAffiliateProducts from "../data/affiliate_products.json";

export interface WPAffiliateProduct {
  id: number;
  title: string;
  slug: string;
  tagline?: string;
  description: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  rating?: number;
  reviewsCount?: number;
  affiliateUrl: string;
  storeName?: string;
  category: string;
  badge?: string;
  couponCode?: string;
  featuredImage?: string;
  features?: string[];
  pros?: string[];
  cons?: string[];
  publishedAt?: string;
}

/**
 * Helper to extract affiliate metadata from WP post content or fields if present
 */
function mapWPPostToAffiliateProduct(post: WPPost): WPAffiliateProduct {
  const content = post.content?.rendered || "";
  
  // Extract affiliate URL if in post HTML or default to post link
  const linkMatch = content.match(/href=["'](https?:\/\/[^"']+)["']/i);
  const affUrl = linkMatch ? linkMatch[1] : post.link;

  // Extract Price pattern e.g. Price: $29
  const priceMatch = content.match(/Price:\s*([$\u20B9\u20AC\u00A3]?[0-9,.]+(?:\/[a-z]+)?)/i);
  const origPriceMatch = content.match(/Original Price:\s*([$\u20B9\u20AC\u00A3]?[0-9,.]+(?:\/[a-z]+)?)/i);
  const couponMatch = content.match(/Coupon:\s*([A-Z0-9_-]+)/i);
  const storeMatch = content.match(/Store:\s*([A-Za-z0-9\s]+)/i);

  const featuredImg = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 
                     "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80";

  const categoryName = post._embedded?.['wp:term']?.[0]?.[0]?.name || "General Tools";

  return {
    id: post.id,
    title: cleanHtmlText(post.title.rendered),
    slug: post.slug,
    tagline: cleanHtmlText(post.excerpt?.rendered || "").slice(0, 140),
    description: cleanHtmlText(content),
    price: priceMatch ? priceMatch[1] : "₹3,999/yr",
    originalPrice: origPriceMatch ? origPriceMatch[1] : undefined,
    discount: origPriceMatch ? "Special Deal" : undefined,
    rating: 4.8,
    reviewsCount: 120,
    affiliateUrl: affUrl,
    storeName: storeMatch ? storeMatch[1].trim() : "WordPress Partner",
    category: categoryName,
    badge: "WordPress Pick",
    couponCode: couponMatch ? couponMatch[1] : undefined,
    featuredImage: featuredImg,
    publishedAt: post.date,
  };
}

/**
 * Fetch affiliate products from WordPress or local fallback
 */
export async function getAffiliateProducts(categoryFilter?: string): Promise<WPAffiliateProduct[]> {
  try {
    const query = new URLSearchParams();
    query.append('_embed', 'true');
    query.append('per_page', '20');
    query.append('search', 'affiliate');

    const posts = await fetchAPI<WPPost[]>(`/posts?${query.toString()}`);
    if (posts && posts.length > 0) {
      const parsedWPProducts = posts.map(mapWPPostToAffiliateProduct);
      const combined = [...parsedWPProducts, ...(localAffiliateProducts as WPAffiliateProduct[])];
      if (categoryFilter && categoryFilter !== "All") {
        return combined.filter(p => p.category.toLowerCase() === categoryFilter.toLowerCase());
      }
      return combined;
    }
  } catch (err) {
    console.warn("Could not fetch WP affiliate posts, fallback to local data:", err);
  }

  let products = localAffiliateProducts as WPAffiliateProduct[];
  if (categoryFilter && categoryFilter !== "All") {
    products = products.filter(p => p.category.toLowerCase() === categoryFilter.toLowerCase());
  }
  return products;
}

/**
 * Fetch single affiliate product by slug
 */
export async function getAffiliateProductBySlug(slug: string): Promise<WPAffiliateProduct | null> {
  const localList = localAffiliateProducts as WPAffiliateProduct[];
  const foundLocal = localList.find(p => p.slug === slug);
  if (foundLocal) return foundLocal;

  try {
    const post = await getPostBySlug(slug);
    if (post) {
      return mapWPPostToAffiliateProduct(post);
    }
  } catch (err) {
    console.warn(`Error fetching affiliate product slug "${slug}" from WP:`, err);
  }

  return null;
}
