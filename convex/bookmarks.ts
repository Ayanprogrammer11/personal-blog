import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getBookmark = query({
  args: {
    postId: v.string(),
    userId: v.optional(v.string()),
  },
  handler: async ({ db }, { postId, userId }) => {
    if (!userId) {
      return null;
    }

    return await db
      .query("bookmarks")
      .withIndex("by_user_post", (q) =>
        q.eq("userId", userId).eq("postId", postId)
      )
      .unique();
  },
});

export const getBookmarks = query({
  args: {
    userId: v.string(),
  },
  handler: async ({ db }, { userId }) => {
    return await db
      .query("bookmarks")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .collect();
  },
});

export const bookmark = mutation({
  args: {
    postId: v.string(),
    userId: v.string(),
  },
  handler: async ({ db }, { postId, userId }) => {
    const existingBookmark = await db
      .query("bookmarks")
      .withIndex("by_user_post", (q) =>
        q.eq("userId", userId).eq("postId", postId)
      )
      .unique();

    if (existingBookmark) {
      await db.delete(existingBookmark._id);
      return false;
    } else {
      await db.insert("bookmarks", {
        postId,
        userId,
      });
      return true;
    }
  },
});
