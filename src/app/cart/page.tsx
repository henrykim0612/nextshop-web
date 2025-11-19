import { cookies } from 'next/headers';
import type { CartOverviewProps } from '@/types/user';
import CartOverview from '@/components/overviews/CartOverview';
import CartEmptyState from '@/components/emptyStates/CartEmptyState';

export async function fetchCartOverview() {
  const cookieStore = await cookies();
  const jwtCookie = cookieStore.get(`${process.env.NEXT_PUBLIC_JWT_COOKIE_NAME}`);
  if (!jwtCookie) return null;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/cart`, {
    headers: { Authorization: `Bearer ${jwtCookie.value}` },
    cache: 'no-store',
  });
  if (!response.ok) return null;
  const result: CartOverviewProps[] = await response.json();
  return result;
}

export default async function Page() {
  const cartOverview = await fetchCartOverview();
  if (!cartOverview || cartOverview.length === 0) return <CartEmptyState />;
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>
        <CartOverview cartOverview={cartOverview} />
      </div>
    </div>
  );
}