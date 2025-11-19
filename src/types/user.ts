export type Gender = 'M' | 'F';
export type VisitRoute = 'S' | 'A' | 'R' | 'O';

export interface UserProps {
  id: number;
  email: string;
  name: string;
  phone: string;
  gender: Gender;
  cartCount: number;
  createdAt: Date;
  updatedAt: Date;
  authorities: string[];
}

export interface CartOverviewProps {
  id: number,
  cartId: number,
  productSizeId: number,
  quantity: number,
  createdAt: Date;
  productId: number,
  categoryId: number,
  productName: string,
  price: number,
  imageUrl: string,
  altText: string,
  color: string,
  size: string,
}