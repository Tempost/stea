import { ReactElement } from 'react';
import { PublicLayout } from '@/components/layout';
import Calender from 'react-calendar';

function SteaCalender() {
  return (<Calender/>);
}

SteaCalender.getLayout = (page: ReactElement) => {
  return <PublicLayout>{page}</PublicLayout>;
};

export default SteaCalender;
