import Head from 'next/head'

import Header from "./header";
import Footer from "./footer";

function Layout({ children }: any) {
  return (
    <>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
}

export default Layout;
