import { getPosts, getCategories } from '@/lib/wordpress';
import { getProducts } from '@/lib/wordpress/products';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = 'https://blog.maajankiwebtech.com';
  const currentDate = new Date();

  // 1. Dynamic Articles from WordPress
  let posts: Array<{ slug: string; date: string }> = [];
  try {
    const fetchedPosts = await getPosts({ perPage: 100 });
    posts = fetchedPosts.map((p) => ({ slug: p.slug, date: p.date }));
  } catch {
    // Graceful fallback
  }

  // 2. Dynamic Categories (including editorial topics from footer)
  let categories: Array<{ slug: string }> = [
    { slug: 'technology' },
    { slug: 'seo' },
    { slug: 'ai' },
    { slug: 'wordpress' },
    { slug: 'business' },
  ];

  try {
    const fetchedCats = await getCategories({ perPage: 50 });
    fetchedCats.forEach((c) => {
      if (!categories.some((item) => item.slug === c.slug)) {
        categories.push({ slug: c.slug });
      }
    });
  } catch {
    // Graceful fallback
  }

  // 3. Dynamic WooCommerce Digital Products
  let products: Array<{ slug: string }> = [];
  try {
    const fetchedProducts = await getProducts({ perPage: 50 });
    products = fetchedProducts.map((p) => ({ slug: p.slug }));
  } catch {
    // Graceful fallback
  }

  // Core Static Routes (Excludes all deleted /tools)
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: 'https://blog.maajankiwebtech.com/', lastModified: currentDate, changeFrequency: 'daily', priority: 1.0 },
    { url: `${siteUrl}/blog`, lastModified: currentDate, changeFrequency: 'daily', priority: 0.95 },
    { url: `${siteUrl}/products`, lastModified: currentDate, changeFrequency: 'daily', priority: 0.95 },
    { url: `${siteUrl}/about`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/contact`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/newsletter`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/privacy-policy`, lastModified: currentDate, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${siteUrl}/terms`, lastModified: currentDate, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${siteUrl}/refund-policy`, lastModified: currentDate, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${siteUrl}/digital-delivery-policy`, lastModified: currentDate, changeFrequency: 'yearly', priority: 0.4 },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${siteUrl}/category/${cat.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((prod) => ({
    url: `${siteUrl}/products/${prod.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  return [...staticRoutes, ...postRoutes, ...categoryRoutes, ...productRoutes];
}
