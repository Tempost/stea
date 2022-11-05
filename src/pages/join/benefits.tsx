import { PublicLayout } from '@/components/layout';
function SteaBeneifits() {
  return <p>"hello world"</p>;
}
import { ReactElement } from 'react';
SteaBeneifits.getLayout = (page: ReactElement) => {
  return <PublicLayout>{page}</PublicLayout>;
};

export default SteaBeneifits;
