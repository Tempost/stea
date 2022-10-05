import { ReactElement } from 'react';
import { PublicLayout } from '@/components/layout';

function SteaCalender() {}

SteaCalender.getLayout = (page: ReactElement) => {
  return <PublicLayout>{page}</PublicLayout>;
};

export default SteaCalender;
