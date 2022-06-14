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
    <Portal>
      <MenuList>
        {
          routes.map(({href, text}) => (
            <MenuItem key={href}>
              <LinkWrapper href={href ? href : ''}>
                <Text m={1} fontSize='16px'>
                  {text}
                </Text>
              </LinkWrapper>
            </MenuItem>
          ))
        }
      </MenuList>
    </Portal>
  );
}

export default function NavLinkMenu({ name, routes }: NavLinkMenuProps) {
  return (
    <Menu isLazy>
      <MenuButton
        as={Heading}
        fontSize='18px'
        className='ransition-colors text-gray-400 hover:text-gray-600'>
        {name}
        <ChevronDownIcon />
      </MenuButton>
      <MenuListWrapper routes={routes} />
    </Menu>
  );
}
