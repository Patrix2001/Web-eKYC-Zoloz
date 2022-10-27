import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/solid"
import { useRouter } from 'next/router'
import Link from 'next/link'

const navigation = [
    { name: 'home', href: '/' },
    { name: 'Face ID', href: 'https://docs.zoloz.com/zoloz/saas/apireference/facecapture' },
    { name: 'ID recognition', href: 'https://docs.zoloz.com/zoloz/saas/apireference/utcp2w' },
    { name: 'eKYC', href: 'https://docs.zoloz.com/zoloz/saas/apireference/realid' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Navbar = () => {
    const router = useRouter();

    return (
        <Disclosure as="nav" className="fixed top-0 left-0 right-0 z-10 bg-gray-800">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <DocumentMagnifyingGlassIcon className='h-8 w-8 text-blue-500' />
                                </div>
                                <div className="hidden md:block">
                                    <div className="ml-10 flex items-baseline space-x-4 capitalize">
                                        {navigation.map((item) => (
                                            <Link key={item.name} href={router.pathname.includes(item.name) ? "#" : item.href}>
                                                <a
                                                    className={classNames(
                                                        router.pathname.includes(item.name)
                                                            ? 'bg-gray-900 text-white'
                                                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                        'px-3 py-2 rounded-md text-sm font-medium cursor-pointer'
                                                    )}
                                                    aria-current={router.pathname.includes(item.name) ? 'page' : undefined}
                                                >
                                                    {item.name}
                                                </a>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="-mr-2 flex md:hidden">
                                {/* Mobile menu button */}
                                <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="md:hidden">
                        <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    className={classNames(
                                        router.pathname.includes(item.name) ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block px-3 py-2 w-full rounded-md text-base font-medium cursor-pointer capitalize'
                                    )}
                                    aria-current={router.pathname.includes(item.name) ? 'page' : undefined}
                                >
                                    <Link key={item.name} href={router.pathname.includes(item.name) ? "#" : item.href}>
                                        <a>
                                            <div className='w-full'>
                                                {item.name}
                                            </div>
                                        </a>
                                    </Link>
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}

export default Navbar;
