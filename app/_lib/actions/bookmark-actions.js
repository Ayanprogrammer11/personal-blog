"use server";

import { auth } from "../auth";
import prisma from "../prisma";

export async function toggleBookmark(blogId, blogSlug) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("You must be logged in to like posts");
  }

  const userId = session.user.id;

  try {
    // Check if user already liked this post
    const existingBookmark = await prisma.bookmark.findUnique({
      where: {
        userId_postId: {
          userId,
          postId: blogId,
        },
      },
    });

    if (existingBookmark) {
      // Unlike: remove the like
      await prisma.bookmark.delete({
        where: {
          id: existingBookmark.id,
        },
      });

      //   revalidatePath(`/blogs/${blogSlug}`, "layout");
      //   return { liked: false, message: "Post unliked successfully" };
    } else {
      // Like: create new like
      await prisma.bookmark.create({
        data: {
          userId,
          postId: blogId,
        },
      });

      //   revalidatePath(`/blog/${postId}`);
      //   return { liked: true, message: "Post liked successfully" };
    }
  } catch (error) {
    console.error("Error toggling like:", error);
    throw new Error("Failed to toggle like");
  }
}
