import { getNews } from "@/lib/news";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ category: string }> },
) {
  const { category } = await params;

  try {
    const articles = await getNews(category);

    if (!articles.length) {
      return NextResponse.json(
        { message: "News category not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to fetch category news right now.";

    return NextResponse.json({ message }, { status: 500 });
  }
}
