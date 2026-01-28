// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signAccessToken, signRefreshToken } from "@/lib/token";
import { Role } from "@/lib/generated/prisma/enums";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  
  session: {
    strategy: "jwt" as const,
  },

  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("EMAIL_PASSWORD_REQUIRED");
        }

        const user = await prisma.user.findUnique({
          where: { 
            email: credentials.email,
            isDeleted: false, 
          },
          select: {
            id: true,
            email: true,
            fullName: true,
            role: true,
            password: true,
          },
        });

        if (!user) {
          throw new Error("INVALID_CREDENTIALS");
        }

        const isMatch = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (!isMatch) {
          throw new Error("INVALID_CREDENTIALS");
        }

        const payload = {
          userId: user.id,
          role: user.role,
        };

        const accessToken = signAccessToken(payload);
        const refreshToken = signRefreshToken(payload);

        // ✅ Return only available fields
        return {
          id: user.id.toString(),
          email: user.email,
          name: user.fullName,
          role: user.role,
          accessToken,
          refreshToken,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.userId = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
        token.createdAt = user.createdAt;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }

      if (trigger === "update" && session) {
        token = { ...token, ...session };
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.userId as number;
      session.user.email = token.email as string;
      session.user.name = token.name as string;
      session.user.role = token.role as Role;
      session.user.createdAt = token.createdAt as string;
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };