import NavLinkMenu from './navlinkmenu';

interface Menu {
  href: string;
  navText: string,
  render?: ({ href, navText }: Menu) => JSX.Element;
};

export const menuItems: Menu[] = [
  {
    href: '/',
    navText: 'Home',
  },
  {
    href: '/members-horses',
    navText: 'Members & Horses',
  },
  {
    href: '/points',
    navText: 'Points',
    render: ({ navText }) =>
      <NavLinkMenu
        href='/points/guidelines'
        name={navText}
        menuText='Point Guidelines'
      />
  },
  {
    href: '/join',
    navText: 'Join',
  },
  {
    href: '/memberbenefits',
    navText: 'Member Benefits',
    render: ({ navText }) =>
      <NavLinkMenu
        href='/memberbenefits/scholarship'
        name={navText}
        menuText='STEA Scholarship'
      />
  },
  {
    href: '/calender',
    navText: 'Calender',
  },
  {
    href: '/contactus',
    navText: 'Contact Us',
  },
];
