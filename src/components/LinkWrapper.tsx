import NextLink from 'next/link';
import { ReactNode } from 'react';

interface WrapperProps {
  href?: string;
  children: ReactNode | string | number;
}

function LinkWrapper({ href, children }: WrapperProps) {
  return (
    <NextLink
      href={href ? href : ''}
      rel='noopener noreferrer'
    >
      {children}
    </NextLink>
  );
}

export default LinkWrapper;
