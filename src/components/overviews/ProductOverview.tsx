'use client';
import clsx from 'clsx';
import { convertColorClassName } from '@/components/indicators/ColorIndicator';
import { StarIcon } from '@heroicons/react/20/solid';
import type { ProductOverviewOptionProps, ProductOverviewProps } from '@/types/product';
import { useFetch } from '@/hooks/useFetch';
import { useMemo, useState } from 'react';
import ProductOverviewLoading from '@/components/loadings/ProductOverviewLoading';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getJwt, makeAuthorizationHeader } from '@/helpers/jwtHelper';
import CartAddedModal from '@/components/modals/CartAddedModal';

interface Props {
  id: number;
}

export default function ProductOverview({ id }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const requestInit: RequestInit = useMemo(() => ({ cache: 'no-store' }), []);
  const {
    data: productOverview,
    loading,
    error,
  } = useFetch<ProductOverviewProps>(`/products/${id}`, requestInit);

  const [selectedOption, setSelectedOption] = useState<ProductOverviewOptionProps | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [openCartDialog, setOpenCartDialog] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Form 태그 안에 submit 버튼이 2개 이상인 경우 사용하면 유용
    const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    if (submitter) {
      if (submitter.name === 'cart') { // 장바구니 담기
        const formData = new FormData(e.currentTarget);
        const color = formData.get('color');
        const size = formData.get('size');
        if (color && size) {
          const jwt = getJwt();
          // 쿠키에서 jwt 를 꺼내올 수 없다는 것은 만료됐거나 로그인 하지 않은 것.
          if (!jwt) {
            const currentUrl =
              searchParams.toString().length > 0
                ? `${pathname}?${searchParams.toString()}`
                : pathname;
            router.push(`/sign-in?redirect=${encodeURIComponent(currentUrl)}`);
          } else {
            const selectedOption = productOverview?.options.find(option => option.color === color)?.sizes.find(sizeItem => sizeItem.size === size);
            if (selectedOption) {
              await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/cart`, {
                method: 'POST',
                headers: {
                  ...makeAuthorizationHeader(jwt),
                },
                body: JSON.stringify({ productSizeId: selectedOption.id }),
              });
              setErrorMessage('');
              setOpenCartDialog(true);
              router.refresh();
            }
          }
        } else {
          setErrorMessage('Please select a size.');
        }
      }
    }
  };


  return loading
    ? <ProductOverviewLoading />
    : productOverview && (
    <>
      <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
        <div className="lg:col-span-5 lg:col-start-8">
          <div className="flex justify-between">
            <h1 className="text-xl font-medium text-gray-900">{productOverview.name}</h1>
            <p className="text-xl font-medium text-gray-900">${productOverview.price}</p>
          </div>
          {/* Reviews */}
          <div className="mt-4">
            <h2 className="sr-only">Reviews</h2>
            <div className="flex items-center">
              <p className="text-sm text-gray-700">
                {productOverview.reviewRating}
                <span className="sr-only"> out of 5 stars</span>
              </p>
              <div className="ml-1 flex items-center">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <StarIcon
                    key={rating}
                    aria-hidden="true"
                    className={clsx(
                      productOverview.reviewRating > rating ? 'text-yellow-400' : 'text-gray-200',
                      'size-5 shrink-0',
                    )}
                  />
                ))}
              </div>
              <div aria-hidden="true" className="ml-4 text-sm text-gray-300">
                ·
              </div>
              <div className="ml-4 flex">
                <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  See all {productOverview.reviewCount} reviews
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Image gallery */}
        <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
          <h2 className="sr-only">Images</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
            {productOverview.images.map((src, index) => (
              <img
                key={src}
                alt={`Image of ${productOverview.name}`}
                src={src}
                className={clsx(
                  index === 0 ? 'lg:col-span-2 lg:row-span-2' : 'hidden lg:block',
                  'rounded-lg size-full object-cover',
                )}
              />
            ))}
          </div>
        </div>

        <div className="mt-8 lg:col-span-5">
          <form onSubmit={handleSubmit}>
            {/* Color picker */}
            <div>
              <h2 className="text-sm font-medium text-gray-900">Color</h2>

              <fieldset aria-label="Choose a color" className="mt-2">
                <div className="flex items-center gap-x-3">
                  {productOverview.options.map((option, index) => (
                    <div key={option.color} className="flex rounded-full outline -outline-offset-1 outline-black/10">
                      <input
                        defaultValue={option.color}
                        defaultChecked={index === 0}
                        onChange={() => setSelectedOption(option)}
                        name="color"
                        type="radio"
                        className={clsx(
                          convertColorClassName(option.color),
                          'size-8 appearance-none rounded-full forced-color-adjust-none checked:outline-2 checked:outline-offset-2 focus-visible:outline-3 focus-visible:outline-offset-3',
                        )}
                      />
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>

            {/* Size picker */}
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-medium text-gray-900">Size</h2>
                <Link href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  See sizing chart
                </Link>
              </div>

              <fieldset aria-label="Choose a size" className="mt-2">
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                  {/*최초 렌더링 시 첫번째 색상의 사이즈를 표시*/}
                  {selectedOption !== null
                    ? selectedOption.sizes.map((item) => (
                      <label
                        key={`${selectedOption.color}-${item.size}`}
                        className="group relative flex items-center justify-center rounded-md border border-gray-300 bg-white p-3 has-checked:border-indigo-600 has-checked:bg-indigo-600 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-indigo-600 has-disabled:border-gray-400 has-disabled:bg-gray-200 has-disabled:opacity-25"
                      >
                        <input
                          defaultValue={item.size}
                          defaultChecked={false}
                          name="size"
                          type="radio"
                          disabled={item.quantity === 0}
                          className="absolute inset-0 appearance-none focus:outline-none disabled:cursor-not-allowed"
                        />
                        <span className="text-sm font-medium text-gray-900 uppercase group-has-checked:text-white">
                        {item.size}
                      </span>
                      </label>
                    ))
                    : productOverview.options[0].sizes.map((item) => (
                      <label
                        key={`${productOverview.options[0].color}-${item.size}`}
                        className="group relative flex items-center justify-center rounded-md border border-gray-300 bg-white p-3 has-checked:border-indigo-600 has-checked:bg-indigo-600 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-indigo-600 has-disabled:border-gray-400 has-disabled:bg-gray-200 has-disabled:opacity-25"
                      >
                        <input
                          defaultValue={item.size}
                          defaultChecked={false}
                          name="size"
                          type="radio"
                          disabled={item.quantity === 0}
                          className="absolute inset-0 appearance-none focus:outline-none disabled:cursor-not-allowed"
                        />
                        <span className="text-sm font-medium text-gray-900 uppercase group-has-checked:text-white">
                        {item.size}
                      </span>
                      </label>
                    ))}
                </div>
              </fieldset>
            </div>

            <button
              type="submit"
              name="cart"
              className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 disabled:opacity-25 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
            >
              Add to cart
            </button>

            {errorMessage && (
              <p id="email-error" className="mt-2 text-sm text-red-600">
                {errorMessage}
              </p>
            )}
          </form>

          {/* Product details */}
          <div className="mt-10">
            <h2 className="text-sm font-medium text-gray-900">Description</h2>

            <div
              dangerouslySetInnerHTML={{ __html: productOverview.description }}
              className="mt-4 space-y-4 text-sm/6 text-gray-500"
            />
          </div>

          <div className="mt-8 border-t border-gray-200 pt-8">
            <h2 className="text-sm font-medium text-gray-900">Fabric &amp; Care</h2>

            <div className="mt-4">
              <ul role="list" className="list-disc space-y-1 pl-5 text-sm/6 text-gray-500 marker:text-gray-300">
                <li className="pl-2">
                  {productOverview.features}
                </li>
                <li className="pl-2">
                  {productOverview.care}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <CartAddedModal open={openCartDialog} setOpen={setOpenCartDialog} />
    </>
  );
}