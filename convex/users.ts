import { v } from "convex/values";
import { query, mutation, internalMutation } from "./_generated/server";
import { userSchema, sessionSchema, accountSchema } from "./schema";

// User CRUD
export const createUser = mutation({
  args: userSchema,
  handler: async ({ db }, args) => {
    return await db.insert("users", args);
  },
});

export const getUser = query({
  args: { id: v.id("users") },
  handler: async ({ db }, { id }) => {
    return await db.get(id);
  },
});

export const getUserByEmail = query({
  args: { email: v.string() },
  handler: async ({ db }, { email }) => {
    return await db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", email))
      .unique();
  },
});

export const updateUser = internalMutation({
  args: { id: v.id("users"), ...userSchema },
  handler: async ({ db }, { id, ...rest }) => {
    await db.patch(id, rest);
  },
});

export const deleteUser = internalMutation({
  args: { id: v.id("users") },
  handler: async ({ db }, { id }) => {
    await db.delete(id);
  },
});

// Account CRUD
export const linkAccount = mutation({
  args: accountSchema,
  handler: async ({ db }, args) => {
    await db.insert("accounts", args);
  },
});

export const getUserByAccount = query({
  args: { provider: v.string(), providerAccountId: v.string() },
  handler: async ({ db }, { provider, providerAccountId }) => {
    return await db
      .query("accounts")
      .withIndex("by_provider_account", (q) =>
        q.eq("provider", provider).eq("providerAccountId", providerAccountId)
      )
      .unique();
  },
});

export const unlinkAccount = internalMutation({
  args: { provider: v.string(), providerAccountId: v.string() },
  handler: async ({ db }, { provider, providerAccountId }) => {
    const account = await db
      .query("accounts")
      .withIndex("by_provider_account", (q) =>
        q.eq("provider", provider).eq("providerAccountId", providerAccountId)
      )
      .unique();
    if (account) {
      await db.delete(account._id);
    }
  },
});

// Session CRUD
export const createSession = mutation({
  args: sessionSchema,
  handler: async ({ db }, args) => {
    return await db.insert("sessions", args);
  },
});

export const getSession = query({
  args: { id: v.id("sessions") },
  handler: async ({ db }, { id }) => {
    return await db.get(id);
  },
});

export const getSessionAndUser = query({
  args: { sessionToken: v.string() },
  handler: async ({ db }, { sessionToken }) => {
    const session = await db
      .query("sessions")
      .withIndex("by_session_token", (q) => q.eq("sessionToken", sessionToken))
      .unique();
    if (!session) {
      return null;
    }
    const user = await db.get(session.userId);
    if (!user) {
      return null;
    }
    return { session, user };
  },
});

export const updateSession = internalMutation({
  args: { sessionToken: v.string() },
  handler: async ({ db }, { sessionToken }) => {
    const session = await db
      .query("sessions")
      .withIndex("by_session_token", (q) => q.eq("sessionToken", sessionToken))
      .unique();
    if (session) {
      await db.patch(session._id, session);
      return session._id;
    }
    return null;
  },
});

export const deleteSession = mutation({
  args: { sessionToken: v.string() },
  handler: async ({ db }, { sessionToken }) => {
    const session = await db
      .query("sessions")
      .withIndex("by_session_token", (q) => q.eq("sessionToken", sessionToken))
      .unique();
    if (session) {
      await db.delete(session._id);
    }
  },
});

// Verification Token CRUD
export const createVerificationToken = mutation({
  args: {
    identifier: v.string(),
    token: v.string(),
    expires: v.number(),
  },
  handler: async ({ db }, args) => {
    return await db.insert("verificationTokens", args);
  },
});

export const getVerificationToken = query({
  args: { id: v.id("verificationTokens") },
  handler: async ({ db }, { id }) => {
    return await db.get(id);
  },
});

export const useVerificationToken = query({
  args: { identifier: v.string(), token: v.string() },
  handler: async ({ db }, { identifier, token }) => {
    const verificationToken = await db
      .query("verificationTokens")
      .withIndex("by_identifier_token", (q) =>
        q.eq("identifier", identifier).eq("token", token)
      )
      .unique();
    if (verificationToken) {
      await db.delete(verificationToken._id);
      return verificationToken;
    }
    return null;
  },
});
