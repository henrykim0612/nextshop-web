export type ProductColor = 'BLACK' | 'WHITE' | 'BLUE' | 'RED' | 'GREEN';
export type ProductSize = 'S' | 'M' | 'L' | 'XL';

export interface ProductProps {
  id: number,
  categoryId: number,
  name: string,
  price: number,
  description: string,
  features: string,
  care: string,
  createdAt: Date,
  updatedAt: Date,
  thumbnailImageUrl: string,
  colors: string,
}

export interface ProductOverviewOptionProps {
  color: ProductColor,
  sizes: ProductOverviewSizeProps[],
}

export interface ProductOverviewSizeProps {
  id: number,
  size: ProductSize,
  quantity: number,
}

export interface ProductOverviewProps {
  id: number,
  categoryId: number,
  name: string,
  price: number,
  description: string,
  features: string,
  care: string,
  reviewCount: number,
  reviewRating: number,
  images: string[],
  options: ProductOverviewOptionProps[],
}

export interface SimpleProductProps {
  id: number,
  categoryId: number,
  name: string,
}