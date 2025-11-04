import type { PostProps } from '@/types/post';
import Link from 'next/link';

export default async function Post({ post }: { post: PostProps }) {
  const {
    id,
    title,
    description,
    postImage,
    dateTime,
    authorName,
    authorRole,
    authorImage,
  } = post;

  return (
    <div className="py-32 ">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          className="mx-auto flex max-w-2xl flex-col items-end justify-between gap-16 lg:mx-0 lg:max-w-none lg:flex-row">
          <div className="w-full lg:max-w-lg lg:flex-auto">
            <time dateTime={dateTime} className="text-gray-500 ">
              {dateTime}
            </time>
            <h2 className="text-3xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-4xl ">
              {title}
            </h2>
            <div className="relative mt-8 flex items-center gap-x-4">
              <img
                alt=""
                src={authorImage}
                className="size-10 rounded-full bg-gray-100 "
              />
              <div className="text-sm/6">
                <p className="font-semibold text-gray-900 ">
                  <span className="absolute inset-0" />
                  {authorName}
                </p>
                <p className="text-gray-600 ">{authorRole}</p>
              </div>
            </div>
            <img
              alt=""
              src={postImage}
              className="mt-16 aspect-6/5 w-full rounded-2xl object-cover outline-1 -outline-offset-1 outline-black/5 lg:aspect-auto lg:h-110 "
            />
          </div>
          <div className="w-full lg:max-w-xl lg:flex-auto">
            <h3 className="sr-only">Job openings</h3>
            <ul className="-my-8">
              {/*블로그의 내용이 알차게 보이기 위해 3번 반복*/}
              {Array(3).fill(undefined).map((_, index) => (
                <li key={index} className="py-8">
                  <p className="line-clamp-3 text-xl text-gray-600 ">{description}</p>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex border-t border-gray-100 pt-8 ">
              <Link href={'/blogs'} className={'text-sm/6 font-semibold text-indigo-600 hover:text-indigo-500'}>
                <span aria-hidden="true">&larr;</span> View all blogs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}