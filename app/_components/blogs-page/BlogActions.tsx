"use client";

import { useSession } from "next-auth/react";
import LikeButton from "./LikeButton";
import CommentsRepresent from "./CommentsRepresent";
import { Suspense } from "react";
import BookmarkBlog from "../BookmarkBlog";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export default function BlogActions({ blogId, blogSlug }: { blogId: string, blogSlug: string }) {
  const { data: session } = useSession();

  const likes = useQuery(api.likes.getLikes, { postId: blogId });
  const initialLiked = useQuery(api.likes.getLike, {
    postId: blogId,
    userId: session?.user?.id,
  });

  return (
    <div className="flex justify-between">
      <div className="flex gap-4 bottom-0 left-0">
        <LikeButton
          blogSlug={blogSlug}
          postId={blogId}
          likes={likes?.length ?? 0}
          initialLiked={!!initialLiked}
        />
        <Suspense fallback={<p>Comments Loading...</p>}>
          <CommentsRepresent blogId={blogId} />
        </Suspense>
      </div>

      <BookmarkBlog blogId={blogId as Id<"bookmarks">} />
    </div>
  );
}
