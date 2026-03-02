"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import type { NewsArticle } from "@/lib/news"
import SkeletonArticle from "@/components/SkeletonArticle"

export default function NewsArticlePage() {
  const params = useParams<{ category: string }>()
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadCategoryNews = async () => {
      try {
        const response = await fetch(`/api/news/${params.category}`, {
          cache: "no-store",
        })

        if (response.status === 404) {
          setError("No news found for this category.")
          return
        }

        if (!response.ok) {
          throw new Error("Failed to load category news")
        }

        const data = (await response.json()) as NewsArticle[]
        setArticles(data)
      } catch {
        setError("Unable to load this category right now.")
      } finally {
        setIsLoading(false)
      }
    }

    if (params.category) {
      void loadCategoryNews()
      return
    }

    setIsLoading(false)
    setError("Invalid category route.")
  }, [params.category])

  if (isLoading) {
    return (
      <section className="space-y-6">
        <div className="h-8 w-56 rounded bg-gray-200 animate-pulse" />
        <SkeletonArticle count={5} />
      </section>
    )
  }

  if (error) {
    return (
      <div className="space-y-4">
        <p className="text-red-600">{error}</p>
        <Link href="/news" className="text-blue-600 hover:underline block">
          ← Back to News
        </Link>
      </div>
    )
  }

  if (!articles.length) {
    return (
      <div className="space-y-4">
        <p>No news found for this category.</p>
        <Link href="/news" className="text-blue-600 hover:underline block">
          ← Back to News
        </Link>
      </div>
    )
  }

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold capitalize">{params.category} News</h2>
      <ul className="space-y-4">
        {articles.map((article) => (
          <li key={article.url} className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
            <p className="text-gray-600">{article.summary}</p>
            <Link
              href={`/news/${article.category}/${article.slug}`}
              className="text-blue-600 hover:underline mt-3 inline-block"
            >
              Read More →
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/news" className="text-blue-600 hover:underline block">
        ← Back to News
      </Link>
    </section>
  )
}
