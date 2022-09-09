import { PublicLayout } from '@/components/layout';
function SteaCalender() {}
import { ReactElement } from 'react';
SteaCalender.getLayout = (page: ReactElement) => {
  return <PublicLayout>{page}</PublicLayout>;
};

export default SteaCalender;
