import { cn } from '@/utils/helpers';
import NextLink from 'next/link';
import { ComponentProps, ReactNode } from 'react';

interface WrapperProps extends Omit<ComponentProps<typeof NextLink>, 'href'> {
  href?: string;
  children: ReactNode | string | number;
}

function LinkWrapper({ href, children, className }: WrapperProps) {
  return (
    <NextLink
      href={href ? href : ''}
      rel='noopener noreferrer'
      className={cn('join-item', className)}
    >
      {children}
    </NextLink>
  );
}

export default LinkWrapper;
