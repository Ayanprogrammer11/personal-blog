import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getLike = query({
  args: {
    postId: v.string(),
    userId: v.optional(v.string()),
  },
  handler: async ({ db }, { postId, userId }) => {
    if (!userId) {
      return null;
    }

    return await db
      .query("likes")
      .withIndex("by_user_post", (q) =>
        q.eq("userId", userId).eq("postId", postId)
      )
      .unique();
  },
});

export const getLikes = query({
  args: {
    postId: v.string(),
  },
  handler: async ({ db }, { postId }) => {
    return await db
      .query("likes")
      .withIndex("by_postId", (q) => q.eq("postId", postId))
      .collect();
  },
});

export const like = mutation({
  args: {
    postId: v.string(),
    userId: v.string(),
  },
  handler: async ({ db }, { postId, userId }) => {
    const existingLike = await db
      .query("likes")
      .withIndex("by_user_post", (q) =>
        q.eq("userId", userId).eq("postId", postId)
      )
      .unique();

    if (existingLike) {
      await db.delete(existingLike._id);
      return false;
    } else {
      await db.insert("likes", {
        postId,
        userId,
      });
      return true;
    }
  },
});
