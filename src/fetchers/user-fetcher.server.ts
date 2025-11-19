import { cookies } from 'next/headers';
import { UserProps } from '@/types/user';

export async function fetchLoggedUser() {
  const cookieStore = await cookies();
  const jwtCookie = cookieStore.get(`${process.env.NEXT_PUBLIC_JWT_COOKIE_NAME}`);
  if (!jwtCookie) return null;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me`, {
    headers: { Authorization: `Bearer ${jwtCookie.value}` },
    cache: 'no-store',
  });
  if (!response.ok) return null;
  const result: UserProps = await response.json();
  return result;
}