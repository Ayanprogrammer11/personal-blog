// components/blogs/BlogCard.tsx
import Link from "next/link";
import Image from "next/image";
import { Clock, User, MessageCircle, ArrowRight, Star } from "lucide-react";

export function BlogCard({ blog, variant = "default" }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get the first category for display
  const primaryCategory = blog.categories?.[0]?.title || "Uncategorized";

  // Get blog slug - handle both string and object formats
  const blogSlug =
    typeof blog.slug === "string" ? blog.slug : blog.slug?.current;

  if (variant === "featured") {
    return (
      <article className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-sage-100">
        <div className="md:flex">
          {/* Featured badge */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-1 bg-brand-500 text-white px-3 py-1 rounded-full text-xs font-medium">
            <Star className="w-3 h-3" />
            Featured
          </div>

          {/* Image */}
          <div className="md:w-1/2 relative h-64 md:h-auto">
            {blog.coverImage ? (
              <Image
                src={blog.coverImage}
                alt={blog.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-sage-100 to-sage-200 flex items-center justify-center">
                <MessageCircle className="w-12 h-12 text-sage-400" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Content */}
          <div className="md:w-1/2 p-8 flex flex-col justify-between">
            <div>
              {/* Category */}
              <div className="inline-block bg-sage-100 text-sage-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                {primaryCategory}
              </div>

              {/* Title */}
              <h2 className="text-2xl md:text-3xl font-serif text-sage-800 mb-4 leading-tight group-hover:text-brand-700 transition-colors">
                <Link href={`/blogs/${blogSlug}`} className="hover:underline">
                  {blog.title}
                </Link>
              </h2>

              {/* Excerpt */}
              <p className="text-sage-600 mb-6 leading-relaxed">
                {blog.excerpt}
              </p>

              {/* Categories as tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {blog.categories?.slice(0, 3).map((category) => (
                  <span
                    key={category.slug?.current || category.title}
                    className="text-xs bg-cream-100 text-sage-600 px-2 py-1 rounded-md"
                  >
                    #{category.title}
                  </span>
                ))}
              </div>
            </div>

            {/* Meta info */}
            <div className="space-y-4">
              {/* Note: These fields don't exist in your Sanity schema yet, but keeping for UI consistency */}
              {/* You might want to add author, readTime, commentCount to your blog schema */}
              <div className="flex items-center gap-4 text-sm text-sage-500">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {blog.author || "Anonymous"}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {blog.readTime || "5"} min read
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  {blog.commentCount || "0"}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <time className="text-sm text-sage-500">
                  {formatDate(blog.publishedAt)}
                </time>

                <Link
                  href={`/blogs/${blogSlug}`}
                  className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 font-medium group/link"
                >
                  Read More
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-sage-100">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        {blog.coverImage ? (
          <Image
            src={blog.coverImage}
            alt={blog.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-sage-100 to-sage-200 flex items-center justify-center">
            <MessageCircle className="w-8 h-8 text-sage-400" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-sage-700 px-3 py-1 rounded-full text-xs font-medium">
          {primaryCategory}
        </div>

        {blog.featured && (
          <div className="absolute top-3 right-3 bg-brand-500 text-white p-1.5 rounded-full">
            <Star className="w-3 h-3" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-serif text-sage-800 mb-3 leading-tight group-hover:text-brand-700 transition-colors">
          <Link href={`/blogs/${blogSlug}`} className="hover:underline">
            {blog.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="text-sage-600 mb-4 leading-relaxed line-clamp-3">
          {blog.excerpt}
        </p>

        {/* Categories as tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {blog.categories?.slice(0, 2).map((category) => (
            <span
              key={category.slug?.current || category.title}
              className="text-xs bg-cream-100 text-sage-600 px-2 py-1 rounded-md"
            >
              #{category.title}
            </span>
          ))}
        </div>

        {/* Meta info */}
        <div className="flex items-center justify-between text-sm text-sage-500 mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <User className="w-3 h-3" />
              {blog.author || "Anonymous"}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {blog.readTime || "5"}m
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-3 h-3" />
              {blog.commentCount || "0"}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-sage-100">
          <time className="text-sm text-sage-500">
            {formatDate(blog.publishedAt)}
          </time>

          <Link
            href={`/blogs/${blogSlug}`}
            className="inline-flex items-center gap-1 text-brand-600 hover:text-brand-700 font-medium text-sm group/link"
          >
            Read More
            <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}
