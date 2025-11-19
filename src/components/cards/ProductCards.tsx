'use client';

import { useMemo, useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/20/solid';
import type { ProductProps } from '@/types/product';
import ProductLoading from '@/components/loadings/ProductLoading';
import Link from 'next/link';
import { useFetch } from '@/hooks/useFetch';
import ColorIndicator from '@/components/indicators/ColorIndicator';

const filters = [
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'BLACK', label: 'Black' },
      { value: 'WHITE', label: 'White' },
      { value: 'BLUE', label: 'Blue' },
      { value: 'RED', label: 'Red' },
      { value: 'GREEN', label: 'Green' },
    ],
  },
  {
    id: 'sizes',
    name: 'Sizes',
    options: [
      { value: 'S', label: 'S' },
      { value: 'M', label: 'M' },
      { value: 'L', label: 'L' },
      { value: 'XL', label: 'XL' },
    ],
  },
];

interface Props {
  category: 'man' | 'woman',
}

export default function ProductCards({ category }: Props) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const requestInit: RequestInit = useMemo(() => ({ cache: 'no-store' }), []);
  const [url, setUrl] = useState(`/products?category=${category === 'woman' ? 1 : 2}`);
  const { data: products, loading, error } = useFetch<ProductProps[]>(url, requestInit);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const handleChangeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked, value } = e.target;
    let colors = selectedColors;
    let sizes = selectedSizes;
    if (name === 'color[]') {
      colors = selectedColors.includes(value)
        ? selectedColors.filter((color) => color !== value)
        : [...selectedColors, value];
      setSelectedColors(colors);
    } else {
      sizes = selectedSizes.includes(value)
        ? selectedSizes.filter((size) => size !== value)
        : [...selectedSizes, value];
      setSelectedSizes(sizes);
    }

    const params = new URLSearchParams();
    params.append('category', category);
    if (colors.length > 0) {
      params.append('colors', colors.join(','));
    }
    if (sizes.length > 0) {
      params.append('sizes', sizes.join(','));
    }
    setUrl(`/products?${params.toString()}`);
  };

  return (
    <div>
      {/* Mobile filter dialog */}
      <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white pt-4 pb-6 shadow-xl transition duration-300 ease-in-out data-closed:translate-x-full"
          >
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="relative -mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            {/* Filters */}
            <form className="mt-4">
              {filters.map((section) => (
                <Disclosure key={section.id} as="div" className="border-t border-gray-200 pt-4 pb-4">
                  <fieldset>
                    <legend className="w-full px-2">
                      <DisclosureButton
                        className="group flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500">
                        <span className="text-sm font-medium text-gray-900">{section.name}</span>
                        <span className="ml-6 flex h-7 items-center">
                            <ChevronDownIcon
                              aria-hidden="true"
                              className="size-5 rotate-0 transform group-data-open:-rotate-180"
                            />
                          </span>
                      </DisclosureButton>
                    </legend>
                    <DisclosurePanel className="px-4 pt-4 pb-2">
                      <div className="space-y-6">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex gap-3">
                            <div className="flex h-5 shrink-0 items-center">
                              <div className="group grid size-4 grid-cols-1">
                                <input
                                  defaultValue={option.value}
                                  id={`${section.id}-${optionIdx}-mobile`}
                                  name={`${section.id}[]`}
                                  onChange={handleChangeFilter}
                                  type="checkbox"
                                  className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                />
                                <svg
                                  fill="none"
                                  viewBox="0 0 14 14"
                                  className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                >
                                  <path
                                    d="M3 8L6 11L11 3.5"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-checked:opacity-100"
                                  />
                                  <path
                                    d="M3 7H11"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-indeterminate:opacity-100"
                                  />
                                </svg>
                              </div>
                            </div>
                            <label htmlFor={`${section.id}-${optionIdx}-mobile`} className="text-sm text-gray-500">
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </fieldset>
                </Disclosure>
              ))}
            </form>
          </DialogPanel>
        </div>
      </Dialog>

      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="border-b border-gray-200 pb-10">
          <h1
            className="text-4xl font-bold tracking-tight text-gray-900 capitalize">{category} products</h1>
        </div>

        <div className="pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
          <aside>
            <h2 className="sr-only">Filters</h2>

            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="inline-flex items-center lg:hidden"
            >
              <span className="text-sm font-medium text-gray-700">Filters</span>
              <PlusIcon aria-hidden="true" className="ml-1 size-5 shrink-0 text-gray-400" />
            </button>

            <div className="hidden lg:block">
              <form className="divide-y divide-gray-200">
                {filters.map((section) => (
                  <div key={section.name} className="py-10 first:pt-0 last:pb-0">
                    <fieldset>
                      <legend className="block text-sm font-medium text-gray-900">{section.name}</legend>
                      <div className="space-y-3 pt-6">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex gap-3">
                            <div className="flex h-5 shrink-0 items-center">
                              <div className="group grid size-4 grid-cols-1">
                                <input
                                  defaultValue={option.value}
                                  id={`${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  type="checkbox"
                                  onChange={handleChangeFilter}
                                  className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                />
                                <svg
                                  fill="none"
                                  viewBox="0 0 14 14"
                                  className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                >
                                  <path
                                    d="M3 8L6 11L11 3.5"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-checked:opacity-100"
                                  />
                                  <path
                                    d="M3 7H11"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-indeterminate:opacity-100"
                                  />
                                </svg>
                              </div>
                            </div>
                            <label htmlFor={`${section.id}-${optionIdx}`} className="text-sm text-gray-600">
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </fieldset>
                  </div>
                ))}
              </form>
            </div>
          </aside>

          {/* Product grid */}
          <div className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3">
            <div className="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-3 sm:gap-x-6 lg:gap-x-8">
              {loading || products === null
                ? <ProductLoading />
                : products.map((product) => (
                  <Link key={product.id} href={`/products/${category}/${product.id}`}>
                    <div className="group relative">
                      <img
                        alt={`product thumbnail for ${product.name}`}
                        src={product.thumbnailImageUrl}
                        className="h-96 w-full rounded-lg object-cover group-hover:opacity-75 sm:aspect-2/3 sm:h-auto border-1 border-gray-200"
                      />
                      <h3 className="mt-4 text-base font-semibold text-gray-900">
                        <span className="absolute inset-0" />
                        {product.name}
                      </h3>
                      <ColorIndicator colors={product.colors} />
                      <p className="mt-1 text-sm text-gray-500">${product.price}</p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}