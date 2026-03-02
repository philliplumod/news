import { getNews } from "@/lib/news";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const category = url.searchParams.get("category");

  try {
    const articles = await getNews(category ?? undefined);

    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to fetch news right now.";

    return NextResponse.json({ message }, { status: 500 });
  }
}
