import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';

export default function DefaultLayout({
                                        children,
                                      }: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      <Header />
      <main className={'bg-gray-50'}>
        {children}
      </main>
      <Footer />
    </>
  );
}