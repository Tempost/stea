import NavLinkMenu from './navlinkmenu';

interface Menu {
  href?: string;
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
    navText: 'Points',
    render: ({ navText }) =>
      <NavLinkMenu
        name={navText}
        routes={
          [
            {
              href: '/scores',
              text: 'Scores'
            },
            {
              href: '/scores/guidelines',
              text: 'Guidelines'
            }
          ]
        }
      />
  },
  {
    href: '/join',
    navText: 'Join',
  },
  {
    navText: 'Member Info',
    render: ({ navText }) =>
      <NavLinkMenu
        name={navText}
        routes={
          [
            {
              href: '/memberbenefits',
              text: 'Benifits'
            },
            {
              href: '/memberbenefits/scholarship',
              text: 'STEA Scholarship'
            }
          ]
        }
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
