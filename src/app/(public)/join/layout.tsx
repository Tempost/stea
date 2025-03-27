import { LayoutProps } from '@/types/common';
import ReturnButton from './Return';
import Card from '@/components/card/Card';

const ChildLayout = ({ children }: LayoutProps) => (
  <div className='bg-form-hero h-full grow bg-cover bg-center p-4 sm:p-8 md:p-10 lg:p-16'>
    <div className='grid h-full place-content-center'>
      <Card className='shadow-xl'>
        <Card.Body>
          <ReturnButton />
          {children}
        </Card.Body>
      </Card>
    </div>
  </div>
);

export default ChildLayout;

export const metadata = {
  title: 'Join',
  description: 'Form selection for different types of sign ups to stea',
};
