import {
  Heading,
  Text,
  Menu,
  MenuButton,
  Portal,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';

import { ChevronDownIcon } from '@chakra-ui/icons';

import LinkWrapper from './linkwrapper';

interface WrapperProps {
  routes: {
    href: string,
    text: string
  }[]
}

interface NavLinkMenuProps {
  name: string,
  routes: {
    href: string,
    text: string
  }[]
}

function MenuListWrapper({ routes }: WrapperProps) {
  return (
    <MenuList>
      {
        routes.map(({ href, text }) => (
          <MenuItem key={href}>
            <LinkWrapper href={href ? href : ''}>
              <Text color='white' m={1} fontSize='16px'>
                {text}
              </Text>
            </LinkWrapper>
          </MenuItem>
        ))
      }
    </MenuList>
  );
}

export default function NavLinkMenu({ name, routes }: NavLinkMenuProps) {
  return (
    <Menu isLazy>
      <MenuButton
        as={Heading}
        fontSize='18px'
        cursor='pointer'
      >
        {name}
        <ChevronDownIcon />
      </MenuButton>
      <Portal>
        <MenuListWrapper routes={routes} />
      </Portal>
    </Menu>
  );
}
