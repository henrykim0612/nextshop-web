'use client'; // Error boundaries must be Client Components

import { useEffect } from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Error({
                                error,
                                reset,
                              }: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <div className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600 ">...OOPS!</p>
          <h1
            className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
            Something went wrong
          </h1>
          <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
            An unexpected error occurred. Please try again by clicking the button below.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button
              onClick={() => reset()}
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
            >
              Try again
            </button>
            <Link href="/" className="text-sm font-semibold text-gray-900 hover:text-indigo-500">
              Go to main page <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </>
    // <div className="min-h-[60vh] flex items-center justify-center px-4">
    //   <div
    //     role="alert"
    //     className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm ring-1 ring-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:ring-gray-800"
    //   >
    //     <div className="flex items-start gap-3">
    //       <div
    //         className="flex size-10 items-center justify-center rounded-full bg-red-50 ring-1 ring-red-100 dark:bg-red-950/40 dark:ring-red-900">
    //         <ExclamationTriangleIcon className="size-6 text-red-600 dark:text-red-400" />
    //       </div>
    //
    //       <div className="flex-1">
    //         <h2 className="text-base font-semibold text-gray-900 dark:text-gray-50">
    //           Something went wrong
    //         </h2>
    //         <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
    //           예상치 못한 오류가 발생했어요. 아래 버튼을 눌러 다시 시도해 보세요.
    //         </p>
    //
    //         {/* 추가 디버깅 정보 (선택) */}
    //         <details className="group mt-3">
    //           <summary
    //             className="cursor-pointer select-none text-sm text-gray-500 underline decoration-dotted underline-offset-4 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
    //             오류 세부 정보 보기
    //           </summary>
    //           <pre
    //             className="mt-2 max-h-40 overflow-auto rounded-md bg-gray-50 p-3 text-xs text-gray-800 ring-1 ring-gray-200 dark:bg-gray-950 dark:text-gray-200 dark:ring-gray-800">
    //             {error?.message}
    //             {error?.digest ? `\n\nDigest: ${error.digest}` : ''}
    //           </pre>
    //         </details>
    //
    //         <div className="mt-5 flex items-center gap-3">
    //           <button
    //             type="button"
    //             onClick={() => reset()}
    //             className="inline-flex w-full justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 disabled:opacity-50 dark:focus-visible:ring-offset-gray-900"
    //           >
    //             Try again
    //           </button>
    //         </div>
    //
    //         <p className="mt-3 text-xs text-gray-400 dark:text-gray-500">
    //           문제가 지속되면 관리자에게 문의해 주세요.
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
