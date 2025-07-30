// app/_components/comments/CommentItem.jsx
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import CommentActions from "./CommentActions";

export default function CommentItem({ comment, currentUserId, level = 0, blogSlug }) {
  const isOwner = currentUserId === comment.userId;
  const hasReplies = comment.replies && comment.replies.length > 0;
  const maxNestingLevel = 3; // Limit nesting to prevent infinite depth
  const shouldNest = level < maxNestingLevel;

  const timeAgo = formatDistanceToNow(new Date(comment.createdAt), {
    addSuffix: true,
  });

  const wasEdited =
    comment.updatedAt &&
    new Date(comment.updatedAt).getTime() !==
      new Date(comment.createdAt).getTime();

  return (
    <div className={`group ${level > 0 ? "ml-8 mt-4" : ""}`}>
      {/* Main Comment */}
      <div
        className={`card hover:shadow-lg transition-all duration-200 ${
          level === 0
            ? "border-l-4 border-l-brand-200"
            : "border-l-2 border-l-sage-200 bg-sage-50/50"
        }`}
      >
        <div className="flex gap-3">
          {/* Avatar */}
          <div className="flex-shrink-0">
            {comment.user.image ? (
              <Image
                src={comment.user.image}
                alt={comment.user.name || "User avatar"}
                width={40}
                height={40}
                className="rounded-full ring-2 ring-sage-200"
              />
            ) : (
              <div className="w-10 h-10 bg-brand-400 rounded-full flex items-center justify-center ring-2 ring-sage-200">
                <span className="text-cream-50 font-semibold text-sm">
                  {comment.user.name?.charAt(0)?.toUpperCase() || "U"}
                </span>
              </div>
            )}
          </div>

          {/* Comment Content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-center wrap gap-2 mb-2">
              <h4 className="font-semibold text-sage-900 text-sm">
                {comment.user.name || "Anonymous User"}
              </h4>
              <span className="text-sage-500 text-xs">•</span>
              <time
                className="text-sage-500 text-xs"
                dateTime={comment.createdAt}
              >
                {timeAgo}
              </time>
              {wasEdited && (
                <>
                  <span className="text-sage-500 text-xs">•</span>
                  <span className="text-sage-500 text-xs italic">edited</span>
                </>
              )}
            </div>

            {/* Comment Text */}
            <div className="prose prose-sm max-w-none mb-3">
              <p className="text-sage-800 leading-relaxed whitespace-pre-wrap break-words">
                {comment.content}
              </p>
            </div>

            {/* Actions */}
            <CommentActions
              comment={comment}
              isOwner={isOwner}
              currentUserId={currentUserId}
              canReply={shouldNest}
              blogSlug={blogSlug}
            />
          </div>
        </div>
      </div>

      {/* Replies */}
      {hasReplies && shouldNest && (
        <div className="mt-4 space-y-4">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              currentUserId={currentUserId}
              level={level + 1}
            />
          ))}
        </div>
      )}

      {/* Show "View more replies" if we hit max nesting */}
      {hasReplies && !shouldNest && (
        <div className="mt-4 ml-8">
          <button className="text-brand-600 hover:text-brand-700 text-sm font-medium flex items-center gap-1">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5-5 5M6 12h12"
              />
            </svg>
            View {comment.replies.length}{" "}
            {comment.replies.length === 1 ? "reply" : "replies"}
          </button>
        </div>
      )}
    </div>
  );
}
