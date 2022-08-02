import { PublicLayout } from '@/components/layout';
function SteaPoints() {}
import { ReactElement } from 'react';
SteaPoints.getLayout = (page: ReactElement) => {
  return <PublicLayout>{page}</PublicLayout>;
};

export default SteaPoints;
