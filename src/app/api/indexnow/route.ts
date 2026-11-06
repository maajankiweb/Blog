import { NextResponse } from 'next/server';
import { getPosts } from '@/lib/wordpress';
import { getProducts } from '@/lib/wordpress/products';

const INDEXNOW_KEY = '9f8e4b7c12d34a568b0c1e2f3a4b5c6d';
const HOST = 'blog.maajankiwebtech.com';
const SITE_URL = `https://${HOST}`;

export async function GET() {
  try {
    const staticRoutes = [
      '',
      '/blog',
      '/products',
      '/about',
      '/contact',
      '/newsletter',
      '/privacy-policy',
      '/terms',
      '/refund-policy',
      '/digital-delivery-policy',
      '/category/technology',
      '/category/seo',
      '/category/ai',
      '/category/wordpress',
      '/category/business',
    ].map((r) => `${SITE_URL}${r}`);

    let postRoutes: string[] = [];
    let productRoutes: string[] = [];

    try {
      const [posts, products] = await Promise.all([
        getPosts({ perPage: 100 }),
        getProducts(),
      ]);

      postRoutes = (posts || []).map((p) => `${SITE_URL}/blog/${p.slug}`);
      productRoutes = (products || []).map((p) => `${SITE_URL}/products/${p.slug}`);
    } catch (err) {
      console.error('Error fetching dynamic routes for IndexNow:', err);
    }

    const allUrls = Array.from(new Set([...staticRoutes, ...postRoutes, ...productRoutes]));

    // Submit to IndexNow API (Bing, Yandex, Seznam, Naver)
    const payload = {
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: allUrls.slice(0, 100), // IndexNow batch limit
    };

    const indexNowResponse = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    const isSuccess = indexNowResponse.status === 200 || indexNowResponse.status === 202;

    return NextResponse.json({
      success: isSuccess,
      status: indexNowResponse.status,
      submittedUrlsCount: payload.urlList.length,
      sampleUrls: payload.urlList.slice(0, 5),
      message: isSuccess
        ? 'Successfully submitted URLs to IndexNow network (Bing, Yandex, etc.) for rapid crawling.'
        : `IndexNow API responded with HTTP ${indexNowResponse.status}`,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Unknown IndexNow error',
      },
      { status: 500 }
    );
  }
}
