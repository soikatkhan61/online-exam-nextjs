'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'

interface NavItems {
    item: string;
    link: string;
}

const Sidebar:React.FC = () => {
    const pathname = usePathname();
    const navItmes: NavItems[] = [
        {
            item: 'Home',
            link: '/admin'
        },
        {
            item: 'Exams',
            link: '/admin/exam'
        },
        {
            item: 'Moderator',
            link: '/admin/moderator'
        },
        {
            item: 'Create Exam',
            link: '/admin/exam/create'
        },
        {
            item: 'Add Question',
            link: '/admin/exam/add-questions'
        }
    ]


    return (
        <div className="text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
            {navItmes.map((m, key) => (
                <Link
                    href={m.link}
                    key={key}
                    className={`${pathname === m.link && 'text-white bg-primary-800' } ${key==0 && 'rounded-t-lg'} block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-primary-700`}
                >
                    {m.item}
                </Link>
            ))}
        </div>
     )
}

export default Sidebar