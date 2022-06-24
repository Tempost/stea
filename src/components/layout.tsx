import Header from "./header";
import Footer from "./footer";

export default function Layout({ children }: any) {
  return (
    <>
      <Header />
      <main className='p-4'>
        {children}
      </main>
      <Footer />
    </>
  );
}
