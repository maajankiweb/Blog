import {
  WOOCOMMERCE_STORE_API_URL,
  WOOCOMMERCE_V3_API_URL,
  getWooCommerceAuthHeader,
  fetchWithTimeout,
} from "./client";
import fallbackPayload from "@/data/migrated_products_payload.json";

export interface WordPressProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  category: string;
  categories: Array<{ id: number; name: string; slug: string }>;
  tags: Array<{ id?: number; name: string; slug: string }>;
  price: string;
  regularPrice?: string;
  salePrice?: string;
  discountPercent?: number;
  numericPrice: number;
  isFree: boolean;
  currency: string;
  description: string;
  shortDescription: string;
  plainShortDescription?: string;
  featuredImage: string;
  galleryImages: string[];
  inStock: boolean;
  sku?: string;
  rating: number;
  reviewsCount: number;
  salesCount: number;
  badge?: string;
  demoUrl?: string;
  downloadUrl?: string;
  featured: boolean;
  features?: string[];
  type?: "simple" | "external" | "grouped" | "variable" | string;
  externalUrl?: string;
  buttonText?: string;
  seo?: {
    title?: string;
    description?: string;
    focusKeyword?: string;
    canonicalUrl?: string;
  };
}

export interface GetProductsParams {
  category?: string;
  search?: string;
  page?: number;
  perPage?: number;
  orderby?: "price" | "date" | "title" | "popularity" | "rating";
  order?: "asc" | "desc";
  featured?: boolean;
}

/**
 * Helper to strip HTML and decode common entities
 */
export function cleanProductText(str?: string): string {
  if (!str) return "";
  return str
    .replace(/<[^>]*>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&quot;/g, '"')
    .replace(/&#038;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Decode HTML entities without stripping HTML tags
 */
export function decodeHtmlEntities(str?: string): string {
  if (!str) return "";
  return str
    .replace(/&amp;/g, "&")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&quot;/g, '"')
    .replace(/&#038;/g, "&")
    .replace(/&nbsp;/g, " ");
}

/**
 * Format raw WooCommerce Store API or v3 product into clean WordPressProduct model
 */
function normalizeWcProduct(raw: any): WordPressProduct {
  const isExternal = raw.type === "external" || Boolean(raw.external_url);
  const externalUrl = raw.external_url || raw.add_to_cart?.url || undefined;
  const buttonText = raw.button_text || raw.add_to_cart?.text || (isExternal ? "Buy Product" : "Buy Now");

  // Handle WooCommerce Store API price format (prices in minor units, e.g. 249900 cents)
  let priceStr = isExternal ? "Amazon / Kindle" : "₹0";
  let regStr: string | undefined = undefined;
  let saleStr: string | undefined = undefined;
  let numericPrice = 0;
  let discountPercent: number | undefined = undefined;

  if (raw.prices) {
    const rawPrice = parseInt(raw.prices.price || "0", 10) / (raw.prices.currency_minor_unit ? 10 ** raw.prices.currency_minor_unit : 100);
    numericPrice = rawPrice;
    priceStr = rawPrice === 0 ? (isExternal ? "Amazon / Kindle" : "FREE") : `₹${rawPrice.toLocaleString("en-IN")}`;

    if (raw.prices.regular_price) {
      const reg = parseInt(raw.prices.regular_price, 10) / (raw.prices.currency_minor_unit ? 10 ** raw.prices.currency_minor_unit : 100);
      if (reg > rawPrice) {
        regStr = `₹${reg.toLocaleString("en-IN")}`;
        discountPercent = Math.round(((reg - rawPrice) / reg) * 100);
      }
    }
  } else if (raw.price !== undefined && raw.price !== "") {
    numericPrice = parseFloat(raw.price) || 0;
    priceStr = numericPrice === 0 ? (isExternal ? "Amazon / Kindle" : "FREE") : `₹${numericPrice.toLocaleString("en-IN")}`;
    if (raw.regular_price && parseFloat(raw.regular_price) > numericPrice) {
      const regNum = parseFloat(raw.regular_price);
      regStr = `₹${regNum.toLocaleString("en-IN")}`;
      discountPercent = Math.round(((regNum - numericPrice) / regNum) * 100);
    }
  }

  const categoryName = raw.categories?.[0]?.name || (isExternal ? "Ebooks" : "Plugins");

  // Extract featured image with regex fallback for HTML embedded images
  let featuredImg = raw.images?.[0]?.src;
  if (!featuredImg) {
    const descMatch = (raw.description || raw.short_description || "").match(/<img[^>]+src=["']([^"']+)["']/i);
    if (descMatch && descMatch[1]) {
      featuredImg = descMatch[1];
    } else {
      featuredImg = "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80";
    }
  }

  const gallery = Array.isArray(raw.images) && raw.images.length > 0
    ? raw.images.map((img: any) => img.src || img).filter(Boolean)
    : [featuredImg];

  // Extract Rank Math metadata if available
  let seoTitle: string | undefined;
  let seoDesc: string | undefined;
  let focusKeyword: string | undefined;
  let canonicalUrl: string | undefined;

  if (Array.isArray(raw.meta_data)) {
    for (const meta of raw.meta_data) {
      if (meta.key === "rank_math_title") seoTitle = meta.value;
      if (meta.key === "rank_math_description") seoDesc = meta.value;
      if (meta.key === "rank_math_focus_keyword") focusKeyword = meta.value;
      if (meta.key === "rank_math_canonical_url") canonicalUrl = meta.value;
    }
  }

  // Preserve FULL RICH HTML for detail page rendering, provide plain text for SEO & cards
  const richDesc = raw.description || raw.short_description || "";
  const richShortDesc = raw.short_description || (richDesc ? richDesc.slice(0, 300) : "");
  const plainDesc = cleanProductText(raw.description) || cleanProductText(raw.short_description) || "";
  const plainShort = cleanProductText(raw.short_description) || (plainDesc ? plainDesc.slice(0, 160) : "");

  return {
    id: raw.id,
    name: decodeHtmlEntities(raw.name) || "WordPress Product",
    slug: raw.slug || `product-${raw.id}`,
    permalink: `/products/${raw.slug || raw.id}`,
    category: categoryName,
    categories: raw.categories || [{ id: 1, name: categoryName, slug: categoryName.toLowerCase() }],
    tags: raw.tags || [],
    price: priceStr,
    regularPrice: regStr,
    salePrice: saleStr,
    discountPercent,
    numericPrice,
    isFree: !isExternal && numericPrice === 0,
    currency: "INR",
    description: richDesc,
    shortDescription: richShortDesc,
    plainShortDescription: plainShort,
    featuredImage: featuredImg,
    galleryImages: gallery,
    inStock: raw.is_in_stock !== undefined ? Boolean(raw.is_in_stock) : true,
    sku: raw.sku || `MJ-${raw.id}`,
    rating: raw.average_rating ? parseFloat(raw.average_rating) : 4.9,
    reviewsCount: raw.review_count || 45,
    salesCount: raw.total_sales || 110,
    badge: raw.featured ? "FEATURED" : (isExternal ? "AMAZON EBOOK" : undefined),
    demoUrl: externalUrl || raw.permalink || undefined,
    featured: Boolean(raw.featured),
    type: raw.type || (isExternal ? "external" : "simple"),
    externalUrl,
    buttonText,
    seo: {
      title: seoTitle || `${decodeHtmlEntities(raw.name)} | MJ Digital`,
      description: seoDesc || plainShort,
      focusKeyword,
      canonicalUrl: canonicalUrl || `https://blog.maajankiwebtech.com/products/${raw.slug}`,
    },
  };
}

/**
 * Normalizes products loaded from local migration fallback
 */
function getFallbackProducts(): WordPressProduct[] {
  return (fallbackPayload as any[]).map((p) => {
    const numPrice = parseFloat(p.price) || 0;
    const numReg = parseFloat(p.regular_price) || 0;
    return {
      id: p.id,
      name: p.name,
      slug: p.slug,
      permalink: `/products/${p.slug}`,
      category: p.category,
      categories: p.categories,
      tags: p.tags,
      price: numPrice === 0 ? "FREE" : `₹${numPrice.toLocaleString("en-IN")}`,
      regularPrice: numReg > numPrice ? `₹${numReg.toLocaleString("en-IN")}` : undefined,
      numericPrice: numPrice,
      isFree: numPrice === 0,
      currency: "INR",
      description: p.description,
      shortDescription: p.short_description,
      featuredImage: p.featured_image,
      galleryImages: p.images?.map((img: any) => img.src) || [p.featured_image],
      inStock: p.in_stock,
      sku: p.sku,
      rating: p.rating,
      reviewsCount: p.reviews_count,
      salesCount: 120,
      badge: p.badge,
      demoUrl: p.demo_url,
      downloadUrl: p.download_url,
      featured: p.featured,
      seo: {
        title: p.meta_data?.find((m: any) => m.key === "rank_math_title")?.value || p.name,
        description: p.meta_data?.find((m: any) => m.key === "rank_math_description")?.value || p.short_description,
        focusKeyword: p.meta_data?.find((m: any) => m.key === "rank_math_focus_keyword")?.value,
        canonicalUrl: p.meta_data?.find((m: any) => m.key === "rank_math_canonical_url")?.value,
      },
    };
  });
}

/**
 * Fetch products dynamically from WordPress WooCommerce Store API or v3 API
 * With graceful fallback to the local migrated dataset if WordPress has 0 products yet.
 */
export async function getProducts(params: GetProductsParams = {}): Promise<WordPressProduct[]> {
  const { category, search, page = 1, perPage = 50, orderby = "date", order = "desc", featured } = params;

  // 1. Attempt fetching from WooCommerce Store API
  try {
    const query = new URLSearchParams();
    query.set("page", String(page));
    query.set("per_page", String(perPage));
    if (orderby) query.set("orderby", orderby);
    if (order) query.set("order", order);
    if (search) query.set("search", search);

    const authHeader = getWooCommerceAuthHeader();
    const endpoint = authHeader
      ? `${WOOCOMMERCE_V3_API_URL}/products?${query.toString()}`
      : `${WOOCOMMERCE_STORE_API_URL}/products?${query.toString()}`;

    const headers: Record<string, string> = {
      Accept: "application/json",
    };
    if (authHeader) {
      headers["Authorization"] = authHeader;
    }

    const res = await fetchWithTimeout(endpoint, {
      headers,
      next: { revalidate: 60, tags: ["products"] },
    });

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        let products = data.map(normalizeWcProduct);

        // Apply filters in memory if Store API doesn't handle them directly
        if (category && category.toLowerCase() !== "all") {
          products = products.filter(
            (p) =>
              p.category.toLowerCase() === category.toLowerCase() ||
              p.categories.some((c) => c.name.toLowerCase() === category.toLowerCase() || c.slug.toLowerCase() === category.toLowerCase())
          );
        }

        if (featured) {
          products = products.filter((p) => p.featured);
        }

        return products;
      }
    }
  } catch (err: any) {
    console.warn("WooCommerce API fetch note:", err?.message || err);
  }

  // 2. Resilient fallback to the migrated catalog dataset
  let fallback = getFallbackProducts();

  if (category && category.toLowerCase() !== "all") {
    fallback = fallback.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }

  if (search && search.trim()) {
    const s = search.toLowerCase();
    fallback = fallback.filter(
      (p) =>
        p.name.toLowerCase().includes(s) ||
        p.description.toLowerCase().includes(s) ||
        p.shortDescription.toLowerCase().includes(s) ||
        p.category.toLowerCase().includes(s)
    );
  }

  if (featured) {
    fallback = fallback.filter((p) => p.featured);
  }

  // Sort
  if (orderby === "price") {
    fallback.sort((a, b) => (order === "asc" ? a.numericPrice - b.numericPrice : b.numericPrice - a.numericPrice));
  } else if (orderby === "title") {
    fallback.sort((a, b) => (order === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)));
  }

  return fallback;
}

/**
 * Fetch a single product by its unique slug
 */
export async function getProductBySlug(slug: string): Promise<WordPressProduct | null> {
  if (!slug) return null;

  // 1. Try WooCommerce API
  try {
    const authHeader = getWooCommerceAuthHeader();
    const endpoint = authHeader
      ? `${WOOCOMMERCE_V3_API_URL}/products?slug=${encodeURIComponent(slug)}`
      : `${WOOCOMMERCE_STORE_API_URL}/products?slug=${encodeURIComponent(slug)}`;

    const headers: Record<string, string> = { Accept: "application/json" };
    if (authHeader) headers["Authorization"] = authHeader;

    const res = await fetchWithTimeout(endpoint, {
      headers,
      next: { revalidate: 60, tags: [`product-${slug}`, "products"] },
    });

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return normalizeWcProduct(data[0]);
      }
    }
  } catch (err) {
    console.warn(`Could not fetch product ${slug} from WooCommerce API:`, err);
  }

  // 2. Fallback lookup in migrated dataset
  const fallback = getFallbackProducts();
  const matched = fallback.find((p) => p.slug === slug || p.slug === decodeURIComponent(slug));
  return matched || null;
}

/**
 * Fetch featured products for the Homepage section
 */
export async function getFeaturedProducts(limit = 4): Promise<WordPressProduct[]> {
  const products = await getProducts({ featured: true, perPage: limit });
  if (products.length >= limit) {
    return products.slice(0, limit);
  }
  // If fewer than limit featured products exist, fill with top products
  const all = await getProducts({ perPage: limit * 2 });
  const combined = [...products, ...all.filter((p) => !products.some((fp) => fp.id === p.id))];
  return combined.slice(0, limit);
}

/**
 * Get distinct categories for filtering
 */
export async function getProductCategories(): Promise<string[]> {
  const products = await getProducts();
  const set = new Set<string>();
  products.forEach((p) => {
    if (p.category) set.add(p.category);
  });
  return ["All", ...Array.from(set)];
}
