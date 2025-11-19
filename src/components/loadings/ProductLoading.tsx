import 'react-loading-skeleton/dist/skeleton.css';
import Skeleton from 'react-loading-skeleton';

export default function ProductLoading() {
  return Array(6).fill(undefined).map((_, i) => (
    <div key={i} className="group relative">
      <Skeleton className={'h-96 w-full rounded-lg object-cover group-hover:opacity-75 sm:aspect-2'} />
      <h3 className="mt-4 text-base font-semibold text-gray-900">
        <Skeleton width={'60%'} />
      </h3>
      <p className="mt-1 text-sm text-gray-500"><Skeleton width={'20%'} /></p>
      <p className="mt-1 text-sm text-gray-500"><Skeleton width={'20%'} /></p>
    </div>
  ));
}