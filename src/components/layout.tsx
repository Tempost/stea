import Header from './header';
import Footer from './footer';

export default function Layout({ children }: any) {
  return (
    <div className='flex flex-col h-screen'>
      <Header />
      <main className='flex-grow bg-neutral-content'>{children}</main>
      <Footer />
    </div>
  );
}
