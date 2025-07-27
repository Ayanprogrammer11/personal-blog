// app/blogs/layout.js

import BlogList from "../components/BlogList";
import { client } from "../sanity/client";

export const metadata = {
  title: "Blog Articles",
  description: "Explore our latest insights and articles",
};

const BLOG_COUNT_QUERY = `count(*[_type == "blog"])`;

export default async function BlogsLayout({ children }) {
  const totalBlogs = await client.fetch(BLOG_COUNT_QUERY);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black text-gray-100">
      {/* Animated Background (same as your main layout) */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-black to-blue-900/10"></div>
        <div className="absolute left-1/4 top-0 h-96 w-96 animate-pulse rounded-full bg-purple-500/5 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 h-96 w-96 animate-pulse rounded-full bg-blue-500/5 blur-3xl delay-1000"></div>
      </div>

      {/* Glassmorphism Header (same as your main layout) */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-black/40 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <nav className="flex items-center justify-between py-4">
            {/* Logo/Brand */}
            <div className="flex items-center">
              <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-blue-500">
                <div className="h-4 w-4 rounded-sm bg-white"></div>
              </div>
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-xl font-bold text-transparent">
                Blog
              </span>
            </div>

            {/* Navigation */}
            <div className="hidden items-center space-x-8 md:flex">
              <a
                href="/"
                className="group relative text-gray-300 transition-all duration-300 hover:text-white"
              >
                Home
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="/blogs" className="group relative text-white">
                Articles
                <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-gradient-to-r from-purple-500 to-blue-500"></span>
              </a>
              <a
                href="/about"
                className="group relative text-gray-300 transition-all duration-300 hover:text-white"
              >
                About
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              <button className="group rounded-lg border border-white/10 bg-white/5 p-2 transition-all duration-300 hover:border-white/20 hover:bg-white/10">
                <svg
                  className="h-5 w-5 text-gray-400 transition-colors group-hover:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative mx-auto max-w-7xl px-6 py-12 lg:px-8">
        {/* Hero Section */}
        <section className="mb-16 text-center">
          <h1 className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl md:text-6xl">
            Latest Articles
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-400">
            Explore our collection of {totalBlogs}+ premium articles and
            tutorials
          </p>
        </section>

        {/* Category Filters */}
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {["All", "Technology", "Design", "Business", "Lifestyle"].map(
            (category) => (
              <button
                key={category}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium transition-all hover:bg-white/10 hover:text-white"
              >
                {category}
              </button>
            )
          )}
        </div>

        {/* Blog List */}
        <section className="mb-20">{children}</section>

        {/* Pagination */}
        <div className="flex justify-center">
          <div className="flex items-center space-x-2">
            <button className="rounded-lg border border-white/10 bg-white/5 p-2 px-4 text-sm transition-all hover:bg-white/10">
              Previous
            </button>
            <button className="rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 p-2 px-4 text-sm font-medium">
              1
            </button>
            <button className="rounded-lg border border-white/10 bg-white/5 p-2 px-4 text-sm transition-all hover:bg-white/10">
              2
            </button>
            <button className="rounded-lg border border-white/10 bg-white/5 p-2 px-4 text-sm transition-all hover:bg-white/10">
              Next
            </button>
          </div>
        </div>
      </main>

      {/* Footer (same as your main layout) */}
      <footer className="relative border-t border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-blue-500">
                  <div className="h-4 w-4 rounded-sm bg-white"></div>
                </div>
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-xl font-bold text-transparent">
                  Blog
                </span>
              </div>
              <p className="text-sm leading-relaxed text-gray-400">
                Crafting stories that inspire, educate, and connect minds across
                the digital landscape.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="font-semibold text-white">Quick Links</h3>
              <div className="space-y-2">
                <a
                  href="/blogs"
                  className="block text-sm text-gray-400 transition-colors hover:text-white"
                >
                  All Articles
                </a>
                <a
                  href="/categories"
                  className="block text-sm text-gray-400 transition-colors hover:text-white"
                >
                  Categories
                </a>
                <a
                  href="/newsletter"
                  className="block text-sm text-gray-400 transition-colors hover:text-white"
                >
                  Newsletter
                </a>
              </div>
            </div>

            {/* Connect */}
            <div className="space-y-4">
              <h3 className="font-semibold text-white">Connect</h3>
              <div className="flex space-x-4">
                {["Twitter", "GitHub", "LinkedIn"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="rounded-lg border border-white/10 bg-white/5 p-2 transition-all duration-300 hover:border-white/20 hover:bg-white/10"
                  >
                    <span className="sr-only">{social}</span>
                    <svg
                      className="h-4 w-4 text-gray-400 transition-colors hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {/* Social icons would go here */}
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between border-t border-white/10 pt-8 md:flex-row">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Blog. All rights reserved.
            </p>
            <div className="mt-4 flex space-x-6 md:mt-0">
              <a
                href="/privacy"
                className="text-sm text-gray-500 transition-colors hover:text-gray-400"
              >
                Privacy
              </a>
              <a
                href="/terms"
                className="text-sm text-gray-500 transition-colors hover:text-gray-400"
              >
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
