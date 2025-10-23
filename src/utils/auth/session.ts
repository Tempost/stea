// utils/session.ts
import { useSession } from '@tanstack/react-start/server';

type SessionData = {
  oauthState?: string;
  userId?: string;
  email?: string;
  role?: string;
};

export function useAppSession() {
  return useSession<SessionData>({
    name: 'user-session',
    password: process.env.BETTERAUTH_SECRET!, // At least 32 characters
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      httpOnly: true,
    },
  });
}
