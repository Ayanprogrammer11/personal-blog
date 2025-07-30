// app/_components/comments/CommentsSection.jsx
import { Suspense } from "react";
import { auth } from "../../_lib/auth";
import {
  getComments,
  getCommentCount,
  createComment,
} from "@/app/features/interaction/actions/comment-actions";

import CommentsList from "./CommentsList";
import { MessageCircle, Users } from "lucide-react";
import CommentForm from "./CommentForm";

export default async function CommentsSection({ postId, blogSlug }) {
  const [session, comments, commentCount] = await Promise.all([
    auth(),
    getComments(postId),
    getCommentCount(postId),
  ]);

  return (
    <section className="mt-16 border-t border-sage-200 pt-12 max-w-7xl mx-auto m-4">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-2 text-brand-600">
            <MessageCircle className="w-6 h-6" />
            <h2 className="text-2xl font-serif font-bold text-brand-800">
              Comments
            </h2>
          </div>
          {commentCount > 0 && (
            <div className="flex items-center gap-1 text-sage-600 text-sm">
              <Users className="w-4 h-4" />
              <span>
                {commentCount} {commentCount === 1 ? "comment" : "comments"}
              </span>
            </div>
          )}
        </div>

        <p className="text-sage-600 text-sm mb-6">
          Share your thoughts and join the conversation. All comments are
          moderated.
        </p>

        {session?.user ? (
          <CommentForm postId={postId} />
        ) : (
          <div className="card border-brand-200 bg-brand-50">
            <div className="text-center py-6">
              <MessageCircle className="w-12 h-12 text-brand-400 mx-auto mb-3" />
              <h3 className="text-lg font-serif font-semibold text-brand-800 mb-2">
                Join the conversation
              </h3>
              <p className="text-sage-700 mb-4">
                Sign in to share your thoughts and connect with other readers.
              </p>
              <a
                href="/subscribe"
                className="btn-primary inline-flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                Sign In to Comment
              </a>
            </div>
          </div>
        )}
      </div>

      <Suspense fallback={<CommentsLoadingSkeleton />}>
        <CommentsList
          comments={comments}
          currentUserId={session?.user?.id}
          blogSlug={blogSlug}
        />
      </Suspense>
    </section>
  );
}

function CommentsLoadingSkeleton() {
  return (
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="card animate-pulse">
          <div className="flex gap-3">
            <div className="w-10 h-10 bg-sage-200 rounded-full flex-shrink-0"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-sage-200 rounded w-1/4"></div>
              <div className="space-y-2">
                <div className="h-3 bg-sage-200 rounded"></div>
                <div className="h-3 bg-sage-200 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
