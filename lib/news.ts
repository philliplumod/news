export type NewsArticle = {
  category: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  url: string;
  publishedAt: string;
};

export type NewsTab = {
  label: string;
  value: string;
};

export const NEWS_TABS: NewsTab[] = [
  { label: "Headlines", value: "headlines" },
  { label: "Politics", value: "politics" },
  { label: "Business", value: "business" },
  { label: "Technology", value: "technology" },
  { label: "Sports", value: "sports" },
  { label: "Health", value: "health" },
  { label: "Science", value: "science" },
  { label: "Entertainment", value: "entertainment" },
];

type NewsApiArticle = {
  title: string;
  description?: string | null;
  content?: string | null;
  url: string;
  publishedAt: string;
};

type NewsApiResponse = {
  status?: string;
  code?: string;
  message?: string;
  articles: NewsApiArticle[];
};

const BASE_URL = "https://newsapi.org/v2/top-headlines";
const DEFAULT_COUNTRY = "us";

function getApiKey() {
  return (
    process.env.NEWS_API_KEY?.trim() ||
    process.env.NEWSAPI_KEY?.trim() ||
    process.env.NEXT_PUBLIC_NEWS_API_KEY?.trim() ||
    ""
  );
}

function mapToNewsArticles(articles: NewsApiArticle[], category: string) {
  return articles
    .filter((article) => Boolean(article.title && article.url))
    .map((article) => ({
      category,
      slug: toSlug(article.title, article.url),
      title: article.title,
      summary: article.description ?? "No summary available.",
      content:
        article.content ?? article.description ?? "No content available.",
      url: article.url,
      publishedAt: article.publishedAt,
    }));
}

function toSlug(title: string, url: string) {
  const normalizedTitle = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  let hash = 0;
  for (let index = 0; index < url.length; index += 1) {
    hash = (hash << 5) - hash + url.charCodeAt(index);
    hash |= 0;
  }

  const suffix = Math.abs(hash).toString(36);
  return `${normalizedTitle}-${suffix}`;
}

export async function getNews(category?: string) {
  const apiKey = getApiKey();

  if (!apiKey) {
    throw new Error(
      "Missing API key. Set NEWS_API_KEY in .env.local and restart the dev server.",
    );
  }

  const selectedCategory = (category ?? "headlines").toLowerCase();
  const searchParams = new URLSearchParams({
    country: DEFAULT_COUNTRY,
  });

  if (selectedCategory === "politics") {
    searchParams.set("q", "politics");
  } else if (selectedCategory !== "headlines") {
    searchParams.set("category", selectedCategory);
  }

  const response = await fetch(`${BASE_URL}?${searchParams.toString()}`, {
    headers: {
      "x-api-key": apiKey,
    },
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    let details = `News API request failed with status ${response.status}`;

    try {
      const errorBody = (await response.json()) as {
        code?: string;
        message?: string;
      };
      if (errorBody?.message) {
        details = errorBody.code
          ? `${errorBody.code}: ${errorBody.message}`
          : errorBody.message;
      }
    } catch {
      // ignore JSON parse errors for upstream error bodies
    }

    throw new Error(details);
  }

  const data = (await response.json()) as NewsApiResponse;

  return mapToNewsArticles(data.articles ?? [], selectedCategory);
}

export async function getNewsArticle(category: string, slug: string) {
  const articles = await getNews(category);
  return articles.find((article) => article.slug === slug);
}
