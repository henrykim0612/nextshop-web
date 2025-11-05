import DefaultLayout from '@/components/layouts/DefaultLayout';

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
