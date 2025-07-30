"use server";

import { auth } from "../auth";
import prisma from "../prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createComment(formData, blogSlug) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/subscribe");
  }
  3;
  const content = formData.get("content");
  const postId = formData.get("postId");
  const parentId = formData.get("parentId") || null;

  if (!content || !postId) {
    throw new Error("Content and post ID are required");
  }

  if (content.trim().length < 1) {
    throw new Error("Comment cannot be empty");
  }

  if (content.length > 2000) {
    throw new Error("Comment is too long (max 2000 characters)");
  }

  try {
    await prisma.comment.create({
      data: {
        content: content.trim(),
        postId,
        parentId,
        userId: session.user.id,
      },
    });

    revalidatePath(`/blogs/${blogSlug}`);
    return { success: true };
  } catch (error) {
    console.error("Error creating comment:", error);
    throw new Error("Failed to create comment");
  }
}

export async function deleteComment(commentId) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/subscribe");
  }

  try {
    // Check if user owns the comment
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      select: { userId: true, postId: true },
    });

    if (!comment) {
      throw new Error("Comment not found");
    }

    if (comment.userId !== session.user.id) {
      throw new Error("Unauthorized to delete this comment");
    }

    // Delete comment (cascade will handle replies)
    await prisma.comment.delete({
      where: { id: commentId },
    });

    revalidatePath(`/blog/${comment.postId}`);
    return { success: true };
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw new Error("Failed to delete comment");
  }
}

export async function updateComment(commentId, formData, blogSlug) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/subscribe");
  }

  const content = formData.get("content");

  if (!content) {
    throw new Error("Content is required");
  }

  if (content.trim().length < 1) {
    throw new Error("Comment cannot be empty");
  }

  if (content.length > 2000) {
    throw new Error("Comment is too long (max 2000 characters)");
  }

  try {
    // Check if user owns the comment
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      select: { userId: true, postId: true },
    });

    if (!comment) {
      throw new Error("Comment not found");
    }

    if (comment.userId !== session.user.id) {
      throw new Error("Unauthorized to edit this comment");
    }

    await prisma.comment.update({
      where: { id: commentId },
      data: {
        content: content.trim(),
        updatedAt: new Date(),
      },
    });

    revalidatePath(`/blogs/${blogSlug}`);
    return { success: true };
  } catch (error) {
    console.error("Error updating comment:", error);
    throw new Error("Failed to update comment");
  }
}

export async function getComments(postId) {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId,
        parentId: null, // Only get top-level comments
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        replies: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
            replies: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    image: true,
                  },
                },
              },
              orderBy: { createdAt: "asc" },
            },
          },
          orderBy: { createdAt: "asc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return comments;
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
}

export async function getCommentCount(postId) {
  try {
    const count = await prisma.comment.count({
      where: { postId },
    });
    return count;
  } catch (error) {
    console.error("Error getting comment count:", error);
    return 0;
  }
}
