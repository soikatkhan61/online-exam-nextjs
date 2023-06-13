'use client'
import React, { useEffect,useState } from 'react'
import { getTodaysExams } from '../admin/exam/examController'
import { ExamData } from '@/lib/types/exam'
import Link from 'next/link'
const Exams = () => {
    const [todaysExam, setTodaysExams] = useState<ExamData[] | null>([])
    useEffect(() => {
        const fetchExamsData = async () => {
            let res = await getTodaysExams()
            setTodaysExams(res)   
        }
        fetchExamsData()
    }, [])
    return (
        <div className='container py-6'>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1'>
                {todaysExam?.map((e,i)=>(
                    <div key={i} className='border rounded px-3 py-4 lg:p-4'>
                        <div className='flex justify-between'>
                            <p>বিষয়ঃ {e.name}</p>
                            <p className='border border-primary-200 bg-primary-100 text-sm px-2 py-1 rounded'>সময়ঃ {e.duration} মিনিট </p>
                        </div>
                        <p>টপিকঃ {e.topic}</p>
                        <p>পুর্ণমাণঃ {e.marks}</p>


                        <p>পরীক্ষা দেয়া যাবেঃ {e.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {e.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        <div className='my-2'>
                            <Link href='/exams/today' className='bg-primary-800 text-white py-1 px-3 rounded hover:bg-primary-900' >পরীক্ষা দাও</Link>
                        </div>
                       
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Exams