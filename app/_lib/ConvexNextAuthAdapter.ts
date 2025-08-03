import {
    Adapter,
    AdapterSession,
    AdapterUser,
    AdapterAccount,
    VerificationToken,
  } from "next-auth/adapters";
  import { ConvexHttpClient } from "convex/browser";
  import { api } from "@/convex/_generated/api";
  import { Id } from "@/convex/_generated/dataModel";
  
  export function ConvexNextAuthAdapter(
    client: ConvexHttpClient
  ): Adapter {
    return {
      async createUser(user) {
        const id = await client.mutation(api.users.createUser, {
          ...user,
          emailVerified: user.emailVerified
            ? new Date(user.emailVerified).getTime()
            : null,
        });
        return {
          ...(await client.query(api.users.getUser, { id })),
          id,
        };
      },
      async getUser(id) {
        return await client.query(api.users.getUser, { id: id as Id<"users"> });
      },
      async getUserByEmail(email) {
        return await client.query(api.users.getUserByEmail, { email });
      },
      async getUserByAccount({ provider, providerAccountId }) {
        const account = await client.query(api.users.getUserByAccount, {
          provider,
          providerAccountId,
        });
        if (!account) {
          return null;
        }
        return await client.query(api.users.getUser, { id: account.userId });
      },
      async updateUser(user) {
        const id = user.id as Id<"users">;
        await client.mutation(api.users.updateUser, {
          id: user.id as Id<"users">,
          ...user,
        });
        return {
          ...(await client.query(api.users.getUser, { id })),
          id,
        };
      },
      async deleteUser(userId) {
        await client.mutation(api.users.deleteUser, {
          id: userId as Id<"users">,
        });
      },
      async linkAccount(account) {
        await client.mutation(api.users.linkAccount, {
          ...account,
          userId: account.userId as Id<"users">,
        });
      },
      async unlinkAccount({ provider, providerAccountId }) {
        await client.mutation(api.users.unlinkAccount, {
          provider,
          providerAccountId,
        });
      },
      async createSession(session) {
        const id = await client.mutation(api.users.createSession, {
          ...session,
          userId: session.userId as Id<"users">,
        });
        return {
          ...(await client.query(api.users.getSession, { id })),
          id,
        };
      },
      async getSessionAndUser(sessionToken) {
        const sessionAndUser = await client.query(api.users.getSessionAndUser, {
          sessionToken,
        });
        if (!sessionAndUser) {
          return null;
        }
        const { session, user } = sessionAndUser;
        return {
          session: {
            ...session,
            userId: session.userId,
            expires: new Date(session.expires),
          },
          user: {
            ...user,
            emailVerified: user.emailVerified ? new Date(user.emailVerified) : null,
          },
        };
      },
      async updateSession(session) {
        const id = await client.mutation(api.users.updateSession, {
          ...session,
          sessionToken: session.sessionToken,
        });
        return {
          ...(await client.query(api.users.getSession, {
            id: id as unknown as Id<"sessions">,
          })),
          id: id as unknown as Id<"sessions">,
        };
      },
      async deleteSession(sessionToken) {
        await client.mutation(api.users.deleteSession, { sessionToken });
      },
      async createVerificationToken(verificationToken) {
        const id = await client.mutation(api.users.createVerificationToken, {
          ...verificationToken,
        });
        const token = await client.query(api.users.getVerificationToken, {
          id: id as unknown as Id<"verificationTokens">,
        });
        return {
          ...token,
          expires: new Date(token!.expires),
        };
      },
      async useVerificationToken({ identifier, token }) {
        const verificationToken = await client.query(
          api.users.useVerificationToken,
          { identifier, token }
        );
        if (!verificationToken) {
          return null;
        }
        return {
          ...verificationToken,
          expires: new Date(verificationToken.expires),
        };
      },
    };
  }
  
  export const formatAdapterUser = (
    user: (typeof api.users.getUserByEmail.returns) & { id: Id<"users"> }
  ): AdapterUser => ({
    ...user,
    id: user.id,
    emailVerified: user.emailVerified ? new Date(user.emailVerified) : null,
  });
  
  export const formatAdapterSession = (
    session: (typeof api.users.getSession.returns) & { id: Id<"sessions"> }
  ): AdapterSession => ({
    ...session,
    id: session.id,
    userId: session.userId,
    expires: new Date(session.expires),
  });
  
  export const formatAdapterAccount = (
    account: (typeof api.users.getUserByAccount.returns) & { id: Id<"accounts"> }
  ): AdapterAccount => ({
    ...account,
    id: account.id,
    userId: account.userId,
  });
   