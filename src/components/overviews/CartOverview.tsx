'use client';

import Link from 'next/link';
import type { CartOverviewProps } from '@/types/user';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import CartDeleteModal from '@/components/modals/CartDeleteModal';

interface Props {
  cartOverview: CartOverviewProps[];
}

export default function CartOverview({ cartOverview }: Props) {
  const subtotal = cartOverview.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const estimatedShipping = 5.00;
  const tax = Math.round(((subtotal + estimatedShipping) * 0.1) * 100) / 100;
  const total = Math.round((subtotal + estimatedShipping + tax) * 100) / 100;

  const [selectedCartItemId, setSelectedCartItemId] = useState<number | null>(null);
  const handleRemoveItem = (cartItemId: number) => {
    setSelectedCartItemId(cartItemId);
  };

  return (
    <>
      <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16"
            onSubmit={(e) => e.preventDefault()}>
        <section aria-labelledby="cart-heading" className="lg:col-span-7">
          <ul role="list" className="divide-y divide-gray-200 border-t border-b border-gray-200">
            {cartOverview.map((item) => (
              <li key={item.id} className="flex py-6 sm:py-10">
                <div className="shrink-0">
                  <img
                    alt={item.altText}
                    src={item.imageUrl}
                    className="size-24 rounded-md object-cover sm:size-48"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                  <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                    <div>
                      <div className="flex justify-between">
                        <h3 className="text-sm">
                          <Link href={`/products/${item.categoryId === 1 ? 'woman' : 'man'}/${item.productId}`}
                                className="font-medium text-gray-700 hover:text-gray-800">
                            {item.productName}
                          </Link>
                        </h3>
                      </div>
                      <div className="mt-1 flex text-sm">
                        <p className="text-gray-500">{item.color}</p>
                        <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">{item.size}</p>
                        <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">Qty {item.quantity}</p>
                      </div>
                      <p className="mt-1 text-sm font-medium text-gray-900">${item.price * item.quantity}</p>
                    </div>

                    <div className="mt-4 sm:mt-0 sm:pr-9">
                      <div className="absolute top-0 right-0">
                        <button type="button" className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                                onClick={(e) => handleRemoveItem(item.id)}>
                          <span className="sr-only">Remove</span>
                          <XMarkIcon aria-hidden="true" className="size-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Order summary */}
        <section
          aria-labelledby="summary-heading"
          className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
        >
          <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
            Order summary
          </h2>

          <dl className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <dt className="text-sm text-gray-600">Subtotal</dt>
              <dd className="text-sm font-medium text-gray-900">${subtotal}</dd>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt className="flex items-center text-sm text-gray-600">
                <span>Shipping estimate</span>
              </dt>
              <dd className="text-sm font-medium text-gray-900">$5.00</dd>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt className="flex text-sm text-gray-600">
                <span>Tax estimate</span>
              </dt>
              <dd className="text-sm font-medium text-gray-900">${tax}</dd>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt className="text-base font-medium text-gray-900">Order total</dt>
              <dd className="text-base font-medium text-gray-900">${total}</dd>
            </div>
          </dl>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-hidden"
            >
              Checkout
            </button>
          </div>
        </section>
      </form>
      <CartDeleteModal selectedCartItemId={selectedCartItemId} setSelectedCartItemId={setSelectedCartItemId} />
    </>
  );
}