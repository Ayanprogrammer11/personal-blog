// components/blogs/BlogsSearch.tsx
"use client";

import { useState, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search, Filter, X } from "lucide-react";
import LoadingSpinner from "../LoadingSpinner";

const categories = [
  "All",
  "Technology",
  "Design",
  "Lifestyle",
  "Business",
  "Health",
  "Travel",
  "Food",
  "Culture",
  "Science",
  "Art",
  "Education",
];

export function BlogsSearch({ initialSearch = "", initialCategory = "All" }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [showFilters, setShowFilters] = useState(false);

  const updateUrl = (newSearch, newCategory) => {
    const params = new URLSearchParams(searchParams);

    if (newSearch) {
      params.set("search", newSearch);
    } else {
      params.delete("search");
    }

    if (newCategory && newCategory !== "All") {
      params.set("category", newCategory);
    } else {
      params.delete("category");
    }

    params.delete("page"); // Reset to first page

    const queryString = params.toString();
    const url = queryString ? `${pathname}?${queryString}` : pathname;

    startTransition(() => {
      router.push(url);
    });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateUrl(search, selectedCategory);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    updateUrl(search, category);
    setShowFilters(false);
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("All");
    updateUrl("", "All");
  };

  const hasActiveFilters = search || selectedCategory !== "All";

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-sage-400" />
          <input
            type="text"
            placeholder="Search articles, topics, or keywords..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-sage-200 rounded-2xl text-sage-800 placeholder-sage-400 focus:border-brand-400 focus:outline-none transition-colors text-lg"
          />
          {isPending && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <LoadingSpinner size="md" showText={false} />
            </div>
          )}
        </div>
      </form>

      {/* Filters Row */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-sage-100 hover:bg-sage-200 text-sage-700 rounded-xl transition-colors"
          >
            <Filter className="w-4 h-4" />
            Categories
          </button>

          {selectedCategory !== "All" && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-brand-100 text-brand-700 rounded-lg text-sm">
              {selectedCategory}
              <button
                onClick={() => handleCategorySelect("All")}
                className="ml-1 hover:bg-brand-200 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-sage-500 hover:text-sage-700 transition-colors"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Category Filters */}
      {showFilters && (
        <div className="bg-white p-6 rounded-2xl border border-sage-200 shadow-sm">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategorySelect(category)}
                className={`
                  px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${
                    selectedCategory === category
                      ? "bg-brand-500 text-white shadow-md"
                      : "bg-sage-50 text-sage-700 hover:bg-sage-100"
                  }
                `}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
