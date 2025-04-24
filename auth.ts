import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, profile }) {
      if (profile) {
        token.username = profile.login;
        token.avatar = profile.avatar_url; // Save the avatar URL
      }
      return token;
    },
    async session({ session, token }) {
      session.username = token.username as string;
      session.avatar = token.avatar as string; // Save the avatar URL to the session
      return session;
    },
  },
});
