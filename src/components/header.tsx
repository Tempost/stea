import { Heading, Text } from '@chakra-ui/react';

import LinkWrapper from './linkwrapper';
import { menuItems } from './menuitems';

function Header() {
  return (
    <div className='flex bg-blue-50 justify-between'>
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
          menuItems.map(({ href, navText, render: render }) => (
            <LinkWrapper key={navText} href={href}>
              <Heading  className='' m={5} as='h4' fontSize='18px'>
                {
                  render ?
                    render({ href, navText }) :
                    <Text className='transition-colors text-gray-400 hover:text-black'>
                      {navText}
                    </Text>
                }
              </Heading>
            </LinkWrapper>
          ))
        }
      </div>
    </div>
  );
}

export default Header;
