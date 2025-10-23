import { cn } from '@/utils/helpers';
import { Link } from '@tanstack/react-router';
import { ComponentProps, ReactNode } from 'react';

interface WrapperProps extends ComponentProps<typeof Link> {
  children: ReactNode | string | number;
}

function LinkWrapper({ to, children, className, ...props }: WrapperProps) {
  return (
    <Link
      to={to}
      rel='noopener noreferrer'
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  );
}

export default LinkWrapper;
