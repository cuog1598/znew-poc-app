import { NextRequest, NextResponse } from "next/server";
import { data } from "src/mock/data";

export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const post = data.find((item) => item.slug === params.slug);

  console.log("post", post);

  if (!post) {
    return NextResponse.json({ message: "Post not found" }, { status: 404 });
  }

  return NextResponse.json(post);
}
