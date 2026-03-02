"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import type { NewsArticle } from "@/lib/news"

export default function NewsDetailPage() {
  const params = useParams<{ category: string; slug: string }>()
  const [article, setArticle] = useState<NewsArticle | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const response = await fetch(
          `/api/news/${params.category}/${params.slug}`,
          { cache: "no-store" },
        )

        if (response.status === 404) {
          setError("News article not found.")
          return
        }

        if (!response.ok) {
          throw new Error("Failed to load news article")
        }

        const data = (await response.json()) as NewsArticle
        setArticle(data)
      } catch {
        setError("Unable to load this article right now.")
      } finally {
        setIsLoading(false)
      }
    }

    if (params.category && params.slug) {
      void loadArticle()
      return
    }

    setIsLoading(false)
    setError("Invalid article route.")
  }, [params.category, params.slug])

  if (isLoading) {
    return <p>Loading article...</p>
  }

  if (error || !article) {
    return (
      <div className="space-y-4">
        <p className="text-red-600">{error ?? "Article not found."}</p>
        <Link
          href={params.category ? `/news/${params.category}` : "/news"}
          className="text-blue-600 hover:underline block"
        >
          ← Back to News
        </Link>
      </div>
    )
  }

  return (
    <article className="prose max-w-none space-y-4">
      <p className="text-sm text-gray-500 uppercase tracking-wide">
        {article.category}
      </p>
      <h1>{article.title}</h1>
      <p>{article.content}</p>
      <a
        href={article.url}
        target="_blank"
        rel="noreferrer"
        className="text-blue-600 hover:underline block"
      >
        Open original source ↗
      </a>
      <Link
        href={`/news/${article.category}`}
        className="text-blue-600 hover:underline block"
      >
        ← Back to {article.category} News
      </Link>
    </article>
  )
}
