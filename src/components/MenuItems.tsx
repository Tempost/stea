import { ReactNode } from 'react';

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
    href: '/join',
  },
  {
    href: '/contactus',
    name: 'Contact Us',
  },
];
