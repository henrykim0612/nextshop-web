'use client';

import Link from 'next/link';
import { useState } from 'react';
import ErrorAlert from '@/components/alerts/ErrorAlert';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');

  const [errorMessage, setErrorMessage] = useState('');
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const payload = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/sign-in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
      credentials: 'include', // 쿠키를 요청/응답 모두 포함하도록 설정
    });

    console.log(response);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      setErrorMessage(errorData.message);
    } else {
      setErrorMessage('');
      // router.push('/');
      router.replace(redirect ?? '/');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
          Email address
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900 ">
          Password
        </label>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 "
          />
        </div>
      </div>

      <div className="flex items-center justify-end">
        <div className="text-sm/6">
          <Link
            href="#"
            className="font-semibold text-indigo-600 hover:text-indigo-500 "
          >
            Forgot password?
          </Link>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="uppercase flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
        >
          Sign in
        </button>
        {errorMessage && <ErrorAlert message={errorMessage} />}
      </div>
    </form>

  );
}