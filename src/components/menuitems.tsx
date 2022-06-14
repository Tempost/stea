import NavLinkMenu from './navlinkmenu';

interface Menu {
  href?: string;
  name: string,
  render?: ({ href, name: navText }: Menu) => JSX.Element;
};

export const menuItems: Menu[] = [
  {
    href: '/',
    name: 'Home',
  },
  {
    href: '/members-horses',
    name: 'Members & Horses',
  },
  {
    name: 'Points',
    render: ({ name: navText }) =>
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
    name: 'Join',
    render: ({ name: navText }) =>
      <NavLinkMenu
        name={navText}
        routes={
          [
            {
              href: '/join',
              text: 'Apply for STEA Membership',
            },
            {
              href: '/join/benefits',
              text: 'Member Benifits'
            },
            {
              href: '/join/scholarship',
              text: 'STEA Scholarship'
            }
          ]
        }
      />
  },
  {
    href: '/calender',
    name: 'Calender',
  },
  {
    href: '/contactus',
    name: 'Contact Us',
  },
];
