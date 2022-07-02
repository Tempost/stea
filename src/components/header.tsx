import LinkWrapper from './linkwrapper';
import { menuItems } from './menuitems';

function Header() {
  return (
    <header
      className='grid grid-flow-col text-neutral-content h-full w-full z-10
      max-h-20 md:max-h-14 sm:max-h-fit fixed p-1 bg-gradient-to-b from-neutral
      to-neutral/[0.9] transition-all'
    >
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
      </div>
    </header>
  );
}

export default Header;
