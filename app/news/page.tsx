"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import type { NewsArticle } from "@/lib/news"
import SkeletonArticle from "@/components/SkeletonArticle"

export default function NewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadNews = async () => {
      try {
        const response = await fetch("/api/news?category=headlines", {
          cache: "no-store",
        })

        if (!response.ok) {
          throw new Error("Failed to load news")
        }

        const data = (await response.json()) as NewsArticle[]
        setArticles(data)
      } catch {
        setError("Unable to load news right now.")
      } finally {
        setIsLoading(false)
      }
    }

    void loadNews()
  }, [])

  if (isLoading) {
    return (
      <section className="space-y-6">
        <div className="h-8 w-48 rounded bg-gray-200 animate-pulse" />
        <SkeletonArticle count={6} />
      </section>
    )
  }

  if (error) {
    return <p className="text-red-600">{error}</p>
  }

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold">Top Headlines</h2>

      <ul className="space-y-6">
        {articles.map((article) => (
          <li key={article.url} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">{article.category}</p>
            <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
            <p className="text-gray-600 mb-3">{article.summary}</p>
            <Link href={`/news/${article.category}/${article.slug}`} className="text-blue-600 hover:underline">
              Read More →
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
