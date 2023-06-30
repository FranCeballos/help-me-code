import { verifyPassword } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  session: {
    jwt: true,
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectToDatabase();
        const usersCollection = client.db().collection("users");

        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          throw new Error("No hay un usuario registrado con ese email");
        }

        const passwordIsValid = await verifyPassword(
          credentials.password,
          user.hashedPassword
        );

        if (!passwordIsValid) {
          throw new Error("Email y/o contraseña no son correctas");
        }

        client.close();
        return { email: user.email };
      },
    }),
  ],
});
