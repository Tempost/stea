import Link from 'next/link';
import { ReactNode } from 'react';

interface WrapperProps {
  href?: string;
  children: ReactNode | string | number;
}

function LinkWrapper({ href, children }: WrapperProps) {
  return (
    <Link
      href={href ? href : ''}
      rel='noopener noreferrer'
    >
      {children}
    </Link>
  );
}

export default LinkWrapper;
