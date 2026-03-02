import Link from "next/link"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Post({ post }: any) {
  return (
    <li className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
      <h2 className="text-xl font-semibold mb-2">
        {post.title}
      </h2>

      <Link
        href={`/blog/${post.slug}`}
        className="text-blue-600 hover:underline"
      >
        Read More →
      </Link>
    </li>
  )
}