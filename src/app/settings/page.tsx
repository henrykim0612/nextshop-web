import { fetchLoggedUser } from '@/fetchers/user-fetcher.server';
import SettingsForm from '@/components/forms/SettingsForm';
import { redirect } from 'next/navigation';

export default async function Page() {
  const loggedUser = await fetchLoggedUser();
  if (!loggedUser) redirect('/sign-in');
  return (
    <>
      <SettingsForm loggedUser={loggedUser} />
    </>
  );
}