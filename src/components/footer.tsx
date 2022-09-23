import Link from 'next/link';
function Footer() {
  return (
    <footer
      className='footer footer-center p-2 text-neutral-content
                 bg-gradient-to-t from-blue-700 to-blue-800
                 shadow-[0_-4px_20px_0_rgba(0,0,0,0.3)] h-fit z-50'
    >
      <div className='flex flex-row'>
        <h1 className='footer-title text-2xl'>Footer</h1>
        <Link href='/dashboard' className='mb-2' prefetch={false}>
          <a>Login to dashboard</a>
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
