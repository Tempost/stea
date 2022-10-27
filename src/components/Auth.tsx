import { signIn, useSession } from 'next-auth/react';
import { PropsWithChildren } from 'react';

function IsAuth({ children }: PropsWithChildren) {
  const { data } = useSession({
    required: true,
    onUnauthenticated() {
      signIn('google', { callbackUrl: '/dashboard' });
    },
  });
  if (!data) return <></>;

  return <>{children}</>;
}

export default IsAuth;
