export default async function Page({
                                     searchParams,
                                   }: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { category } = await searchParams;
  console.log(category);
  return <h1>Hello</h1>;
}