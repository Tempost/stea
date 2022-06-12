import {
  Text,
  Menu,
  MenuButton,
  useDisclosure,
  Portal,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';

import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

import LinkWrapper from './linkwrapper';

interface WrapperProps {
  href?: string;
  onOpen?: () => void;
  onClose?: () => void;
  menuItem: string;
}

interface NavLinkMenuProps {
  name: string,
  menuText: string,
  href?: string
}

function MenuListWrapper({ href, onOpen, onClose, menuItem: navText }: WrapperProps) {
  return (
    <Portal>
      <MenuList >
        <MenuItem onMouseEnter={onOpen} onMouseLeave={onClose}>
          <LinkWrapper href={href ? href : ''}>
            <Text m={1} fontSize='16px' className=''>
              {navText}
            </Text>
          </LinkWrapper>
        </MenuItem>
      </MenuList>
    </Portal>
  );
}

export default function NavLinkMenu({ name, menuText, href }: NavLinkMenuProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Menu isOpen={isOpen} isLazy>
      <MenuButton
        onMouseEnter={onOpen}
        onMouseLeave={onClose}
      >
        <Text className={`transition-colors text-gray-400 ${isOpen ? 'text-black' : ''}`}>
          {name}
          {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </Text>
        <MenuListWrapper
          href={href}
          menuItem={menuText}
          onOpen={onOpen}
          onClose={onClose}
        />
      </MenuButton>
    </Menu>
  );
}
