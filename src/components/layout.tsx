import Head from 'next/head'

import Header from "./header";
import Footer from "./footer";

function Layout({ children }: any) {
  return (
    <>
      <Head>
        <title>Stea</title>
        <meta
          name="description"
          content="STEA dressage"
          charSet="UTF-8"
          lang="en"
        />
      </Head>

      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
}

export default Layout;
