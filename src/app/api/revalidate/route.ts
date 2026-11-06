import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

async function handleRevalidation(req: NextRequest) {
  try {
    const secret = req.nextUrl.searchParams.get("secret");
    const expectedSecret = process.env.REVALIDATION_SECRET || "maajanki-revalidate-secret";

    if (secret !== expectedSecret) {
      return NextResponse.json({ message: "Invalid revalidation token" }, { status: 401 });
    }

    let body: any = {};
    if (req.method === "POST") {
      body = await req.json().catch(() => ({}));
    }

    const slug = body?.slug || body?.post?.post_name || req.nextUrl.searchParams.get("slug");
    const path = body?.path || req.nextUrl.searchParams.get("path");
    const tag = body?.tag || req.nextUrl.searchParams.get("tag");

    if (tag) {
      revalidateTag(tag, "max");
    }

    if (path) {
      revalidatePath(path);
    }

    if (slug) {
      revalidatePath(`/blog/${slug}`);
      revalidatePath(`/products/${slug}`);
      revalidatePath(`/${slug}`);
    }

    // Always revalidate products cache tags when any product webhook fires
    if (tag === 'products' || path?.includes('/products') || body?.resource === 'product') {
      try {
        revalidateTag('products', "max");
      } catch {}
      revalidatePath('/products');
    }

    // Revalidate primary content index routes
    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath("/products");
    revalidatePath("/sitemap.xml");
    revalidatePath("/feed.xml");

    return NextResponse.json({
      revalidated: true,
      slug: slug || null,
      path: path || null,
      tag: tag || null,
      now: Date.now(),
    });
  } catch (err: any) {
    return NextResponse.json({ message: err.message || "Error revalidating" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  return handleRevalidation(req);
}

export async function GET(req: NextRequest) {
  return handleRevalidation(req);
}
