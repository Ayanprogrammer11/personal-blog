import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const userSchema = {
  name: v.optional(v.string()),
  email: v.string(),
  emailVerified: v.optional(v.number()),
  image: v.optional(v.string()),
};

export const sessionSchema = {
  userId: v.id("users"),
  expires: v.number(),
  sessionToken: v.string(),
};

export const accountSchema = {
  userId: v.id("users"),
  type: v.union(
    v.literal("oauth"),
    v.literal("email"),
    v.literal("oidc"),
    v.literal("webauthn")
  ),
  provider: v.string(),
  providerAccountId: v.string(),
  refresh_token: v.optional(v.string()),
  access_token: v.optional(v.string()),
  expires_at: v.optional(v.number()),
  token_type: v.optional(v.string()),
  scope: v.optional(v.string()),
  id_token: v.optional(v.string()),
  session_state: v.optional(v.string()),
};

export const verificationTokenSchema = {
  identifier: v.string(),
  token: v.string(),
  expires: v.number(),
};

export const likeSchema = {
  userId: v.id("users"),
  postId: v.string(), // Sanity post ID
};

export const commentSchema = {
  userId: v.id("users"),
  postId: v.string(),
  content: v.string(),
  parentId: v.optional(v.id("comments")),
};

export const bookmarkSchema = {
  userId: v.id("users"),
  postId: v.string(), // Sanity post ID
};

export default defineSchema({
  users: defineTable(userSchema).index("by_email", ["email"]),
  sessions: defineTable(sessionSchema)
    .index("by_session_token", ["sessionToken"])
    .index("by_user_id", ["userId"]),
  accounts: defineTable(accountSchema)
    .index("by_provider_account", ["provider", "providerAccountId"])
    .index("by_user_id", ["userId"]),
  verificationTokens: defineTable(verificationTokenSchema).index(
    "by_identifier_token",
    ["identifier", "token"]
  ),

  likes: defineTable(likeSchema)
    .index("by_user_post", ["userId", "postId"])
    .index("by_userId", ["userId"])
    .index("by_postId", ["postId"]),

  comments: defineTable(commentSchema)
    .index("by_postId", ["postId"])
    .index("by_parentId", ["parentId"])
    .index("by_userId", ["userId"]),

  bookmarks: defineTable(bookmarkSchema)
    .index("by_user_post", ["userId", "postId"])
    .index("by_userId", ["userId"])
    .index("by_postId", ["postId"]),
});
