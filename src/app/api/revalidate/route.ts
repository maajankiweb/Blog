import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    const secret = req.nextUrl.searchParams.get("secret");
    const expectedSecret = process.env.REVALIDATION_SECRET || "maajanki-revalidate-secret";

    if (secret !== expectedSecret) {
      return NextResponse.json({ message: "Invalid revalidation token" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const slug = body?.slug || body?.post?.post_name;
    const path = body?.path;

    if (path) {
      revalidatePath(path);
    } else if (slug) {
      revalidatePath(`/${slug}`);
      revalidatePath("/blog");
      revalidatePath("/");
    } else {
      revalidatePath("/");
      revalidatePath("/blog");
    }

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err: any) {
    return NextResponse.json({ message: err.message || "Error revalidating" }, { status: 500 });
  }
}
