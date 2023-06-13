"use client";
import SigninButton from '@/component/Button/SignInButton'
import React from 'react'
import Link from 'next/link'
import TopLoading from "@/component/TopLoading";


const Page: React.FC = () => {
    const navbarItems = [
        {
            page:'Home',
            link:'/',
        },
        {
            page:'Admin',
            link:'/admin',
        },
        {
            page:'Login',
            link:'/auth/login',
        },
        {
            page:'Register',
            link:'/auth/register',
        },
        {
            page:'Dashboard',
            link:'/dashboard',
        }
    ]
    return (
        <>
        <TopLoading/>
            <nav className="border-b border-gray-200 dark:bg-gray-900">
                <div className="container flex flex-wrap items-center justify-between py-4">
                    <Link href="/" className="flex items-center">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                            GreenForum
                        </span>
                    </Link>

                    <SigninButton />

                    <div
                        className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                        id="mobile-menu-2"
                    >
                        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            {
                                navbarItems.map((item,index)=>{
                                    return <li key={index}>
                                    <Link
                                        href={item.link}
                                        className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                                        aria-current="page"
                                    >
                                        {item.page}
                                    </Link>
                                </li>
                                })
                            }
                            
                        </ul>
                    </div>
                </div>
            </nav>
        </>

    )
}

export default Page