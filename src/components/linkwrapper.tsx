import NextLink from 'next/link';
import _ from 'lodash';

interface WrapperProps {
  href?: string;
  children: JSX.Element | string | number;
}

function LinkWrapper({ href, children }: WrapperProps) {
  return (
    <NextLink href={href ? href : ''}>
      <a>{children}</a>
    </NextLink>
  );
}

export default LinkWrapper;
