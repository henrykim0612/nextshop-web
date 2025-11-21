import { cookies } from 'next/headers';

export const getJwt = async () => {
  const cookieStore = await cookies();
  const jwtCookie = cookieStore.get(`${process.env.NEXT_PUBLIC_JWT_COOKIE_NAME}`);
  return jwtCookie?.value;
};