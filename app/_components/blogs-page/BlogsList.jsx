import { MessageCircle } from "lucide-react";
import { getBlogs } from "../../_lib/data-blogs";
import { BlogCard } from "./BlogCard";
import { BlogsPagination } from "./BlogsPagination";

export async function BlogsList({ search, category, page }) {
  const { blogs, pagination } = await getBlogs({
    search,
    category,
    page,
  });

  if (blogs.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageCircle className="w-8 h-8 text-sage-400" />
        </div>
        <h3 className="text-xl font-serif text-sage-700 mb-2">
          No articles found
        </h3>
        <p className="text-sage-500 max-w-md mx-auto">
          Try adjusting your search terms or browse different categories to
          discover more content.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Results header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-serif text-sage-800 mb-1">
            {search || (category && category !== "All")
              ? "Search Results"
              : "Latest Articles"}
          </h2>
          <p className="text-sage-600">
            {pagination.totalPosts} article
            {pagination.totalPosts !== 1 ? "s" : ""} found
            {search && ` for "${search}"`}
            {category && category !== "All" && ` in ${category}`}
          </p>
        </div>

        <div className="text-sm text-sage-500">
          Page {pagination.currentPage} of {pagination.totalPages}
        </div>
      </div>

      {/* Featured article (if on first page and no filters) */}
      {page === 1 &&
        !search &&
        (!category || category === "All") &&
        blogs.some((blog) => blog.featured) && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 bg-brand-500 rounded-full"></div>
              <span className="text-sm font-medium text-brand-600 uppercase tracking-wide">
                Featured Article
              </span>
            </div>
            {blogs
              .filter((blog) => blog.featured)
              .slice(0, 1)
              .map((blog) => (
                <BlogCard key={blog._id} blog={blog} variant="featured" />
              ))}
          </div>
        )}

      {/* Articles grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogs
          .filter((blog) =>
            page === 1 && !search && (!category || category === "All")
              ? !blog.featured
              : true
          )
          .map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <BlogsPagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          search={search}
          category={category}
        />
      )}
    </div>
  );
}
