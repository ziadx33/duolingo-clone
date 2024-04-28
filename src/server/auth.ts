import { PrismaAdapter } from "@auth/prisma-adapter";
import nextAuth, {
  type NextAuthOptions,
  getServerSession,
  type DefaultSession,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";

import { env } from "@/env";
import { db } from "@/server/db";
import { getUserByEmail, getUserById } from "./db/user";
import { type User } from "@prisma/client";

/**
 * Module augmentation for `next-auth` types to add custom properties to the `session` object.
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

const authOptions: NextAuthOptions = {
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;
      const existingUser = await getUserById(user.id);
      if (!existingUser?.emailVerified) return false;
      return true;
    },
    session: async ({ token, session }) => {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    jwt: ({ token, trigger, session }) => {
      if (trigger === "update") {
        for (const key in session.user) {
          token[key] = session.user[key];
        }
      }
      return token;
    },
  },
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    {
      id: "credentials",
      name: "Credentials",
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials) return null;
        if (!credentials.email || !credentials.password) return null;

        const user = await getUserByEmail(credentials.email);

        if (!user) {
          console.error("User not found for email:", credentials.email);
          return null;
        }

        return { ...user, id: user.id };
      },
    },
  ],
};

export const authHandler = nextAuth(authOptions);

/**
 * Wrapper for `getServerSession` to avoid importing `authOptions` in every file.
 */
export const getServerAuthSession = () =>
  getServerSession(authOptions) as Promise<User>;
