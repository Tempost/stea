import { LayoutProps } from '@/types/common';
import TableSelect from './TableSelect';

function Layout({ children }: LayoutProps) {
  return (
    <div className='flex w-full flex-col gap-10'>
      <TableSelect />
      {children}
    </div>
  );
}

export default Layout;
