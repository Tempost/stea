import NextLink from 'next/link';
import { Link } from '@chakra-ui/react';

interface WrapperProps {
  href: string;
  children: JSX.Element | string | number;
};

function LinkWrapper({ href, children }: WrapperProps) {
  return (
    <NextLink href={href}>
      <Link>
        {children}
      </Link>
    </NextLink>
  );
}

export default LinkWrapper;
