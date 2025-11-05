import Container from '@/components/layouts/Container';
import PlainLayout from '@/components/layouts/PlainLayout';

export default function Layout({
                                 children,
                               }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PlainLayout>
      {children}
    </PlainLayout>
  );
}
