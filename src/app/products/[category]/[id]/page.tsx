import { notFound } from 'next/navigation';
import ProductOverview from '@/components/overviews/ProductOverview';

export default async function Page({
                                     params,
                                   }: {
  params: Promise<{ category: string, id: string }> // string 타입만 가능함에 주의!
}) {
  const { category, id } = await params;
  if (category !== 'man' && category !== 'woman') {
    notFound();
  }

  const productId = parseInt(id);
  if (isNaN(productId)) {
    notFound();
  }

  return (
    <div className="pt-6 pb-16 sm:pb-24">
      <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <ProductOverview id={productId} />
      </div>
    </div>
  );
}