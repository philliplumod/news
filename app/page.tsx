import Link from "next/link"

export default function HomePage() {
  return (
    <div className="text-center space-y-6">
      <h1 className="text-4xl font-bold text-gray-900">
        Welcome to My News Portal
      </h1>

      <p className="text-gray-600">
        Read our latest stories and updates.
      </p>

      <Link
        href="/news"
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Go to News
      </Link>
    </div>
  )
}