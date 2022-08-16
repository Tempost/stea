import NavLinkMenu from './navlinkmenu';

interface Menu {
  href?: string;
  name: string;
  render?: ({ href, name: navText }: Menu) => JSX.Element;
}

export const publicMenuItems: Menu[] = [
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
    render: ({ name: navText }) => (
      <NavLinkMenu
        name={navText}
        routes={[
          {
            href: '/scores',
            text: 'Scores',
          },
          {
            href: '/scores/guidelines',
            text: 'Guidelines',
          },
        ]}
      />
    ),
  },
  {
    name: 'Join',
    render: ({ name: navText }) => (
      <NavLinkMenu
        name={navText}
        routes={[
          {
            href: '/join',
            text: 'Apply for STEA Membership',
          },
          {
            href: '/join/benefits',
            text: 'Member Benifits',
          },
          {
            href: '/join/scholarship',
            text: 'STEA Scholarship',
          },
        ]}
      />
    ),
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

export const dashMenuItems: Menu[] = [
  {
    href: '',
    name: 'Review',
    render: ({ name: navText }) => (
      <NavLinkMenu
        name={navText}
        routes={[
          {
            href: '/dashboard/review/points',
            text: 'Points',
          },
          {
            href: '/dashboard/review/applications',
            text: 'Applications',
          },
        ]}
      />
    ),
  },
  {
    href: '/dashboard/tables',
    name: 'Tables',
  },
  {
    href: '/dashboard/submit',
    name: 'Submit Points',
  },
  {
    href: '',
    name: 'Documents',
  },
];
