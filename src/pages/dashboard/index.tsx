import { DashboardLayout } from '@/components/layout';
import type { ReactElement } from 'react';

function Dashboard() {
  return <>Hello from Dashboard</>;
}

Dashboard.getLayout = (page: ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Dashboard;
