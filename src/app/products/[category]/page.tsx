import { notFound } from 'next/navigation';
import ProductCards from '@/components/cards/ProductCards';

export default async function Page({
                                     params,
                                   }: {
  params: Promise<{ category: string }> // string 타임만 가능함에 주의!
}) {
  const { category } = await params;
  if (category !== 'man' && category !== 'woman') {
    notFound();
  }

  return <ProductCards category={category} />;
}