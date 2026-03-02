"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { NEWS_TABS } from "@/lib/news"

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold mb-8 border-b pb-4">Latest News</h1>

      <div className="flex flex-wrap gap-2">
        {NEWS_TABS.map((tab) => {
          const href = tab.value === "headlines" ? "/news" : `/news/${tab.value}`
          const isActive =
            tab.value === "headlines"
              ? pathname === "/news"
              : pathname.startsWith(`/news/${tab.value}`)

          return (
            <Link
              key={tab.value}
              href={href}
              className={`px-4 py-2 rounded-lg border ${
                isActive
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </Link>
          )
        })}
      </div>

      {children}
    </section>
  )
}
