import Signin from '../signin';

function Footer() {
  return (
    <footer className='footer footer-center from-primary text-neutral-content to-primary-dark bg-gradient-to-t p-2'>
      <div className='flex flex-col gap-0'>
        <h2 className='footer-title text-2xl'>South Texas Eventing</h2>
        <Signin> Dashboard </Signin>
        <p>Contact us at: stea@steventing.net</p>
      </div>
    </footer>
  );
}

export default Footer;
