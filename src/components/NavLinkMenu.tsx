import { ChevDown } from './icons';
import LinkWrapper from './LinkWrapper';

interface Link {
  href: string;
  text: string;
}

interface NavLinkMenuProps {
  name: string;
  subLinks: Link[];
  drawer?: true;
}

export default function NavLinkSubMenu({
  name,
  subLinks,
  drawer,
}: NavLinkMenuProps) {
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
