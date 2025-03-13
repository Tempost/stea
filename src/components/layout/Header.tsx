import { Hamburger, MobileMenu } from '@/components/icons';
import LinkWrapper from '@/components/LinkWrapper';
import { publicMenuItems } from '@/components/MenuItems';
import { Fragment, PropsWithChildren } from 'react';

export const ResponsiveHeader = ({ children }: PropsWithChildren) => {
  return (
    <div className='drawer'>
      <input
        id='my-drawer-3'
        type='checkbox'
        className='drawer-toggle'
      />
      <div className='drawer-content flex flex-col'>
        <div className='navbar w-full bg-gradient-to-b from-blue-700 to-blue-800 font-semibold text-gray-300 shadow-sm'>
          <div className='flex-none lg:hidden'>
            <label
              htmlFor='my-drawer-3'
              aria-label='open sidebar'
              className='btn btn-square btn-ghost'
            >
              {Hamburger}
            </label>
          </div>

          <h3 className='mx-2 flex-1 px-2 text-xl md:text-2xl'>
            South Texas Eventing
          </h3>
          <span className='hidden flex-none lg:block'>
            <ul className='menu join menu-horizontal p-0 text-lg'>
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

      <div className='drawer-side z-50'>
        <label
          htmlFor='my-drawer-3'
          aria-label='close sidebar'
          className='drawer-overlay'
        />
        <ul className='menu min-h-full w-fit p-4 text-sm font-semibold'>
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

export const ResponsiveDashboardHeader = () => (
  <div className='navbar bg-gradient-to-b from-blue-700 to-blue-800 font-semibold text-gray-300 shadow-sm'>
    {/* Desktop Navbar */}
    <div className='navbar-start hidden lg:flex'>
      <ul className='menu menu-horizontal px-1'>
        <li>
          <LinkWrapper href='/'>Home</LinkWrapper>
        </li>

        <li>
          <LinkWrapper href='/dashboard/applications'>Applications</LinkWrapper>
        </li>
        <li>
          <LinkWrapper href='/dashboard/directory/members'>
            Directory
          </LinkWrapper>
        </li>
        <li>
          <LinkWrapper href='/dashboard/submit'>Submit Points</LinkWrapper>
        </li>
        <li tabIndex={0}>
          <details>
            <summary>Documents</summary>
            <ul className='bg-primary text-xs shadow-2xl lg:text-sm'>
              <li>
                <LinkWrapper href='/STEA_Show_Results_Form_A.xlsx'>
                  Point Submission Form
                </LinkWrapper>
              </li>
              <li>
                <LinkWrapper href='/stea_org_packet.pdf'>
                  Organizer Pack
                </LinkWrapper>
              </li>
            </ul>
          </details>
        </li>
      </ul>
    </div>

    {/* Mobile/Small screen Navbar */}
    <div className='dropdown'>
      <label
        tabIndex={0}
        className='btn btn-ghost lg:hidden'
      >
        {MobileMenu}
      </label>
      <ul
        tabIndex={0}
        className='menu dropdown-content rounded-box menu-sm z-[1] mt-3 w-52 bg-primary p-2 shadow'
      >
        <li>
          <LinkWrapper href='/'>Home</LinkWrapper>
        </li>

        <li>
          <LinkWrapper href='/dashboard/applications'>Applications</LinkWrapper>
        </li>
        <li>
          <LinkWrapper href='/dashboard/directory/members'>
            Directory
          </LinkWrapper>
        </li>
        <li>
          <LinkWrapper href='/dashboard/submit'>Submit Points</LinkWrapper>
        </li>
        <li>
          <a>Documents</a>
          <ul className='p-2'>
            <li>
              <LinkWrapper href='/STEA_Show_Results_Form_A.xlsx'>
                Point Submission Form
              </LinkWrapper>
            </li>
            <li>
              <LinkWrapper href='/stea_org_packet.pdf'>
                Organizer Pack
              </LinkWrapper>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
);
