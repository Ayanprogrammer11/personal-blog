import { client } from "@/app/sanity/client";
import { PortableText } from "@portabletext/react";

const BLOG_QUERY = `*[_type == "blog" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  coverImage {
    asset -> {
      url
    }
  },
  content
}`;

export default async function Page({ params }) {
  const blog = await client.fetch(BLOG_QUERY, { slug: params.blogSlug });

  return (
    <div className="">
      <BlogContent content={blog.content} />;
    </div>
  );
}

function BlogContent({ content }) {
  return (
    <PortableText
      value={content}
      components={{
        block: {
          h1: ({ children }) => (
            <h1 className="mb-8 mt-12 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-4xl font-bold leading-tight text-transparent first:mt-0 lg:text-5xl">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="relative mb-6 mt-16 text-2xl font-bold text-gray-100 first:mt-8 lg:text-3xl">
              <span className="relative z-10">{children}</span>
              <div className="absolute -left-4 bottom-0 top-0 w-1 rounded-full bg-gradient-to-b from-purple-500 to-blue-500"></div>
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mb-4 mt-12 text-xl font-semibold text-gray-200 lg:text-2xl">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="mb-3 mt-8 text-lg font-semibold text-gray-300">
              {children}
            </h4>
          ),
          normal: ({ children }) => (
            <p className="mb-6 text-base leading-[1.75] text-gray-300 lg:text-lg">
              {children}
            </p>
          ),
          blockquote: ({ children }) => (
            <blockquote className="relative my-8">
              <div className="absolute -left-6 -top-2 font-serif text-6xl leading-none text-purple-500/30">
                &quot;
              </div>
              <div className="ml-4 rounded-r-lg border-l-4 border-purple-500 bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-6">
                <div className="text-lg font-medium italic leading-relaxed text-gray-200">
                  {children}
                </div>
              </div>
            </blockquote>
          ),
        },
        list: {
          bullet: ({ children }) => (
            <ul className="my-6 space-y-3 pl-6">{children}</ul>
          ),
          number: ({ children }) => (
            <ol className="my-6 list-outside list-decimal space-y-3 pl-6">
              {children}
            </ol>
          ),
        },
        listItem: {
          bullet: ({ children }) => (
            <li className="relative leading-relaxed text-gray-300">
              <span className="absolute -left-6 top-2 h-2 w-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"></span>
              {children}
            </li>
          ),
          number: ({ children }) => (
            <li className="leading-relaxed text-gray-300 marker:font-bold marker:text-purple-400">
              {children}
            </li>
          ),
        },
        marks: {
          strong: ({ children }) => (
            <strong className="bg-gradient-to-r from-white to-gray-200 bg-clip-text font-semibold text-transparent text-white">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="font-medium italic text-gray-200">{children}</em>
          ),
          code: ({ children }) => (
            <code className="mx-1 rounded border border-gray-700/50 bg-gray-800/80 px-2 py-1 font-mono text-sm text-purple-300">
              {children}
            </code>
          ),
          link: ({ children, value }) => (
            <a
              href={value.href}
              target={value.blank ? "_blank" : undefined}
              rel={value.blank ? "noopener noreferrer" : undefined}
              className="font-medium text-blue-400 underline decoration-blue-500/50 decoration-2 underline-offset-2 transition-all duration-300 hover:text-blue-300 hover:decoration-blue-400"
            >
              {children}
            </a>
          ),
        },
        types: {
          // Enhanced image component
          image: ({ value }) => (
            <figure className="group my-12">
              <div className="relative overflow-hidden rounded-xl border border-white/10 bg-gray-900/50 p-2">
                <img
                  src={value.asset.url}
                  alt={value.alt || "Blog image"}
                  className="h-auto w-full rounded-lg transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-2 rounded-lg bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </div>
              {value.caption && (
                <figcaption className="mt-4 text-center text-sm italic text-gray-500">
                  {value.caption}
                </figcaption>
              )}
            </figure>
          ),

          // Code blocks
          code: ({ value }) => (
            <div className="group my-8">
              <div className="overflow-hidden rounded-xl border border-gray-700/50 bg-gray-900/80 backdrop-blur-sm">
                {value.language && (
                  <div className="flex items-center justify-between border-b border-gray-700/50 bg-gray-800/50 px-4 py-2">
                    <span className="font-mono text-sm text-gray-400">
                      {value.language}
                    </span>
                    <button className="text-gray-500 transition-colors hover:text-gray-300">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    </button>
                  </div>
                )}
                <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
                  <code className="font-mono text-gray-300">{value.code}</code>
                </pre>
              </div>
            </div>
          ),

          // Video embeds
          video: ({ value }) => (
            <div className="my-12">
              <div className="relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-gray-900/50">
                <video
                  src={value.asset.url}
                  controls
                  className="h-full w-full object-cover"
                  poster={value.poster?.asset?.url}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
              {value.caption && (
                <p className="mt-4 text-center text-sm italic text-gray-500">
                  {value.caption}
                </p>
              )}
            </div>
          ),

          // Callout/Alert boxes
          callout: ({ value }) => (
            <div
              className={`my-8 p-6 rounded-xl border-l-4 ${
                value.type === "warning"
                  ? "bg-yellow-500/10 border-yellow-500 text-yellow-200"
                  : value.type === "error"
                    ? "bg-red-500/10 border-red-500 text-red-200"
                    : value.type === "success"
                      ? "bg-green-500/10 border-green-500 text-green-200"
                      : "bg-blue-500/10 border-blue-500 text-blue-200"
              }`}
            >
              <div className="flex items-start space-x-3">
                <div
                  className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                    value.type === "warning"
                      ? "bg-yellow-500"
                      : value.type === "error"
                        ? "bg-red-500"
                        : value.type === "success"
                          ? "bg-green-500"
                          : "bg-blue-500"
                  }`}
                >
                  <span className="text-sm font-bold text-white">!</span>
                </div>
                <div className="flex-1">
                  {value.title && (
                    <h4 className="mb-2 font-semibold">{value.title}</h4>
                  )}
                  <div className="text-sm leading-relaxed opacity-90">
                    <PortableText value={value.content} />
                  </div>
                </div>
              </div>
            </div>
          ),

          // Separator/Divider
          separator: () => (
            <div className="my-16 flex items-center justify-center">
              <div className="flex items-center space-x-4">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-gray-600"></div>
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"></div>
                <div className="h-px w-8 bg-gray-600"></div>
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-gray-600"></div>
              </div>
            </div>
          ),
        },
      }}
    />
  );
}
