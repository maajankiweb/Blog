import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    const secret = req.nextUrl.searchParams.get("secret");
    const expectedSecret = process.env.WORDPRESS_WEBHOOK_SECRET || process.env.REVALIDATION_SECRET || "maajanki-revalidate-secret";

    if (secret !== expectedSecret) {
      return NextResponse.json({ message: "Unauthorized webhook" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const tag = body?.tag || req.nextUrl.searchParams.get("tag");
    const slug = body?.slug || req.nextUrl.searchParams.get("slug");
    const path = body?.path || req.nextUrl.searchParams.get("path");

    // Revalidate by tag if provided
    if (tag) {
      try {
        revalidateTag(tag, "max");
      } catch {}
    }

    // Revalidate single slug
    if (slug) {
      revalidatePath(`/blog/${slug}`);
      revalidatePath(`/products/${slug}`);
    }

    if (path) {
      revalidatePath(path);
    }

    // Purge key directory caches
    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath("/products");
    revalidatePath("/store");
    revalidatePath("/sitemap.xml");

    return NextResponse.json({
      revalidated: true,
      tag: tag || null,
      slug: slug || null,
      timestamp: Date.now(),
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Webhook error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  return POST(req);
}
