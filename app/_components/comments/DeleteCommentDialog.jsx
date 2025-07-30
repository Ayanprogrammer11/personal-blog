"use client";

// app/_components/comments/DeleteCommentDialog.jsx
import { useState } from "react";
import { deleteComment } from "../../_lib/actions/comment-actions";
import { Trash2, AlertTriangle, X } from "lucide-react";

export default function DeleteCommentDialog({ comment, onCancel }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setIsDeleting(true);
    setError("");

    try {
      await deleteComment(comment.id);
      onCancel(); // Close dialog
    } catch (err) {
      setError(err.message || "Failed to delete comment");
    } finally {
      setIsDeleting(false);
    }
  };

  const hasReplies = comment.replies && comment.replies.length > 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-sage-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <h3 className="text-lg font-serif font-semibold text-sage-900">
              Delete Comment
            </h3>
          </div>
          <button
            onClick={onCancel}
            className="text-sage-400 hover:text-sage-600 transition-colors"
            disabled={isDeleting}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-sage-700 mb-4">
            Are you sure you want to delete this comment? This action cannot be
            undone.
          </p>

          {hasReplies && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-amber-800 mb-1">
                    This comment has replies
                  </p>
                  <p className="text-xs text-amber-700">
                    Deleting this comment will also delete all{" "}
                    {comment.replies.length}{" "}
                    {comment.replies.length === 1 ? "reply" : "replies"}.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Comment Preview */}
          <div className="bg-sage-50 border border-sage-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-sage-800 line-clamp-3">
              {comment.content}
            </p>
          </div>

          {error && (
            <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-4">
              {error}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-sage-200">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sage-600 hover:text-sage-800 hover:bg-sage-100 rounded-lg transition-colors duration-200 font-medium"
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors duration-200 font-medium flex items-center gap-2"
          >
            {isDeleting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                Delete Comment
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
