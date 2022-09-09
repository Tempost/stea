import LinkWrapper from './linkwrapper';

interface Router {
  href: string;
  text: string;
}

interface NavLinkMenuProps {
  name: string;
  routes: Router[];
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

export default function NavLinkMenu({ name, routes }: NavLinkMenuProps) {
  return (
    <div className='dropdown dropdown-hover'>
      <h2
        tabIndex={0}
        className='text-xl cursor-pointer flex items-center'
      >
        {name}
        <span className=''>{ChevDown}</span>
      </h2>
      <ul className='dropdown-content menu p-2 shadow bg-primary-content w-52 text-neutral-focus rounded-md'>
        {routes.map(({ href, text }) => (
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
