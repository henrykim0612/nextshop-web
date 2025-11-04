'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/16/solid';
import clsx from 'clsx';
import type { Gender, VisitRoute } from '@/types/user';
import Link from 'next/link';

const genders: { id: Gender, name: string, checked: boolean }[] =
  [{
    id: 'M',
    name: 'Male',
    checked: true,
  }, {
    id: 'F',
    name: 'Female',
    checked: false,
  }];

const visitRoutes: { id: VisitRoute, name: string, checked: boolean }[] =
  [{
    id: 'S',
    name: 'Social Network',
    checked: true,
  }, {
    id: 'A',
    name: 'Advertisement',
    checked: false,
  }, {
    id: 'R',
    name: 'Referral',
    checked: true,
  }, {
    id: 'O',
    name: 'Others',
    checked: false,
  }];

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    gender: genders.find(item => item.checked)!.id,
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
  });

  const validateForm = () => {
    const newErrors = {
      email: '',
      password: '',
      name: '',
      phone: '',
    };

    // 이메일 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Please enter your email.';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format.';
    }

    // 비밀번호 검증
    if (!formData.password) {
      newErrors.password = 'Please enter your password.';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.';
    }

    // 이름 검증
    if (!formData.name) {
      newErrors.name = 'Please enter your name.';
    }

    // 전화번호 검증
    const phoneRegex = /^01[0-9]-[0-9]{3,4}-[0-9]{4}$/;
    if (!formData.phone) {
      newErrors.phone = 'Please enter your phone number.';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number format.';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== '');
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    // console.log(data.get('gender'));
    // console.log(data.getAll('visit-route'));

    // for (const [key, value] of data.entries()) {
    //   console.log(`${key}:`, value);
    // }


    if (validateForm()) {
      console.log('회원가입 데이터:', formData);
      alert('회원가입이 완료되었습니다!');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    if (type === 'radio') {

    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      // 입력 시 해당 필드의 에러 메시지 제거
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            SIGN UP
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Start by creating an account
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="mt-2 grid grid-cols-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@email.com"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  maxLength={50}
                  className={clsx('col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pr-10 pl-3 sm:pr-9 text-base sm:text-sm/6',
                    errors.email
                      ? ' text-red-900 outline-1 -outline-offset-1 outline-red-300 placeholder:text-red-300 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 '
                      : 'text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600',
                  )}
                />
                {errors.email && (
                  <ExclamationCircleIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-3 size-5 self-center justify-self-end text-red-500 sm:size-4 "
                  />
                )}
              </div>
              {errors.email && (
                <p id="email-error" className="mt-2 text-sm text-red-600">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="mt-2 grid grid-cols-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="At latest 8 characters"
                  autoComplete="password"
                  value={formData.password}
                  onChange={handleChange}
                  maxLength={50}
                  className={clsx('col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pr-10 pl-3 sm:pr-9 text-base sm:text-sm/6',
                    errors.password
                      ? ' text-red-900 outline-1 -outline-offset-1 outline-red-300 placeholder:text-red-300 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 '
                      : 'text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600',
                  )}
                />
                {errors.password && (
                  <ExclamationCircleIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-3 size-5 self-center justify-self-end text-red-500 sm:size-4 "
                  />
                )}
              </div>
              {errors.password && (
                <p id="password-error" className="mt-2 text-sm text-red-600">
                  {errors.password}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <div className="mt-2 grid grid-cols-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Henry"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  maxLength={20}
                  className={clsx('col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pr-10 pl-3 sm:pr-9 text-base sm:text-sm/6',
                    errors.name
                      ? ' text-red-900 outline-1 -outline-offset-1 outline-red-300 placeholder:text-red-300 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 '
                      : 'text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600',
                  )}
                />
                {errors.name && (
                  <ExclamationCircleIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-3 size-5 self-center justify-self-end text-red-500 sm:size-4 "
                  />
                )}
              </div>
              {errors.name && (
                <p id="name-error" className="mt-2 text-sm text-red-600">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone number
              </label>
              <div className="mt-2 grid grid-cols-1">
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  placeholder="010-1234-5678"
                  autoComplete="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength={13}
                  className={clsx('col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pr-10 pl-3 sm:pr-9 text-base sm:text-sm/6',
                    errors.phone
                      ? ' text-red-900 outline-1 -outline-offset-1 outline-red-300 placeholder:text-red-300 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 '
                      : 'text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600',
                  )}
                />
                {errors.phone && (
                  <ExclamationCircleIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-3 size-5 self-center justify-self-end text-red-500 sm:size-4 "
                  />
                )}
              </div>
              {errors.phone && (
                <p id="phone-error" className="mt-2 text-sm text-red-600">
                  {errors.phone}
                </p>
              )}
            </div>
          </div>

          <fieldset>
            <div className="block text-sm font-medium text-gray-700 mb-1 ">Gender</div>
            <div className="mt-2 grid grid-cols-3 gap-3 sm:grid-cols-6">
              {genders.map((option) => (
                <label
                  key={option.id}
                  aria-label={option.name}
                  className="group relative flex items-center justify-center rounded-md border border-gray-300 bg-white p-3 has-checked:border-indigo-600 has-checked:bg-indigo-600 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-indigo-600 has-disabled:border-gray-400 has-disabled:bg-gray-200 has-disabled:opacity-25"
                >
                  <input
                    defaultValue={option.id}
                    defaultChecked={option.checked}
                    name="gender"
                    type="radio"
                    className="absolute inset-0 appearance-none focus:outline-none disabled:cursor-not-allowed"
                  />
                  <span
                    className="text-xs font-medium text-gray-900 uppercase group-has-checked:text-white ">{option.name}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <div className="block text-sm font-medium text-gray-700 mb-1 ">Visit Route</div>
            <div className="mt-2 space-y-3">
              {visitRoutes.map((option) => (
                <div key={option.id} className="flex gap-3">
                  <div className="flex h-6 shrink-0 items-center">
                    <div className="group grid size-4 grid-cols-1">
                      <input
                        id={option.id}
                        name="visit-route"
                        type="checkbox"
                        defaultChecked={option.checked}
                        defaultValue={option.id}
                        className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                      />
                      <svg
                        fill="none"
                        viewBox="0 0 14 14"
                        className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                      >
                        <path
                          d="M3 8L6 11L11 3.5"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-0 group-has-checked:opacity-100"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="text-sm/6">
                    <label htmlFor={option.id} className="font-medium text-gray-900">
                      {option.name}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </fieldset>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              SIGN UP
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/sign-in" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}