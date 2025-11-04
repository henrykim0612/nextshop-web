import type { PostProps } from '@/types/post';
import Link from 'next/link';

async function fetchPosts() {
  const response = await fetch(`${process.env.API_BASE_URL}/posts`, { cache: 'no-store' });
  const result: PostProps[] = await response.json();
  return result;
}

export default async function Posts() {
  const posts = await fetchPosts();
  return (
    <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
      {posts.map((post) => (
        <article key={post.id} className="flex flex-col items-start justify-between">
          <div className="relative w-full">
            <img
              alt=""
              src={post.postImage}
              className="aspect-video w-full rounded-2xl bg-gray-100 object-cover sm:aspect-2/1 lg:aspect-3/2 "
            />
            <div
              className="absolute inset-0 rounded-2xl inset-ring inset-ring-gray-900/10 " />
          </div>
          <div className="flex max-w-xl grow flex-col justify-between">
            <div className="mt-8 flex items-center gap-x-4 text-xs">
              <time dateTime={post.dateTime} className="text-gray-500 ">
                {post.dateTime}
              </time>
            </div>
            <div className="group relative grow">
              <h3
                className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                <Link href={`/blogs/${post.id}`}>
                  <span className="absolute inset-0" />
                  {post.title}
                </Link>
              </h3>
              <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600 ">{post.description}</p>
            </div>
            <div className="relative mt-8 flex items-center gap-x-4 justify-self-end">
              <img
                alt=""
                src={post.authorImage}
                className="size-10 rounded-full bg-gray-100 "
              />
              <div className="text-sm/6">
                <p className="font-semibold text-gray-900 ">
                  <span className="absolute inset-0" />
                  {post.authorName}
                </p>
                <p className="text-gray-600 ">{post.authorRole}</p>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );

}