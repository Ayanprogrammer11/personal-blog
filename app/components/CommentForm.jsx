// components/CommentForm.jsx
"use client";

import { useActionState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
// import { createComment } from "@/lib/actions/comments";

import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
// import { createComment } from "../_lib/actions/comments";

const initialState = {
  success: false,
  error: null,
  message: null,
  fields: {},
};

export default function CommentForm({ blogSlug }) {
  const { data: session, status } = useSession();
  const [state, formAction, isPending] = useActionState(
    createComment,
    initialState
  );
  const formRef = useRef(null);
  const textareaRef = useRef(null);

  // Reset form on successful submission
  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  }, [state.success]);

  // Auto-resize textarea
  const handleTextareaChange = (e) => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  if (status === "loading") {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-sage-200 rounded w-1/4 mb-4"></div>
        <div className="h-24 bg-sage-200 rounded mb-4"></div>
        <div className="h-10 bg-sage-200 rounded w-32"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="card border-2 border-dashed border-sage-300 text-center py-8">
        <p className="text-sage-600 mb-4">Sign in to join the conversation</p>
        <button onClick={() => signIn("google")} className="btn-primary">
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center gap-3 mb-4">
        <img
          src={session.user.image}
          alt={session.user.name}
          className="w-10 h-10 rounded-full border-2 border-sage-200"
        />
        <div>
          <p className="font-semibold text-sage-900">{session.user.name}</p>
          <p className="text-sm text-sage-600">Share your thoughts</p>
        </div>
      </div>

      <form ref={formRef} action={formAction} className="space-y-4">
        <input type="hidden" name="blogSlug" value={blogSlug} />

        <div>
          <label htmlFor="comment" className="sr-only">
            Your comment
          </label>
          <textarea
            ref={textareaRef}
            id="comment"
            name="comment"
            placeholder="What are your thoughts on this post?"
            defaultValue={state.fields?.comment || ""}
            onChange={handleTextareaChange}
            className="w-full min-h-[100px] p-4 border border-sage-300 rounded-xl 
                     bg-cream-50 text-sage-900 placeholder-sage-500
                     focus:ring-2 focus:ring-brand-400 focus:border-brand-400 
                     transition-all duration-200 resize-none overflow-hidden"
            disabled={isPending}
          />
        </div>

        {/* Success Message */}
        {state.success && (
          <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircleIcon className="h-5 w-5 text-green-600" />
            <p className="text-sm text-green-800">{state.message}</p>
          </div>
        )}

        {/* Error Message */}
        {state.error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
            <ExclamationCircleIcon className="h-5 w-5 text-red-600" />
            <p className="text-sm text-red-800">{state.error}</p>
          </div>
        )}

        <div className="flex justify-between items-center">
          <p className="text-xs text-sage-600">
            Be respectful and constructive in your comments
          </p>
          <button
            type="submit"
            disabled={isPending}
            className={`btn-primary relative min-w-[120px] ${
              isPending ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            {isPending ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-cream-50 border-t-transparent rounded-full animate-spin"></div>
                <span>Posting...</span>
              </div>
            ) : (
              "Post Comment"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
