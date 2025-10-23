export interface Menu {
  href?: string;
  name: string;
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
    href: '/points',
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
