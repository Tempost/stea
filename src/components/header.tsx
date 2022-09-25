import React from 'react';
import { Hamburger } from './icons';
import LinkWrapper from './linkwrapper';
import { publicMenuItems, dashMenuItems } from './menuitems';

export const PublicHeader = () => (
  <nav
    className='text-primary-content min-w-full z-50 navbar p-1 fixed
    bg-gradient-to-b from-blue-700 to-blue-800 grid items-center'
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

export const ResponsiveHeader = ({ children }: any) => {
  return (
    <div className='drawer'>
      <input
        id='my-drawer-3'
        type='checkbox'
        className='drawer-toggle'
      />
      <div className='drawer-content flex flex-col'>
        <div className='z-50 w-full navbar bg-gradient-to-b from-blue-700 to-blue-800 text-gray-300 font-semibold shadow-sm'>
          <div className='flex-none lg:hidden'>
            <label
              htmlFor='my-drawer-3'
              className='btn btn-square btn-ghost'
            >
              {Hamburger}
            </label>
          </div>

          <h3 className='flex-1 text-xl md:text-2xl px-2 mx-2'>
            South Texas Eventing
          </h3>
          <span className='flex-none hidden lg:block'>
            <ul className='menu menu-horizontal rounded-box p-1 text-lg'>
              {publicMenuItems.map(({ href, name, render }) => (
                <React.Fragment key={name}>
                  {render ? (
                    render({ href, name })
                  ) : (
                    <li key={name}>
                      <LinkWrapper href={href}>{name}</LinkWrapper>
                    </li>
                  )}
                </React.Fragment>
              ))}
            </ul>
          </span>
        </div>
        {children}
      </div>

      <div className='drawer-side'>
        <label
          htmlFor='my-drawer-3'
          className='drawer-overlay'
        />
        <ul className='menu p-4 w-56 font-semibold'>
          {publicMenuItems.map(({ href, name, render }) => (
            <React.Fragment key={name}>
              {render ? (
                render({ href, name, drawer: true })
              ) : (
                <li key={name}>
                  <LinkWrapper href={href}>{name}</LinkWrapper>
                </li>
              )}
            </React.Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const DashboardHeader = () => (
  <nav
    className='text-primary-content h-full w-full z-50 max-h-20 md:max-h-14
      sm:max-h-fit fixed p-1 bg-gradient-to-b from-blue-700 to-blue-800'
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
