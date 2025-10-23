import { Hamburger, MobileMenu } from '@/components/icons';
import LinkWrapper from '@/components/LinkWrapper';
import { publicMenuItems, Menu } from '@/components/MenuItems';
import { memo } from 'react';

const MenuItems = memo(({ items }: { items: Array<Menu> }) =>
  items.map(({ href, name }) => (
    <li key={name}>
      <LinkWrapper to={href}>{name}</LinkWrapper>
    </li>
  )),
);

MenuItems.displayName = 'MenuItems';

export const Header = () => (
  <div className='navbar from-primary to-primary-dark bg-gradient-to-b text-gray-300 shadow-sm'>
    <div className='navbar-start'>
      <div className='dropdown'>
        <div
          tabIndex={0}
          role='button'
          className='btn btn-ghost lg:hidden'
        >
          {Hamburger}
        </div>
        <ul className='menu menu-sm dropdown-content bg-primary rounded-box z-1 mt-3 w-52 p-2 shadow'>
          <MenuItems items={publicMenuItems} />
        </ul>
      </div>
      <h1 className='mx-2 flex-1 px-2 text-xs sm:text-sm md:text-lg lg:text-xl'>
        South Texas Eventing
      </h1>
    </div>

    <div className='navbar-center hidden lg:flex'>
      <ul className='menu menu-lg menu-horizontal px-1'>
        <MenuItems items={publicMenuItems} />
      </ul>
    </div>
  </div>
);

export const ResponsiveDashboardHeader = () => (
  <div className='navbar from-primary to-primary-dark bg-gradient-to-b font-semibold text-gray-300'>
    {/* Desktop Navbar */}
    <div className='navbar-start hidden lg:flex'>
      <ul className='menu menu-horizontal px-1'>
        <li>
          <LinkWrapper to='/'>Home</LinkWrapper>
        </li>

        <li>
          <LinkWrapper to='/dashboard/applications'>Applications</LinkWrapper>
        </li>
        <li>
          <LinkWrapper to='/dashboard/directory/members'>Directory</LinkWrapper>
        </li>
        <li>
          <LinkWrapper to='/dashboard/submit'>Submit Points</LinkWrapper>
        </li>
        <li tabIndex={0}>
          <details className='z-50'>
            <summary>Documents</summary>
            <ul className='bg-primary text-xs shadow-2xl lg:text-sm'>
              <li>
                <LinkWrapper to='/STEA_Show_Results_Form_A.xlsx'>
                  Point Submission Form
                </LinkWrapper>
              </li>
              <li>
                <LinkWrapper
                  to='/stea_org_packet.pdf'
                  target='_blank'
                >
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
        className='menu dropdown-content menu-sm rounded-box bg-primary z-[1] mt-3 w-52 p-2 shadow-sm'
      >
        <li>
          <LinkWrapper to='/'>Home</LinkWrapper>
        </li>

        <li>
          <LinkWrapper to='/dashboard/applications'>Applications</LinkWrapper>
        </li>
        <li>
          <LinkWrapper to='/dashboard/directory/members'>Directory</LinkWrapper>
        </li>
        <li>
          <LinkWrapper to='/dashboard/submit'>Submit Points</LinkWrapper>
        </li>
        <li>
          <a>Documents</a>
          <ul className='p-2'>
            <li>
              <LinkWrapper to='/STEA_Show_Results_Form_A.xlsx'>
                Point Submission Form
              </LinkWrapper>
            </li>
            <li>
              <LinkWrapper to='/stea_org_packet.pdf'>
                Organizer Pack
              </LinkWrapper>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
);
