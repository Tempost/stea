import { Heading } from '@chakra-ui/react';

import LinkWrapper from './linkwrapper';
import { menuItems } from './menuitems';

function Header() {
  return (
    <div className='flex bg-blue-50'>
      <Heading m={4} as='h1' fontSize='50px'>STEA</Heading>
      <div className='flex justify-between'>
        {
          menuItems.map(({ href, navText, render: render }) => (
            <LinkWrapper href={href}>
              <Heading className='' m={5} as='h4' fontSize='18px'>
                {render ? render({ href, navText }) : navText}
              </Heading>
            </LinkWrapper>
          ))
        }
      </div>
    </div>
  );
}

export default Header;
