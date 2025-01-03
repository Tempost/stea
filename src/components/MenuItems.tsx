import { ReactNode } from 'react';
import NavLinkSubMenu from './NavLinkMenu';

interface Menu {
  href?: string;
  name: string;
  drawer?: true;
  render?(menu: Menu): ReactNode;
}

export const publicMenuItems: Array<Menu> = [
  {
    href: '/',
    name: 'Home',
  },
  {
    href: '/members-horses',
    name: 'Members & Horses',
  },
  {
    href: '/scores',
    name: 'Points',
  },
  {
    href: '/calendar',
    name: 'Calendar',
  },
  {
    name: 'Join',
    render: ({ name, drawer }) => (
      <NavLinkSubMenu
        name={name}
        drawer={drawer}
        subLinks={[
          {
            href: '/join',
            text: 'Apply for STEA Membership',
          },
          {
            href: '/benefits',
            text: 'Member Benefits',
          },
          {
            href: '/scholarship',
            text: 'STEA Scholarship',
          },
        ]}
      />
    ),
  },
  {
    href: '/contactus',
    name: 'Contact Us',
  },
];

export const dashMenuItems: Array<Menu> = [
  {
    name: 'Applications',
    href: '/dashboard/applications',
  },
  {
    href: '/dashboard/tables/members',
    name: 'Tables',
  },
  {
    href: '/dashboard/submit',
    name: 'Submit Points',
  },
  {
    name: 'Documents',
    render: ({ name }) => (
      <NavLinkSubMenu
        name={name}
        subLinks={[
          {
            href: '/STEA_Show_Results_Form_A.xlsx',
            text: 'Point submission form',
          },
          {
            href: '/stea_org_packet.pdf',
            text: 'Organizer Pack',
          },
        ]}
      />
    ),
  },
];
