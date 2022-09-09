import type { ReactElement } from 'react';
import { DashboardLayout } from '@/components/layout';

function Dashboard() {
  return <>Hello from Dashboard</>;
}

Dashboard.getLayout = (page: ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Dashboard;
