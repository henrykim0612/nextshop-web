import { fetchLoggedUser } from '@/fetchers/user-fetcher.server';
import { redirect } from 'next/navigation';
import Forbidden from '@/components/errors/Forbidden';
import { fetchProducts } from '@/fetchers/product-fetcher.server';
import ReviewPieChart from '@/components/charts/ReviewPieChart';
import { getJwt } from '@/helpers/jwtHelper.server';


export default async function Page() {
  const loggedUser = await fetchLoggedUser();
  const products = await fetchProducts();
  const jwt = await getJwt();

  if (!loggedUser) redirect('/sign-in');
  if (!loggedUser.authorities.some((auth) => auth === 'ROLE_ADMIN')) return <Forbidden />;
  return (
    <div className={'h-screen p-4'}>
      <ReviewPieChart jwt={jwt} products={products} />
    </div>
  );
}