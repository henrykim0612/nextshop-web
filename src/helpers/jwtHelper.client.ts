export const getJwt = () => {
  const cookies = document.cookie.split('; ');
  const cookie = cookies.find((row) => row.startsWith(`${process.env.NEXT_PUBLIC_JWT_COOKIE_NAME}=`));
  return cookie ? cookie.split('=')[1] : undefined;
};

export const makeAuthorizationHeader = (jwt: string = '') => ({
  Authorization: `Bearer ${jwt}`,
  'Content-Type': 'application/json',
  'Accept': 'application/json',
});