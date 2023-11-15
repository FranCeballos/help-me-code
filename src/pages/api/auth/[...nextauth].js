import { verifyPassword } from "@/src/lib/auth";
import { connectToDatabase } from "@/src/lib/db";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  session: {
    jwt: true,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        email: token.email,
        isAdmin: token.isAdmin,
      };
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectToDatabase();
        const usersCollection = client.db().collection("users");

        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          client.close();
          throw new Error("Email not registered");
        }

        const passwordIsValid = await verifyPassword(
          credentials.password,
          user.hashedPassword
        );

        if (!passwordIsValid) {
          client.close();
          throw new Error("Invalid or wrong credentials.");
        }

        client.close();
        return user;
      },
    }),
  ],
};

export default NextAuth(authOptions);
