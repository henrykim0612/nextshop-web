export default function PlainLayout({
                                      children,
                                    }: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      <main className={'bg-gray-50'}>
        {children}
      </main>
    </>
  );
}