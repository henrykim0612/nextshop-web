import type { PostProps } from '@/types/post';
import { notFound } from 'next/navigation';
import Post from '@/components/posts/Post';

// 페이지 캐시 유효시간을 지정하고 싶다면 주석 해제
//export const revalidate = 60

// 빌드 시 generateStaticParams로 선언한 모든 경우의 수에 대해 미리 페이지를 생성
export async function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }];
}

async function fetchPost(id: number) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${id}`);
  const result: PostProps = await response.json();
  return result;
}

export default async function Page({
                                     params,
                                   }: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const id = parseInt(slug);

  if (isNaN(id)) {
    notFound();
  }

  const post = await fetchPost(id);

  return <Post post={post} />;
}