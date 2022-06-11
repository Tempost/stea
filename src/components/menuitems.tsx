import {
  Portal,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure
} from '@chakra-ui/react';

import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import LinkWrapper from './linkwrapper';

interface Menu {
  href: string;
  navText: string,
  render?: ({ href, navText }: Menu) => JSX.Element;
};

interface WrapperProps {
  href?: string;
  onOpen?: () => void;
  onClose?: () => void;
  navText: string;
}

function MenuListWrapper({ href, onOpen, onClose, navText }: WrapperProps) {
  return (
    <Portal>
      <MenuList transition='all 1s'>
        <MenuItem onMouseEnter={onOpen} onMouseLeave={onClose}>
          <LinkWrapper href={href ? href : ''}>
            <Heading m={1} as='h5' fontSize='16px'>
              {navText}
            </Heading>
          </LinkWrapper>
        </MenuItem>
      </MenuList>
    </Portal>
  );
}

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
    render: ({ navText }) => {
      const { isOpen, onOpen, onClose } = useDisclosure();

      return (
        <Menu isOpen={isOpen} isLazy>
          <MenuButton
            onMouseEnter={onOpen}
            onMouseLeave={onClose}
          >
            {navText}
            {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            <MenuListWrapper
              href='/points/guidelines'
              navText='Point Guidelines'
              onOpen={onOpen}
              onClose={onClose}
            />
          </MenuButton>
        </Menu>
      );
    }
  },
  {
    href: '/join',
    navText: 'Join',
  },
  {
    href: '/calender',
    navText: 'Calender',
  },
  {
    href: '/memberbenefits',
    navText: 'Member Benefits',
    render: ({ navText }) => {
      const { isOpen, onOpen, onClose } = useDisclosure();

      return (
        <Menu isOpen={isOpen} isLazy>
          <MenuButton
            onMouseEnter={onOpen}
            onMouseLeave={onClose}
          >
            {navText}
            {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            <MenuListWrapper
              href='/memberbenefits/scholarship'
              navText='STEA Scholarship'
              onOpen={onOpen}
              onClose={onClose}
            />
          </MenuButton>
        </Menu>
      );
    }
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
