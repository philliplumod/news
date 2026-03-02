const posts = [
  {
    slug: "first-post",
    title: "First Post",
    content: "This is my first blog post built with Next.js and Tailwind!",
  },
  {
    slug: "second-post",
    title: "Second Post",
    content: "This is another article in our amazing blog.",
  },
]

export async function getPosts() {
  return posts
}

export async function getPost(slug: string) {
  return posts.find((post) => post.slug === slug)!
}