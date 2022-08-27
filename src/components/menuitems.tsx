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
    href: '/scores',
    name: 'Points',
  },
  {
    href: '/calender',
    name: 'Calender',
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
            text: 'Member Benefits',
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
    href: '/contactus',
    name: 'Contact Us',
  },
];

export const dashMenuItems: Menu[] = [
  {
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
    name: 'Documents',
    // TODO: Add download links to the download options
    render: ({ name: navText }) => (
      <NavLinkMenu
        name={navText}
        routes={
          [
            {
              href: '',
              text: 'Point submission form',
            },
            {
              href: '',
              text: 'Organizer Pack',
            },
          ]}
      />
    ),
  },
];
