// components/CommentSystem.jsx
import { Suspense } from "react";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";

function CommentListSkeleton() {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div className="h-6 bg-sage-200 rounded w-24 animate-pulse"></div>
        <div className="h-6 bg-sage-200 rounded w-16 animate-pulse"></div>
      </div>

      {/* Comment skeletons */}
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="border-b border-sage-200 last:border-b-0 pb-6 last:pb-0 mb-6 last:mb-0"
        >
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-sage-200 rounded-full animate-pulse flex-shrink-0"></div>
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-4 bg-sage-200 rounded w-20 animate-pulse"></div>
                <div className="h-3 bg-sage-200 rounded w-12 animate-pulse"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-sage-200 rounded animate-pulse"></div>
                <div className="h-4 bg-sage-200 rounded w-3/4 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function CommentSystem({ blogSlug }) {
  return (
    <section className="space-y-8" id="comments">
      {/* Section Header */}
      <div className="text-center">
        <h2 className="text-3xl font-serif font-bold text-brand-800 mb-3">
          Join the Discussion
        </h2>
        <p className="text-sage-600 max-w-2xl mx-auto">
          Share your thoughts, ask questions, and connect with other readers.
          Your perspective adds value to our community.
        </p>
      </div>

      {/* Comment Form */}
      <CommentForm blogSlug={blogSlug} />

      {/* Comments List with Suspense */}
      {/* <Suspense fallback={<CommentListSkeleton />}> */}
      {/* <CommentList blogSlug={blogSlug} /> */}
      {/* </Suspense> */}
    </section>
  );
}
