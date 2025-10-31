export default function Container({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="mx-auto sm:px-6 lg:px-8">{children}</div>;
}
