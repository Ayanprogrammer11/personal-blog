// components/blogs/BlogsPagination.tsx
"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

export function BlogsPagination({ currentPage, totalPages, search, category }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageUrl = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());

    if (search) params.set("search", search);
    if (category && category !== "All") params.set("category", category);

    return `${pathname}?${params.toString()}`;
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      router.push(createPageUrl(page));
    }
  };

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "dots1");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("dots2", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;

  return (
    <nav
      className="flex items-center justify-center space-x-2"
      aria-label="Pagination"
    >
      {/* Previous button */}
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200
          ${
            currentPage === 1
              ? "bg-sage-100 text-sage-400 cursor-not-allowed"
              : "bg-white text-sage-700 hover:bg-sage-50 hover:text-brand-600 shadow-sm border border-sage-200"
          }
        `}
        aria-label="Go to previous page"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Previous</span>
      </button>

      {/* Page numbers */}
      <div className="flex items-center space-x-1">
        {getVisiblePages().map((page, index) => {
          if (page === "dots1" || page === "dots2") {
            return (
              <div key={page} className="px-2 py-2 text-sage-400">
                <MoreHorizontal className="w-4 h-4" />
              </div>
            );
          }

          const pageNumber = page;
          const isActive = pageNumber === currentPage;

          return (
            <button
              key={pageNumber}
              onClick={() => goToPage(pageNumber)}
              className={`
                px-4 py-2 rounded-xl font-medium transition-all duration-200 min-w-[2.5rem]
                ${
                  isActive
                    ? "bg-brand-500 text-white shadow-md"
                    : "bg-white text-sage-700 hover:bg-sage-50 hover:text-brand-600 shadow-sm border border-sage-200"
                }
              `}
              aria-label={`Go to page ${pageNumber}`}
              aria-current={isActive ? "page" : undefined}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>

      {/* Next button */}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200
          ${
            currentPage === totalPages
              ? "bg-sage-100 text-sage-400 cursor-not-allowed"
              : "bg-white text-sage-700 hover:bg-sage-50 hover:text-brand-600 shadow-sm border border-sage-200"
          }
        `}
        aria-label="Go to next page"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Page info */}
      <div className="hidden md:flex items-center ml-6 text-sm text-sage-500">
        Page {currentPage} of {totalPages}
      </div>
    </nav>
  );
}
