import { SimpleProductProps } from '@/types/product';

export const fetchProducts = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/simple`, {
    cache: 'no-store',
  });
  if (!response.ok) return null;
  const result: SimpleProductProps[] = await response.json();
  return result;
};