import { ShoppingCartIcon } from '@heroicons/react/24/outline';

export default function CartEmptyState() {
  return (
    <div className="h-[75vh] flex flex-col justify-center items-center">
      <ShoppingCartIcon aria-hidden="true" className="size-12 text-gray-400 " />
      <h3 className="mt-2 text-sm font-semibold text-gray-900">Your cart is empty</h3>
      <p className="mt-1 text-sm text-gray-500">Start shopping to add items to your cart.</p>
    </div>
  );
}