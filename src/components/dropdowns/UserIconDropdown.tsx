'use client';

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { UserIcon } from '@heroicons/react/24/outline';
import { ArrowRightStartOnRectangleIcon, Cog6ToothIcon, WrenchScrewdriverIcon } from '@heroicons/react/16/solid';
import { getJwt, makeAuthorizationHeader } from '@/helpers/jwtHelper.client';
import { useRouter } from 'next/navigation';
import type { UserProps } from '@/types/user';

interface Props {
  loggedUser: UserProps;
}

export default function UserIconDropdown({ loggedUser }: Props) {
  const router = useRouter();
  const handleSignOut = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const jwt = getJwt();
    if (!jwt) {
      router.push('/sign-in');
      return;
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/sign-out`, {
      method: 'POST',
      headers: {
        ...makeAuthorizationHeader(jwt),
      },
      credentials: 'include', // 쿠키를 요청/응답 모두 포함하도록 설정
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Request failed with status ${response.status}`);
    }

    router.push('/sign-in');
  };

  return (
    <Menu as="div" className="relative inline-block">
      {({ open }) => (
        <>
          <MenuButton
            className="group flex items-center p-2">
            <UserIcon
              aria-hidden="true"
              className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
            />
          </MenuButton>
          <AnimatePresence>
            {open && (
              <MenuItems
                static
                as={motion.div}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                anchor="bottom"
                className="absolute right-0 z-10 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg outline-1 outline-black/5"
              >
                <MenuItem>
                  <Link
                    href="/settings"
                    className="group flex items-center px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                  >
                    <Cog6ToothIcon
                      className="mr-3 size-5 text-gray-400 group-data-focus:text-gray-500"
                    />
                    Settings
                  </Link>
                </MenuItem>
                {loggedUser.authorities.some(auth => auth === 'ROLE_ADMIN') && (
                  <MenuItem>
                    <Link
                      href="/admin"
                      className="group flex items-center px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                    >
                      <WrenchScrewdriverIcon
                        className="mr-3 size-5 text-gray-400 group-data-focus:text-gray-500"
                      />
                      Admin Only
                    </Link>
                  </MenuItem>
                )}
                <form onSubmit={handleSignOut}>
                  <MenuItem>
                    <button
                      type="submit"
                      className="group flex items-center px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                    >
                      <ArrowRightStartOnRectangleIcon
                        className="mr-3 size-5 text-gray-400 group-data-focus:text-gray-500"
                      />
                      Sign out
                    </button>
                  </MenuItem>
                </form>
              </MenuItems>
            )}
          </AnimatePresence>
        </>
      )}
    </Menu>
  );
}