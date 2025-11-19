import type { UserProps } from '@/types/user';
import clsx from 'clsx';
import {
  BellIcon,
  CreditCardIcon,
  CubeIcon,
  FingerPrintIcon,
  UserCircleIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';

interface Props {
  loggedUser: UserProps;
}

const navigation = [
  { name: 'General', href: '#', icon: UserCircleIcon, current: true },
  { name: 'Security', href: '#', icon: FingerPrintIcon, current: false },
  { name: 'Notifications', href: '#', icon: BellIcon, current: false },
  { name: 'Plan', href: '#', icon: CubeIcon, current: false },
  { name: 'Billing', href: '#', icon: CreditCardIcon, current: false },
  { name: 'Team members', href: '#', icon: UsersIcon, current: false },
];

export default function ProfileForm({ loggedUser }: Props) {
  return (
    <div className="mx-auto max-w-7xl lg:flex lg:gap-x-16 lg:px-8 h-screen">
      <aside
        className="flex overflow-x-auto border-b border-gray-900/5 py-4 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-20 ">
        <nav className="flex-none px-4 sm:px-6 lg:px-0">
          <ul role="list" className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">
            {navigation.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className={clsx(
                    item.current
                      ? 'bg-gray-50 text-indigo-600 '
                      : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600 ',
                    'group flex gap-x-3 rounded-md py-2 pr-3 pl-2 text-sm/6 font-semibold',
                  )}
                >
                  <item.icon
                    aria-hidden="true"
                    className={clsx(
                      item.current
                        ? 'text-indigo-600 '
                        : 'text-gray-400 group-hover:text-indigo-600 ',
                      'size-6 shrink-0',
                    )}
                  />
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <div className="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20">
        <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
          <div>
            <h2 className="text-base/7 font-semibold text-gray-900 ">Profile</h2>
            <p className="mt-1 text-sm/6 text-gray-500">
              This information will be displayed publicly so be careful what you share.
            </p>

            <dl
              className="mt-6 divide-y divide-gray-100 border-t border-gray-200 text-sm/6 ">
              <div className="py-6 sm:flex">
                <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6 ">Name</dt>
                <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                  <div className="text-gray-900 ">{loggedUser.name}</div>
                  <button
                    type="button"
                    className="font-semibold text-indigo-600 hover:text-indigo-500 "
                  >
                    Update
                  </button>
                </dd>
              </div>
              <div className="py-6 sm:flex">
                <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6 ">
                  Email address
                </dt>
                <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                  <div className="text-gray-900 ">{loggedUser.email}</div>
                  <button
                    type="button"
                    className="font-semibold text-indigo-600 hover:text-indigo-500 "
                  >
                    Update
                  </button>
                </dd>
              </div>
              <div className="py-6 sm:flex">
                <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6 ">
                  Phone
                </dt>
                <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                  <div className="text-gray-900 ">{loggedUser.phone}</div>
                  <button
                    type="button"
                    className="font-semibold text-indigo-600 hover:text-indigo-500 "
                  >
                    Update
                  </button>
                </dd>
              </div>
              <div className="py-6 sm:flex">
                <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6 ">
                  Gender
                </dt>
                <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                  <div
                    className="text-gray-900 ">{loggedUser.gender === 'M' ? 'Male' : 'Female'}</div>
                  <button
                    type="button"
                    className="font-semibold text-indigo-600 hover:text-indigo-500 "
                  >
                    Update
                  </button>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}