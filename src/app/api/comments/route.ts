import { NextRequest, NextResponse } from "next/server";
import { createComment } from "@/lib/wordpress";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { postId, name, email, content } = body;

    // Validation
    if (!postId || !name || !email || !content) {
      return NextResponse.json(
        { error: "Missing required fields: postId, name, email, and content are required." },
        { status: 400 }
      );
    }

    // Call WordPress API
    const comment = await createComment(Number(postId), name, email, content);
    
    return NextResponse.json(comment, { status: 201 });
  } catch (error: any) {
    console.error("Error posting comment through Next.js proxy API:", error);
    return NextResponse.json(
      { error: error.message || "Failed to submit comment to WordPress" },
      { status: 500 }
    );
  }
}
