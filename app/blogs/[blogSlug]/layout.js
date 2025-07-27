import TableOfContents from "./TableOfContents";
import BlogLayoutWrapper from "./BlogLayoutWrapper";
import Link from "next/link";

export default function BlogLayout({ children }) {
  return (
    <BlogLayoutWrapper>
      <div className="relative min-h-screen overflow-x-hidden bg-black text-gray-100">
        {/* Animated Background */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-black to-blue-900/10"></div>
          <div className="absolute left-1/4 top-0 h-96 w-96 animate-pulse rounded-full bg-purple-500/5 blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 h-96 w-96 animate-pulse rounded-full bg-blue-500/5 blur-3xl delay-1000"></div>
        </div>

        {/* Glassmorphism Header */}
        <header className="sticky top-0 z-50 border-b border-white/5 bg-black/40 backdrop-blur-xl">
          <div className="mx-auto max-w-5xl">
            <nav className="flex items-center justify-between px-6 py-4 lg:px-8">
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
                <Link
                  href="/"
                  className="group relative text-gray-300 transition-all duration-300 hover:text-white"
                >
                  Home
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link
                  href="/blogs"
                  className="group relative text-gray-300 transition-all duration-300 hover:text-white"
                >
                  Articles
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link
                  href="/about"
                  className="group relative text-gray-300 transition-all duration-300 hover:text-white"
                >
                  About
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
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
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                    />
                  </svg>
                </button>
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
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    />
                  </svg>
                </button>
              </div>
            </nav>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="relative">
          <div className="mx-12 max-w-7xl px-6 lg:px-8">
            {/* Content Container with Glassmorphism */}
            <article className="relative mb-16 mt-8">
              <div className="rounded-2xl p-8 shadow-2xl backdrop-blur-sm lg:p-12">
                <div className="tracking-wide">{children}</div>
              </div>
            </article>
          </div>

          {/* Table of Contents - Interactive Side Panel */}
          <TableOfContents />

          {/* Reading Progress Bar */}
          <div className="fixed left-0 top-0 z-40 h-1 w-full bg-white/10">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300"
              style={{ width: "0%" }}
            ></div>
          </div>

          {/* Floating Action Buttons */}
          <div className="fixed bottom-8 right-6 z-30 flex flex-col space-y-3">
            <button className="group rounded-full border border-white/20 bg-white/10 p-3 shadow-lg backdrop-blur-lg transition-all duration-300 hover:bg-white/20">
              <svg
                className="h-5 w-5 text-gray-300 transition-colors group-hover:text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 11l5-5m0 0l5 5m-5-5v12"
                />
              </svg>
            </button>
            <button className="group rounded-full border border-white/20 bg-white/10 p-3 shadow-lg backdrop-blur-lg transition-all duration-300 hover:bg-white/20">
              <svg
                className="h-5 w-5 text-gray-300 transition-colors group-hover:text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>
        </main>

        {/* Premium Footer */}
        <footer className="relative mt-24 border-t border-white/10 bg-black/40 backdrop-blur-xl">
          <div className="mx-auto max-w-5xl px-6 py-12 lg:px-8">
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
                  Crafting stories that inspire, educate, and connect minds
                  across the digital landscape.
                </p>
              </div>

              {/* Quick Links */}
              <div className="space-y-4">
                <h3 className="font-semibold text-white">Quick Links</h3>
                <div className="space-y-2">
                  <Link
                    href="/blogs"
                    className="block text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    All Articles
                  </Link>
                  <Link
                    href="/categories"
                    className="block text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    Categories
                  </Link>
                  <Link
                    href="/newsletter"
                    className="block text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    Newsletter
                  </Link>
                  <Link
                    href="/rss"
                    className="block text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    RSS Feed
                  </Link>
                </div>
              </div>

              {/* Connect */}
              <div className="space-y-4">
                <h3 className="font-semibold text-white">Connect</h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="rounded-lg border border-white/10 bg-white/5 p-2 transition-all duration-300 hover:border-white/20 hover:bg-white/10"
                  >
                    <svg
                      className="h-4 w-4 text-gray-400 transition-colors hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="rounded-lg border border-white/10 bg-white/5 p-2 transition-all duration-300 hover:border-white/20 hover:bg-white/10"
                  >
                    <svg
                      className="h-4 w-4 text-gray-400 transition-colors hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="rounded-lg border border-white/10 bg-white/5 p-2 transition-all duration-300 hover:border-white/20 hover:bg-white/10"
                  >
                    <svg
                      className="h-4 w-4 text-gray-400 transition-colors hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.163-1.507-.402-2.405-1.717-2.405-3.887 0-3.405 2.471-6.531 7.129-6.531 3.741 0 6.651 2.670 6.651 6.237 0 3.723-2.347 6.719-5.604 6.719-1.094 0-2.123-.57-2.475-1.321l-.671 2.568c-.24.92-.895 2.077-1.332 2.794.999.308 2.058.472 3.16.472 6.621 0 11.99-5.367 11.99-11.988C24.007 5.367 18.639.001 12.017.001z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-12 flex flex-col items-center justify-between border-t border-white/10 pt-8 md:flex-row">
              <p className="text-sm text-gray-500">
                © 2024 Blog. All rights reserved.
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
                <a
                  href="/cookies"
                  className="text-sm text-gray-500 transition-colors hover:text-gray-400"
                >
                  Cookies
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </BlogLayoutWrapper>
  );
}
