import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';
import { fetchLoggedUser } from '@/fetchers/user-fetcher.server';
import ProfileForm from '@/components/forms/ProfileForm';
import { redirect } from 'next/navigation';

export default async function Page() {
  const loggedUser = await fetchLoggedUser();
  if (!loggedUser) redirect('/sign-in');
  return (
    <>
      <Header loggedUser={loggedUser} />
      <main className={'bg-gray-50'}>
        <ProfileForm loggedUser={loggedUser} />
      </main>
      <Footer />
    </>
  );
}