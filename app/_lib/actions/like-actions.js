// app/_lib/actions/like-actions.js
"use server";

import { auth } from "../auth";

import prisma from "../prisma";
import { revalidatePath } from "next/cache";

export async function toggleLike(postId, blogSlug) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("You must be logged in to like posts");
  }

  const userId = session.user.id;

  try {
    // Check if user already liked this post
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    if (existingLike) {
      // Unlike: remove the like
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });

      revalidatePath(`/blogs/${blogSlug}`, "layout");
      return { liked: false, message: "Post unliked successfully" };
    } else {
      // Like: create new like
      await prisma.like.create({
        data: {
          userId,
          postId,
        },
      });

      revalidatePath(`/blog/${postId}`);
      return { liked: true, message: "Post liked successfully" };
    }
  } catch (error) {
    console.error("Error toggling like:", error);
    throw new Error("Failed to toggle like");
  }
}

export async function getLikesForPost(postId) {
  try {
    const likes = await prisma.like.findMany({
      where: { postId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    return likes;
  } catch (error) {
    console.error("Error fetching likes:", error);
    return [];
  }
}

export async function getLikeCount(postId) {
  try {
    const count = await prisma.like.count({
      where: { postId },
    });

    return count;
  } catch (error) {
    console.error("Error fetching like count:", error);
    return 0;
  }
}

export async function checkUserLiked(postId, userId) {
  if (!userId) return false;

  try {
    const like = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    return !!like;
  } catch (error) {
    console.error("Error checking user like:", error);
    return false;
  }
}
