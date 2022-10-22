/* eslint-disable no-undef */
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import Moralis from "moralis";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "SignatureAuth",
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

          const response = await fetch(
            "https://backend-x7q2esrofa-no.a.run.app/api/v1/users",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ address, signature }),
            }
          );
          const user = await response.json();

          console.log(user);

          // const { message, signature } = credentials;
          // await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

          // const { address, network, profileId, expirationTime } = (
          //   await Moralis.Auth.verify({ message, signature, network: "solana" })
          // ).raw;
          // const user = {
          //   address,
          //   network,
          //   profileId,
          //   expirationTime,
          // };
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
  },
  pages: {
    signIn: "/",
  },
});
