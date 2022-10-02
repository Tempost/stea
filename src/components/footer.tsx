import Link from 'next/link';

function Footer() {
  return (
    <footer
      className='footer footer-center z-50 h-fit
                 bg-gradient-to-t from-blue-700 to-blue-800
                 p-2 text-neutral-content shadow-[0_-4px_20px_0_rgba(0,0,0,0.3)]'
    >
      <div className='flex flex-col'>
        <h1 className='footer-title text-2xl'>South Texas Eventing</h1>
        <Link href='/dashboard'> Dashboard </Link>
      </div>
    </footer>
  );
}

export default Footer;
