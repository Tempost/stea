import LinkWrapper from './linkwrapper';
import { menuItems } from './menuitems';

function Header() {
  return (
    <header
      className='grid grid-flow-col bg-neutral text-neutral-content
                 shadow-[0_4px_20px_0_rgba(0,0,0,0.3)] sticky top-0 p-1'
    >
      <img
        src='logo-nobackground-200.png'
        alt='STEA Logo'
      />

      <div className='flex flex-col justify-between items-end'>
        <div className='grid grid-flow-col gap-5'>
          {
            menuItems.map(({ href, name, render }) => (
              <div className='hover:text-black' key={name} >
                {
                  render ?
                    render({ href, name }) :
                    <LinkWrapper href={href}>
                      <h2 className='text-xl'>
                        {name}
                      </h2>
                    </LinkWrapper>
                }
              </div>
            ))
          }
        </div>

        <h1 className='text-2xl'>
          South Texas
          Eventing Association
        </h1>
      </div>
    </header>
  );
}

export default Header;
