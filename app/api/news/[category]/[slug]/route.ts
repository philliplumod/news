import { getNewsArticle } from "@/lib/news";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ category: string; slug: string }> },
) {
  const { category, slug } = await params;

  try {
    const article = await getNewsArticle(category, slug);

    if (!article) {
      return NextResponse.json(
        { message: "News article not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(article, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to fetch this article right now.";

    return NextResponse.json({ message }, { status: 500 });
  }
}
