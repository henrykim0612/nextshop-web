'use client';

import ReactECharts from 'echarts-for-react';
import { SimpleProductProps } from '@/types/product';
import { useMemo, useState } from 'react';
import ProductEmptyState from '@/components/emptyStates/ProductEmptyState';
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/16/solid';
import { CheckIcon } from '@heroicons/react/20/solid';
import { useFetch } from '@/hooks/useFetch';
import type { ReviewStatsProps } from '@/types/review';
import { makeAuthorizationHeader } from '@/helpers/jwtHelper.client';

const colors = ['#FBF2D5', '#F7E8B0', '#F1D78A', '#E4C465', '#D4AF37'];

interface Props {
  jwt: string | undefined;
  products: SimpleProductProps[] | null;
}

export default function ReviewPieChart({ jwt, products }: Props) {
  const [selected, setSelected] = useState(products?.length ? products[0] : null);
  const [url, setUrl] = useState(`/admin/review-stats/${selected?.id}`);
  const requestInit: RequestInit = useMemo(() => ({
    cache: 'no-store', headers: {
      ...makeAuthorizationHeader(jwt),
    },
  }), [jwt]);
  const { data: stats, loading, error } = useFetch<ReviewStatsProps[]>(url, requestInit);

  const option = {
    title: {
      text: 'Star Rating Analysis',
      subtext: '1–5 Star Review Composition',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      show: false,
    },
    series: [
      {
        name: 'Rating',
        type: 'pie',
        radius: '60%',
        top: 50,
        // data: [
        //   { value: 300, name: '1', itemStyle: { color: '#FBF2D5' } },
        //   { value: 484, name: '2', itemStyle: { color: '#F7E8B0' } },
        //   { value: 580, name: '3', itemStyle: { color: '#F1D78A' } },
        //   { value: 735, name: '4', itemStyle: { color: '#E4C465' } },
        //   { value: 1048, name: '5', itemStyle: { color: '#D4AF37' } },
        // ],
        data: stats?.map((item, index) => ({
          value: item.count, name: item.rating, itemStyle: { color: colors[index] },
        })),
        // roseType: 'radius',
        // labelLine: {
        //   lineStyle: {
        //     color: 'oklch(87.2% 0.01 258.338)',
        //   },
        //   smooth: 0.2,
        //   length: 25,
        //   length2: 25,
        // },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  return selected && products?.length
    ? (
      <div className={'bg-white shadow-sm rounded-lg w-full sm:p-4'}>
        <div className={'flex flex-col justify-start items-start p-2'}>
          <Listbox value={selected} onChange={(item: SimpleProductProps) => {
            setUrl(`/admin/review-stats/${item.id}`);
            setSelected(item);
          }}>
            <Label className="block text-sm/6 font-medium text-gray-900 ">Products</Label>
            <div className="relative mt-2 w-full md:w-1/2 lg:w-1/3">
              <ListboxButton
                className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm/6 ">
                <span className="col-start-1 row-start-1 truncate pr-6">{selected.name}</span>
                <ChevronUpDownIcon
                  aria-hidden="true"
                  className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4 "
                />
              </ListboxButton>

              <ListboxOptions
                transition
                className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg outline-1 outline-black/5 data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm "
              >
                {products.map((product) => (
                  <ListboxOption
                    key={product.id}
                    value={product}
                    className="group relative cursor-default py-2 pr-4 pl-8 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
                  >
                    <span className="block truncate font-normal group-data-selected:font-semibold">{product.name}</span>

                    <span
                      className="absolute inset-y-0 left-0 flex items-center pl-1.5 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white">
                <CheckIcon aria-hidden="true" className="size-5" />
              </span>
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </div>
          </Listbox>
          <div className={'w-full h-[50vh] p-4'}>
            <ReactECharts option={option} style={{ height: '100%' }} />
          </div>
        </div>
      </div>
    )
    : <ProductEmptyState />;
}