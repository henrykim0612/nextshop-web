import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';
import { fetchLoggedUser } from '@/fetchers/user-fetcher.server';

export default async function DefaultLayout({
                                              children,
                                            }: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedUser = await fetchLoggedUser();
  return (
    <>
      <Header loggedUser={loggedUser} />
      <main className={'bg-gray-50'}>
        {children}
      </main>
      <Footer />
    </>
  );
}