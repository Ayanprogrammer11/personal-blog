import prisma from "@/app/_lib/prisma";
import LikeButton from "./LikeButton";
import { auth } from "@/app/_lib/auth";
import CommentsRepresent from "./CommentsRepresent";
import { Suspense } from "react";
import { Bookmark } from "lucide-react";
import BookmarkBlog from "../BookmarkBlog";

export default async function BlogActions({ blogId, blogSlug }) {
  const session = await auth();

  const likes = await prisma.like.findMany({
    where: {
      postId: blogId,
    },
  });

  let initialLiked = false;

  if (session?.user?.id) {
    const existingLike = await prisma.like.findFirst({
      where: {
        postId: blogId,
        userId: session.user.id,
      },
    });

    initialLiked = !!existingLike;
  }

  return (
    <div className="flex justify-between">
      <div className="flex gap-4 bottom-0 left-0">
        <LikeButton
          blogSlug={blogSlug}
          postId={blogId}
          likes={likes.length}
          initialLiked={initialLiked}
        />
        <Suspense fallback={<p>Comments Loading...</p>}>
          <CommentsRepresent blogId={blogId} />
        </Suspense>
      </div>

      <BookmarkBlog blogId={blogId} />
    </div>
  );
}
