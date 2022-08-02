import { PublicLayout } from '@/components/layout';
function SteaGuidelines() {}
import { ReactElement } from 'react';
SteaGuidelines.getLayout = (page: ReactElement) => {
  return <PublicLayout>{page}</PublicLayout>;
};

export default SteaGuidelines;
