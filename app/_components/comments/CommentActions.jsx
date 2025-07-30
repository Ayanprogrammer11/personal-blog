"use client";

// app/_components/comments/CommentActions.jsx
import { useState } from "react";
import { Reply, Edit2, Trash2, MoreHorizontal } from "lucide-react";
import CommentForm from "./CommentForm";
import EditCommentForm from "./EditCommentForm";
import DeleteCommentDialog from "./DeleteCommentDialog";

export default function CommentActions({
  comment,
  isOwner,
  currentUserId,
  canReply = true,
  blogSlug,
}) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleReplyClick = () => {
    if (!currentUserId) {
      window.location.href = "/subscribe";
      return;
    }
    setShowReplyForm(!showReplyForm);
  };

  const handleEditClick = () => {
    setShowEditForm(true);
    setShowMenu(false);
  };

  const handleDeleteClick = () => {
    setShowDeleteDialog(true);
    setShowMenu(false);
  };

  const handleEditCancel = () => {
    setShowEditForm(false);
  };

  const handleEditSuccess = () => {
    setShowEditForm(false);
  };

  return (
    <div className="space-y-3">
      {/* Action Buttons */}
      <div className="flex items-center gap-1">
        {canReply && (
          <button
            onClick={handleReplyClick}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-sage-600 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors duration-200"
          >
            <Reply className="w-3.5 h-3.5" />
            Reply
          </button>
        )}

        {isOwner && (
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-sage-600 hover:text-sage-800 hover:bg-sage-100 rounded-lg transition-colors duration-200"
            >
              <MoreHorizontal className="w-3.5 h-3.5" />
            </button>

            {showMenu && (
              <div
                className="absolute top-full left-0 mt-1 bg-white border border-sage-200 rounded-lg shadow-lg py-1 z-10 min-w-24"
                onBlur={() => setShowMenu(false)}
              >
                <button
                  onClick={handleEditClick}
                  className="flex items-center gap-2 w-full px-3 py-2 text-xs text-sage-700 hover:bg-sage-50 transition-colors"
                >
                  <Edit2 className="w-3 h-3" />
                  Edit
                </button>
                <button
                  onClick={handleDeleteClick}
                  className="flex items-center gap-2 w-full px-3 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Edit Form */}
      {showEditForm && (
        <EditCommentForm
          comment={comment}
          onCancel={handleEditCancel}
          onSuccess={handleEditSuccess}
          blogSlug={blogSlug}
        />
      )}

      {/* Reply Form */}
      {showReplyForm && (
        <div className="border-l-2 border-brand-200 pl-4 ml-2">
          <CommentForm
            postId={comment.postId}
            parentId={comment.id}
            placeholder={`Reply to ${comment.user.name || "this comment"}...`}
            onCancel={() => setShowReplyForm(false)}
            autoFocus={true}
            className="bg-brand-50/30 p-4 rounded-lg"
          />
        </div>
      )}

      {/* Delete Dialog */}
      {showDeleteDialog && (
        <DeleteCommentDialog
          comment={comment}
          onCancel={() => setShowDeleteDialog(false)}
        />
      )}

      {/* Click outside handler for menu */}
      {showMenu && (
        <div className="fixed inset-0 z-0" onClick={() => setShowMenu(false)} />
      )}
    </div>
  );
}
