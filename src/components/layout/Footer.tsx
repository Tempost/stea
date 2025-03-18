import Signin from '../signin';

function Footer() {
  return (
    <footer className='footer footer-center h-fit bg-gradient-to-t from-primary to-[color-mix(in_oklab,oklch(var(--p)),black_10%)] p-2 text-neutral-content shadow-[0_-4px_20px_0_rgba(0,0,0,0.3)]'>
      <div className='flex flex-col'>
        <h2 className='footer-title text-2xl'>South Texas Eventing</h2>
        <Signin> Dashboard </Signin>
        <p>Contact email: stea@steventing.net</p>
      </div>
    </footer>
  );
}

export default Footer;
