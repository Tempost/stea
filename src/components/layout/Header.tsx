import { Fragment, PropsWithChildren } from 'react';
import { Hamburger, MobileMenu } from '@/components/icons';
import LinkWrapper from '@/components/LinkWrapper';
import { publicMenuItems, dashMenuItems } from '@/components/MenuItems';
import Link from 'next/link';

// TODO: Please type my props
export const ResponsiveHeader = ({ children }: PropsWithChildren) => {
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
              className='btn-ghost btn-square btn'
            >
              {Hamburger}
            </label>
          </div>

          <h3 className='mx-2 flex-1 px-2 text-xl md:text-2xl'>
            South Texas Eventing
          </h3>
          <span className='hidden flex-none lg:block'>
            <ul className='menu rounded-box menu-horizontal p-0 text-lg'>
              {publicMenuItems.map(({ href, name, render }) => (
                <Fragment key={name}>
                  {render ? (
                    render({ href, name })
                  ) : (
                    <li>
                      <LinkWrapper href={href}>{name}</LinkWrapper>
                    </li>
                  )}
                </Fragment>
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
        <ul className='menu w-40 p-1 text-sm font-semibold'>
          {publicMenuItems.map(({ href, name, render }) => (
            <Fragment key={name}>
              {render ? (
                render({ href, name, drawer: true })
              ) : (
                <li key={name}>
                  <LinkWrapper href={href}>{name}</LinkWrapper>
                </li>
              )}
            </Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const DashboardHeader = () => (
  <nav
    className='navbar z-50 w-full bg-gradient-to-b from-blue-700 
    to-blue-800 font-semibold text-gray-300 shadow-sm'
  >
    <div className='navbar-start dropdown'>
      <ul className='dropdown-content menu rounded-box menu-horizontal p-0 lg:text-xl'>
        {dashMenuItems.map(({ href, name, render }) => (
          <Fragment key={name}>
            {render ? (
              render({ href, name })
            ) : (
              <li>
                <LinkWrapper href={href}>{name}</LinkWrapper>
              </li>
            )}
          </Fragment>
        ))}
      </ul>
    </div>
  </nav>
);

export const ResponsiveDashboardHeader = () => (
  <div
    className='navbar bg-gradient-to-b from-blue-700 to-blue-800
    font-semibold text-gray-300 shadow-sm'
  >
    <div>
      <div className='dropdown'>
        <label
          tabIndex={0}
          className='btn-ghost btn lg:hidden'
        >
          {MobileMenu}
        </label>
        <ul
          tabIndex={0}
          className='dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-primary p-2 shadow'
        >
          {dashMenuItems.map(({ href, name, render }) => (
            <Fragment key={name}>
              {render ? (
                render({ href, name })
              ) : (
                <li>
                  <LinkWrapper href={href}>{name}</LinkWrapper>
                </li>
              )}
            </Fragment>
          ))}
        </ul>
      </div>
      <Link
        href='/'
        className='btn-ghost btn text-xl normal-case'
      >
        Home
      </Link>
    </div>
    <div className='navbar-start hidden lg:flex'>
      <ul className='menu menu-horizontal p-0'>
        {dashMenuItems.map(({ href, name, render }) => (
          <Fragment key={name}>
            {render ? (
              render({ href, name })
            ) : (
              <li>
                <LinkWrapper href={href}>{name}</LinkWrapper>
              </li>
            )}
          </Fragment>
        ))}
      </ul>
    </div>
  </div>
);
