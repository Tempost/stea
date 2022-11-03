import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function Signin() {
  const { status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn('google', { callbackUrl: '/dashboard' });
    }
  }, [status]);

  return <div></div>;
}
