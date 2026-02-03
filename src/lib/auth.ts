import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/db";
import { compare } from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // ✅ lowercase + trim for safety
        const email = credentials.email.toLowerCase().trim();
        const password = credentials.password.trim();

        const user = await prisma.adminUser.findUnique({ where: { email } });

        // Debug (optional, remove in production)
        console.log("INPUT EMAIL:", email);
        console.log("INPUT PASSWORD:", password);
        if (user) console.log("DB HASH:", user.password);

        const isValid = user ? await compare(password, user.password) : false;
        console.log("PASSWORD MATCH:", isValid);

        if (!user || !isValid) return null;

        return { id: user.id.toString(), email: user.email, name: "Admin" };
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
