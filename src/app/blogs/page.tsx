import Posts from '@/components/posts/Posts';
import { Suspense } from 'react';
import PostLoading from '@/components/loadings/PostLoading';

export default async function Page() {
  return (
    <div className="py-24 sm:py-32 ">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl font-cinzel">
            From the blog
          </h2>
          <p className="mt-2 text-lg/8 text-gray-600 ">
            Learn how to grow your business with our expert advice.
          </p>
        </div>
        <Suspense fallback={<PostLoading />}>
          <Posts />
        </Suspense>
      </div>
    </div>
  );
}