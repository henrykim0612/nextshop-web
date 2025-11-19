import clsx from 'clsx';
import 'react-loading-skeleton/dist/skeleton.css';
import Skeleton from 'react-loading-skeleton';

export default function ProductOverviewLoading() {
  return (
    <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
      <div className="lg:col-span-5 lg:col-start-8">
        <div className="flex justify-between">
          <h1 className="text-xl font-medium text-gray-900"><Skeleton width={150} /></h1>
          <p className="text-xl font-medium text-gray-900"><Skeleton width={80} /></p>
        </div>
        {/* Reviews */}
        <div className="mt-4">
          <h2 className="sr-only">Reviews</h2>
          <div className="flex items-center">
            <Skeleton width={140} />
          </div>
        </div>
      </div>

      {/* Image gallery */}
      <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
        <h2 className="sr-only">Images</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
          {Array(3).fill(undefined).map((_, index) => (
            <div
              key={index}
              className={clsx(
                index === 0 ? 'lg:col-span-2 lg:row-span-2' : 'hidden lg:block',
                'rounded-lg overflow-hidden aspect-[1/1] lg:aspect-[2/3]',
              )}
            >
              <Skeleton className="w-full h-full" />
            </div>))}
        </div>
      </div>

      <div className="mt-8 lg:col-span-5">
        <form>
          {/* Color picker */}
          <div>
            <h2 className="text-sm font-medium text-gray-900">Color</h2>

            <fieldset aria-label="Choose a color" className="mt-2">
              <div className="flex items-center gap-x-3">
                {Array(4).fill(undefined).map((_, index) => <Skeleton key={index} circle width={30} height={30} />)}
              </div>
            </fieldset>
          </div>

          {/* Size picker */}
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium text-gray-900">Size</h2>
            </div>

            <fieldset aria-label="Choose a size" className="mt-2">
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                {Array(4).fill(undefined).map((_, index) => <Skeleton key={index} className={'aspect-[2/1]'} />)}
              </div>
            </fieldset>
          </div>

          <button
            type="submit"
            disabled
            className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 disabled:opacity-25 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
          >
            Add to cart
          </button>
        </form>

        {/* Product details */}
        <div className="mt-10">
          <h2 className="text-sm font-medium text-gray-900">Description</h2>

          <div
            className="mt-4 space-y-4 text-sm/6 text-gray-500"
          >
            <Skeleton count={5} />
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8">
          <h2 className="text-sm font-medium text-gray-900">Fabric &amp; Care</h2>

          <div className="mt-4">
            <ul role="list" className="list-disc space-y-1 pl-5 text-sm/6 text-gray-500 marker:text-gray-300">
              <li className="pl-2">
                <Skeleton />
              </li>
              <li className="pl-2">
                <Skeleton />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

  );
}