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