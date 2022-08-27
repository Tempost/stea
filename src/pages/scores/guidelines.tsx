import { PublicLayout } from '@/components/layout';
import { ReactElement } from 'react';

function SteaGuidelines() {}

SteaGuidelines.getLayout = (page: ReactElement) => {
  return <PublicLayout>{page}</PublicLayout>;
};

export default SteaGuidelines;
