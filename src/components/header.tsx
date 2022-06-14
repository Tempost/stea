import { Heading, Text } from '@chakra-ui/react';

import LinkWrapper from './linkwrapper';
import { menuItems } from './menuitems';

function Header() {
  return (
    <div className='bg-blue-50'>
      <div className='flex justify-between ml-5 mr-5'>
        <span className='flex flex-col text-center'>
          <Heading m='auto' mb={0} as='h1' fontSize='50px'>
            STEA
          </Heading>

          <Text>
            South Texas Eventing Association
          </Text>
        </span>

        <div className='flex justify-between self-center'>
          {
            menuItems.map(({ href, navText, render }) => (
            <div className='m-2'>
              <LinkWrapper key={navText} href={href}>
                {
                  render ?
                    render({ href, navText }) :

                    <Heading as='h4' fontSize='18px' className='transition-colors text-gray-400 hover:text-gray-600'>
                      {navText}
                    </Heading>
                }
              </LinkWrapper>
            </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default Header;
