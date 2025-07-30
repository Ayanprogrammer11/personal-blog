"use client";

// app/_components/comments/EditCommentForm.jsx
import { useState, useRef, useEffect } from "react";
import { updateComment } from "@/app/features/interaction/actions/comment-actions";
import { Save, X } from "lucide-react";

export default function EditCommentForm({
  comment,
  onCancel,
  onSuccess,
  blogSlug,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [content, setContent] = useState(comment.content);
  const textareaRef = useRef(null);

  useEffect(() => {
    // Focus and select all text when editing starts
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("content", content);

      await updateComment(comment.id, formData, blogSlug);
      onSuccess();
    } catch (err) {
      setError(err.message || "Failed to update comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setContent(comment.content); // Reset to original content
    setError("");
    onCancel();
  };

  return (
    <div className="bg-cream-100 border border-brand-200 rounded-lg p-4">
      <div className="mb-3">
        <h4 className="text-sm font-medium text-brand-800 mb-1">
          Edit Comment
        </h4>
        <p className="text-xs text-sage-600">
          Make your changes and save to update your comment.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            maxLength={2000}
            className={`w-full px-3 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all duration-200 text-sm ${
              error ? "border-red-300 bg-red-50" : "border-sage-300 bg-white"
            }`}
            disabled={isSubmitting}
          />
          <div className="absolute bottom-2 right-2 text-xs text-sage-500">
            {content.length}/2000
          </div>
        </div>

        {error && (
          <div className="text-red-600 text-xs bg-red-50 border border-red-200 rounded px-2 py-1">
            {error}
          </div>
        )}

        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={handleCancel}
            className="px-3 py-1.5 text-xs font-medium text-sage-600 hover:text-sage-800 hover:bg-sage-100 rounded-lg transition-colors duration-200"
            disabled={isSubmitting}
          >
            <X className="w-3 h-3 inline mr-1" />
            Cancel
          </button>

          <button
            type="submit"
            disabled={
              isSubmitting || !content.trim() || content === comment.content
            }
            className="px-3 py-1.5 text-xs font-medium bg-brand-500 text-cream-50 hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors duration-200 flex items-center gap-1"
          >
            {isSubmitting ? (
              <>
                <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-3 h-3" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
