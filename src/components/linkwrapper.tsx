import Link from 'next/link';

interface WrapperProps {
  href?: string;
  children: JSX.Element | string | number;
}

function LinkWrapper({ href, children }: WrapperProps) {
  return (
    <Link href={href ? href : ''}>
      <a rel='noopener noreferrer'>{children}</a>
    </Link>
  );
}

export default LinkWrapper;
