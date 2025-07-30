import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { builder, client } from "@/app/features/content/services/sanity-client";
import CodeBlockRenderer from "@/app/_components/CodeBlockRenderer";
import ReadingProgress from "@/app/_components/ReadingProgress";
import TableOfContentsPanel from "@/app/_components/TableOfContentsPanel";
import ConfettiCelebration from "@/app/_components/ConfettiCelebration";
import BackToTopButton from "@/app/_components/BackToTopButton";
import { Heart } from "lucide-react";
import BlogActions from "@/app/_components/blogs-page/BlogActions";
import { Suspense } from "react";
import CommentsSection from "@/app/_components/comments/CommentsSection";
import LoadingSpinner from "@/app/_components/LoadingSpinner";
// import LoadingSpinner from "@/app/components/LoadingSpinner";
// import CommentSystem from "@/app/components/CommentSystem.";
// import CommentSystem from "@/app/components/CommentSystem.";
// import { Suspense } from "react";
// import LoadingSpinner from "@/app/components/LoadingSpinner";

const portableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <figure className="my-6 sm:my-8 -mx-4 sm:mx-0">
          <div className="relative overflow-hidden rounded-none sm:rounded-2xl shadow-lg sm:shadow-xl">
            <Image
              src={builder.image(value).width(800).height(400).url()}
              alt={value.alt || "Blog image"}
              width={800}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>
          {value.caption && (
            <figcaption className="text-sm text-sage-600 text-center mt-3 px-4 sm:px-0 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    tableRich: ({ value }) => (
      <div className="overflow-x-auto my-6 sm:my-8 -mx-4 sm:mx-0">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden shadow-lg sm:rounded-xl border border-sage-200">
            <table className="min-w-full divide-y divide-sage-200">
              <tbody className="bg-cream-50 divide-y divide-sage-200">
                {value?.rows?.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="hover:bg-sage-50/50 transition-colors"
                  >
                    {row.cells.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="px-3 sm:px-6 py-3 sm:py-4 text-sm text-sage-900 align-top"
                      >
                        <PortableText
                          value={cell?.content}
                          components={portableTextComponents}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    ),
    code: ({ value }) => (
      <div className="-mx-4 sm:mx-0 my-6">
        <CodeBlockRenderer code={value.code} language={value.language} />
      </div>
    ),
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-brand-800 mb-4 sm:mb-6 mt-6 sm:mt-8 leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-brand-800 mb-3 sm:mb-5 mt-5 sm:mt-7 leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-lg sm:text-xl lg:text-2xl font-serif font-semibold text-brand-700 mb-3 sm:mb-4 mt-4 sm:mt-6 leading-tight">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-base sm:text-lg lg:text-xl font-serif font-semibold text-brand-700 mb-2 sm:mb-3 mt-3 sm:mt-5 leading-tight">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="text-base sm:text-lg leading-relaxed sm:leading-relaxed text-sage-800 mb-4 sm:mb-5">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="relative border-l-4 border-brand-400 pl-4 sm:pl-6 my-6 sm:my-8 italic text-sage-700 bg-gradient-to-r from-cream-100 to-transparent py-4 sm:py-6 rounded-r-xl -mx-4 sm:mx-0 px-4 sm:px-0">
        <div className="absolute -left-2 top-2 w-4 h-4 bg-brand-400 rounded-full opacity-20"></div>
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-none mb-4 sm:mb-6 text-sage-800 space-y-2 sm:space-y-3">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-none counter-reset-item mb-4 sm:mb-6 text-sage-800 space-y-2 sm:space-y-3">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="relative pl-6 sm:pl-8 before:content-['•'] before:absolute before:left-0 before:text-brand-500 before:font-bold before:text-lg">
        {children}
      </li>
    ),
    number: ({ children }) => (
      <li className="relative pl-6 sm:pl-8 counter-increment-item before:content-[counter(item)] before:absolute before:left-0 before:bg-brand-500 before:text-cream-50 before:text-xs before:rounded-full before:w-5 before:h-5 before:flex before:items-center before:justify-center before:font-semibold">
        {children}
      </li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-brand-800 bg-brand-50/60 px-1 rounded">
        {children}
      </strong>
    ),
    em: ({ children }) => (
      <em className="italic text-sage-700 border-b border-sage-300 border-dotted">
        {children}
      </em>
    ),
    link: ({ value, children }) => {
      const target = (value?.href || "").startsWith("http")
        ? "_blank"
        : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === "_blank" ? "noopener noreferrer" : undefined}
          className="text-brand-600 hover:text-brand-700 font-medium relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-brand-500 after:transition-all after:duration-300 hover:after:w-full"
        >
          {children}
          {target === "_blank" && (
            <svg
              className="inline w-3 h-3 ml-1 opacity-60"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </a>
      );
    },
  },
};

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { blogSlug } = await params;

  const post = await client.fetch(
    `*[_type == "blog" && slug.current == $slug][0] {
      title,
      excerpt,
      coverImage
    }`,
    { slug: blogSlug }
  );

  if (!post) {
    return {
      title: "Blog Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt || `Read ${post.title} on our blog`,
    openGraph: {
      title: post.title,
      description: post.excerpt || `Read ${post.title} on our blog`,
      images: post.coverImage
        ? [builder.image(post.coverImage).width(1200).height(630).url()]
        : [],
    },
  };
}

// The main page component (React Server Component)
export default async function BlogPostPage({ params }) {
  const { blogSlug } = await params;

  // Fetch the blog post data
  const post = await client.fetch(
    `*[_type == "blog" && slug.current == $slug][0] {
    _id,
      title,
      slug,
      publishedAt,
      excerpt,
      coverImage,
      content
    }`,
    { slug: blogSlug }
  );

  // console.log(post);
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  // Handle 404 if post not found
  if (!post) {
    notFound();
  }

  // Format the published date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-cream-50 to-sage-50/20">
      <ReadingProgress />
      <TableOfContentsPanel />
      <ConfettiCelebration blogSlug={blogSlug} />
      <BackToTopButton />

      {/* Hero Section - Mobile First */}
      <div className="relative overflow-hidden">
        {post.coverImage && (
          <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px]">
            <Image
              src={builder.image(post.coverImage).width(1200).height(500).url()}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
            {/* Enhanced gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-sage-900/80 via-sage-900/30 to-transparent" />
            {/* Decorative overlay pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-900/20 via-transparent to-sage-900/10" />
          </div>
        )}
      </div>

      <article className="container relative">
        {/* Enhanced Header - Mobile First */}
        <header
          className={`${post.coverImage ? "-mt-20 sm:-mt-32 relative z-10" : "pt-8 sm:pt-16"} mb-8 sm:mb-12`}
        >
          <div className="bg-cream-50/95 backdrop-blur-md rounded-t-3xl sm:rounded-3xl p-4 sm:p-8 md:p-12 shadow-2xl border border-sage-200/50 relative overflow-hidden">
            {/* -------------------------------- */}
            <Suspense
              fallback={
                <div className="flex gap-4 bottom-0 left-0">
                  <div className="flex items-center gap-2">
                    <div className="px-3 py-2 rounded-full bg-gray-200 animate-pulse flex items-center gap-1">
                      <div className="w-4 h-4 bg-gray-300 rounded-full" />
                      <div className="w-6 h-4 bg-gray-300 rounded" />
                    </div>
                  </div>
                </div>
              }
              key={post._id}
            >
              <BlogActions blogId={post._id} blogSlug={blogSlug} />
            </Suspense>
            {/* -------------------------------- */}
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-brand-100/40 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-sage-100/40 to-transparent rounded-full translate-y-12 -translate-x-12"></div>

            <div className="relative text-center max-w-4xl mx-auto">
              {/* Date with enhanced styling */}
              <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-700 font-semibold text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6 border border-brand-200">
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
                <time dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </time>
              </div>

              {/* Enhanced title with better mobile scaling */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-brand-800 mb-4 sm:mb-6 leading-tight tracking-tight">
                {post.title}
              </h1>

              {/* Enhanced excerpt */}
              {post.excerpt && (
                <div className="relative">
                  <p className="text-base sm:text-lg lg:text-xl text-sage-700 leading-relaxed max-w-3xl mx-auto px-2 sm:px-0">
                    {post.excerpt}
                  </p>
                  {/* Subtle decorative line */}
                  <div className="w-16 h-1 bg-gradient-to-r from-brand-400 to-sage-400 rounded-full mx-auto mt-4 sm:mt-6"></div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Enhanced Content Container - Mobile First */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-cream-50/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl border border-sage-200/40 overflow-hidden relative">
            {/* Subtle top accent */}
            <div className="h-1 bg-gradient-to-r from-brand-400 via-sage-400 to-brand-400"></div>

            <div className="p-4 sm:p-8 md:p-12">
              {/* Enhanced typography container */}
              <div className="prose prose-base sm:prose-lg max-w-none prose-headings:font-serif prose-headings:text-brand-800">
                <PortableText
                  value={post.content}
                  components={portableTextComponents}
                />
              </div>
            </div>
          </div>

          {/* Enhanced Footer Navigation - Mobile First */}
          <div className="mt-8 sm:mt-16 mb-8 sm:mb-12">
            <div className="bg-gradient-to-r from-sage-50 to-cream-50 rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-sage-200/60 shadow-lg">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
                <Link
                  href="/blogs"
                  className="group inline-flex items-center gap-2 bg-sage-500 hover:bg-sage-600 text-cream-50 font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 w-full sm:w-auto justify-center sm:justify-start"
                >
                  <svg
                    className="w-4 h-4 transition-transform group-hover:-translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Back to Blogs
                </Link>

                {/* Social sharing hint */}
                <div className="flex items-center gap-2 text-sage-600 text-sm">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                  </svg>
                  <span className="hidden sm:inline">Share this article</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      <Suspense
        fallback={<LoadingSpinner size="lg" text="Loading Comments..." />}
        key={post._id}
      >
        <CommentsSection postId={post._id} blogSlug={blogSlug} />
      </Suspense>
    </div>
  );
}
