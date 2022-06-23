import LinkWrapper from './linkwrapper';
import { menuItems } from './menuitems';

function Header() {
  return (
    <header className='grid grid-cols-2 bg-neutral text-neutral-content'
    >
      <img
        src='logo-nobackground-200.png'
        alt='STEA Logo'
      />

      <div className='flex flex-col justify-between items-end'>
        <h1 className='text-2xl'>
          South Texas
          Eventing Association
        </h1>

        <div className='grid grid-flow-col gap-2'>
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
      </div>
    </header>
  );
}

export default Header;
