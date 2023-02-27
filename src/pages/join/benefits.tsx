import { PublicLayout } from '@/components/layout/PublicLayout';
function SteaBeneifits() {}
import { ReactElement } from 'react';
SteaBeneifits.getLayout = (page: ReactElement) => {
  return <PublicLayout>{page}</PublicLayout>;
};

export default SteaBeneifits;
