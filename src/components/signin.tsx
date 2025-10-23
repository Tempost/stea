import { PropsWithChildren } from 'react';
import { Button } from './styled-ui/Button';
import { Link } from '@tanstack/react-router';

export default function Signin({ children }: PropsWithChildren) {
  return (
    <Link to='/dashboard'>
      <Button
        variant='link'
        size='sm'
        className='text-neutral-content font-normal no-underline'
      >
        {children}
      </Button>
    </Link>
  );
}
