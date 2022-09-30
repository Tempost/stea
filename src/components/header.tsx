import React from 'react';
import { Hamburger } from './icons';
import LinkWrapper from './linkwrapper';
import { publicMenuItems, dashMenuItems } from './menuitems';

export const PublicHeader = () => (
  <nav
    className='navbar fixed z-50 grid min-w-full items-center
    bg-gradient-to-b from-blue-700 to-blue-800 p-1 text-primary-content'
  >
    <div className='navbar-center flex flex-col items-center'>
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
        <div className='navbar z-50 w-full bg-gradient-to-b from-blue-700 to-blue-800 font-semibold text-gray-300 shadow-sm'>
          <div className='flex-none lg:hidden'>
            <label
              htmlFor='my-drawer-3'
              className='btn btn-ghost btn-square'
            >
              {Hamburger}
            </label>
          </div>

          <h3 className='mx-2 flex-1 px-2 text-xl md:text-2xl'>
            South Texas Eventing
          </h3>
          <span className='hidden flex-none lg:block'>
            <ul className='menu rounded-box menu-horizontal p-1 text-lg'>
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
        <ul className='menu w-56 p-4 font-semibold'>
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
    className='fixed z-50 h-full max-h-20 w-full bg-gradient-to-b
      from-blue-700 to-blue-800 p-1 text-primary-content sm:max-h-fit md:max-h-14'
  >
    <div className='grid h-full place-items-center'>
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
