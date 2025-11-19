import clsx from 'clsx';
import type { ProductColor } from '@/types/product';

export function convertColorClassName(color: ProductColor) {
  switch (color) {
    case 'BLACK':
      return 'bg-black checked:outline-black';
    case 'WHITE':
      return 'bg-white checked:outline-gray-400';
    case 'BLUE':
      return 'bg-blue-600 checked:outline-blue-400';
    case 'RED':
      return 'bg-red-600 checked:outline-red-400';
    case 'GREEN':
      return 'bg-green-600 checked:outline-green-400';
    default:
      return '';
  }
}

interface Props {
  colors: string;
}

export default function ColorIndicator({ colors }: Props) {
  return (
    <ul role="list" className="flex justify-start space-x-2 py-2">
      {colors.split(',').map((color) => (
        <li
          key={color}
          className={clsx('size-4 rounded-full border border-black/10', convertColorClassName(color as ProductColor))}
        >
        </li>
      ))}
    </ul>
  );
}