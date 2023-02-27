import { PublicLayout } from '@/components/layout/PublicLayout';
function SteaScholarship() {}
import { ReactElement } from 'react';
SteaScholarship.getLayout = (page: ReactElement) => {
  return <PublicLayout>{page}</PublicLayout>;
};

export default SteaScholarship;
