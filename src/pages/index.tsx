import type { NextPage } from 'next'
import Head from 'next/head'
import Home from './home';

const Index: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Stea</title>
        <meta name="description" content="STEA dressage" />
      </Head>

      <main>
        <Home />
      </main>

    </div>
  )
}

export default Index
