import { LayoutProps } from '@/types/common';
import ReturnButton from './Return';

const ChildLayout = ({ children }: LayoutProps) => (
  <div className='h-full flex-grow bg-base-100 bg-form-hero bg-cover bg-center p-4 sm:p-8 md:p-10 lg:p-16'>
    <div className='grid h-full place-content-center'>
      <div className='card w-fit bg-base-100 p-5 shadow-[0_0_10px_0_rgba(0,0,0,0.3)] md:p-8'>
        <ReturnButton />
        {children}
      </div>
    </div>
  </div>
);

export default ChildLayout;

export const metadata = {
  title: 'Join',
  description: 'Form selection for different types of sign ups to stea',
};
