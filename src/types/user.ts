export type Gender = 'M' | 'F';
export type VisitRoute = 'S' | 'A' | 'R' | 'O';

export interface UserProps {
  id: number;
  email: string;
  password: string;
  name: string;
  phone: string;
  gender: Gender;
  visitRoute: VisitRoute;
  createdAt: Date;
  updatedAt: Date;
}