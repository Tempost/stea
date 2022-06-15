import { Heading, Box, Flex, HStack, Image, StackDivider } from '@chakra-ui/react';

import LinkWrapper from './linkwrapper';
import { menuItems } from './menuitems';

const Divider = (
  <StackDivider borderColor='whiteAlpha.700' maxHeight='25px' minHeight='1.5vmax' alignSelf='center' />
);

function Header() {
  return (
    <Flex
      justifyContent='space-between'
      as='header'
      bg='blue.700'
      color='whiteAlpha.700'
    >
      <Flex alignItems='center'>
        <Image
          src='logo-nobackground-200.png'
          alt='STEA Logo'
          boxSize='7.5rem'
          objectFit='scale-down'
          padding='1'
        />


        <Flex direction='column' textAlign='center' m={1}>
          <Heading as='h2' fontSize='20px'>South Texas<br />Eventing Association</Heading>
        </Flex>
      </Flex>

      <HStack
        spacing='0px'
        divider={Divider}
      >
        {
          menuItems.map(({ href, name, render }) => (
            <Box
              m={2}
              key={name}
              _hover={{ color: 'whiteAlpha.900' }}
            >
              {
                render ?
                  render({ href, name }) :

                  <LinkWrapper href={href}>
                    <Heading
                      as='h2'
                      fontSize='15px'
                    >
                      {name}
                    </Heading>
                  </LinkWrapper>
              }
            </Box>
          ))
        }
      </HStack>
    </Flex>
  );
}

export default Header;
