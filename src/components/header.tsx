import LinkWrapper from './linkwrapper';
import { publicMenuItems, dashMenuItems } from './menuitems';

export const PublicHeader = () => (
  <nav
    className='text-primary-content min-w-full z-50 navbar p-1 fixed
    bg-gradient-to-b from-primary to-primary-focus grid items-center'
  >
    <div className='flex flex-col items-center navbar-center'>
      <div className='grid grid-flow-col gap-5'>
        {publicMenuItems.map(({ href, name, render }) => (
          <div
            className='hover:text-primary-content/[0.7]'
            key={name}
          >
            {render ? (
              render({ href, name })
            ) : (
              <LinkWrapper href={href}>
                <h2 className='text-2xl'>{name}</h2>
              </LinkWrapper>
            )}
          </div>
        ))}
      </div>
    </div>
  </nav>
);

export const DashboardHeader = () => (
  <nav
    className='text-primary-content h-full w-full z-50 max-h-20 md:max-h-14
      sm:max-h-fit fixed p-1 bg-gradient-to-b from-primary to-primary-focus/[0.9]'
  >
    <div className='grid place-items-center h-full'>
      <div className='grid grid-flow-col gap-5'>
        {dashMenuItems.map(({ href, name, render }) => (
          <div
            className='hover:text-primary-content/[0.7]'
            key={name}
          >
            {render ? (
              render({ href, name })
            ) : (
              <LinkWrapper href={href}>
                <h2 className='text-xl'>{name}</h2>
              </LinkWrapper>
            )}
          </div>
        ))}
      </div>
    </div>
  </nav>
);
