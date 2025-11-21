import DefaultLayout from '@/components/layouts/DefaultLayout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NextShop | Settings',
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
