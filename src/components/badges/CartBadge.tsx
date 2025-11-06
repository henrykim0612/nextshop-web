interface Props {
  count: number;
}

export default function CartBadge({ count }: Props) {
  return count > 0
    ? (
      <span
        className="inline-flex items-center rounded-full bg-indigo-500 px-2 py-1 text-xs font-medium text-white">
        {count}
      </span>
    )
    : null;
}