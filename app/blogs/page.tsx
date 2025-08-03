import { Suspense } from "react";
import { BlogsHero } from "../_components/blogs-page/BlogsHero";
import { BlogsSearch } from "../_components/blogs-page/BlogsSearch";
import { BlogsLoading } from "../_components/blogs-page/BlogsLoading";
import { BlogsList } from "../_components/blogs-page/BlogsList";
import type { Metadata } from "next";

export const metadata: Metadata = {
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

type BlogsPageProps = {
  searchParams: {
    search?: string;
    category?: string;
    page?: string;
  };
};

export default function BlogsPage({
  searchParams,
}: {
  searchParams: { search?: string; category?: string; page?: string };
}) {
  const search = searchParams.search || "";
  const category = searchParams.category || "All";
  const page = searchParams.page || "1";

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
