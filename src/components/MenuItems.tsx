import NavLinkSubMenu from './NavLinkMenu';

interface Menu {
  href?: string;
  name: string;
  drawer?: true;
  render?: ({ href, name }: Menu) => JSX.Element;
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
    name: 'Applications',
    href: '/dashboard/review/applications',
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
