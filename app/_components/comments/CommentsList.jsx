// app/_components/comments/CommentsList.jsx
import CommentItem from "./CommentItem";

export default function CommentsList({ comments, currentUserId, blogSlug }) {
  if (!comments || comments.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
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
        <h3 className="text-lg font-serif font-semibold text-sage-800 mb-2">
          No comments yet
        </h3>
        <p className="text-sage-600">
          Be the first to share your thoughts on this post.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          currentUserId={currentUserId}
          level={0}
          blogSlug={blogSlug}
        />
      ))}
    </div>
  );
}
