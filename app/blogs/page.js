import { Suspense } from "react";
import { BlogsHero } from "../components/blogs-page/BlogsHero";
import { BlogsSearch } from "../components/blogs-page/BlogsSearch";
import { BlogsLoading } from "../components/blogs-page/BlogsLoading";
import { BlogsList } from "../components/blogs-page/BlogsList";

export const metadata = {
  title: "Blog - Insights & Stories",
  description:
    "Discover thoughtful articles, insights, and stories crafted with care.",
  openGraph: {
    title: "Blog - Insights & Stories",
    description:
      "Discover thoughtful articles, insights, and stories crafted with care.",
    type: "website",
  },
};

export default async function BlogsPage({ searchParams }) {
  const { search, category, page = "1" } = await searchParams;

  return (
    <div className="mt-12">
      {/* Hero Section */}
      <BlogsHero />

      {/* Search and Filters */}
      <section className="py-8 border-b border-sage-200">
        <div className="container">
          <BlogsSearch initialSearch={search} initialCategory={category} />
        </div>
      </section>

      {/* Blogs Content */}
      <section className="py-12">
        <div className="container">
          <Suspense
            key={`${search}-${category}-${page}`}
            fallback={<BlogsLoading />}
          >
            <BlogsList
              search={search}
              category={category}
              page={parseInt(page)}
            />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
