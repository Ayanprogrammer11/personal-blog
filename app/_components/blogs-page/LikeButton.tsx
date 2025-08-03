"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Heart } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function LikeButton({
  postId,
  initialLiked = false,
  likes,
}: {
  postId: string;
  initialLiked: boolean;
  likes: number;
}) {
  const { data: session, status } = useSession();
  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(likes);
  const likeMutation = useMutation(api.likes.like);

  useEffect(() => {
    if (likes !== undefined) {
      setLikeCount(likes);
    }
  }, [likes]);

  const handleLike = async () => {
    if (status !== "authenticated") {
      window.location.href = "/signin";
      return;
    }

    // Optimistically update UI
    const optimisticLiked = !liked;
    const optimisticCount = likeCount + (optimisticLiked ? 1 : -1);

    setLiked(optimisticLiked);
    setLikeCount(optimisticCount);

    try {
      await likeMutation({ postId, userId: session.user.id! });
    } catch (error) {
      console.error("Error toggling like:", error);
      // Rollback UI on error
      setLiked(!optimisticLiked);
      setLikeCount(likeCount);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleLike}
        disabled={status === "loading"}
        className={`flex items-center gap-1 px-3 py-2 rounded-full transition-all duration-200 ${
          liked
            ? "bg-red-100 text-red-600 hover:bg-red-200"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        } hover:scale-105`}
      >
        <Heart
          size={24}
          className={`transition-all duration-200 ${
            liked ? "fill-current text-red-600" : ""
          }`}
        />
        <span className="text-[16px] font-medium">{likeCount}</span>
      </button>

      {status === "unauthenticated" && (
        <span className="text-xs text-gray-500">Sign in to like</span>
      )}
    </div>
  );
}
