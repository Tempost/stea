import LinkWrapper from './linkwrapper';

interface Router {
  href: string;
  text: string;
}

interface NavLinkMenuProps {
  name: string;
  routes: Router[];
}

export default function NavLinkMenu({ name, routes }: NavLinkMenuProps) {
  return (
    <div className='dropdown dropdown-hover'>
      <h2 tabIndex={0} className='text-xl cursor-pointer'>
        {name}
      </h2>
      <ul className='dropdown-content menu p-2 shadow bg-neutral-content w-52 text-neutral-focus rounded-lg'>
        {
          routes.map(({ href, text }) => (
            <li key={href}>
              <LinkWrapper href={href ? href : ''}>
                <span className='m-1 text-sm'>
                  {text}
                </span>
              </LinkWrapper>
            </li>
          ))
        }
      </ul>
    </div>
  );
}
