import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  callbacks: {
    session({ session, token }) {
      session.access_token = token.access_token;
      console.log('this is the current session.', session);
      return session;
    },
    jwt({ token, account }) {
      console.log(account);
      if (account) {
        token.access_token = account.access_token;
      }
      return token;
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
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
