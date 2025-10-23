import { useAppSession } from '@/utils/auth/session';
import { redirect } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import * as arctic from 'arctic';

export const signIn = createServerFn({ method: 'POST' }).handler(async () => {
  const provider = new arctic.Google(
    process.env.AUTH_GOOGLE_ID,
    process.env.AUTH_GOOGLE_SECRET,
    '/dashboard',
  );

  const session = await useAppSession();
  const state = arctic.generateState();
  await session.update({ oauthState: state });

  // Generate OAuth URL
  const authUrl = provider.createAuthorizationURL(
    state,
    arctic.generateCodeVerifier(),
    ['openid', 'profile', 'email'],
  );

  throw redirect({ to: authUrl.href });
});
