// 주의: 이곳에 존재하는 함수들은 서버 컴포넌트에서 호출할 목적으로 사용되므로, 클라이언트 컴포넌트에서는 사용이 불가합니다.
import { cookies } from 'next/headers';
import { UserProps } from '@/types/user';

export async function fetchLoggedUser() {
  const cookieStore = await cookies();
  const jwtCookie = cookieStore.get(`${process.env.JWT_COOKIE_NAME}`);
  if (!jwtCookie) return null;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me`, {
    headers: { Authorization: `Bearer ${jwtCookie.value}` },
    cache: 'no-store',
  });
  if (!response.ok) return null;
  const result: UserProps = await response.json();
  return result;
}