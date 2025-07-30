// BlogCard.jsx
import Image from "next/image";
import { urlFor } from "../sanity/client";

export default function BlogCard({ blog }) {
  const { slug, title, publishedAt, excerpt, coverImage, categories } = blog;
  const imageUrl = coverImage
    ? urlFor(coverImage).width(800).height(500).url()
    : null;
  const lqip = coverImage?.asset?.metadata?.lqip;

  return (
    <article className="relative h-full overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 group-hover:border-white/20 group-hover:shadow-lg">
      {/* Image with LQIP placeholder */}
      {imageUrl && (
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            placeholder={lqip ? "blur" : "empty"}
            blurDataURL={lqip}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="p-5">
        {/* Categories */}
        {categories?.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {categories.map((category) => (
              <span
                key={category.title}
                className="rounded-full px-3 py-1 text-xs font-medium"
                style={{
                  backgroundColor: `${category.color}20`,
                  color: category.color,
                }}
              >
                {category.title}
              </span>
            ))}
          </div>
        )}

        {/* Date */}
        {publishedAt && (
          <time
            dateTime={publishedAt}
            className="mb-2 block text-sm text-gray-400"
          >
            {new Date(publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        )}

        {/* Title */}
        <h2 className="mb-3 text-xl font-bold text-white transition-colors group-hover:text-blue-400">
          {title}
        </h2>

        {/* Excerpt */}
        {excerpt && <p className="line-clamp-3 text-gray-300">{excerpt}</p>}

        {/* Read more indicator */}
        <div className="mt-4 flex items-center text-sm font-medium text-blue-400 opacity-0 transition-opacity group-hover:opacity-100">
          Read more
          <svg
            className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </article>
  );
}
