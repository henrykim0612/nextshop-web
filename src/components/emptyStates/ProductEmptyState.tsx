import { CircleStackIcon } from '@heroicons/react/24/outline';

export default function ProductEmptyState() {
  return (
    <div className="h-[75vh] flex flex-col justify-center items-center">
      <CircleStackIcon aria-hidden="true" className="size-12 text-gray-400 " />
      <h3 className="mt-2 text-sm font-semibold text-gray-900">Products are empty</h3>
      <p className="mt-1 text-sm text-gray-500">Add a new product.</p>
    </div>
  );
}