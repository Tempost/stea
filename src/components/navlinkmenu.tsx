import LinkWrapper from './linkwrapper';

interface Link {
  href: string;
  text: string;
}

interface NavLinkMenuProps {
  name: string;
  subLinks: Link[];
  drawer?: true;
}

const ChevDown = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='h-5 w-5'
    viewBox='0 0 20 20'
    fill='currentColor'
  >
    <path
      fillRule='evenodd'
      d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
      clipRule='evenodd'
    />
  </svg>
);

export default function NavLinkMenu({ name, subLinks }: NavLinkMenuProps) {
  return (
    <div className='dropdown dropdown-hover'>
      <h2
        tabIndex={0}
        className='flex cursor-pointer items-center text-2xl'
      >
        {name}
        <span>{ChevDown}</span>
      </h2>
      <ul className='dropdown-content menu w-52 rounded-md bg-primary-content p-2 shadow'>
        {subLinks.map(({ href, text }) => (
          <li key={`${href}${text}`}>
            <LinkWrapper href={href ? href : ''}>
              <span className='m-1 text-sm'>{text}</span>
            </LinkWrapper>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function NavLinkSubMenu({ name, subLinks, drawer }: NavLinkMenuProps) {
  const subMenu = (
    <li
      tabIndex={0}
      className='z-20'
    >
      <span>
        {name} {ChevDown}
      </span>
      <ul
        className={`bg-primary text-base shadow-2xl ${drawer ? '' : 'right-0'}`}
      >
        {subLinks.map(({ href, text }) => (
          <li key={`${href}${text}`}>
            <LinkWrapper href={href ? href : ''}>
              <span className='font-semibold'>{text}</span>
            </LinkWrapper>
          </li>
        ))}
      </ul>
    </li>
  );

  return subMenu;
}
