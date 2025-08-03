// components/blogs/BlogsLoading.tsx
export function BlogsLoading() {
  return (
    <div className="space-y-12">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-8 bg-sage-200 rounded-lg w-48 animate-pulse"></div>
          <div className="h-4 bg-sage-100 rounded w-32 animate-pulse"></div>
        </div>
        <div className="h-4 bg-sage-100 rounded w-24 animate-pulse"></div>
      </div>

      {/* Featured article skeleton */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-sage-100 animate-pulse">
        <div className="md:flex">
          <div className="md:w-1/2 h-64 md:h-80 bg-sage-200"></div>
          <div className="md:w-1/2 p-8 space-y-4">
            <div className="h-6 bg-sage-200 rounded-full w-20"></div>
            <div className="space-y-2">
              <div className="h-8 bg-sage-200 rounded w-full"></div>
              <div className="h-8 bg-sage-200 rounded w-3/4"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-sage-100 rounded w-full"></div>
              <div className="h-4 bg-sage-100 rounded w-full"></div>
              <div className="h-4 bg-sage-100 rounded w-2/3"></div>
            </div>
            <div className="flex gap-2">
              <div className="h-6 bg-sage-100 rounded w-16"></div>
              <div className="h-6 bg-sage-100 rounded w-20"></div>
              <div className="h-6 bg-sage-100 rounded w-18"></div>
            </div>
            <div className="flex items-center justify-between pt-4">
              <div className="flex gap-4">
                <div className="h-4 bg-sage-100 rounded w-20"></div>
                <div className="h-4 bg-sage-100 rounded w-16"></div>
                <div className="h-4 bg-sage-100 rounded w-12"></div>
              </div>
              <div className="h-4 bg-sage-100 rounded w-20"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid skeleton */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl overflow-hidden shadow-md border border-sage-100 animate-pulse"
          >
            <div className="h-48 bg-sage-200"></div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <div className="h-6 bg-sage-200 rounded w-full"></div>
                <div className="h-6 bg-sage-200 rounded w-3/4"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-sage-100 rounded w-full"></div>
                <div className="h-4 bg-sage-100 rounded w-full"></div>
                <div className="h-4 bg-sage-100 rounded w-2/3"></div>
              </div>
              <div className="flex gap-2">
                <div className="h-5 bg-sage-100 rounded w-16"></div>
                <div className="h-5 bg-sage-100 rounded w-20"></div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-3">
                  <div className="h-4 bg-sage-100 rounded w-16"></div>
                  <div className="h-4 bg-sage-100 rounded w-12"></div>
                  <div className="h-4 bg-sage-100 rounded w-8"></div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-sage-100">
                <div className="h-4 bg-sage-100 rounded w-24"></div>
                <div className="h-4 bg-sage-100 rounded w-20"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination skeleton */}
      <div className="flex items-center justify-center space-x-2">
        <div className="h-10 bg-sage-100 rounded-xl w-24 animate-pulse"></div>
        <div className="flex space-x-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-10 w-10 bg-sage-100 rounded-xl animate-pulse"
            ></div>
          ))}
        </div>
        <div className="h-10 bg-sage-100 rounded-xl w-20 animate-pulse"></div>
      </div>
    </div>
  );
}
