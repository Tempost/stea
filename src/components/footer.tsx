import Link from 'next/link';
function Footer() {
  return (
    <footer
      className='footer p-4 bg-neutral text-neutral-content z-10
                 shadow-[0_-4px_20px_0_rgba(0,0,0,0.3)] h-[4rem]'
    >
      <h1 className='text-3xl'> Footer </h1>
      <Link href='/dashboard'>
        <a>Login to dashboard</a>
      </Link>
    </footer>
  );
}

export default Footer;
