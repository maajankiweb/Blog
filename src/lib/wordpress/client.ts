/**
 * Headless WordPress & WooCommerce Client Utility
 * Provides resilient server-side communication with cms.maajankiwebtech.com
 */

export const WORDPRESS_SITE_URL =
  process.env.WORDPRESS_SITE_URL ||
  process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL ||
  "https://cms.maajankiwebtech.com";

export const WORDPRESS_REST_URL =
  process.env.WORDPRESS_API_URL ||
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
  `${WORDPRESS_SITE_URL}/wp-json/wp/v2`;

export const WOOCOMMERCE_STORE_API_URL = `${WORDPRESS_SITE_URL}/wp-json/wc/store/v1`;
export const WOOCOMMERCE_V3_API_URL = `${WORDPRESS_SITE_URL}/wp-json/wc/v3`;

/**
 * Get basic auth header for WooCommerce REST API (Server-Side Only)
 */
export function getWooCommerceAuthHeader(): string | null {
  const key = process.env.WC_CONSUMER_KEY;
  const secret = process.env.WC_CONSUMER_SECRET;

  if (key && secret) {
    return "Basic " + Buffer.from(`${key}:${secret}`).toString("base64");
  }
  return null;
}

/**
 * Resilient fetcher with timeout and revalidation
 */
export async function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs = 8000): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}
