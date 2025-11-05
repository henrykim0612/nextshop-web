import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function PostLoading() {
  return (
    <div
      className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
      {Array(6).fill(undefined).map((_, i) => (
        <article key={i} className="flex flex-col items-start justify-between">
          <div className="relative w-full">
            <Skeleton height={256} />
          </div>
          <div className="flex max-w-xl grow flex-col justify-between">
            <div className="mt-8 flex items-center gap-x-4 text-xs">
              <Skeleton width={250} height={20} />
            </div>
            <div className="group relative grow">
              <h3
                className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                <Skeleton width={350} count={3} />
              </h3>
            </div>
            <div className="relative mt-8 flex items-center gap-x-4 justify-self-end">
              <Skeleton circle width={40} height={40} />
              <div className="text-sm/6">
                <p className="font-semibold text-gray-900 ">
                  <Skeleton width={100} />
                </p>
                <p className="text-gray-600 "><Skeleton width={100} /></p>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}