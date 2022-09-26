import { useSession } from 'next-auth/react';

function Footer() {
  const { data: session } = useSession();

  return (
    <footer
      className='footer footer-center p-2 text-neutral-content
                 bg-gradient-to-t from-blue-700 to-blue-800
                 shadow-[0_-4px_20px_0_rgba(0,0,0,0.3)] h-fit z-50'
    >
      <div className='flex flex-row'>
        <h1 className='footer-title text-2xl'>Footer</h1>
        <a
          href='/dashboard'
          className='cursor-pointer'
        >
          {session ? 'Go to dashboard' : 'Login to dashboard'}
        </a>
      </div>
    </footer>
  );
}

export default Footer;
