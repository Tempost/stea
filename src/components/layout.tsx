import Header from "./header";
import Footer from "./footer";

export default function Layout({ children }: any) {
  return (
    <>
      <Header />
      <main id='content'>
        {children}
      </main>
      <Footer />
    </>
  );
}
