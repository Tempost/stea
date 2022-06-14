import { Heading, Box, Flex, HStack, Image, StackDivider, Center } from '@chakra-ui/react';

import LinkWrapper from './linkwrapper';
import { menuItems } from './menuitems';

const Divider = (
  <StackDivider borderColor='gray.400' maxHeight='25px' minHeight='1.5vmax' alignSelf='center' />
);

function Header() {
  return (
    <Center>
      <Box bg='blue.700' color='whiteAlpha.700'>
        <Flex justifyContent='space-between' ml={3}>
          <Flex alignItems='center'>
            <Image
              src='logo-nobackground-200.png'
              alt='STEA Logo'
              boxSize='100px'
              objectFit='scale-down'
            />


            <Flex direction='column' alignItems='center'>
              <p>South Texas</p>
              <p>Eventing Association</p>
            </Flex>
          </Flex>

          <HStack
            spacing='1px'
            divider={Divider}
          >
            {
              menuItems.map(({ href, name: navText, render }) => (
                <Box
                  m={2}
                  key={navText}
                  color='whiteAlpha.700'
                  _hover={{ color: 'maroon' }}
                  transition='color'
                >
                  {
                    render ?
                      render({ href, name: navText }) :

                      <LinkWrapper href={href}>
                        <Heading
                          as='h4'
                          fontSize='18px'
                        >
                          {navText}
                        </Heading>
                      </LinkWrapper>
                  }
                </Box>
              ))
            }
          </HStack>
        </Flex>
      </Box>
    </Center>
  );
}

export default Header;
