'use client';

import { useEffect, useState } from 'react';

export function useFetch<T>(url: string, options?: RequestInit) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();
    const { signal } = controller;

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, { ...options, signal });

        // fetch가 abort되면 여기서도 예외 발생
        if (!res.ok) {
          setError(new Error(`HTTP error! status: ${res.status}`));
          return;
        }

        const result = (await res.json()) as T;
        setData(result);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          // fetch가 취소되었을 때는 무시
          console.debug('Fetch aborted:', url);
        } else if (err instanceof Error) {
          setError(err);
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchData();

    // cleanup: URL 변경되거나 언마운트 시 요청 중단
    return () => {
      controller.abort();
    };
  }, [options, url]);

  return { data, loading, error };
}
