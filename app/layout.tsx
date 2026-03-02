import "./globals.css"
import Link from "next/link"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-800">

        {/* Navbar */}
        <header className="bg-white shadow-md">
          <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between">
            <Link href="/" className="text-xl font-bold text-blue-600">
              MyNews
            </Link>
            <nav className="space-x-4">
              <Link href="/" className="hover:text-blue-500">
                Home
              </Link>
              <Link href="/news" className="hover:text-blue-500">
                News
              </Link>
            </nav>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 max-w-5xl mx-auto px-4 py-10">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t">
          <div className="max-w-5xl mx-auto px-4 py-4 text-center text-sm text-gray-500">
            © 2026 MyNews. All rights reserved.
          </div>
        </footer>

      </body>
    </html>
  )
}