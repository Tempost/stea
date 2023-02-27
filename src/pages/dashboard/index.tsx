import type { ReactElement } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

function Dashboard() {
  return (
    <span className='grid h-full place-content-center'>
      Welcome board members!
    </span>
  );
}

Dashboard.getLayout = (page: ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Dashboard;
