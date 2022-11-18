/* eslint-disable no-undef */
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import Moralis from "moralis";

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "authCredentials",
      name: "authUser",
      credentials: {
        address: {
          label: "Address",
          type: "text",
        },
        signature: {
          label: "Signature",
          type: "text",
        },
      },
      async authorize(credentials) {
        try {
          const { address, signature } = credentials;

          const data = await fetch(
            "https://backend-x7q2esrofa-no.a.run.app/api/v1/auth/sign-in",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                address,
                signature,
              }),
            }
          );
          const user = await data.json();
          return user;
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },
    async session({ session, token }) {
      session.expires = token.user.expirationTime;
      session.user = token.user;
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 3600,
  },
  pages: {
    signIn: "/",
  },
});
