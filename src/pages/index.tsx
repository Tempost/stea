function Index(): ReactElement {
  return (
    <div>
      <main>
        Main
      </main>
    </div>
  )
}

import type { ReactElement } from 'react';
import Layout from '@/components/layout';

Index.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
}

export default Index
