import { auth, signIn } from '@/auth';
import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';
import { Button } from './styled-ui/Button';

export default function Signin({ children }: PropsWithChildren) {
  const onClick = async () => {
    'use server';
    const session = await auth();
    if (!session) {
      await signIn('google', { redirectTo: '/dashboard' });
    } else {
      redirect('/dashboard');
    }
  };

  return (
    <Button
      variant='link'
      onClick={onClick}
      size='sm'
      className='font-normal capitalize text-neutral-content no-underline'
    >
      {children}
    </Button>
  );
}
