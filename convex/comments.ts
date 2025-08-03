import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getComments = query({
  args: {
    postId: v.string(),
  },
  handler: async ({ db }, { postId }) => {
    return await db
      .query("comments")
      .withIndex("by_postId", (q) => q.eq("postId", postId))
      .collect();
  },
});

export const addComment = mutation({
  args: {
    postId: v.string(),
    userId: v.string(),
    content: v.string(),
    parentId: v.optional(v.id("comments")),
  },
  handler: async ({ db }, { postId, userId, content, parentId }) => {
    await db.insert("comments", {
      postId,
      userId,
      content,
      parentId,
    });
  },
});

export const updateComment = mutation({
  args: {
    id: v.id("comments"),
    content: v.string(),
  },
  handler: async ({ db }, { id, content }) => {
    await db.patch(id, { content });
  },
});

export const deleteComment = mutation({
  args: { id: v.id("comments") },
  handler: async ({ db }, { id }) => {
    await db.delete(id);
  },
});
