"use client";

// app/_components/comments/CommentForm.jsx
import { useState, useRef } from "react";
import { createComment } from "../../_lib/actions/comment-actions";
import { Send, X } from "lucide-react";

export default function CommentForm({
  postId,
  parentId = null,
  placeholder = "Share your thoughts...",
  onCancel = null,
  autoFocus = false,
  className = "",
  blogSlug,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [content, setContent] = useState("");
  const formRef = useRef(null);
  const textareaRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("content", content);
      formData.append("postId", postId);
      if (parentId) formData.append("parentId", parentId);

      await createComment(formData, blogSlug);
      setContent("");

      if (onCancel) {
        onCancel(); // Close reply form
      }
    } catch (err) {
      setError(err.message || "Failed to post comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setContent("");
    setError("");
    if (onCancel) onCancel();
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={`space-y-4 ${className}`}
    >
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          rows={parentId ? 3 : 4}
          maxLength={2000}
          className={`w-full px-4 py-3 border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all duration-200 ${
            error ? "border-red-300 bg-red-50" : "border-sage-300 bg-white"
          }`}
          disabled={isSubmitting}
        />
        <div className="absolute bottom-3 right-3 text-xs text-sage-500">
          {content.length}/2000
        </div>
      </div>

      {error && (
        <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {error}
        </div>
      )}

      <div className="flex items-center justify-between gap-3">
        <div className="text-sm text-sage-600">
          {parentId ? "Replying to comment" : "New comment"}
        </div>

        <div className="flex items-center gap-2">
          {onCancel && (
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 text-sage-600 hover:text-sage-800 hover:bg-sage-100 rounded-lg transition-colors duration-200 text-sm font-medium"
              disabled={isSubmitting}
            >
              <X className="w-4 h-4 inline mr-1" />
              Cancel
            </button>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !content.trim()}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Posting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                {parentId ? "Reply" : "Post Comment"}
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
