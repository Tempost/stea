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

interface Router {
    href: string;
    text: string;
}

interface WrapperProps {
  routes: Router[];
}

interface NavLinkMenuProps {
  name: string;
  routes: Router[];
}

function MenuListWrapper({ routes }: WrapperProps) {
  return (
    <MenuList>
      {
        routes.map(({ href, text }) => (
          <MenuItem key={href}>
            <LinkWrapper href={href ? href : ''}>
              <Text color='white' m={1} fontSize='15px'>
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
        cursor='pointer'
        fontSize='15px'
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
