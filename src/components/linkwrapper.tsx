import NextLink from 'next/link';

interface WrapperProps {
  href?: string;
  children: JSX.Element | string | number;
}

/**
 * @param {string} WrapperProps.href
 * @param {JSX.Element | string | number} WrapperProps.children
 * @description wraps anchor tag in a NextLink component
 */
function LinkWrapper({ href, children }: WrapperProps) {
  return (
    <NextLink href={href ? href : ''}>
      <a>{children}</a>
    </NextLink>
  );
}

export default LinkWrapper;
