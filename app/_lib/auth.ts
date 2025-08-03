import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { ConvexNextAuthAdapter } from "./ConvexNextAuthAdapter";
import convex from "./ConvexClient";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: ConvexNextAuthAdapter(convex),
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // This is where you would logic to check if the user exists and the password is correct
        // For now, we will just return a user object
        console.log("credentials", credentials);
        return {
          id: "1",
          name: "J Smith",
          email: "jsmith@example.com",
          image: "https://i.pravatar.cc/150?u=jsmith@example.com",
        };
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
});
