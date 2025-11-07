import DefaultLayout from '@/components/layouts/DefaultLayout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NextShop | woman products',
};

export default function Layout({
                                 children,
                               }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DefaultLayout>
      {children}
    </DefaultLayout>
  );
}
