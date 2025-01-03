import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { NextRequest, NextResponse } from 'next/server';

type CheckAuth = (
  req: NextRequest,
) => Promise<NextResponse<unknown> | undefined>;
export const checkAuth = (func: CheckAuth) =>
  auth(req => {
    if (req.auth) return func(req);

    return NextResponse.json({ message: 'Not Authenticated' }, { status: 401 });
  });

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
    authorized({ auth }) {
      return !!auth;
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
