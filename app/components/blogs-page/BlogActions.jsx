import prisma from "@/app/_lib/prisma";
import LikeButton from "./LikeButton";
import { auth } from "@/app/_lib/auth";
import CommentsRepresent from "./CommentsRepresent";

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
    <div className="flex gap-4 bottom-0 left-0">
      <LikeButton
        blogSlug={blogSlug}
        postId={blogId}
        likes={likes.length}
        initialLiked={initialLiked}
      />
      <CommentsRepresent />
    </div>
  );
}
