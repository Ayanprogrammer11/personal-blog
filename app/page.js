import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Your Name - Personal Blog & Insights",
  description:
    "Discover thought-provoking articles, insights, and stories on technology, creativity, and life. Join thousands of readers who find value in authentic perspectives.",
  keywords:
    "blog, insights, technology, creativity, personal development, writing",
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "Your Name - Personal Blog & Insights",
    description:
      "Discover thought-provoking articles, insights, and stories on technology, creativity, and life.",
    type: "website",
    url: "https://yourdomain.com",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Your Name Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Name - Personal Blog & Insights",
    description:
      "Discover thought-provoking articles, insights, and stories on technology, creativity, and life.",
    images: ["/og-image.jpg"],
  },
};

// Server Component - Featured Articles Data
const featuredArticles = [
  {
    id: 1,
    title: "The Art of Deep Work in a Distracted World",
    excerpt:
      "Exploring how to maintain focus and produce meaningful work in an age of constant notifications and digital overwhelm.",
    category: "Productivity",
    readTime: "8 min read",
    publishedAt: "2024-12-15",
    slug: "art-of-deep-work",
  },
  {
    id: 2,
    title: "Building Sustainable Creative Habits",
    excerpt:
      "A practical guide to developing and maintaining creative practices that stand the test of time.",
    category: "Creativity",
    readTime: "6 min read",
    publishedAt: "2024-12-10",
    slug: "sustainable-creative-habits",
  },
  {
    id: 3,
    title: "The Future of Remote Collaboration",
    excerpt:
      "How distributed teams are reshaping the way we work together and what it means for the future of business.",
    category: "Technology",
    readTime: "10 min read",
    publishedAt: "2024-12-05",
    slug: "future-remote-collaboration",
  },
];

const categories = [
  { name: "Technology", count: 23, icon: "💻" },
  { name: "Creativity", count: 18, icon: "🎨" },
  { name: "Productivity", count: 15, icon: "⚡" },
  { name: "Life Lessons", count: 12, icon: "🌱" },
  { name: "Business", count: 9, icon: "📈" },
];

const stats = [
  { number: "50K+", label: "Monthly Readers" },
  { number: "200+", label: "Articles Published" },
  { number: "15K+", label: "Newsletter Subscribers" },
  { number: "4.8/5", label: "Reader Rating" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-cream-50">
      {/* Navigation */}
      {/* <nav className="sticky top-0 z-50 bg-cream-50/95 backdrop-blur-md border-b border-sage-200">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="font-serif text-2xl font-bold text-brand-gradient"
            >
              YourBlog
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/articles"
                className="text-sage-700 hover:text-brand-600 transition-colors"
              >
                Articles
              </Link>
              <Link
                href="/categories"
                className="text-sage-700 hover:text-brand-600 transition-colors"
              >
                Categories
              </Link>
              <Link
                href="/about"
                className="text-sage-700 hover:text-brand-600 transition-colors"
              >
                About
              </Link>
              <Link href="/newsletter" className="btn-primary">
                Subscribe
              </Link>
            </div>
          </div>
        </div>
      </nav> */}

      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden border-4 border-brand-200 shadow-xl">
                <Image
                  src="/api/placeholder/128/128"
                  alt="Your Name"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 text-brand-gradient leading-tight">
              Ideas Worth
              <br />
              Exploring
            </h1>
            <p className="text-xl md:text-2xl text-sage-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              Welcome to a space where curiosity meets insight. I share deep
              thoughts on technology, creativity, and the art of meaningful
              living.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/blogs" className="btn-primary text-lg px-8 py-3">
                Read Articles
              </Link>
              <Link
                href="/newsletter"
                className="btn-secondary text-lg px-8 py-3"
              >
                Join Newsletter
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-sage-50/50">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-serif text-3xl md:text-4xl font-bold text-brand-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-sage-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-brand-800">
              Featured Articles
            </h2>
            <p className="text-xl text-sage-600 max-w-2xl mx-auto">
              Handpicked pieces that have resonated most with our community of
              thoughtful readers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredArticles.map((article) => (
              <article key={article.id} className="card group">
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-3">
                    <span className="inline-block bg-brand-100 text-brand-700 px-3 py-1 rounded-full font-medium">
                      {article.category}
                    </span>
                    <span className="text-sage-500">{article.readTime}</span>
                  </div>
                </div>

                <h3 className="font-serif text-xl font-bold mb-3 group-hover:text-brand-600 transition-colors">
                  <Link href={`/articles/${article.slug}`}>
                    {article.title}
                  </Link>
                </h3>

                <p className="text-sage-600 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <time className="text-sm text-sage-500">
                    {new Date(article.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <Link
                    href={`/articles/${article.slug}`}
                    className="text-brand-600 hover:text-brand-700 font-semibold transition-colors"
                  >
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/articles" className="btn-secondary text-lg px-8 py-3">
              View All Articles
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-sage-50/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-brand-800">
              Explore Topics
            </h2>
            <p className="text-xl text-sage-600 max-w-2xl mx-auto">
              Dive into specific areas of interest and discover content tailored
              to your curiosity.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category, index) => (
              <Link
                key={index}
                href={`/categories/${category.name.toLowerCase()}`}
                className="card text-center group hover:scale-105 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="font-serif text-lg font-bold mb-2 group-hover:text-brand-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sage-500 text-sm">
                  {category.count} articles
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20">
        <div className="container">
          <div className="card max-w-4xl mx-auto text-center bg-gradient-to-br from-brand-50 to-sage-50 border-brand-200">
            <div className="max-w-2xl mx-auto">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-brand-800">
                Never Miss an Insight
              </h2>
              <p className="text-lg text-sage-600 mb-8">
                Join 15,000+ thoughtful readers who get my latest articles,
                curated resources, and exclusive insights delivered to their
                inbox every week.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-6">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg border border-sage-300 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
                />
                <button className="btn-primary px-8 py-3 whitespace-nowrap">
                  Subscribe
                </button>
              </div>

              <p className="text-sm text-sage-500">
                No spam, unsubscribe anytime. Read our{" "}
                <Link href="/privacy" className="underline">
                  privacy policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 bg-sage-50/50">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-brand-800">
                Hi, I&apos;m AYAN
              </h2>
              <p className="text-lg text-sage-600 mb-6 leading-relaxed">
                I&apos;m a [your profession/role] passionate about exploring the
                intersection of technology, creativity, and human potential.
                Through this blog, I share insights from my journey and the
                lessons I&apos;ve learned along the way.
              </p>
              <p className="text-lg text-sage-600 mb-8 leading-relaxed">
                When I&apos;m not writing, you&apos;ll find me [your
                interests/hobbies], always looking for new perspectives and
                meaningful connections.
              </p>
              <Link href="/about" className="btn-secondary">
                Learn More About Me
              </Link>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/face-covering-intense.png"
                  alt="Your Name"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-brand-500 rounded-full flex items-center justify-center shadow-xl">
                <span className="text-2xl">✨</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sage-900 text-cream-100 py-16">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <Link
                href="/"
                className="font-serif text-2xl font-bold text-brand-gradient mb-4 inline-block"
              >
                YourBlog
              </Link>
              <p className="text-cream-200 mb-6 max-w-md">
                A space for meaningful conversations about technology,
                creativity, and life. Thank you for being part of this journey.
              </p>
              <div className="flex space-x-4">
                <Link
                  href="#"
                  className="text-cream-300 hover:text-brand-400 transition-colors"
                >
                  Twitter
                </Link>
                <Link
                  href="#"
                  className="text-cream-300 hover:text-brand-400 transition-colors"
                >
                  LinkedIn
                </Link>
                <Link
                  href="#"
                  className="text-cream-300 hover:text-brand-400 transition-colors"
                >
                  GitHub
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-serif text-lg font-bold mb-4">Navigate</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/articles"
                    className="text-cream-300 hover:text-brand-400 transition-colors"
                  >
                    Articles
                  </Link>
                </li>
                <li>
                  <Link
                    href="/categories"
                    className="text-cream-300 hover:text-brand-400 transition-colors"
                  >
                    Categories
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-cream-300 hover:text-brand-400 transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-cream-300 hover:text-brand-400 transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-serif text-lg font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/privacy"
                    className="text-cream-300 hover:text-brand-400 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-cream-300 hover:text-brand-400 transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/newsletter"
                    className="text-cream-300 hover:text-brand-400 transition-colors"
                  >
                    Newsletter
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-sage-800 mt-12 pt-8 text-center">
            <p className="text-cream-300">
              © 2024 YourBlog. All rights reserved. Made with ❤️ and curiosity.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
