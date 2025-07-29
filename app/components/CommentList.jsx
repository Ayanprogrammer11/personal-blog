// components/CommentList.jsx
import { getComments } from "@/app/_lib/actions/comments";
import { formatDistanceToNow } from "date-fns";

function formatTimeAgo(dateString) {
  try {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  } catch (error) {
    return "Recently";
  }
}

function CommentItem({ comment }) {
  return (
    <div className="border-b border-sage-200 last:border-b-0 pb-6 last:pb-0 mb-6 last:mb-0">
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          {comment.profileImage ? (
            <img
              src={comment.profileImage}
              alt={comment.name}
              className="w-10 h-10 rounded-full border-2 border-sage-200"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-brand-200 border-2 border-sage-200 flex items-center justify-center">
              <span className="text-brand-700 font-semibold text-sm">
                {comment.name?.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-semibold text-sage-900 text-sm">
              {comment.name}
            </h4>
            <span className="text-sage-500 text-xs">•</span>
            <time className="text-sage-500 text-xs">
              {formatTimeAgo(comment.createdAt)}
            </time>
          </div>

          <div className="prose prose-sm max-w-none">
            <p className="text-sage-800 leading-relaxed whitespace-pre-wrap break-words">
              {comment.comment}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyComments() {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-sage-100 flex items-center justify-center">
        <svg
          className="w-8 h-8 text-sage-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-sage-900 mb-2">
        No comments yet
      </h3>
      <p className="text-sage-600">
        Be the first to share your thoughts on this post!
      </p>
    </div>
  );
}

export default async function CommentList({ blogSlug }) {
  const result = await getComments(blogSlug);
  await new Promise((res) => setTimeout(res, 20000));

  if (!result.success) {
    return (
      <div className="card border-red-200 bg-red-50">
        <div className="text-center py-8">
          <p className="text-red-800">Failed to load comments</p>
          <p className="text-red-600 text-sm mt-1">
            Please refresh the page to try again
          </p>
        </div>
      </div>
    );
  }

  const comments = result.data;

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-serif font-semibold text-brand-800">
          Comments
        </h3>
        <span className="text-sm text-sage-600 bg-sage-100 px-3 py-1 rounded-full">
          {comments.length} {comments.length === 1 ? "comment" : "comments"}
        </span>
      </div>

      {comments.length === 0 ? (
        <EmptyComments />
      ) : (
        <div className="space-y-0">
          {comments.map((comment) => (
            <CommentItem key={comment._id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
}
