import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  events: {
    async signIn(message) {
      console.info(`${message.user.name} signed in from ${message.user.email}`);
    },
  },
  callbacks: {
    jwt({ token, account }) {
      if (account) {
        token.access_token = account.access_token;
      }
      return token;
    },
    session({ session, token }) {
      return { ...session, access_token: token.access_token };
    },
  },
  providers: [
    Google({
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
});
