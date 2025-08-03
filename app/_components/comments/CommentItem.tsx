"use client";

import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import CommentActions from "./CommentActions";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";

export default function CommentItem({
  comment,
  currentUserId,
  level = 0,
}: {
  comment: Doc<"comments">;
  currentUserId?: string;
  level?: number;
}) {
  const user = useQuery(api.users.getUser, { id: comment.userId as Id<"users"> });
  const replies = useQuery(api.comments.getComments, { postId: comment.postId });

  const isOwner = currentUserId === comment.userId;
  const hasReplies = replies && replies.length > 0;
  const maxNestingLevel = 3; // Limit nesting to prevent infinite depth
  const shouldNest = level < maxNestingLevel;

  const timeAgo = formatDistanceToNow(new Date(comment._creationTime), {
    addSuffix: true,
  });

  const wasEdited =
    comment._creationTime &&
    new Date(comment._creationTime).getTime() !==
      new Date(comment._creationTime).getTime();

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
            {user?.image ? (
              <Image
                src={user.image}
                alt={user.name || "User avatar"}
                width={40}
                height={40}
                className="rounded-full ring-2 ring-sage-200"
              />
            ) : (
              <div className="w-10 h-10 bg-brand-400 rounded-full flex items-center justify-center ring-2 ring-sage-200">
                <span className="text-cream-50 font-semibold text-sm">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </span>
              </div>
            )}
          </div>

          {/* Comment Content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-center wrap gap-2 mb-2">
              <h4 className="font-semibold text-sage-900 text-sm">
                {user?.name || "Anonymous User"}
              </h4>
              <span className="text-sage-500 text-xs">•</span>
              <time
                className="text-sage-500 text-xs"
                dateTime={String(comment._creationTime)}
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
            />
          </div>
        </div>
      </div>

      {/* Replies */}
      {hasReplies && shouldNest && (
        <div className="mt-4 space-y-4">
          {replies
            .filter((reply) => reply.parentId === comment._id)
            .map((reply) => (
              <CommentItem
                key={reply._id}
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
            View {replies.length}{" "}
            {replies.length === 1 ? "reply" : "replies"}
          </button>
        </div>
      )}
    </div>
  );
}
